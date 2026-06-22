import Image from "next/image";
import { Award, Globe, Sparkles, Telescope, TrendingUp } from "lucide-react";

import { aboutPage } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/socials";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const icons = { Sparkles, Award, TrendingUp, Globe, Telescope } as const;

export function AboutView() {
  return (
    <>
      {/* Intro */}
      <section className="container-x py-12 text-center lg:py-16">
        <Reveal>
          <h1 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {aboutPage.heading}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 aspect-[16/8] max-w-4xl overflow-hidden rounded-2xl bg-muted">
            <Image
              src={aboutPage.heroImage}
              alt="FurniFlex team"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-ink-soft">
            {aboutPage.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            {aboutPage.storyTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {aboutPage.storyIntro}
          </p>
        </Reveal>
      </section>

      {/* Journey timeline */}
      <section className="container-x pb-8">
        <div className="space-y-12 lg:space-y-16">
          {aboutPage.milestones.map((m, i) => {
            const Icon = icons[m.icon as keyof typeof icons];
            const imageLeft = i % 2 === 0;
            return (
              <Reveal key={m.title}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  {/* Image */}
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border-4 border-teal bg-muted",
                      imageLeft ? "lg:order-1" : "lg:order-2"
                    )}
                  >
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Text */}
                  <div className={cn(imageLeft ? "lg:order-2" : "lg:order-1")}>
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                      {m.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Team */}
      {/* <section className="container-x py-12 lg:py-16"> */}
        <Reveal>
          <h2 className="text-center text-3xl font-semibold text-ink">
            Our Awesome Team
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutPage.team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <div className="rounded-2xl bg-muted/50 p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-teal/15 to-gold/15">
                  <Avatar
                    name={member.name}
                    className="absolute inset-0 h-full w-full rounded-xl bg-transparent text-7xl text-teal"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl bg-teal/90 px-4 py-3 text-white backdrop-blur">
                    <div>
                      <p className="font-semibold leading-tight">
                        {member.name}
                      </p>
                      <p className="text-xs text-white/70">{member.role}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {[InstagramIcon, XIcon, FacebookIcon].map((Icon, j) => (
                        <a
                          key={j}
                          href="#"
                          className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors hover:bg-gold"
                        >
                          <Icon className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      {/* </section> */}
    </>
  );
}
