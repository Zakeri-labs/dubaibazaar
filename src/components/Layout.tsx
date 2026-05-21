import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ScrollToTop from "./ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const loc = useLocation();
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
