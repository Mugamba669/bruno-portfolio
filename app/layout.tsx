import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import { PersonStructuredData } from "@/components/StructuredData";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = profile.site;
const TITLE = `${profile.name} — Software Engineer & Technical Lead in Kampala`;
const DESCRIPTION =
  "Mugamba Bruno M.H. is a senior software engineer & technical lead in Kampala, Uganda — building full-stack web, Flutter mobile apps and DevOps infrastructure with TypeScript, NestJS, Laravel, Go and C++.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${profile.shortName}`,
  },
  description: DESCRIPTION,
  applicationName: `${profile.shortName} — Portfolio`,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: [
    "Mugamba Bruno",
    "Bruno M.H.",
    "Mugamba Bruno software engineer",
    "software engineer",
    "software engineer Kampala",
    "software engineer Uganda",
    "full-stack developer",
    "full-stack developer Kampala",
    "Flutter developer",
    "Flutter developer Uganda",
    "technical lead",
    "DevOps engineer",
    "Next.js developer",
    "NestJS",
    "Laravel",
    "TypeScript",
    "Go",
    "C++",
    "Kampala",
    "Uganda",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    firstName: "Mugamba",
    lastName: "Bruno",
    username: "Mugamba669",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body className="grain">
        <PersonStructuredData />
        {children}
      </body>
    </html>
  );
}
