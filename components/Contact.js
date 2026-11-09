"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#03070A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-sm bg-emerald-400" />
            <span>CONTACT // 09 // GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Let&apos;s Connect.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Open to Full-Stack Development and Application Security opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 transition-all flex items-center justify-between gap-3 glow-card">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0C1520] border border-white/[0.08] flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">EMAIL</span>
                  <a
                    href={personalInfo.links.email}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 font-mono transition-colors truncate block"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-[#0C1520] border border-white/[0.08] text-slate-300 hover:text-white hover:border-emerald-500/30 transition-all text-xs font-mono shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>

          </div>

          {/* Right Column: Compact Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#060C14] border border-white/[0.08] p-6 sm:p-7 backdrop-blur-xl">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono">
                    Message Sent
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                    Thank you for reaching out. I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="mt-3 text-xs font-mono text-emerald-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#03070A] border border-white/[0.08] focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#03070A] border border-white/[0.08] focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Your message..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#03070A] border border-white/[0.08] focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
