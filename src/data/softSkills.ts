// src/data/softSkills.ts
//
// Verbatim from the "Soft Skills" line of docs/CV.pdf. Names are translated via
// `softSkills.s{id}` in src/locales/{en,am}.json. The CV lists names only, so
// none of these carry a description or proficiency level. Do not invent one.

export type SoftSkill = {
  id: number;
  /** lucide-react icon name; see the iconMap in the rendering component. */
  icon: string;
};

export const softSkills: SoftSkill[] = [
  { id: 1, icon: "Users" },
  { id: 2, icon: "MessageCircle" },
  { id: 3, icon: "Shuffle" },
  { id: 4, icon: "ScanEye" },
  { id: 5, icon: "Flame" },
  { id: 6, icon: "ClipboardList" },
  { id: 7, icon: "Lightbulb" },
  { id: 8, icon: "Clock" },
];
