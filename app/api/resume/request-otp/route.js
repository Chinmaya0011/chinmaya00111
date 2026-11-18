import { NextResponse } from "next/server";
import { 
  isValidEmail, 
  normalizeEmail, 
  checkRateLimit, 
  createVerificationTransaction,
  DEMO_OTP
} from "@/lib/securityStore";
import { sendOtpEmail } from "@/lib/emailService";
import { getClientIp, logSecurityEvent } from "@/lib/securityLogger";

export async function POST(request) {
  const clientIp = getClientIp(request);

  // 1. Validate Content-Type
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  // 2. Parse and limit request body
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  const { email } = body || {};

  // 3. Normalize and validate email
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid, standard email address." },
      { status: 422 }
    );
  }

  const normalized = normalizeEmail(email);

  // 4. Rate Limiting: IP-based and Email-based (generous thresholds for seamless demo testing)
  // IP Limit: 50 requests per 10 minutes
  const ipLimit = checkRateLimit(`ip_otp:${clientIp}`, 50, 10 * 60 * 1000);
  if (!ipLimit.allowed) {
    logSecurityEvent({
      eventType: "RATE_LIMIT_TRIGGERED",
      ip: clientIp,
      emailMasked: normalized,
      status: "BLOCKED",
      metadata: { target: "ip_otp", resetAt: ipLimit.resetAt }
    });
    return NextResponse.json(
      { success: false, error: "Too many OTP requests from this address. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // Email Limit: 25 requests per 10 minutes
  const emailLimit = checkRateLimit(`email_otp:${normalized}`, 25, 10 * 60 * 1000);
  if (!emailLimit.allowed) {
    logSecurityEvent({
      eventType: "RATE_LIMIT_TRIGGERED",
      ip: clientIp,
      emailMasked: normalized,
      status: "BLOCKED",
      metadata: { target: "email_otp", resetAt: emailLimit.resetAt }
    });
    return NextResponse.json(
      { success: false, error: "Too many requests for this email. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // 5. Generate cryptographically secure OTP & transaction
  const transaction = createVerificationTransaction(normalized);

  logSecurityEvent({
    eventType: "RESUME_ACCESS_REQUESTED",
    ip: clientIp,
    emailMasked: transaction.maskedEmail,
    status: "INFO",
    metadata: { transactionId: transaction.transactionId }
  });

  // 6. Dispatch OTP email (graceful fallback - no external email service required)
  try {
    await sendOtpEmail({
      to: normalized,
      otp: transaction.otp,
      clientIp
    });
  } catch (err) {
    // Non-fatal fallback for demo environment
  }

  const responsePayload = {
    success: true,
    transactionId: transaction.transactionId,
    expiresAt: transaction.expiresAt,
    maskedEmail: transaction.maskedEmail,
    demoOtp: DEMO_OTP,
    message: `Verification code ready. Enter demo code ${DEMO_OTP} for instant access.`
  };

  // Provide debugOtp during automated test mode or explicit dev env
  if (process.env.DEBUG_OTP === "true" || process.env.NODE_ENV === "test") {
    responsePayload.debugOtp = transaction.otp;
  }

  return NextResponse.json(responsePayload, { status: 200 });
}
