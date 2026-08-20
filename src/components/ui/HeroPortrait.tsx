import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import heroImg from "@/assets/hero.jpg";

/**
 * Large hero portrait with glowing halo ring and floating code chevrons.
 * Sits at the top of the scrollable right column so it scrolls away while
 * the SideRail text stays sticky on the left.
 */
const HeroPortrait = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);

  const chevronColor = isDark ? "text-[#64ffda]/40" : "text-teal-500/30";
  const chevronDim = isDark ? "text-[#64ffda]/20" : "text-teal-500/15";

  return (
    <div
      className={`relative mx-auto mb-12 flex items-center justify-center lg:mb-16 ${c.heading}`}
      style={{ width: "100%", maxWidth: "420px", height: "420px" }}
    >
      {/* Outer radial glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Thick glowing halo ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "16px",
          border: isDark
            ? "3px solid rgba(100,255,218,0.25)"
            : "3px solid rgba(13,148,136,0.20)",
          boxShadow: isDark
            ? "0 0 40px rgba(100,255,218,0.18), inset 0 0 40px rgba(100,255,218,0.04)"
            : "0 0 40px rgba(13,148,136,0.12), inset 0 0 40px rgba(13,148,136,0.03)",
        }}
      />

      {/* Inner accent ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "30px",
          border: isDark
            ? "1px solid rgba(100,255,218,0.12)"
            : "1px solid rgba(13,148,136,0.10)",
        }}
      />

      {/* Floating chevrons */}
      <span
        className={`absolute font-mono text-3xl font-bold select-none ${chevronColor}`}
        style={{ top: "10%", left: "-4px", animation: "floatY 3s ease-in-out infinite" }}
      >
        &lt;
      </span>
      <span
        className={`absolute font-mono text-3xl font-bold select-none ${chevronColor}`}
        style={{ bottom: "10%", right: "-4px", animation: "floatY 3s ease-in-out infinite 1.5s" }}
      >
        &gt;
      </span>
      <span
        className={`absolute font-mono text-xl font-bold select-none ${chevronDim}`}
        style={{ top: "2%", right: "18%", animation: "floatY 4s ease-in-out infinite 0.8s" }}
      >
        /&gt;
      </span>
      <span
        className={`absolute font-mono text-xl font-bold select-none ${chevronDim}`}
        style={{ bottom: "2%", left: "18%", animation: "floatY 4s ease-in-out infinite 2.2s" }}
      >
        &lt;/
      </span>
      <span
        className={`absolute font-mono text-lg font-bold select-none ${chevronDim}`}
        style={{ top: "45%", left: "-16px", animation: "floatY 5s ease-in-out infinite 3s" }}
      >
        {"{"}
      </span>
      <span
        className={`absolute font-mono text-lg font-bold select-none ${chevronDim}`}
        style={{ top: "45%", right: "-16px", animation: "floatY 5s ease-in-out infinite 1s" }}
      >
        {"}"}
      </span>

      {/* Portrait — full upper-body cutout, no circle crop */}
      <img
        src={heroImg}
        alt={t("home.name")}
        className="relative z-10 rounded-full object-cover object-top"
        style={{
          width: "340px",
          height: "340px",
          boxShadow: isDark
            ? "0 8px 60px rgba(100,255,218,0.10), 0 0 0 1px rgba(100,255,218,0.08)"
            : "0 8px 60px rgba(13,148,136,0.08), 0 0 0 1px rgba(13,148,136,0.06)",
        }}
      />
    </div>
  );
};

export default HeroPortrait;
