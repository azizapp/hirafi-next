"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap, Wrench, Hammer, Paintbrush, Building2, Shield, Wind, LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { TranslationKey } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  Zap, Wrench, Hammer, Paintbrush, Building2, Shield, Wind, LayoutGrid,
};

// Map category icon to translation key
const categoryKeys: { icon: string; nameKey: TranslationKey; count: number }[] = [
  { icon: "Zap",        nameKey: "cat_electrician", count: 128 },
  { icon: "Wrench",     nameKey: "cat_plumber",     count: 95  },
  { icon: "Hammer",     nameKey: "cat_carpenter",   count: 76  },
  { icon: "Paintbrush", nameKey: "cat_painter",     count: 112 },
  { icon: "Building2",  nameKey: "cat_builder",     count: 64  },
  { icon: "Shield",     nameKey: "cat_blacksmith",  count: 43  },
  { icon: "Wind",       nameKey: "cat_hvac",        count: 87  },
  { icon: "LayoutGrid", nameKey: "cat_tiler",       count: 55  },
];

export default function CategoriesSection() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <section className="py-16 md:py-24 bg-[hsl(220_20%_97%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(220_40%_13%)] mb-3">
            {t("cat_title_1")} <span className="text-gradient-gold">{t("cat_title_2")}</span>
          </h2>
          <p className="text-[hsl(220_10%_46%)] text-lg">{t("cat_subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categoryKeys.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Wrench;
            const name = t(cat.nameKey);
            return (
              <motion.button
                key={cat.icon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => router.push(`/craftsmen?category=${encodeURIComponent(name)}`)}
                className="group bg-white rounded-2xl p-6 text-center border border-[hsl(220_15%_88%)] hover:border-[hsl(40_75%_50%/0.4)] hover:shadow-gold transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[hsl(215_25%_90%)] flex items-center justify-center group-hover:bg-gradient-gold transition-colors duration-300">
                  <Icon className="text-[hsl(215_80%_27%)] group-hover:text-[hsl(220_40%_13%)] transition-colors" size={28} />
                </div>
                <h3 className="font-semibold text-[hsl(220_40%_13%)] mb-1">{name}</h3>
                <p className="text-sm text-[hsl(220_10%_46%)]">{cat.count} {t("cat_craftsman")}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
