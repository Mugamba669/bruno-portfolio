import Link from "next/link";

const SECTIONS = [
  { href: "#profile", label: "Profile" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stats", label: "Stats" },
  { href: "#seo", label: "SEO" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
      <aside className="sticky top-10 hidden h-fit w-52 shrink-0 flex-col gap-1 md:flex">
        <div className="mb-5 flex items-center gap-2 px-3">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            Portfolio CMS
          </span>
        </div>
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            {s.label}
          </Link>
        ))}
        <div className="my-3 h-px bg-border" />
        <form action="/api/admin/logout" method="post">
          <button className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
            Log out
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
