"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionCard } from "../SectionCard";
import { StringArrayField } from "../fields/StringArrayField";
import { useSavePortfolio } from "../useSavePortfolio";

type Role = Portfolio["experience"][number];

export function ExperienceEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["experience"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const list = data.experience;
  const setField = (i: number, key: keyof Role, v: string | string[]) =>
    onChange(list.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const add = () =>
    onChange([...list, { role: "", company: "", place: "", period: "", points: [] }]);
  const remove = (i: number) => onChange(list.filter((_, j) => j !== i));

  return (
    <SectionCard title="Experience" saving={saving} onSave={() => save(data)}>
      {list.map((r, i) => (
        <div key={i} className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Role" value={r.role} onChange={(e) => setField(i, "role", e.target.value)} />
            <Input placeholder="Company" value={r.company} onChange={(e) => setField(i, "company", e.target.value)} />
            <Input placeholder="Place" value={r.place} onChange={(e) => setField(i, "place", e.target.value)} />
            <Input placeholder="Period" value={r.period} onChange={(e) => setField(i, "period", e.target.value)} />
          </div>
          <StringArrayField label="Points" values={r.points}
            onChange={(points) => setField(i, "points", points)} placeholder="achievement" />
          <Button type="button" variant="outline" size="sm" onClick={() => remove(i)}>Remove role</Button>
          <Separator />
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>+ Add role</Button>
    </SectionCard>
  );
}
