"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  const footerCategories = [
    t("cat_electrician"),
    t("cat_plumber"),
    t("cat_carpenter"),
    t("cat_painter"),
    t("cat_hvac"),
  ];

  return (
    <footer className="bg-gradient-navy text-white/70 py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-[hsl(220_40%_13%)] font-bold">H</span>
              </div>
              <span className="text-white font-bold text-lg">Hirafi</span>
            </div>
            <p className="text-sm leading-relaxed">{t("footer_desc")}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer_links")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"          className="hover:text-[hsl(40_75%_50%)] transition-colors">{t("nav_home")}</Link></li>
              <li><Link href="/craftsmen" className="hover:text-[hsl(40_75%_50%)] transition-colors">{t("nav_craftsmen")}</Link></li>
              <li><Link href="/about"     className="hover:text-[hsl(40_75%_50%)] transition-colors">{t("nav_about")}</Link></li>
              <li><Link href="/login"     className="hover:text-[hsl(40_75%_50%)] transition-colors">{t("nav_login")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer_categories")}</h4>
            <ul className="space-y-2 text-sm">
              {footerCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/craftsmen?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[hsl(40_75%_50%)] transition-colors cursor-pointer"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer_contact")}</h4>
            <ul className="space-y-2 text-sm">
              <li>info@hirafi.dz</li>
              <li>+213 555 123 456</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm">
          <p>{t("footer_copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
