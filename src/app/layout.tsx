import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/styles/globals.css";
import RopeScrollbar from "@/components/RopeScrollbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FBF7F0",
};

export const metadata: Metadata = {
  title: "Orbitex — Software, Web & Growth Studio",
  description: "A founder-led technology and marketing studio behind 6 products and 30+ client partnerships.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Orbitex",
  },
  icons: {
    icon: [
      { url: "/branding/favicon/favicon.ico" },
      { url: "/branding/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/branding/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased bg-ivory text-[#2A2416]">
        {children}
        <RopeScrollbar />
      </body>
    </html>
  );
}
