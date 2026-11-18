import fs from "fs";
import path from "path";
import crypto from "crypto";

const LOGS_DIR = path.join(process.cwd(), ".security-logs");
const AUDIT_LOG_FILE = path.join(LOGS_DIR, "audit.jsonl");

// In-memory circular buffer for recent safe audit telemetry
const recentEvents = [];
const MAX_RECENT_EVENTS = 100;

try {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
} catch (err) {
  // Graceful fallback for read-only environments
}

/**
 * Anonymizes client IP addresses to balance audit capability with privacy.
 */
function anonymizeIp(ip) {
  if (!ip || typeof ip !== "string") return "0.0.0.0";
  // Handle IPv4
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }
  // Handle IPv6 / Localhost
  if (ip === "::1" || ip === "127.0.0.1") return "127.0.0.xxx";
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 8);
}

/**
 * Extracts and sanitizes client IP from request headers.
 */
export function getClientIp(req) {
  if (!req) return "0.0.0.0";
  const headers = req.headers;
  const forwarded = headers.get?.("x-forwarded-for") || headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get?.("x-real-ip") || headers["x-real-ip"];
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

/**
 * Records a structured security audit event.
 * Never logs raw OTPs, session secrets, or full plaintext PII.
 */
export function logSecurityEvent({ eventType, ip, emailMasked, status = "INFO", metadata = {} }) {
  const safeIp = anonymizeIp(ip);
  const now = new Date();

  // Strip any accidental sensitive fields from metadata
  const safeMetadata = { ...metadata };
  delete safeMetadata.otp;
  delete safeMetadata.token;
  delete safeMetadata.sessionToken;
  delete safeMetadata.cookie;
  delete safeMetadata.password;

  const event = {
    id: crypto.randomBytes(8).toString("hex"),
    timestamp: now.toISOString(),
    eventType,
    status, // "SUCCESS" | "FAILURE" | "BLOCKED" | "INFO"
    clientIp: safeIp,
    actor: emailMasked || "anonymous",
    metadata: safeMetadata
  };

  // Add to in-memory circular buffer
  recentEvents.unshift(event);
  if (recentEvents.length > MAX_RECENT_EVENTS) {
    recentEvents.pop();
  }

  // Append to disk log file safely
  try {
    const line = JSON.stringify(event) + "\n";
    fs.appendFileSync(AUDIT_LOG_FILE, line, "utf-8");
  } catch (err) {
    // Non-blocking fallback
  }

  // Structured console log for container observability
  if (process.env.NODE_ENV !== "test") {
    console.log(`[AUDIT] [${event.status}] ${event.eventType} - ${event.actor} (${event.clientIp})`);
  }

  return event;
}

/**
 * Returns recent sanitized audit events for authorized inspection.
 */
export function getRecentSecurityEvents() {
  return [...recentEvents];
}
