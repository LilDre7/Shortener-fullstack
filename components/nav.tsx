"use client";

import * as React from "react";
import { FanIcon, Link, Menu, } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 max-w-[350px] sm:max-w-[500px] mx-auto">
        <nav className="mx-4 my-4 flex items-center justify-between rounded-full bg-zinc-900 px-4 py-2 text-white">
          <Button
            variant="ghost"
            className="p-2 hover:bg-blue-300"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-2xl font-serif">SHORT-URL</h1>
          </div>

          <Button variant="ghost" className="p-2 hover:bg-white">
            <span className="mr-2 text-sm font-medium"></span>
              <FanIcon />
          </Button>
        </nav>
      </div>

      {/* Full screen menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-900 max-w-[350px] sm:max-w-[400px] rounded-2xl max-h-[200px] mx-auto translate-y-20 sm:translate-y-20 overflow-hidden">
          <div className="mx-4 my-4 flex items-center justify-between">
            <Button
              variant="outline"
              className="border-white px-4 py-1 text-black hover:bg-white hover:text-zinc-900"
              onClick={() => setIsOpen(false)}
            >
              CLOSE
            </Button>
            <h1 className="text-2xl font-serif text-white">URL</h1>
            <div className="w-[70px]" /> {/* Spacer for centering */}
            <Link className="text-white" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <a
              href="https://www.linkedin.com/in/alvaro-aburto-dev/"
              className="mt-8 mx-auto rounded-xl bg-white px-3 py-2 text-lg font-medium text-zinc-900 hover:bg-gray-100"
            >
              HABLEMOS
            </a>
          </div>
        </div>
      )}
    </>
  );
}
