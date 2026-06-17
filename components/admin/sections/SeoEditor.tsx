"use client";
import type { Portfolio } from "@/lib/schema";
export function SeoEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["seo"]) => void }) {
  void data; return <div id="stub-seo" />;
}
