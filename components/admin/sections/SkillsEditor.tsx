"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionCard } from "../SectionCard";
import { StringArrayField } from "../fields/StringArrayField";
import { useSavePortfolio } from "../useSavePortfolio";

export function SkillsEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["skills"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const skills = data.skills;
  const setGroup = (i: number, group: string) =>
    onChange(skills.map((g, j) => (j === i ? { ...g, group } : g)));
  const setItems = (i: number, items: string[]) =>
    onChange(skills.map((g, j) => (j === i ? { ...g, items } : g)));
  const addGroup = () => onChange([...skills, { group: "", items: [] }]);
  const removeGroup = (i: number) => onChange(skills.filter((_, j) => j !== i));

  return (
    <SectionCard title="Skills" saving={saving} onSave={() => save(data)}>
      {skills.map((g, i) => (
        <div key={i} className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Group name" value={g.group} onChange={(e) => setGroup(i, e.target.value)} />
            <Button type="button" variant="outline" size="sm" onClick={() => removeGroup(i)}>Remove group</Button>
          </div>
          <StringArrayField label="Items" values={g.items}
            onChange={(items) => setItems(i, items)} placeholder="skill" />
          <Separator />
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={addGroup}>+ Add group</Button>
    </SectionCard>
  );
}
