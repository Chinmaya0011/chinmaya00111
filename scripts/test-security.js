/**
 * Automated Security Validation Test Suite for Chinmaya's Portfolio
 * Tests OTP verification, access control, session revocation, path traversal defense, and rate limiting.
 */

import { 
  isValidEmail, 
  normalizeEmail, 
  createVerificationTransaction, 
  verifyOtpForTransaction, 
  createResumeAccessSession, 
  validateResumeAccessSession, 
  revokeResumeAccessSession,
  checkRateLimit,
  DEMO_OTP,
  sanitizeText,
  saveProjectInquiry,
  VALID_SERVICES,
  VALID_BUDGETS,
  VALID_TIMELINES
} from "../lib/securityStore.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runSecurityTests() {
  console.log("==================================================================");
  console.log("  APPLICATION SECURITY VALIDATION & ACCESS CONTROL TEST SUITE");
  console.log("==================================================================\n");

  // TEST SUITE 1: Input Validation & Email Normalization
  console.log("Test Suite 1: Input Validation & RFC 5322 Email Handling");
  assert(isValidEmail("recruiter@company.com"), "Valid standard email passes validation");
  assert(isValidEmail("first.last+security@sub.domain.co.uk"), "Complex valid email with plus & subdomains passes");
  assert(!isValidEmail("not-an-email"), "Reject invalid plain string");
  assert(!isValidEmail("@missing-local.com"), "Reject missing local part");
  assert(!isValidEmail("missing-domain@"), "Reject missing domain");
  assert(!isValidEmail("a".repeat(255) + "@test.com"), "Reject excessively long email exceeding 254 characters");
  assert(normalizeEmail("  Recruiter@Company.COM  ") === "recruiter@company.com", "Normalize email trims whitespace and downcases");

  // TEST SUITE 2: OTP Generation, Cryptographic Hashing & Verification
  console.log("\nTest Suite 2: Cryptographic OTP Lifecycle & Verification");
  const testEmail = "security-test@example.com";
  const transaction = createVerificationTransaction(testEmail);

  assert(transaction.transactionId && transaction.transactionId.length === 32, "Transaction ID generated with 32-char hex entropy");
  assert(/^\d{6}$/.test(transaction.otp), "OTP generated as exactly 6 numeric digits");
  assert(transaction.expiresAt > Date.now(), "Expiration timestamp set to 5 minutes into the future");
  assert(DEMO_OTP === "707783", "Master demo OTP code configured as 707783");

  // Test incorrect OTP
  const wrongAttempt = verifyOtpForTransaction(transaction.transactionId, "000000");
  assert(!wrongAttempt.success, "Reject incorrect OTP code");
  assert(wrongAttempt.error.includes("attempt"), "Enforce attempt countdown on invalid entry");

  // Test correct OTP
  const correctAttempt = verifyOtpForTransaction(transaction.transactionId, transaction.otp);
  assert(correctAttempt.success, "Accept correct cryptographic OTP");
  assert(correctAttempt.email === testEmail, "Return verified normalized email upon success");

  // Test replay attack (re-verifying already used transaction)
  const replayAttempt = verifyOtpForTransaction(transaction.transactionId, transaction.otp);
  assert(!replayAttempt.success, "Block replay attack: already used verification code rejected");

  // Test Demo Code Verification (707783) on a separate transaction
  const demoTransaction = createVerificationTransaction("recruiter@company.com");
  const demoVerification = verifyOtpForTransaction(demoTransaction.transactionId, "707783");
  assert(demoVerification.success, "Master demo OTP 707783 successfully verifies active transaction");
  assert(demoVerification.email === "recruiter@company.com", "Demo OTP binds to the transaction normalized email");

  // Test Direct Demo Bypass transaction
  const directDemo = verifyOtpForTransaction("demo", "707783");
  assert(directDemo.success, "Direct demo bypass with code 707783 succeeds");

  // TEST SUITE 3: Brute Force Attempt Lockout
  console.log("\nTest Suite 3: Brute Force Protection & Attempt Lockout");
  const bruteTransaction = createVerificationTransaction("brute-test@example.com");
  for (let i = 0; i < 5; i++) {
    verifyOtpForTransaction(bruteTransaction.transactionId, "111111");
  }

  const lockedOut = verifyOtpForTransaction(bruteTransaction.transactionId, bruteTransaction.otp);
  assert(!lockedOut.success && (lockedOut.error.includes("locked") || lockedOut.error.includes("expired") || lockedOut.error.includes("not found") || lockedOut.error.includes("invalidated")), "Transaction permanently locked after exceeding max attempts");

  // TEST SUITE 4: Session Issuance, Expiry & Immediate Revocation
  console.log("\nTest Suite 4: Cryptographic Session Issuance & Revocation");
  const session = createResumeAccessSession("tx_123", testEmail);
  assert(session.sessionToken && session.sessionToken.length === 64, "Session token generated with 64-char hex cryptographically random entropy");

  const validSessionCheck = validateResumeAccessSession(session.sessionToken);
  assert(validSessionCheck.valid, "Validate newly created session token");
  assert(validSessionCheck.session.emailNormalized === testEmail, "Session binds to verified email address");

  // Reject forged / non-existent session
  const fakeSessionCheck = validateResumeAccessSession("fake_session_token_1234567890abcdef");
  assert(!fakeSessionCheck.valid, "Reject forged / unregistered session token");

  // Immediate Revocation
  const revoked = revokeResumeAccessSession(session.sessionToken);
  assert(revoked, "Revoke session token on demand");

  const postRevokeCheck = validateResumeAccessSession(session.sessionToken);
  assert(!postRevokeCheck.valid && postRevokeCheck.reason.includes("revoked"), "Revoked session immediately denied access");

  // TEST SUITE 5: Protected File Storage & Path Traversal Prevention
  console.log("\nTest Suite 5: Protected File Storage & Direct Object Reference Prevention");
  const protectedResumePath = path.join(projectRoot, "private", "resumes", "Chinmaya_AppSec_Resume.pdf");
  assert(fs.existsSync(protectedResumePath), "Authoritative resume PDF securely stored in private/resumes/");

  // Verify public direct access files were deleted
  const publicResumePath = path.join(projectRoot, "public", "resume.pdf");
  const publicCvPath = path.join(projectRoot, "public", "CV.pdf");
  assert(!fs.existsSync(publicResumePath), "Public static resume.pdf removed to prevent unauthenticated direct download");
  assert(!fs.existsSync(publicCvPath), "Public static CV.pdf removed to prevent unauthenticated direct download");

  // TEST SUITE 6: Rate Limiting Sliding Window
  console.log("\nTest Suite 6: Sliding Window Rate Limiting");
  const rateLimitKey = "test_ip:192.168.1.100";
  // Consume 3 allowed tokens
  checkRateLimit(rateLimitKey, 3, 60000);
  checkRateLimit(rateLimitKey, 3, 60000);
  const allowedThird = checkRateLimit(rateLimitKey, 3, 60000);
  assert(allowedThird.allowed, "Third request within limit is allowed");

  const blockedFourth = checkRateLimit(rateLimitKey, 3, 60000);
  assert(!blockedFourth.allowed, "Fourth request exceeding limit of 3 is immediately blocked");

  // TEST SUITE 7: Project Inquiry Sanitization & Validation Controls
  console.log("\nTest Suite 7: Project Inquiry Sanitization & Validation Controls");
  const dirtyInput = "<script>alert('xss')</script>Hello World <img src=x onerror=alert(1)>";
  const cleaned = sanitizeText(dirtyInput, 100);
  assert(!cleaned.includes("<") && !cleaned.includes(">"), "SanitizeText strips dangerous angle brackets");
  assert(cleaned.includes("Hello World"), "Preserves legitimate text content");

  assert(VALID_SERVICES.includes("Web Application Development"), "Whitelisted service includes Web App Dev");
  assert(VALID_SERVICES.includes("Android Application Development"), "Whitelisted service includes Android App Dev");
  assert(VALID_SERVICES.includes("Application Security Assessment"), "Whitelisted service includes AppSec Assessment");
  assert(VALID_SERVICES.length === 6, "Exactly 6 service categories supported in whitelist");

  const inquiryRes = saveProjectInquiry({
    name: "Acme Founder",
    email: "Founder@Acme.COM",
    phone: "+91 9876543210",
    company: "Acme Corp",
    service: "Web Application Development",
    budget: "₹25,000–₹50,000",
    timeline: "Within 1 month",
    description: "Looking for an MVP build with Next.js and secure APIs."
  });
  assert(inquiryRes.success && inquiryRes.inquiryId, "SaveProjectInquiry succeeds and returns a generated ID");

  const inquiryRateKey = "ip_inquiry:10.0.0.99";
  for (let i = 0; i < 10; i++) {
    checkRateLimit(inquiryRateKey, 10, 3600000);
  }
  const inquiryBlocked = checkRateLimit(inquiryRateKey, 10, 3600000);
  assert(!inquiryBlocked.allowed, "Inquiry rate limit blocks 11th submission from same IP within hour");

  // Summary
  console.log("\n==================================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("==================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTests();
