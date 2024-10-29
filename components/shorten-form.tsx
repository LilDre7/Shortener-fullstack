"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import ShinyButton from "./ui/shiny-button";
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
      console.log("Error shortening URL 💀 :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[300px] sm:max-w-[800px] mx-auto mt-5 mb-6"
      >
        <div className="space-y-4 mx-auto ">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="Enter URL to shorten"
            className="h-12 placeholder:text-black placeholder:uppercase placeholder:text-sm"
            required
          />
          <div className="rounded-sm flex justify-center">
            <ShinyButton className="w-full p-2">
              <button
                type="submit"
                className="w-full p-2 uppercase text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Shortening..." : "Shorten URL"}
              </button>
            </ShinyButton>
          </div>
        </div>
      </form>
    </>
  );
}
