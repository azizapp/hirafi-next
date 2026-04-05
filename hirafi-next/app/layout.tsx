import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

export const metadata: Metadata = {
  title: "Hirafi – Trouvez l'artisan idéal",
  description:
    "Une plateforme de confiance qui vous connecte aux meilleurs artisans agréés de votre région. Qualité garantie et prix compétitifs.",
  keywords: "artisan, électricien, plombier, menuisier, peintre, Algérie, Maroc, Tunisie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Default: French (ltr). LangProvider will update these attributes client-side when switching to Arabic.
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
