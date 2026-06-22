import { Breadcrumb } from "@/components/site/breadcrumb";

export function PageHero({
  title,
  breadcrumb = true,
}: {
  title: string;
  breadcrumb?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-teal text-white">
      {/* decorative stars */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <span className="absolute left-16 top-10 text-5xl">✦</span>
        <span className="absolute right-24 top-16 text-3xl">✦</span>
        <span className="absolute bottom-8 left-1/2 text-2xl">✦</span>
        <span className="absolute right-12 bottom-12 text-4xl">✦</span>
      </div>

      <div className="container-x py-10 lg:py-14">
        {/* Dynamic breadcrumb, top-left */}
        {breadcrumb && <Breadcrumb tone="dark" />}

        <h1 className="mt-8 text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
