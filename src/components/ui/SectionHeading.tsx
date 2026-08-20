import { useTheme } from "@/context/useTheme";
import { tones } from "@/config/palette";

/**
 * Section label in the reference's style: small, uppercase, wide-tracked.
 *
 * On narrow screens it sticks to the top of the viewport as you scroll past it,
 * which is how the reference keeps you oriented once the left rail has scrolled
 * away. On large screens the rail is always visible, so it sits inline.
 */
const SectionHeading = ({ title }: { title: string }) => {
  const { isDark } = useTheme();
  const c = tones(isDark);

  return (
    <div
      className={`sticky top-16 z-20 -mx-6 mb-8 w-screen px-6 py-4 backdrop-blur-sm lg:static lg:mx-0 lg:w-auto lg:px-0 lg:py-0 lg:backdrop-blur-none ${
        isDark ? "bg-[#0a192f]/80" : "bg-[#e5e7ea]/80"
      } lg:bg-transparent`}
    >
      <h2
        className={`font-mono text-sm font-bold uppercase tracking-widest ${c.heading}`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
