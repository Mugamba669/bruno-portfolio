"use client";

import type { Portfolio } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionCard } from "../SectionCard";
import { StringArrayField } from "../fields/StringArrayField";
import { useSavePortfolio } from "../useSavePortfolio";

export function SeoEditor({
  data, onChange,
}: { data: Portfolio; onChange: (v: Portfolio["seo"]) => void }) {
  const { save, saving } = useSavePortfolio();
  const seo = data.seo;
  return (
    <SectionCard title="SEO" saving={saving} onSave={() => save(data)}>
      <p className="text-sm text-muted-foreground">
        Drives the page &lt;title&gt;, meta description, and JSON-LD.
      </p>
      <div className="space-y-2">
        <Label htmlFor="seo-title">Title</Label>
        <Input id="seo-title" value={seo.title} onChange={(e) => onChange({ ...seo, title: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seo-desc">Description</Label>
        <Textarea id="seo-desc" rows={3} value={seo.description}
          onChange={(e) => onChange({ ...seo, description: e.target.value })} />
      </div>
      <StringArrayField label="Keywords" values={seo.keywords}
        onChange={(keywords) => onChange({ ...seo, keywords })} placeholder="keyword" />
    </SectionCard>
  );
}
