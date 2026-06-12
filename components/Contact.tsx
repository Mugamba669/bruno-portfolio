import Reveal from "./Reveal";
import { profile } from "@/lib/data";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <Reveal>
          <span className="kicker">Contact</span>
          <h2 className={styles.headline}>
            Have a hard problem?
            <br />
            <span className={styles.accent}>Let&apos;s ship it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
            <span className={styles.emailArrow} aria-hidden>↗</span>
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className={styles.channels}>
            <li>
              <span className="mono-label">GitHub</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Mugamba669
              </a>
            </li>
            <li>
              <span className="mono-label">Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                {profile.phone}
              </a>
            </li>
            <li>
              <span className="mono-label">Location</span>
              <span>{profile.location}</span>
            </li>
          </ul>
        </Reveal>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className={styles.footerNote}>
            Designed & engineered with Next.js + Three.js
          </span>
        </div>
      </footer>
    </section>
  );
}
