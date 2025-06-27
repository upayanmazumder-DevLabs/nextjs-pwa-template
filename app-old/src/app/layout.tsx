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

export const metadata: Metadata = {
  title: "Next.js PWA Template",
  description:
    "A modern PWA template built with Next.js, featuring best practices and customizability.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nextjs-pwa-template.upayan.dev"
  ),
  openGraph: {
    images: [
      {
        url: "/icons/icon-512x512.webp",
        width: 512,
        height: 512,
        alt: "App Icon",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/icons/icon-512x512.webp",
        width: 512,
        height: 512,
        alt: "App Icon",
      },
    ],
  },
};

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
