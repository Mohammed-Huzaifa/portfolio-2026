import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Areas from "@/components/Areas";
import Projects from "@/components/Projects";
import Hoardy from "@/components/Hoardy";
import Personal from "@/components/Personal";
import Mission from "@/components/Mission";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Areas />
      <Projects />
      <Hoardy />
      <Personal />
      <Mission />
      <Contact />
      <Footer />
    </main>
  );
}
