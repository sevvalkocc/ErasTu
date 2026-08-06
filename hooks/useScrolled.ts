"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by the Header to transition from transparent → solid background.
 *
 * Passive listener + requestAnimationFrame = zero jank, no layout thrash.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number;

    function handleScroll() {
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    }

    // Set initial state (handles page reload mid-scroll)
    setScrolled(window.scrollY > threshold);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return scrolled;
}
