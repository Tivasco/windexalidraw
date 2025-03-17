import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import AuthService from '../services/AuthService';

function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, loading, login, loginWithCredentials } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [keycloakAvailable, setKeycloakAvailable] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);
  
  // Check for error parameters in the URL (from Keycloak)
  useEffect(() => {
    // Check for hash fragment errors (Keycloak sometimes returns errors in the hash)
    const hashParams = new URLSearchParams(location.hash.replace('#', ''));
    const hashError = hashParams.get('error');
    const hashErrorDesc = hashParams.get('error_description');
    
    // Check for query string errors
    const queryParams = new URLSearchParams(location.search);
    const queryError = queryParams.get('error');
    const queryErrorDesc = queryParams.get('error_description');
    
    const errorParam = hashError || queryError;
    const errorDescription = hashErrorDesc || queryErrorDesc;
    
    if (errorParam) {
      console.error('Keycloak error:', errorParam, errorDescription);
      setError(`Keycloak error: ${errorDescription || errorParam}`);
      setShowLoginForm(true);
      setKeycloakAvailable(false);
    }
  }, [location]);
  
  // Automatically redirect to Keycloak login if not authenticated
  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard');
    } else if (!loading && !loginAttempted && !error) {
      // Automatically try to login with Keycloak
      const autoLogin = async () => {
        try {
          const isAvailable = await AuthService.checkServerAvailability();
          setKeycloakAvailable(isAvailable);
          
          if (isAvailable) {
            console.log('Keycloak is available, redirecting to login...');
            setLoginAttempted(true);
            await login();
          } else {
            console.log('Keycloak is not available, showing login form');
            setShowLoginForm(true);
          }
        } catch (error) {
          console.error('Error checking Keycloak availability:', error);
          setKeycloakAvailable(false);
          setShowLoginForm(true);
        }
      };
      
      autoLogin();
    }
  }, [authenticated, loading, navigate, loginAttempted, login, error]);

  const handleLogin = async () => {
    try {
      setError('');
      setLoginAttempted(true);
      console.log('Attempting Keycloak login from button click...');
      
      // Add a timestamp to prevent caching issues
      const timestamp = new Date().getTime();
      localStorage.setItem('login_timestamp', timestamp.toString());
      
      await login();
      
      // If login() doesn't redirect (which it should), we'll end up here
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to Keycloak. Please try the local login option.');
      setShowLoginForm(true);
      setLoginAttempted(false);
    }
  };
  
  const handleFormLogin = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);
    
    try {
      const success = await loginWithCredentials(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading || (!showLoginForm && !error && !authenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Welcome</h1>
          <p className="mt-3 text-lg text-gray-600">
            WebApp Boilerplate with React, Express, and Keycloak
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {!showLoginForm ? (
          <div className="mt-8">
            <button
              onClick={handleLogin}
              disabled={loginAttempted}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loginAttempted ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loginAttempted ? 'Redirecting to Keycloak...' : 'Sign in with Keycloak'}
            </button>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowLoginForm(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Use local login instead
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            {keycloakAvailable && !loginAttempted && (
              <>
                <div className="mb-4">
                  <button
                    onClick={handleLogin}
                    disabled={loginAttempted}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loginAttempted ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loginAttempted ? 'Redirecting to Keycloak...' : 'Sign in with Keycloak'}
                  </button>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or use local login</span>
                  </div>
                </div>
              </>
            )}
            
            <form onSubmit={handleFormLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${formLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {formLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              <div className="text-sm text-center">
                <p className="text-gray-500">
                  For testing, use: admin / password
                </p>
              </div>
            </form>
          </div>
        )}
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/components"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View UI Components
          </Link>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            A modern web application boilerplate with React, Express, MySQL, and Keycloak integration.
          </p>
          <p className="mt-4">
            <Link to="/components" className="text-blue-600 hover:text-blue-800 font-medium">
              View UI Components Showcase
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage; 