"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Cookie, ShieldCheck, Lock, ChevronLeft, Settings2, CheckCircle2 } from "lucide-react";

export default function CookiesPage() {
  const triggerCookieModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieConsent"));
    }
  };

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
              <span>COOKIE POLICY &amp; CONSENT GOVERNANCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
              Cookie &amp; Tracking Policy
            </h1>

            <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
              This document explains how this website utilizes cookies and local storage tokens to deliver secure application features, maintain zero-trust access control, and protect visitor privacy.
            </p>
          </div>

          <div className="space-y-8">

            {/* Quick Manage Banner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#171717] font-sans">
                  Manage Cookie Consent Preferences
                </h2>
                <p className="text-xs text-[#666666] font-sans mt-0.5">
                  You can change your consent preferences or withdraw consent at any time.
                </p>
              </div>

              <button
                onClick={triggerCookieModal}
                className="px-5 py-2.5 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white text-xs font-mono font-semibold transition-colors flex items-center gap-2 shadow-xs shrink-0"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Open Preferences</span>
              </button>
            </div>

            {/* Categories Breakdown */}
            <div className="space-y-6">

              {/* 1. Essential Cookies */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#3B5BFF]" />
                    <h3 className="text-sm font-bold font-mono text-[#171717] uppercase">
                      1. Strictly Necessary &amp; Security Cookies
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    REQUIRED
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-4">
                  Essential cookies are technically required for the operation of the website and cannot be deactivated without preventing basic functionality.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#E7E5E0] text-[#888888]">
                        <th className="pb-2 font-semibold">Cookie Identifier</th>
                        <th className="pb-2 font-semibold">Purpose</th>
                        <th className="pb-2 font-semibold text-right">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E5E0]">
                      <tr>
                        <td className="py-2.5 font-bold text-[#171717]">resume_session</td>
                        <td className="py-2.5 text-[#555555]">Authorizes preview and download of candidate CV after successful OTP verification. (HttpOnly, Secure)</td>
                        <td className="py-2.5 text-right text-[#171717]">20 minutes</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-[#171717]">chinmaya_cookie_consent_v1</td>
                        <td className="py-2.5 text-[#555555]">Persists your chosen cookie consent preferences in client storage so you aren't reprompted.</td>
                        <td className="py-2.5 text-right text-[#171717]">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Optional Analytics Cookies */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#888888]" />
                    <h3 className="text-sm font-bold font-mono text-[#171717] uppercase">
                      2. Optional Analytics &amp; Performance Cookies
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#666666] bg-[#FAF9F6] px-2.5 py-0.5 rounded border border-[#E7E5E0]">
                    OPTIONAL (DISABLED BY DEFAULT)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                  These cookies help measure anonymous aggregate site visits and page responsiveness. They are disabled until you explicitly opt in via the Cookie Consent banner or preferences dialog.
                </p>
              </div>

              {/* 3. Marketing Cookies */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#888888]" />
                    <h3 className="text-sm font-bold font-mono text-[#171717] uppercase">
                      3. Third-Party Advertising &amp; Marketing
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                    NONE USED
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                  We do not embed third-party advertising networks, cross-site trackers, or commercial marketing pixels on this website.
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
