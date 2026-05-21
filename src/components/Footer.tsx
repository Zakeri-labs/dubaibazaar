import { Link } from "react-router-dom";
import { MessageCircle, Send, MapPin } from "lucide-react";
import { Instagram } from "@/components/icons";
import { NAV, SITE } from "@/lib/site";
import { motion } from "framer-motion";

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <footer className="bg-brand-deep text-brand-cream pt-20 pb-8 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade opacity-50 pointer-events-none" />
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="container-x relative"
      >
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <motion.div variants={item} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-glow">
                <img src="/images/logo.webp" alt={SITE.brandFa} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-black text-xl">{SITE.brandFa}</div>
                <div className="text-xs text-brand-gold tracking-wider">🇦🇪 DubaiBazaar.ir</div>
              </div>
            </div>
            <p className="text-brand-cream/70 leading-7 max-w-md mb-6">{SITE.bio}</p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: SITE.instagramUrl },
                { icon: MessageCircle, href: SITE.whatsappUrl },
                { icon: Send, href: SITE.telegramUrl },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-deep transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-bold text-brand-gold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold transition-all" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-bold text-brand-gold mb-4">ارتباط</h4>
            <ul className="space-y-3 text-sm text-brand-cream/70">
              <li className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>
                {SITE.location}
              </li>
              <li className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-brand-gold" />
                </div>
                +۹۷۱ ۵۰ ۵۷۱ ۳۲۰۰
              </li>
              <li className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Instagram className="w-4 h-4 text-brand-gold" />
                </div>
                @{SITE.instagram}
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={item}
          className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brand-cream/60"
        >
          <div>© ۱۴۰۴ دبی بازار — تمامی حقوق محفوظ است.</div>
          <div className="text-brand-gold/80 font-medium">{SITE.tagline}</div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
