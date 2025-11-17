"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import Confetti from "./confetti";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUrl("");
        handleUrlShortened();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        console.log("Error shortening URL:", data.error);
      }
    } catch (error) {
      console.log("Error shortening URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Confetti trigger={showConfetti} />
      <form onSubmit={handleSubmit} className="group">
        <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-400 transition-colors">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Link2 className="h-5 w-5" />
            </div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="Pega tu enlace largo aquí"
              className="w-full px-4 pl-12 py-3 text-gray-900 placeholder-gray-400 bg-white border-0 outline-none text-base focus:ring-0"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !url}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Acortando...</span>
              </div>
            ) : (
              <span>Acortar</span>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <span>Instantáneo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <span>Seguro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <span>Análisis</span>
        </div>
      </div>
    </div>
  );
}
