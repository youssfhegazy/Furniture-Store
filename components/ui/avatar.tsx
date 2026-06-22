import { cn } from "@/lib/utils";

/**
 * Initials avatar — renders a person's initials on a deterministic warm
 * background derived from their name. Used everywhere we'd otherwise show a
 * stock person photo, so the UI never depends on external portrait images.
 *
 * Size & font-size come from `className` (e.g. "h-12 w-12 text-base"); for
 * fill containers pass "absolute inset-0 h-full w-full text-2xl".
 */

const palette = [
  "bg-teal text-white",
  "bg-gold text-white",
  "bg-amber-600 text-white",
  "bg-orange-700 text-white",
  "bg-stone-600 text-white",
  "bg-emerald-700 text-white",
  "bg-rose-700 text-white",
];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const color = palette[hash(name) % palette.length];
  return (
    <span
      aria-label={name}
      className={cn(
        "grid select-none place-items-center rounded-full font-semibold leading-none",
        color,
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
