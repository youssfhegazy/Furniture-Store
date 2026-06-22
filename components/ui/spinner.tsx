import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
} as const;

export type SpinnerSize = keyof typeof sizes;

/** Inline animated spinner. Defaults to currentColor so it inherits text color. */
export function Spinner({
  size = "md",
  className,
  label,
}: {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}) {
  return (
    <Loader2
      role="status"
      aria-label={label ?? "Loading"}
      className={cn("animate-spin", sizes[size], className)}
    />
  );
}

/** Centered loading row with an optional message — for lists, tables, panels. */
export function LoadingState({
  label = "Loading…",
  className,
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: SpinnerSize;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-12 text-sm text-stone-400",
        className
      )}
    >
      <Spinner size={size} />
      <span>{label}</span>
    </div>
  );
}

/** Full-viewport centered spinner — for route-level loading screens. */
export function FullPageSpinner({ label }: { label?: string }) {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-ink-soft">
        <Spinner size="lg" className="text-gold" />
        {label && <p className="text-sm">{label}</p>}
      </div>
    </div>
  );
}
