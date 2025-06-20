import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister/ServiceWorkerRegister";
import InstallPWA from "../components/InstallPWA/InstallPWA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://nextjs-pwa-template.upayan.dev";
  const ogImageUrl = `${siteUrl}/opengraph-image?text=Next.js%20PWA%20Template&theme=light`;
  const twitterImageUrl = `${siteUrl}/twitter-image?text=Next.js%20PWA%20Template&theme=light`;
  return {
    title: "Next.js PWA Template",
    description:
      "A modern PWA template built with Next.js, featuring best practices and customizability.",
    icons: {
      icon: "/favicon/favicon.ico",
      shortcut: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
    },
    metadataBase: new URL(siteUrl),
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Next.js PWA Template",
        },
      ],
    },
    twitter: {
      images: [
        {
          url: twitterImageUrl,
          width: 1200,
          height: 630,
          alt: "Next.js PWA Template",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="title-bar">
          <span>Next.js PWA</span>
        </div>
        <div id="main-content">{children}</div>
        <ServiceWorkerRegister />
        <InstallPWA />
      </body>
    </html>
  );
}
