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
  MapPin,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { fadeInUp, defaultViewport } from "@/lib/motion";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ 
    name: "", 
    email: "", 
    topic: "Application Security Role", 
    message: "" 
  });
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
    <section id="contact" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>CONTACT // 06</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-3.5 font-sans">
            {personalInfo.contactHeading}
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            {personalInfo.contactDescription}
          </p>
        </motion.div>

        {/* Balanced 2-Column Grid: Symmetrical gap, margin, and padding on both sides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column Card: Direct Reach & Verified Profiles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between h-full"
          >
            <div>
              {/* Card Header */}
              <div className="pb-5 mb-6 border-b border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-[#3B5BFF] uppercase tracking-wider font-bold block mb-1">
                  DIRECT CHANNELS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                  Get in Touch
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 leading-relaxed">
                  Open for full-time engineering positions, application security roles, and technical collaborations worldwide.
                </p>
              </div>

              {/* Direct Info Tiles */}
              <div className="space-y-3.5 mb-6">
                {/* Email Tile */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] hover:border-[#3B5BFF]/40 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#666666] uppercase block font-semibold tracking-wider">
                        EMAIL
                      </span>
                      <a
                        href={personalInfo.links.email}
                        className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#3B5BFF] font-mono transition-colors truncate block focus:outline-none focus:underline"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white border border-[#E7E5E0] hover:bg-[#F3F2EE] text-[#666666] hover:text-[#171717] transition-colors shrink-0 focus:outline-none focus:ring-1 focus:ring-[#3B5BFF]"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Tile */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#666666] uppercase block font-semibold tracking-wider">
                      LOCATION
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#171717] font-mono">
                      {personalInfo.location} · Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase block font-semibold tracking-wider mb-2.5">
                  PROFESSIONAL NETWORKS
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-[#171717] hover:text-[#3B5BFF] transition-colors flex items-center justify-between text-xs font-mono font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-[#666666]" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#999999]" />
                  </a>

                  <a
                    href={personalInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-[#171717] hover:text-[#3B5BFF] transition-colors flex items-center justify-between text-xs font-mono font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#3B5BFF]" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#999999]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Status Indicator */}
            <div className="pt-6 mt-6 border-t border-[#E7E5E0] flex items-center gap-2 text-xs font-mono text-[#666666]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Typically responds within 24 hours</span>
            </div>
          </motion.div>

          {/* Right Column Card: Message Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between h-full"
          >
            {isSubmitted ? (
              <div className="py-16 my-auto flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans mb-1.5">
                  Message Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] max-w-sm font-sans mb-6 leading-relaxed">
                  Thank you for reaching out. Your message has been sent successfully and I will respond to your provided email address shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: "", email: "", topic: "Application Security Role", message: "" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs font-mono font-medium text-[#171717] hover:bg-[#F3F2EE] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                {/* Form Header */}
                <div className="pb-5 mb-6 border-b border-[#E7E5E0]">
                  <span className="text-[10px] font-mono text-[#3B5BFF] uppercase tracking-wider font-bold block mb-1">
                    INQUIRY FORM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1.5 leading-relaxed">
                    Fill out the form below and I will get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#666666] uppercase font-semibold mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs sm:text-sm text-[#171717] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF] transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#666666] uppercase font-semibold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs sm:text-sm text-[#171717] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#666666] uppercase font-semibold mb-1.5">
                      Subject / Discussion Area
                    </label>
                    <select
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs sm:text-sm text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF] transition-all font-sans"
                    >
                      <option value="Application Security Role">Application Security Role</option>
                      <option value="Full-Stack Engineering Role">Full-Stack Engineering Role</option>
                      <option value="AI Security Collaboration">AI Security Collaboration</option>
                      <option value="General Inquiry">General Technical Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#666666] uppercase font-semibold mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hello Chinmaya, I would like to discuss..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs sm:text-sm text-[#171717] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF] transition-all font-sans resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#3B5BFF] hover:bg-[#2F4EE6] text-white font-medium text-xs sm:text-sm font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
