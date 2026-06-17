import "./admin.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const SECTIONS = [
  { href: "#profile", label: "Profile" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stats", label: "Stats" },
  { href: "#seo", label: "SEO" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <div className="mx-auto flex max-w-6xl gap-8 p-6">
        <aside className="sticky top-6 hidden h-fit w-48 shrink-0 flex-col gap-1 md:flex">
          <div className="mb-3 text-sm font-semibold">Portfolio CMS</div>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground">
              {s.label}
            </Link>
          ))}
          <form action="/api/admin/logout" method="post" className="mt-4">
            <button className="w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-background">
              Log out
            </button>
          </form>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
