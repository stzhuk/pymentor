import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruTranslations from "./locales/ru.json";
import uaTranslations from "./locales/ua.json";

const resources = {
  ru: { translation: ruTranslations },
  ua: { translation: uaTranslations },
};

const savedLanguage = localStorage.getItem("language") || "ru";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
