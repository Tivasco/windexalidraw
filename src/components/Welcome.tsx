import React from 'react';
import { useTranslation } from 'react-i18next';
import { useModuleConfig } from '../modules/useModule';
import type { I18nConfig } from '../modules/i18n';

export const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const i18nConfig = useModuleConfig<I18nConfig>('i18n');

  const handleLanguageChange = (lang: string) => {
    if (i18nConfig?.supportedLanguages?.includes(lang)) {
      // Import the setLanguage function only if needed
      import('../modules/i18n').then(({ setLanguage }) => {
        setLanguage(lang);
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('welcome')}</h1>
      
      {/* Language selector */}
      <div className="mb-4">
        <label className="mr-2">Select Language:</label>
        <select
          onChange={(e) => handleLanguageChange(e.target.value)}
          defaultValue={i18nConfig?.defaultLanguage}
          className="border p-1 rounded"
        >
          {i18nConfig?.supportedLanguages?.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {t('login')}
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          {t('signup')}
        </button>
      </div>
    </div>
  );
}; 