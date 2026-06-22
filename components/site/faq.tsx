"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import type { FaqRecord } from "@/lib/queries";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function Faq({ faqs }: { faqs: FaqRecord[] }) {
  // Third item open by default (matches design).
  const [open, setOpen] = useState(2);

  return (
    <section className="container-x py-12 lg:py-16">
      <Reveal>
        <h2 className="mx-auto max-w-md text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Got Questions? We&apos;ve Got Answers!
        </h2>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
        {faqs.map((faq, i) => {
          const isOpen = i === open;
          return (
            <Reveal key={faq.question} delay={i * 0.05}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl transition-colors",
                  isOpen ? "bg-teal text-white" : "bg-muted text-ink"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="text-base font-medium sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
                      isOpen ? "bg-white text-teal" : "bg-white text-ink"
                    )}
                  >
                    {isOpen ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-sm leading-relaxed text-white/80 sm:px-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
