import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, UserPlus } from "lucide-react";

const Register = () => {
  const [role, setRole] = useState<"client" | "artisan">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for Registration
    console.log("Register with:", { name, email, phone, password, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-card rounded-3xl shadow-gold-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">ح</span>
              </div>
              <span className="text-foreground font-bold text-2xl">حِرَفي</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">انضم إلى مجتمع حرفي</h1>
            <p className="text-muted-foreground mt-2">ابدأ رحلتك معنا اليوم</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => setRole("client")}
              className={`p-4 rounded-2xl border-2 transition-all text-center ${
                role === "client" ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-border hover:bg-secondary"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                <User size={20} className={role === "client" ? "text-gold" : "text-muted-foreground"} />
              </div>
              <p className={`text-sm font-bold ${role === "client" ? "text-foreground" : "text-muted-foreground"}`}>أبحث عن حرفي</p>
            </button>
            <button
              onClick={() => setRole("artisan")}
              className={`p-4 rounded-2xl border-2 transition-all text-center ${
                role === "artisan" ? "border-gold bg-gold/5 ring-1 ring-gold" : "border-border hover:bg-secondary"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                <UserPlus size={20} className={role === "artisan" ? "text-gold" : "text-muted-foreground"} />
              </div>
              <p className={`text-sm font-bold ${role === "artisan" ? "text-foreground" : "text-muted-foreground"}`}>أنا حرفي (صنايعي)</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم بالكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="name" placeholder="محمد أحمد" className="pr-10 h-12 rounded-xl" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="phone" placeholder="+966" className="pr-10 h-12 rounded-xl" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input id="email" type="email" placeholder="name@example.com" className="pr-10 h-12 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input id="password" type="password" placeholder="••••••••" className="pr-10 h-12 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <Button variant="hero" className="w-full h-12 rounded-xl text-lg mt-4" type="submit">
              إنشاء حساب
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-gold font-bold hover:underline">سجل دخولك</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
