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
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
