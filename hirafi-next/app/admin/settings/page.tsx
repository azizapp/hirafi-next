"use client";

import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { Settings as SettingsIcon, User, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const { t } = useLang();
  const { admin } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(220_40%_13%)]">
          {t("admin_nav_settings")}
        </h1>
        <p className="text-[hsl(220_10%_46%)] mt-1">
          إعدادات لوحة التحكم
        </p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
        <div className="p-6 border-b border-[hsl(220_15%_88%)]">
          <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] flex items-center gap-2">
            <User size={20} />
            معلومات المدير
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[hsl(220_10%_46%)] mb-2">
                الاسم
              </label>
              <input
                type="text"
                value={admin?.name || ""}
                readOnly
                className="w-full bg-[hsl(215_25%_95%)] border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[hsl(220_10%_46%)] mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={admin?.email || ""}
                readOnly
                className="w-full bg-[hsl(215_25%_95%)] border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
          <div className="p-6 border-b border-[hsl(220_15%_88%)]">
            <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] flex items-center gap-2">
              <Bell size={20} />
              الإشعارات
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">إشعارات الرسائل الجديدة</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">إشعارات التسجيلات الجديدة</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">إشعارات التقييمات الجديدة</span>
              <input type="checkbox" className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
          <div className="p-6 border-b border-[hsl(220_15%_88%)]">
            <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] flex items-center gap-2">
              <Shield size={20} />
              الأمان
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full py-3 px-4 bg-[hsl(215_25%_90%)] rounded-xl text-sm font-medium text-[hsl(220_40%_13%)] hover:bg-[hsl(215_25%_85%)] transition-colors text-right">
              تغيير كلمة المرور
            </button>
            <button className="w-full py-3 px-4 bg-[hsl(215_25%_90%)] rounded-xl text-sm font-medium text-[hsl(220_40%_13%)] hover:bg-[hsl(215_25%_85%)] transition-colors text-right">
              تفعيل المصادقة الثنائية
            </button>
            <button className="w-full py-3 px-4 bg-[hsl(215_25%_90%)] rounded-xl text-sm font-medium text-[hsl(220_40%_13%)] hover:bg-[hsl(215_25%_85%)] transition-colors text-right">
              سجل النشاط
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
          <div className="p-6 border-b border-[hsl(220_15%_88%)]">
            <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] flex items-center gap-2">
              <Globe size={20} />
              اللغة
            </h2>
          </div>
          <div className="p-6">
            <select className="w-full border border-[hsl(220_15%_88%)] h-12 px-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none">
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] overflow-hidden">
          <div className="p-6 border-b border-[hsl(220_15%_88%)]">
            <h2 className="text-lg font-bold text-[hsl(220_40%_13%)] flex items-center gap-2">
              <SettingsIcon size={20} />
              إعدادات عامة
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">وضع الصيانة</span>
              <input type="checkbox" className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">السماح بالتسجيل الجديد</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[hsl(220_40%_13%)]">مراجعة الحرفيين يدوياً</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[hsl(40_75%_50%)]" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
