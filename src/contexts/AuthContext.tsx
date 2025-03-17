import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  user: any;
  error: string | null;
  login: () => Promise<boolean>;
  loginWithCredentials: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Initialize authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        console.log('Initializing authentication...');
        
        // Initialize authentication service
        const isAuthenticated = await AuthService.init();
        console.log('Authentication initialized, authenticated:', isAuthenticated);
        
        setAuthenticated(isAuthenticated);
        
        // If authenticated, get user info
        if (isAuthenticated) {
          const userInfo = AuthService.getUserInfo();
          if (userInfo) {
            console.log('User info retrieved:', userInfo);
            setUser(userInfo);
          } else {
            console.log('No user info available, using default');
            // Fallback to default user info
            setUser({
              id: '1',
              username: 'user',
              email: 'user@example.com',
              roles: ['user']
            });
          }
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);
        setError(error.message);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login with Keycloak
  const login = async () => {
    try {
      console.log('Attempting to login with Keycloak...');
      await AuthService.login();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return false;
    }
  };

  // Login with credentials (fallback)
  const loginWithCredentials = async (username, password) => {
    try {
      setLoading(true);
      const success = await AuthService.loginWithCredentials(username, password);
      
      if (success) {
        setAuthenticated(true);
        setUser({
          id: '1',
          username: username,
          email: `${username}@example.com`,
          roles: ['user']
        });
      }
      
      return success;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AuthService.logout();
      setAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  // Get authentication token
  const getToken = () => {
    return AuthService.getToken();
  };

  // Check if using Keycloak
  const isUsingKeycloak = () => {
    return AuthService.isUsingKeycloak();
  };

  // Context value
  const value = {
    authenticated,
    loading,
    user,
    error,
    login,
    loginWithCredentials,
    logout,
    hasRole,
    getToken,
    isUsingKeycloak
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 