import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  title: "Orbitex — Software, Web & Growth",
  description: "A premium software, web, and marketing agency founded by Ayan Mathur.",
  icons: {
    icon: [
      { url: "/branding/favicon/favicon.ico" },
      { url: "/branding/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/branding/favicon/apple-touch-icon.png" },
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
      <body className="antialiased bg-ivory text-near-black">
        <div className="division-hub">
          {children}
        </div>
      </body>
    </html>
  );
}
