import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SecurityInterests from "@/components/SecurityInterests";
import Projects from "@/components/Projects";
import SecurityResearch from "@/components/SecurityResearch";
import Experience from "@/components/Experience";
import EducationCertifications from "@/components/EducationCertifications";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] selection:bg-[#365CF5]/15 selection:text-[#365CF5]">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <SecurityInterests />
        <Projects />
        <SecurityResearch />
        <Experience />
        <EducationCertifications />
        <InteractiveTerminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
