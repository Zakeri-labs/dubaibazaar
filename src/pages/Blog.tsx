import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { POSTS, CATEGORIES } from "@/lib/posts";
import { useReveal } from "@/lib/useReveal";
import { fa } from "@/lib/fa";

const PAGE_SIZE = 6;

export default function Blog() {
  const revealRef = useReveal();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("همه");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => POSTS.filter((p) => cat === "همه" || p.category === cat),
    [cat]
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>} className="pt-32">
      <section className="container-x text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">وبلاگ</span>
          <h1 className="heading text-5xl md:text-7xl mb-6">نکته‌ها از <span className="text-brand-gold">دل دبی</span></h1>
          <p className="text-lg text-brand-ink/70 leading-9">
            راهنماها، اخبار بازار و نکات حرفه‌ای خرید برای خریداران تک و عمده.
          </p>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <section className="container-x mt-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setPage(1); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                cat === c
                  ? "bg-brand-green text-brand-gold shadow-soft"
                  : "bg-white text-brand-ink/70 hover:bg-brand-sand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="container-x section">
        {slice.length === 0 ? (
          <div className="text-center text-brand-ink/60 py-20">مقاله‌ای در این دسته وجود ندارد.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slice.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08 }}
              >
                <Link to={`/blog/${p.slug}`} className="block card !p-0 overflow-hidden group hover:-translate-y-2 hover:shadow-glow h-full">
                  <div className="aspect-[16/10] relative overflow-hidden bg-brand-deep">
                    <img 
                      src={p.image} 
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-brand-cream/95 text-brand-green text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur shadow-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-brand-ink/55 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                      <span>•</span>
                      <span>{fa(p.readMinutes)} دقیقه مطالعه</span>
                    </div>
                    <h2 className="font-black text-xl text-brand-green leading-8 group-hover:text-brand-gold transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-brand-ink/65 text-sm mt-3 leading-7 line-clamp-2">{p.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-brand-green font-bold text-sm group-hover:gap-3 transition-all">
                      بیشتر بخوان <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-14">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-11 h-11 rounded-full font-bold transition-all ${
                  page === n
                    ? "bg-brand-green text-brand-gold shadow-soft"
                    : "bg-white text-brand-ink/60 hover:bg-brand-sand"
                }`}
              >
                {fa(n)}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
