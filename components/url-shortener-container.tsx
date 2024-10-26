"use client";

import React, { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function UrlShortenerContainer() {

  const [refreshKey, setRefreshKey] = useState(0)

  const handleUrlShortened = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="max-w-[300px] sm:max-w-[500px] mx-auto mt-5 mb-6">
      <ShortenForm  handleUrlShortened={handleUrlShortened} />
      <UrlList key={refreshKey}  />
    </div>
  );
}
