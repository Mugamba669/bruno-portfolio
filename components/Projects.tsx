"use client";

import { useRef, useCallback } from "react";
import Reveal from "./Reveal";
import type { Portfolio } from "@/lib/schema";
import styles from "./Projects.module.css";

function TiltCard({
  project,
  delay,
}: {
  project: Portfolio["projects"][number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const inner = (
    <>
      <div
        className={styles.glare}
        style={{ ["--glare-color" as string]: project.accent }}
        aria-hidden
      />
      <header className={styles.cardTop}>
        <span
          className={styles.cardIndex}
          style={{ color: project.accent }}
        >
          {project.index}
        </span>
        {project.linkLabel && (
          <span className={styles.cardLink}>
            {project.linkLabel} <span aria-hidden>↗</span>
          </span>
        )}
      </header>
      <h3 className={styles.cardName}>{project.name}</h3>
      <p className={styles.cardDesc}>{project.description}</p>
      <ul className={styles.cardStack}>
        {project.stack.map((s) => (
          <li key={s} style={{ borderColor: `${project.accent}33` }}>
            {s}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className={styles.tilt}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label={`${project.name} — opens ${project.linkLabel} in a new tab`}
          >
            {inner}
          </a>
        ) : (
          <div className={styles.card}>{inner}</div>
        )}
      </div>
    </Reveal>
  );
}

export default function Projects({
  projects,
}: {
  projects: Portfolio["projects"];
}) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <span className="kicker">Selected work</span>
          <h2 className="section-title">
            Built, shipped, <span className={styles.accent}>live</span>
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <TiltCard key={p.name} project={p} delay={0.07 * (i % 3)} />
          ))}
        </div>
      </div>
    </section>
  );
}
