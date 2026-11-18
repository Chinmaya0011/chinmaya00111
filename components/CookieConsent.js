"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, Settings2, Check, X, Lock } from "lucide-react";
import Link from "next/link";

const CONSENT_STORAGE_KEY = "chinmaya_cookie_consent_v1";

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if consent has already been granted or customized
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Show after slight delay for smooth page entrance
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences({
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing)
        });
      }
    } catch (err) {
      // LocalStorage unavailable
    }

    // Global listener to re-open settings from Footer or Privacy Center
    const handleReopen = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };

    window.addEventListener("openCookieConsent", handleReopen);
    return () => window.removeEventListener("openCookieConsent", handleReopen);
  }, []);

  const saveConsent = (analyticsState, marketingState) => {
    const payload = {
      version: 1,
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: analyticsState,
      marketing: marketingState
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      // Non-blocking
    }

    setPreferences({
      essential: true,
      analytics: analyticsState,
      marketing: marketingState
    });

    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleRejectOptional = () => saveConsent(false, false);
  const handleSavePreferences = () => saveConsent(preferences.analytics, preferences.marketing);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center p-4 sm:p-6 md:p-8">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-xl bg-white border border-[#E7E5E0] rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden"
        >
          {!showPreferences ? (
            /* Main Banner View */
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0 border border-[#3B5BFF]/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#3B5BFF] uppercase tracking-wider block">
                      PRIVACY &amp; SECURITY
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#171717] font-sans tracking-tight">
                      Your Privacy Matters
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleRejectOptional}
                  className="p-1.5 rounded-lg text-[#888888] hover:text-[#171717] hover:bg-[#FAF9F6] transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-5">
                This website uses essential cookies to provide secure functionality and protected file delivery. Optional analytics are disabled by default and only loaded with your explicit permission.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t border-[#E7E5E0]">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] hover:bg-[#F3F2EE] text-xs font-mono font-semibold text-[#171717] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#666666]" />
                  <span>Customize</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRejectOptional}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#E7E5E0] hover:bg-[#FAF9F6] text-xs font-mono font-semibold text-[#171717] transition-colors"
                  >
                    Reject Optional
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white text-xs font-mono font-semibold transition-colors shadow-xs"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Detailed Preferences Panel */
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E5E0]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3B5BFF]">
                  <Cookie className="w-4 h-4" />
                  <span>COOKIE PREFERENCE CENTER</span>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-xs font-mono text-[#888888] hover:text-[#171717]"
                >
                  ← Back
                </button>
              </div>

              <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1 mb-5">
                {/* Essential Cookies Category */}
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#171717] font-mono flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#3B5BFF]" />
                      <span>Essential &amp; Security Cookies</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ALWAYS ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666] font-sans leading-relaxed">
                    Strictly required for resume OTP verification sessions, CSRF mitigation, and essential site navigation. Cannot be disabled.
                  </p>
                </div>

                {/* Optional Analytics Cookies */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#171717] font-mono">
                      Telemetry &amp; Performance Analytics
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#E7E5E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B5BFF]"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#666666] font-sans leading-relaxed">
                    Helps understand anonymous page engagement and device responsiveness. Disabled by default.
                  </p>
                </div>

                {/* Optional Marketing Cookies */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#171717] font-mono">
                      Marketing &amp; Personalization
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#E7E5E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B5BFF]"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#666666] font-sans leading-relaxed">
                    External referral tracking and audience insights. Disabled by default.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E7E5E0]">
                <Link
                  href="/cookies"
                  className="text-xs font-mono text-[#3B5BFF] hover:underline"
                >
                  Read Cookie Policy →
                </Link>

                <button
                  onClick={handleSavePreferences}
                  className="px-5 py-2 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white text-xs font-mono font-semibold transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
