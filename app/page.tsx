"use client";

import { NavBar } from "@/components/nav";
import DotPattern from "@/components/ui/dot-pattern";
import Footer from "@/components/ui/footer";
import HyperText from "@/components/ui/hyper-text";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import SparklesText from "@/components/ui/sparkles-text";
import UrlShortenerContainer from "@/components/url-shortener-container";
import { cn } from "@/lib/utils";

export default function Home() {

  return (
    <main className="mx-auto max-w-xl pt-3 sm:pt-12 md:pt-5 space-y-6">
      <div className="pb-12">
      <NavBar />
      </div>
        
      <div className="flex relative w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />

        <div className="w-full space-y-3 text-center">
          <SparklesText text="Short Links With" />
          <HyperText text="Shorten your URLs and share then easily" />
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
