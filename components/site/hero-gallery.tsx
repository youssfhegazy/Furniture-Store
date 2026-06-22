"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { heroPanels } from "@/lib/data";
import { cn } from "@/lib/utils";

export function HeroGallery() {
  // First panel expanded by default.
  const [active, setActive] = useState(0);

  const move = (dir: 1 | -1) =>
    setActive((i) => (i + dir + heroPanels.length) % heroPanels.length);

  return (
    <div className="w-full">
      <div className="flex h-[360px] gap-3 sm:h-[440px] lg:h-[480px]">
        {heroPanels.map((panel, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={panel.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={panel.title}
              initial={false}
              animate={{ flexGrow: isActive ? 6 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative h-full min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl outline-none"
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className={cn(
                  "object-cover transition-transform duration-700 ease-out",
                  isActive ? "scale-100" : "scale-110 group-hover:scale-105"
                )}
                priority={i === 0}
              />

              {/* darkening gradient */}
              <span
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  isActive
                    ? "bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                    : "bg-black/35"
                )}
              />

              {/* Collapsed: vertical title */}
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                <span className="rotate-180 text-base font-medium tracking-wide text-white [writing-mode:vertical-rl]">
                  {panel.title}
                </span>
              </span>

              {/* Expanded: title + meta along the bottom */}
              <motion.span
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5 sm:p-6"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
              >
                <span className="text-2xl font-semibold text-white sm:text-3xl">
                  {panel.title}
                </span>
                <span className="whitespace-nowrap text-sm text-white/90">
                  <span className="text-lg font-semibold text-white sm:text-xl">
                    {panel.meta.split(" ")[0]}
                  </span>{" "}
                  {panel.meta.split(" ").slice(1).join(" ")}
                </span>
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {/* Prev / next controls */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => move(-1)}
          aria-label="Previous"
          className="grid h-11 w-14 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => move(1)}
          aria-label="Next"
          className="grid h-11 w-14 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
