import { useMemo } from "react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICE_KEYS = [1, 2, 3, 4] as const;

const ServicesPage = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);

  const services = useMemo(
    () =>
      SERVICE_KEYS.map((n) => ({
        title: t(`services.s${n}Title`),
        description: t(`services.s${n}Desc`),
        details: [
          t(`services.s${n}d1`),
          t(`services.s${n}d2`),
          t(`services.s${n}d3`),
        ],
      })),
    [t],
  );

  return (
    <section id="services" className="mb-24 scroll-mt-16 lg:mb-36 lg:scroll-mt-24">
      <SectionHeading title={t("services.badge")} />

      <ul className="group/list">
        {services.map((service, i) => (
          <li key={i} className="mb-8">
            <div
              className={`group relative transition-opacity duration-200 lg:group-hover/list:opacity-50 lg:hover:opacity-100! ${c.rowHover} rounded-md lg:-mx-4 lg:p-4`}
            >
              <h3 className={`font-medium leading-snug ${c.heading}`}>
                {service.title}
              </h3>
              <p className={`mt-1 text-sm leading-normal ${c.body}`}>
                {service.description}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {service.details.map((detail) => (
                  <li key={detail}>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs leading-5 ${c.chip}`}
                    >
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesPage;
