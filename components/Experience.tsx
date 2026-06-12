import Reveal from "./Reveal";
import { experience } from "@/lib/data";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <span className="kicker">Experience</span>
          <h2 className="section-title">Where I&apos;ve shipped</h2>
        </Reveal>

        <ol className={styles.timeline}>
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`}>
              <Reveal delay={0.08 * Math.min(i, 3)}>
                <article className={styles.entry}>
                  <div className={styles.meta}>
                    <span className={styles.period}>{job.period}</span>
                    <span className={styles.place}>{job.place}</span>
                  </div>
                  <div className={styles.dotCol} aria-hidden>
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.role}>{job.role}</h3>
                    <p className={styles.company}>{job.company}</p>
                    <ul className={styles.points}>
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
