import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AuthService from './services/AuthService';

// Initialize app
const initApp = async () => {
  try {
    // Check for redirect loop detection
    const currentUrl = window.location.href;
    const redirectCount = sessionStorage.getItem('redirect_count') || 0;
    
    // If we're being redirected to the same URL repeatedly, it might be a loop
    if (sessionStorage.getItem('last_url') === currentUrl) {
      const newCount = parseInt(redirectCount) + 1;
      sessionStorage.setItem('redirect_count', newCount);
      
      // If we've been redirected to the same URL more than 3 times, it's probably a loop
      if (newCount > 3) {
        console.error('Detected potential redirect loop, clearing session and stopping authentication');
        sessionStorage.removeItem('redirect_count');
        sessionStorage.removeItem('last_url');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        
        // Force render without initializing Keycloak
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>
        );
        return;
      }
    } else {
      // New URL, reset counter
      sessionStorage.setItem('redirect_count', 1);
      sessionStorage.setItem('last_url', currentUrl);
    }
    
    // Initialize Keycloak
    console.log('Initializing Keycloak...');
    const authenticated = await AuthService.init();
    console.log('Keycloak initialization result:', authenticated);
    
    if (authenticated) {
      console.log('User is authenticated with Keycloak');
    } else {
      console.log('User is not authenticated with Keycloak, will show login options');
    }
  } catch (error) {
    console.error('Failed to initialize Keycloak:', error);
    // Continue anyway, the app will handle unauthenticated state
  }
  
  // Render the app regardless of Keycloak initialization result
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Start the app
initApp(); 