"use client";

import * as React from "react";
import { Menu, X, Link2, Github, Linkedin } from "lucide-react";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white/50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-indigo-600" />
              <span className="text-lg font-bold gradient-text">Shortify</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/alvaro-aburto-dev/"
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Menu</h2>
              <p className="text-gray-600">Navigate and connect</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <a
                href="https://www.linkedin.com/in/alvaro-aburto-dev/"
                className="px-6 py-3 text-gray-700 hover:text-indigo-600 transition-colors rounded-2xl hover:bg-indigo-50 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
