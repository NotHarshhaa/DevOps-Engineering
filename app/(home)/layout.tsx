import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import Footer from "@/components/landing/footer";
import { Viewport } from "next";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen">
        <HomeLayout {...baseOptions}>{children}</HomeLayout>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  themeColor: "#000000"
};
