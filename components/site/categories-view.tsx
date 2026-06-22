import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/data";
import { getCategories } from "@/lib/queries";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

// Presentational grid-span per category (layout config stays in source).
const spanByName: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.name, c.span])
);

export async function CategoriesView() {
  const cats = await getCategories();

  return (
    <section className="container-x py-12 lg:py-16">
      <Reveal>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Explore our collections room by room and find pieces crafted to fit
          the way you live.
        </p>
      </Reveal>

      <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4">
        {cats.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.06} className={cn("h-full", spanByName[cat.name])}>
            <Link
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex h-full w-full overflow-hidden rounded-2xl bg-muted"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-all duration-300 group-hover:bg-gold">
                <ArrowUpRight className="h-5 w-5" />
              </span>

              <div className="relative mt-auto p-5 text-white">
                <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                  {cat.count} products
                </p>
                <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                  {cat.name}
                </h2>
                <p className="mt-1 text-sm text-white/75">{cat.blurb}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
