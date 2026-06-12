import { cn } from "@/lib/utils";

export function HeroBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40 bg-transparent dark:bg-transparent">
      {/* Diagonal grid of backgrounds */}
      <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "relative h-full w-full",
              i === 2 &&
                "bg-gradient-to-b from-transparent via-neutral-100/8 to-transparent dark:via-neutral-800/8 blur-2xl",
            )}
          />
        ))}
      </div>

      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
