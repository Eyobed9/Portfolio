import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/useTheme";

/**
 * Cursor-following glow, the signature lighting effect on brittanychiang.com:
 * a large, soft radial gradient pinned to the viewport that tracks the pointer.
 *
 * Three deliberate choices:
 * - Position is written to CSS custom properties on the element inside a rAF,
 *   so a burst of mousemove events collapses into at most one paint per frame
 *   and React never re-renders on pointer movement.
 * - It only mounts for a fine pointer (mouse/trackpad). Touch devices have no
 *   hover, so the glow would just sit wherever the last tap landed.
 * - It is skipped entirely under prefers-reduced-motion.
 */
const Spotlight = () => {
  const { isDark } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // Resolved once, during the first render, rather than in an effect: settling
  // it in an effect would mount the layer and then immediately re-render.
  const [enabled] = useState(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;
        element.style.setProperty("--spotlight-x", `${event.clientX}px`);
        element.style.setProperty("--spotlight-y", `${event.clientY}px`);
        element.style.opacity = "1";
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Kept low so the glow lights the page without eating text contrast, since
  // like the reference this layer sits above the content.
  const glow = isDark ? "rgba(100, 255, 218, 0.10)" : "rgba(13, 148, 136, 0.07)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${glow}, transparent 80%)`,
      }}
    />
  );
};

export default Spotlight;
