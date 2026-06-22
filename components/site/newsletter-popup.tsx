"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Scissors, X } from "lucide-react";

import { useToast } from "@/components/ui/toast";

const STORAGE_KEY = "furniflex-newsletter-dismissed";
const IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&h=460&q=80";

export function NewsletterPopup() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    if (dontShow) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative w-full max-w-lg"
          >
            {/* Close button — gold rounded square above the card */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-xl bg-gold text-white shadow-lg transition-colors hover:bg-gold-dark"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
              {/* Image with frosted offer */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={IMAGE}
                  alt="Special offer"
                  fill
                  sizes="512px"
                  className="object-cover"
                />
                <div className="absolute bottom-5 left-5 rounded-2xl bg-black/25 px-6 py-4 text-white ring-1 ring-white/25 backdrop-blur-md">
                  <p className="text-2xl font-bold leading-tight">Get 25% Off</p>
                  <p className="mt-0.5 text-sm text-white/85">
                    On your first purchase
                  </p>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold uppercase tracking-tight text-ink">
                Subscribe Our Newsletter
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                  toast.success("Subscribed!", {
                    description: "Use code WELCOME25 for 25% off.",
                  });
                }}
                className="mt-4 space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="w-full rounded-lg bg-muted px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Coupon strip */}
              <div className="relative mt-3 rounded-lg border-2 border-dashed border-ink/20 py-3 text-center">
                <span className="absolute -bottom-3 left-6 grid h-6 w-6 place-items-center rounded-full bg-white text-teal">
                  <Scissors className="h-4 w-4" />
                </span>
                {subscribed ? (
                  <span className="text-sm font-bold tracking-[0.3em] text-teal">
                    WELCOME25
                  </span>
                ) : (
                  <span className="text-sm text-ink-soft">
                    Your coupon code show here
                  </span>
                )}
              </div>

              <label className="mt-5 flex items-center justify-end gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={dontShow}
                  onChange={(e) => setDontShow(e.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
                Do not show this popup again
              </label>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
