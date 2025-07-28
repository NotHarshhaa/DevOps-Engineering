import { siteConfig } from "@/config/site";
import { FaGithub, FaTelegram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { href: "/product", label: "Product" },
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: <FaGithub className="h-4 w-4 sm:h-5 sm:w-5" />, href: "https://github.com/NotHarshhaa", label: "GitHub" },
  { icon: <FaTelegram className="h-4 w-4 sm:h-5 sm:w-5" />, href: "https://t.me/NotHarshhaa", label: "Telegram" },
  { icon: <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />, href: "https://linkedin.com/in/harshhaa-vardhan-reddy", label: "LinkedIn" },
  { icon: <FaGlobe className="h-4 w-4 sm:h-5 sm:w-5" />, href: siteConfig.links.portfolio, label: "Portfolio" },
  { icon: <MdEmail className="h-4 w-4 sm:h-5 sm:w-5" />, href: "mailto:contact@devops-engineering.xyz", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative w-full border-t bg-background">
      <div className="mx-auto w-full px-2 py-6 sm:px-4 md:px-6 sm:py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="relative z-10 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="mx-auto max-w-[300px] sm:max-w-[340px] text-center md:max-w-xl">
            <div className="mb-3 sm:mb-4 flex flex-col items-center justify-center gap-2 sm:gap-3 sm:flex-row">
              <Image
                src="/logo.svg"
                alt="logo"
                width={28}
                height={28}
                className="block dark:invert sm:w-8"
              />
              <div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base font-bold sm:text-lg">{siteConfig.name}</span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary sm:px-2">
                    beta
                  </span>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  DevOps Engineering Playground
                </p>
              </div>
            </div>
            <p className="mb-4 sm:mb-6 px-2 sm:px-4 text-xs text-muted-foreground sm:text-sm">
              A digital playground and lab bench where we experiment with DevOps tools,
              CI/CD workflows, and infrastructure automation.
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="relative z-10 mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors sm:text-sm px-1 py-1"
            >
              {link.label}
              </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="relative z-10 mb-4 sm:mb-6 flex justify-center gap-3 sm:gap-5 md:gap-6">
          {socialLinks.map((link) => (
              <Link
              key={link.label}
              href={link.href}
                target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Privacy Policy */}
        <div className="relative z-10 flex justify-center">
          <Link
            href="/privacy"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors sm:text-sm"
          >
            Privacy Policy
              </Link>
        </div>

        {/* Background Text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-2 sm:px-4">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <div className="-mt-4 flex w-full flex-col items-center sm:mt-0">
              <span className="w-full text-[50px] font-bold leading-[0.8] tracking-tighter text-muted/10 sm:text-[100px] md:text-[140px] lg:text-[200px]">
                devops-
              </span>
              <span className="w-full text-[50px] font-bold leading-[0.8] tracking-tighter text-muted/10 sm:text-[100px] md:text-[140px] lg:text-[200px]">
                engineering
              </span>
            </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
