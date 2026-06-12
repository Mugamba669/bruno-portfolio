import Reveal from "./Reveal";
import { profile } from "@/lib/data";
import styles from "./About.module.css";

const principles = [
  {
    num: "01",
    title: "Whole-stack ownership",
    body: "Database schema, API contract, UI polish, server hardening — one engineer, one accountable thread from idea to production.",
  },
  {
    num: "02",
    title: "Security is a feature",
    body: "UFW rules, MariaDB hardening, automated rclone backups, monitoring. Systems that survive contact with the real internet.",
  },
  {
    num: "03",
    title: "Ship to real users",
    body: "Three apps on Google Play, platforms through TestFlight review, production e-commerce. Code that isn't deployed doesn't count.",
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <Reveal>
              <span className="kicker">About</span>
              <h2 className="section-title">
                Five years of <br />
                <span className={styles.accent}>production reality</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className={styles.summary}>{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className={styles.education}>
                <span className="mono-label">Education</span>
                {profile.education}
              </p>
            </Reveal>
          </div>

          <div className={styles.right}>
            {principles.map((p, i) => (
              <Reveal key={p.num} delay={0.1 + i * 0.12}>
                <article className={styles.principle}>
                  <span className={styles.principleNum}>{p.num}</span>
                  <div>
                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    <p className={styles.principleBody}>{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
