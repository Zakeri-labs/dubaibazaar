import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MessageCircle, ShoppingBag, Briefcase, Sparkles,
  Watch, Smartphone, Package, Truck, ClipboardList, Home as HomeIcon, Quote, Star,
  ShieldCheck, Zap, Globe, Heart, ChevronLeft, ChevronRight, Settings, Car,
  Shirt, Briefcase as BagIcon, ToyBrick, MoreHorizontal
} from "lucide-react";
import { Instagram } from "@/components/icons";
import { SITE } from "@/lib/site";
import { useCountUp } from "@/lib/useCountUp";
import { fa } from "@/lib/fa";
import { gsap, useReveal } from "@/lib/useReveal";

const categories = [
  { 
    icon: Shirt, 
    label: "لباس", 
    labelEn: "Fashion",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: BagIcon, 
    label: "کیف", 
    labelEn: "Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: Sparkles, 
    label: "لوازم آرایشی", 
    labelEn: "Cosmetics",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: Watch, 
    label: "اکسسوری", 
    labelEn: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: ToyBrick, 
    label: "اسباب بازی", 
    labelEn: "Toys",
    image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: Car, 
    label: "وسایل نقلیه", 
    labelEn: "Vehicles",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  { 
    icon: MoreHorizontal, 
    label: "سایر کالاها", 
    labelEn: "Others",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
  },
];

const steps = [
  { n: "۰۱", icon: ClipboardList, title: "انتخاب و ثبت", desc: "کالای مورد نظر خود را از طریق سایت یا واتساپ به ما اعلام می‌کنید." },
  { n: "۰۲", icon: ShoppingBag,   title: "خرید و تأمین", desc: "تیم ما در دبی کالا را با بهترین قیمت و کیفیت خریداری می‌کند." },
  { n: "۰۳", icon: HomeIcon,      title: "تحویل درب منزل", desc: "بسته‌بندی حرفه‌ای و ارسال ایمن به سراسر ایران در کوتاه‌ترین زمان." },
];

const testimonials = [
  { name: "رضا محمدی", role: "فروشنده عمده، بازار تهران", text: "دبی بازار تحولی در کسب‌وکار من ایجاد کرد. قیمت‌ها و سرعت ارسال بی‌نظیر است." },
  { name: "سارا کریمی",  role: "خریدار شخصی، شیراز",      text: "همیشه نگران اصالت محصولات آرایشی بودم، اما با دبی بازار خیالم کاملاً راحت شد." },
  { name: "امیرحسین راد", role: "فروشگاه آنلاین، مشهد",    text: "بهترین شریک تجاری برای تأمین کالاهای دیجیتال. همکاری با شما افتخار ماست." },
  { name: "مریم حسینی", role: "بوتیک پوشاک، اصفهان",   text: "تنوع کالکشن‌هایی که برامون می‌فرستن عالیه. مشتری‌هامون خیلی راضی هستن." },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // hero entrance
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure content is visible initially if needed, then animate
      gsap.set(".hero-minimal-content > *", { autoAlpha: 0, y: 30 });

      tl.to(".hero-minimal-content > *", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5
      })
        .from(".floating-card", { scale: 0.8, autoAlpha: 0, stagger: 0.2, duration: 1.2, ease: "back.out(1.2)" }, "-=1")
        .from(".hero-side-element", { x: 50, autoAlpha: 0, duration: 1 }, "-=1");
      
      gsap.from(".hero-bg-img", { scale: 1.2, duration: 5, ease: "power2.out" });

      // Magic reveals for sections
      gsap.utils.toArray<HTMLElement>(".reveal-wow").forEach((el) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Slogan section whole reveal
      gsap.from(".slogan-content-wrapper", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".slogan-section-trigger",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Refresh all triggers after setup
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>} className="bg-[#fafaf9] relative">
      {/* Luxury Grainy Overlay */}
      <div className="grain-overlay" />

      {/* MINIMAL & MODERN HERO */}
      <section ref={heroRef} className="relative h-[100vh] flex items-start md:items-center justify-center pt-[25vh] md:pt-0 overflow-hidden">
        {/* Clean Background with Subtle Parallax */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <img
            src="/images/hero2.webp"
            alt="دبی بازار"
            className="hero-bg-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Side Branding - Vertical */}
        <div className="hero-side-element absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-12">
          <div className="w-px h-24 bg-white/20" />
          <div className="vertical-text text-white/40 font-black tracking-[0.5em] uppercase text-[10px] whitespace-nowrap">
            Est. 2024 • Dubai Bazaar Boutique
          </div>
          <div className="w-px h-24 bg-white/20" />
        </div>

        <motion.div style={{ opacity: opacityHero }} className="container-x relative z-10 w-full">
          <div className="hero-minimal-content flex flex-col items-center text-center max-w-5xl mx-auto px-4">
            {/* New Title Section */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                خرید مستقیم <span className="text-brand-gold glow-text-gold">از دبی</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-px w-8 sm:w-12 bg-brand-gold/50" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90">تک و عمده</span>
                <div className="h-px w-8 sm:w-12 bg-brand-gold/50" />
              </div>
            </div>
            
            {/* Interactive Call to Actions */}
            <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mt-6 w-auto">
              <Link to="/wholesale" className="group relative w-auto">
                <div className="absolute -inset-3 bg-brand-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative px-6 md:px-10 py-3 md:py-4 rounded-full bg-white/20 backdrop-blur-3xl saturate-150 border border-white/30 text-white transition-all duration-700 group-hover:scale-105 group-hover:bg-white/30 group-hover:border-white/50 shadow-2xl">
                  <div className="relative z-10 flex items-center justify-center gap-2 md:gap-4">
                    <span className="font-bold text-base md:text-lg tracking-tight text-white">ثبت سفارش</span>
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-[-4px] transition-transform duration-500" />
                  </div>
                </div>
              </Link>
              
              <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 md:gap-4 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/20 backdrop-blur-3xl saturate-150 border border-white/30 text-white hover:text-white hover:bg-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl w-auto">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
                <span className="font-bold text-base md:text-lg text-white">واتساپ</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Floating Abstract Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left - Fast Shipping */}
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="floating-card absolute top-[20%] left-[5%] hidden xl:flex items-center gap-4 p-4 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Zap className="w-5 h-5" />
            </div>
            <div className="pr-2">
              <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-0.5">Express Delivery</div>
              <div className="text-xs font-bold text-white">ارسال سریع</div>
            </div>
          </motion.div>

          {/* Center Left - Authentic */}
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="floating-card absolute top-[75%] md:top-[65%] left-[20%] md:left-[15%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-6 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-20 scale-75 md:scale-100"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="pl-1 md:pl-2">
              <div className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5 md:mb-1">Guaranteed</div>
              <div className="text-xs md:text-sm font-bold text-white">ضمانت اصالت کالا</div>
            </div>
          </motion.div>

          {/* Center Bottom - Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] rotate-180 vertical-text h-20">Scroll</div>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* LUXURY SLOGAN SECTION - REDESIGNED */}
      <section className="relative min-h-[auto] md:min-h-screen bg-brand-deep flex items-center pt-16 pb-20 md:py-32 overflow-hidden">
        {/* Background Image with Masking */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="/images/99.webp" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-brand-deep/60" />
        </div>

        <div className="container-x relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Side - Large Typography */}
            <div className="flex-1 text-right lg:text-right order-1 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 md:space-y-6"
              >
                <span className="text-brand-gold font-black tracking-[0.5em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs block mb-2 md:mb-4">The Dubai Experience</span>
                <h2 className="text-4xl md:text-9xl font-black text-white leading-tight md:leading-[1.1] tracking-tighter">
                  از دبی <span className="hidden md:inline"><br /></span>
                  <span className="text-brand-gold glow-text-gold">حضوری</span> <span className="hidden md:inline"><br /></span>
                  خرید کن!
                </h2>
                <p className="text-white/60 text-base md:text-2xl max-w-xl mr-0 ml-auto leading-relaxed font-medium pt-4 md:pt-8 border-r-4 border-brand-gold/30 pr-6 md:pr-8">
                  ما فاصله را برای شما از بین برده‌ایم. هر آنچه در بازارهای دبی می‌پسندید را با یک کلیک درب منزل تحویل بگیرید.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Floating Glass Cards */}
            <div className="flex-1 w-full max-w-2xl order-2">
              <div className="relative space-y-8">
                {[
                  { icon: Package, title: "خرید مستقیم و بدون واسطه", desc: "تیم ما در دبی به صورت حضوری بهترین قیمت‌ها را برای شما شکار می‌کند." },
                  { icon: Truck, title: "ارسال سریع به سراسر کشور", desc: "بسته‌های شما با اولویت بالا و ایمنی کامل در کمترین زمان ممکن ارسال می‌شوند." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-brand-gold/40 transition-all duration-700 group"
                  >
                    <div className="flex items-center gap-4 md:gap-8 flex-row-reverse">
                      <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-[2rem] bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                        <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                        <p className="text-white/40 leading-relaxed text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* WhatsApp Action Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-brand-gold text-brand-deep shadow-glow-sm group hover:scale-[1.02] transition-all duration-500"
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <p className="text-lg md:text-xl font-black leading-tight">برای شروع مشاوره رایگان و ثبت سفارش</p>
                    <a href={SITE.whatsappUrl} className="flex items-center gap-4 bg-brand-deep text-brand-gold px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-lg md:text-xl shadow-2xl hover:bg-white hover:text-brand-deep transition-all w-full md:w-auto justify-center">
                      <MessageCircle className="w-6 h-6" /> همین حالا پیام بده
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM MODERN CATEGORIES SECTION */}
      <section className="py-20 md:py-40 bg-[#0F2C21] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="container-x relative z-10">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="text-brand-gold font-black tracking-[0.5em] uppercase text-[10px] block mb-4">Product Collections</span>
              <h2 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 md:mb-8">
                دسته بندی <span className="text-brand-gold">محصولات</span>
              </h2>
              <div className="w-20 h-1 bg-brand-gold/30 mx-auto rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8">
            {categories.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="group"
              >
                <Link to="/wholesale" className="flex flex-col items-center">
                  {/* Circular Image Container */}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4">
                    <div className="absolute inset-0 rounded-full border border-brand-gold/30 scale-110 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full border border-brand-gold/20 scale-125 group-hover:scale-150 transition-transform duration-1000 pointer-events-none opacity-0 group-hover:opacity-100" />
                    
                    <div 
                      className="relative w-full h-full rounded-full overflow-hidden bg-brand-deep shadow-2xl border-4 border-brand-green/20 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-brand-gold/20 group-hover:-translate-y-2"
                      style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                    >
                      <img 
                        src={c.image} 
                        alt={c.label}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 rounded-full"
                      />
                      
                      {/* Centered Icon on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-deep/30 backdrop-blur-[2px] rounded-full">
                        <c.icon className="w-8 h-8 text-brand-gold" />
                      </div>
                    </div>
                  </div>

                  {/* Minimal Label */}
                  <div className="text-center">
                    <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest block mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">{c.labelEn}</span>
                    <h3 className="text-lg md:text-xl font-black text-white group-hover:text-brand-gold transition-colors duration-500">{c.label}</h3>
                    <div className="w-0 h-0.5 bg-brand-gold mx-auto mt-2 group-hover:w-full transition-all duration-700" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - ULTRA MODERN REDESIGN */}
      <section className="py-24 bg-[#fafaf9] relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/[0.03] rotate-12 rounded-[10rem] pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-brand-gold font-black tracking-[1em] uppercase text-[10px] block">The Protocol</span>
              <h2 className="text-3xl md:text-7xl font-black text-brand-deep tracking-tighter leading-none">
                مسیر <span className="text-brand-gold">هوشمند</span> خرید
              </h2>
              <p className="text-brand-deep/40 text-lg font-medium max-w-xl mx-auto pt-4">
                ما فرآیند سنتی بازرگانی را با تکنولوژی ادغام کرده‌ایم تا خریدی سریع، ایمن و شفاف را تجربه کنید.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Animated SVG Path (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-brand-gold/20 hidden lg:block overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-40 h-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 relative">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative"
                >
                  {/* Step Card */}
                  <div className="relative p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] bg-white border border-brand-deep/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_60px_120px_-30px_rgba(201,169,97,0.2)] group-hover:-translate-y-4">
                    
                    {/* Index Number */}
                    <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-deep text-brand-gold flex items-center justify-center font-black text-xl md:text-2xl border-4 md:border-8 border-[#fafaf9] shadow-2xl group-hover:bg-brand-gold group-hover:text-brand-deep transition-all duration-500">
                      {s.n}
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-brand-gold/5 flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                        <s.icon className="w-10 h-10 md:w-12 md:h-12 text-brand-gold" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-brand-deep mb-4 md:mb-6 group-hover:text-brand-gold transition-colors">{s.title}</h3>
                      <p className="text-brand-deep/40 text-base md:text-lg leading-relaxed font-medium">
                        {s.desc}
                      </p>
                    </div>

                    {/* Interactive Bottom Accent */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-brand-gold/20 rounded-full group-hover:w-1/2 group-hover:bg-brand-gold transition-all duration-700" />
                  </div>
                  
                  {/* Step Connection Indicator (Mobile) */}
                  <div className="h-20 w-px bg-brand-gold/20 mx-auto lg:hidden last:hidden" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - ULTRA MODERN DRAGGABLE CAROUSEL */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container-x relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="text-brand-gold font-black tracking-[0.8em] uppercase text-[10px] block mb-6">Voice of Trust</span>
              <h2 className="text-3xl md:text-7xl font-black text-brand-deep tracking-tighter leading-none mb-6 md:mb-8">
                رضایت، فراتر از <span className="text-brand-gold">کلمات</span>
              </h2>
              <p className="text-brand-deep/40 text-lg font-medium max-w-xl mx-auto">
                اعتماد شما، بزرگترین سرمایه ماست. نظرات برخی از همراهان همیشگی دبی بازار را بخوانید.
              </p>
            </motion.div>
          </div>

          <div className="relative cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: (testimonials.length - 1) * 400 }}
              className="flex flex-row-reverse gap-8 px-4"
              style={{ width: "fit-content" }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="w-[300px] md:w-[380px] shrink-0"
                >
                  <div className="relative p-8 md:p-10 rounded-[3rem] bg-[#f8f9fa] border border-brand-deep/5 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] group h-full flex flex-col justify-between">
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Quote className="w-6 h-6 fill-current" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl font-medium text-brand-deep leading-relaxed mb-8 text-right italic">
                        {t.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-row-reverse">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${i + 30}`} 
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-brand-deep">{t.name}</div>
                        <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-0.5">
                          {t.role}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Background Number */}
                    <div className="absolute -bottom-2 -left-2 text-[6rem] font-black text-brand-deep/[0.02] leading-none select-none pointer-events-none group-hover:text-brand-gold/[0.05] transition-colors duration-700">
                      0{i + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Drag Hint */}
            <div className="flex justify-center mt-20 gap-3">
              {testimonials.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-brand-deep/10" />
              ))}
            </div>
            <div className="text-center mt-6">
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] animate-pulse">
                Drag to explore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - BRANDED MODERN DESIGN */}
      <section className="py-32 px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-brand-deep min-h-[60vh] flex items-center justify-center text-center"
        >
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-brand-gold font-black tracking-[0.5em] uppercase text-[10px] block">Elevate Your Sourcing</span>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                  آماده‌اید تجربه خرید خود را <br /> 
                  <span className="text-brand-gold glow-text-gold">متحول کنید؟</span>
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link to="/wholesale" className="btn-gold !px-12 !py-5 text-lg shadow-glow">
                  ثبت سفارش عمده <ArrowLeft className="w-5 h-5" />
                </Link>
                
                <a href={SITE.whatsappUrl} className="btn-ghost !bg-white/5 !text-white !border-white/10 hover:!bg-white/10 !px-12 !py-5 text-lg backdrop-blur-md">
                  <MessageCircle className="w-5 h-5 text-brand-gold" /> 
                  مشاوره رایگان
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>


    </div>
  );
}
