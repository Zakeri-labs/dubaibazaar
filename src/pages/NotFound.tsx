import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center pt-32 pb-20 px-5 text-center relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-gold/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-green/15 rounded-full blur-3xl" />
      <div className="relative">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 100 }}
          className="font-display font-black text-[10rem] md:text-[16rem] leading-none text-brand-green/15"
        >
          ۴۰۴
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="heading text-4xl md:text-6xl -mt-8">گم شدی؟ 🧭</h1>
          <p className="text-brand-ink/70 mt-5 max-w-md mx-auto leading-8">
            صفحه‌ای که دنبالش بودی پیدا نشد. شاید جابجا شده یا اصلاً وجود نداشته. بریم برگردیم خانه!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/" className="btn-primary"><Home className="w-4 h-4" /> بازگشت به خانه</Link>
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <MessageCircle className="w-4 h-4" /> راهنمایی در واتساپ
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
