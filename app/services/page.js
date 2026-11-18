import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesClient from "@/components/services/ServicesClient";

const siteUrl = "https://www.chinmayakumarmishra.sbs";

export const metadata = {
  title: "Freelance Web Development & Application Security | Chinmaya Kumar Mishra",
  description:
    "Professional independent software engineering services by Chinmaya Kumar Mishra: Full-Stack Web Application Development (React, Next.js, Node.js), Android Applications, and Authorized Application Security & API Penetration Testing.",
  keywords: [
    "Freelance Web Developer India",
    "Freelance Full Stack Developer",
    "Application Security Consultant",
    "API Penetration Testing",
    "OWASP Security Assessment",
    "React Native Android Developer",
    "Next.js Developer India",
    "Node.js Backend Developer",
    "Secure Code Review",
    "Chinmaya Kumar Mishra Services",
    "Web Application Development Odisha",
    "Bhubaneswar Web Developer"
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Freelance Web Development & Application Security | Chinmaya Kumar Mishra",
    description:
      "Modern full-stack web applications, Android development, and authorized application security testing by Chinmaya Kumar Mishra.",
    url: `${siteUrl}/services`,
    siteName: "Chinmaya Kumar Mishra Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/chinmaya.png`,
        width: 824,
        height: 1024,
        alt: "Chinmaya Kumar Mishra — Freelance Engineering & Application Security",
      },
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Freelance Web Development & Application Security Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Development & Application Security | Chinmaya Kumar Mishra",
    description:
      "Full-Stack Web Applications, Android Development, and Authorized Application Security Testing.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@chinmaya00111",
  },
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/services#service`,
      name: "Chinmaya Kumar Mishra — Engineering & Application Security Services",
      url: `${siteUrl}/services`,
      image: `${siteUrl}/chinmaya.png`,
      priceRange: "$$",
      telephone: "+91 7077835119",
      email: "imchinu17@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN"
      },
      provider: {
        "@type": "Person",
        name: "Chinmaya Kumar Mishra",
        url: `${siteUrl}/`
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Freelance Engineering & Security Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Web Application Development",
              description:
                "Modern, responsive and scalable web applications, SaaS dashboards, customer portals, and REST API microservices using Next.js 15, React 19, and Node.js."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Android Application Development",
              description:
                "Cross-platform Android applications built with React Native, Expo, secure REST API integrations, and push notifications."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Application Security & Penetration Testing",
              description:
                "Authorized web application and API security assessments, OWASP Top 10 auditing, BOLA/IDOR vulnerability testing, and secure source code review."
            }
          }
        ]
      }
    }
  ]
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />
      <Navbar />
      <main className="relative">
        <ServicesClient />
      </main>
      <Footer />
    </div>
  );
}
