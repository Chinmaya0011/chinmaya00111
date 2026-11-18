import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getClientIp, logSecurityEvent } from "@/lib/securityLogger";

// Strict whitelist of permitted resume variants (prevents path traversal / LFI)
const RESUME_VARIANTS = {
  appsec: {
    filename: "Chinmaya_AppSec_Resume.pdf",
    previewName: "Chinmaya_Kumar_Mishra_AppSec_Resume.pdf"
  },
  "ai-appsec": {
    filename: "Chinmaya_AI_AppSec_Resume.pdf",
    previewName: "Chinmaya_Kumar_Mishra_AI_AppSec_Resume.pdf"
  },
  fullstack: {
    filename: "Chinmaya_AI_FullStack_Resume.pdf",
    previewName: "Chinmaya_Kumar_Mishra_FullStack_Resume.pdf"
  }
};

export async function GET(request) {
  const clientIp = getClientIp(request);

  // 1. Resolve requested variant with strict whitelist
  const url = new URL(request.url);
  const variantParam = (url.searchParams.get("variant") || "appsec").toLowerCase().trim();
  const selectedVariant = RESUME_VARIANTS[variantParam] || RESUME_VARIANTS.appsec;

  // 2. Resolve PDF file path
  let filePath = path.join(process.cwd(), "private", "resumes", selectedVariant.filename);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), "public", "resumes", selectedVariant.filename);
  }

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Resume file temporarily unavailable." },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);

  // 3. Log direct preview access
  logSecurityEvent({
    eventType: "RESUME_PREVIEWED",
    ip: clientIp,
    status: "SUCCESS",
    metadata: { variant: variantParam, file: selectedVariant.filename }
  });

  // 4. Return secure inline PDF stream
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${selectedVariant.previewName}"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
