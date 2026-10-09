import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/content/site";

const SchoolLanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: "ar", setLang: () => {} });

export function SchoolLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return <SchoolLanguageContext.Provider value={{ lang, setLang }}>{children}</SchoolLanguageContext.Provider>;
}

export function useSchoolLanguage() { return useContext(SchoolLanguageContext); }