"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  Wrench, 
  Layers,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { projects } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("carousel"); // "carousel" | "grid"

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    skipSnaps: false
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
              <span>SELECTED WORK // 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight font-sans">
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans mt-3">
              Production application security platforms, AI code analysis tools, and multi-tenant architectures.
            </p>
          </motion.div>

          {/* Controls: View Mode & Carousel Nav Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="flex items-center gap-3 self-start md:self-end"
          >
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-white border border-[#E7E5E0] shadow-xs">
              <button
                onClick={() => setViewMode("carousel")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === "carousel"
                    ? "bg-[#171717] text-white font-semibold shadow-xs"
                    : "text-[#666666] hover:text-[#171717]"
                }`}
              >
                Carousel
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === "grid"
                    ? "bg-[#171717] text-white font-semibold shadow-xs"
                    : "text-[#666666] hover:text-[#171717]"
                }`}
              >
                Grid
              </button>
            </div>

            {/* Carousel Navigation Arrows */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={scrollPrev}
                  disabled={!prevBtnEnabled}
                  className={`p-2 rounded-xl border border-[#E7E5E0] bg-white transition-all shadow-xs ${
                    prevBtnEnabled
                      ? "text-[#171717] hover:border-[#3B5BFF] hover:text-[#3B5BFF]"
                      : "opacity-40 cursor-not-allowed text-[#A0A0A0]"
                  }`}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!nextBtnEnabled}
                  className={`p-2 rounded-xl border border-[#E7E5E0] bg-white transition-all shadow-xs ${
                    nextBtnEnabled
                      ? "text-[#171717] hover:border-[#3B5BFF] hover:text-[#3B5BFF]"
                      : "opacity-40 cursor-not-allowed text-[#A0A0A0]"
                  }`}
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Carousel View */}
        {viewMode === "carousel" ? (
          <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="flex-[0_0_100%] md:flex-[0_0_580px] lg:flex-[0_0_620px] min-w-0"
                >
                  <motion.div
                    {...cardHoverProps}
                    className="h-full rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-7 sm:p-9 shadow-xs flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Top Bar: Number & Category Badge */}
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E5E0]">
                        <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold">
                          <FolderGit2 className="w-4 h-4" />
                          <span>{proj.number}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#3B5BFF]/8 border border-[#3B5BFF]/20 text-[11px] font-mono font-semibold text-[#3B5BFF]">
                          {proj.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] font-sans tracking-tight mb-3">
                        {proj.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-6">
                        {proj.description}
                      </p>

                      {/* Engineering Challenge Callout */}
                      {proj.engineeringChallenge && (
                        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-bold flex items-center gap-1.5 mb-1.5">
                            <Wrench className="w-3.5 h-3.5 text-[#3B5BFF]" />
                            <span>Engineering Challenge</span>
                          </span>
                          <p className="text-xs text-[#555555] font-sans leading-relaxed">
                            {proj.engineeringChallenge}
                          </p>
                        </div>
                      )}

                      {/* Security Capability Callout */}
                      {proj.securityCapability && (
                        <div className="p-4 rounded-2xl bg-[#3B5BFF]/5 border border-[#3B5BFF]/20 mb-6">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3B5BFF] font-bold flex items-center gap-1.5 mb-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#3B5BFF]" />
                            <span>Security Architecture &amp; Controls</span>
                          </span>
                          <p className="text-xs text-[#171717] font-sans leading-relaxed">
                            {proj.securityCapability}
                          </p>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-2">
                          Technologies Used
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Footer: GitHub, Live Demo & Spec */}
                    <div className="pt-5 border-t border-[#E7E5E0] flex flex-wrap items-center gap-2.5">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white text-xs font-mono font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-xs group"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#D5D3CC] hover:bg-[#FAF9F6] text-[#171717] text-xs font-mono font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                          aria-label={`View ${proj.title} on GitHub`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="py-2.5 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-[#666666] hover:text-[#3B5BFF] text-xs font-mono transition-colors shadow-xs"
                        title="View Full Technical Specification"
                        aria-label="View Full Technical Specification"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-7 shadow-xs flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E5E0]">
                    <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold">
                      <FolderGit2 className="w-4 h-4" />
                      <span>{proj.number}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
                      {proj.category.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#171717] font-sans tracking-tight mb-2.5">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-5">
                    {proj.description}
                  </p>

                  <div className="mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-2">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5E0] flex items-center gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white border border-[#E7E5E0] hover:bg-[#FAF9F6] text-[#171717] text-xs font-mono font-medium transition-colors shadow-xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-[#666666] hover:text-[#3B5BFF] transition-colors shadow-xs"
                    aria-label="View Details"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
