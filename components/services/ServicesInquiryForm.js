"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  DollarSign, 
  Clock, 
  FileText,
  RotateCcw
} from "lucide-react";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

export default function ServicesInquiryForm({ selectedService, onServiceChange }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: selectedService || "Web Application Development",
    budget: "",
    timeline: "",
    description: "",
    consent: false,
    website: "" // Honeypot field (hidden from genuine users)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Sync if parent updates selectedService
  if (selectedService && formData.service !== selectedService && !formData.userChangedService) {
    setFormData((prev) => ({ ...prev, service: selectedService }));
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "service" && onServiceChange) {
      onServiceChange(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      userChangedService: name === "service" ? true : prev.userChangedService
    }));
    // Clear specific field error
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateClient = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid business or professional email address.";
    }
    if (!formData.service) {
      errors.service = "Please select a service category.";
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = "Please describe your project requirements (at least 10 characters).";
    }
    if (!formData.consent) {
      errors.consent = "You must agree to the Privacy Policy to submit an inquiry.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          description: formData.description.trim(),
          consent: formData.consent,
          website: formData.website // Honeypot
        })
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Unable to send your inquiry. Please try again or email directly.");
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("Network error communicating with the server. Please check your connection and try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "Web Application Development",
      budget: "",
      timeline: "",
      description: "",
      consent: false,
      website: ""
    });
    setFieldErrors({});
    setErrorMessage("");
    setIsSuccess(false);
  };

  return (
    <section id="inquiry" className="py-20 md:py-32 relative border-t border-[#E7E5E0] scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>START A PROJECT // SECURE INQUIRY FORM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4 font-sans">
            Have a Project in Mind? Let&apos;s Talk.
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            Tell me what you&apos;re planning to build or secure. Share your requirements, and I&apos;ll review your inquiry and get back to you with an architectural scope and next steps.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="rounded-3xl bg-white border border-[#E7E5E0] shadow-xs p-7 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            {/* Top Security Gate Badge */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-[#E7E5E0] text-xs font-mono">
              <div className="flex items-center gap-2 text-[#3B5BFF] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT INQUIRY GATE // ZERO-TRUST VALIDATED</span>
              </div>
              <span className="text-[#888888] hidden sm:inline">
                SLA: &lt; 24h Response
              </span>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-800 text-xs sm:text-sm font-sans flex items-start gap-3 mb-6 leading-relaxed">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block font-mono">Inquiry Submission Failed</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Success Banner */}
            {isSuccess ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="max-w-lg mx-auto space-y-3">
                  <h3 className="text-2xl font-extrabold text-[#171717] font-sans tracking-tight">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-[#555555] font-sans leading-relaxed">
                    Thank you for reaching out! Your project inquiry has been received. I&apos;ll review the details and get back to you.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] max-w-md mx-auto text-xs font-mono text-[#666666]">
                  A confirmation has been logged with server-side validation and rate-limit guardrails.
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-white border border-[#E7E5E0] hover:bg-[#FAF9F6] text-[#171717] text-xs font-mono font-semibold transition-colors inline-flex items-center gap-2 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#3B5BFF]" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot field (hidden from screen & tab navigation) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field blank</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Row 1: Full Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label 
                      htmlFor="inquiry-name" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Full Name <span className="text-[#3B5BFF]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="inquiry-name"
                        type="text"
                        name="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 pl-10 rounded-xl bg-[#FAF9F6] border ${
                          fieldErrors.name ? "border-rose-500 focus:border-rose-500" : "border-[#E7E5E0] focus:border-[#3B5BFF]"
                        } focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors`}
                      />
                      <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-600 font-mono mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label 
                      htmlFor="inquiry-email" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Business Email <span className="text-[#3B5BFF]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="inquiry-email"
                        type="email"
                        name="email"
                        required
                        maxLength={254}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@company.com"
                        className={`w-full px-4 py-3 pl-10 rounded-xl bg-[#FAF9F6] border ${
                          fieldErrors.email ? "border-rose-500 focus:border-rose-500" : "border-[#E7E5E0] focus:border-[#3B5BFF]"
                        } focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors`}
                      />
                      <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-600 font-mono mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone / WhatsApp & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label 
                      htmlFor="inquiry-phone" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Phone / WhatsApp <span className="text-[10px] text-[#888888] font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="inquiry-phone"
                        type="tel"
                        name="phone"
                        maxLength={30}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 pl-10 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#3B5BFF] focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors"
                      />
                      <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Company / Organization */}
                  <div>
                    <label 
                      htmlFor="inquiry-company" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Company / Organization <span className="text-[10px] text-[#888888] font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="inquiry-company"
                        type="text"
                        name="company"
                        maxLength={100}
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp or Startup name"
                        className="w-full px-4 py-3 pl-10 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#3B5BFF] focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors"
                      />
                      <Building2 className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Row 3: What Service Do You Need? */}
                <div>
                  <label 
                    htmlFor="inquiry-service" 
                    className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                  >
                    What Service Do You Need? <span className="text-[#3B5BFF]">*</span>
                  </label>
                  <select
                    id="inquiry-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#3B5BFF] focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors"
                  >
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="Android Application Development">Android Application Development</option>
                    <option value="Application Security Assessment">Application Security Assessment</option>
                    <option value="API Penetration Testing">API Penetration Testing</option>
                    <option value="Secure Code Review">Secure Code Review</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 4: Budget & Expected Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Budget */}
                  <div>
                    <label 
                      htmlFor="inquiry-budget" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Project Budget <span className="text-[10px] text-[#888888] font-normal">(Optional)</span>
                    </label>
                    <select
                      id="inquiry-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#3B5BFF] focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors"
                    >
                      <option value="">Select budget range...</option>
                      <option value="Below ₹10,000">Below ₹10,000</option>
                      <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                      <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                      <option value="₹50,000–₹1,00,000">₹50,000–₹1,00,000</option>
                      <option value="₹1,00,000+">₹1,00,000+</option>
                      <option value="Not decided yet">Not decided yet</option>
                    </select>
                  </div>

                  {/* Expected Timeline */}
                  <div>
                    <label 
                      htmlFor="inquiry-timeline" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold mb-2"
                    >
                      Expected Timeline <span className="text-[10px] text-[#888888] font-normal">(Optional)</span>
                    </label>
                    <select
                      id="inquiry-timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#3B5BFF] focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors"
                    >
                      <option value="">Select expected timeline...</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="inquiry-description" 
                      className="block text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold"
                    >
                      Project Description <span className="text-[#3B5BFF]">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#888888]">
                      {formData.description.length} / 3000 chars
                    </span>
                  </div>
                  <textarea
                    id="inquiry-description"
                    name="description"
                    required
                    rows={5}
                    maxLength={3000}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project, business requirements, features or security concerns..."
                    className={`w-full p-4 rounded-xl bg-[#FAF9F6] border ${
                      fieldErrors.description ? "border-rose-500 focus:border-rose-500" : "border-[#E7E5E0] focus:border-[#3B5BFF]"
                    } focus:bg-white text-xs sm:text-sm text-[#171717] outline-none transition-colors leading-relaxed`}
                  />
                  {fieldErrors.description && (
                    <p className="text-[11px] text-rose-600 font-mono mt-1">{fieldErrors.description}</p>
                  )}
                </div>

                {/* Privacy Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-[#E7E5E0] text-[#3B5BFF] focus:ring-[#3B5BFF] cursor-pointer"
                    />
                    <span className="text-xs text-[#666666] font-sans leading-relaxed group-hover:text-[#171717] transition-colors">
                      I agree to be contacted regarding my project inquiry and acknowledge the{" "}
                      <Link href="/privacy" className="text-[#3B5BFF] underline hover:text-[#2A4CE8]">
                        Privacy Policy
                      </Link>
                      . <span className="text-[#3B5BFF]">*</span>
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <p className="text-[11px] text-rose-600 font-mono mt-1 pl-7">{fieldErrors.consent}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <motion.button
                    {...buttonMotionProps}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] disabled:opacity-60 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Validating &amp; Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-[11px] font-mono text-[#888888] text-center pt-1">
                  Inquiries are validated server-side, rate-limited against abuse, and never shared with third parties.
                </p>

              </form>
            )}

          </motion.div>
        </div>

      </div>
    </section>
  );
}
