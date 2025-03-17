import React from 'react';
import { useModuleConfig } from '../modules/useModule';
import type { ThemeConfig } from '../modules/theme';
import { getCurrentTheme, setTheme } from '../modules/theme';

export const ThemeToggle: React.FC = () => {
  const themeConfig = useModuleConfig<ThemeConfig>('theme');
  const [currentTheme, setCurrentTheme] = React.useState(getCurrentTheme());

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setCurrentTheme(themeName);
  };

  if (!themeConfig) return null;

  return (
    <div className="p-4">
      <label className="mr-2">Theme:</label>
      <select
        value={currentTheme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="border p-1 rounded"
      >
        {Object.keys(themeConfig.themes).map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}; 