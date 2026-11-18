import { NextResponse } from "next/server";
import { 
  verifyOtpForTransaction, 
  createResumeAccessSession, 
  checkRateLimit,
  maskEmail
} from "@/lib/securityStore";
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

  // 2. Parse payload safely
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  const { transactionId, otp } = body || {};

  // 3. Strict format validation (accepts 32-char hex or 'demo' transaction ID)
  if (!transactionId || typeof transactionId !== "string" || (transactionId.length !== 32 && transactionId !== "demo")) {
    return NextResponse.json(
      { success: false, error: "Invalid verification transaction identifier." },
      { status: 400 }
    );
  }

  if (!otp || typeof otp !== "string" || !/^\d{6}$/.test(otp.trim())) {
    return NextResponse.json(
      { success: false, error: "Verification code must be exactly 6 numeric digits." },
      { status: 422 }
    );
  }

  // 4. Rate Limiting: Max 100 verification submissions per IP per 5 minutes
  const ipLimit = checkRateLimit(`ip_verify:${clientIp}`, 100, 5 * 60 * 1000);
  if (!ipLimit.allowed) {
    logSecurityEvent({
      eventType: "RATE_LIMIT_TRIGGERED",
      ip: clientIp,
      status: "BLOCKED",
      metadata: { target: "ip_verify", transactionId }
    });
    return NextResponse.json(
      { success: false, error: "Too many submission attempts. Please wait 5 minutes." },
      { status: 429 }
    );
  }

  // 5. Verify OTP against server hash with constant-time comparison
  const verificationResult = verifyOtpForTransaction(transactionId, otp.trim());

  if (!verificationResult.success) {
    logSecurityEvent({
      eventType: "OTP_FAILED",
      ip: clientIp,
      status: "FAILURE",
      metadata: { transactionId, error: verificationResult.error }
    });
    return NextResponse.json(
      { success: false, error: verificationResult.error },
      { status: 401 }
    );
  }

  // 6. OTP verified successfully -> Issue cryptographically secure session
  const email = verificationResult.email;
  const session = createResumeAccessSession(transactionId, email);

  logSecurityEvent({
    eventType: "OTP_VERIFIED",
    ip: clientIp,
    emailMasked: maskEmail(email),
    status: "SUCCESS",
    metadata: { sessionId: session.id, expiresAt: session.expiresAt }
  });

  // 7. Prepare response with HttpOnly, Secure cookie
  const response = NextResponse.json(
    {
      success: true,
      message: "Identity verified. Resume access granted.",
      expiresAt: session.expiresAt,
      emailMasked: maskEmail(email)
    },
    { status: 200 }
  );

  // Set HttpOnly, SameSite=Lax cookie
  const isProduction = process.env.NODE_ENV === "production";
  response.cookies.set({
    name: "resume_session",
    value: session.sessionToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 20 * 60 // 20 minutes in seconds
  });

  return response;
}
