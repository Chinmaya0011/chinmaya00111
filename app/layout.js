import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Chinmaya Kumar Mishra | AI Application Security Engineer & Full-Stack Developer",
  description:
    "Chinmaya Kumar Mishra is an AI Application Security Engineer and Full-Stack Developer working on LLM-powered vulnerability analysis, secure code review, and AI-powered security tools.",
  keywords: [
    "Chinmaya Kumar Mishra",
    "AI Application Security Engineer",
    "Full-Stack Engineer",
    "Vulnerability Analysis",
    "AI Security",
    "Secure Code Review",
    "LLM Security",
    "RAG Security",
    "Next.js",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "OWASP",
    "OAuth 2.0",
    "GitHub Apps",
  ],
  authors: [{ name: "Chinmaya Kumar Mishra", url: `${siteUrl}/` }],
  creator: "Chinmaya Kumar Mishra",
  publisher: "Chinmaya Kumar Mishra",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
    title: "Chinmaya Kumar Mishra | AI Application Security Engineer & Full-Stack Developer",
    description: "Chinmaya Kumar Mishra is an AI Application Security Engineer and Full-Stack Developer working on LLM-powered vulnerability analysis, secure code review, and AI-powered security tools.",
    url: `${siteUrl}/`,
    siteName: "Chinmaya Kumar Mishra",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Chinmaya Kumar Mishra — AI Application Security Engineer and Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya Kumar Mishra | AI Application Security Engineer & Full-Stack Developer",
    description: "Chinmaya Kumar Mishra is an AI Application Security Engineer and Full-Stack Developer working on LLM-powered vulnerability analysis, secure code review, and AI-powered security tools.",
    images: [`${siteUrl}/og-image.png`],
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
      image: `${siteUrl}/chinmaya.png`,
      jobTitle: ["AI Application Security Engineer", "Full-Stack Engineer"],
      worksFor: {
        "@type": "Organization",
        name: "Secure Code LLC",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Parala Maharaja Engineering College",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/chinmaya0011",
        "https://www.linkedin.com/in/chinmaya00111/",
      ],
      knowsAbout: [
        "Application Security",
        "AI-Assisted Vulnerability Analysis",
        "LLM & RAG Security",
        "Secure Code Review",
        "API Security",
        "Full-Stack Engineering",
        "Next.js",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "OWASP Top 10",
        "OAuth 2.0",
        "GitHub Apps",
      ],
      description:
        "Chinmaya Kumar Mishra is an AI Application Security Engineer and Full-Stack Developer working on LLM-powered vulnerability analysis, secure code review, and AI-powered security tools.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra",
      alternateName: ["Chinmaya Mishra", "Chinmay Kumar Mishra"],
      inLanguage: "en-IN",
      description:
        "Official portfolio of Chinmaya Kumar Mishra: AI Application Security Engineer & Full-Stack Developer.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra | AI Application Security Engineer & Full-Stack Developer",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
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
        className={`min-h-screen bg-[#FAF9F6] text-[#171717] antialiased selection:bg-[#365CF5]/15 selection:text-[#171717] ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
