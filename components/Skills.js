"use client";

import { Code2, ShieldAlert, Wrench } from "lucide-react";
import { technicalSkills } from "@/data/portfolioData";

export default function Skills() {
  const icons = [Code2, ShieldAlert, Wrench];

  return (
      <section id="expertise" className="py-20 md:py-24 relative border-t border-white/[0.06] bg-[#03070A]">

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

            {/* Section Header */}
                <div className="mb-10 text-center sm:text-left">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>TECHNICAL EXPERTISE</span>
                  </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                      Skills &amp; Technologies
                    </h2>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      Distinguishing practical development experience from active security learning areas.
                    </p>
                </div>

                      {/* 3 Compact Skill Cards */ }
                      < div className = "grid grid-cols-1 md:grid-cols-3 gap-6" >
                      {
                        technicalSkills.map((group, idx) => {
                          const Icon = icons[idx];
                          return (
                            <div
                              key={group.category}
                              className="rounded-2xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-6 backdrop-blur-xl transition-all glow-card flex flex-col justify-between"
                            >
                              <div>
                                {/* Category Header */}
                                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                                      <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <h3 className="text-base font-bold text-white font-mono">
                                      {group.category}
                                    </h3>
                                  </div>

                                        <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                          {group.status}
                                        </span>
                            </div>

                                    {/* Skills Pills */}
                                    <div className="flex flex-wrap gap-2">
                                      {group.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="px-2.5 py-1 rounded-lg bg-[#04080E] border border-white/[0.06] text-xs font-mono text-slate-200"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                    <div className="pt-4 mt-6 border-t border-white/[0.05] text-[10px] font-mono text-slate-500">
                                      {group.subtitle}
                                    </div>
                                  </div>
                              );
          })}
                            </div>

                          </div>
    </section>
                  );
}
