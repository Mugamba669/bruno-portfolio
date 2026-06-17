import type { Portfolio } from "@/lib/schema";

export const profile = {
  name: "Mugamba Bruno M.H.",
  shortName: "Bruno M.H.",
  role: "Senior Software Engineer",
  tagline: "Full-Stack · Mobile · DevOps",
  location: "Kampala, Uganda",
  email: "brunohectre@gmail.com",
  phone: "+256 750 482 089",
  github: "https://github.com/Mugamba669",
  site: "https://bruno-mh.netlify.app",
  summary:
    "Software engineer with 5+ years of experience building and shipping production systems across web, mobile, and server infrastructure. Currently Technical Lead at TASY ECOM — driving full-stack product work and managing the underlying DevOps. Comfortable moving between a Flutter UI, a NestJS or Laravel backend, and a hardened Linux VPS. I care about code that is secure, maintainable, and actually reaches users.",
  education: "B.Sc. Software Engineering — Makerere University",
};

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "PHP", "Python", "Go", "Java", "C++"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "Vue.js", "React", "Tailwind CSS", "Inertia"],
  },
  {
    group: "Backend",
    items: ["NestJS", "Laravel", "Express.js", "Node.js"],
  },
  {
    group: "Mobile",
    items: ["Flutter (iOS & Android)", "Native integrations via JNI"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MariaDB / MySQL", "Prisma"],
  },
  {
    group: "DevOps & Infra",
    items: ["Docker & Compose", "Nginx", "PHP-FPM", "UFW", "Virtualmin", "Contabo VPS", "Linux (Ubuntu)", "rclone", "Bash automation"],
  },
  {
    group: "Other",
    items: ["GT06 GPS protocol", "Biometrics", "FCM / OneSignal", "WhatsApp Business API"],
  },
];

export const experience = [
  {
    role: "Software Engineer & Technical Lead",
    company: "TASY ECOM (U) Ltd",
    place: "Kampala, Uganda",
    period: "Current",
    points: [
      "Lead technical direction for the company's e-commerce platform (tasye.com), owning architecture decisions across the Laravel backend and front-end experience.",
      "Manage production infrastructure on Contabo VPS — Nginx, PHP-FPM, MariaDB hardening, automated rclone backups, and security monitoring.",
      "Deliver cross-functional features end-to-end, from database schema through API to the customer-facing UI.",
    ],
  },
  {
    role: "Software Developer",
    company: "Kutunza Mawazo",
    place: "Italy · Remote",
    period: "Apr 2025 — Present",
    points: [
      "Contribute to product development on a remote-first engineering team, working across the stack to ship features on schedule.",
    ],
  },
  {
    role: "Software Developer",
    company: "Baylor Foundation Uganda",
    place: "Mulago, Kampala",
    period: "Jul 2024 — Jan 2025",
    points: [
      "Built the Baylor Careers system in Laravel — job seekers apply online, internal staff shortlist candidates efficiently.",
      "Deployed and maintained internal applications alongside the IT team on the organisation's infrastructure.",
    ],
  },
  {
    role: "Software Developer",
    company: "Malticard Ltd",
    place: "Najjera, Kampala",
    period: "Feb 2023 — Sep 2023",
    points: [
      "Developed and maintained the Malticard access portal across staging and production Docker environments with PostgreSQL and Prisma.",
      "Shipped SkoolTym — an Android app (Play Store) that lets schools manage student drop-offs, pick-ups, and overtime with a tap.",
    ],
  },
  {
    role: "Software Developer",
    company: "Elago Technologies Ltd",
    place: "Nakawa, Kampala",
    period: "Feb 2022 — Dec 2022",
    points: [
      "Debugged and delivered web-based systems to tight deadlines as part of a small, fast-moving team.",
    ],
  },
];

export const projects = [
  {
    index: "01",
    name: "Hype Muzik",
    stack: ["Flutter", "C++ (JNI)", "Express.js"],
    description:
      "Professional-grade music player with a custom C++ audio engine, parametric EQ, hi-res audio support, and Chromaprint/AcoustID song identification.",
    link: "https://play.google.com/store/apps/details?id=x.a.zix",
    linkLabel: "Google Play",
    accent: "#f0b254",
  },
  {
    index: "02",
    name: "GPS Tracking Platform",
    stack: ["Flutter", "NestJS", "PostgreSQL", "GT06"],
    description:
      "End-to-end tracking solution ingesting raw TCP telemetry from SinoTrack 4G devices over the GT06 protocol — live location and history in a Flutter app.",
    link: null,
    linkLabel: null,
    accent: "#7fc8a9",
  },
  {
    index: "03",
    name: "Konnecta",
    stack: ["Flutter", "NestJS"],
    description:
      "Cross-platform consumer app taken through iOS TestFlight external testing review, with a matching NestJS backend deployed on a Contabo VPS.",
    link: "https://konnectaapp.com",
    linkLabel: "konnectaapp.com",
    accent: "#8fb8e8",
  },
  {
    index: "04",
    name: "Planar",
    stack: ["Flutter", "NestJS", "Next.js"],
    description:
      "Personal finance app that helps users track expenses and plan income. Published on Google Play.",
    link: "https://play.google.com/store/apps/details?id=com.app.planar",
    linkLabel: "Google Play",
    accent: "#c9a0e8",
  },
  {
    index: "05",
    name: "Aisiom",
    stack: ["Laravel", "Inertia", "Vue.js", "Tailwind"],
    description:
      "E-learning platform serving live courses and learner dashboards.",
    link: "https://aisiom.com",
    linkLabel: "aisiom.com",
    accent: "#e8927f",
  },
  {
    index: "06",
    name: "COTE",
    stack: ["Next.js", "Tailwind CSS"],
    description:
      "Corporate website with a clean, responsive marketing front-end.",
    link: "https://coteug.com",
    linkLabel: "coteug.com",
    accent: "#d8d2c4",
  },
];

export const stats = [
  { value: "5+", label: "Years shipping production systems" },
  { value: "5+", label: "Apps live on Google Play" },
  { value: "8", label: "Languages across the stack" },
  { value: "∞", label: "Curiosity for hard problems" },
];

export const defaultSeo = {
  title: `${profile.name} — Software Engineer & Technical Lead in Kampala`,
  description:
    "Mugamba Bruno M.H. is a senior software engineer & technical lead in Kampala, Uganda — building full-stack web, Flutter mobile apps and DevOps infrastructure with TypeScript, NestJS, Laravel, Go and C++.",
  keywords: [
    "Mugamba Bruno", "Bruno M.H.", "software engineer", "software engineer Kampala",
    "software engineer Uganda", "full-stack developer", "Flutter developer",
    "technical lead", "DevOps engineer", "Next.js developer", "NestJS", "Laravel",
    "TypeScript", "Go", "Kampala", "Uganda",
  ],
};

export const defaultPortfolio: Portfolio = {
  profile,
  skills: skills.map((s) => ({ group: s.group, items: s.items })),
  experience: experience.map((e) => ({
    role: e.role, company: e.company, place: e.place, period: e.period, points: e.points,
  })),
  projects: projects.map((p) => ({
    index: p.index, name: p.name, stack: p.stack, description: p.description,
    link: p.link, linkLabel: p.linkLabel, accent: p.accent,
  })),
  stats: stats.map((s) => ({ value: s.value, label: s.label })),
  seo: defaultSeo,
};
