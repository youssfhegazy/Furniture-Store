import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { offerBanner } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function Offers() {
  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Exclusive offer with background image */}
        <Reveal>
          <div className="relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white">
            <Image
              src={offerBanner.image}
              alt="Exclusive interior offer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Exclusive Offer</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">
                  15% OFF
                </span>
              </div>
              <h3 className="mt-3 max-w-xs text-3xl font-semibold leading-tight">
                Best Online Deals, Free Stuff
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Only on this week... Don&apos;t miss
              </p>
              <Button asChild size="md" className="mt-5">
                <Link href="/products">
                  Get Best Deal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Regular offer */}
        <Reveal delay={0.1}>
          <div className="flex h-full min-h-[300px] flex-col justify-center rounded-2xl bg-muted p-8 lg:p-10">
            <span className="text-sm font-medium text-ink-soft">
              Regular Offer
            </span>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink">
              10% cash-back
              <br />
              on personal care
            </h3>
            <p className="mt-3 text-sm text-ink-soft">
              Max cashback: $12. Code: CADHL837
            </p>
            <Button asChild variant="teal" size="md" className="mt-6 w-fit">
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
