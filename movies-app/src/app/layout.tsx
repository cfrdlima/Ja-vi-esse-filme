import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Já vi esse filme?",
  description: "Gerencie seus filmes e series",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json"></link>
      <SpeedInsights />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
