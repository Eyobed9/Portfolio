import { HEADER_OFFSET } from "@/config/sections";

/**
 * Scrolls the page to an in-page section, offsetting the sticky header and
 * keeping the URL hash in sync without pushing a history entry per click.
 * Falls back to an instant jump when the visitor prefers reduced motion.
 */
export const scrollToSection = (sectionId: string) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  history.replaceState(null, "", sectionId === "home" ? " " : `#${sectionId}`);
};
