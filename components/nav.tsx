"use client";

import { Link2, Github, Linkedin } from "lucide-react";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-gray-900" />
            <span className="text-lg font-medium text-gray-900">Shortify</span>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/alvaro-aburto-dev/"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
