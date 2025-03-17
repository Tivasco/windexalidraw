import Keycloak from 'keycloak-js';
import keycloakConfig from '../config/keycloak.config.js';

// Create a single Keycloak instance
const keycloak = new Keycloak({
    url: 'https://keycloak.dev-ideasapp.com',
    realm: 'VerdantTalk',
    clientId: 'VerdantTalk',
  });
  
  // Track initialization state
  let isInitializing = false;
  let isInitialized = false;

  // Add a listener for authentication state changes
  let authStateListeners: ((authenticated: boolean) => void)[] = [];

  export const addAuthStateListener = (listener: (authenticated: boolean) => void) => {
    authStateListeners.push(listener);
    // Immediately notify with current state if already initialized
    if (isInitialized && keycloak.authenticated) {
      listener(true);
    }
  };

  export const removeAuthStateListener = (listener: (authenticated: boolean) => void) => {
    authStateListeners = authStateListeners.filter(l => l !== listener);
  };

  // Notify all listeners of authentication state change
  const notifyAuthStateChange = (authenticated: boolean) => {
    console.log('KeycloakService: Notifying auth state change:', authenticated);
    authStateListeners.forEach(listener => listener(authenticated));
  };

  export const refreshToken = async () => {
    if (isInitialized) {
      await keycloak.updateToken(120).catch(() => {
        keycloak.login();
      });
    }
  };

  export const isAuthenticated = () => {
    return isInitialized && !!keycloak.authenticated;
  };

  export const getToken = () => {
    return keycloak.token;
  };

  export const login = () => {
    if (!isInitialized) {
      // Initialize Keycloak first if not already initialized
      return checkAuthentication().then(() => {
        keycloak.login();
      });
    }
    return keycloak.login();
  };

  export const logout = () => {
    if (isInitialized) {
      keycloak.logout();
    }
  };

export const checkAuthentication = () => {
    // Prevent multiple initializations
    if (isInitialized) {
      console.log('Keycloak already initialized, skipping');
      return Promise.resolve(keycloak.authenticated);
    }

    if (isInitializing) {
      console.log('Keycloak initialization in progress, waiting...');
      // Return a promise that resolves when initialization is complete
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (isInitialized) {
            clearInterval(checkInterval);
            resolve(keycloak.authenticated);
          }
        }, 100);
      });
    }

    isInitializing = true;
    
    return keycloak
      .init({ 
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false // Disable iframe checking which can cause issues
      })
      .then((authenticated) => {
        isInitialized = true;
        isInitializing = false;
        
        if (authenticated) {
          console.log('Keycloak authenticated');
          // Make keycloak available globally for UserService
          window.keycloak = keycloak;
          // Notify listeners that user is authenticated
          notifyAuthStateChange(true);
        } else {
          console.log('User not authenticated');
          notifyAuthStateChange(false);
        }
        
        return authenticated;
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        isInitializing = false;
        notifyAuthStateChange(false);
        throw error;
      });
  };

  // Add Keycloak to the window object for global access
  declare global {
    interface Window {
      keycloak: typeof keycloak;
    }
  }

export default keycloak;