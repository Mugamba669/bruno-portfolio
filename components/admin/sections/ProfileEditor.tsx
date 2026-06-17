"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionCard } from "../SectionCard";
import { useSavePortfolio } from "../useSavePortfolio";

const FIELDS: { key: keyof Portfolio["profile"]; label: string }[] = [
  { key: "name", label: "Full name" },
  { key: "shortName", label: "Short name" },
  { key: "role", label: "Role" },
  { key: "tagline", label: "Tagline" },
  { key: "location", label: "Location" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "github", label: "GitHub URL" },
  { key: "site", label: "Site URL" },
  { key: "education", label: "Education" },
];

export function ProfileEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["profile"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const p = data.profile;
  const set = (k: keyof Portfolio["profile"], v: string) => onChange({ ...p, [k]: v });

  return (
    <SectionCard title="Profile" saving={saving} onSave={() => save(data)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input id={f.key} value={p[f.key]} onChange={(e) => set(f.key, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea id="summary" rows={5} value={p.summary} onChange={(e) => set("summary", e.target.value)} />
      </div>
    </SectionCard>
  );
}
