import { createContext, useContext } from "react";

export type Locale = "en";

export type LanguageContextValue = {
  locale: Locale;
};

export const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
});

export const useLanguage = () => {
  return useContext(LanguageContext);
};
