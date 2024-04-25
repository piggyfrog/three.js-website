import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "ch",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    ch: {
      translation: {
        fruit:
          "我记得我小的时候每天最开心的事情，就是用收音机听评书故事，直到家里后来有了电视机......",
      },
    },
    en: {
      translation: {
        fruit:
          "I remember the happiest thing for me when I was young was to listen to storytelling with a radio every day, until we had a TV at home later......",
      },
    },
  },
});

export default i18n;
