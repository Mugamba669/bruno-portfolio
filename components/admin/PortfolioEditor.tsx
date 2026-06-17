"use client";

import type { Portfolio } from "@/lib/schema";

export function PortfolioEditor({ initial }: { initial: Portfolio }) {
  return (
    <pre className="overflow-auto rounded-md border bg-background p-4 text-xs">
      {JSON.stringify(initial, null, 2)}
    </pre>
  );
}
