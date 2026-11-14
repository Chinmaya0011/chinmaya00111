import "./globals.css";

const siteUrl = "https://www.chinmayakumarmishra.sbs";

export const viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chinmaya Kumar Mishra | Full-Stack Developer & Application Security Engineer",
  description:
    "Explore Chinmaya Kumar Mishra's (Chinmaya Mishra) professional portfolio featuring full-stack development, application security, API security, secure software engineering, and production web applications.",
  keywords: [
    "Chinmaya Kumar Mishra",
    "Chinmay Kumar Mishra",
    "Chinmaya Mishra",
    "Chinmay Mishra",
    "Chinmaya K Mishra",
    "Chinmaya K. Mishra",
    "Chinmaya Kumar Mishra Developer",
    "Chinmaya Kumar Mishra AppSec",
    "Chinmaya Mishra Odisha",
    "Full-Stack Developer",
    "Application Security Engineer",
    "AppSec Engineer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "API Security",
    "Web Application Security",
    "Secure Code Review",
    "OWASP Top 10",
    "chinmaya0011",
    "chinmaya00111",
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
    title: "Chinmaya Kumar Mishra | Full-Stack Developer & AppSec",
    description: "Building modern software and engineering security into every layer.",
    url: `${siteUrl}/`,
    siteName: "Chinmaya Kumar Mishra",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Chinmaya Kumar Mishra — Full-Stack Developer and Application Security Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya Kumar Mishra | Full-Stack Developer & AppSec",
    description: "Full-stack engineering, application security, and AI-powered systems.",
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
        "Chinmay K. Mishra",
        "chinmaya0011",
        "chinmaya00111",
      ],
      url: `${siteUrl}/`,
      image: `${siteUrl}/images/chinmaya.jpg`,
      jobTitle: ["Full-Stack Developer", "Application Security Engineer"],
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
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/chinmaya0011",
        "https://www.linkedin.com/in/chinmaya00111/",
      ],
      knowsAbout: [
        "Full-Stack Development",
        "Application Security",
        "API Security",
        "AI Security",
        "Web Application Security",
        "Secure Software Engineering",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "OWASP Top 10",
        "Secure Code Review",
        "OAuth 2.0",
        "Semgrep",
      ],
      description:
        "Chinmaya Kumar Mishra (also known as Chinmaya Mishra or Chinmay) is a Full-Stack Developer and Application Security Engineer based in Odisha, India, specializing in React, Next.js, Node.js, Express, MongoDB, and defensive web/API security.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra",
      alternateName: ["Chinmaya Mishra", "Chinmay Kumar Mishra"],
      inLanguage: "en-IN",
      description:
        "Official portfolio and engineering publications of Chinmaya Kumar Mishra: Full-Stack Developer & Application Security Engineer.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: "Chinmaya Kumar Mishra | Full-Stack Developer & Application Security Engineer",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F6] text-[#171717] antialiased selection:bg-[#365CF5]/15 selection:text-[#171717]">
        {children}
      </body>
    </html>
  );
}
