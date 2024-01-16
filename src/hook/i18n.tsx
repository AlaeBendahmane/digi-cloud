// i18n.js
import en from '../assets/lang/en.json';
import fr from '../assets/lang/fr.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const savedLanguage = localStorage.getItem('lang')?.replace(/"/g, '');
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            fr: {
                translation: fr,
            },
        },
        lng: savedLanguage || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
