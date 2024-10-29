"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
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
        <div className="space-y-4 mx-auto">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="Enter URL to shorten"
            className="h-12"
            required
          />
          <div className="rounded-sm flex justify-center">
            <RainbowButton className="w-full p-2">
              <Button type="submit" className="w-full p-2" disabled={isLoading}>
                {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
            </RainbowButton>
          </div>
        </div>
      </form>
    </>
  );
}
