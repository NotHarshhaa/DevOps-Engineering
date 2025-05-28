"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  useHeadroom,
  useInViewport,
  useScrollSpy,
  useWindowScroll,
} from "@mantine/hooks";
import { ArrowLeft, Check, ChevronUp, Share } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function Control({ url }: { url: string }): React.ReactElement {
  const [text, setText] = useState("Share Post");

  const onClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setText("Copied");

    // Reset after 2 seconds
    setTimeout(() => {
      setText("Share Post");
    }, 2000);
  };

  return (
    <button
      className={cn(
        buttonVariants({ className: "gap-2", variant: "secondary" })
      )}
      onClick={onClick}
    >
      {text === "Share Post" ? (
        <Share className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
      <p>{text}</p>
    </button>
  );
}

export function BlogTitle({
  author,
  date,
  description,
  name,
  title,
  tags,
}: {
  title: string;
  description: string | undefined;
  author: string | undefined;
  date: string | Date | undefined;
  name: string;
  tags: string[] | undefined;
}) {
  const pinned = useHeadroom({ fixedAt: 120 });
  const [_scroll, scrollTo] = useWindowScroll();
  const { inViewport, ref } = useInViewport();
  const isMobile = useIsMobile();
  
  return (
    <>
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            height: "fit-content",
            position: "relative",
            top: isMobile ? 36 : 46,
            zIndex: 2,
          }}
          className="container px-4 py-4 md:px-6 md:py-6"
        >
          <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-xl border bg-gradient-to-br from-violet-900 via-violet-800 to-teal-700 shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            <div className="relative px-6 py-8 md:px-8">
              {/* Back to blog link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="group mb-4 pl-0 text-white/80 hover:text-white"
                >
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                  </Link>
                </Button>
              </motion.div>

              {/* Title and description */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-balance text-xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-balance text-base text-white/80 md:text-lg"
                >
                  {description}
                </motion.p>
              </div>

              {/* Metadata section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:gap-6"
              >
                {/* Author and date */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-white/10 p-1">
                      <svg
                        className="size-full text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-white/80 md:text-sm">
                      Written by{" "}
                      <span className="font-medium text-white">{author}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-white/10 p-1">
                      <svg
                        className="size-full text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-white/80 md:text-sm">
                      <span className="font-medium text-white">
                        {new Date(date ?? name).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="size-6 rounded-full bg-white/10 p-1">
                      <svg
                        className="size-full text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/10 text-xs font-medium text-white hover:bg-white/20 md:text-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{
            height: "fit-content",
            left: 0,
            padding: isMobile ? "0.7rem" : "1rem",
            position: "sticky",
            right: 0,
            top: isMobile ? 56 : 66,
            transform: `translate3d(0, ${pinned ? 0 : "-160px"}, 0)`,
            transition: "transform 400ms ease",
            zIndex: 2,
          }}
          className={`container flex w-full flex-row items-center gap-2 border py-3 md:rounded-xl md:px-4 ${inViewport ? "opacity-0" : "opacity-100"} bg-linear-to-r from-violet-800 to-teal-700`}
        >
          <div>
            {" "}
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-text pl-0 text-white underline"
            >
              <Link href="/blog">
                <ArrowLeft /> Back to Blog
              </Link>
            </Button>
            <h1
              className={`text-md text-md md:text-md mb-0 font-semibold text-white`}
            >
              {title}
            </h1>
            <motion.p
              className="text-white md:text-base"
              animate={{
                height: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>

        {/* <motion.div
          style={{
            position: "sticky",
            top: isMobile ? 56 : 66,
            left: 0,
            right: 0,
            padding: inViewport ? "3rem" : "1rem",
            height: 60,
            zIndex: 2,
            transform: `translate3d(0, ${pinned ? 0 : "-150px"}, 0)`,
            transition: "transform 400ms ease",
            backgroundBlendMode: "difference, difference, normal",
            backgroundColor: "black",
            backgroundImage: [
              "linear-gradient(to right, #6b11cb78 0%, #12f7be73 100%)",
            ].join(", "),
          }}
          className={`container flex w-full flex-row items-center gap-2 border py-3 md:rounded-xl md:px-4`}
          animate={{
            padding: !inViewport ? "0.75rem 1rem" : "3rem 1rem",
            height: !inViewport ? "90px" : "260px",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div>
            {" "}
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-text pl-0 underline"
            >
              <Link href="/blog">
                <ArrowLeft /> Back to Blog
              </Link>
            </Button>
            <h1
              className={`text-md mb-0 text-white ${inViewport ? "text-xl font-bold md:text-3xl" : "text-md md:text-md font-semibold"}`}
            >
              {title}
            </h1>
            <motion.p
              className="text-white/80 md:text-base"
              animate={{
                opacity: !inViewport ? 0 : 1,
                height: !inViewport ? 0 : "auto",
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
        </motion.div> */}

        <motion.div ref={ref}></motion.div>
      </>
    </>
  );
}

export const BlogTOC = () => {
  const { active, data } = useScrollSpy({
    selector: "h2, h3, h4, h5, h6",
  });

  const headings = data.map((heading, index) => (
    <motion.div
      key={heading.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative hidden lg:block"
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-[2px] rounded-full transition-all duration-300",
          index === active
            ? "bg-gradient-to-b from-violet-500 to-teal-500 opacity-100"
            : "bg-muted opacity-0"
        )}
      />
      <button
        onClick={() => heading.getNode().scrollIntoView({ behavior: "smooth" })}
        style={{
          paddingInlineStart: `${heading.depth * 12}px`,
        }}
        className={cn(
          "group flex w-full items-center gap-2 py-2 pl-4 pr-2 text-sm transition-all duration-300",
          index === active
            ? "font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <div
          className={cn(
            "size-1.5 rounded-full transition-all duration-300",
            index === active
              ? "bg-gradient-to-r from-violet-500 to-teal-500"
              : "bg-muted group-hover:bg-foreground/50"
          )}
        />
        <span className="truncate">{heading.value}</span>
      </button>
    </motion.div>
  ));

  return (
    <div className="sticky top-24 w-64 shrink-0">
      <div className="mb-4 flex items-center gap-2 px-4">
        <div className="h-4 w-1 rounded-full bg-gradient-to-b from-violet-500 to-teal-500" />
        <h4 className="font-medium">Table of Contents</h4>
      </div>
      <div className="space-y-1 overflow-hidden">{headings}</div>
    </div>
  );
};
