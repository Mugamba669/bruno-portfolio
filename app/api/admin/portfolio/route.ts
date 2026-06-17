import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { portfolioSchema } from "@/lib/schema";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = portfolioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  try {
    const saved = await savePortfolio(parsed.data);
    revalidatePath("/");
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json(
      { error: "Database unavailable. Check MONGODB_URI credentials." },
      { status: 503 }
    );
  }
}
