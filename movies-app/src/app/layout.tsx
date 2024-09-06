import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head"; // Importando o Head do Next.js

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Já vi esse filme?",
  description: "Gerencie seus filmes e séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Já vi esse filme?</title>
        <meta name="description" content="Gerencie seus filmes e séries." />
        <meta
          name="keywords"
          content="filmes, séries, gerenciamento, catálogo"
        />
        <meta property="og:title" content="Já vi esse filme?" />
        <meta
          property="og:description"
          content="Gerencie seus filmes e séries."
        />
        <meta property="og:image" content="https://seusite.com/imagem.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
