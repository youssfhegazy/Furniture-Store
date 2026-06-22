"use client";

import { Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/socials";
import { useAuth } from "@/lib/auth-context";

const socials = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "X", Icon: XIcon, href: "#" },
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
];

export function TopBar() {
  const { user } = useAuth();

  // The "Sign up & save" promo only makes sense for logged-out visitors.
  if (user) return null;

  return (
    <div className="bg-gold text-white">
      <div className="container-x flex h-11 items-center justify-between gap-4 text-[13px]">
        <div className="flex items-center gap-3">
          <span className="hidden font-medium sm:inline">Follow Us</span>
          <div className="flex items-center gap-2">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-colors hover:bg-white/35"
              >
                <Icon className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>

        <p className="hidden flex-1 text-center font-medium md:block">
          Sign up get 20% Off for all collection
        </p>

        <a
          href="tel:11002345678"
          className="flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
        >
          <Phone className="h-4 w-4" />
          <span>1 (100) 234-5678</span>
        </a>
      </div>
    </div>
  );
}
