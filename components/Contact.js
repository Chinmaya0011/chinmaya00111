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
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

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
    <section id="contact" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CONTACT // 09 // GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Let&apos;s build something secure.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
            Open to full-stack and application security roles, and freelance projects. I reply within 24 hours.
          </p>
        </motion.div>

        {/* Split Layout: Info Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-3 glass-card">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-medium">DIRECT EMAIL</span>
                  <a
                    href={personalInfo.links.email}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 font-mono transition-colors truncate block focus:outline-none focus:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <motion.button
                {...buttonMotionProps}
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-emerald-500/40 transition-colors text-xs font-mono shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </motion.button>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-between group glass-card"
                aria-label="Open GitHub Profile in new tab"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </motion.a>

              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-between group glass-card"
                aria-label="Open LinkedIn Profile in new tab"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </motion.a>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400 glass-card">
              <span className="text-emerald-400 mr-2">●</span>
              <span>Available for full-time and contract roles. Fast response guaranteed.</span>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 backdrop-blur-md glass-card">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono">
                    Message Sent
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans">
                    Thank you for reaching out. I reply within 24 hours.
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
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5 font-medium">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5 font-medium">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5 font-medium">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, team, or security challenge..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    {...buttonMotionProps}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0A0A0B] font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </motion.button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
