import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { translateProject } from "@/i18n/projectTranslations";
import { tones } from "@/config/palette";
import SectionHeading from "@/components/ui/SectionHeading";
import { FEATURED_PROJECTS } from "@/data/project";
import {
  FILTER_CATEGORY_SLUGS,
  matchesCategoryFilter,
  type FilterCategorySlug,
} from "@/i18n/categories";

/** First letters of the first two words, for the no-screenshot fallback tile. */
const monogram = (title: string) =>
  title
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const categoryLabelKeys: Record<string, string> = {
  all: "categories.all",
  frontend: "categories.frontend",
  backend: "categories.backend",
  fullStack: "categories.fullStack",
  mobile: "categories.mobile",
};

const ProjectsPage = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);
  const [activeFilter, setActiveFilter] = useState<FilterCategorySlug>("all");

  const allProjects = useMemo(
    () => FEATURED_PROJECTS.map((project) => translateProject(project, t)),
    [t],
  );

  const projects = useMemo(
    () =>
      activeFilter === "all"
        ? allProjects
        : allProjects.filter((p) =>
            matchesCategoryFilter(p.category, activeFilter),
          ),
    [allProjects, activeFilter],
  );

  return (
    <section id="projects" className="mb-24 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
      <SectionHeading title={t("common.projects")} />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {FILTER_CATEGORY_SLUGS.map((slug) => {
          const count =
            slug === "all"
              ? allProjects.length
              : allProjects.filter((p) =>
                  matchesCategoryFilter(p.category, slug),
                ).length;
          const isActive = activeFilter === slug;

          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(slug)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${
                isActive
                  ? isDark
                    ? "border-[#64ffda] bg-[#64ffda]/10 text-[#64ffda]"
                    : "border-teal-700 bg-teal-700/10 text-teal-800"
                  : `${c.border} ${c.body} ${c.accentHover}`
              }`}
            >
              {t(categoryLabelKeys[slug])}
              <span className="ml-1.5 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="group/list">
        {projects.map((project) => {
          const technologies = project.stack.split(", ");
          const href = project.liveUrl ?? project.repo;
          const Row = href ? "a" : "div";

          return (
            <li key={project.id} className="mb-12">
              <div
                className={`group relative grid gap-4 pb-1 transition-opacity duration-200 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100! ${c.rowHover} rounded-md lg:-mx-4 lg:p-4`}
              >
                <div className="z-10 order-2 sm:order-1 sm:col-span-6">
                  <h3 className="font-medium leading-snug">
                    <Row
                      {...(href
                        ? { href, target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`inline-flex items-baseline text-base ${c.heading} ${
                        href ? `group/link ${c.accentHover}` : ""
                      }`}
                    >
                      {/* Stretches the link over the whole row so the entire
                          card is clickable, without nesting interactive elements. */}
                      {href ? (
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      ) : null}
                      <span>
                        {project.title}
                        {href ? (
                          <ArrowUpRight
                            className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform duration-200 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                        ) : null}
                      </span>
                    </Row>
                  </h3>

                  {project.org ? (
                    <p className={`mt-0.5 font-mono text-xs ${c.accent}`}>
                      {project.org}
                    </p>
                  ) : null}

                  <p className={`mt-2 text-sm leading-normal ${c.body}`}>
                    {project.summary}
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <li key={tech}>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs leading-5 ${c.chip}`}
                        >
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className={`order-1 aspect-video w-full rounded border sm:order-2 sm:col-span-2 sm:translate-y-1 ${c.border} ${
                      project.imageFit === "contain"
                        ? "bg-white object-contain p-2"
                        : "object-cover"
                    }`}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={`order-1 flex aspect-video w-full items-center justify-center rounded border sm:order-2 sm:col-span-2 sm:translate-y-1 ${c.border} ${
                      isDark ? "bg-[#112240]" : "bg-white"
                    }`}
                  >
                    <span
                      className={`font-mono text-lg font-bold tracking-tight ${c.accent}`}
                    >
                      {monogram(project.title)}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProjectsPage;
