"use client";
import type { Portfolio } from "@/lib/schema";
export function StatsEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["stats"]) => void }) {
  void data; return <div id="stub-stats" />;
}
