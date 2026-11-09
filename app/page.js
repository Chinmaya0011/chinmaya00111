import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import Skills from "@/components/Skills";
import SecurityInterests from "@/components/SecurityInterests";
import Projects from "@/components/Projects";
import SecurityResearch from "@/components/SecurityResearch";
import Experience from "@/components/Experience";
import EducationCertifications from "@/components/EducationCertifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#03070A] text-[#F0F6FC] selection:bg-emerald-500/25 selection:text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <InteractiveTerminal />
        <Skills />
        <SecurityInterests />
        <Projects />
        <SecurityResearch />
        <Experience />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
