import { getPortfolio } from "@/lib/portfolio";
import { PortfolioEditor } from "@/components/admin/PortfolioEditor";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const data = await getPortfolio();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Edit portfolio</h1>
      <PortfolioEditor initial={data} />
    </div>
  );
}
