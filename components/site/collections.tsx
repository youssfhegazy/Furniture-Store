import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { collections } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";

type Collection = (typeof collections)[number];

function Badge() {
  return (
    <span className="inline-block rounded-full border border-ink/10 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
      New Collection
    </span>
  );
}

function CardText({ data }: { data: Collection }) {
  return (
    <div className="relative z-10">
      <Badge />
      <h3 className="mt-4 text-2xl font-semibold text-ink">{data.title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        href={`/products?category=${encodeURIComponent(data.title)}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
      >
        View All <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function DiscountCard() {
  return (
    <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-teal p-6 text-center text-white">
      {/* wavy line decoration */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 400 300"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-20 70 C 80 30, 140 110, 240 70 S 420 30, 480 80"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M-20 110 C 80 70, 140 150, 240 110 S 420 70, 480 120"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M-20 230 C 80 190, 140 270, 240 230 S 420 190, 480 240"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      <span className="absolute left-7 top-7 text-lg opacity-30">★</span>
      <span className="absolute bottom-8 right-10 text-sm opacity-30">★</span>

      <Link
        href="/products"
        className="relative rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-dark"
      >
        Get Discount
      </Link>
      <p className="relative text-4xl font-bold">
        20% <span className="text-3xl font-light">OFFER</span>
      </p>
    </div>
  );
}

export function Collections() {
  const [centerTable, accentChairs, lightingLamp] = collections;

  return (
    <section className="container-x py-8 lg:py-12">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Center Table */}
          <Reveal>
            <div className="relative flex min-h-[300px] items-center gap-4 overflow-hidden rounded-2xl bg-muted p-7">
              <CardText data={centerTable} />
              <div className="relative h-48 flex-1 self-center">
                <Image
                  src={centerTable.image}
                  alt={centerTable.title}
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>

          {/* Lighting Lamp + Discount */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="relative flex h-full min-h-[260px] items-center gap-2 overflow-hidden rounded-2xl bg-muted p-6">
                <CardText data={lightingLamp} />
                <div className="relative h-44 w-24 shrink-0 self-center">
                  <Image
                    src={lightingLamp.image}
                    alt={lightingLamp.title}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <DiscountCard />
            </Reveal>
          </div>
        </div>

        {/* Right column — Accent Chairs (tall) */}
        <Reveal delay={0.1} className="h-full">
          <div className="relative flex h-full min-h-[490px] flex-col overflow-hidden rounded-2xl bg-muted p-7">
            <CardText data={accentChairs} />
            <div className="absolute bottom-0 right-0 h-[78%] w-[58%]">
              <Image
                src={accentChairs.image}
                alt={accentChairs.title}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
