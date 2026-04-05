import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-navy border-b border-navy-light/30 backdrop-blur-sm" dir="rtl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">ح</span>
          </div>
          <span className="text-primary-foreground font-bold text-xl">حِرَفي</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium">
            الرئيسية
          </Link>
          <Link to="/craftsmen" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium">
            الحرفيون
          </Link>
          <Link to="/about" className="text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium">
            من نحن
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="hero-outline" size="sm">
              تسجيل الدخول
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="hero" size="sm">
              انضم كحرفي
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-navy-light/20 p-4 space-y-3">
          <Link to="/" className="block text-primary-foreground/80 hover:text-gold py-2" onClick={() => setMobileOpen(false)}>الرئيسية</Link>
          <Link to="/craftsmen" className="block text-primary-foreground/80 hover:text-gold py-2" onClick={() => setMobileOpen(false)}>الحرفيون</Link>
          <Link to="/about" className="block text-primary-foreground/80 hover:text-gold py-2" onClick={() => setMobileOpen(false)}>من نحن</Link>
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="hero-outline" size="sm" className="w-full">تسجيل الدخول</Button>
            </Link>
            <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">انضم كحرفي</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
