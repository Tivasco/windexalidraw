import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../config/keycloak';

// Extend the Keycloak type to include missing properties
interface KeycloakInstance extends Keycloak {
  refreshToken?: string;
  tokenParsed?: {
    sub: string;
    preferred_username: string;
    email: string;
    given_name: string;
    family_name: string;
    realm_access?: {
      roles: string[];
    };
  };
  subject?: string;
}

interface AuthService {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  usingKeycloak: boolean;
  init: () => Promise<boolean>;
  login: () => void;
  logout: () => void;
  loginWithCredentials: (username: string, password: string) => Promise<boolean>;
}

let keycloak: KeycloakInstance | null = null;
let keycloakAvailable = false;
let initializationInProgress = false;

// Initialize JWT auth as a fallback
const initJwtAuth = async (): Promise<boolean> => {
  console.log('Initializing JWT authentication');
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          AuthService.authenticated = true;
          AuthService.token = token;
          return true;
        }
      }
      
      localStorage.removeItem('token');
      AuthService.authenticated = false;
      return false;
    } catch (error) {
      console.error('Error validating token:', error);
      localStorage.removeItem('token');
      AuthService.authenticated = false;
      return false;
    }
  }
  AuthService.authenticated = false;
  return false;
};

const AuthService: AuthService = {
  keycloak: null,
  authenticated: false,
  token: null,
  refreshToken: null,
  usingKeycloak: false,

  init: async () => {
    if (initializationInProgress) {
      return AuthService.authenticated;
    }

    initializationInProgress = true;

    try {
      console.log('Initializing Keycloak with config:', keycloakConfig);
      
      // Create Keycloak instance
      keycloak = new Keycloak(keycloakConfig) as KeycloakInstance;
      AuthService.keycloak = keycloak;
      
      // Initialize with the options from config
      const authenticated = await keycloak.init(keycloakConfig.initOptions);
      console.log('Keycloak initialized, authenticated:', authenticated);
      
      keycloakAvailable = true;
      AuthService.usingKeycloak = true;
      AuthService.authenticated = authenticated;
      
      // Set up token refresh
      keycloak.onTokenExpired = () => {
        console.log('Token expired, refreshing...');
        keycloak?.updateToken(70).then((refreshed) => {
          if (refreshed && keycloak?.token) {
            console.log('Token refreshed');
            localStorage.setItem('token', keycloak.token);
          }
        }).catch(() => {
          console.error('Failed to refresh token');
        });
      };
      
      // Store token information
      if (authenticated && keycloak.token) {
        AuthService.token = keycloak.token;
        AuthService.refreshToken = keycloak.refreshToken || null;
        
        // Store token in localStorage for API calls
        localStorage.setItem('token', keycloak.token);
        if (keycloak.refreshToken) {
          localStorage.setItem('refresh-token', keycloak.refreshToken);
        }
        
        // Store user info
        if (keycloak.tokenParsed) {
          const userInfo = {
            id: keycloak.subject || keycloak.tokenParsed.sub,
            username: keycloak.tokenParsed.preferred_username,
            email: keycloak.tokenParsed.email,
            firstName: keycloak.tokenParsed.given_name,
            lastName: keycloak.tokenParsed.family_name,
            roles: keycloak.tokenParsed.realm_access?.roles || []
          };
          localStorage.setItem('user_info', JSON.stringify(userInfo));
        }
      }
      
      initializationInProgress = false;
      return authenticated;
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
      keycloakAvailable = false;
      AuthService.usingKeycloak = false;
      initializationInProgress = false;
      return initJwtAuth();
    }
  },

  login: () => {
    if (keycloakAvailable && keycloak) {
      console.log('Logging in with Keycloak...');
      
      // Clear any previous error state
      sessionStorage.removeItem('redirect_count');
      sessionStorage.removeItem('last_url');
      
      // Use the login method with options
      keycloak.login(keycloakConfig.loginOptions);
    } else {
      console.error('Keycloak is not available');
      throw new Error('Keycloak is not available');
    }
  },

  logout: () => {
    if (keycloakAvailable && keycloak && AuthService.authenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('user_info');
      sessionStorage.removeItem('redirect_count');
      sessionStorage.removeItem('last_url');
      keycloak.logout(keycloakConfig.logoutOptions);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      AuthService.token = null;
      AuthService.authenticated = false;
      window.location.href = '/';
    }
  },

  loginWithCredentials: async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          AuthService.token = data.token;
          AuthService.authenticated = true;
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
};

export default AuthService; 