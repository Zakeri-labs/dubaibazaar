import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, Tag, Layers, Truck, Headphones, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site";
import { useReveal } from "@/lib/useReveal";

type FormData = {
  name: string;
  phone: string;
  category: string;
  description: string;
  quantity: string;
  budget: string;
  contact: "واتساپ" | "تلگرام" | "تماس";
};

const benefits = [
  { icon: Tag,       title: "قیمت کمتر",       desc: "حذف چند واسطه و خرید مستقیم از مرکز توزیع." },
  { icon: Layers,    title: "تنوع بالاتر",     desc: "دسترسی به طیف وسیعی از برندها و طرح‌ها." },
  { icon: Truck,     title: "ارسال مستقیم",    desc: "حمل به سراسر ایران با بیمه کامل." },
  { icon: Headphones,title: "پشتیبانی اختصاصی",desc: "از ثبت سفارش تا پس از تحویل، در کنار شما." },
];

const faqs = [
  { q: "حداقل سفارش عمده چقدر است؟", a: "حداقل سفارش بسته به نوع کالا متفاوت است. برای پوشاک از ۲۰ عدد و برای آرایشی از ۵۰ عدد آغاز می‌شود. برای جزئیات دقیق در واتساپ مشورت بگیرید." },
  { q: "زمان تحویل سفارش چقدر طول می‌کشد؟", a: "بسته به روش ارسال، بین ۳ تا ۱۰ روز کاری. ارسال هوایی سریع‌تر و دریایی اقتصادی‌تر است." },
  { q: "روش پرداخت چگونه است؟", a: "پیش‌پرداخت برای شروع خرید و تسویه نهایی پیش از ارسال. تمام تراکنش‌ها با فاکتور رسمی ثبت می‌شوند." },
  { q: "آیا ضمانت اصل بودن کالا دارید؟", a: "بله. تمام محصولات آرایشی و الکترونیک با فاکتور رسمی و در صورت نیاز کد رهگیری برند ارسال می‌شود." },
  { q: "آیا امکان سفارش اختصاصی هست؟", a: "بله. اگر مدل، برند یا کالای خاصی مدنظر دارید، در فرم درج کنید تا برایتان تأمین کنیم." },
];

export default function Wholesale() {
  const revealRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { contact: "واتساپ" },
  });

  const onSubmit = (data: FormData) => {
    // Compose WhatsApp message
    const msg = `سلام، سفارش عمده جدید:%0A👤 ${data.name}%0A📱 ${data.phone}%0A🗂 ${data.category}%0A📦 تعداد: ${data.quantity}%0A💰 بودجه: ${data.budget}%0A📝 ${data.description}%0A📞 ترجیح: ${data.contact}`;
    setSubmitted(true);
    setTimeout(() => {
      window.open(`${SITE.whatsappUrl}?text=${msg}`, "_blank");
    }, 1200);
    reset();
  };

  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>}>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero1.webp" alt="سفارش عمده دبی" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-deep/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/40 via-transparent to-brand-deep" />
        </div>

        <div className="container-x relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow !text-brand-gold">ثبت سفارش</span>
            <h1 className="heading text-5xl md:text-8xl mb-8 text-white leading-tight">ثبت سفارش مستقیم <br /><span className="text-brand-gold">از قلب دبی</span></h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              برای فروشگاه، بوتیک، یا کسب‌وکار خودت سفارش عمده ثبت کن و با قیمت خرید واقعی بازار دبی، کالا تحویل بگیر.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section bg-brand-cream relative z-10 -mt-10 rounded-t-[3rem]">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="card text-center hover:shadow-glow bg-white p-8 rounded-[2rem] border border-brand-green/5 transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-gold/10 text-brand-gold grid place-items-center mb-6 shadow-sm">
                <b.icon className="w-10 h-10" />
              </div>
              <h3 className="font-black text-brand-green text-2xl">{b.title}</h3>
              <p className="text-brand-ink/60 text-base mt-3 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="section bg-brand-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-fade opacity-30" />
        <div className="container-x max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="eyebrow !text-brand-gold">فرم سفارش</span>
              <h2 className="heading text-5xl md:text-6xl text-white mt-4">جزئیات سفارش‌ات را بفرست</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-green text-brand-cream z-10 grid place-items-center text-center p-8"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}>
                    <div className="w-24 h-24 rounded-full bg-brand-gold text-brand-deep grid place-items-center mx-auto mb-6 shadow-glow">
                      <Check className="w-12 h-12" />
                    </div>
                    <h3 className="heading text-4xl !text-brand-cream">سفارش‌ات ثبت شد!</h3>
                    <p className="mt-4 text-brand-cream/80 text-lg">داریم شما را به واتساپ منتقل می‌کنیم...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
              <Field label="نام و نام خانوادگی" error={errors.name?.message}>
                <input {...register("name", { required: "این فیلد الزامی است" })} className={inputCls} placeholder="مثلاً علی رضایی" />
              </Field>
              <Field label="شماره موبایل" error={errors.phone?.message}>
                <input dir="ltr" {...register("phone", { required: "الزامی", pattern: { value: /^[0-9+\s-]{8,}$/, message: "شماره معتبر نیست" } })}
                  className={inputCls + " text-right"} placeholder="09xxxxxxxxx" />
              </Field>
              <Field label="نوع کالا / دسته‌بندی" error={errors.category?.message}>
                <select {...register("category", { required: "انتخاب کنید" })} className={inputCls}>
                  <option value="">یک دسته انتخاب کنید</option>
                  {["لباس", "کیف", "آرایشی", "اکسسوری", "الکترونیک", "سایر"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="تعداد / حجم تقریبی" error={errors.quantity?.message}>
                <input {...register("quantity", { required: "الزامی" })} className={inputCls} placeholder="مثلاً ۱۰۰ عدد" />
              </Field>
              <Field label="بودجه تقریبی" error={errors.budget?.message}>
                <input {...register("budget", { required: "الزامی" })} className={inputCls} placeholder="مثلاً ۲۰۰ میلیون تومان" />
              </Field>
              <Field label="روش تماس ترجیحی">
                <div className="flex gap-3 mt-2">
                  {(["واتساپ", "تلگرام", "تماس"] as const).map((c) => (
                    <label key={c} className="flex-1 cursor-pointer">
                      <input type="radio" value={c} {...register("contact")} className="peer sr-only" />
                      <div className="text-center text-sm font-bold py-4 rounded-2xl border-2 border-white/10 text-white peer-checked:border-brand-gold peer-checked:bg-brand-gold peer-checked:text-brand-deep transition-all backdrop-blur-sm">
                        {c}
                      </div>
                    </label>
                  ))}
                </div>
              </Field>
              <div className="md:col-span-2">
                <Field label="توضیحات سفارش" error={errors.description?.message}>
                  <textarea rows={4} {...register("description", { required: "توضیحات را وارد کنید" })}
                    className={inputCls + " resize-none"} placeholder="جزئیات بیشتر دربارهٔ کالا، برند، سایز و..." />
                </Field>
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="btn-gold w-full text-lg !py-5 shadow-glow">
                  <MessageCircle className="w-6 h-6" /> ارسال سفارش در واتساپ
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-brand-cream">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="eyebrow">سوالات متداول</span>
              <h2 className="heading text-5xl md:text-6xl mt-4">پاسخ سوالات رایج</h2>
            </motion.div>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls = "w-full bg-white/5 border-2 border-white/10 text-white focus:border-brand-gold focus:bg-white/10 rounded-2xl px-5 py-4 outline-none transition-all placeholder:text-white/30";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-brand-goldlight mb-3 mr-1">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-400 mt-2 mr-1">{error}</span>}
    </label>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white rounded-[2rem] border border-brand-green/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen(!open)} className="w-full text-right p-6 md:p-8 flex items-center justify-between gap-6 group">
        <span className="font-black text-brand-green text-xl group-hover:text-brand-gold transition-colors">{q}</span>
        <div className={`w-10 h-10 rounded-xl bg-brand-green/5 grid place-items-center transition-all ${open ? "bg-brand-gold text-brand-deep rotate-180" : "text-brand-gold"}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="px-8 pb-8 text-brand-ink/70 text-lg leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
