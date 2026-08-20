// src/data/about.ts
//
// Copy for the About page lives in src/locales/en.json under the "about"
// key. AboutPage renders from those, so do not duplicate prose here.

/** Résumé served from /public. Update both together. */
export const RESUME_FILE = "/Eyobed-Demissie-Resume.pdf";

/** Contact details, single source of truth for footer + contact page. */
export const CONTACT: {
  github: string;
  githubHandle: string;
  location: string;
  linkedin: string;
} = {
  github: "https://github.com/Eyobed9",
  githubHandle: "github.com/Eyobed9",
  location: "Addis Ababa, Ethiopia",
  linkedin: "https://www.linkedin.com/in/eyobed-d-249634230/",
};

/**
 * Roles rendered on the About page timeline, newest first. Each entry pulls its
 * copy from `about.exp{key}*` in the locale files; `highlights` is how many
 * `exp{key}h*` bullets exist for that role.
 */
export const EXPERIENCE_ENTRIES = [
  { key: 1, highlights: 5 },
  { key: 2, highlights: 4 },
] as const;

/** Number of education entries in the locales (`about.edu{n}*`). */
export const EDUCATION_COUNT = 2;

/** Number of `about.cert{n}Name` / `about.cert{n}Issuer` pairs in the locales. */
export const CERTIFICATION_COUNT = 10;

/**
 * Maps each cert index (1-based) to the file path inside `/certifications/`.
 * Used to enable the "view certificate" lightbox.
 */
export const CERTIFICATION_FILES: Record<number, string> = {
  1: "/certifications/CS50W.jpg",
  2: "/certifications/CS50 Certificate.jpg",
  3: "/certifications/photo_2026-08-19_15-48-00.jpg",
  4: "/certifications/photo_2025-04-16_12-21-37.jpg",
  5: "/certifications/Eyobed Demissie_Certificate.jpg",
  6: "/certifications/Web Development_certificate.jpg",
  7: "/certifications/Angular_certificate (1).jpg",
  8: "/certifications/Python Intermediate_certificate.jpg",
  9: "/certifications/cisco.jpg",
  10: "/certifications/Systems Engineering_ System Architecture & Design.jpg",
};
