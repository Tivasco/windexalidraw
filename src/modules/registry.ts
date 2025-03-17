import { createContext, useContext } from 'react';

export interface Module {
  id: string;
  name: string;
  description: string;
  version: string;
  dependencies?: string[];
  initialize?: () => Promise<void> | void;
  cleanup?: () => Promise<void> | void;
}

export interface ModuleConfig {
  enabled: boolean;
  config?: Record<string, any>;
}

export interface ModuleRegistry {
  modules: Map<string, Module>;
  configs: Map<string, ModuleConfig>;
  register: (module: Module) => void;
  unregister: (moduleId: string) => void;
  getModule: (moduleId: string) => Module | undefined;
  isEnabled: (moduleId: string) => boolean;
  getConfig: (moduleId: string) => Record<string, any> | undefined;
}

class ModuleRegistryImpl implements ModuleRegistry {
  modules: Map<string, Module> = new Map();
  configs: Map<string, ModuleConfig> = new Map();

  register(module: Module): void {
    if (this.modules.has(module.id)) {
      throw new Error(`Module ${module.id} is already registered`);
    }

    // Check dependencies
    if (module.dependencies) {
      for (const dep of module.dependencies) {
        if (!this.modules.has(dep)) {
          throw new Error(`Module ${module.id} depends on ${dep} which is not registered`);
        }
      }
    }

    this.modules.set(module.id, module);
    this.configs.set(module.id, { enabled: true });
  }

  unregister(moduleId: string): void {
    this.modules.delete(moduleId);
    this.configs.delete(moduleId);
  }

  getModule(moduleId: string): Module | undefined {
    return this.modules.get(moduleId);
  }

  isEnabled(moduleId: string): boolean {
    return this.configs.get(moduleId)?.enabled ?? false;
  }

  getConfig(moduleId: string): Record<string, any> | undefined {
    return this.configs.get(moduleId)?.config;
  }

  async initializeModules(): Promise<void> {
    for (const [id, module] of this.modules) {
      if (this.isEnabled(id) && module.initialize) {
        await module.initialize();
      }
    }
  }

  async cleanupModules(): Promise<void> {
    for (const [id, module] of this.modules) {
      if (this.isEnabled(id) && module.cleanup) {
        await module.cleanup();
      }
    }
  }
}

export const moduleRegistry = new ModuleRegistryImpl();
export const ModuleContext = createContext<ModuleRegistry>(moduleRegistry);
export const useModuleRegistry = () => useContext(ModuleContext); 