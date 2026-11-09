import "./globals.css";

const siteUrl = "https://chinmayakumarmishra.sbs";

export const viewport = {
  themeColor: "#03070A",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chinmaya Kumar Mishra | Full-Stack Developer & AppSec",
  description:
    "Chinmaya Kumar Mishra is a Full-Stack Developer specializing in JavaScript, React, Next.js, Node.js, and MongoDB, with a growing interest in Application Security, Web Security, and API Security.",
  keywords: [
    "Chinmaya Kumar Mishra",
    "Chinmaya Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Application Security",
    "AppSec",
    "API Security",
    "Web Application Security",
    "JavaScript Developer",
  ],
  authors: [{ name: "Chinmaya Kumar Mishra", url: siteUrl }],
  creator: "Chinmaya Kumar Mishra",
  publisher: "Chinmaya Kumar Mishra",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
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
    title: "Chinmaya Kumar Mishra | Developer Portfolio",
    description:
      "Full-Stack Developer with a passion for building modern web applications and exploring Application Security, API Security, and secure software development.",
    url: siteUrl,
    siteName: "Chinmaya Kumar Mishra",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Chinmaya Kumar Mishra | Full-Stack Developer & AppSec Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya Kumar Mishra | Developer Portfolio",
    description:
      "Full-Stack Developer exploring Application Security, Web Security, and API Security.",
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
      url: siteUrl,
      jobTitle: "Full-Stack Developer",
      sameAs: [
        "https://github.com/chinmaya0011",
        "https://www.linkedin.com/in/chinmaya00111/",
      ],
      description:
        "Chinmaya Kumar Mishra is a Full-Stack Developer specializing in JavaScript, React, Next.js, Node.js, and MongoDB, with a growing interest in Application Security, Web Security, and API Security.",
      knowsAbout: [
        "Full-Stack Development",
        "JavaScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Application Security",
        "Web Application Security",
        "API Security",
        "OWASP Top 10",
        "Secure Code Review",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Chinmaya Kumar Mishra",
      description:
        "Personal portfolio of Chinmaya Kumar Mishra: Full-Stack Developer & Application Security Enthusiast.",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#03070A] text-[#F0F6FC] antialiased cyber-grid">
        {children}
      </body>
    </html>
  );
}
