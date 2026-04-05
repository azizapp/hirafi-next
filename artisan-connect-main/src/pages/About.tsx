import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Hexagon, Shield, Users, Award, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, title: "حرفيون موثوقون", desc: "نحن نتحقق من جميع الحرفيين قبل قبولهم في المنصة لضمان أفضل جودة." },
  { icon: Award, title: "ضمان الجودة", desc: "نسعى دائماً لتقديم خدمات عالية الجودة تلبي تطلعات عملائنا." },
  { icon: Users, title: "مجتمع متكامل", desc: "نجمع بين أفضل المواهب الحرفية والباحثين عن مهاراتهم في مكان واحد." },
  { icon: Hexagon, title: "ابتكار مستمر", desc: "نستخدم التكنولوجيا لتسهيل عملية البحث والتواصل والتعاقد." },
  { icon: Headphones, title: "دعم فني", desc: "فريق الدعم لدينا متاح دائماً لمساعدتك في أي وقت واستشارة." },
  { icon: CheckCircle2, title: "سهولة الاستخدام", desc: "واجهة بسيطة وسهلة تتيح لك الوصول للحرفي بضغطة زر واحدة." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="bg-gradient-navy py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">من نحن</h1>
          <p className="text-primary-foreground/70 max-w-2xl text-lg md:text-xl">
             نحن نسعى لجعل عملية العثور على الحرفي المناسب أسرع وأسهل وأكثر موثوقية في المملكة العربية السعودية.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">رؤيتنا ورسالتنا</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
               تأسست منصة "حرفي" بهدف ربط المجتمع بأفضل الكوادر الفنية والحرفية المعتمدة. نحن نؤمن بأن الحرف اليدوية هي جوهر البناء والتطوير، لذا نسعى جاهدين لتمكين الحرفيين وتقديم خدمات متميزة للعملاء.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
               نحن نركز على الجودة، الثقة، والسرعة. من خلال منصتنا، يمكن للباحثين عن خدمات الصيانة والبناء والجمال الديكوري العثور على الخبير المثالي ومراجعة تقييماته وأعماله بكل شفافية.
            </p>
            <div className="pt-4 flex gap-4">
              <Button variant="hero">انضم إلينا</Button>
              <Button variant="outline">تواصل معنا</Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="aspect-square rounded-3xl bg-gradient-gold shadow-gold-xl relative overflow-hidden flex items-center justify-center">
                <span className="text-[200px] font-bold text-accent-foreground opacity-10">ح</span>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="text-center">
                      <h3 className="text-4xl font-extrabold text-accent-foreground mb-2">حِرَفي</h3>
                      <p className="text-accent-foreground/70 font-medium">الخيار الأول في المملكة</p>
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-2xl bg-navy p-6 shadow-xl hidden md:flex flex-col justify-center border border-navy-light/10">
                <p className="text-3xl font-bold text-gold mb-1">500+</p>
                <p className="text-xs text-primary-foreground/70">حرفي نشط</p>
             </div>
          </motion.div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">قيمنا الجوهرية</h2>
            <p className="text-muted-foreground">نهتم بأدق التفاصيل لرضاكم التام</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-gold/30 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                  <feature.icon className="text-primary group-hover:text-gold transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
