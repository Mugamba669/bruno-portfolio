"use client";

import { useState } from "react";
import type { Portfolio } from "@/lib/schema";
import { ProfileEditor } from "./sections/ProfileEditor";
import { SkillsEditor } from "./sections/SkillsEditor";
import { ExperienceEditor } from "./sections/ExperienceEditor";
import { ProjectsEditor } from "./sections/ProjectsEditor";
import { StatsEditor } from "./sections/StatsEditor";
import { SeoEditor } from "./sections/SeoEditor";

export function PortfolioEditor({ initial }: { initial: Portfolio }) {
  // Single source of truth for the whole document; each section patches its slice.
  const [data, setData] = useState<Portfolio>(initial);
  const patch = <K extends keyof Portfolio>(key: K, value: Portfolio[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  return (
    <div className="space-y-10">
      <section id="profile"><ProfileEditor data={data} onChange={(v) => patch("profile", v)} /></section>
      <section id="skills"><SkillsEditor data={data} onChange={(v) => patch("skills", v)} /></section>
      <section id="experience"><ExperienceEditor data={data} onChange={(v) => patch("experience", v)} /></section>
      <section id="projects"><ProjectsEditor data={data} onChange={(v) => patch("projects", v)} /></section>
      <section id="stats"><StatsEditor data={data} onChange={(v) => patch("stats", v)} /></section>
      <section id="seo"><SeoEditor data={data} onChange={(v) => patch("seo", v)} /></section>
    </div>
  );
}
