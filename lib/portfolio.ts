import "server-only";
import { connectToDatabase } from "@/lib/mongoose";
import { PortfolioModel } from "@/lib/models/Portfolio";
import { portfolioSchema, type Portfolio } from "@/lib/schema";
import { defaultPortfolio } from "@/lib/data";

/**
 * Reads the singleton portfolio document. Seeds it from defaults on first run.
 * Falls back to the in-code default if the DB is unreachable so builds/SSR never
 * hard-fail (e.g. when MONGODB_URI is absent at build time).
 */
export async function getPortfolio(): Promise<Portfolio> {
  try {
    await connectToDatabase();
    let doc: unknown = await PortfolioModel.findOne({ key: "default" }).lean();
    if (!doc) {
      await PortfolioModel.create({ key: "default", ...defaultPortfolio });
      doc = await PortfolioModel.findOne({ key: "default" }).lean();
    }
    const parsed = portfolioSchema.safeParse(doc);
    return parsed.success ? parsed.data : defaultPortfolio;
  } catch {
    return defaultPortfolio;
  }
}

export async function savePortfolio(data: Portfolio): Promise<Portfolio> {
  await connectToDatabase();
  const updated = await PortfolioModel.findOneAndUpdate(
    { key: "default" },
    { $set: { ...data } },
    { upsert: true, new: true }
  ).lean();
  return portfolioSchema.parse(updated);
}
