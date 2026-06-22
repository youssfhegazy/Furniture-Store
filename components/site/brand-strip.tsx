import { Reveal } from "@/components/site/reveal";

/**
 * "Trusted by" logo strip — inline SVG wordmarks for partner/retail brands.
 * Pure SVG (currentColor) so the band never depends on external logo images
 * and stays crisp at any size. Muted by default, full ink on hover.
 */

type Brand = { name: string; mark: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const brands: Brand[] = [
  {
    name: "Maison",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v9h12v-9" />
      </svg>
    ),
  },
  {
    name: "Oakhaus",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <circle cx="12" cy="9" r="5" />
        <path d="M12 14v6M9 18h6" />
      </svg>
    ),
  },
  {
    name: "Lumière",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M9 4h6l2 7H7z" />
        <path d="M12 11v6M9 20h6" />
      </svg>
    ),
  },
  {
    name: "Nordica",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 16 16 8M8 8l8 8" />
      </svg>
    ),
  },
  {
    name: "Studio West",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M5 19V8l7-4 7 4v11" />
        <path d="M10 19v-5h4v5" />
      </svg>
    ),
  },
  {
    name: "Casa Nova",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
        <path d="M12 3 3 9l9 6 9-6z" />
        <path d="M3 15l9 6 9-6" />
      </svg>
    ),
  },
];

export function BrandStrip() {
  // Two identical copies so the -50% marquee translate loops seamlessly.
  const loop = [...brands, ...brands];

  return (
    <section className="border-y border-ink/10 bg-cream py-10 lg:py-12">
      <Reveal>
        <p className="container-x text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
          Trusted by leading interior brands
        </p>
      </Reveal>

      <div className="group relative mt-8 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <div
              key={i}
              aria-hidden={i >= brands.length}
              className="flex items-center gap-2.5 pr-12 text-ink/40 transition-colors duration-300 hover:text-ink sm:pr-20"
            >
              {brand.mark}
              <span className="whitespace-nowrap text-lg font-semibold tracking-tight sm:text-xl">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
