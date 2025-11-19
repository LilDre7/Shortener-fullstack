"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Check, Eye, ExternalLink, Trash2 } from "lucide-react";

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

  async function handleDeleteUrl(id: string) {
    try {
      const response = await fetch(`/api/urls?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }

      // Refresh the URLs list
      await fetchUrls();
    } catch (error) {
      console.error('Error al eliminar la URL:', error);
      alert('Hubo un error al eliminar el enlace');
    }
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((num) => (
          <div key={num} className="border border-gray-100 rounded-lg p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-3 bg-gray-50 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Aún no hay enlaces acortados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="pr-4 font-mono text-sm font-medium text-gray-900">Tus enlaces</h2>
        <div className="text-sm text-gray-400">
          {urls.length} {urls.length === 1 ? 'enlace' : 'enlaces'}
        </div>
      </div>

      <div className="space-y-3">
        {urls.map((url) => (
          <div key={url.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {url.createdAt && (
                    <span className="text-xs text-gray-400">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Link
                  className="text-sm font-mono text-gray-900 hover:text-gray-600 transition-colors break-all block break-words whitespace-nowrap"
                  target="_blank"
                  href={`/${url.shortCode}`}
                >
                  {shortenerUrl(url.shortCode)}
                </Link>

                <p className="text-sm text-gray-500" title={url.original}>
                  {url.original}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopyUrl(url.shortCode)}
                  className="p-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title={copied === url.shortCode ? "Copiado" : "Copiar enlace"}
                >
                  {copied === url.shortCode ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                <Link
                  href={`/${url.shortCode}`}
                  target="_blank"
                  className="p-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Abrir enlace"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => handleDeleteUrl(url.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar enlace"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1 text-xs text-black px-2">
                  <Eye className="h-3 w-3" />
                  <span>{url.visits}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
