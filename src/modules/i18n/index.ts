import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Module, moduleRegistry } from '../registry';

export interface I18nConfig {
  defaultLanguage?: string;
  supportedLanguages?: string[];
  resources?: Record<string, Record<string, Record<string, string>>>;
}

const defaultConfig: I18nConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en'],
  resources: {
    en: {
      translation: {
        welcome: 'Welcome'  // Adding a default translation
      }
    }
  }
};

export const i18nModule: Module = {
  id: 'i18n',
  name: 'Internationalization',
  description: 'Provides internationalization support using i18next',
  version: '1.0.0',
  
  async initialize() {
    const config = moduleRegistry.getConfig(i18nModule.id) as I18nConfig || defaultConfig;
    
    await i18next
      .use(initReactI18next)
      .init({
        resources: config.resources,
        lng: config.defaultLanguage,
        supportedLngs: config.supportedLanguages,
        fallbackLng: config.defaultLanguage,
        interpolation: {
          escapeValue: false
        }
      });
  },

  async cleanup() {
    // Cleanup i18next resources if needed
  }
};

// Export hooks and utilities
export { useTranslation } from 'react-i18next';
export const setLanguage = (lang: string) => i18next.changeLanguage(lang); 