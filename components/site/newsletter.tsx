"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Mail } from "lucide-react";

import { newsletter } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Reveal } from "@/components/site/reveal";

export function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Hook up to POST /api/newsletter when the backend is ready.
    setSubscribed(true);
    toast.success("Subscribed!", { description: `${email} is on the list.` });
    setEmail("");
  };

  return (
    <section className="container-x py-12 lg:py-16">
      <Reveal>
        <div className="grid items-center gap-8 rounded-2xl bg-muted p-8 md:grid-cols-2 lg:p-12">
          {/* Copy + form */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Subscribe To Our Newsletter
            </h2>
            <p className="mt-4 max-w-sm text-sm text-ink-soft">
              Subscribe to our email newsletter today to receive update on the
              latest news
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-sm"
            >
              <Mail className="h-4 w-4 shrink-0 text-ink-soft" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-soft focus:outline-none"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Subscribe
              </Button>
            </form>
            {subscribed && (
              <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal">
                <Check className="h-4 w-4" /> Thanks! You&apos;re subscribed.
              </p>
            )}
          </div>

          {/* Image with price tag */}
          <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <Image
              src={newsletter.image}
              alt="Cozy bedroom workspace"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute right-6 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-sm font-semibold text-ink shadow-md">
              {newsletter.priceTag}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
