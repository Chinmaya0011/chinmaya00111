import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogArticleContent from "@/components/BlogArticleContent";
import { getPostBySlug, getAllPosts } from "@/data/blogsData";
import {
  ChevronLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Tag,
  ArrowLeft
} from "lucide-react";

const siteUrl = "https://www.chinmayakumarmishra.sbs";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested publication does not exist.",
    };
  }

  const postUrl = `${siteUrl}/blogs/${post.slug}`;
  const pageTitle = post.metaTitle || post.title;
  const pageDesc = post.metaDescription || post.summary;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: postUrl,
    },
    authors: [{ name: "Chinmaya Kumar Mishra", url: `${siteUrl}/` }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: pageDesc,
      url: postUrl,
      siteName: "Chinmaya Kumar Mishra",
      type: "article",
      publishedTime: post.isoDate,
      authors: ["Chinmaya Kumar Mishra"],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: pageDesc,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blogs/${post.slug}#article`,
        headline: post.title,
        alternativeHeadline: post.subtitle,
        description: post.summary,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        mainEntityOfPage: `${siteUrl}/blogs/${post.slug}`,
        author: {
          "@type": "Person",
          name: "Chinmaya Kumar Mishra",
          url: `${siteUrl}/`,
          jobTitle: "Full-Stack Developer & Application Security Engineer",
        },
        publisher: {
          "@type": "Person",
          name: "Chinmaya Kumar Mishra",
          url: `${siteUrl}/`,
        },
        keywords: post.tags.join(", "),
        articleSection: post.category,
        image: `${siteUrl}/og-image.png`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blogs/${post.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${siteUrl}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteUrl}/blogs/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] selection:bg-[#365CF5]/15 selection:text-[#365CF5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#666666] mb-8">
            <Link href="/" className="hover:text-[#365CF5] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-[#365CF5] transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold truncate max-w-xs sm:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-12 pb-10 border-b border-[#E7E5E0]">

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666666] mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#365CF5]/10 text-[#365CF5] font-semibold border border-[#365CF5]/20">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#365CF5]" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#365CF5]" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="font-semibold text-emerald-600">Verified Technical Guide</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.14] mb-5 font-sans">
              {post.title}
            </h1>

            <p className="text-[#666666] text-lg sm:text-xl leading-relaxed font-sans max-w-4xl mb-8">
              {post.subtitle}
            </p>

            {/* Author Information Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#E7E5E0] shadow-xs flex-shrink-0 bg-[#FAF9F6]">
                  <img
                    src="/chinmaya.png"
                    alt="Chinmaya Kumar Mishra"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#171717] flex items-center gap-1.5">
                    <span>Chinmaya Kumar Mishra</span>
                    <ShieldCheck className="w-4 h-4 text-[#365CF5]" />
                  </div>
                  <div className="text-xs font-mono text-[#666666]">
                    AI Application Security Engineer | Full-Stack Engineer
                  </div>
                </div>
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#F3F2EE] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </header>

          {/* Article Interactive Body & Sidebar */}
          <BlogArticleContent post={post} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
