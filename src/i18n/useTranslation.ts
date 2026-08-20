import { useCallback } from "react";
import { getNestedValue } from "./getNestedValue";
import en from "@/locales/en.json";

export const useTranslation = () => {
  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let value = getNestedValue(en, key);

      if (params) {
        for (const [paramKey, paramValue] of Object.entries(params)) {
          value = value.replaceAll(`{{${paramKey}}}`, String(paramValue));
        }
      }

      return value;
    },
    [],
  );

  return { t, locale: "en" as const };
};
