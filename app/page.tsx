"use client";

import DotPattern from "@/components/ui/dot-pattern";
import Footer from "@/components/ui/footer";
import HyperText from "@/components/ui/hyper-text";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import ShimmerButton from "@/components/ui/shimmer-button";
import SparklesText from "@/components/ui/sparkles-text";
import UrlShortenerContainer from "@/components/url-shortener-container";
import { cn } from "@/lib/utils";

export default function Home() {
  const handleScrolls = () => {
    const targetSection = document.getElementById("target-section");

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", inline: "center" }); // Desplazamiento suave
    }
  };

  return (
    <main className="mx-auto max-w-xl py-12 md:py-10 space-y-6">
      <ShimmerButton onClick={handleScrolls} className="shadow-2xl mx-auto">
        <button className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Contactame
        </button>
      </ShimmerButton>
      <div className="flex relative w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />

        <div className="w-full text-wrap space-y-2 text-center">
          <SparklesText text="Short Links With" />
          <HyperText
            className="text-wrap"
            text="Shorten your URLs and share then easily"
          />
        </div>
      </div>
      <div>
        <UrlShortenerContainer />
      </div>
      <div id="target-section">
        <VelocityScroll
          text="Alvaro Aburto - Desarrollador Web"
          default_velocity={5}
          className="font-display text-center text-4xl font-bold track-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
