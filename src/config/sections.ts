/**
 * The single page is composed of these sections, in order. Each `id` must match
 * the `id` on the corresponding <section> so anchor links and the scroll-spy in
 * `useActiveSection` resolve. Header and Footer both build their links from here.
 */
export const SECTIONS = [
  { id: "home", labelKey: "nav.home" },
  { id: "experience", labelKey: "about.experienceTitle" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "services", labelKey: "nav.services" },
  { id: "contact", labelKey: "nav.contact" },
] as const;

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/** Sticky header height (h-16 = 4rem) plus a little breathing room. */
export const HEADER_OFFSET = 76;
