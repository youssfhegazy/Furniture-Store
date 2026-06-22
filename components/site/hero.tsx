"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroGallery } from "@/components/site/hero-gallery";
import { CountUp } from "@/components/site/count-up";
import { heroStats } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-teal text-white">
      {/* decorative stars / texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-10 top-24 text-6xl">✦</div>
        <div className="absolute right-1/3 top-10 text-3xl">✦</div>
        <div className="absolute bottom-16 left-1/4 text-4xl">✦</div>
      </div>

      <div className="container-x grid items-center gap-12 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:py-16">
        {/* Left copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-white/20 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/90"
          >
            Furniture Designs Ideas
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Modern Interior
            <br />
            Design Studio
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base leading-relaxed text-white/75"
          >
            Choosing the right furniture for your home online will add elegance
            and functionality to your interior while also being cost effective
            and long lasting.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <Button asChild size="lg" className="group">
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
            >
              Follow Instagram
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 flex flex-wrap gap-x-12 gap-y-6"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-semibold">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="mt-1 text-sm text-white/70">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Right expanding gallery */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        >
          <HeroGallery />
        </motion.div>
      </div>
    </section>
  );
}
