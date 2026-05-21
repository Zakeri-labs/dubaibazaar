import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageCircle, Clock, Check, Send } from "lucide-react";
import { Instagram } from "@/components/icons";
import { SITE } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

type Msg = { name: string; subject: string; message: string };

export default function Contact() {
  const revealRef = useReveal();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Msg>();
  const onSubmit = (d: Msg) => {
    setSent(true);
    setTimeout(() => {
      window.open(`${SITE.whatsappUrl}?text=${encodeURIComponent(`${d.subject}\n\n${d.message}\n— ${d.name}`)}`, "_blank");
      setSent(false);
      reset();
    }, 1500);
  };

  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>} className="pt-32">
      <section className="container-x text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">تماس با من</span>
          <h1 className="heading text-5xl md:text-7xl mb-6">بیا حرف بزنیم</h1>
          <p className="text-lg text-brand-ink/70 leading-9">
            هر سوال، پیشنهاد یا سفارش اختصاصی داری، از طریق راه‌های زیر در ارتباط باش. معمولاً در کمتر از یک ساعت پاسخ می‌دهیم.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section">
        <div className="container-x grid md:grid-cols-3 gap-5">
          {[
            { icon: MessageCircle, title: "واتساپ", value: "+۹۷۱ ۵۰ ۵۷۱ ۳۲۰۰", href: SITE.whatsappUrl, color: "from-emerald-500 to-green-700" },
            { icon: Instagram,     title: "اینستاگرام", value: `@${SITE.instagram}`, href: SITE.instagramUrl, color: "from-pink-500 via-rose-500 to-amber-500" },
            { icon: MapPin,        title: "مکان", value: SITE.location, href: "#", color: "from-brand-green to-brand-moss" },
          ].map((c, i) => (
            <motion.a
              key={c.title} href={c.href} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="card hover:shadow-glow group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white grid place-items-center mb-5 group-hover:scale-110 transition-transform`}>
                <c.icon className="w-7 h-7" />
              </div>
              <div className="text-sm text-brand-ink/60">{c.title}</div>
              <div className="font-black text-brand-green text-lg mt-1 break-all">{c.value}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="section bg-brand-sand/60">
        <div className="container-x grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="heading text-3xl md:text-4xl mb-6">پیام سریع</h2>
            <div className="card relative overflow-hidden">
              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-green text-brand-cream z-10 grid place-items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-deep grid place-items-center mx-auto mb-3">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="font-black text-xl">پیام شما ارسال شد</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("name", { required: true })} placeholder="نام شما"
                  className="w-full bg-brand-sand/40 focus:bg-white border-2 border-transparent focus:border-brand-green rounded-xl px-4 py-3 outline-none transition-all" />
                {errors.name && <p className="text-xs text-red-600">نام را وارد کنید</p>}
                <input {...register("subject", { required: true })} placeholder="موضوع پیام"
                  className="w-full bg-brand-sand/40 focus:bg-white border-2 border-transparent focus:border-brand-green rounded-xl px-4 py-3 outline-none transition-all" />
                <textarea {...register("message", { required: true })} rows={5} placeholder="پیام شما..."
                  className="w-full bg-brand-sand/40 focus:bg-white border-2 border-transparent focus:border-brand-green rounded-xl px-4 py-3 outline-none transition-all resize-none" />
                <button type="submit" className="btn-primary w-full"><Send className="w-4 h-4" /> ارسال پیام</button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="heading text-3xl md:text-4xl">دفتر ما در دبی</h2>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft bg-brand-green">
              <iframe
                title="map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.1%2C25.05%2C55.4%2C25.3&layer=mapnik&marker=25.2048%2C55.2708"
                className="w-full h-full grayscale-[40%] contrast-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-brand-green/10" />
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-brand-green text-brand-gold grid place-items-center"><Clock className="w-5 h-5" /></span>
                <h3 className="font-black text-brand-green text-lg">ساعات پاسخگویی</h3>
              </div>
              <ul className="text-sm text-brand-ink/75 space-y-2 leading-7">
                <li>شنبه تا چهارشنبه: ۱۰:۰۰ تا ۲۲:۰۰ به وقت دبی</li>
                <li>پنجشنبه: ۱۰:۰۰ تا ۱۸:۰۰</li>
                <li>جمعه: تعطیل (پاسخگویی محدود در واتساپ)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
