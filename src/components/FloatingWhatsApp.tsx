import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-40 group animate-bounce-in"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 blur-xl group-hover:bg-emerald-500/60 transition-colors" />
      <span className="relative w-16 h-16 rounded-full bg-emerald-500 text-white grid place-items-center shadow-2xl group-hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full border-2 border-white animate-pulse" />
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-brand-ink text-brand-cream text-xs px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        پیام در واتساپ
      </span>
    </a>
  );
}
