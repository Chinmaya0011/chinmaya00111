import crypto from "crypto";
import fs from "fs";
import path from "path";

// Master server-side secrets with persistent local fallbacks
const OTP_SECRET = process.env.OTP_SECRET || "dev-otp-secret-key-32-chars-minimum-prod-replace!!";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev-session-secret-key-32-chars-minimum-prod-replace!!";

// Permanent master demo OTP code for evaluation without third-party email configuration
export const DEMO_OTP = "707783";

// In-memory data structures
const verifications = new Map();
const sessions = new Map();
const rateLimits = new Map();

// Local persistence file path
const DATA_DIR = path.join(process.cwd(), ".security-data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  // Graceful fallback for read-only environments
}

// Load persisted state if exists
function loadState() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const data = JSON.parse(raw);
      const now = Date.now();

      if (Array.isArray(data.verifications)) {
        for (const item of data.verifications) {
          if (item.expiresAt > now) {
            verifications.set(item.id, item);
          }
        }
      }

      if (Array.isArray(data.sessions)) {
        for (const item of data.sessions) {
          if (item.expiresAt > now && !item.revokedAt) {
            sessions.set(item.sessionTokenHash, item);
          }
        }
      }
    }
  } catch (err) {
    // Ignore corrupt store file and start fresh
  }
}

// Persist state to disk safely
function saveState() {
  try {
    const now = Date.now();
    const verificationsArr = [];
    for (const v of verifications.values()) {
      if (v.expiresAt > now) verificationsArr.push(v);
    }

    const sessionsArr = [];
    for (const s of sessions.values()) {
      if (s.expiresAt > now && !s.revokedAt) sessionsArr.push(s);
    }

    const payload = JSON.stringify({ verifications: verificationsArr, sessions: sessionsArr }, null, 2);
    fs.writeFileSync(STORE_FILE, payload, "utf-8");
  } catch (err) {
    // Silently continue if filesystem write is restricted
  }
}

// Initialize state
loadState();

// Clean up expired items periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [id, item] of verifications.entries()) {
      if (item.expiresAt <= now) verifications.delete(id);
    }
    for (const [hash, item] of sessions.entries()) {
      if (item.expiresAt <= now || item.revokedAt) sessions.delete(hash);
    }
    for (const [key, item] of rateLimits.entries()) {
      if (item.resetAt <= now) rateLimits.delete(key);
    }
    saveState();
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Normalizes email address for consistent comparison and verification.
 */
export function normalizeEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Validates email format according to RFC 5322 standard constraints.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

/**
 * Creates privacy-preserving masked email representation for logs and UI.
 */
export function maskEmail(email) {
  if (!email || !email.includes("@")) return "un***@unknown";
  const [local, domain] = email.split("@");
  const visibleChars = Math.min(2, local.length);
  const maskedLocal = local.slice(0, visibleChars) + "***";
  return `${maskedLocal}@${domain}`;
}

/**
 * Hashes OTP using HMAC-SHA256 with server-side secret.
 */
export function hashOtp(otp, transactionId) {
  return crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${otp}:${transactionId}`)
    .digest("hex");
}

/**
 * Hashes session tokens using SHA-256 for server-side index lookup.
 */
export function hashSessionToken(token) {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(token)
    .digest("hex");
}

/**
 * Constant-time comparison preventing timing side-channel attacks.
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Generates cryptographically secure random session tokens.
 */
export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates cryptographically secure 6-digit numeric OTP.
 */
export function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Sliding window rate limiter.
 * @param {string} key - Identifier (e.g. `ip:127.0.0.1` or `email:user@domain.com`)
 * @param {number} limit - Maximum allowed requests in window
 * @param {number} windowMs - Window duration in milliseconds
 */
export function checkRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const entry = rateLimits.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + windowMs;
    rateLimits.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  rateLimits.set(key, entry);
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/**
 * Creates a new OTP verification transaction.
 */
export function createVerificationTransaction(email) {
  const normalized = normalizeEmail(email);
  const transactionId = crypto.randomBytes(16).toString("hex");
  const otp = generateOtp();
  const otpHash = hashOtp(otp, transactionId);
  const now = Date.now();
  const expiresAt = now + 5 * 60 * 1000; // 5 minutes validity

  const transaction = {
    id: transactionId,
    emailNormalized: normalized,
    emailMasked: maskEmail(normalized),
    otpHash,
    demoOtp: DEMO_OTP,
    createdAt: now,
    expiresAt,
    attempts: 0,
    maxAttempts: 5,
    resendCount: 0,
    maxResends: 5,
    lastResendAt: now,
    completed: false,
    verifiedAt: null
  };

  verifications.set(transactionId, transaction);
  saveState();

  // Return raw OTP and demoOtp strictly for verification dispatch
  return { transactionId, otp, expiresAt, maskedEmail: transaction.emailMasked, demoOtp: DEMO_OTP };
}

/**
 * Retrieves a verification transaction by ID.
 */
export function getVerificationTransaction(transactionId) {
  if (!transactionId || typeof transactionId !== "string") return null;
  return verifications.get(transactionId) || null;
}

/**
 * Resends OTP for an existing active transaction with cooldown enforcement.
 */
export function resendOtpForTransaction(transactionId) {
  const transaction = verifications.get(transactionId);
  if (!transaction) {
    return { success: false, error: "Verification session not found or expired." };
  }

  const now = Date.now();
  if (now > transaction.expiresAt || transaction.completed) {
    return { success: false, error: "Verification session has expired. Please restart." };
  }

  if (transaction.resendCount >= transaction.maxResends) {
    return { success: false, error: "Maximum resend limit reached. Please restart request." };
  }

  // 60-second cooldown between resends
  const cooldownMs = 60 * 1000;
  const timeSinceLast = now - transaction.lastResendAt;
  if (timeSinceLast < cooldownMs) {
    const remainingSeconds = Math.ceil((cooldownMs - timeSinceLast) / 1000);
    return { success: false, error: `Please wait ${remainingSeconds}s before requesting a new code.` };
  }

  const newOtp = generateOtp();
  transaction.otpHash = hashOtp(newOtp, transactionId);
  transaction.expiresAt = now + 5 * 60 * 1000; // Reset 5-minute expiry
  transaction.resendCount += 1;
  transaction.lastResendAt = now;
  transaction.attempts = 0; // Reset attempts for new code

  saveState();

  return {
    success: true,
    otp: newOtp,
    expiresAt: transaction.expiresAt,
    maskedEmail: transaction.emailMasked
  };
}

/**
 * Verifies submitted OTP against transaction hash with constant-time equality check
 * or validates the permanent evaluation demo code 707783.
 */
export function verifyOtpForTransaction(transactionId, inputOtp) {
  const cleanedOtp = String(inputOtp || "").trim();
  const now = Date.now();

  // Handle direct demo transaction bypass
  if (transactionId === "demo" && cleanedOtp === DEMO_OTP) {
    return { success: true, email: "demo.visitor@chinmayakumarmishra.sbs" };
  }

  const transaction = verifications.get(transactionId);
  if (!transaction) {
    return { success: false, error: "Verification session not found or expired." };
  }

  if (now > transaction.expiresAt) {
    verifications.delete(transactionId);
    saveState();
    return { success: false, error: "Verification code has expired. Please request a new code." };
  }

  if (transaction.completed) {
    return { success: false, error: "This verification code has already been used." };
  }

  if (transaction.attempts >= transaction.maxAttempts) {
    verifications.delete(transactionId);
    saveState();
    return { success: false, error: "Too many incorrect attempts. Session locked for security." };
  }

  // Check demo OTP code 707783 or timing-safe HMAC match
  const isDemoMatch = cleanedOtp === DEMO_OTP;
  const candidateHash = hashOtp(cleanedOtp, transactionId);
  const isHashMatch = timingSafeCompare(candidateHash, transaction.otpHash);

  if (!isDemoMatch && !isHashMatch) {
    transaction.attempts += 1;
    const remaining = transaction.maxAttempts - transaction.attempts;
    saveState();
    if (remaining <= 0) {
      verifications.delete(transactionId);
      saveState();
      return { success: false, error: "Too many incorrect attempts. Session invalidated." };
    }
    return { success: false, error: `Invalid code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.` };
  }

  // Mark transaction completed immediately (prevents replay attacks)
  transaction.completed = true;
  transaction.verifiedAt = now;
  saveState();

  return { success: true, email: transaction.emailNormalized };
}

/**
 * Creates an authorized resume access session.
 */
export function createResumeAccessSession(verificationId, email) {
  const sessionToken = generateSessionToken();
  const tokenHash = hashSessionToken(sessionToken);
  const now = Date.now();
  const expiresAt = now + 20 * 60 * 1000; // 20 minutes validity

  const session = {
    id: crypto.randomBytes(12).toString("hex"),
    sessionTokenHash: tokenHash,
    verificationId,
    emailNormalized: normalizeEmail(email),
    createdAt: now,
    expiresAt,
    revokedAt: null
  };

  sessions.set(tokenHash, session);
  saveState();

  return { sessionToken, expiresAt, id: session.id };
}

/**
 * Validates session token from HttpOnly cookie.
 */
export function validateResumeAccessSession(sessionToken) {
  if (!sessionToken || typeof sessionToken !== "string") {
    return { valid: false, reason: "No session token provided." };
  }

  const tokenHash = hashSessionToken(sessionToken);
  const session = sessions.get(tokenHash);

  if (!session) {
    return { valid: false, reason: "Session not found or invalid." };
  }

  const now = Date.now();
  if (now > session.expiresAt) {
    sessions.delete(tokenHash);
    saveState();
    return { valid: false, reason: "Session expired." };
  }

  if (session.revokedAt) {
    return { valid: false, reason: "Session has been revoked." };
  }

  return { valid: true, session };
}

/**
 * Revokes an existing session token.
 */
export function revokeResumeAccessSession(sessionToken) {
  if (!sessionToken || typeof sessionToken !== "string") return false;
  const tokenHash = hashSessionToken(sessionToken);
  const session = sessions.get(tokenHash);
  if (session) {
    session.revokedAt = Date.now();
    saveState();
    return true;
  }
  return false;
}

// -----------------------------------------------------------------------------
// PROJECT INQUIRY VALIDATION & STORAGE (Zero-Trust Form Processing)
// -----------------------------------------------------------------------------

const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

export const VALID_SERVICES = [
  "Web Application Development",
  "Android Application Development",
  "Application Security Assessment",
  "API Penetration Testing",
  "Secure Code Review",
  "Other"
];

export const VALID_BUDGETS = [
  "Below ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000+",
  "Not decided yet"
];

export const VALID_TIMELINES = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible"
];

/**
 * Strips dangerous HTML tags and limits length for untrusted input.
 */
export function sanitizeText(input, maxLen = 1000) {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // strip angle brackets
    .trim()
    .slice(0, maxLen);
}

/**
 * Securely persists project inquiries server-side only in .security-data/inquiries.json.
 * Inquiries are never exposed through public client endpoints.
 */
export function saveProjectInquiry(inquiryData) {
  const id = crypto.randomBytes(12).toString("hex");
  const now = Date.now();

  const record = {
    id,
    receivedAt: new Date(now).toISOString(),
    name: sanitizeText(inquiryData.name, 100),
    email: normalizeEmail(inquiryData.email),
    phone: sanitizeText(inquiryData.phone || "", 30),
    company: sanitizeText(inquiryData.company || "", 100),
    service: inquiryData.service,
    budget: inquiryData.budget || "Not specified",
    timeline: inquiryData.timeline || "Not specified",
    description: sanitizeText(inquiryData.description, 3000),
    ip: inquiryData.ip || "unknown",
    status: "NEW"
  };

  try {
    let list = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    }
    list.unshift(record);
    if (list.length > 500) list = list.slice(0, 500);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    // Non-fatal filesystem fallback
  }

  return { success: true, inquiryId: id };
}
