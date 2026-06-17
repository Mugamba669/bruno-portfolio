"use client";
import type { Portfolio } from "@/lib/schema";
export function ProjectsEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["projects"]) => void }) {
  void data; return <div id="stub-projects" />;
}
