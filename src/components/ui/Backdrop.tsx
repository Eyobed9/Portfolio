import { useTheme } from "@/context/useTheme";

/**
 * The page's background texture: a fine grid sitting between the flat ground
 * colour and the content.
 *
 * Drawn with CSS gradients rather than an image so it scales to any viewport,
 * costs no request, and can be tinted per theme. Kept deliberately
 * low-contrast, and masked so it fades out down the page instead of running
 * into the footer.
 */
const Backdrop = () => {
  const { isDark } = useTheme();
  const line = isDark ? "rgba(136, 146, 176, 0.10)" : "rgba(15, 23, 42, 0.07)";
  const fade =
    "radial-gradient(ellipse 100% 80% at 50% 0%, black 40%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
};

export default Backdrop;
