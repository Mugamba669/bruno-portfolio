import type { Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/portfolio";
import { PersonStructuredData } from "@/components/StructuredData";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export async function generateMetadata(): Promise<import("next").Metadata> {
  const { profile, seo } = await getPortfolio();
  const SITE_URL = profile.site;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s — ${profile.shortName}` },
    description: seo.description,
    applicationName: `${profile.shortName} — Portfolio`,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    category: "technology",
    keywords: seo.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      url: SITE_URL,
      siteName: `${profile.name} — Portfolio`,
      title: seo.title,
      description: seo.description,
      locale: "en_US",
      firstName: "Mugamba",
      lastName: "Bruno",
      username: "Mugamba669",
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
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
}

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
