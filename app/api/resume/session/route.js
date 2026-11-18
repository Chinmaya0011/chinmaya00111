import { NextResponse } from "next/server";
import { 
  validateResumeAccessSession, 
  revokeResumeAccessSession,
  maskEmail 
} from "@/lib/securityStore";
import { getClientIp, logSecurityEvent } from "@/lib/securityLogger";

export async function GET(request) {
  const token = request.cookies.get("resume_session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const result = validateResumeAccessSession(token);

  if (!result.valid) {
    return NextResponse.json(
      { authenticated: false, reason: result.reason },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      expiresAt: result.session.expiresAt,
      emailMasked: maskEmail(result.session.emailNormalized)
    },
    { status: 200 }
  );
}

export async function DELETE(request) {
  const clientIp = getClientIp(request);
  const token = request.cookies.get("resume_session")?.value;

  if (token) {
    revokeResumeAccessSession(token);
    logSecurityEvent({
      eventType: "SESSION_REVOKED",
      ip: clientIp,
      status: "SUCCESS"
    });
  }

  const response = NextResponse.json(
    { success: true, message: "Resume access session successfully revoked." },
    { status: 200 }
  );

  response.cookies.set({
    name: "resume_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}
