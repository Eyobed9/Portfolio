import type { ReactNode } from "react";
import { scrollToSection } from "@/utils/scrollToSection";

/**
 * Renders a real `#id` anchor so in-page links stay shareable, keyboard-
 * operable, and readable in the status bar. The click handler only takes over
 * to offset the sticky header; modified clicks fall through to the browser.
 */
type SectionLinkProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  "aria-current"?: "page" | undefined;
};

const SectionLink = ({
  sectionId,
  children,
  className = "",
  onNavigate,
  "aria-current": ariaCurrent,
}: SectionLinkProps) => (
  <a
    href={`#${sectionId}`}
    aria-current={ariaCurrent}
    className={className}
    onClick={(event) => {
      // Let modified clicks (new tab/window) behave natively.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      scrollToSection(sectionId);
      onNavigate?.();
    }}
  >
    {children}
  </a>
);

export default SectionLink;
