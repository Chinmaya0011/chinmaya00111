import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Server, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Activity, 
  Terminal, 
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  Cpu,
  Layers,
  Database
} from "lucide-react";

export const metadata = {
  title: "Security Engineering & Architecture | Chinmaya Kumar Mishra",
  description:
    "Technical documentation of the real application security controls, cryptographic verification gates, and browser hardening implemented across this website.",
  alternates: {
    canonical: "https://www.chinmayakumarmishra.sbs/security",
  },
};

export default function SecurityPage() {
  const securityControls = [
    {
      category: "ACCESS CONTROL & SECURE FILE DELIVERY",
      icon: KeyRound,
      items: [
        {
          name: "Whitelisted Resume Variant Delivery",
          desc: "Documents are resolved strictly through a server-side whitelist ('appsec', 'ai-appsec', 'fullstack'). Direct client-controlled filesystem paths and relative directory navigators ('../') are rejected, mitigating LFI and path traversal."
        },
        {
          name: "Zero-Trust Project Inquiry Gate",
          desc: "Inquiries submitted via /api/inquiries undergo strict server-side sanitization, RFC 5322 normalization, honeypot spam trapping, and sliding-window rate-limiting."
        },
        {
          name: "Constant-Time Comparison & Cryptographic Hashing",
          desc: "Sensitive comparisons utilize crypto.timingSafeEqual to eliminate timing side-channel attacks. Secrets and session digests are signed with HMAC-SHA256."
        },
        {
          name: "Controlled Document Disposition Headers",
          desc: "Resumes are streamed with explicit Content-Type: application/pdf, X-Content-Type-Options: nosniff, and controlled disposition (inline for preview, attachment for download)."
        }
      ]
    },
    {
      category: "API SECURITY & DEFENSE-IN-DEPTH",
      icon: Server,
      items: [
        {
          name: "Strict Input Normalization & Validation",
          desc: "Incoming requests validate Content-Type: application/json, enforce 10KB payload body caps, and normalize emails according to strict RFC 5322 constraints."
        },
        {
          name: "Sliding Window Rate Limiting",
          desc: "Multi-layered rate limiters throttle IP addresses (max 5 OTP requests per 10 mins) and email destinations (max 3 per 10 mins) to mitigate credential stuffing and email flooding."
        },
        {
          name: "Path Traversal & Direct Object Reference Prevention",
          desc: "File requests whitelist permitted document variants ('appsec', 'ai-appsec', 'fullstack'). Direct client-controlled filesystem paths and relative directory navigators ('../') are rejected."
        },
        {
          name: "Fail-Safe Error Handling",
          desc: "Server errors return generic, actionable JSON responses. Internal filesystem paths, database queries, and stack traces are suppressed in API responses."
        }
      ]
    },
    {
      category: "BROWSER HARDENING & HEADERS",
      icon: ShieldCheck,
      items: [
        {
          name: "Strict-Transport-Security (HSTS)",
          desc: "Configured with max-age=63072000; includeSubDomains; preload to mandate encrypted HTTPS connections and resist SSL stripping."
        },
        {
          name: "Content-Security-Policy (CSP)",
          desc: "Restricts script execution, disables unauthorized object embeddings (object-src 'none'), and strictly blocks clickjacking via frame-ancestors 'none'."
        },
        {
          name: "MIME Sniffing & Framing Defenses",
          desc: "Enforces X-Content-Type-Options: nosniff and X-Frame-Options: DENY across all application endpoints."
        },
        {
          name: "Permissions-Policy",
          desc: "Explicitly revokes browser hardware access (camera=(), microphone=(), geolocation=(), browsing-topics=()) across the domain."
        }
      ]
    },
    {
      category: "DATA PROTECTION & PRIVACY",
      icon: Lock,
      items: [
        {
          name: "HttpOnly, Secure, SameSite=Lax Cookies",
          desc: "Session tokens are transmitted exclusively in HttpOnly cookies with SameSite=Lax protection, rendering them inaccessible to client-side JavaScript and cross-site scripts."
        },
        {
          name: "Minimal Data Collection & Privacy Anonymization",
          desc: "Audit logs mask client IP addresses (e.g. 192.168.1.xxx) and email addresses (e.g. im***@gmail.com). Session records automatically expire after 20 minutes."
        },
        {
          name: "Consent-Before-Telemetry",
          desc: "Zero tracking or non-essential cookies are loaded before explicit user agreement. Preferences can be customized or revoked at any time."
        }
      ]
    }
  ];

  const headersList = [
    { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload", status: "ENFORCED" },
    { name: "X-Content-Type-Options", value: "nosniff", status: "ENFORCED" },
    { name: "X-Frame-Options", value: "DENY", status: "ENFORCED" },
    { name: "Referrer-Policy", value: "strict-origin-when-cross-origin", status: "ENFORCED" },
    { name: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()", status: "ENFORCED" },
    { name: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self';", status: "ENFORCED" },
    { name: "X-XSS-Protection", value: "0 (Disables legacy buggy auditor in favor of CSP)", status: "MODERN STANDARD" }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

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
              <span>SECURITY POSTURE &amp; CONTROLS ARCHITECTURE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
              Application Security Architecture
            </h1>

            <p className="text-[#666666] text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
              This website is engineered to embody real application security principles. Below is an authoritative technical overview of the controls, verification gates, cryptographic safeguards, and browser hardening implemented across the platform.
            </p>
          </div>

          {/* Security Architecture Diagram Box */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs mb-12">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E7E5E0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                  DEFENSIVE API &amp; SECURE FILE DELIVERY FLOW
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                VERIFIED ARCHITECTURE
              </span>
            </div>

            {/* Architecture Node Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-[#888888] block mb-1">NODE 01</span>
                <span className="text-xs font-bold text-[#171717] block font-mono">Visitor Client</span>
                <span className="text-[11px] text-[#666666] block mt-1">Direct Variant Selection</span>
              </div>

              <div className="flex items-center justify-center text-[#3B5BFF] font-mono text-sm hidden md:flex">
                →
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-[#888888] block mb-1">NODE 02</span>
                <span className="text-xs font-bold text-[#171717] block font-mono">Next.js API Gate</span>
                <span className="text-[11px] text-[#666666] block mt-1">Whitelist Variant Lookup</span>
              </div>

              <div className="flex items-center justify-center text-[#3B5BFF] font-mono text-sm hidden md:flex">
                →
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-[#888888] block mb-1">NODE 03</span>
                <span className="text-xs font-bold text-[#171717] block font-mono">Hardened Delivery</span>
                <span className="text-[11px] text-[#666666] block mt-1">Content-Disposition Stream</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E7E5E0] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#555555] font-sans">
              <p>
                <strong>Resume Delivery:</strong> The client requests a resume profile from <code className="text-[#171717] bg-[#FAF9F6] px-1 py-0.5 rounded">/api/resume/preview</code> or <code className="text-[#171717] bg-[#FAF9F6] px-1 py-0.5 rounded">/api/resume/download</code>. The server strictly resolves the variant against a server-side whitelist, stream-servicing the PDF with security headers.
              </p>
              <p>
                <strong>Inquiry Processing:</strong> Project inquiries submitted via <code className="text-[#171717] bg-[#FAF9F6] px-1 py-0.5 rounded">/api/inquiries</code> undergo honeypot spam detection, input sanitization, and sliding-window rate limiting before safe server-side persistence.
              </p>
            </div>
          </div>

          {/* 4 Security Control Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityControls.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.category}
                  className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#E7E5E0]">
                      <div className="w-10 h-10 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0 border border-[#3B5BFF]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-sm font-mono font-bold text-[#171717] uppercase tracking-wider">
                        {pillar.category}
                      </h2>
                    </div>

                    <div className="space-y-5">
                      {pillar.items.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <h3 className="text-sm font-bold text-[#171717] font-sans flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF]" />
                            <span>{item.name}</span>
                          </h3>
                          <p className="text-xs text-[#555555] font-sans leading-relaxed pl-3.5">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Verified Security Headers Inspector */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#E7E5E0]">
              <div>
                <span className="text-[10px] font-mono text-[#3B5BFF] font-bold uppercase tracking-wider block mb-1">
                  SERVER AUDIT // LIVE TELEMETRY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                  Configured Security Headers
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GRADE A+ COMPLIANT</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E7E5E0] text-[#888888]">
                    <th className="pb-3 font-semibold uppercase tracking-wider">Header Name</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider">Configured Value</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E0]">
                  {headersList.map((h) => (
                    <tr key={h.name} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-3.5 font-bold text-[#171717] pr-4">{h.name}</td>
                      <td className="py-3.5 text-[#555555] break-all pr-4">{h.value}</td>
                      <td className="py-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">{h.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Responsible Disclosure Quick Banner */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#171717] text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-1.5">
                VULNERABILITY DISCLOSURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2 text-white">
                Discovered a potential vulnerability?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl leading-relaxed">
                I welcome responsible vulnerability reporting and pledge to acknowledge and investigate any security concerns promptly.
              </p>
            </div>

            <Link
              href="/security/disclosure"
              className="px-6 py-3 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Review Disclosure Policy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
