import { categories } from "@/data/mockData";
import { motion } from "framer-motion";
import {
  Zap, Wrench, Hammer, Paintbrush, Building2, Shield, Wind, LayoutGrid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  Zap, Wrench, Hammer, Paintbrush, Building2, Shield, Wind, LayoutGrid,
};

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            تصفح <span className="text-gradient-gold">التصنيفات</span>
          </h2>
          <p className="text-muted-foreground text-lg">اختر نوع الخدمة التي تحتاجها</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Wrench;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/craftsmen?category=${encodeURIComponent(cat.name)}`)}
              >
                <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-gradient-gold transition-colors duration-300">
                    <Icon className="text-primary group-hover:text-accent-foreground transition-colors" size={28} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} حرفي</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
