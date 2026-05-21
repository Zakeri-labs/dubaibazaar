import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ScrollToTop from "./ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Layout() {
  const loc = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger after a small delay to ensure DOM is ready
    // We do it multiple times to catch any layout shifts
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [loc.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={loc.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
