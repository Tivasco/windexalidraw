import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../config/keycloak';

// Track Keycloak availability
let keycloakAvailable = false;
let keycloak = null;
let initializationInProgress = false;

// For development/testing, we'll also support JWT token-based auth
const AuthService = {
  // Properties
  keycloak: null,
  authenticated: false,
  usingKeycloak: false,
  token: null,
  refreshToken: null,
  
  /**
   * Check if Keycloak server is available
   * @returns {Promise<boolean>} Promise resolving to server availability
   */
  checkServerAvailability: async () => {
    try {
      // Try to fetch the well-known configuration with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const wellKnownUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/.well-known/openid-configuration`;
      console.log(`Checking Keycloak availability at: ${wellKnownUrl}`);
      
      const response = await fetch(wellKnownUrl, { 
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log('Keycloak server is available');
        keycloakAvailable = true;
        return true;
      } else {
        console.log('Keycloak server returned an error:', response.status);
        keycloakAvailable = false;
        return false;
      }
    } catch (error) {
      console.error('Error checking Keycloak server availability:', error);
      keycloakAvailable = false;
      return false;
    }
  },
  
  // Initialize authentication
  init: async () => {
    // Prevent multiple simultaneous initialization attempts
    if (initializationInProgress) {
      console.log('Initialization already in progress, waiting...');
      // Wait for the current initialization to complete
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!initializationInProgress) {
            clearInterval(checkInterval);
            resolve(AuthService.authenticated);
          }
        }, 100);
      });
    }
    
    initializationInProgress = true;
    
    try {
      console.log('Initializing authentication service...');
      
      // Check if we already have a valid Keycloak instance
      if (keycloak && keycloak.authenticated) {
        console.log('Keycloak already initialized and authenticated');
        AuthService.authenticated = true;
        AuthService.usingKeycloak = true;
        initializationInProgress = false;
        return true;
      }
      
      // Check if Keycloak server is available
      const isServerAvailable = await AuthService.checkServerAvailability();
      
      if (!isServerAvailable) {
        console.log('Keycloak server is not available, falling back to JWT authentication');
        keycloakAvailable = false;
        AuthService.usingKeycloak = false;
        initializationInProgress = false;
        return AuthService.initJwtAuth();
      }
      
      // Always try to initialize Keycloak first
      try {
        console.log('Initializing Keycloak with config:', keycloakConfig);
        
        // Create Keycloak instance
        keycloak = new Keycloak(keycloakConfig);
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
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              console.log('Token refreshed');
              localStorage.setItem('token', keycloak.token);
            }
          }).catch(() => {
            console.error('Failed to refresh token');
          });
        };
        
        // Store token information
        if (authenticated) {
          AuthService.token = keycloak.token;
          AuthService.refreshToken = keycloak.refreshToken;
          
          // Store token in localStorage for API calls
          localStorage.setItem('token', keycloak.token);
          localStorage.setItem('refresh-token', keycloak.refreshToken);
          
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
        
        // Don't retry with login-required as it can cause redirect loops
        console.log('Falling back to JWT authentication');
        keycloakAvailable = false;
        AuthService.usingKeycloak = false;
        initializationInProgress = false;
        return AuthService.initJwtAuth();
      }
    } catch (error) {
      console.error('Error in AuthService init:', error);
      keycloakAvailable = false;
      AuthService.usingKeycloak = false;
      initializationInProgress = false;
      return AuthService.initJwtAuth();
    }
  },
  
  // Initialize JWT authentication (fallback)
  initJwtAuth: async () => {
    console.log('Initializing JWT authentication');
    // Check if we have a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Validate token
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
        
        // If we get here, token is invalid
        localStorage.removeItem('token');
        AuthService.authenticated = false;
        return false;
      } catch (error) {
        console.error('Error validating token:', error);
        localStorage.removeItem('token');
        AuthService.authenticated = false;
        return false;
      }
    } else {
      AuthService.authenticated = false;
      return false;
    }
  },
  
  // Login with Keycloak
  login: () => {
    if (keycloakAvailable && keycloak) {
      console.log('Logging in with Keycloak...');
      
      // Clear any previous error state
      sessionStorage.removeItem('redirect_count');
      sessionStorage.removeItem('last_url');
      
      // Use the login method with options
      return keycloak.login(keycloakConfig.loginOptions);
    } else {
      console.error('Keycloak is not available');
      throw new Error('Keycloak is not available');
    }
  },
  
  // Login with credentials (fallback)
  loginWithCredentials: async (username, password) => {
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
  },
  
  // Logout
  logout: () => {
    if (keycloakAvailable && keycloak && keycloak.authenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('user_info');
      sessionStorage.removeItem('redirect_count');
      sessionStorage.removeItem('last_url');
      return keycloak.logout(keycloakConfig.logoutOptions);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      AuthService.token = null;
      AuthService.authenticated = false;
      window.location.href = '/';
    }
  },
  
  // Get authentication status
  isAuthenticated: () => {
    if (keycloakAvailable && keycloak) {
      return keycloak.authenticated;
    } else {
      return AuthService.authenticated;
    }
  },
  
  // Get token
  getToken: () => {
    if (keycloakAvailable && keycloak && keycloak.authenticated) {
      return keycloak.token;
    } else {
      return localStorage.getItem('token');
    }
  },
  
  // Get user info
  getUserInfo: () => {
    if (keycloakAvailable && keycloak && keycloak.authenticated && keycloak.tokenParsed) {
      return {
        id: keycloak.subject || keycloak.tokenParsed.sub,
        username: keycloak.tokenParsed.preferred_username,
        email: keycloak.tokenParsed.email,
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        roles: keycloak.tokenParsed.realm_access?.roles || []
      };
    } else {
      const userInfoStr = localStorage.getItem('user_info');
      if (userInfoStr) {
        try {
          return JSON.parse(userInfoStr);
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  },
  
  // Check if using Keycloak
  isUsingKeycloak: () => {
    return AuthService.usingKeycloak;
  }
};

export default AuthService; 