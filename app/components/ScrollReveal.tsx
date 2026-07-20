"use client";

import { useEffect } from "react";

/**
 * Scroll-only motion polish, ported from the v14 mockup's second inline
 * script: kanji parallax drift + a gentle per-section reveal. Renders
 * nothing — everything above the fold (the hero entrance) is pure CSS/JS
 * in <Hero> and never waits on this.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add("gsap");

        ctx = gsap.context(() => {
          gsap.to("#kanji", {
            yPercent: 24,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
          });

          gsap.utils.toArray<HTMLElement>("section.block").forEach((sec) => {
            gsap.fromTo(
              sec,
              { y: 12, opacity: 0.6 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: sec, start: "top 92%" },
              }
            );
          });
        });
      });
    });

    return () => ctx?.revert();
  }, []);

  return null;
}
