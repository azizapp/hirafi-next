"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Search, Edit2, Trash2, UserCheck, UserX, MoreVertical, X } from "lucide-react";
import type { User } from "@/lib/types";

export default function AdminUsersPage() {
  const { t } = useLang();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (user: User) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u))
        );
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(t("admin_users_confirm_delete"))) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: "bg-purple-100 text-purple-700",
      client: "bg-blue-100 text-blue-700",
      artisan: "bg-green-100 text-green-700",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || "bg-gray-100 text-gray-700"}`}>
        {role}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            {t("admin_users_title")}
          </h1>
          <p className="text-[hsl(220_10%_46%)] mt-1">
            {filteredUsers.length} {t("craftsmen_found")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={20} />
        <input
          type="text"
          placeholder={t("admin_users_search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[hsl(215_25%_95%)]">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_name")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_email")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_role")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_status")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_created")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[hsl(220_10%_46%)] uppercase tracking-wider">
                  {t("admin_users_actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(220_15%_88%)]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[hsl(220_10%_46%)]">
                    {t("admin_users_no_results")}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-[hsl(215_25%_97%)] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-[hsl(220_40%_13%)]">{user.name}</div>
                      {user.phone && (
                        <div className="text-sm text-[hsl(220_10%_46%)]">{user.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[hsl(220_10%_46%)]">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? t("admin_users_active") : t("admin_users_inactive")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[hsl(220_10%_46%)]">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          disabled={actionLoading}
                          className={`p-2 rounded-lg transition-colors ${
                            user.isActive
                              ? "text-red-600 hover:bg-red-50"
                              : "text-green-600 hover:bg-green-50"
                          } disabled:opacity-50`}
                          title={user.isActive ? t("admin_users_deactivate") : t("admin_users_activate")}
                        >
                          {user.isActive ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title={t("admin_users_edit")}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={actionLoading}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title={t("admin_users_delete")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[hsl(220_15%_88%)]">
              <h2 className="text-lg font-bold text-[hsl(220_40%_13%)]">{t("admin_users_edit")}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-[hsl(215_25%_90%)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(220_40%_13%)] mb-2">
                  {t("admin_users_name")}
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(220_40%_13%)] mb-2">
                  {t("admin_users_email")}
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(220_40%_13%)] mb-2">
                  {t("admin_users_role")}
                </label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                >
                  <option value="client">Client</option>
                  <option value="artisan">Artisan</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-[hsl(220_15%_88%)]">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 rounded-xl border border-[hsl(220_15%_88%)] text-[hsl(220_40%_13%)] font-medium hover:bg-[hsl(215_25%_95%)] transition-colors"
              >
                {t("admin_cancel")}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold hover:opacity-90 transition-opacity shadow-gold"
              >
                {t("admin_save")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
