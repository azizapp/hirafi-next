"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Wrench,
  FolderTree,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, labelKey: "admin_nav_dashboard" },
  { href: "/admin/users", icon: Users, labelKey: "admin_nav_users" },
  { href: "/admin/craftsmen", icon: Wrench, labelKey: "admin_nav_craftsmen" },
  { href: "/admin/categories", icon: FolderTree, labelKey: "admin_nav_categories" },
  { href: "/admin/messages", icon: MessageSquare, labelKey: "admin_nav_messages" },
  { href: "/admin/settings", icon: Settings, labelKey: "admin_nav_settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useLang();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[hsl(215_80%_27%)] text-white shadow-lg"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-navy text-white z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-[hsl(220_40%_13%)] font-bold text-xl">H</span>
              </div>
              <div>
                <span className="font-bold text-xl">Hirafi</span>
                <span className="block text-xs text-white/60">{t("admin_dashboard")}</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${active
                      ? "bg-[hsl(40_75%_50%)] text-[hsl(220_40%_13%)] font-semibold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{t(item.labelKey as any)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <ExternalLink size={20} />
              <span>{t("admin_nav_back_site")}</span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={20} />
              <span>{t("admin_nav_logout")}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
