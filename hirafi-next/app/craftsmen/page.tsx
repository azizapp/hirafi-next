"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { craftsmen } from "@/lib/data";
import { useLang } from "@/context/LangContext";

const categoryKeys = [
  "cat_electrician",
  "cat_plumber",
  "cat_carpenter",
  "cat_painter",
  "cat_builder",
  "cat_blacksmith",
  "cat_hvac",
  "cat_tiler",
] as const;

function CraftsmenContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLang();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const handleFilter = (newSearch: string, newCat: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newCat !== "all") params.set("category", newCat);
    router.push(`/craftsmen${params.toString() ? "?" + params.toString() : ""}`);
  };

  // Build translated category list for the dropdown
  const translatedCategories = categoryKeys.map((key) => t(key));

  const filtered = craftsmen.filter((c) => {
    const s = searchTerm.toLowerCase();
    const matchSearch =
      !s ||
      c.name.toLowerCase().includes(s) ||
      c.specialty.toLowerCase().includes(s) ||
      c.location.toLowerCase().includes(s);
    const matchCat = selectedCategory === "all" || c.specialty === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[hsl(220_20%_97%)]">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-navy py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t("craftsmen_title")}</h1>
          <p className="text-white/70 mb-8">{t("craftsmen_subtitle")}</p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={20} />
              <input
                type="text"
                placeholder={t("craftsmen_search_placeholder")}
                className="w-full bg-white h-12 pr-10 pl-4 rounded-xl text-[hsl(220_40%_13%)] outline-none focus:ring-2 focus:ring-[hsl(40_75%_50%)]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilter(e.target.value, selectedCategory);
                }}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="h-12 px-4 rounded-xl bg-white text-[hsl(220_40%_13%)] text-sm outline-none focus:ring-2 focus:ring-[hsl(40_75%_50%)]"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleFilter(searchTerm, e.target.value);
                }}
              >
                <option value="all">{t("craftsmen_all_categories")}</option>
                {translatedCategories.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[hsl(220_10%_46%)]">
            <span className="font-bold text-[hsl(220_40%_13%)]">{filtered.length}</span>{" "}
            {t("craftsmen_found")}
          </p>
          <button className="flex items-center gap-2 h-9 px-4 rounded-md border border-[hsl(220_15%_88%)] text-sm text-[hsl(220_40%_13%)] hover:bg-[hsl(220_15%_93%)] transition-colors">
            <Filter size={16} />
            {t("craftsmen_advanced_filter")}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[hsl(220_15%_88%)] overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center text-2xl font-bold text-[hsl(220_40%_13%)] shadow-gold">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 bg-[hsl(40_75%_50%/0.1)] px-2 py-1 rounded-full">
                    <Star className="text-[hsl(40_75%_50%)] fill-[hsl(40_75%_50%)]" size={14} />
                    <span className="text-xs font-bold text-[hsl(40_70%_38%)]">{c.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[hsl(220_40%_13%)] mb-1 group-hover:text-[hsl(40_70%_38%)] transition-colors">
                  {c.name}
                </h3>
                <p className="text-[hsl(40_75%_50%)] font-semibold text-sm mb-4">{c.specialty}</p>

                <div className="flex items-center gap-2 text-sm text-[hsl(220_10%_46%)] mb-6">
                  <MapPin size={16} />
                  <span>{c.location}</span>
                </div>

                <div className="pt-4 border-t border-[hsl(220_15%_88%)] flex items-center justify-between">
                  <div className="text-xs text-[hsl(220_10%_46%)]">
                    <span className="font-bold text-[hsl(220_40%_13%)]">{c.experience}</span>{" "}
                    {t("craftsmen_experience")}
                  </div>
                  <Link
                    href={`/craftsman/${c.id}`}
                    className="h-9 px-4 rounded-md border border-[hsl(220_15%_88%)] text-sm font-medium text-[hsl(220_40%_13%)] hover:bg-[hsl(220_15%_93%)] transition-colors"
                  >
                    {t("craftsmen_view_profile")}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[hsl(220_10%_46%)] text-lg mb-4">{t("craftsmen_no_results")}</p>
            <button
              onClick={() => handleFilter("", "all")}
              className="text-[hsl(40_75%_50%)] hover:underline font-medium"
            >
              {t("craftsmen_clear_filters")}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function CraftsmenPage() {
  const { t } = useLang();
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">{t("craftsmen_loading")}</div>}>
      <CraftsmenContent />
    </Suspense>
  );
}
