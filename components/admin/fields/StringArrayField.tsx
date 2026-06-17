"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StringArrayField({
  label, values, onChange, placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const set = (i: number, v: string) => onChange(values.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(values.filter((_, j) => j !== i));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <Input value={v} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          <Button type="button" variant="outline" size="sm" onClick={() => move(i, -1)}>↑</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => move(i, 1)}>↓</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => remove(i)}>✕</Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...values, ""])}>
        + Add
      </Button>
    </div>
  );
}
