"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionCard } from "../SectionCard";
import { StringArrayField } from "../fields/StringArrayField";
import { useSavePortfolio } from "../useSavePortfolio";

type Project = Portfolio["projects"][number];

export function ProjectsEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["projects"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const list = data.projects;
  const setField = (i: number, key: keyof Project, v: string | string[] | null) =>
    onChange(list.map((p, j) => (j === i ? { ...p, [key]: v } : p)));
  const add = () =>
    onChange([...list, { index: String(list.length + 1).padStart(2, "0"), name: "", stack: [], description: "", link: null, linkLabel: null, accent: "#f0b254" }]);
  const remove = (i: number) => onChange(list.filter((_, j) => j !== i));

  return (
    <SectionCard title="Projects" saving={saving} onSave={() => save(data)}>
      {list.map((p, i) => (
        <div key={i} className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Index (e.g. 01)" value={p.index} onChange={(e) => setField(i, "index", e.target.value)} />
            <Input placeholder="Name" value={p.name} onChange={(e) => setField(i, "name", e.target.value)} />
            <Input placeholder="Link (URL or empty)" value={p.link ?? ""}
              onChange={(e) => setField(i, "link", e.target.value ? e.target.value : null)} />
            <Input placeholder="Link label" value={p.linkLabel ?? ""}
              onChange={(e) => setField(i, "linkLabel", e.target.value ? e.target.value : null)} />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Accent</span>
              <input type="color" value={p.accent} onChange={(e) => setField(i, "accent", e.target.value)}
                className="h-9 w-12 rounded border border-input bg-transparent" />
              <Input value={p.accent} onChange={(e) => setField(i, "accent", e.target.value)} />
            </div>
          </div>
          <Textarea placeholder="Description" rows={3} value={p.description}
            onChange={(e) => setField(i, "description", e.target.value)} />
          <StringArrayField label="Stack" values={p.stack}
            onChange={(stack) => setField(i, "stack", stack)} placeholder="technology" />
          <Button type="button" variant="outline" size="sm" onClick={() => remove(i)}>Remove project</Button>
          <Separator />
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>+ Add project</Button>
    </SectionCard>
  );
}
