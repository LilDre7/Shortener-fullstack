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
    <div className="space-y-20">
      <div className="border border-gray-100 rounded-xl p-6 md:p-8">
        <ShortenForm handleUrlShortened={handleUrlShortened} />
      </div>

      <div>
        <UrlList key={refreshKey} />
      </div>
    </div>
  );
}
