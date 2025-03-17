import { Module, moduleRegistry } from '../registry';

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface ThemeConfig {
  defaultTheme: string;
  themes: Record<string, Theme>;
}

const defaultConfig: ThemeConfig = {
  defaultTheme: 'light',
  themes: {
    light: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    dark: {
      primary: '#60A5FA',
      secondary: '#34D399',
      background: '#1F2937',
      text: '#F9FAFB'
    }
  }
};

let currentTheme = defaultConfig.defaultTheme;

export const themeModule: Module = {
  id: 'theme',
  name: 'Theme System',
  description: 'Provides theme management and switching capabilities',
  version: '1.0.0',
  
  async initialize() {
    const config = moduleRegistry.getConfig(themeModule.id) as ThemeConfig || defaultConfig;
    currentTheme = config.defaultTheme;
    applyTheme(currentTheme, config.themes);
  },

  async cleanup() {
    // Reset to default theme if needed
    applyTheme(defaultConfig.defaultTheme, defaultConfig.themes);
  }
};

// Theme utilities
function applyTheme(themeName: string, themes: Record<string, Theme>) {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
}

export const setTheme = (themeName: string) => {
  const config = moduleRegistry.getConfig(themeModule.id) as ThemeConfig;
  if (config?.themes[themeName]) {
    currentTheme = themeName;
    applyTheme(themeName, config.themes);
  }
};

export const getCurrentTheme = () => currentTheme; 