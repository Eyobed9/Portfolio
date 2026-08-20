import type { PropsWithChildren } from "react";
import { LanguageContext } from "./useLanguage";

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  return (
    <LanguageContext.Provider value={{ locale: "en" }}>
      {children}
    </LanguageContext.Provider>
  );
};
