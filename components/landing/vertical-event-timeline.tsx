"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Events } from "types/events";
import { events } from "data/events";

interface VerticalLayoutProps {
  children: React.ReactNode;
}

function VerticalLayout({ children }: VerticalLayoutProps) {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {children}
      </div>
    </main>
  );
}

export default function VerticalEventTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleExpand = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const formatPeriod = (item: Events[0]) => {
    if (item.periodType === "Q") {
      return `Q${item.periodNumber} ${item.year}`;
    } else if (item.periodType === "H") {
      return `H${item.periodNumber} ${item.year}`;
    }
    return `${item.year}`;
  };

  return (
    <VerticalLayout>
      <motion.div className="text-center mb-8 md:mb-16">
        <motion.h1
          className="relative inline-block text-2xl md:text-6xl font-bold mb-3 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative inline-block px-2 py-1 md:px-4 md:py-2">
            <span className="relative z-10 bg-gradient-to-r from-purple-600 via-primary to-purple-600 bg-clip-text text-transparent">
              DevOps Engineering
            </span>
            <span className="relative z-10 block text-lg md:text-4xl mt-0.5 md:mt-1 font-light text-muted-foreground/80">
              Playground Timeline
            </span>
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-lg md:blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
            <div className="absolute -inset-x-2 md:-inset-x-4 -inset-y-1 md:-inset-y-2 bg-background/50 backdrop-blur-lg md:backdrop-blur-xl rounded-xl md:rounded-2xl z-0" />
            <div className="absolute -inset-x-2 md:-inset-x-4 -inset-y-1 md:-inset-y-2 rounded-xl md:rounded-2xl border border-primary/20" />
            {/* Animated dots */}
            <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/60 animate-pulse" />
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-600/60 animate-pulse delay-300" />
          </span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-sm md:text-lg max-w-[300px] md:max-w-2xl mx-auto relative z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our development and experimentation journey and milestones
        </motion.p>
      </motion.div>

      <div className="relative">
        {/* Timeline line with gradient */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/50 via-purple-500/30 to-primary/10 z-0 rounded-full"></div>

        {events.map((item, index) => (
          <motion.div
            key={index}
            className={`mb-12 md:mb-20 relative z-10 flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot with pulse effect */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30 z-10 border-4 border-background dark:border-background"></div>
              <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 animate-ping"></div>
            </div>

            {/* Date badge */}
            <div
              className={`pl-16 md:pl-0 md:w-1/2 flex ${
                index % 2 === 0
                  ? "md:justify-end md:pr-12"
                  : "md:justify-start md:pl-12"
              }`}
            >
              <motion.div 
                className="mb-3 md:mb-0" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="text-sm md:text-base py-2 px-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20 font-medium backdrop-blur-sm hover:from-primary/20 hover:to-purple-600/20 transition-colors duration-300"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                  {formatPeriod(item)}
                </Badge>
              </motion.div>
            </div>

            {/* Card */}
            <div
              className={`pl-16 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pl-12" : "md:pr-12"
              } w-full`}
            >
              <motion.div
                layout
                className="w-full"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 w-full dark:bg-card/50 dark:border-primary/20 dark:shadow-primary/5 backdrop-blur-sm hover:backdrop-blur-md">
                  <CardContent className="p-0">
                    <div
                      className="p-6 md:p-8 cursor-pointer flex justify-between items-center group-hover:bg-primary/5 transition-colors duration-300"
                      onClick={() => toggleExpand(index)}
                    >
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2 md:mb-3">
                          {item.year} Milestones
                        </h3>
                        <p className="text-base md:text-lg font-medium mb-2 md:mb-3 text-foreground/90">
                          {item.periodType === "Q"
                            ? `Quarter ${item.periodNumber}`
                            : `Half ${item.periodNumber}`}
                        </p>
                        <div className="flex items-center text-sm md:text-base text-muted-foreground">
                          <CheckCircle
                            className={`w-5 h-5 md:w-6 md:h-6 mr-2 transition-colors duration-300 ${
                              item.isChecked
                                ? "text-green-500 dark:text-green-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                          {item.isChecked ? "Completed" : "Planned"}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors duration-300"
                      >
                        <ChevronDown className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false} mode="wait">
                      {expandedIndex === index && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2 }
                            }
                          }}
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-3 md:pt-4 border-t border-primary/10 bg-gradient-to-b from-primary/5 to-transparent">
                            <div className="mb-4">
                              <h4 className="text-base md:text-lg font-semibold flex items-center mb-4 md:mb-6 text-foreground/90">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />
                                Events
                              </h4>
                              <ul className="grid grid-cols-1 gap-3 md:gap-4">
                                {item.events.map((event, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start group/item"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: i * 0.1,
                                    }}
                                  >
                                    <CheckCircle
                                      className={`w-5 h-5 md:w-6 md:h-6 mr-3 transition-colors duration-300 ${
                                        event.isChecked
                                          ? "text-green-500 dark:text-green-400"
                                          : "text-gray-400 dark:text-gray-500"
                                      } mt-0.5 shrink-0 group-hover/item:scale-110`}
                                    />
                                    <span className="text-sm md:text-base text-foreground/80 group-hover/item:text-foreground transition-colors duration-300">
                                      {event.title}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </VerticalLayout>
  );
}
