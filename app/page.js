import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Chinmaya Kumar Mishra | Full Stack Developer & Application Security in Odisha, India",
  description:
    "Chinmaya Kumar Mishra is a Full Stack Developer based in Ganjam, Odisha, India, specializing in React, Next.js, Node.js, MERN Stack development, REST APIs, and Application Security. Explore modern web development projects and secure application engineering.",
  alternates: {
    canonical: "https://www.chinmayakumarmishra.sbs/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF]">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
