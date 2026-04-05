"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLang();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || t("admin_login_error"));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-gold-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-[hsl(220_40%_13%)] font-bold text-2xl">H</span>
              </div>
              <div>
                <span className="text-white font-bold text-2xl">Hirafi</span>
                <span className="block text-xs text-white/60">Admin Panel</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[hsl(220_40%_13%)]">{t("admin_login_title")}</h1>
            <p className="text-[hsl(220_10%_46%)] mt-2">{t("admin_login_subtitle")}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[hsl(220_40%_13%)]">
                {t("admin_login_email")}
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-[hsl(220_40%_13%)]">
                {t("admin_login_password")}
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold text-lg mt-4 hover:opacity-90 transition-opacity shadow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[hsl(220_40%_13%)] border-t-transparent rounded-full animate-spin" />
                  <span>{t("admin_loading")}</span>
                </>
              ) : (
                t("admin_login_btn")
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
