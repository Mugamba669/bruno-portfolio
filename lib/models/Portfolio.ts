import mongoose, { Schema, model, models } from "mongoose";

const SkillGroup = new Schema(
  { group: { type: String, required: true }, items: { type: [String], default: [] } },
  { _id: false }
);
const Experience = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    place: String,
    period: String,
    points: { type: [String], default: [] },
  },
  { _id: false }
);
const Project = new Schema(
  {
    index: { type: String, required: true },
    name: { type: String, required: true },
    stack: { type: [String], default: [] },
    description: String,
    link: { type: String, default: null },
    linkLabel: { type: String, default: null },
    accent: String,
  },
  { _id: false }
);
const Stat = new Schema({ value: String, label: String }, { _id: false });
const Profile = new Schema(
  {
    name: String, shortName: String, role: String, tagline: String, location: String,
    email: String, phone: String, github: String, site: String, summary: String, education: String,
  },
  { _id: false }
);
const Seo = new Schema(
  { title: String, description: String, keywords: { type: [String], default: [] } },
  { _id: false }
);

const PortfolioSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    profile: { type: Profile, required: true },
    skills: { type: [SkillGroup], default: [] },
    experience: { type: [Experience], default: [] },
    projects: { type: [Project], default: [] },
    stats: { type: [Stat], default: [] },
    seo: { type: Seo, required: true },
  },
  { timestamps: true }
);

export type PortfolioDoc = mongoose.InferSchemaType<typeof PortfolioSchema>;
export const PortfolioModel =
  models.Portfolio || model("Portfolio", PortfolioSchema);
