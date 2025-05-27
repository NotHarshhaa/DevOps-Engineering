import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Terminal, Mail, MessageSquare, Send, Github, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="container flex flex-1 flex-col p-4 pb-24 sm:pb-32">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="from-background relative flex flex-col gap-8 rounded-2xl border bg-gradient-to-b from-muted/50 p-4 sm:p-10">
          <GridPattern
            width={20}
            height={20}
            opacity={0.2}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
            )}
          />

          {/* Terminal Header */}
          <div className="relative flex w-full flex-col items-center rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex w-full items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="ml-2 text-xs text-muted-foreground">~/contact-devops</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-5 w-5" />
              <span className="text-green-500">devops@playground</span>
              <span className="text-muted-foreground">$</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl">
                  Let&apos;s Connect
                </h1>
                <p className="mt-4 text-muted-foreground">
                  Have questions about DevOps? Want to collaborate? Or just want to say hi? Drop us a message!
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Connect with us</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="icon" className="hover:bg-purple-500/10 hover:text-purple-500" asChild>
                    <Link href="https://github.com" target="_blank">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-500/10 hover:text-blue-500" asChild>
                    <Link href="https://linkedin.com" target="_blank">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-sky-500/10 hover:text-sky-500" asChild>
                    <Link href="https://twitter.com" target="_blank">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4 rounded-lg border bg-card p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Your email" type="email" />
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Subject" />
                </div>
                <Textarea 
                  placeholder="Your message..."
                  className="min-h-[150px] resize-none"
                />
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 