"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(220_20%_97%)]">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-gradient-gold mb-4">404</div>
        <h1 className="text-3xl font-bold text-[hsl(220_40%_13%)] mb-4">{t("not_found_title")}</h1>
        <p className="text-[hsl(220_10%_46%)] mb-8 max-w-md mx-auto">{t("not_found_desc")}</p>
        <Link
          href="/"
          className="inline-block h-12 px-8 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold hover:opacity-90 transition-opacity shadow-gold leading-[3rem]"
        >
          {t("not_found_back")}
        </Link>
      </div>
    </div>
  );
}
