import { useMemo, useState } from "react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  SKILL_CATEGORIES,
  skills,
  skillsByCategory,
  type SkillCategory,
  type SkillItem,
} from "@/data/skills";

const categoryLabelKeys: Record<string, string> = {
  All: "skills.tabAll",
  Frontend: "skills.tabFrontend",
  Backend: "skills.tabBackend",
  Mobile: "skills.tabMobile",
  DevOps: "skills.tabDevOps",
  Tools: "skills.tabTools",
};

type Tab = "All" | SkillCategory;
const TABS: Tab[] = ["All", ...SKILL_CATEGORIES];

const SkillsPage = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const groups = useMemo<Array<[SkillCategory, SkillItem[]]>>(
    () =>
      (activeTab === "All" ? SKILL_CATEGORIES : [activeTab]).map((category) => [
        category,
        skillsByCategory(category),
      ]),
    [activeTab],
  );

  const visible = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

  return (
    <section id="skills" className="mb-24 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
      <SectionHeading title={t("skills.title")} />

      {/* GitHub's language strip: one segment per skill in the current view. */}
      <div
        className={`mb-5 flex h-2 w-full overflow-hidden rounded-full ${
          isDark ? "bg-[#233554]" : "bg-slate-200"
        }`}
        aria-hidden="true"
      >
        {visible.map((skill) => (
          <span
            key={skill.id}
            className="h-full"
            style={{
              width: `${100 / visible.length}%`,
              backgroundColor: skill.color,
            }}
          />
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {TABS.map((tab) => {
          const count =
            tab === "All" ? skills.length : skillsByCategory(tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${
                isActive
                  ? isDark
                    ? "border-[#64ffda] bg-[#64ffda]/10 text-[#64ffda]"
                    : "border-teal-700 bg-teal-700/10 text-teal-800"
                  : `${c.border} ${c.body} ${c.accentHover}`
              }`}
            >
              {t(categoryLabelKeys[tab])}
              <span className="ml-1.5 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {groups.map(([group, items]) => (
          <div key={group}>
            <h3
              className={`mb-3 font-mono text-xs font-bold uppercase tracking-widest ${c.heading}`}
            >
              {t(categoryLabelKeys[group])}
              <span className={`ml-2 font-normal ${c.meta}`}>
                {t("common.skillsCount", { count: items.length })}
              </span>
            </h3>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {items.map((skill) => (
                <li
                  key={skill.id}
                  className={`flex items-center gap-2 text-sm ${c.bright}`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    aria-hidden="true"
                  />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;
