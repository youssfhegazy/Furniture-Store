"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const move = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted p-8">
        <Image
          key={active}
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain p-8"
          priority
        />
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
          <button
            onClick={() => move(-1)}
            aria-label="Previous image"
            className="grid h-11 w-14 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-ink/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next image"
            className="grid h-11 w-14 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-5 grid grid-cols-3 gap-5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl bg-muted p-4 transition-colors",
              i === active ? "ring-2 ring-gold" : "ring-1 ring-transparent hover:ring-ink/10"
            )}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              fill
              sizes="200px"
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
