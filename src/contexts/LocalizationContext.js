import i18next from "i18next";
import { createContext, useCallback, useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import translationsAR from "translations/ar.json";
import translationsEN from "translations/en.json";
import { DEFAULT_LANG, LANG_STORAGE_KEY } from "utils/constants";

const savedLang = localStorage.getItem(LANG_STORAGE_KEY) ?? "en";

const INITIAL_STATE = {
  isInit: false,
  language: savedLang,
  direction: savedLang === "en" ? "ltr" : "rtl",
};

export const LocalizationContext = createContext(INITIAL_STATE);

const LocalizationContextProvider = ({ children }) => {
  const [isInit, setIsInit] = useState(INITIAL_STATE.isInit);
  const [language, setLanguage] = useState(INITIAL_STATE.language);
  const [direction, setDirection] = useState(INITIAL_STATE.direction);

  const initLocalization = async () => {
    await i18next
      .use(initReactI18next)
      .init({
        resources: {
          ar: {
            translation: translationsAR,
          },
          en: {
            translation: translationsEN,
          },
        },
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
      });
  };

  const changeLanguage = useCallback(async (lang) => {
    await setLanguage(lang);
    await setDirection(lang === "en" ? "ltr" : "rtl");
    await i18next.changeLanguage(lang);
    await localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [setLanguage, setDirection]);

  const initLang = useCallback(async () => {
    await initLocalization();
    await changeLanguage(localStorage.getItem(LANG_STORAGE_KEY) ?? DEFAULT_LANG);
    await setIsInit(true);
  }, [changeLanguage, setIsInit]);

  useEffect(() => {
    initLang();
  }, [initLang]);

  const state = { isInit, language, direction, changeLanguage };

  return <LocalizationContext.Provider value={state}>{children}</LocalizationContext.Provider>;
};

export default LocalizationContextProvider;
