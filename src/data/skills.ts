// src/data/skills.ts
//
// Presented the way GitHub lists repository languages: a coloured dot and a
// name. There is deliberately no proficiency level or percentage here, because
// nothing in the résumé supports one and a self-assigned "95%" reads as noise.
//
// `color` follows GitHub's linguist palette for real languages, and the
// project's own brand colour for frameworks and tools, adjusted where needed so
// the dot stays visible on both the navy and the off-white ground.

export type SkillCategory = "Frontend" | "Backend" | "Mobile" | "DevOps" | "Tools";

export type SkillItem = {
  id: number;
  name: string;
  category: SkillCategory;
  color: string;
};

export const skills: SkillItem[] = [
  // Frontend
  { id: 1, name: "JavaScript", category: "Frontend", color: "#f1e05a" },
  { id: 2, name: "TypeScript", category: "Frontend", color: "#3178c6" },
  { id: 3, name: "React", category: "Frontend", color: "#61dafb" },
  { id: 4, name: "Next.js", category: "Frontend", color: "#7d8590" },
  { id: 5, name: "Tailwind CSS", category: "Frontend", color: "#38bdf8" },
  { id: 6, name: "HTML & CSS", category: "Frontend", color: "#e34c26" },
  { id: 7, name: "Bootstrap", category: "Frontend", color: "#7952b3" },

  // Backend
  { id: 8, name: "Python", category: "Backend", color: "#3572a5" },
  { id: 9, name: "Django", category: "Backend", color: "#44b78b" },
  { id: 10, name: "PHP", category: "Backend", color: "#4f5d95" },
  { id: 11, name: "Nest.js", category: "Backend", color: "#e0234e" },
  { id: 12, name: "SQL", category: "Backend", color: "#e38c00" },
  { id: 13, name: "MySQL", category: "Backend", color: "#4479a1" },
  { id: 14, name: "PostgreSQL", category: "Backend", color: "#336791" },

  // Mobile
  { id: 15, name: "Flutter", category: "Mobile", color: "#54c5f8" },

  // DevOps
  { id: 16, name: "Docker", category: "DevOps", color: "#2496ed" },
  { id: 17, name: "CI/CD", category: "DevOps", color: "#4bbe7a" },
  { id: 18, name: "Linux", category: "DevOps", color: "#f1da07ff" },

  // Tools and fundamentals
  { id: 18, name: "Java / C++", category: "Tools", color: "#b07219" },
  { id: 19, name: "Git & GitHub", category: "Tools", color: "#f1502f" },
  { id: 20, name: "Jest", category: "Tools", color: "#c21325" },
  { id: 21, name: "PyTest", category: "Tools", color: "#009fe3" },
  { id: 22, name: "Figma", category: "Tools", color: "#f24e1e" },
  { id: 23, name: "Networking", category: "Tools", color: "#0078d4" },
  { id: 24, name: "System Engineering", category: "Tools", color: "#6b7280" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Tools",
];

export const skillsByCategory = (category: SkillCategory) =>
  skills.filter((skill) => skill.category === category);
