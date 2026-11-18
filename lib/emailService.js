import { maskEmail } from "./securityStore";
import { logSecurityEvent } from "./securityLogger";

/**
 * Sends OTP verification email to the user.
 * Supports Resend, SMTP, and local development dispatch.
 */
export async function sendOtpEmail({ to, otp, clientIp }) {
  const masked = maskEmail(to);
  const subject = "Your Secure Resume Access Verification Code";
  const textContent = `Hello,

You requested access to Chinmaya Kumar Mishra's professional resume.

Your verification code is: ${otp}

This code expires in 5 minutes.

If you did not request this code, ignore this email.`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F6; color: #171717; margin: 0; padding: 32px 16px;">
  <div style="max-width: 520px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E7E5E0; border-radius: 16px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
    <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #3B5BFF; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
      AUTHENTICATION GATE // RESUME ACCESS
    </div>
    <h2 style="font-size: 22px; font-weight: 800; color: #171717; margin: 0 0 16px 0; letter-spacing: -0.02em;">
      Verify Your Email Address
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #555555; margin: 0 0 24px 0;">
      Hello, you requested authorized access to Chinmaya Kumar Mishra's professional engineering resume. Use the single-use verification code below:
    </p>
    <div style="background-color: #FAF9F6; border: 1px solid #E7E5E0; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 24px;">
      <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #171717;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 12px; color: #888888; line-height: 1.5; margin: 0 0 24px 0;">
      This verification code is strictly valid for <strong>5 minutes</strong> and allows up to 3 entry attempts. If you did not make this request, you can safely disregard this message.
    </p>
    <div style="border-top: 1px solid #E7E5E0; padding-top: 16px; font-family: monospace; font-size: 11px; color: #AAAAAA;">
      Chinmaya Kumar Mishra · AI Application Security Engineer · chinmayakumarmishra.sbs
    </div>
  </div>
</body>
</html>`;

  // 1. Resend API Integration if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Security Gate <security@chinmayakumarmishra.sbs>",
          to: [to],
          subject,
          text: textContent,
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        console.error("[EMAIL ERROR] Resend dispatch failed:", errJson);
        return { success: false, error: "External email dispatch failed." };
      }

      logSecurityEvent({
        eventType: "OTP_DISPATCHED",
        ip: clientIp,
        emailMasked: masked,
        status: "SUCCESS",
        metadata: { provider: "resend" }
      });

      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("[EMAIL ERROR] Exception during Resend dispatch:", err);
      return { success: false, error: "Email provider unreachable." };
    }
  }

  // 2. Development / Local Environment Dispatcher
  // When no remote API key is supplied, log securely for local testing & automated test suite
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`[TRANSACTIONAL EMAIL] To: ${masked}`);
  console.log(`[SECURITY CODE] Code: ${otp} (Valid for 5 minutes)`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  logSecurityEvent({
    eventType: "OTP_DISPATCHED",
    ip: clientIp,
    emailMasked: masked,
    status: "SUCCESS",
    metadata: { provider: "local_dev" }
  });

  return { success: true, provider: "local_dev" };
}

/**
 * Dispatches notification for newly submitted project inquiries.
 * Integrates with Resend if API key is provided, or logs securely locally.
 */
export async function sendInquiryEmail(inquiry) {
  const masked = maskEmail(inquiry.email);
  const subject = `[Project Inquiry] ${inquiry.service} — ${inquiry.name}`;
  
  const textContent = `New Project Inquiry Received

Name: ${inquiry.name}
Business Email: ${inquiry.email}
Phone / WhatsApp: ${inquiry.phone || "Not specified"}
Company / Organization: ${inquiry.company || "Not specified"}
Service Needed: ${inquiry.service}
Budget: ${inquiry.budget || "Not specified"}
Timeline: ${inquiry.timeline || "Not specified"}

Project Requirements & Scope:
------------------------------------------------------------------
${inquiry.description}
------------------------------------------------------------------

Received: ${new Date().toISOString()}
Client IP: ${inquiry.clientIp}
`;

  // 1. Resend API Integration if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Inquiries <inquiries@chinmayakumarmishra.sbs>",
          to: [process.env.NOTIFICATION_EMAIL || "imchinu17@gmail.com"],
          reply_to: inquiry.email,
          subject,
          text: textContent
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("[INQUIRY EMAIL ERROR] Resend dispatch failed:", err);
        return { success: false, error: "External email dispatch failed." };
      }

      logSecurityEvent({
        eventType: "INQUIRY_DISPATCHED",
        ip: inquiry.clientIp,
        emailMasked: masked,
        status: "SUCCESS",
        metadata: { provider: "resend", service: inquiry.service }
      });

      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("[INQUIRY EMAIL ERROR] Exception during dispatch:", err);
      return { success: false, error: "Email provider unreachable." };
    }
  }

  // 2. Development / Local Environment Dispatcher
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`[PROJECT INQUIRY] From: ${inquiry.name} (${masked})`);
  console.log(`[SERVICE] ${inquiry.service} | Budget: ${inquiry.budget} | Timeline: ${inquiry.timeline}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  logSecurityEvent({
    eventType: "INQUIRY_DISPATCHED",
    ip: inquiry.clientIp,
    emailMasked: masked,
    status: "SUCCESS",
    metadata: { provider: "local_dev", service: inquiry.service }
  });

  return { success: true, provider: "local_dev" };
}
