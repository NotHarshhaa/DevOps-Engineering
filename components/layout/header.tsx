"use client";

import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBreakpoints } from "@/hooks/use-media-query";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-3 sm:px-4">
        <div className="mr-2 md:mr-4 flex">
          <Link href="/" className="mr-2 md:mr-6 flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={24}
              height={24}
              className="block"
              priority
            />
            <span className="hidden font-bold xs:inline-block">
              {siteConfig.name}
            </span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary sm:px-2">
              beta
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-1 md:space-x-2 md:justify-end">
          <nav className="hidden sm:flex items-center space-x-3 md:space-x-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          <MobileNav />

          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href={siteConfig.links.github} target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoints.useMobile();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile nav when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="relative z-50 hw-accelerate"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in"
          style={{
            animationDuration: isMobile ? '150ms' : '300ms'
          }}
        >
          <nav className="container flex flex-col space-y-5 py-6 px-4">
            <Link
              href="/docs"
              className="text-base font-medium hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="text-base font-medium hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href={siteConfig.links.github}
              className="text-base font-medium hover:text-primary flex items-center px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>

            <div className="h-px w-full bg-border my-2"></div>

            <div className="pt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
