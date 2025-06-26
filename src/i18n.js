import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'fr', 'es', 'zh', 'ar'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // load from public
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
