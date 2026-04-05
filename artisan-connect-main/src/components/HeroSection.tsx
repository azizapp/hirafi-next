import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/craftsmen?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/craftsmen");
    }
  };

  return (
    <section className="relative bg-gradient-navy overflow-hidden" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gold-light blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10">
            <span className="text-gold text-sm font-medium">🔧 أكثر من 500 حرفي معتمد</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            ابحث عن <span className="text-gradient-gold">الحرفي المثالي</span>
            <br />
            لمنزلك
          </h1>

          <p className="text-primary-foreground/70 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            منصة موثوقة تربطك بأفضل الحرفيين المعتمدين في منطقتك. جودة مضمونة وأسعار منافسة.
          </p>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-card/10 backdrop-blur-md p-2 rounded-2xl border border-primary-foreground/10"
          >
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="ابحث عن حرفي أو خدمة..."
                className="pr-10 bg-card border-0 h-12 text-foreground placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="hero" size="lg" className="h-12 px-8" type="submit">
              بحث
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["كهربائي", "سباك", "نجار", "دهان"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-primary-foreground/10 text-primary-foreground/70 hover:bg-gold/20 hover:text-gold cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(220, 20%, 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
