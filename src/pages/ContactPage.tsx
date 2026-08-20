import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useTheme } from "@/context/useTheme";
import { useTranslation } from "@/i18n/useTranslation";
import { tones } from "@/config/palette";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT } from "@/data/about";

type FormStatus = "idle" | "sending" | "sent" | "error" | "rate_limited";

const ContactPage = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const c = tones(isDark);

  const channels = useMemo(
    () => [
      {
        title: t("contact.githubTitle"),
        value: CONTACT.githubHandle,
        href: CONTACT.github,
      },
      ...(CONTACT.linkedin
        ? [
            {
              title: t("contact.linkedinTitle"),
              value: CONTACT.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
              href: CONTACT.linkedin,
            },
          ]
        : []),
    ],
    [t],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    // Check client-side cooldown (60 seconds)
    const lastSubmit = localStorage.getItem("lastContactSubmit");
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      if (elapsed < 60000) {
        setStatus("rate_limited");
        return;
      }
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "");
    formData.append("subject", `Portfolio enquiry from ${formData.get("name")}`);
    
    // Honeypot check for bots
    if (formData.get("company")) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("send_failed");
      }

      setStatus("sent");
      form.reset();
      localStorage.setItem("lastContactSubmit", Date.now().toString());
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "rate_limited") {
        setStatus("rate_limited");
      } else {
        setStatus("error");
      }
    }
  };

  const inputClasses = `w-full rounded border px-3 py-2 text-sm outline-none transition ${c.input}`;
  const labelClasses = `mb-1.5 block font-mono text-xs uppercase tracking-wide ${c.meta}`;

  return (
    <section id="contact" className="mb-16 scroll-mt-16 lg:scroll-mt-24">
      <SectionHeading title={t("contact.title")} />

      <p className={`text-sm leading-relaxed ${c.body}`}>
        {t("contact.subtitle")}
      </p>

      <ul className="mt-6 space-y-2">
        {channels.map((channel) => (
          <li key={channel.href}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={
                channel.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group inline-flex items-baseline gap-3"
            >
              <span
                className={`font-mono text-xs uppercase tracking-wide ${c.meta}`}
              >
                {channel.title}
              </span>
              <span
                className={`text-sm ${c.bright} group-hover:underline ${
                  isDark ? "group-hover:text-[#64ffda]" : "group-hover:text-teal-700"
                }`}
              >
                {channel.value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
        {/* Honeypot — hidden from real users, filled by bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              {t("contact.nameLabel")}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t("contact.namePlaceholder")}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              {t("contact.emailLabel")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t("contact.emailPlaceholder")}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-project" className={labelClasses}>
            {t("contact.projectLabel")}
          </label>
          <input
            id="contact-project"
            name="project"
            type="text"
            required
            placeholder={t("contact.projectPlaceholder")}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="contact-details" className={labelClasses}>
            {t("contact.detailsLabel")}
          </label>
          <textarea
            id="contact-details"
            name="message"
            required
            rows={5}
            placeholder={t("contact.detailsPlaceholder")}
            className={inputClasses}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className={`rounded border px-5 py-2 font-mono text-sm transition-colors duration-200 disabled:opacity-50 ${
              isDark
                ? "border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10"
                : "border-teal-700 text-teal-800 hover:bg-teal-700/10"
            }`}
          >
            {status === "sending"
              ? t("contact.sending")
              : t("contact.sendMessage")}
          </button>
          <span className={`font-mono text-xs ${c.meta}`}>
            {t("contact.responseTime")}
          </span>
        </div>

        {status === "sent" ? (
          <p role="status" aria-live="polite" className={`text-sm ${c.accent}`}>
            {t("contact.successMessage")}
          </p>
        ) : null}

        {status === "rate_limited" ? (
          <p role="alert" className="text-sm text-red-400">
            {t("contact.cooldownMessage")}
          </p>
        ) : null}

        {status === "error" ? (
          <p role="alert" className="text-sm text-red-400">
            {t("contact.errorMessage")}
          </p>
        ) : null}
      </form>
    </section>
  );
};

export default ContactPage;
