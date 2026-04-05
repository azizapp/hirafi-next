"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, UserPlus } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/LangContext";

export default function RegisterPage() {
  const [role, setRole] = useState<"client" | "artisan">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to API route /api/auth/register
    console.log("Register:", { name, email, phone, password, role });
    router.push("/");
  };

  const inputClass =
    "w-full bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none";

  const roles = [
    { id: "client",  labelKey: "register_role_client",  Icon: User },
    { id: "artisan", labelKey: "register_role_artisan", Icon: UserPlus },
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-gold-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-[hsl(220_40%_13%)] font-bold text-xl">H</span>
              </div>
              <span className="text-[hsl(220_40%_13%)] font-bold text-2xl">Hirafi</span>
            </Link>
            <h1 className="text-2xl font-bold text-[hsl(220_40%_13%)]">{t("register_title")}</h1>
            <p className="text-[hsl(220_10%_46%)] mt-2">{t("register_subtitle")}</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {roles.map(({ id, labelKey, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center ${
                  role === id
                    ? "border-[hsl(40_75%_50%)] bg-[hsl(40_75%_50%/0.05)] ring-1 ring-[hsl(40_75%_50%)]"
                    : "border-[hsl(220_15%_88%)] hover:bg-[hsl(215_25%_90%/0.5)]"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[hsl(215_25%_90%)] flex items-center justify-center mx-auto mb-2">
                  <Icon
                    size={20}
                    className={role === id ? "text-[hsl(40_75%_50%)]" : "text-[hsl(220_10%_46%)]"}
                  />
                </div>
                <p
                  className={`text-sm font-bold ${
                    role === id ? "text-[hsl(220_40%_13%)]" : "text-[hsl(220_10%_46%)]"
                  }`}
                >
                  {t(labelKey)}
                </p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[hsl(220_40%_13%)]">{t("register_name")}</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                  <input
                    type="text"
                    placeholder={t("register_name_placeholder")}
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[hsl(220_40%_13%)]">{t("register_phone")}</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                  <input
                    type="tel"
                    placeholder="+213"
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[hsl(220_40%_13%)]">{t("register_email")}</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[hsl(220_40%_13%)]">{t("register_password")}</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
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
              {t("register_btn")}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[hsl(220_15%_88%)]">
            <p className="text-sm text-[hsl(220_10%_46%)]">
              {t("register_has_account")}{" "}
              <Link href="/login" className="text-[hsl(40_75%_50%)] font-bold hover:underline">
                {t("register_login_link")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
