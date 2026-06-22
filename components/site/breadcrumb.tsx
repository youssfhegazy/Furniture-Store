"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

// Friendly labels for known routes; anything else is de-slugified.
const LABELS: Record<string, string> = {
  products: "Products",
  categories: "Categories",
  about: "About us",
  contact: "Contact Us",
  blog: "Blog",
};

const deslugify = (segment: string) =>
  decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function Breadcrumb({
  tone = "dark",
  className,
}: {
  /** "dark" = on a dark/teal surface, "light" = on a white surface */
  tone?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => ({
      label: LABELS[seg] ?? deslugify(seg),
      href: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  const muted = tone === "dark" ? "text-white/70" : "text-ink-soft";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-ink";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-sm", muted, className)}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={crumb.href}>
            {isLast ? (
              <span aria-current="page" className="flex items-center gap-1.5 font-medium text-gold">
                {i === 0 && <Home className="h-4 w-4" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn("flex items-center gap-1.5 transition-colors", hover)}
              >
                {i === 0 && <Home className="h-4 w-4" />}
                {crumb.label}
              </Link>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
          </Fragment>
        );
      })}
    </nav>
  );
}
