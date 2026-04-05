"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Search, Star, CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import type { Craftsman } from "@/lib/types";

export default function AdminCraftsmenPage() {
  const { t } = useLang();
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCraftsmen = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/craftsmen");
      if (res.ok) {
        const data = await res.json();
        setCraftsmen(data);
      }
    } catch (error) {
      console.error("Failed to fetch craftsmen:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCraftsmen();
  }, [fetchCraftsmen]);

  const filteredCraftsmen = craftsmen.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleVerified = async (craftsman: Craftsman) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/craftsmen/${craftsman.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !craftsman.verified }),
      });
      if (res.ok) {
        setCraftsmen((prev) =>
          prev.map((c) => (c.id === craftsman.id ? { ...c, verified: !c.verified } : c))
        );
      }
    } catch (error) {
      console.error("Failed to update craftsman:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async (craftsman: Craftsman) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/craftsmen/${craftsman.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !craftsman.featured }),
      });
      if (res.ok) {
        setCraftsmen((prev) =>
          prev.map((c) => (c.id === craftsman.id ? { ...c, featured: !c.featured } : c))
        );
      }
    } catch (error) {
      console.error("Failed to update craftsman:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[hsl(40_75%_50%)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(220_40%_13%)]">
            {t("admin_craftsmen_title")}
          </h1>
          <p className="text-[hsl(220_10%_46%)] mt-1">
            {filteredCraftsmen.length} {t("craftsmen_found")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={20} />
        <input
          type="text"
          placeholder={t("admin_craftsmen_search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
        />
      </div>

      {/* Craftsmen Grid */}
      {filteredCraftsmen.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] p-12 text-center">
          <p className="text-[hsl(220_10%_46%)]">{t("admin_craftsmen_no_results")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredCraftsmen.map((craftsman) => (
            <motion.div
              key={craftsman.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-[hsl(220_40%_13%)] font-bold text-xl">
                    {craftsman.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[hsl(220_40%_13%)]">{craftsman.name}</h3>
                    <p className="text-sm text-[hsl(220_10%_46%)]">{craftsman.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{craftsman.rating}</span>
                      <span className="text-sm text-[hsl(220_10%_46%)]">
                        ({craftsman.reviewCount} {t("profile_reviews")})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[hsl(220_10%_46%)]">
                    <span className="font-medium">{t("admin_craftsmen_location")}:</span>
                    <span>{craftsman.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(220_10%_46%)]">
                    <span className="font-medium">{t("feat_experience")}:</span>
                    <span>{craftsman.experience} {t("craftsmen_experience")}</span>
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-2 mt-4">
                  {craftsman.verified ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                      <CheckCircle size={14} />
                      {t("admin_craftsmen_verified")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium flex items-center gap-1">
                      <XCircle size={14} />
                      غير موثق
                    </span>
                  )}
                  {craftsman.featured && (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium flex items-center gap-1">
                      <Star size={14} />
                      {t("admin_craftsmen_featured")}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[hsl(220_15%_88%)]">
                  <button
                    onClick={() => handleToggleVerified(craftsman)}
                    disabled={actionLoading}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      craftsman.verified
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    } disabled:opacity-50`}
                  >
                    {craftsman.verified ? t("admin_craftsmen_unverify") : t("admin_craftsmen_verify")}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(craftsman)}
                    disabled={actionLoading}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      craftsman.featured
                        ? "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                    } disabled:opacity-50`}
                  >
                    {craftsman.featured ? t("admin_craftsmen_unfeature") : t("admin_craftsmen_feature")}
                  </button>
                  <Link
                    href={`/craftsman/${craftsman.id}`}
                    className="p-2 rounded-lg bg-[hsl(215_25%_90%)] hover:bg-[hsl(215_25%_85%)] transition-colors"
                    title={t("craftsmen_view_profile")}
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
