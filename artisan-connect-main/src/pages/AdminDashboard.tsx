import { useState } from "react";
import { Users, Wrench, Star, MessageSquare, BarChart3, Shield, Settings, LogOut, Search, MoreVertical, BadgeCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { craftsmen, reviews } from "@/data/mockData";
import { motion } from "framer-motion";

const stats = [
  { label: "المستخدمون", value: "1,284", icon: Users, change: "+12%" },
  { label: "الحرفيون", value: "543", icon: Wrench, change: "+8%" },
  { label: "التقييمات", value: "3,721", icon: Star, change: "+23%" },
  { label: "الرسائل", value: "892", icon: MessageSquare, change: "+15%" },
];

const sidebarItems = [
  { label: "الإحصائيات", icon: BarChart3, active: true },
  { label: "المستخدمون", icon: Users, active: false },
  { label: "الحرفيون", icon: Wrench, active: false },
  { label: "التقييمات", icon: Star, active: false },
  { label: "الرسائل", icon: MessageSquare, active: false },
  { label: "الإعدادات", icon: Settings, active: false },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} bg-gradient-navy transition-all duration-300 flex flex-col shrink-0`}>
        <div className="p-5 flex items-center gap-3 border-b border-navy-light/20">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">ح</span>
          </div>
          <span className="text-primary-foreground font-bold text-lg">لوحة التحكم</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-gold"
                  : "text-primary-foreground/60 hover:bg-sidebar-accent hover:text-primary-foreground"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-light/20">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
              <BarChart3 size={20} />
            </button>
            <h1 className="text-xl font-bold text-foreground">الإحصائيات</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="بحث..." className="pr-9 w-48 h-9 text-sm" />
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-accent-foreground">
              م
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <stat.icon className="text-primary" size={20} />
                  </div>
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Craftsmen Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">إدارة الحرفيين</h2>
              <Button variant="hero" size="sm">إضافة حرفي</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-right px-5 py-3 text-sm font-semibold text-muted-foreground">الحرفي</th>
                    <th className="text-right px-5 py-3 text-sm font-semibold text-muted-foreground">التخصص</th>
                    <th className="text-right px-5 py-3 text-sm font-semibold text-muted-foreground">التقييم</th>
                    <th className="text-right px-5 py-3 text-sm font-semibold text-muted-foreground">الحالة</th>
                    <th className="text-right px-5 py-3 text-sm font-semibold text-muted-foreground">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {craftsmen.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-sm font-bold text-accent-foreground">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-foreground">{c.specialty}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="text-gold fill-gold" size={14} />
                          <span className="text-sm font-medium text-foreground">{c.rating}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {c.verified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold-dark">
                            <BadgeCheck size={12} />
                            معتمد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                            قيد المراجعة
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-lg font-bold text-foreground mb-4">آخر التقييمات</h2>
            <div className="space-y-3">
              {reviews.slice(0, 4).map((r) => {
                const c = craftsmen.find((cr) => cr.id === r.craftsmanId);
                return (
                  <div key={r.id} className="flex items-start gap-4 p-3 rounded-xl bg-secondary/30">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                      {r.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{r.userName}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="text-gold fill-gold" size={12} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{r.comment}</p>
                      <p className="text-xs text-gold mt-1">← {c?.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
