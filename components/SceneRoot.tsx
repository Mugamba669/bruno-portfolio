"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./SceneRoot.module.css";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const CHAPTERS = [
  { num: "00", title: "Signal", note: "every product starts as noise" },
  { num: "01", title: "Foundations", note: "ui · api · infra" },
  { num: "02", title: "The Lattice", note: "tools in order" },
  { num: "03", title: "The Climb", note: "five years of shipping" },
  { num: "04", title: "Constellation", note: "six systems live" },
  { num: "05", title: "The Beacon", note: "signal found — say hello" },
];

const SECTION_IDS = ["about", "skills", "experience", "projects", "contact"];

function ChapterHUD() {
  const [chapter, setChapter] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY + window.innerHeight * 0.55;
      let c = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && s >= el.offsetTop) c = i + 1;
      }
      setChapter(c);
      setHidden(
        window.scrollY < window.innerHeight * 0.45 ||
          window.scrollY + window.innerHeight > document.body.scrollHeight - 130
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ch = CHAPTERS[chapter];

  return (
    <div
      className={`${styles.hud} ${hidden ? styles.hudHidden : ""}`}
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={ch.num}
          className={styles.hudInner}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.hudNum}>CH.{ch.num}</span>
          <span className={styles.hudTitle}>{ch.title}</span>
          <span className={styles.hudNote}>{ch.note}</span>
        </motion.div>
      </AnimatePresence>
      <div className={styles.hudTrack}>
        {CHAPTERS.map((c, i) => (
          <span
            key={c.num}
            className={`${styles.hudTick} ${i <= chapter ? styles.hudTickOn : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SceneRoot() {
  return (
    <>
      <div className={styles.canvas} aria-hidden>
        <Scene />
      </div>
      <ChapterHUD />
    </>
  );
}
