import { Outlet } from "react-router";
import { Backdrop, Footer, Header, SideRail, Spotlight } from "@/components/ui";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useTheme } from "@/context/useTheme";
import { tones } from "@/config/palette";

/**
 * Two-column shell: a sticky identity rail on the left, scrolling content on
 * the right, collapsing to a single stacked column below `lg`.
 */
const LayoutShell = () => {
  const { isDark } = useTheme();
  const c = tones(isDark);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${c.bg}`}>
      <Backdrop />
      <Spotlight />
      <Header />
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 lg:flex lg:justify-between lg:gap-8 lg:py-0">
        <SideRail />
        <main id="content" className="pt-16 lg:w-1/2 lg:py-20">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

const RootLayout = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LayoutShell />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default RootLayout;
