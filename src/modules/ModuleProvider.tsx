import React, { useEffect } from 'react';
import { ModuleContext, moduleRegistry } from './registry';

interface ModuleProviderProps {
  children: React.ReactNode;
  modules?: Record<string, boolean | Record<string, any>>;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children, modules = {} }) => {
  useEffect(() => {
    // Configure modules based on props
    Object.entries(modules).forEach(([moduleId, config]) => {
      const moduleConfig = typeof config === 'boolean' ? { enabled: config } : { enabled: true, config };
      moduleRegistry.configs.set(moduleId, moduleConfig);
    });

    // Initialize enabled modules
    moduleRegistry.initializeModules();

    // Cleanup on unmount
    return () => {
      moduleRegistry.cleanupModules();
    };
  }, [modules]);

  return (
    <ModuleContext.Provider value={moduleRegistry}>
      {children}
    </ModuleContext.Provider>
  );
}; 