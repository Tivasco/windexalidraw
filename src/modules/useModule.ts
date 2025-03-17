import { useModuleRegistry } from './registry';

export function useModule<T extends Record<string, any>>(moduleId: string): T | undefined {
  const registry = useModuleRegistry();
  const module = registry.getModule(moduleId);
  
  if (!module || !registry.isEnabled(moduleId)) {
    return undefined;
  }

  return module as unknown as T;
}

export function useModuleConfig<T extends Record<string, any>>(moduleId: string): T | undefined {
  const registry = useModuleRegistry();
  return registry.getConfig(moduleId) as T | undefined;
} 