"use client";

import { NavBar } from "@/components/nav";
import UrlShortenerContainer from "@/components/url-shortener-container";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Acorta tus enlaces
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Simple. Rápido. Elegante.
          </p>
        </div>

        <UrlShortenerContainer />
      </main>
    </div>
  );
}
