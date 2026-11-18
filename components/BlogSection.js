"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, Tag, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blogsData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function BlogSection() {
  const featuredPost = blogPosts[0];

  return (
    <section id="blogs" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
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
              <span>PUBLICATIONS // 06</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight font-sans">
              Engineering Publications
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans mt-3">
              Deep-dive application security case studies, AST taint analysis notes, and distributed system mitigations.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 text-xs font-mono font-semibold text-[#171717] hover:text-[#3B5BFF] transition-all shadow-xs"
            >
              <span>Explore All Publications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Featured Publication Large Editorial Card */}
        {featuredPost && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-8 sm:p-12 shadow-xs transition-all relative overflow-hidden group"
          >
            {/* Top Tag & Reading Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#3B5BFF]/10 text-[#3B5BFF] text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#3B5BFF]/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FEATURED CASE STUDY</span>
                </span>
                <span className="text-[11px] font-mono text-[#888888] hidden sm:inline">
                  {featuredPost.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#666666]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3B5BFF]" />
                  <span>{featuredPost.publishedAt}</span>
                </span>
                <span className="text-[#E7E5E0]">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>{featuredPost.readTime}</span>
                </span>
              </div>
            </div>

            {/* Article Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] font-sans tracking-tight mb-4 group-hover:text-[#3B5BFF] transition-colors leading-[1.2]">
              <Link href={`/blogs/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h3>

            {/* Subtitle / Teaser */}
            <p className="text-base sm:text-lg text-[#555555] font-sans leading-relaxed mb-6 max-w-3xl">
              {featuredPost.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {featuredPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Read Article Button */}
            <div className="pt-5 border-t border-[#E7E5E0] flex items-center justify-between">
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white text-xs font-mono font-medium tracking-wide transition-colors shadow-xs group/btn"
              >
                <span>Read Full Investigation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>

              <span className="text-xs font-mono text-[#888888] hidden sm:block">
                Includes Attack Scenario &amp; Proof-of-Concept Fixes
              </span>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
