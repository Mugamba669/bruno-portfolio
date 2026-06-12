import Reveal from "./Reveal";
import { skills } from "@/lib/data";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <span className="kicker">Stack</span>
          <h2 className="section-title">Tools of the trade</h2>
        </Reveal>

        <div className={styles.grid}>
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={0.08 * (i % 3)}>
              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <span className={styles.cardIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.cardTitle}>{group.group}</h3>
                </header>
                <ul className={styles.chips}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.chip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
