import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a),
    bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || typeof password !== "string" || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
