import { cn } from "@/lib/utils";

/** Lightweight card primitives shared across every admin page. */

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 bg-white shadow-sm shadow-stone-200/40",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-stone-100 px-5 py-4", className)}>
      <div>
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-stone-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
