"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

import { contactInfo } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  XIcon,
} from "@/components/icons/socials";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const icons = { Mail, Phone, Printer, MapPin } as const;

const socials = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "X", Icon: XIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Pinterest", Icon: PinterestIcon },
];

export function ContactView() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent", { description: "We'll get back to you shortly." });
  };

  return (
    <section className="container-x grid items-start gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
      {/* Left: info */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink">
          Get in touch
        </h1>
        <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
          {contactInfo.intro}
        </p>

        <ul className="mt-8 space-y-5">
          {contactInfo.methods.map((m) => {
            const Icon = icons[m.icon as keyof typeof icons];
            return (
              <li key={m.label} className="flex items-center gap-4">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${m.tint}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-ink-soft">{m.label}</p>
                  <p className="text-sm font-medium text-ink">{m.value}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <h2 className="mt-12 text-2xl font-semibold text-ink">Stay Connected</h2>
        <div className="mt-4 flex gap-3">
          {socials.map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold transition-colors hover:bg-gold hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div className="rounded-3xl bg-teal p-8 text-white lg:p-10">
        <h2 className="text-center text-3xl font-semibold">Send us a message</h2>
        <p className="mt-2 text-center text-sm text-white/70">
          Your email address will not be published.
          <br />
          Required fields are marked
        </p>

        {sent ? (
          <div className="mt-10 rounded-2xl bg-white/10 p-8 text-center">
            <p className="text-lg font-semibold">Message sent!</p>
            <p className="mt-2 text-sm text-white/70">
              Thanks for reaching out — our team will get back to you shortly.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSent(false)}
            >
              Send another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field label="Name">
              <input className={inputCls} required />
            </Field>
            <Field label="Email Address">
              <input type="email" className={inputCls} required />
            </Field>
            <Field label="Phone Number">
              <input className={inputCls} />
            </Field>
            <Field label="Messages">
              <textarea className={`${inputCls} min-h-32 resize-y`} required />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/90">{label}</label>
      {children}
    </div>
  );
}
