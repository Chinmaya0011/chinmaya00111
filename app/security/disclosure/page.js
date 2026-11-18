import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Mail, ChevronLeft, CheckCircle2, AlertCircle, Lock, Key } from "lucide-react";

export const metadata = {
  title: "Responsible Vulnerability Disclosure Policy | Chinmaya Kumar Mishra",
  description:
    "Responsible security disclosure guidelines, reporting instructions, scope, and communication timelines for security researchers.",
  alternates: {
    canonical: "https://www.chinmayakumarmishra.sbs/security/disclosure",
  },
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-transparent text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/security"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#3B5BFF] transition-colors mb-4 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Security Architecture</span>
            </Link>

            <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
              <span>COORDINATED VULNERABILITY DISCLOSURE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
              Vulnerability Disclosure Policy
            </h1>

            <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
              As an application security engineer, I value the work of the security research community. If you believe you have discovered a vulnerability, security flaw, or privacy weakness in any system belonging to this domain, please report it responsibly following the guidelines below.
            </p>
          </div>

          {/* Guidelines Body */}
          <div className="space-y-8">

            {/* Scope */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3B5BFF]" />
                <span>In-Scope Systems &amp; Assets</span>
              </h2>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555] font-sans mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Primary Domain:</strong> <code className="text-[#171717] font-mono">https://www.chinmayakumarmishra.sbs</code> and <code className="text-[#171717] font-mono">https://chinmayakumarmishra.sbs</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Application Routes:</strong> All Next.js App Router endpoints, including <code className="text-[#171717] font-mono">/api/resume/*</code> and session management logic.</span>
                </li>
              </ul>

              <h3 className="text-xs font-mono uppercase tracking-wider text-[#888888] font-bold mb-2">
                Out-of-Scope Activities
              </h3>
              <p className="text-xs text-[#666666] font-sans leading-relaxed mb-3">
                Please refrain from the following activities, as they disrupt service availability or breach third-party rights:
              </p>
              <ul className="space-y-1.5 text-xs text-[#666666] font-sans list-disc pl-5">
                <li>Volumetric Denial of Service (DoS / DDoS) attacks or resource exhaustion.</li>
                <li>Social engineering, phishing, or physical attacks against individuals.</li>
                <li>Accessing, modifying, or exfiltrating data belonging to other visitors.</li>
                <li>Executing automated vulnerability scanners with abusive request rates that degrade server uptime.</li>
              </ul>
            </div>

            {/* Reporting Instructions */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#3B5BFF]" />
                <span>How to Report</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-4">
                Please dispatch your findings via email directly to:
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#888888] uppercase block">SECURITY CONTACT</span>
                  <a
                    href="mailto:imchinu17@gmail.com"
                    className="font-mono text-sm sm:text-base font-bold text-[#171717] hover:text-[#3B5BFF] transition-colors"
                  >
                    imchinu17@gmail.com
                  </a>
                </div>
                <span className="text-xs font-mono text-[#3B5BFF]">GPG Optional</span>
              </div>

              <p className="text-xs text-[#555555] font-sans leading-relaxed mb-4">
                To help me investigate and resolve the issue quickly, please include:
              </p>

              <ul className="space-y-1.5 text-xs text-[#555555] font-sans list-disc pl-5 mb-4">
                <li>A clear description of the vulnerability and its potential impact.</li>
                <li>Step-by-step reproduction instructions or a minimal proof-of-concept (HTTP request/response).</li>
                <li>The affected URL or API endpoint.</li>
                <li>Your preferred credit or disclosure preferences.</li>
              </ul>
            </div>

            {/* Communication Timeline & Safe Harbor */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#3B5BFF]" />
                <span>Commitment &amp; Safe Harbor</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                <p>
                  <strong>Acknowledgment:</strong> I commit to acknowledging reports within <strong>48 hours</strong> of receipt and providing regular updates regarding validation and remediation.
                </p>
                <p>
                  <strong>Safe Harbor:</strong> If you conduct your security research in good faith, avoid privacy violations, do not destroy data, and avoid service disruptions, I will not initiate legal action against you or request law enforcement investigation regarding your research.
                </p>
                <p className="text-[11px] font-mono text-[#888888]">
                  Note: This website operates on personal infrastructure. I do not run a commercial monetary bug bounty program at this time, but I am pleased to provide public credit and recommendation for verified security findings.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
