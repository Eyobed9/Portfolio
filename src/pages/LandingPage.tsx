import { useEffect } from "react";
import HeroPortrait from "@/components/ui/HeroPortrait";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ExperiencePage from "./ExperiencePage";
import SkillsPage from "./skills";
import ProjectsPage from "./ProjectsPage";
import ServicesPage from "./services";
import ContactPage from "./ContactPage";
import { scrollToSection } from "@/utils/scrollToSection";

const LandingPage = () => {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToSection(id));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <ScrollReveal delay={0} direction="right">
        <HeroPortrait />
      </ScrollReveal>

      <ScrollReveal delay={100} direction="left">
        <ExperiencePage />
      </ScrollReveal>

      <ScrollReveal delay={100} direction="right">
        <SkillsPage />
      </ScrollReveal>

      <ScrollReveal delay={100} direction="left">
        <ProjectsPage />
      </ScrollReveal>

      <ScrollReveal delay={100} direction="right">
        <ServicesPage />
      </ScrollReveal>

      <ScrollReveal delay={100} direction="left">
        <ContactPage />
      </ScrollReveal>
    </>
  );
};

export default LandingPage;
