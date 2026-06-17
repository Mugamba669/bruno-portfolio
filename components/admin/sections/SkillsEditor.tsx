"use client";
import type { Portfolio } from "@/lib/schema";
export function SkillsEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["skills"]) => void }) {
  void data; return <div id="stub-skills" />;
}
