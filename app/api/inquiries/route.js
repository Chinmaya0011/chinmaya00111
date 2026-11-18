import { NextResponse } from "next/server";
import { 
  isValidEmail, 
  normalizeEmail, 
  checkRateLimit, 
  saveProjectInquiry,
  VALID_SERVICES,
  VALID_BUDGETS,
  VALID_TIMELINES,
  maskEmail
} from "@/lib/securityStore";
import { sendInquiryEmail } from "@/lib/emailService";
import { getClientIp, logSecurityEvent } from "@/lib/securityLogger";

export async function POST(request) {
  const clientIp = getClientIp(request);

  // 1. Strict Content-Type check
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  // 2. Parse request body safely
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  // 3. Honeypot Anti-Spam Trap
  // Hidden field `website` is filled strictly by automated crawlers
  if (body?.website) {
    logSecurityEvent({
      eventType: "SPAM_HONEYPOT_TRIGGERED",
      ip: clientIp,
      status: "BLOCKED",
      metadata: { honeypotValue: String(body.website).slice(0, 50) }
    });
    // Return standard success to fool automated bots without processing
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your project inquiry has been received. I'll review the details and get back to you."
      },
      { status: 200 }
    );
  }

  const {
    name,
    email,
    phone,
    company,
    service,
    budget,
    timeline,
    description,
    consent
  } = body || {};

  // 4. Validate Full Name
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return NextResponse.json(
      { success: false, error: "Please provide your full name (2–100 characters)." },
      { status: 422 }
    );
  }

  // 5. Validate Business Email
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid, standard email address." },
      { status: 422 }
    );
  }
  const normalizedEmail = normalizeEmail(email);

  // 6. Validate Service Selection
  if (!service || typeof service !== "string" || !VALID_SERVICES.includes(service)) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Please select a valid service category from the options provided." 
      },
      { status: 422 }
    );
  }

  // 7. Validate Budget Option (if supplied)
  if (budget && (typeof budget !== "string" || !VALID_BUDGETS.includes(budget))) {
    return NextResponse.json(
      { success: false, error: "Invalid project budget selection." },
      { status: 422 }
    );
  }

  // 8. Validate Timeline Option (if supplied)
  if (timeline && (typeof timeline !== "string" || !VALID_TIMELINES.includes(timeline))) {
    return NextResponse.json(
      { success: false, error: "Invalid expected timeline selection." },
      { status: 422 }
    );
  }

  // 9. Validate Phone / WhatsApp (optional, length limit)
  if (phone && (typeof phone !== "string" || phone.trim().length > 30)) {
    return NextResponse.json(
      { success: false, error: "Phone number is too long (max 30 characters)." },
      { status: 422 }
    );
  }

  // 10. Validate Company / Organization (optional, length limit)
  if (company && (typeof company !== "string" || company.trim().length > 100)) {
    return NextResponse.json(
      { success: false, error: "Company name is too long (max 100 characters)." },
      { status: 422 }
    );
  }

  // 11. Validate Project Description
  if (
    !description || 
    typeof description !== "string" || 
    description.trim().length < 10 || 
    description.trim().length > 3000
  ) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Please provide a project description between 10 and 3,000 characters." 
      },
      { status: 422 }
    );
  }

  // 12. Validate Privacy Policy Consent
  if (consent !== true) {
    return NextResponse.json(
      { 
        success: false, 
        error: "You must acknowledge and agree to the Privacy Policy to submit an inquiry." 
      },
      { status: 422 }
    );
  }

  // 13. Rate Limiting: IP-based (10 inquiries / hour) and Email-based (5 inquiries / hour)
  const ipLimit = checkRateLimit(`ip_inquiry:${clientIp}`, 10, 60 * 60 * 1000);
  if (!ipLimit.allowed) {
    logSecurityEvent({
      eventType: "RATE_LIMIT_TRIGGERED",
      ip: clientIp,
      emailMasked: maskEmail(normalizedEmail),
      status: "BLOCKED",
      metadata: { target: "ip_inquiry", resetAt: ipLimit.resetAt }
    });
    return NextResponse.json(
      { 
        success: false, 
        error: "Too many project inquiries submitted from this connection. Please try again later." 
      },
      { status: 429 }
    );
  }

  const emailLimit = checkRateLimit(`email_inquiry:${normalizedEmail}`, 5, 60 * 60 * 1000);
  if (!emailLimit.allowed) {
    logSecurityEvent({
      eventType: "RATE_LIMIT_TRIGGERED",
      ip: clientIp,
      emailMasked: maskEmail(normalizedEmail),
      status: "BLOCKED",
      metadata: { target: "email_inquiry", resetAt: emailLimit.resetAt }
    });
    return NextResponse.json(
      { 
        success: false, 
        error: "Too many inquiries submitted for this email address. Please check your inbox or wait an hour." 
      },
      { status: 429 }
    );
  }

  // 14. Securely persist inquiry server-side
  const inquiryRecord = saveProjectInquiry({
    name: name.trim(),
    email: normalizedEmail,
    phone: phone ? phone.trim() : "",
    company: company ? company.trim() : "",
    service,
    budget: budget || "Not specified",
    timeline: timeline || "Not specified",
    description: description.trim(),
    ip: clientIp
  });

  // 15. Dispatch notification email asynchronously
  try {
    await sendInquiryEmail({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : "",
      company: company ? company.trim() : "",
      service,
      budget: budget || "Not specified",
      timeline: timeline || "Not specified",
      description: description.trim(),
      clientIp
    });
  } catch (err) {
    // Non-fatal error; inquiry is already recorded securely
  }

  // 16. Log security audit event
  logSecurityEvent({
    eventType: "PROJECT_INQUIRY_CREATED",
    ip: clientIp,
    emailMasked: maskEmail(normalizedEmail),
    status: "SUCCESS",
    metadata: { 
      inquiryId: inquiryRecord.inquiryId, 
      service, 
      budget: budget || "Not specified" 
    }
  });

  return NextResponse.json(
    {
      success: true,
      inquiryId: inquiryRecord.inquiryId,
      message: "Thank you for reaching out! Your project inquiry has been received. I'll review the details and get back to you."
    },
    { status: 200 }
  );
}
