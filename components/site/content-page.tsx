import { Reveal } from "@/components/site/reveal";

export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

/** Shared prose layout for the static info/legal pages linked from the footer. */
export function ContentPage({
  intro,
  updated,
  sections,
}: {
  intro?: string;
  updated?: string;
  sections: ContentSection[];
}) {
  return (
    <section className="container-x py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        {updated && (
          <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
            Last updated: {updated}
          </p>
        )}
        {intro && (
          <Reveal>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
          </Reveal>
        )}

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading ?? i} delay={i * 0.05}>
              <div>
                {section.heading && (
                  <h2 className="text-xl font-semibold text-ink sm:text-2xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="mt-3 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-ink-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
