import { useMemo, useState, useCallback } from "react";
import { Eye, X } from "lucide-react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  CERTIFICATION_COUNT,
  CERTIFICATION_FILES,
  EDUCATION_COUNT,
  EXPERIENCE_ENTRIES,
} from "@/data/about";
import { softSkills } from "@/data/softSkills";

const ExperiencePage = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);
  const [viewingCert, setViewingCert] = useState<{
    name: string;
    file: string;
  } | null>(null);

  const experience = useMemo(
    () =>
      EXPERIENCE_ENTRIES.map(({ key, highlights }) => ({
        role: t(`about.exp${key}Role`),
        company: t(`about.exp${key}Company`),
        timeframe: t(`about.exp${key}Time`),
        highlights: Array.from({ length: highlights }, (_, i) =>
          t(`about.exp${key}h${i + 1}`),
        ),
      })),
    [t],
  );

  const educations = useMemo(
    () =>
      Array.from({ length: EDUCATION_COUNT }, (_, i) => ({
        degree: t(`about.edu${i + 1}Degree`),
        school: t(`about.edu${i + 1}School`),
        desc: t(`about.edu${i + 1}Desc`),
      })),
    [t],
  );

  const certifications = useMemo(
    () =>
      Array.from({ length: CERTIFICATION_COUNT }, (_, i) => ({
        name: t(`about.cert${i + 1}Name`),
        issuer: t(`about.cert${i + 1}Issuer`),
        file: CERTIFICATION_FILES[i + 1],
      })),
    [t],
  );

  const softSkillNames = useMemo(
    () => softSkills.map((skill) => t(`about.soft${skill.id}`)),
    [t],
  );

  const openCert = useCallback((name: string, file: string | undefined) => {
    if (file) setViewingCert({ name, file });
  }, []);

  const closeCert = useCallback(() => setViewingCert(null), []);

  const chip = `inline-flex items-center rounded-full px-3 py-1 font-mono text-xs leading-5 ${c.chip}`;

  return (
    <>
      {/* Experience: date column left, detail right, siblings dim on hover. */}
      <section id="experience" className="mb-24 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
        <SectionHeading title={t("about.experienceTitle")} />

        <ol className="group/list">
          {experience.map((job, i) => (
            <li key={i} className="mb-12">
              <div
                className={`group relative grid gap-2 pb-1 transition-opacity duration-200 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100! ${c.rowHover} rounded-md lg:-mx-4 lg:p-4`}
              >
                <header
                  className={`z-10 mb-2 mt-1 font-mono text-xs uppercase tracking-wide sm:col-span-2 ${c.meta}`}
                >
                  {job.timeframe}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className={`font-medium leading-snug ${c.heading}`}>
                    {job.role}
                  </h3>
                  <p className={`text-sm ${c.accent}`}>{job.company}</p>

                  <ul className={`mt-3 space-y-2 text-sm leading-normal ${c.body}`}>
                    {job.highlights.map((highlight, j) => (
                      <li key={j} className="relative pl-5">
                        <span
                          className={`absolute left-0 top-2 h-1 w-1 rounded-full ${c.accentBg}`}
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4">
          <h3
            className={`font-mono text-xs font-bold uppercase tracking-widest ${c.heading}`}
          >
            {t("about.educationTitle")}
          </h3>
          {educations.map((edu, i) => (
            <div key={i} className={i > 0 ? "mt-6" : "mt-3"}>
              <p className={`text-sm font-medium ${c.bright}`}>
                {edu.degree}
              </p>
              <p className={`text-sm ${c.accent}`}>{edu.school}</p>
              <p className={`mt-2 text-sm leading-normal ${c.body}`}>
                {edu.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="credentials" className="mb-24 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
        <SectionHeading title={t("about.certsTitle")} />
        <ul className={`mb-10 space-y-3 text-sm ${c.body}`}>
          {certifications.map((cert, i) => (
            <li key={i} className="relative pl-5">
              <span
                className={`absolute left-0 top-2 h-1 w-1 rounded-full ${c.accentBg}`}
                aria-hidden="true"
              />
              <span className={`${c.bright} inline-flex items-center gap-1.5`}>
                {cert.name}
                {cert.file && (
                  <button
                    type="button"
                    aria-label={`View ${cert.name} certificate`}
                    onClick={() => openCert(cert.name, cert.file)}
                    className={`inline-flex rounded p-0.5 transition-colors duration-200 ${
                      isDark
                        ? "text-[#64ffda]/50 hover:text-[#64ffda]"
                        : "text-teal-600/50 hover:text-teal-700"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                )}
              </span>
              <span className="block text-xs">{cert.issuer}</span>
            </li>
          ))}
        </ul>

        <h3
          className={`font-mono text-xs font-bold uppercase tracking-widest ${c.heading}`}
        >
          {t("about.softTitle")}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {softSkillNames.map((name) => (
            <li key={name}>
              <span className={chip}>{name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Certificate Lightbox Modal */}
      {viewingCert && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-sm pt-20 px-4 pb-4"
          onClick={closeCert}
        >
          <div
            className={`relative w-full max-w-3xl max-h-[calc(100vh-6rem)] rounded-xl overflow-hidden shadow-2xl ${
              isDark ? "bg-[#112240]" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center justify-between border-b px-4 py-3 ${c.border}`}
            >
              <h4
                className={`font-mono text-sm font-medium truncate pr-4 ${c.heading}`}
              >
                {viewingCert.name}
              </h4>
              <button
                type="button"
                aria-label="Close certificate viewer"
                onClick={closeCert}
                className={`shrink-0 rounded-md p-1.5 transition-colors duration-200 ${
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-[#233554]"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-9.5rem)] p-4">
              <img
                src={viewingCert.file}
                alt={viewingCert.name}
                className="w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperiencePage;
