import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ChevronLeft, CheckCircle2, Clock, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Chinmaya Kumar Mishra",
  description:
    "Transparent explanation of personal data collection, verification purpose, session lifecycle, and zero-tracking commitment.",
  alternates: {
    canonical: "https://www.chinmayakumarmishra.sbs/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#3B5BFF] transition-colors mb-4 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
              <span>DATA TRANSPARENCY &amp; PRIVACY POLICY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
              Privacy Policy
            </h1>

            <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
              I believe privacy is an essential human right and a core pillar of modern software engineering. This policy details what data is collected, why it is collected, and how it is secured.
            </p>
          </div>

          <div className="space-y-8">

            {/* 1. What Information Is Collected */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#3B5BFF]" />
                <span>1. What Information Is Collected</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                <p>
                  This website collects the absolute minimum personal information required to function securely:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>Work or Personal Email Address:</strong> Collected solely when you voluntarily request access to my professional resume via the secure OTP verification gate.
                  </li>
                  <li>
                    <strong>Anonymized Access Telemetry:</strong> Anonymized IP addresses (e.g. <code className="text-[#171717] font-mono">192.168.1.xxx</code>) and timestamps are temporarily recorded in server-side security audit logs strictly to enforce rate limits and detect brute-force attacks.
                  </li>
                  <li>
                    <strong>Direct Message Submissions:</strong> If you use the contact form, the name, email address, topic, and message content you provide are transmitted directly to my personal inbox.
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Why Email Verification Is Required */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3B5BFF]" />
                <span>2. Why Email Verification Is Required</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-4">
                Publicly publishing unauthenticated PDF resumes on the web exposes candidate phone numbers, personal history, and contact details to automated web scrapers, recruiter spammers, and malicious credential indexers.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                Requiring email OTP verification ensures that resume access is limited to genuine human visitors and professional recruiters, while demonstrating a live, working application of authentication, session issuance, and protected file delivery controls.
              </p>
            </div>

            {/* 3. Data Retention Lifecycle */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#3B5BFF]" />
                <span>3. Data Retention &amp; Session Lifecycle</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                <p>
                  <strong>Verification OTP Codes:</strong> Expire automatically within <strong>5 minutes</strong> of generation. Raw codes are never stored on disk; only HMAC-SHA256 hashes are held in memory during the transaction.
                </p>
                <p>
                  <strong>Resume Access Sessions:</strong> Once verified, an HttpOnly cookie authorizes file downloads for <strong>20 minutes</strong>, after which the session automatically terminates. Visitors can revoke their session at any time using the "Revoke" button in the access modal.
                </p>
                <p>
                  <strong>Audit Records:</strong> Security rate-limiting entries and anonymized audit logs are purged on rolling 24-hour cycles.
                </p>
              </div>
            </div>

            {/* 4. Zero Tracking by Default */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-[#3B5BFF]" />
                <span>4. Analytics &amp; Third-Party Tracking</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-3">
                This website does <strong>not</strong> load third-party marketing trackers, advertising pixels, or invasive behavioral profiling tools.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                Any future non-essential performance telemetry is strictly subject to prior consent through our <Link href="/cookies" className="text-[#3B5BFF] hover:underline font-mono">Cookie Consent Banner</Link>, and you retain the absolute right to reject all optional cookies.
              </p>
            </div>

            {/* 5. Contact Regarding Privacy */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#3B5BFF]" />
                <span>5. Inquiries &amp; Privacy Requests</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                If you have questions regarding this policy, wish to request removal of any message you previously submitted, or have security concerns, please reach out directly to:
              </p>
              <div className="mt-3 font-mono text-xs text-[#171717] font-bold">
                imchinu17@gmail.com
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
