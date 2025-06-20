"use client";
import { useRegistryCounts } from "@/hooks/use-registry-counts";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GridPattern } from "../magicui/grid-pattern";
import { LineShadowText } from "../magicui/line-shadow-text";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { TechStatck } from "./tech-stack";

const HeroTitle = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  const { total } = useRegistryCounts();

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 hidden text-4xl leading-none font-semibold tracking-tighter text-balance sm:text-5xl md:block md:text-6xl lg:text-7xl">
          Explore{" "}
          <span className="bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            DevOps
          </span>{" "}
          tools and practices,{" "}
          <div className="inline-block">
            <LineShadowText className="italic inline-block align-middle" shadowColor={shadowColor}>
              experimenting
            </LineShadowText>
          </div>
        </h1>

        <h1 className="mb-4 block text-4xl leading-tight font-semibold tracking-tighter text-balance sm:text-5xl md:hidden md:text-6xl lg:text-7xl">
          Explore{" "}
          <span className="bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            DevOps
          </span>{" "}
          tools{" "}
          <div className="inline-block">
            <span className="italic">experimenting</span>
          </div>
        </h1>

        <p className="text-muted-foreground mb-6 text-lg font-light text-balance md:text-xl">
          A digital playground and lab bench where we experiment with{" "}
          <span className="text-foreground font-normal">
            CI/CD workflows
          </span>
          ,{" "}
          <span className="text-foreground font-normal">
            infrastructure automation
          </span>
          , and{" "}
          <span className="text-foreground font-normal">
            observability stacks
          </span>
          {" "}— learning through trial, error, and iteration.
        </p>

        <div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
          <div className="hidden md:block">
            <Button
              className="group/arrow w-full px-4 py-2 text-base font-medium md:px-4 md:py-4 md:text-sm"
              asChild
              size="lg"
              variant="secondary"
            >
              <Link href="/docs">
                Bootstrapping the Playground
                <ArrowRight className="ml-2 size-4 transition-transform group-hover/arrow:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              className="group/arrow w-full px-4 py-2 text-base font-medium md:px-4 md:py-4 md:text-sm"
              asChild
              size="lg"
            >
              <Link href="/blog">
                Field Notes from the Lab
                <ArrowRight className="ml-2 size-4 transition-transform group-hover/arrow:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 w-full text-center">
          <p>
            🌍 Open Learning and <span className="font-semibold">🌱 Open Source</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <TechStatck />
          <div className="mb-8 flex w-fit flex-row items-center gap-2 rounded-full border border-cyan-500 bg-cyan-500/20 p-2 px-6 text-center text-sm font-normal tracking-wider uppercase shadow-md">
            <Icons.devops className="h-6 w-6" />
            <p>DevOps Engineering Playground</p>
          </div>
        </div>
      </div>
    </>
  );
};

export function HeroSection() {
  return (
    <section className="relative px-4 py-8 md:px-0 md:py-12">
      <div className="absolute hidden size-full h-[600px] w-full items-center justify-center overflow-hidden [mask-image:radial-gradient(circle,#000_10%,transparent_80%)] md:flex">
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          opacity={0.6}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
          )}
        />
      </div>
      <div className="mx-auto my-4 grid place-items-center gap-6 md:my-6 md:gap-8">
        <div className="relative z-20 max-w-screen-md space-y-6 text-center">
          <HeroTitle />
        </div>
      </div>
    </section>
  );
}
