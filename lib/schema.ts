import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  role: z.string().min(1),
  tagline: z.string(),
  location: z.string(),
  email: z.email(),
  phone: z.string(),
  github: z.url(),
  site: z.url(),
  summary: z.string(),
  education: z.string(),
});

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  items: z.array(z.string().min(1)),
});

export const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  place: z.string(),
  period: z.string(),
  points: z.array(z.string().min(1)),
});

export const projectSchema = z.object({
  index: z.string().min(1),
  name: z.string().min(1),
  stack: z.array(z.string().min(1)),
  description: z.string(),
  link: z.url().nullable(),
  linkLabel: z.string().nullable(),
  accent: z.string(),
});

export const statSchema = z.object({ value: z.string(), label: z.string() });

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string().min(1)),
});

export const portfolioSchema = z.object({
  profile: profileSchema,
  skills: z.array(skillGroupSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  stats: z.array(statSchema),
  seo: seoSchema,
});

export type Portfolio = z.infer<typeof portfolioSchema>;
