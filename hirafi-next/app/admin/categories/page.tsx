"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Plus, Edit2, Trash2, X, Zap, Wrench, Hammer, Paintbrush, Building2, Shield, Wind, LayoutGrid } from "lucide-react";
import type { Category } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Building2,
  Shield,
  Wind,
  LayoutGrid,
};

export default function AdminCategoriesPage() {
  const { t } = useLang();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", icon: "Zap" });

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, icon: category.icon });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", icon: "Zap" });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setActionLoading(true);
    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingCategory) {
          setCategories((prev) =>
            prev.map((c) => (c.id === editingCategory.id ? saved : c))
          );
        } else {
          setCategories((prev) => [...prev, saved]);
        }
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to save category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(t("admin_categories_confirm_delete"))) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== category.id));
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
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
            {t("admin_categories_title")}
          </h1>
          <p className="text-[hsl(220_10%_46%)] mt-1">
            {categories.length} {t("cat_craftsman")}
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-gold text-[hsl(220_40%_13%)] font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-gold"
        >
          <Plus size={20} />
          {t("admin_categories_add")}
        </button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] p-12 text-center">
          <p className="text-[hsl(220_10%_46%)]">{t("admin_categories_no_results")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || LayoutGrid;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[hsl(215_25%_90%)]">
                    <Icon size={24} className="text-[hsl(215_80%_27%)]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal(category)}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      title={t("admin_categories_edit")}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      disabled={actionLoading}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title={t("admin_categories_delete")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-[hsl(220_40%_13%)] mb-1">{category.name}</h3>
                <p className="text-sm text-[hsl(220_10%_46%)]">
                  {category.count} {t("cat_craftsman")}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[hsl(220_15%_88%)]">
              <h2 className="text-lg font-bold text-[hsl(220_40%_13%)]">
                {editingCategory ? t("admin_categories_edit") : t("admin_categories_add")}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-[hsl(215_25%_90%)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(220_40%_13%)] mb-2">
                  {t("admin_categories_name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  placeholder="اسم التصنيف"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(220_40%_13%)] mb-2">
                  {t("admin_categories_icon")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(iconMap).map(([name, IconComponent]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, icon: name }))}
                      className={`p-3 rounded-xl border-2 transition-colors ${
                        formData.icon === name
                          ? "border-[hsl(40_75%_50%)] bg-[hsl(40_75%_50%/0.1)]"
                          : "border-[hsl(220_15%_88%)] hover:border-[hsl(220_15%_70%)]"
                      }`}
                    >
                      <IconComponent size={24} className="mx-auto text-[hsl(215_80%_27%)]" />
                    </button>
                  ))}
                </div>
              </div>
            </form>
            <div className="flex gap-3 p-6 border-t border-[hsl(220_15%_88%)]">
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="flex-1 h-12 rounded-xl border border-[hsl(220_15%_88%)] text-[hsl(220_40%_13%)] font-medium hover:bg-[hsl(215_25%_95%)] transition-colors"
              >
                {t("admin_cancel")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={actionLoading || !formData.name.trim()}
                className="flex-1 h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold hover:opacity-90 transition-opacity shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? t("admin_loading") : t("admin_save")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
