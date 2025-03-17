/**
 * Keycloak configuration
 * 
 * This file contains the configuration for the Keycloak authentication service.
 * Update the values below to match your Keycloak server configuration.
 */

// Keycloak configuration
export const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'webapp-realm',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'webapp-client',
  
  // Optional: Additional configuration options
  // These will be used when initializing Keycloak
  initOptions: {
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256',
    enableLogging: true,
    flow: 'standard'
  },
  
  // Login options
  loginOptions: {
    redirectUri: window.location.origin,
  },
  
  // Logout options
  logoutOptions: {
    redirectUri: window.location.origin
  }
};

// Export default for backward compatibility
export default keycloakConfig; 