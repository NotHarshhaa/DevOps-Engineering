import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
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
    >
      {!isDev ? (
        <Script
          async
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
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  description:
    "DevOps Engineering - A comprehensive platform for learning and implementing DevOps practices, tools, and methodologies.",
  metadataBase: new URL("https://devops-engineering.xyz"),
  title: "DevOps Engineering Playground",
  icons: {
    icon: '/logo.svg',
  },
};
