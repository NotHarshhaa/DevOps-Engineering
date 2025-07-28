import { cn } from "@/lib/utils";
import { MobileViewportHandler } from "@/components/ui/mobile-viewport-handler";
import { BodyWrapper } from "@/components/layout/body-wrapper";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import { DocsBanners } from "./docs-banners";
import "./global.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Layout({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-website-id="b4c4225c-b9a3-4199-bd56-d9fc8d987e1a"
      className="scroll-smooth"
      data-mobile-optimized="true"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <link rel="dns-prefetch" href="https://cloud.umami.is" />
      </head>
      {!isDev ? (
        <Script
          async
          defer
          strategy="lazyOnload"
          src="https://cloud.umami.is/script.js"
          data-website-id="b4c4225c-b9a3-4199-bd56-d9fc8d987e1a"
        />
      ) : null}
      <body
        className={cn(
          GeistSans.variable,
          geistSans.className,
          "bg-background relative flex min-h-screen flex-col antialiased"
        )}
      >
        <BodyWrapper>
          <RootProvider
            search={{
              options: {
                type: "static",
              },
            }}
          >
            <DocsBanners />
            {children}
          </RootProvider>
        </BodyWrapper>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  description:
    "DevOps Engineering - A comprehensive platform for learning and implementing DevOps practices, tools, and methodologies.",
  metadataBase: new URL("https://devops-engineering.xyz"),
  title: "DevOps Engineering Playground",
  applicationName: "DevOps Engineering",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DevOps Engineering"
  },
  icons: {
    icon: '/logo.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};
