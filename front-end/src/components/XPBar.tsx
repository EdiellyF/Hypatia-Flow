import { Progress } from "@/components/ui/progress";

export default function XPBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">XP</span>
        <span className="text-sm text-muted-foreground">{current} / {total}</span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
