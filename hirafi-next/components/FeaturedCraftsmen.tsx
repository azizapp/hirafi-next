"use client";

import Link from "next/link";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { craftsmen } from "@/lib/data";
import { useLang } from "@/context/LangContext";

export default function FeaturedCraftsmen() {
  const featured = craftsmen.filter((c) => c.featured);
  const { t } = useLang();

  return (
    <section className="py-16 md:py-24 bg-[hsl(215_25%_90%/0.5)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(220_40%_13%)] mb-3">
            {t("feat_title_1")} <span className="text-gradient-gold">{t("feat_title_2")}</span>
          </h2>
          <p className="text-[hsl(220_10%_46%)] text-lg">{t("feat_subtitle")}</p>
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
              <Link href={`/craftsman/${c.id}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden border border-[hsl(220_15%_88%)] hover:border-[hsl(40_75%_50%/0.4)] hover:shadow-gold transition-all duration-300 group">
                  <div className="h-32 bg-gradient-navy relative">
                    <div className="absolute -bottom-8 right-4 w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center text-2xl font-bold text-[hsl(220_40%_13%)] shadow-gold">
                      {c.name.charAt(0)}
                    </div>
                    {c.verified && (
                      <div className="absolute top-3 left-3">
                        <BadgeCheck className="text-[hsl(40_75%_50%)]" size={22} />
                      </div>
                    )}
                  </div>

                  <div className="p-4 pt-12">
                    <h3 className="font-bold text-[hsl(220_40%_13%)] text-lg group-hover:text-[hsl(40_70%_38%)] transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-[hsl(40_75%_50%)] font-medium text-sm mb-2">{c.specialty}</p>

                    <div className="flex items-center gap-3 text-sm text-[hsl(220_10%_46%)] mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="text-[hsl(40_75%_50%)] fill-[hsl(40_75%_50%)]" size={14} />
                        {c.rating}
                      </span>
                      <span>({c.reviewCount} {t("feat_reviews")})</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-[hsl(220_10%_46%)]">
                      <MapPin size={14} />
                      {c.location}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[hsl(220_15%_88%)]">
                      <span className="text-xs text-[hsl(220_10%_46%)]">{c.experience} {t("feat_experience")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/craftsmen"
            className="inline-block px-10 py-4 text-lg font-bold border-2 border-[hsl(220_15%_88%)] rounded-xl text-[hsl(220_40%_13%)] hover:bg-[hsl(40_75%_50%/0.05)] hover:border-[hsl(40_75%_50%)] hover:text-[hsl(40_70%_38%)] transition-all"
          >
            {t("feat_view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
}
