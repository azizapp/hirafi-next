"use client";

import { CheckCircle2, Hexagon, Shield, Users, Award, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { TranslationKey } from "@/lib/i18n";

type FeatureKey = {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
};

const featureKeys: FeatureKey[] = [
  { icon: Shield,       titleKey: "about_feat_1_title", descKey: "about_feat_1_desc" },
  { icon: Award,        titleKey: "about_feat_2_title", descKey: "about_feat_2_desc" },
  { icon: Users,        titleKey: "about_feat_3_title", descKey: "about_feat_3_desc" },
  { icon: Hexagon,      titleKey: "about_feat_4_title", descKey: "about_feat_4_desc" },
  { icon: Headphones,   titleKey: "about_feat_5_title", descKey: "about_feat_5_desc" },
  { icon: CheckCircle2, titleKey: "about_feat_6_title", descKey: "about_feat_6_desc" },
];

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[hsl(220_20%_97%)]">
      <Navbar />

      <div className="bg-gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("about_title")}</h1>
          <p className="text-white/70 max-w-2xl text-lg md:text-xl mx-auto">{t("about_subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[hsl(220_40%_13%)]">{t("about_vision_title")}</h2>
            <p className="text-[hsl(220_10%_46%)] leading-relaxed text-lg">{t("about_vision_p1")}</p>
            <p className="text-[hsl(220_10%_46%)] leading-relaxed text-lg">{t("about_vision_p2")}</p>
            <div className="pt-4 flex gap-4">
              <Link
                href="/register"
                className="h-12 px-8 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold hover:opacity-90 transition-opacity shadow-gold inline-flex items-center"
              >
                {t("about_join_btn")}
              </Link>
              <Link
                href="/craftsmen"
                className="h-12 px-8 rounded-xl border-2 border-[hsl(220_15%_88%)] text-[hsl(220_40%_13%)] font-bold hover:bg-[hsl(215_25%_90%/0.5)] transition-colors inline-flex items-center"
              >
                {t("about_browse_btn")}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-gold shadow-gold-xl relative overflow-hidden flex items-center justify-center">
              <span className="text-[200px] font-bold text-[hsl(220_40%_13%/0.1)]">H</span>
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center">
                  <h3 className="text-4xl font-extrabold text-[hsl(220_40%_13%)] mb-2">Hirafi</h3>
                  <p className="text-[hsl(220_40%_13%/0.7)] font-medium">{t("about_tagline")}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-2xl bg-[hsl(215_80%_27%)] p-6 shadow-xl hidden md:flex flex-col justify-center border border-white/10">
              <p className="text-3xl font-bold text-[hsl(40_75%_50%)] mb-1">500+</p>
              <p className="text-xs text-white/70">{t("about_active_artisans")}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[hsl(220_40%_13%)] mb-4">{t("about_values_title")}</h2>
            <p className="text-[hsl(220_10%_46%)]">{t("about_values_subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureKeys.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-[hsl(220_15%_88%)] hover:border-[hsl(40_75%_50%/0.3)] hover:shadow-lg transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-xl bg-[hsl(215_25%_90%)] flex items-center justify-center mx-auto mb-6 group-hover:bg-[hsl(40_75%_50%/0.1)] transition-colors">
                  <feature.icon className="text-[hsl(215_80%_27%)] group-hover:text-[hsl(40_75%_50%)] transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[hsl(220_40%_13%)] mb-3">{t(feature.titleKey)}</h3>
                <p className="text-[hsl(220_10%_46%)] leading-relaxed">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
