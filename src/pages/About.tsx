import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Tag, BadgeCheck, MessageCircle, ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-brand.jpg";
import { SITE } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

const flags = [
  { emoji: "🇦🇪", name: "امارات", color: "from-red-500 via-white to-black" },
  { emoji: "🇨🇳", name: "چین",    color: "from-red-600 to-yellow-400" },
  { emoji: "🇵🇰", name: "پاکستان", color: "from-green-700 to-white" },
  { emoji: "🇧🇩", name: "بنگلادش", color: "from-green-600 to-red-500" },
];

const values = [
  { icon: ShieldCheck, title: "شفافیت", desc: "قیمت خرید واقعی، فاکتور رسمی و گزارش لحظه‌ای از مراحل سفارش." },
  { icon: Tag,         title: "قیمت مناسب", desc: "حذف واسطه‌های متعدد و خرید مستقیم از تأمین‌کننده." },
  { icon: BadgeCheck,  title: "کیفیت اصل", desc: "تمام محصولات با اصالت تضمین‌شده و ضمانت تعویض." },
];

const timeline = [
  { year: "۱۳۹۹", title: "شروع از یک ایده", desc: "اولین خرید اختصاصی برای دوستان و آشنایان از بازار دیره دبی." },
  { year: "۱۴۰۰", title: "راه‌اندازی اینستاگرام", desc: "ساخت پیج رسمی و رسیدن به اولین مشتریان از سراسر ایران." },
  { year: "۱۴۰۲", title: "توسعه شبکه تأمین", desc: "افزودن چین، پاکستان و بنگلادش به کشورهای تأمین‌کننده." },
  { year: "۱۴۰۳", title: "+۲۵ هزار دنبال‌کننده", desc: "رسیدن به جامعه‌ای پرشور از مشتریان وفادار و فروشگاه‌های همکار." },
  { year: "۱۴۰۴", title: "راه‌اندازی سایت رسمی", desc: "ارائه خدمات سفارش عمده و تک به‌صورت کاملاً تخصصی." },
];

export default function About() {
  const revealRef = useReveal();
  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>}>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero1.webp" alt="دبی بازار" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-deep/70 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-brand-deep/40" />
        </div>

        <div className="container-x relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="eyebrow !text-brand-goldlight">درباره من</span>
            <h1 className="heading text-5xl md:text-7xl lg:text-8xl mb-8 text-white">از دل دبی، <br /><span className="text-brand-gold">برای ایران</span></h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              من سال‌هاست در دبی زندگی و کار می‌کنم. در این مدت متوجه شدم بسیاری از کالاهایی که در ایران با چند برابر قیمت فروخته می‌شوند، می‌توانند مستقیم و بدون واسطه به دست مشتری برسند. این شد آغاز <span className="font-black text-brand-gold">دبی بازار</span>.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary !py-4 !px-10 shadow-glow">
                <MessageCircle className="w-5 h-5" /> صحبت در واتساپ
              </a>
              <Link to="/wholesale" className="btn-ghost !text-white !border-white/20 !bg-white/10 hover:!bg-white/20 !py-4 !px-10 backdrop-blur-md">ثبت سفارش <ArrowLeft className="w-5 h-5" /></Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
              <img src={heroImg} alt="بنیان‌گذار دبی بازار" className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 bg-brand-gold text-brand-deep rounded-[2rem] px-8 py-5 font-black shadow-glow text-xl"
            >
              ۵+ سال تجربه واردات
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOURCING */}
      <section className="section">
        <div className="container-x">
          <div className="text-center mb-12 reveal">
            <span className="eyebrow">شبکه تأمین</span>
            <h2 className="heading text-4xl md:text-5xl">از ۴ کشور برای شما</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {flags.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative card text-center hover:-translate-y-2 hover:shadow-glow group overflow-hidden border-none"
              >
                {/* Flag Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-6xl mb-3 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">{f.emoji}</div>
                  <div className="font-black text-brand-deep text-xl">{f.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-brand-sand/60">
        <div className="container-x">
          <div className="text-center mb-12 reveal">
            <span className="eyebrow">ارزش‌های ما</span>
            <h2 className="heading text-4xl md:text-5xl">چرا دبی بازار؟</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                className="card hover:shadow-glow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-green text-brand-gold grid place-items-center mb-5">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="heading text-2xl">{v.title}</h3>
                <p className="text-brand-ink/65 mt-3 leading-7">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-16 reveal">
            <span className="eyebrow">مسیر ما</span>
            <h2 className="heading text-4xl md:text-5xl">خط‌سیر دبی بازار</h2>
          </div>

          <div className="relative">
            <div className="absolute right-6 md:right-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-gold via-brand-green to-brand-gold" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
                className={`relative pr-16 md:pr-0 md:w-1/2 mb-12 ${i % 2 === 0 ? "md:pr-12 md:mr-auto md:text-left" : "md:pl-12 md:ml-auto"}`}
              >
                <span className={`absolute top-2 right-2 md:right-auto w-8 h-8 rounded-full bg-brand-gold border-4 border-brand-cream shadow-soft ${i % 2 === 0 ? "md:-left-4" : "md:-right-4"}`} />
                <div className="card">
                  <div className="text-brand-gold font-black text-2xl">{t.year}</div>
                  <h3 className="heading text-xl mt-2">{t.title}</h3>
                  <p className="text-brand-ink/65 mt-2 leading-7">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
