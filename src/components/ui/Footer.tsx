import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";

/**
 * Slim colophon at the end of the scrolling column. Navigation and socials live
 * in the SideRail now, so this only carries the credit line.
 */
const Footer = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);

  return (
    <footer className={`max-w-md pb-16 font-mono text-xs leading-normal ${c.meta}`}>
      <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
};

export default Footer;
