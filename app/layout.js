import { Inter, JetBrains_Mono } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://www.chinmayakumarmishra.sbs";

export const viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chinmaya Kumar Mishra | Full Stack Developer & Application Security in Odisha, India",
    template: "%s | Chinmaya Kumar Mishra",
  },
  description:
    "Chinmaya Kumar Mishra is a Full Stack Developer based in Ganjam, Odisha, India, specializing in React, Next.js, Node.js, MERN Stack development, REST APIs, and Application Security. Explore modern web development projects and secure application engineering.",
  keywords: [
    // Primary Role & Technology Keywords
    "Full Stack Developer in Odisha",
    "Full Stack Developer in Ganjam",
    "Full Stack Developer in Berhampur",
    "Web Developer in Berhampur",
    "Software Developer in Odisha",
    "MERN Stack Developer in Odisha",
    "React Developer in Odisha",
    "Next.js Developer in India",
    "Node.js Developer in India",
    "Application Security Engineer in India",
    // Local SEO & Geographical Keywords
    "Khallikote, Odisha",
    "Ganjam, Odisha",
    "Berhampur, Odisha",
    "Rambha, Odisha",
    "Khordha, Odisha",
    "Bhubaneswar, Odisha",
    "Keshpur, Odisha",
    "PIN Code 761029",
    "PIN Code 761030",
    "761029",
    "761030",
    // Technical Skills & Capabilities
    "Chinmaya Kumar Mishra",
    "Chinmaya Mishra",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MERN Stack",
    "REST APIs",
    "Application Security",
    "Web Security",
    "OWASP Top 10",
    "OAuth 2.0",
    "Secure Code Review",
    "Vulnerability Analysis",
    "GitHub Apps",
    "Docker",
    "Freelance Web Developer India",
  ],
  authors: [{ name: "Chinmaya Kumar Mishra", url: `${siteUrl}/` }],
  creator: "Chinmaya Kumar Mishra",
  publisher: "Chinmaya Kumar Mishra",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  category: "technology",
  classification: "Full Stack Developer and Application Security Portfolio",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "XWfRmtiHt4gGRl2kjgSULgG3lEOqQ0kQMCd688OF3G8",
  },
  openGraph: {
    title: "Chinmaya Kumar Mishra | Full Stack Developer & AppSec Engineer",
    description:
      "Chinmaya Kumar Mishra is a Full Stack Developer based in Ganjam, Odisha, India, specializing in React, Next.js, Node.js, MERN Stack development, REST APIs, and Application Security.",
    url: `${siteUrl}/`,
    siteName: "Chinmaya Kumar Mishra Portfolio",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: `${siteUrl}/chinmaya.png`,
        width: 824,
        height: 1024,
        alt: "Chinmaya Kumar Mishra — Full Stack Developer & Application Security Engineer in Odisha, India",
      },
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Chinmaya Kumar Mishra — Full Stack Developer & Application Security Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya Kumar Mishra | Full Stack Developer in Odisha, India",
    description:
      "Full Stack Developer based in Ganjam, Odisha, specializing in React, Next.js, Node.js, MERN Stack development, REST APIs, and Application Security.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@chinmaya00111",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Chinmaya Kumar Mishra",
      givenName: "Chinmaya",
      additionalName: "Kumar",
      familyName: "Mishra",
      alternateName: [
        "Chinmay Kumar Mishra",
        "Chinmaya Mishra",
        "Chinmay Mishra",
        "Chinmaya K. Mishra",
        "chinmaya0011",
        "chinmaya00111",
      ],
      url: `${siteUrl}/`,
      image: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#personimage`,
        url: `${siteUrl}/chinmaya.png`,
        contentUrl: `${siteUrl}/chinmaya.png`,
        caption: "Chinmaya Kumar Mishra",
      },
      jobTitle: [
        "Full Stack Developer",
        "Application Security Engineer",
        "Software Developer",
      ],
      description:
        "Chinmaya Kumar Mishra is a Full Stack Developer based in Ganjam, Odisha, India, specializing in React, Next.js, Node.js, MERN Stack development, REST APIs, and Application Security.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ganjam",
        addressRegion: "Odisha",
        postalCode: "761029",
        addressCountry: "IN",
      },
      homeLocation: {
        "@type": "Place",
        name: "Ganjam, Odisha, India",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "19.3800",
          longitude: "85.0500",
        },
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Ganjam, Odisha" },
        { "@type": "AdministrativeArea", name: "Berhampur, Odisha" },
        { "@type": "AdministrativeArea", name: "Khallikote, Odisha" },
        { "@type": "AdministrativeArea", name: "Rambha, Odisha" },
        { "@type": "AdministrativeArea", name: "Keshpur, Odisha" },
        { "@type": "AdministrativeArea", name: "Bhubaneswar, Odisha" },
        { "@type": "AdministrativeArea", name: "Khordha, Odisha" },
        { "@type": "Country", name: "India" },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Secure Code LLC",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Parala Maharaja Engineering College",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Berhampur",
          addressRegion: "Odisha",
          addressCountry: "IN",
        },
      },
      sameAs: [
        "https://github.com/chinmaya0011",
        "https://www.linkedin.com/in/chinmaya00111/",
      ],
      knowsAbout: [
        "Full Stack Web Development",
        "MERN Stack",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "Application Security",
        "Web Security",
        "OWASP Top 10",
        "OAuth 2.0",
        "Secure Code Review",
        "Vulnerability Analysis",
        "Docker",
        "GitHub Apps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra | Full Stack Developer & AppSec Portfolio",
      alternateName: [
        "Chinmaya Mishra Portfolio",
        "Chinmay Kumar Mishra Web Developer",
      ],
      inLanguage: "en-IN",
      description:
        "Official portfolio of Chinmaya Kumar Mishra: Full Stack Developer specializing in React, Next.js, Node.js, and Application Security across Ganjam, Berhampur, and Odisha, India.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra | Full Stack Developer in Odisha, India",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#primaryimage`,
        url: `${siteUrl}/chinmaya.png`,
        contentUrl: `${siteUrl}/chinmaya.png`,
        caption: "Chinmaya Kumar Mishra — Full Stack Developer & Application Security Engineer",
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}/#github-scanner`,
      name: "GitHub Security Scanner",
      description:
        "An application security platform integrating GitHub repositories with automated security scanning workflows, AST parsing, and vulnerability remediation.",
      codeRepository: "https://github.com/chinmaya0011/github-scanner-platform",
      programmingLanguage: ["JavaScript", "Node.js", "Express.js", "Next.js"],
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteUrl}/#ai-github-assistant`,
      name: "AI GitHub Repository Assistant",
      description:
        "An AI-powered repository assistant that enables developers to interact with code repositories through LLM-based workflows, RAG, and GitHub integrations.",
      codeRepository: "https://github.com/chinmaya0011/ai-github-chatbot",
      programmingLanguage: ["JavaScript", "Next.js", "Express.js", "OpenAI API"],
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#booksaathi`,
      name: "BookSaathi SaaS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "A multi-tenant practice management SaaS featuring appointment management, real-time updates with Socket.IO, and integrated payment workflows.",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`min-h-screen bg-[#FAF9F6] text-[#171717] antialiased selection:bg-[#365CF5]/15 selection:text-[#171717] relative ${inter.className}`}
      >
        <AnimatedBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
