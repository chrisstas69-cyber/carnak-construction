import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Markets } from "@/components/Markets";
import { Process } from "@/components/Process";
import { RevealObserver } from "@/components/RevealObserver";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-rust px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <JsonLd />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Experience />
        <Markets />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
