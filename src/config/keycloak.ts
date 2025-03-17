import Keycloak from 'keycloak-js';

// Declare environment variables
declare global {
  interface ImportMetaEnv {
    VITE_KEYCLOAK_URL: string;
    VITE_KEYCLOAK_REALM: string;
    VITE_KEYCLOAK_CLIENT_ID: string;
  }
}

interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  initOptions: {
    onLoad: 'check-sso' | 'login-required' | 'check-sso';
    silentCheckSsoRedirectUri?: string;
    pkceMethod?: 'S256';
    checkLoginIframe?: boolean;
  };
  loginOptions?: {
    redirectUri?: string;
  };
  logoutOptions?: {
    redirectUri?: string;
  };
}

export const keycloakConfig: KeycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'webapp-realm',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'webapp-client',

  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    checkLoginIframe: false
  },

  loginOptions: {
    redirectUri: window.location.origin
  },

  logoutOptions: {
    redirectUri: window.location.origin
  }
}; 