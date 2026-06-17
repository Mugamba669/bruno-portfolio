"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "../SectionCard";
import { useSavePortfolio } from "../useSavePortfolio";

export function StatsEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["stats"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const stats = data.stats;
  const set = (i: number, key: "value" | "label", v: string) =>
    onChange(stats.map((s, j) => (j === i ? { ...s, [key]: v } : s)));
  const add = () => onChange([...stats, { value: "", label: "" }]);
  const remove = (i: number) => onChange(stats.filter((_, j) => j !== i));

  return (
    <SectionCard title="Stats" saving={saving} onSave={() => save(data)}>
      {stats.map((s, i) => (
        <div key={i} className="flex gap-2">
          <Input className="w-28" placeholder="Value" value={s.value} onChange={(e) => set(i, "value", e.target.value)} />
          <Input placeholder="Label" value={s.label} onChange={(e) => set(i, "label", e.target.value)} />
          <Button type="button" variant="outline" size="sm" onClick={() => remove(i)}>✕</Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>+ Add stat</Button>
    </SectionCard>
  );
}
