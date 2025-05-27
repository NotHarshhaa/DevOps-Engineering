import { Header } from "@/components/layout/header";
import Footer from "@/components/landing/footer";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
} 