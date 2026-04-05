"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { t } = useLang();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/craftsmen?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/craftsmen");
    }
  };

  const quickTags = [
    t("hero_tag_1"),
    t("hero_tag_2"),
    t("hero_tag_3"),
    t("hero_tag_4"),
    t("hero_tag_5"),
  ];

  return (
    <section className="relative bg-gradient-navy overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[hsl(40_75%_50%)] blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[hsl(40_80%_70%)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[hsl(40_75%_50%/0.3)] bg-[hsl(40_75%_50%/0.1)]">
            <span className="text-[hsl(40_75%_50%)] text-sm font-medium">{t("hero_badge")}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t("hero_title_1")}{" "}
            <span className="text-gradient-gold">{t("hero_title_2")}</span>
            <br />
            {t("hero_title_3")}
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            {t("hero_subtitle")}
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10"
          >
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                placeholder={t("hero_placeholder")}
                className="w-full bg-white rounded-xl h-12 pr-10 pl-4 text-[hsl(220_40%_13%)] placeholder:text-[hsl(220_10%_46%)] outline-none focus:ring-2 focus:ring-[hsl(40_75%_50%)] border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="h-12 px-8 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold text-sm hover:opacity-90 transition-opacity shadow-gold"
            >
              {t("hero_search_btn")}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/craftsmen?category=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70 hover:bg-[hsl(40_75%_50%/0.2)] hover:text-[hsl(40_75%_50%)] cursor-pointer transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z"
            fill="hsl(220 20% 97%)"
          />
        </svg>
      </div>
    </section>
  );
}
