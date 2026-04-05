"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t, toggleLang, locale } = useLang();

  const navLinks = [
    { href: "/",           label: t("nav_home") },
    { href: "/craftsmen",  label: t("nav_craftsmen") },
    { href: "/about",      label: t("nav_about") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-navy border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
            <span className="text-[hsl(220_40%_13%)] font-bold text-lg">H</span>
          </div>
          <span className="text-white font-bold text-xl">Hirafi</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[hsl(40_75%_50%)]"
                  : "text-white/80 hover:text-[hsl(40_75%_50%)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Switch language"
          >
            <Globe size={16} />
            <span>{t("lang_switch")}</span>
          </button>

          <Link
            href="/login"
            className="h-9 px-4 rounded-md text-sm font-semibold border-2 border-[hsl(40_75%_50%)] text-[hsl(40_75%_50%)] hover:bg-[hsl(40_75%_50%/0.1)] transition-colors"
          >
            {t("nav_login")}
          </Link>
          <Link
            href="/register"
            className="h-9 px-4 rounded-md text-sm font-semibold bg-gradient-gold text-[hsl(220_40%_13%)] hover:opacity-90 transition-opacity shadow-gold"
          >
            {t("nav_register")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t("nav_menu")}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[hsl(215_85%_18%)] border-t border-white/10 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/80 hover:text-[hsl(40_75%_50%)] py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              href="/login"
              className="flex-1 text-center py-2 rounded-md border-2 border-[hsl(40_75%_50%)] text-[hsl(40_75%_50%)] text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav_login")}
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center py-2 rounded-md bg-gradient-gold text-[hsl(220_40%_13%)] text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav_register")}
            </Link>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <Globe size={15} />
            {t("lang_switch")}
          </button>
        </div>
      )}
    </nav>
  );
}
