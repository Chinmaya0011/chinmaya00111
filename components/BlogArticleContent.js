"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  Lightbulb,
  Info,
  Github,
  Linkedin,
  ArrowRight,
  BookOpen,
  Network
} from "lucide-react";

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 text-[11px]">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span className="text-[11px]">Copy</span>
        </>
      )}
    </button>
  );
}

export function ShareButton({ title, slug }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://www.chinmayakumarmishra.sbs/blogs/${slug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-2 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F3F2EE] text-xs font-mono font-medium text-[#171717] flex items-center justify-center gap-2 transition-colors shadow-xs"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-600">Link Copied to Clipboard</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-[#3B5BFF]" />
          <span>Share Article Link</span>
        </>
      )}
    </button>
  );
}

export default function BlogArticleContent({ post }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

      {/* Main Content Column (8 cols) */}
      <article className="lg:col-span-8 space-y-12">

          {
            post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight font-sans mb-5 pb-3 border-b border-[#E7E5E0]">
                  {section.heading}
                </h2>

                {/* Markdown / Paragraph text */}
                <div className="prose prose-zinc max-w-none text-[#171717] text-base leading-relaxed space-y-4 font-sans">
                  {section.body.split("\n\n").map((para, pIdx) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;

                    // Handle numbered list items or bullet points
                    if (trimmed.startsWith("1.") || trimmed.startsWith("-")) {
                      const lines = trimmed.split("\n");
                      return (
                        <ul key={pIdx} className="space-y-2.5 my-4 pl-2 list-none">
                          {lines.map((l, lIdx) => {
                            const cleanLine = l.replace(/^[-*]|\d+\.\s*/, "").trim();
                            const parts = cleanLine.split(":**");
                            const hasBoldPrefix = parts.length > 1 && cleanLine.startsWith("**");

                            return (
                              <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#333333] leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF] mt-2 flex-shrink-0" />
                                <span>
                                  {hasBoldPrefix ? (
                                    <>
                                      <strong className="text-[#171717] font-bold">
                                        {parts[0].replace(/\*\*/g, "")}:
                                      </strong>
                                      {" " + parts[1]}
                                    </>
                                  ) : (
                                    cleanLine.replace(/\*\*/g, "")
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }

                    return (
                      <p key={pIdx} className="text-base text-[#333333] leading-relaxed">
                        {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
                      </p>
                    );
                  })}
                </div>

                    {/* Architecture / Attack Flow Diagram */}
                    {section.diagram && (
                      <div className="my-6 rounded-xl border border-[#E7E5E0] bg-white p-5 sm:p-6 shadow-xs overflow-x-auto">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#E7E5E0] text-xs font-mono font-bold text-[#3B5BFF]">
                          <Network className="w-4 h-4" />
                          <span>{section.diagram.title || "SYSTEM ARCHITECTURE & ATTACK FLOW"}</span>
                        </div>
                        <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#171717] bg-[#FAF9F6] p-4 rounded-lg border border-[#E7E5E0] overflow-x-auto">
                          {section.diagram.content}
                        </pre>
                      </div>
                    )}

                    {/* Single or Multiple Code Blocks */}
                    {(section.codeBlocks || (section.codeBlock ? [section.codeBlock] : [])).map((block, bIdx) => (
                      <div key={bIdx} className="my-6 rounded-xl overflow-hidden border border-[#171717] bg-[#0E0E11] text-zinc-200 shadow-md">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#17171B] border-b border-white/10 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="text-zinc-400 font-medium ml-2">{block.title}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            {block.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${block.badge.includes("VULNERABLE")
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                }`}>
                                {block.badge}
                              </span>
                            )}
                            <CopyButton text={block.code} />
                          </div>
                        </div>

                        <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed bg-[#0E0E11] text-zinc-100">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    ))}

                    {/* Security Validation Test Cases Table */}
                    {section.testCases && (
                      <div className="my-6 space-y-2.5">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#888888] mb-1">
                          Test Case Matrix &amp; Expected HTTP Responses
                        </div>
                        {section.testCases.map((tc, tcIdx) => (
                          <div key={tcIdx} className="p-3.5 rounded-xl border border-[#E7E5E0] bg-white flex items-start justify-between gap-3 shadow-xs">
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="w-6 h-6 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-center shrink-0 font-mono text-xs font-bold text-[#666666] mt-0.5">
                                0{tcIdx + 1}
                              </div>
                              <div>
                                <div className="text-xs font-mono font-bold text-[#171717]">{tc.scenario}</div>
                                <div className="text-xs text-[#555555] mt-0.5 font-sans leading-relaxed">{tc.expectation}</div>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold shrink-0 border ${tc.status.includes("401") || tc.status.includes("403")
                                ? "bg-rose-500/10 text-rose-700 border-rose-500/20"
                                : "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                              }`}>
                              {tc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Callout Box */}
                    {section.callout && (
                      <div className={`my-6 p-4 rounded-xl border flex items-start gap-3.5 ${section.callout.type === "warning"
                          ? "bg-amber-500/[0.06] border-amber-500/30 text-amber-950"
                          : section.callout.type === "tip"
                            ? "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-950"
                            : "bg-blue-500/[0.06] border-blue-500/30 text-blue-950"
                        }`}>
                        {section.callout.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        ) : section.callout.type === "tip" ? (
                          <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                  <Info className="w-5 h-5 text-[#3B5BFF] flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-1">
                            {section.callout.title}
                          </h4>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#333333]">
                            {section.callout.text}
                          </p>
                        </div>
                      </div>
                    )}

                  </section>
                ))}

                {/* Article Author Footer Card */}
                  <div className="pt-8 mt-12 border-t border-[#E7E5E0] bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5E0] shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#171717] text-white font-mono font-black text-lg flex items-center justify-center border border-[#E7E5E0] shadow-xs flex-shrink-0">
                            CM
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-base font-bold text-[#171717]">Chinmaya Kumar Mishra</h3>
                              <ShieldCheck className="w-4 h-4 text-[#3B5BFF]" />
                            </div>
                            <p className="text-xs text-[#666666] leading-relaxed max-w-md font-sans">
                              AI Application Security Engineer &amp; Full-Stack Engineer based in Bhubaneswar, Odisha, India. Focused on secure software architecture, AST static analysis, and LLM application security.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href="https://github.com/chinmaya0011"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] hover:bg-[#F3F2EE] text-xs font-mono text-[#171717] flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                          <a
                            href="https://www.linkedin.com/in/chinmaya00111/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-[#3B5BFF] hover:bg-[#2548D9] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </article>

                  {/* Sticky Right Sidebar (4 cols) */}
                  <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

                    {/* Table of Contents Card */}
                      <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase tracking-wider mb-4 pb-2 border-b border-[#E7E5E0]">
                          <BookOpen className="w-4 h-4 text-[#3B5BFF]" />
                          <span>Table of Contents</span>
                        </div>

                        <nav className="space-y-1.5 font-mono text-xs">
                          {post.tableOfContents.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className="block py-1 px-2 rounded-md text-[#666666] hover:text-[#3B5BFF] hover:bg-[#F3F2EE] transition-colors leading-relaxed"
                            >
                              {item.title}
                            </a>
                          ))}
                        </nav>
                      </div>

                      {/* Share & Actions Card */}
                        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-3">
                          <div className="text-xs font-mono font-bold text-[#171717] uppercase tracking-wider mb-2">
                            Share this Investigation
                          </div>
                          <ShareButton title={post.title} slug={post.slug} />

                          <a
                            href="https://github.com/chinmaya0011"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F3F2EE] text-xs font-mono font-medium text-[#171717] flex items-center justify-center gap-2 transition-colors shadow-xs"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Follow on GitHub (@chinmaya0011)</span>
                          </a>
                        </div>

                            {/* Security Assessment & Code Audit Advisory */}
                            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] shadow-xs">
                              <div className="text-[11px] font-mono text-[#3B5BFF] font-bold uppercase tracking-wider mb-2">
                                SECURITY &amp; ARCHITECTURE ADVISORY
                              </div>
                                <h4 className="text-sm font-bold text-[#171717] mb-2 font-sans">
                                  Need an authorization &amp; code review of your APIs?
                                </h4>
                                <p className="text-xs text-[#666666] mb-4 leading-relaxed font-sans">
                                  I review distributed Node.js/Express architectures, API authorization controls, and multi-tenant database queries to detect and remediate BOLA/IDOR vulnerabilities early.
                                </p>
                                <Link
                                  href="/#contact"
                                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#3B5BFF] hover:underline"
                                >
                                  <span>Initiate an inquiry</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                          </aside>

                        </div>
                        );
}
