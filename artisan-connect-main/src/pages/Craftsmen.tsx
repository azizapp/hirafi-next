import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { craftsmen, categories } from "@/data/mockData";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const Craftsmen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    setSearchTerm(search);
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredCraftsmen = craftsmen.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || c.specialty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set("search", val);
    else newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    const newParams = new URLSearchParams(searchParams);
    if (val !== "all") newParams.set("category", val);
    else newParams.delete("category");
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="bg-gradient-navy py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">اكتشف الحرفيين</h1>
          <p className="text-primary-foreground/70 mb-8">ابحث عن الخبير المناسب لمشروعك القادم</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="بحث عن اسم أو تخصص أو مدينة..." 
                className="pr-10 bg-card border-navy-light/20 h-12"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <select 
                className="h-12 px-4 rounded-md bg-card border border-navy-light/20 text-foreground text-sm focus:ring-2 focus:ring-gold outline-none"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="all">كل الفئات</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <Button variant="hero" className="h-12 px-8">بحث</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">تم العثور على {filteredCraftsmen.length} حرفي</p>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={16} />
            تصفية متقدمة
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCraftsmen.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center text-2xl font-bold text-accent-foreground shadow-gold">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-full">
                    <Star className="text-gold fill-gold" size={14} />
                    <span className="text-xs font-bold text-gold-dark">{c.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors">{c.name}</h3>
                <p className="text-gold font-semibold text-sm mb-4">{c.specialty}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{c.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{c.experience}</span> سنوات خبرة
                  </div>
                  <Link to={`/craftsman/${c.id}`}>
                    <Button variant="outline" size="sm">عرض الملف</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredCraftsmen.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">لا يوجد نتائج تطابق بحثك.</p>
            <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory("all")}}>مسح الرموز</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Craftsmen;
