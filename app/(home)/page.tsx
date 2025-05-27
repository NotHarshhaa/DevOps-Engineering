import VerticalEventTimeline from "@/components/landing/vertical-event-timeline";
import { HeroSection } from "@/components/landing/hero";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowRight, Terminal, Mail, MessageSquare, Send, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { CheckCircle, Code2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="container flex flex-1 flex-col justify-center p-0 pb-24 text-center sm:pb-32">
      <HeroSection />
      <VerticalEventTimeline />
      
      <div className="px-4">
        <div className="from-background relative container flex flex-col items-center justify-center gap-8 rounded-2xl border bg-gradient-to-b from-muted/50 px-6 py-16 sm:px-8 md:py-24">
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

          {/* Terminal-like display */}
          <div className="relative flex w-full max-w-xl flex-col items-center rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex w-full items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="ml-2 text-xs text-muted-foreground">~/devops-engineering</div>
            </div>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl">
              And many more features to explore
          </h1>

            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-green-500">➜</span>
                <span className="text-blue-500">git</span>
                <span>checkout awesome-components</span>
              </div>
              
            <Button
                className="group mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-sm font-bold hover:from-purple-600 hover:to-purple-800"
              asChild
              size="lg"
            >
                <Link href="/docs/components/rating-star/basic" className="flex items-center gap-2">
                Browse All Components
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats and Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">100% Free</p>
                <p className="text-xs text-muted-foreground">No hidden costs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Github className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Open Source</p>
                <p className="text-xs text-muted-foreground">MIT Licensed</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Code2 className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">DevOps Ready</p>
                <p className="text-xs text-muted-foreground">CI/CD Optimized</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="from-background relative flex flex-col gap-6 rounded-2xl border bg-gradient-to-b from-muted/50 p-4 sm:gap-8 sm:p-8 md:p-10">
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
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl lg:text-5xl">
                    Let&apos;s Connect
                  </h1>
                  <p className="mx-auto mt-4 max-w-[500px] text-muted-foreground lg:mx-0">
                    Have questions about DevOps? Want to collaborate? Or just want to say hi? Drop us a message!
                  </p>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Connect with us</h2>
                  <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                    <Button variant="outline" size="icon" className="hover:bg-purple-500/10 hover:text-purple-500" asChild>
                      <Link href="https://github.com/NotHarshhaa" target="_blank">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-blue-500/10 hover:text-blue-500" asChild>
                      <Link href="https://linkedin.com/in/harshhaa-vardhan-reddy" target="_blank">
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
              <div className="space-y-4 rounded-lg border bg-card p-4 sm:p-6">
                <div className="space-y-3">
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
                    className="min-h-[120px] resize-none sm:min-h-[150px]"
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
      </div>
    </main>
  );
}
