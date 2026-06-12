"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile, stats } from "@/lib/data";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const anim = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 42 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className={styles.hero} id="top">
      <div className={styles.vignette} aria-hidden />

      <div className={`container ${styles.content}`}>
        <motion.p className={styles.intro} {...anim(0.15)}>
          <span className={styles.introLine} aria-hidden />
          {profile.location} — {profile.tagline}
        </motion.p>

        <h1 className={styles.title}>
          <motion.span className={styles.titleRow} {...anim(0.3)}>
            Engineering
          </motion.span>
          <motion.span className={styles.titleRow} {...anim(0.42)}>
            <em>systems</em> that
          </motion.span>
          <motion.span className={styles.titleRow} {...anim(0.54)}>
            reach users<span className={styles.titleDot}>.</span>
          </motion.span>
        </h1>

        <motion.p className={styles.sub} {...anim(0.7)}>
          I&apos;m <strong>{profile.shortName}</strong> — senior software engineer
          and technical lead. From a Flutter UI to a NestJS or Laravel backend,
          down to a hardened Linux VPS: I ship the whole stack.
        </motion.p>

        <motion.div className={styles.actions} {...anim(0.82)}>
          <a href="#projects" className={styles.primaryBtn}>
            View selected work
            <span aria-hidden>↗</span>
          </a>
          <a href="#contact" className={styles.ghostBtn}>
            Get in touch
          </a>
        </motion.div>

        <motion.dl className={styles.stats} {...anim(0.95)}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statValue}>{s.value}</dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollHint}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-label="Scroll to about section"
      >
        <span className="mono-label">scroll</span>
        <span className={styles.scrollLine} aria-hidden />
      </motion.a>
    </section>
  );
}
