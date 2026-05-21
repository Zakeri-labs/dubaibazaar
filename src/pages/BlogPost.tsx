import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Copy, Send, MessageCircle, Check } from "lucide-react";
import { Instagram } from "@/components/icons";
import { POSTS } from "@/lib/posts";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-brand.jpg";
import { fa } from "@/lib/fa";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <div className="pt-40 text-center container-x">
        <h1 className="heading text-4xl">مقاله پیدا نشد</h1>
        <Link to="/blog" className="btn-primary mt-6">بازگشت به وبلاگ</Link>
      </div>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  return (
    <div className="pt-24">
      {/* progress bar */}
      <div className="fixed top-0 inset-x-0 h-1 z-[60] bg-transparent">
        <div className="h-full bg-gradient-to-l from-brand-gold to-brand-green transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="h-[55vh] min-h-[400px] relative overflow-hidden bg-brand-deep">
          <img 
            src={post.image} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-transparent" />
          <div className="container-x relative h-full flex flex-col justify-end pb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-brand-cream/80 hover:text-brand-gold text-sm mb-5">
                <ArrowLeft className="w-4 h-4 rotate-180" /> بازگشت به وبلاگ
              </Link>
              <span className="inline-block bg-brand-gold text-brand-deep text-xs font-bold px-3 py-1.5 rounded-full">
                <Tag className="w-3 h-3 inline ml-1" /> {post.category}
              </span>
              <h1 className="font-display font-black text-brand-cream text-4xl md:text-6xl leading-tight mt-5 max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-brand-cream/70 text-sm mt-6">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {fa(post.readMinutes)} دقیقه مطالعه</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="container-x max-w-3xl py-16">
        <p className="text-xl text-brand-ink/80 leading-9 font-medium mb-8 border-r-4 border-brand-gold pr-5">
          {post.excerpt}
        </p>
        <div className="space-y-6 text-brand-ink/85 leading-9 text-[17px]">
          {post.content.map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              {p}
            </motion.p>
          ))}
        </div>

        {/* SHARE */}
        <div className="mt-12 pt-8 border-t border-brand-green/10">
          <div className="text-sm font-bold text-brand-green mb-4">به اشتراک بگذار:</div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.instagramUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-l from-pink-500 to-amber-500 text-white text-sm font-bold hover:scale-105 transition-transform">
              <Instagram className="w-4 h-4" /> اینستاگرام
            </a>
            <a href={`${SITE.whatsappUrl}?text=${encodeURIComponent(post.title + " " + shareUrl)}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" /> واتساپ
            </a>
            <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-500 text-white text-sm font-bold hover:scale-105 transition-transform">
              <Send className="w-4 h-4" /> تلگرام
            </a>
            <button onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-green text-brand-gold text-sm font-bold hover:scale-105 transition-transform">
              {copied ? <><Check className="w-4 h-4" /> کپی شد</> : <><Copy className="w-4 h-4" /> کپی لینک</>}
            </button>
          </div>
        </div>

        {/* AUTHOR */}
        <div className="card mt-10 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
          <img src={heroImg} alt="نویسنده" className="w-24 h-24 rounded-2xl object-cover" />
          <div>
            <div className="text-xs text-brand-gold tracking-wider font-bold">نویسنده</div>
            <h3 className="font-black text-brand-green text-xl mt-1">دبی بازار</h3>
            <p className="text-brand-ink/65 text-sm mt-2 leading-7">
              مستقر در دبی، با ۵ سال تجربه در واردات مستقیم پوشاک، کیف، آرایشی و الکترونیک به ایران.
            </p>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="section bg-brand-sand/60">
        <div className="container-x">
          <h2 className="heading text-3xl md:text-4xl mb-10 text-center">مقالات مرتبط</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="card !p-0 overflow-hidden group hover:-translate-y-2 hover:shadow-glow">
                <div className="aspect-[16/10] relative overflow-hidden bg-brand-deep">
                  <img 
                    src={r.image} 
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-brand-gold font-bold mb-2">{r.category}</div>
                  <h3 className="font-black text-brand-green leading-7 group-hover:text-brand-gold transition-colors">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
