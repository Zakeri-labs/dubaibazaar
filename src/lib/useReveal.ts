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
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    start?: string;
    delay?: number;
    ease?: string;
  } = {}
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(selector);
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: options.y ?? 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: options.duration ?? 1,
            delay: (options.delay ?? 0) + i * (options.stagger ?? 0.1),
            ease: options.ease ?? "power3.out",
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
  }, [
    selector,
    options.stagger,
    options.y,
    options.duration,
    options.start,
    options.delay,
    options.ease,
  ]);
  return ref;
}

export { gsap, ScrollTrigger };
