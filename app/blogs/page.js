import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogsData";
import {
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  Tag,
  Terminal,
  ExternalLink,
  ChevronLeft
} from "lucide-react";

const siteUrl = "https://www.chinmayakumarmishra.sbs";

export const metadata = {
  title: "Engineering Blog & AppSec Publications | Chinmaya Kumar Mishra",
  description:
    "Deep-dive technical publications on full-stack architecture, API security (BOLA/IDOR), automated Semgrep SAST, Node.js microservices, and modern Next.js systems by Chinmaya Kumar Mishra.",
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
  openGraph: {
    title: "Engineering Blog & AppSec Publications | Chinmaya Kumar Mishra",
    description:
      "Deep-dive technical publications on full-stack architecture, API security, and defensive web engineering.",
    url: `${siteUrl}/blogs`,
    siteName: "Chinmaya Kumar Mishra",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Chinmaya Kumar Mishra — Engineering Blog & AppSec Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & AppSec Publications | Chinmaya Kumar Mishra",
    description: "Deep-dive technical publications on full-stack architecture and API security.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function BlogsPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost?.slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/blogs#collection`,
    url: `${siteUrl}/blogs`,
    name: "Engineering Blog & AppSec Publications",
    description:
      "Deep-dive technical articles on full-stack architecture, API security, and defensive web engineering by Chinmaya Kumar Mishra.",
    publisher: {
      "@type": "Person",
      name: "Chinmaya Kumar Mishra",
      url: `${siteUrl}/`,
    },
    hasPart: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: `${siteUrl}/blogs/${post.slug}`,
      datePublished: post.isoDate,
      author: {
        "@type": "Person",
        name: "Chinmaya Kumar Mishra",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] selection:bg-[#365CF5]/15 selection:text-[#365CF5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb & Subtitle */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#365CF5] transition-colors mb-4 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
              <span>ENGINEERING WRITING // SECURE ARCHITECTURE &amp; FULL-STACK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
              Engineering Publications &amp; AppSec Research
            </h1>

            <p className="text-[#666666] text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
              Authoritative, production-grade technical publications covering web architecture, API authorization defenses, automated SAST static analysis, and full-stack security engineering.
            </p>
          </div>

          {/* Featured Post Card */}
          {featuredPost && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#666666]">
                <span className="font-semibold text-[#171717] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  FEATURED PUBLICATION
                </span>
                <span>DEEP DIVE ({featuredPost.readTime.toUpperCase()})</span>
              </div>

              <article className="editorial-card p-6 sm:p-10 border border-[#E7E5E0] bg-white rounded-2xl relative overflow-hidden group hover:border-[#365CF5]/40 transition-all">
                {/* Accent Highlight Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#365CF5] via-emerald-500 to-[#365CF5]" />

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666666] mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#365CF5]/10 text-[#365CF5] font-semibold border border-[#365CF5]/20">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#365CF5]" />
                    {featuredPost.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#365CF5]" />
                    {featuredPost.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight leading-snug mb-3 group-hover:text-[#365CF5] transition-colors">
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Subtitle / Excerpt */}
                <p className="text-[#666666] text-base leading-relaxed mb-6 font-sans max-w-4xl">
                  {featuredPost.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-8">
                  {featuredPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#F3F2EE] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Bar with Author & Read Button */}
                <div className="pt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E7E5E0] shadow-xs flex-shrink-0 bg-[#FAF9F6]">
                      <img
                        src="/chinmaya.png"
                        alt="Chinmaya Kumar Mishra"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#171717] flex items-center gap-1.5">
                        <span>Chinmaya Kumar Mishra</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#365CF5]" />
                      </div>
                      <div className="text-[11px] font-mono text-[#666666]">
                        AI AppSec Engineer &amp; Full-Stack Dev
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#365CF5] hover:bg-[#2548D9] text-white font-mono text-xs font-semibold tracking-wider transition-colors shadow-sm"
                  >
                    <span>Read Full Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            </div>
          )}

          {/* Additional Articles Grid */}
          {regularPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E7E5E0]">
                <h3 className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                  ALL PUBLICATIONS ({blogPosts.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="editorial-card p-6 border border-[#E7E5E0] bg-white rounded-xl flex flex-col justify-between hover:border-[#365CF5]/40 transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#666666] mb-3">
                        <span className="text-[#365CF5] font-semibold">{post.category}</span>
                        <span>•</span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <h4 className="text-xl font-bold text-[#171717] tracking-tight mb-2 group-hover:text-[#365CF5] transition-colors leading-snug">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-[#666666] leading-relaxed mb-4 line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#666666]">{post.readTime}</span>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-xs font-mono font-semibold text-[#365CF5] flex items-center gap-1 group-hover:underline"
                      >
                        <span>Read Post</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Research & Writing Ethics Card */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#E7E5E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#365CF5] font-bold uppercase tracking-wider mb-1.5">
                <Terminal className="w-4 h-4" />
                <span>OPEN SECURITY RESEARCH &amp; VERIFIED VULNERABILITY ARCHIVE</span>
              </div>
              <h3 className="text-lg font-bold text-[#171717] tracking-tight mb-1">
                Looking for code security audits or technical advisory?
              </h3>
              <p className="text-xs text-[#666666] max-w-xl">
                Explore real vulnerability findings and defensive remediations across MERN and Next.js applications in my security research repository.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/#research"
                className="px-4 py-2.5 rounded-xl bg-[#F3F2EE] hover:bg-[#E7E5E0] border border-[#E7E5E0] text-xs font-mono font-semibold text-[#171717] transition-colors"
              >
                Security Notes
              </Link>
              <Link
                href="/#contact"
                className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-black text-white text-xs font-mono font-semibold transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
