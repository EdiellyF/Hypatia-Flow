import { cn } from "@/lib/utils";

const petals = Array.from({ length: 18 });

export default function SakuraBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 8;
        const size = 6 + Math.random() * 10;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/40 blur-[0.5px] animate-petal-fall"
            style={{
              left: `${left}%`,
              top: `-10%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
