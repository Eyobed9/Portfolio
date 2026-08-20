import type { ReactElement } from "react";
import { useTheme } from "@/context/useTheme";
import { tones } from "@/config/palette";
import { CONTACT } from "@/data/about";

const ICONS: Record<string, ReactElement> = {
  GitHub: (
    <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.5v-1.74c-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.88 1.55 2.31 1.1 2.88.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.96-2.35 4.82-4.58 5.08.36.32.68.95.68 1.92v2.85c0 .27.18.6.69.5A10.28 10.28 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
  ),
  LinkedIn: (
    <path d="M5.75 3.5A2.25 2.25 0 1 0 5.75 8a2.25 2.25 0 0 0 0-4.5ZM3.5 9.5h4.5V21H3.5V9.5Zm7 0h4.3v1.57h.06c.6-1.07 2.06-2.2 4.24-2.2 4.54 0 5.38 3.04 5.38 6.99V21H20V16.6c0-1.06-.02-2.43-1.45-2.43-1.45 0-1.67 1.17-1.67 2.35V21h-4.38V9.5Z" />
  ),
};

/** GitHub / LinkedIn, in that order. LinkedIn hides when unset. */
const SocialLinks = ({ className = "" }: { className?: string }) => {
  const { isDark } = useTheme();
  const c = tones(isDark);

  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin
      ? [{ label: "LinkedIn", href: CONTACT.linkedin }]
      : []),
  ];

  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className={`block transition-all duration-200 hover:-translate-y-1 ${c.body} ${c.headingHover}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              {ICONS[link.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
