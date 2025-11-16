"use client";

import { useState } from "react";
import { Zap, Link2 } from "lucide-react";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      await response.json();
      setUrl("");
      handleUrlShortened();
    } catch (error) {
      console.log("Error shortening URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Short Link
        </h2>
        <p className="text-gray-600">
          Transform any long URL into a clean, shareable link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Link2 className="h-5 w-5" />
          </div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="Enter your long URL here..."
            className="modern-input pl-12"
            required
          />
        </div>

        <button
          type="submit"
          className="modern-button flex items-center justify-center gap-2 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating Link...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 group-hover:animate-pulse" />
              Shorten URL
            </>
          )}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Instant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          <span>Analytics</span>
        </div>
      </div>
    </div>
  );
}
