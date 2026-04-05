"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Phone, BadgeCheck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { craftsmen, reviews } from "@/lib/data";
import { useLang } from "@/context/LangContext";
import { use } from "react";

type Props = { params: Promise<{ id: string }> };

export default function CraftsmanProfilePage({ params }: Props) {
  const { id } = use(params);
  const craftsman = craftsmen.find((c) => c.id === id);
  const { t } = useLang();

  if (!craftsman) notFound();

  const craftsmanReviews = reviews.filter((r) => r.craftsmanId === id);

  return (
    <div className="min-h-screen bg-[hsl(220_20%_97%)]">
      <Navbar />

      {/* Banner */}
      <div className="bg-gradient-navy h-48 md:h-56 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-[hsl(40_75%_50%)] blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl p-6 border border-[hsl(220_15%_88%)] shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center text-4xl font-bold text-[hsl(220_40%_13%)] shadow-gold shrink-0">
                  {craftsman.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-[hsl(220_40%_13%)]">{craftsman.name}</h1>
                    {craftsman.verified && <BadgeCheck className="text-[hsl(40_75%_50%)]" size={22} />}
                  </div>
                  <p className="text-[hsl(40_75%_50%)] font-semibold mb-2">{craftsman.specialty}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(220_10%_46%)]">
                    <span className="flex items-center gap-1">
                      <Star className="text-[hsl(40_75%_50%)] fill-[hsl(40_75%_50%)]" size={16} />
                      {craftsman.rating} ({craftsman.reviewCount} {t("profile_reviews")})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {craftsman.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {craftsman.experience} {t("profile_experience")}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[hsl(220_10%_46%)] leading-relaxed">{craftsman.bio}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 border border-[hsl(220_15%_88%)]">
              <h2 className="text-xl font-bold text-[hsl(220_40%_13%)] mb-4">{t("profile_services")}</h2>
              <div className="space-y-3">
                {craftsman.services.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)]"
                  >
                    <span className="font-medium text-[hsl(220_40%_13%)]">{s.name}</span>
                    <span className="text-[hsl(40_75%_50%)] font-bold">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-[hsl(220_15%_88%)]">
              <h2 className="text-xl font-bold text-[hsl(220_40%_13%)] mb-4">
                {t("profile_reviews_section")} ({craftsmanReviews.length})
              </h2>
              {craftsmanReviews.length === 0 ? (
                <p className="text-[hsl(220_10%_46%)]">{t("profile_no_reviews")}</p>
              ) : (
                <div className="space-y-4">
                  {craftsmanReviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl bg-[hsl(215_25%_90%/0.3)] border border-[hsl(220_15%_88%)]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[hsl(220_40%_13%)]">{r.userName}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="text-[hsl(40_75%_50%)] fill-[hsl(40_75%_50%)]" size={14} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[hsl(220_10%_46%)] text-sm">{r.comment}</p>
                      <p className="text-xs text-[hsl(220_10%_60%)] mt-2">{r.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-[hsl(220_15%_88%)] sticky top-20">
              <h3 className="text-lg font-bold text-[hsl(220_40%_13%)] mb-4">{t("profile_contact_title")}</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[hsl(220_10%_46%)]">{t("profile_contact_name")}</label>
                  <input
                    type="text"
                    placeholder={t("profile_contact_name_placeholder")}
                    className="w-full h-11 px-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[hsl(220_10%_46%)]">{t("profile_contact_phone")}</label>
                  <input
                    type="tel"
                    placeholder="+213"
                    className="w-full h-11 px-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[hsl(220_10%_46%)]">{t("profile_contact_message")}</label>
                  <textarea
                    placeholder={t("profile_contact_message_placeholder")}
                    className="w-full h-24 p-4 rounded-xl bg-[hsl(215_25%_90%/0.5)] border border-[hsl(220_15%_88%)] text-sm focus:ring-2 focus:ring-[hsl(40_75%_50%)] outline-none resize-none"
                  />
                </div>
                <button className="w-full h-12 rounded-xl bg-gradient-gold text-[hsl(220_40%_13%)] font-bold text-sm hover:opacity-90 transition-opacity shadow-gold">
                  {t("profile_contact_send")}
                </button>
                <div className="pt-2 text-center">
                  <a
                    href={`tel:${craftsman.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-[hsl(40_75%_50%)] font-bold hover:underline"
                  >
                    <Phone size={16} />
                    {t("profile_direct_call")}: {craftsman.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
