"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden>◆</span>
            bruno<span className={styles.logoDot}>.</span>mh
          </a>

          <nav className={styles.links} aria-label="Primary">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className={styles.link}>
                <span className={styles.linkIndex}>0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={styles.cta}>
            Available for work
            <span className={styles.pulse} aria-hidden />
          </a>

          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className={styles.overlayLinks} aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className={styles.overlayLink}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.overlayIndex}>0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className={styles.overlayFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="mono-label">Kampala, Uganda</span>
              <a href="mailto:brunohectre@gmail.com">brunohectre@gmail.com</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
