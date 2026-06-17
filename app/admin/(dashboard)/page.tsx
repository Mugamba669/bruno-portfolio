import { getPortfolio } from "@/lib/portfolio";
import { PortfolioEditor } from "@/components/admin/PortfolioEditor";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const data = await getPortfolio();
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Edit portfolio</h1>
        <p className="text-sm text-muted-foreground">
          Changes publish to your live site moments after you save each section.
        </p>
      </header>
      <PortfolioEditor initial={data} />
    </div>
  );
}
