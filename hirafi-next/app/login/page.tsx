"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/LangContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to API route /api/auth/login
    console.log("Login:", { email, password });
    router.push("/");
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
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-[hsl(220_40%_13%)] font-bold text-xl">H</span>
              </div>
              <span className="text-[hsl(220_40%_13%)] font-bold text-2xl">Hirafi</span>
            </Link>
            <h1 className="text-2xl font-bold text-[hsl(220_40%_13%)]">{t("login_welcome")}</h1>
            <p className="text-[hsl(220_10%_46%)] mt-2">{t("login_subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[hsl(220_40%_13%)]">
                {t("login_email")}
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-semibold text-[hsl(220_40%_13%)]">
                  {t("login_password")}
                </label>
                <Link href="#" className="text-xs text-[hsl(40_75%_50%)] hover:underline">
                  {t("login_forgot")}
                </Link>
              </div>
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
              className="w-full h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold text-lg mt-4 hover:opacity-90 transition-opacity shadow-gold"
            >
              {t("login_btn")}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[hsl(220_15%_88%)]">
            <p className="text-sm text-[hsl(220_10%_46%)]">
              {t("login_no_account")}{" "}
              <Link href="/register" className="text-[hsl(40_75%_50%)] font-bold hover:underline">
                {t("login_register_link")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
