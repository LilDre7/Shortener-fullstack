"use client";

import React, { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function UrlShortenerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlShortened = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-16">
      <div className="glass-card p-8 md:p-12">
        <ShortenForm handleUrlShortened={handleUrlShortened} />
      </div>

      <div>
        <UrlList key={refreshKey} />
      </div>
    </div>
  );
}
