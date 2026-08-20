import { useMemo } from "react";
import { Download } from "lucide-react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import { RESUME_FILE, CERTIFICATION_COUNT } from "@/data/about";
import { FEATURED_PROJECTS } from "@/data/project";
import { useCountUp } from "@/hooks/useCountUp";
import SocialLinks from "@/components/ui/SocialLinks";

/**
 * The left half of the page: identity, availability, résumé, stats, socials.
 *
 * Sticky and full-height from `lg` up. The hero portrait now lives in the
 * scrollable right column (HeroPortrait component) so it scrolls away while
 * this text stays pinned.
 */
const AnimatedStat = ({ label, targetValue, suffix }: { label: string, targetValue: number, suffix: string }) => {
  const { isDark } = useTheme();
  const c = tones(isDark);
  const count = useCountUp(targetValue);
  return (
    <div>
      <dt className={`font-mono text-xs uppercase tracking-wide ${c.meta}`}>
        {label}
      </dt>
      <dd className={`mt-1 text-2xl font-bold ${c.heading}`}>
        {count}{suffix}
      </dd>
    </div>
  );
};

const SideRail = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);

  const stats = useMemo(
    () => [
      { targetValue: 3, suffix: "+", label: t("home.statYears") },
      { targetValue: FEATURED_PROJECTS.length, suffix: "+", label: t("home.statProjects") },
      { targetValue: CERTIFICATION_COUNT, suffix: "+", label: t("home.statCerts") },
    ],
    [t],
  );

  return (
    <section
      id="home"
      className="scroll-mt-16 lg:sticky lg:top-16 lg:flex lg:max-h-[calc(100vh-4rem)] lg:w-1/2 lg:flex-col lg:py-20"
    >
        <h1
          className={`text-4xl font-bold tracking-tight sm:text-5xl ${c.heading}`}
        >
          {t("home.name")}
        </h1>

        <p className={`mt-3 text-lg font-medium tracking-tight sm:text-xl ${c.bright}`}>
          {t("home.title")}
        </p>

        <p className={`mt-4 max-w-xs leading-normal ${c.body}`}>
          {t("home.description")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs ${c.chip}`}
            style={{ display: "none" }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${c.accentBg}`} />
            {t("common.openToWork")}
          </span>
          <a
            href={RESUME_FILE}
            download
            className={`group inline-flex items-center gap-2 font-mono text-xs tracking-wide ${c.accent} hover:underline`}
          >
            <Download className="h-3.5 w-3.5" />
            {t("common.downloadResume")}
          </a>
        </div>

        <dl className="mt-8 flex gap-8">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </dl>

        <SocialLinks className="mt-8" />
    </section>
  );
};

export default SideRail;
