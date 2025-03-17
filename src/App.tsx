import React from 'react';
import { ModuleProvider } from './modules/ModuleProvider';
import { i18nModule } from './modules/i18n';
import { themeModule } from './modules/theme';
import { moduleRegistry } from './modules/registry';
import { AppRoutes } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Register available modules
moduleRegistry.register(i18nModule);
moduleRegistry.register(themeModule);

// Create a client for React Query
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModuleProvider>
          <AppRoutes />
        </ModuleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App; 