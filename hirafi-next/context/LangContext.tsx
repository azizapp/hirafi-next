"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n";

interface LangContextType {
  locale: Locale;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr"); // French is default

  // Sync direction, lang attribute, and font on root html element
  useEffect(() => {
    const html = document.documentElement;
    if (locale === "ar") {
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
      document.body.style.fontFamily = '"Amiri", serif';
    } else {
      html.setAttribute("lang", "fr");
      html.setAttribute("dir", "ltr");
      document.body.style.fontFamily = '"Roboto", sans-serif';
    }
  }, [locale]);

  const t = (key: TranslationKey): string => translations[locale][key];

  const toggleLang = () =>
    setLocale((prev) => (prev === "fr" ? "ar" : "fr"));

  return (
    <LangContext.Provider value={{ locale, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
