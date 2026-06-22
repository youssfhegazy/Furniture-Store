"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { ShopProduct } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

// Display label -> the real category used to filter products.
const tabs = [
  { label: "Living Room", category: "Living Room" },
  { label: "Bedroom", category: "Bedroom" },
  { label: "Dining Room", category: "Kitchen" },
  { label: "Office Room", category: "Office" },
  { label: "Outdoor Room", category: "Outdoor" },
];

// Five images for the collage; cycle the category's products if it has fewer.
function galleryFor(products: ShopProduct[], category: string) {
  const list = products.filter((p) => p.category === category);
  const base = list.length ? list : products;
  return Array.from({ length: 5 }, (_, i) => base[i % base.length]);
}

function GalleryCell({
  product,
  category,
  className,
}: {
  product: ShopProduct;
  category: string;
  className?: string;
}) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(category)}`}
      className={cn("group relative block overflow-hidden rounded-2xl bg-muted", className)}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
        {product.name}
      </span>
    </Link>
  );
}

export function TrendingProducts({ products }: { products: ShopProduct[] }) {
  const [active, setActive] = useState(tabs[0].label);
  const category = tabs.find((t) => t.label === active)!.category;
  const images = useMemo(
    () => galleryFor(products, category),
    [products, category]
  );

  return (
    <section className="container-x py-12 lg:py-16">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Trending products for you!
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[190px_1fr] lg:gap-12">
        {/* Category rail */}
        <div className="no-scrollbar -mx-5 flex items-center gap-6 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:items-start lg:justify-center lg:gap-7 lg:overflow-visible lg:px-0">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActive(t.label)}
              className={cn(
                "relative shrink-0 whitespace-nowrap pb-1 text-left text-base transition-colors lg:text-lg",
                t.label === active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {t.label}
              {t.label === active && (
                <motion.span
                  layoutId="trend-cat-underline"
                  className="absolute -bottom-0 left-0 h-0.5 w-full rounded-full bg-gold lg:w-12"
                />
              )}
            </button>
          ))}
          <Link
            href="/products"
            className="group flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-medium text-ink lg:mt-3 lg:text-lg"
          >
            See All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Image collage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {images.slice(0, 2).map((p, i) => (
                <GalleryCell key={i} product={p} category={category} className="h-52 sm:h-64" />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 sm:mt-5 sm:gap-5">
              {images.slice(2, 5).map((p, i) => (
                <GalleryCell key={i} product={p} category={category} className="h-36 sm:h-48" />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
