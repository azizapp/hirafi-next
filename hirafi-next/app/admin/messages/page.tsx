"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Search, Phone, Calendar, Eye, X, User } from "lucide-react";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const { t } = useLang();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase()) ||
      msg.phone.includes(search)
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
            {t("admin_nav_messages")}
          </h1>
          <p className="text-[hsl(220_10%_46%)] mt-1">
            {filteredMessages.length} رسالة
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220_10%_46%)]" size={20} />
        <input
          type="text"
          placeholder="البحث في الرسائل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[hsl(220_15%_88%)] h-12 pr-10 pl-4 rounded-xl text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
        />
      </div>

      {/* Messages Grid */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] p-12 text-center">
          <p className="text-[hsl(220_10%_46%)]">لا توجد رسائل</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-[hsl(220_15%_88%)] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                    <User size={20} className="text-[hsl(220_40%_13%)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[hsl(220_40%_13%)]">{message.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-[hsl(220_10%_46%)]">
                      <Phone size={14} />
                      <span dir="ltr">{message.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[hsl(220_10%_46%)]">
                  <Calendar size={14} />
                  <span>{formatDate(message.createdAt)}</span>
                </div>
              </div>

              <p className="text-[hsl(220_10%_46%)] text-sm line-clamp-3 mb-4">
                {message.message}
              </p>

              <button
                onClick={() => setSelectedMessage(message)}
                className="flex items-center gap-2 text-sm text-[hsl(215_80%_27%)] hover:text-[hsl(215_80%_20%)] font-medium"
              >
                <Eye size={16} />
                عرض التفاصيل
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[hsl(220_15%_88%)]">
              <h2 className="text-lg font-bold text-[hsl(220_40%_13%)]">تفاصيل الرسالة</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg hover:bg-[hsl(215_25%_90%)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <User size={24} className="text-[hsl(220_40%_13%)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[hsl(220_40%_13%)]">{selectedMessage.name}</h3>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-sm text-[hsl(215_80%_27%)] hover:underline"
                    dir="ltr"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
              </div>
              <div className="bg-[hsl(215_25%_95%)] rounded-xl p-4">
                <p className="text-[hsl(220_40%_13%)] whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="text-sm text-[hsl(220_10%_46%)]">
                تم الإرسال: {formatDate(selectedMessage.createdAt)}
              </div>
            </div>
            <div className="p-6 border-t border-[hsl(220_15%_88%)] flex gap-3">
              <a
                href={`tel:${selectedMessage.phone}`}
                className="flex-1 h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold hover:opacity-90 transition-opacity shadow-gold flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                اتصال مباشر
              </a>
              <button
                onClick={() => setSelectedMessage(null)}
                className="h-12 px-6 rounded-xl border border-[hsl(220_15%_88%)] text-[hsl(220_40%_13%)] font-medium hover:bg-[hsl(215_25%_95%)] transition-colors"
              >
                إغلاق
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
