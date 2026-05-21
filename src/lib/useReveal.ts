import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates direct children matching `.reveal` selector via ScrollTrigger.
 * Stagger fade-up; RTL friendly (no horizontal shift).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  selector: string = ".reveal",
  options: { stagger?: number; y?: number; duration?: number; start?: string } = {}
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(selector);
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: options.y ?? 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: options.duration ?? 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start ?? "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [selector, options.stagger, options.y, options.duration, options.start]);
  return ref;
}

export { gsap, ScrollTrigger };
