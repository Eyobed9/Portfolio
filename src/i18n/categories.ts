export const PROJECT_CATEGORY_SLUGS: Record<string, string> = {
  "Frontend": "frontend",
  "Backend": "backend",
  "Full Stack": "fullStack",
  "Mobile": "mobile",
  "Mobile App": "mobile",
  "Web Apps": "frontend",
  "Web App": "frontend",
  "UI Components": "frontend",
};

export const FILTER_CATEGORY_SLUGS = [
  "all",
  "frontend",
  "backend",
  "fullStack",
  "mobile",
] as const;

export type FilterCategorySlug = (typeof FILTER_CATEGORY_SLUGS)[number];

export const FILTER_TO_DATA_CATEGORY: Record<
  FilterCategorySlug,
  string | null
> = {
  all: null,
  frontend: "Frontend",
  backend: "Backend",
  fullStack: "Full Stack",
  mobile: "Mobile",
};

export const matchesCategoryFilter = (
  projectCategory: string,
  activeSlug: FilterCategorySlug,
): boolean => {
  if (activeSlug === "all") {
    return true;
  }

  const dataCategory = FILTER_TO_DATA_CATEGORY[activeSlug];
  if (!dataCategory) {
    return true;
  }

  return (
    projectCategory === dataCategory ||
    PROJECT_CATEGORY_SLUGS[projectCategory] === activeSlug
  );
};
