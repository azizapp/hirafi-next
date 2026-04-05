import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { craftsmen } from "@/data/mockData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FeaturedCraftsmen = () => {
  const featured = craftsmen.filter((c) => c.featured);

  return (
    <section className="py-16 md:py-24 bg-secondary/50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            حرفيون <span className="text-gradient-gold">مميزون</span>
          </h2>
          <p className="text-muted-foreground text-lg">أفضل الحرفيين بأعلى التقييمات</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link to={`/craftsman/${c.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300 group">
                  <div className="h-32 bg-gradient-navy relative">
                    <div className="absolute -bottom-8 right-4 w-16 h-16 rounded-xl bg-gold flex items-center justify-center text-2xl font-bold text-accent-foreground shadow-gold">
                      {c.name.charAt(0)}
                    </div>
                    {c.verified && (
                      <div className="absolute top-3 left-3">
                        <BadgeCheck className="text-gold" size={22} />
                      </div>
                    )}
                  </div>

                  <div className="p-4 pt-12">
                    <h3 className="font-bold text-foreground text-lg">{c.name}</h3>
                    <p className="text-gold font-medium text-sm mb-2">{c.specialty}</p>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="text-gold fill-gold" size={14} />
                        {c.rating}
                      </span>
                      <span>({c.reviewCount} تقييم)</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {c.location}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">{c.experience} سنوات خبرة</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/craftsmen">
            <Button variant="outline" size="lg" className="px-10 h-14 text-lg font-bold border-2 hover:bg-gold/5 hover:border-gold hover:text-gold transition-all">
              عرض جميع الحرفيين
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCraftsmen;
