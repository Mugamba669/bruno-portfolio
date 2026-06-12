import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bruno M.H. — Senior Software Engineer",
  description:
    "Mugamba Bruno M.H. — Senior software engineer in Kampala building production systems across web, mobile, and server infrastructure. Full-Stack · Mobile · DevOps.",
  keywords: [
    "software engineer",
    "full-stack",
    "Flutter",
    "NestJS",
    "Laravel",
    "DevOps",
    "Kampala",
    "Uganda",
  ],
  openGraph: {
    title: "Bruno M.H. — Senior Software Engineer",
    description:
      "Building production systems across web, mobile, and server infrastructure.",
    type: "website",
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
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
