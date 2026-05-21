import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Instagram } from "@/components/icons";
import { NAV, SITE } from "@/lib/site";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
        scrolled
          ? "py-3 bg-transparent"
          : "py-6 bg-brand-ink/40 backdrop-blur-xl"
      }`}
    >
      <div className={`container-x flex items-center ${scrolled ? "justify-center" : "justify-between"}`}>
        <div className={`transition-all duration-500 ${scrolled ? "opacity-0 invisible w-0 -translate-x-4" : "opacity-100 visible w-auto"}`}>
          <Link to="/" className="flex items-center gap-3 group whitespace-nowrap">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-glow group-hover:rotate-6 transition-transform">
              <img src="/images/logo.webp" alt={SITE.brandFa} className="w-full h-full object-cover" />
            </div>
            <span className="flex flex-col leading-none">
              <span className="font-black text-xl text-white">{SITE.brandFa}</span>
              <span className="text-[10px] tracking-wider font-bold text-brand-goldlight">🇦🇪 DubaiBazaar.ir</span>
            </span>
          </Link>
        </div>

        <nav className={`hidden lg:flex items-center gap-2 backdrop-blur-3xl border transition-all duration-500 px-2 py-1.5 rounded-2xl ${
          scrolled 
            ? "bg-[#0F2C21] border-white/20 shadow-2xl scale-110" 
            : "bg-white/5 border-white/10"
        }`}>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `relative px-5 py-2 text-sm font-bold transition-all rounded-xl ${
                  isActive 
                    ? "text-brand-deep bg-brand-gold shadow-glow" 
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className={`hidden lg:flex items-center gap-4 transition-all duration-500 ${scrolled ? "opacity-0 invisible w-0 translate-x-4" : "opacity-100 visible w-auto"}`}>
          <a href={SITE.instagramUrl} target="_blank" rel="noreferrer"
            className={`w-11 h-11 grid place-items-center rounded-2xl border transition-all duration-500 backdrop-blur-xl ${
              scrolled
                ? "bg-brand-deep/90 border-white/10 text-white hover:bg-brand-gold hover:text-brand-deep shadow-2xl"
                : "bg-white/10 border-white/10 text-white hover:bg-brand-gold hover:text-brand-deep"
            }`}>
            <Instagram className="w-5 h-5" />
          </a>
          <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary !py-3 !px-7 text-sm shadow-glow whitespace-nowrap">
            تماس واتساپ
          </a>
        </div>

        <button
          className={`lg:hidden w-12 h-12 grid place-items-center rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "opacity-0 invisible w-0"
              : "bg-white/10 border-white/10 text-white"
          }`}
          onClick={() => setOpen(true)}
          aria-label="منو"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-brand-ink/60 backdrop-blur-md z-[110]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-full bg-white z-[120] p-8 flex flex-col shadow-2xl"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                    <img src="/images/logo.webp" alt={SITE.brandFa} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-black text-2xl text-brand-green">{SITE.brandFa}</span>
                </div>
                <button onClick={() => setOpen(false)} className="w-12 h-12 grid place-items-center rounded-2xl bg-brand-green/5 text-brand-green hover:bg-brand-green/10 transition-colors">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={n.to}
                      end={n.to === "/"}
                      className={({ isActive }) =>
                        `block px-4 py-4 rounded-2xl text-lg font-bold transition-colors ${
                          isActive ? "bg-brand-green text-brand-cream shadow-glow" : "text-brand-ink hover:bg-brand-green/5"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="btn-gold mt-auto">
                ارتباط در واتساپ
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
