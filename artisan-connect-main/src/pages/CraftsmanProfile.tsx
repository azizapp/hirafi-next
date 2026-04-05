import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Phone, Mail, BadgeCheck, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { craftsmen, reviews } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const CraftsmanProfile = () => {
  const { id } = useParams();
  const craftsman = craftsmen.find((c) => c.id === id);
  const craftsmanReviews = reviews.filter((r) => r.craftsmanId === id);

  if (!craftsman) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">الحرفي غير موجود</h2>
          <Link to="/"><Button>العودة للرئيسية</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-navy h-48 md:h-56 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-gold blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center text-4xl font-bold text-accent-foreground shadow-gold shrink-0">
                  {craftsman.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-foreground">{craftsman.name}</h1>
                    {craftsman.verified && <BadgeCheck className="text-gold" size={22} />}
                  </div>
                  <p className="text-gold font-semibold mb-2">{craftsman.specialty}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="text-gold fill-gold" size={16} />
                      {craftsman.rating} ({craftsman.reviewCount} تقييم)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {craftsman.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {craftsman.experience} سنوات خبرة
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-muted-foreground leading-relaxed">{craftsman.bio}</p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">الخدمات المقدمة</h2>
              <div className="space-y-3">
                {craftsman.services.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="text-gold font-bold">{s.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">التقييمات ({craftsmanReviews.length})</h2>
              {craftsmanReviews.length === 0 ? (
                <p className="text-muted-foreground">لا توجد تقييمات بعد.</p>
              ) : (
                <div className="space-y-4">
                  {craftsmanReviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl bg-secondary/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{r.userName}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="text-gold fill-gold" size={14} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{r.comment}</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">{r.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl p-6 border border-border sticky top-20"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">تواصل مع الحرفي</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-muted-foreground mr-1">الاسم</label>
                   <input type="text" placeholder="اسمك الكريم" className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-muted-foreground mr-1">رقم الجوال</label>
                   <input type="tel" placeholder="+966" className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-muted-foreground mr-1">الرسالة</label>
                   <textarea placeholder="اشرح الخدمة التي تحتاجها..." className="w-full h-24 p-4 rounded-xl bg-secondary/50 border border-border text-sm focus:ring-2 focus:ring-gold outline-none resize-none"></textarea>
                </div>
                <Button variant="hero" className="w-full h-12 text-md font-bold">
                  إرسال الطلب
                </Button>
                
                <div className="pt-4 flex flex-col gap-2">
                  <a href={`tel:${craftsman.phone}`} className="flex items-center justify-center gap-2 text-sm text-gold font-bold hover:underline">
                    <Phone size={16} />
                    اتصال مباشر: {craftsman.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CraftsmanProfile;
