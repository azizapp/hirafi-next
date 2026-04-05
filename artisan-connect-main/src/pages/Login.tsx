import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for login
    console.log("Login with:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-3xl shadow-gold-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">ح</span>
              </div>
              <span className="text-foreground font-bold text-2xl">حِرَفي</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">مرحباً بك مجدداً</h1>
            <p className="text-muted-foreground mt-2">سجل دخولك للوصول إلى حسابك</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pr-10 h-12 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link to="#" className="text-xs text-gold hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pr-10 h-12 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button variant="hero" className="w-full h-12 rounded-xl text-lg mt-4" type="submit">
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="text-gold font-bold hover:underline">انضم إلينا الآن</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
