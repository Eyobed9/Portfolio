import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { HEADER_OFFSET, SECTIONS, SECTION_IDS } from "@/config/sections";
import { tones } from "@/config/palette";
import SectionLink from "@/components/ui/SectionLink";
import Logo from "@/components/ui/Logo";

/**
 * Sticky top bar at every breakpoint: brand, in-page links, and the theme and
 * language toggles. Below `md` the links collapse into a disclosure menu while
 * the two toggles stay visible, so switching theme or language never costs a
 * tap on mobile.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const activeSection = useActiveSection(SECTION_IDS, HEADER_OFFSET);
  const c = tones(isDark);

  const links = SECTIONS.filter((section) => section.id !== "home");

  const iconButton = `inline-flex h-9 w-9 items-center justify-center rounded-md border transition duration-200 ${
    isDark
      ? "border-[#233554] text-[#64ffda] hover:bg-[#112240]"
      : "border-slate-300 text-teal-700 hover:bg-white"
  }`;

  const linkClasses = (isActive: boolean) =>
    `rounded-md px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
      isActive ? c.accent : `${c.body} ${c.accentHover}`
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${c.border} ${
        isDark ? "bg-[#0a192f]/90" : "bg-[#e5e7ea]/90"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 md:px-12">
        <SectionLink
          sectionId="home"
          className={`inline-flex items-center gap-2 ${c.heading}`}
        >
          <Logo className="h-7 w-7" />
          <span className="sr-only">{t("home.name")}</span>
        </SectionLink>

        <div className="flex items-center gap-2">
          <nav className="hidden md:block" aria-label={t("common.toggleMenu")}>
            <ul className="flex items-center gap-1">
              {links.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    sectionId={item.id}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={linkClasses(activeSection === item.id)}
                  >
                    {t(item.labelKey)}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`flex items-center gap-2 md:ml-2 md:border-l md:pl-4 ${c.border}`}
          >
            <button
              type="button"
              aria-label={t("common.toggleTheme")}
              className={iconButton}
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>


            <button
              type="button"
              aria-label={t("common.toggleMenu")}
              aria-expanded={isMenuOpen}
              className={`${iconButton} md:hidden`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <nav
        aria-label={t("common.toggleMenu")}
        className={`overflow-hidden border-t transition-[max-height,opacity] duration-300 md:hidden ${
          isMenuOpen
            ? `max-h-96 opacity-100 ${c.border}`
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-3">
          {links.map((item) => (
            <li key={item.id}>
              <SectionLink
                sectionId={item.id}
                aria-current={activeSection === item.id ? "page" : undefined}
                onNavigate={() => setIsMenuOpen(false)}
                className={`block ${linkClasses(activeSection === item.id)}`}
              >
                {t(item.labelKey)}
              </SectionLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
