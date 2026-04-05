import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-navy text-primary-foreground/70 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground font-bold">ح</span>
              </div>
              <span className="text-primary-foreground font-bold text-lg">حِرَفي</span>
            </div>
            <p className="text-sm leading-relaxed">
              منصة موثوقة تربطك بأفضل الحرفيين المعتمدين. جودة مضمونة وراحة بال.
            </p>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link></li>
              <li><Link to="/craftsmen" className="hover:text-gold transition-colors">الحرفيون</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">من نحن</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">التصنيفات</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-gold cursor-pointer transition-colors">كهربائي</span></li>
              <li><span className="hover:text-gold cursor-pointer transition-colors">سباك</span></li>
              <li><span className="hover:text-gold cursor-pointer transition-colors">نجار</span></li>
              <li><span className="hover:text-gold cursor-pointer transition-colors">دهان</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-sm">
              <li>info@hirafi.com</li>
              <li>+966 50 123 4567</li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm">
          <p>© 2024 حِرَفي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
