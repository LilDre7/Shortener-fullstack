"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Check, Eye, BarChart3, ExternalLink, Calendar } from "lucide-react";

type Url = {
  id: string;
  shortCode: string;
  original: string;
  visits: number;
  createdAt?: string;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenerUrl = (code: string) => `${window.location.origin}/${code}`;

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/urls");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.log("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleCopyUrl(code: string) {
    const fullUrl = `${shortenerUrl(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(code);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    });
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="url-card">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              <div className="flex gap-4">
                <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <BarChart3 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
        <p className="text-gray-600">Create your first short link above</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BarChart3 className="h-4 w-4" />
          {urls.length} {urls.length === 1 ? 'link' : 'links'}
        </div>
      </div>

      <div className="space-y-4">
        {urls.map((url, index) => (
          <div key={url.id} className="url-card group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  {url.createdAt && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(url.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Link
                  className="text-lg font-mono text-gray-900 hover:text-indigo-600 transition-colors block mb-2 group-hover:underline"
                  target="_blank"
                  href={`/${url.shortCode}`}
                >
                  {shortenerUrl(url.shortCode)}
                </Link>

                <p className="text-sm text-gray-600 truncate">
                  {url.original}
                </p>
              </div>

              <Link
                href={`/${url.shortCode}`}
                target="_blank"
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50 ml-4"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleCopyUrl(url.shortCode)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                >
                  {copied === url.shortCode ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{url.visits}</span>
                  <span className="text-xs text-gray-400">clicks</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
