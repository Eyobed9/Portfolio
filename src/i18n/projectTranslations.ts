import type { Project } from "@/types/project";
import { PROJECT_CATEGORY_SLUGS } from "./categories";

export const translateProject = (
  project: Project,
  t: (key: string) => string,
): Project => {
  const categorySlug = PROJECT_CATEGORY_SLUGS[project.category] ?? "webApps";

  return {
    ...project,
    title: t(`projects.p${project.id}Title`),
    summary: t(`projects.p${project.id}Summary`),
    category: t(`categories.${categorySlug}`),
  };
};
