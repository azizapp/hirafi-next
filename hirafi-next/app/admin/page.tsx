"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { Users, Wrench, FolderTree, Star, Clock, UserPlus, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  href?: string;
}

function StatCard({ title, value, icon: Icon, color, href }: StatCardProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(220_15%_88%)] hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[hsl(220_10%_46%)]">{title}</p>
          <p className="text-3xl font-bold text-[hsl(220_40%_13%)] mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

interface DashboardStats {
  totalUsers: number;
  totalCraftsmen: number;
  totalCategories: number;
  totalReviews: number;
  pendingVerifications: number;
  newUsersThisMonth: number;
}

export default function AdminDashboardPage() {
  const { t } = useLang();
  const { admin } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[hsl(40_75%_50%)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(220_40%_13%)]">
            {t("admin_dashboard")}
          </h1>
          <p className="text-[hsl(220_10%_46%)] mt-1">
            {t("admin_welcome")}, {admin?.name}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard
          title={t("admin_total_users")}
          value={stats?.totalUsers ?? 0}
          icon={Users}
          color="bg-blue-100 text-blue-600"
          href="/admin/users"
        />
        <StatCard
          title={t("admin_total_craftsmen")}
          value={stats?.totalCraftsmen ?? 0}
          icon={Wrench}
          color="bg-green-100 text-green-600"
          href="/admin/craftsmen"
        />
        <StatCard
          title={t("admin_total_categories")}
          value={stats?.totalCategories ?? 0}
          icon={FolderTree}
          color="bg-purple-100 text-purple-600"
          href="/admin/categories"
        />
        <StatCard
          title={t("admin_total_reviews")}
          value={stats?.totalReviews ?? 0}
          icon={Star}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title={t("admin_pending_verifications")}
          value={stats?.pendingVerifications ?? 0}
          icon={Clock}
          color="bg-orange-100 text-orange-600"
          href="/admin/craftsmen"
        />
        <StatCard
          title={t("admin_new_users")}
          value={stats?.newUsersThisMonth ?? 0}
          icon={UserPlus}
          color="bg-teal-100 text-teal-600"
          href="/admin/users"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(220_15%_88%)]">
        <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] mb-4">{t("admin_quick_actions")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] hover:bg-[hsl(215_25%_85%)] transition-colors"
          >
            <Users className="text-[hsl(215_80%_27%)]" size={20} />
            <span className="text-sm font-medium text-[hsl(220_40%_13%)]">{t("admin_nav_users")}</span>
          </Link>
          <Link
            href="/admin/craftsmen"
            className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] hover:bg-[hsl(215_25%_85%)] transition-colors"
          >
            <Wrench className="text-[hsl(215_80%_27%)]" size={20} />
            <span className="text-sm font-medium text-[hsl(220_40%_13%)]">{t("admin_nav_craftsmen")}</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] hover:bg-[hsl(215_25%_85%)] transition-colors"
          >
            <FolderTree className="text-[hsl(215_80%_27%)]" size={20} />
            <span className="text-sm font-medium text-[hsl(220_40%_13%)]">{t("admin_nav_categories")}</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] hover:bg-[hsl(215_25%_85%)] transition-colors"
          >
            <TrendingUp className="text-[hsl(215_80%_27%)]" size={20} />
            <span className="text-sm font-medium text-[hsl(220_40%_13%)]">{t("admin_nav_messages")}</span>
          </Link>
        </div>
      </div>

      {/* Pending Actions Alert */}
      {stats && stats.pendingVerifications > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-200 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-orange-100">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-orange-800">
                {stats.pendingVerifications} {t("admin_pending_verifications")}
              </h3>
              <p className="text-orange-700 text-sm mt-1">
                There are craftsmen waiting for verification. Review and approve them to make them visible on the platform.
              </p>
              <Link
                href="/admin/craftsmen?filter=pending"
                className="inline-block mt-3 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                Review Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
