import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

// Secret key for JWT - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Middleware to authenticate requests using JWT or Keycloak tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticate = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  // Format should be "Bearer [token]"
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }
  
  try {
    // First try to verify as a Keycloak token
    // For Keycloak tokens, we'll just set a default user since we don't have direct verification
    // In a real app, you would verify the token with Keycloak
    if (token && token.length > 100) { // Simple heuristic to identify Keycloak tokens (they're usually longer)
      console.log('Using Keycloak token');
      
      // Try to extract user info from the Keycloak token
      try {
        // Basic JWT parsing to get the payload
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          
          // Extract user information from the token
          req.user = {
            id: payload.sub || 'keycloak_user', // Use the subject as the user ID
            username: payload.preferred_username || 'keycloak_user',
            email: payload.email || '',
            name: payload.name || '',
            keycloak: true // Flag to indicate this is a Keycloak user
          };
          
          console.log('Extracted user from Keycloak token:', req.user);
          return next();
        }
      } catch (e) {
        console.error('Error parsing Keycloak token:', e);
      }
      
      // Fallback to default user if token parsing fails
      req.user = { id: 'keycloak_user', username: 'keycloak_user', keycloak: true };
      return next();
    }
    
    // If not a Keycloak token, verify as a JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request object
    req.user = decoded;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object to encode in the token
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  // Create payload with user info (avoid including sensitive data like passwords)
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  
  // Sign the token with the secret key and set expiration
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

/**
 * Optional middleware to get user info if token is present
 * Does not reject the request if no token is provided
 */
export const getUserFromToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    if (token) {
      try {
        // Check if it's a Keycloak token
        if (token.length > 100) {
          // Try to extract user info from the Keycloak token
          try {
            // Basic JWT parsing to get the payload
            const parts = token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
              
              // Extract user information from the token
              req.user = {
                id: payload.sub || 'keycloak_user', // Use the subject as the user ID
                username: payload.preferred_username || 'keycloak_user',
                email: payload.email || '',
                name: payload.name || '',
                keycloak: true // Flag to indicate this is a Keycloak user
              };
            }
          } catch (e) {
            console.error('Error parsing Keycloak token:', e);
            req.user = { id: 'keycloak_user', username: 'keycloak_user', keycloak: true };
          }
        } else {
          // Otherwise verify as JWT
          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
        }
      } catch (error) {
        // Invalid token, but we'll continue anyway
        req.user = null;
      }
    }
  }
  
  next();
}; 