import Link from "next/link";

import { footerColumns } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/socials";

const socials = [
  { label: "Instagram", Icon: InstagramIcon, href: "https://instagram.com" },
  { label: "X", Icon: XIcon, href: "https://x.com" },
  { label: "Facebook", Icon: FacebookIcon, href: "https://facebook.com" },
];

function PaymentMarks() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-10 place-items-center rounded bg-white text-[10px] font-bold italic text-[#1a1f71]">
        VISA
      </span>
      <span className="grid h-6 w-10 place-items-center rounded bg-white">
        <span className="flex">
          <span className="h-3.5 w-3.5 rounded-full bg-[#eb001b]" />
          <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#f79e1b]/90" />
        </span>
      </span>
      <span className="grid h-6 w-10 place-items-center rounded bg-white text-[10px] font-bold lowercase text-[#fa5022]">
        alma
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-ink">
      {/* Centered logo */}
      <div className="border-y border-ink/10">
        <div className="container-x flex justify-center py-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-gold text-xl font-bold text-white">
              F
            </span>
            <span className="text-3xl font-semibold tracking-tight text-ink">
              FurniFlex<span className="text-gold">.</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Columns */}
      <div className="container-x grid gap-10 py-14 sm:grid-cols-3">
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-base font-semibold text-ink">{col.title}</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright bar */}
      <div className="bg-teal text-white">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-sm sm:flex-row">
          <p className="text-white/80">
            Copyright@{new Date().getFullYear()} FurniFlex. All Rights Reserved.{" "}
            <Link
              href="/admin"
              className="font-medium text-white underline-offset-2 hover:text-gold hover:underline"
            >
              Dashboard Demo
            </Link>
          </p>
          <div className="flex gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-colors hover:bg-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <PaymentMarks />
        </div>
      </div>
    </footer>
  );
}
