import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Chinmaya Kumar Mishra | AI Application Security Engineer & Full-Stack Developer",
  description:
    "Chinmaya Kumar Mishra is an AI Application Security Engineer & Full-Stack Developer specializing in AST/SAST scanning, API security (OWASP Top 10, BOLA/IDOR), React 19, Next.js 15, and secure web architectures.",
  alternates: {
    canonical: "https://www.chinmayakumarmishra.sbs/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <InteractiveTerminal />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
