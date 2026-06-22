"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { flashSale } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    targetRef.current = Date.now() + initialSeconds * 1000;
    const tick = () => {
      const remaining = Math.max(
        0,
        Math.round((targetRef.current! - Date.now()) / 1000)
      );
      setSeconds(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 60,
  };
}

function TimeBox({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink shadow-sm">
      {pad(value)} <span className="font-normal text-ink-soft">{unit}</span>
    </span>
  );
}

function SideCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-muted p-5">
      <div className="relative min-h-[120px] flex-1">
        <Image src={image} alt={title} fill sizes="280px" className="object-contain" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-base font-medium text-ink">{title}</p>
        <Link
          href="/products"
          aria-label={`View ${title}`}
          className="grid h-9 w-12 shrink-0 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function FlashSale() {
  const { h, m, s } = useCountdown(12 * 3600 + 36 * 60 + 57);

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Main flash sale card */}
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl bg-muted p-8 lg:p-10">
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-4xl font-bold text-ink lg:text-5xl">
                  Flash Sale!
                </h2>
                <p className="mt-4 max-w-xs text-sm text-ink-soft">
                  Act fast to grab incredible deals on select furniture pieces
                  in our limited-time flash sale.
                </p>
              </div>
              <div className="shrink-0">
                <span className="flex items-center justify-end gap-1.5 text-sm text-ink">
                  <Clock className="h-4 w-4" /> End time
                </span>
                <div className="mt-3 flex gap-2">
                  <TimeBox value={h} unit="H" />
                  <TimeBox value={m} unit="M" />
                  <TimeBox value={s} unit="S" />
                </div>
              </div>
            </div>

            {/* Product row */}
            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-end">
              <div className="flex shrink-0 flex-col items-center">
                <div className="relative h-44 w-56">
                  <Image
                    src={flashSale.image}
                    alt={flashSale.title}
                    fill
                    sizes="224px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-3 flex items-center gap-3 self-start">
                  <span className="text-2xl font-bold text-ink">
                    ${flashSale.price}
                  </span>
                  <span className="text-base text-ink-soft line-through">
                    ${flashSale.oldPrice}
                  </span>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="text-2xl font-semibold text-ink">
                  {flashSale.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm text-ink-soft">
                  {flashSale.description}
                </p>
                <Button asChild className="mt-5">
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Side cards */}
        <div className="flex flex-col gap-6">
          {flashSale.side.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1} className="h-full">
              <SideCard title={card.title} image={card.image} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
