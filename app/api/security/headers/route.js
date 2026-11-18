import { NextResponse } from "next/server";
import { getRecentSecurityEvents } from "@/lib/securityLogger";

export async function GET(request) {
  // Configured baseline headers from Next.js server configuration
  const securityHeaders = {
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    "Content-Security-Policy": "frame-ancestors 'none'; object-src 'none'; base-uri 'self';",
    "X-XSS-Protection": "0" // Modern standard: explicitly disable legacy vulnerable auditor in favor of CSP
  };

  const recentTelemetry = getRecentSecurityEvents().slice(0, 10);

  return NextResponse.json(
    {
      status: "ACTIVE",
      timestamp: new Date().toISOString(),
      headers: securityHeaders,
      telemetry: recentTelemetry
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate"
      }
    }
  );
}
