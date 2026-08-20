import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered slide-in reveal using IntersectionObserver.
 * Elements start off-screen and slide in from the specified direction.
 */
export function useScrollReveal(
  options: { delay?: number; direction?: "left" | "right" } = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReady]);

  const delay = options.delay ?? 0;
  const dir = options.direction ?? "left";
  const x = dir === "left" ? "-60px" : "60px";

  const style: React.CSSProperties = {
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    ...(isVisible
      ? { opacity: 1, transform: "none" }
      : { opacity: 0, transform: `translateX(${x})` }),
  };

  return { ref, style, isVisible };
}
