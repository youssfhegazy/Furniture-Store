import { Headphones, RefreshCw, ShoppingBag, Truck } from "lucide-react";

import { features } from "@/lib/data";
import { Reveal } from "@/components/site/reveal";

const icons = { Truck, ShoppingBag, Headphones, RefreshCw } as const;

export function FeatureBar() {
  return (
    <section className="container-x py-12 lg:py-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {features.map((feature, i) => {
          const Icon = icons[feature.icon as keyof typeof icons];
          return (
            <Reveal key={feature.title} delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-base font-semibold leading-snug text-ink">
                  {feature.title}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
