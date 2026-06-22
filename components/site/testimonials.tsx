"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { TestimonialRecord } from "@/lib/queries";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/site/reveal";
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
} from "@/components/icons/socials";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

const socials = [
  { label: "Facebook", Icon: FacebookIcon, color: "#1877f2" },
  { label: "LinkedIn", Icon: LinkedinIcon, color: "#0a66c2" },
  { label: "X", Icon: XIcon, color: "#1a1a1a" },
  { label: "Telegram", Icon: TelegramIcon, color: "#229ed9" },
];

const variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialRecord[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback((next: number) => setIndex((next + total) % total), [total]);

  // Autoplay (pauses on hover).
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const active = testimonials[index];

  return (
    <section className="container-x py-12 lg:py-16">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Testimonial
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          See What Our Clients Say
        </h2>
      </Reveal>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Avatar selector + arrows */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-5">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => go(i)}
                aria-label={`Show ${t.name}`}
                className={cn(
                  "rounded-2xl transition-all duration-300",
                  i === index
                    ? "ring-2 ring-gold ring-offset-2"
                    : "opacity-50 hover:opacity-100"
                )}
              >
                <Avatar
                  name={t.name}
                  className={cn(
                    "rounded-2xl",
                    i === index ? "h-14 w-14 text-lg sm:h-16 sm:w-16" : "h-12 w-12 text-base"
                  )}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Quote card */}
        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
                <Avatar
                  name={active.name}
                  className="h-24 w-24 shrink-0 rounded-2xl text-3xl sm:h-32 sm:w-32 sm:text-4xl"
                />
                <div>
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                    &ldquo; {active.title} &rdquo;
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{active.quote}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{active.name}</p>
                      <p className="text-sm text-ink-soft">{active.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {socials.map(({ label, Icon, color }) => (
                        <a
                          key={label}
                          href="#"
                          aria-label={`Share on ${label}`}
                          className="grid h-8 w-8 place-items-center rounded-full transition-transform hover:scale-110"
                          style={{ backgroundColor: `${color}1a`, color }}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
