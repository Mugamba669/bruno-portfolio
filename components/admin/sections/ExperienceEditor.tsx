"use client";
import type { Portfolio } from "@/lib/schema";
export function ExperienceEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["experience"]) => void }) {
  void data; return <div id="stub-experience" />;
}
