import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

export function SectionHeading({
  title,
  className,
  children,
}: {
  title: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <Reveal>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </div>
  );
}
