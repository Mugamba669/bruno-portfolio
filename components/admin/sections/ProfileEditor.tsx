"use client";
import type { Portfolio } from "@/lib/schema";
export function ProfileEditor({ data }: { data: Portfolio; onChange: (v: Portfolio["profile"]) => void }) {
  void data; return <div id="stub-profile" />;
}
