/**
 * Shared colour tokens, so sections stop hand-rolling `isDark ? ... : ...`
 * pairs and drifting apart.
 *
 * The dark palette follows the navy/slate/teal family that brittanychiang.com
 * popularised. That site is dark-only; this one keeps a theme toggle, so the
 * light side mirrors the same roles (deep ink text, muted body, teal accent) on
 * a soft cool-grey ground.
 *
 * That ground is deliberately dimmer than white so raised surfaces can be
 * actual white and read as raised. Do not reintroduce a `--color-white`
 * override in index.css: it repaints every card and input the same colour as
 * the page and flattens the elevation.
 */
export const tones = (isDark: boolean) => ({
  /** Page ground. */
  bg: isDark ? "bg-[#0a192f]" : "bg-[#e5e7ea]",
  /** Headings and the visitor's primary read. */
  heading: isDark ? "text-[#e6f1ff]" : "text-slate-900",
  /** Slightly dimmer than a heading, for lead-ins and active list titles. */
  bright: isDark ? "text-[#ccd6f6]" : "text-slate-800",
  /** Body copy. */
  body: isDark ? "text-[#8892b0]" : "text-slate-600",
  /** Small meta text: dates, counts, captions. */
  meta: isDark ? "text-[#8892b0]" : "text-slate-500",
  /** The single accent. Used sparingly, exactly like the reference. */
  accent: isDark ? "text-[#64ffda]" : "text-teal-700",
  accentBg: isDark ? "bg-[#64ffda]" : "bg-teal-700",
  /**
   * Hover/group-hover variants are spelled out in full here on purpose.
   * Tailwind scans source for complete candidates, so building them by
   * interpolation (`hover:${c.accent}`) would silently generate nothing.
   */
  accentHover: isDark ? "hover:text-[#64ffda]" : "hover:text-teal-700",
  headingHover: isDark ? "hover:text-[#e6f1ff]" : "hover:text-slate-900",
  accentGroupHover: isDark
    ? "group-hover:text-[#64ffda]"
    : "group-hover:text-teal-700",
  /** Tech tags. */
  chip: isDark
    ? "bg-[#64ffda]/10 text-[#64ffda]"
    : "bg-teal-700/10 text-teal-800",
  border: isDark ? "border-[#233554]" : "border-slate-300",
  /** Row background on hover, for the dim-siblings list treatment. */
  rowHover: isDark
    ? "lg:group-hover:bg-[#112240] lg:group-hover:shadow-[0_4px_24px_rgba(2,12,27,0.5)]"
    : "lg:group-hover:bg-white lg:group-hover:shadow-[0_4px_24px_rgba(15,23,42,0.08)]",
  /** Inputs. */
  input: isDark
    ? "border-[#233554] bg-[#112240]/60 text-[#ccd6f6] placeholder:text-[#8892b0]/60 focus:border-[#64ffda]"
    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-700",
});

export type Tones = ReturnType<typeof tones>;
