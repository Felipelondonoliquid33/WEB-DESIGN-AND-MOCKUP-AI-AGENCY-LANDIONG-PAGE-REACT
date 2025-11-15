import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "App Development Agency - AI-Powered Development & Deployment",
  description:
    "Transform your ideas into powerful applications with our AI-powered app development, MCP development, and deployment services. Build faster, ship smarter.",
  keywords: [
    "app development",
    "MCP development",
    "deployment services",
    "AI-powered development",
    "web applications",
    "mobile apps",
    "React development",
    "Next.js development",
    "full-stack development",
  ],
  authors: [{ name: "DevAgency" }],
  creator: "DevAgency",
  publisher: "DevAgency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "App Development Agency - AI-Powered Development & Deployment",
    description:
      "Transform your ideas into powerful applications with our AI-powered app development, MCP development, and deployment services.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "DevAgency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Development Agency - AI-Powered Development & Deployment",
    description:
      "Transform your ideas into powerful applications with our AI-powered app development, MCP development, and deployment services.",
    creator: "@devagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}
        style={{
          "--font-body": inter.style.fontFamily,
          "--font-display": spaceGrotesk.style.fontFamily,
          "--font-mono": jetbrainsMono.style.fontFamily,
        } as React.CSSProperties}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

