"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Portfolio } from "@/lib/schema";

export function useSavePortfolio() {
  const [saving, setSaving] = useState(false);
  async function save(data: Portfolio) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Save failed");
      }
      toast.success("Saved. The public site will update shortly.");
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  }
  return { save, saving };
}
