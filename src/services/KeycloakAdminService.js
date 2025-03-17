import KcAdminClient from '@keycloak/keycloak-admin-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Keycloak configuration
const keycloakConfig = {
  baseUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080/auth',
  realmName: process.env.KEYCLOAK_REALM || 'webapp',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'webapp-client',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'your-client-secret',
  adminUsername: process.env.KEYCLOAK_ADMIN_USERNAME || 'admin',
  adminPassword: process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin',
};

// Create a Keycloak admin client
const kcAdminClient = new KcAdminClient({
  baseUrl: keycloakConfig.baseUrl,
  realmName: 'master', // Always authenticate to the master realm
});

// Cache for user information to reduce API calls
const userCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Authenticate with Keycloak
 * @returns {Promise<void>}
 */
export const authenticate = async () => {
  try {
    await kcAdminClient.auth({
      username: keycloakConfig.adminUsername,
      password: keycloakConfig.adminPassword,
      grantType: 'password',
      clientId: 'admin-cli',
    });
    
    // Set the realm to the application realm for subsequent operations
    kcAdminClient.setConfig({
      realmName: keycloakConfig.realmName,
    });
    
    console.log('Authenticated with Keycloak admin client');
  } catch (error) {
    console.error('Error authenticating with Keycloak:', error);
    throw error;
  }
};

/**
 * Get a user by ID
 * @param {string} userId - Keycloak user ID
 * @returns {Promise<Object>} User object
 */
export const getUserById = async (userId) => {
  try {
    // Check cache first
    if (userCache.has(userId)) {
      const cachedData = userCache.get(userId);
      if (Date.now() - cachedData.timestamp < CACHE_TTL) {
        return cachedData.user;
      }
    }
    
    // Authenticate if needed
    if (!kcAdminClient.accessToken) {
      await authenticate();
    }
    
    // Get user from Keycloak
    const user = await kcAdminClient.users.findOne({ id: userId });
    
    // Cache the result
    userCache.set(userId, {
      user,
      timestamp: Date.now(),
    });
    
    return user;
  } catch (error) {
    console.error(`Error getting user by ID ${userId}:`, error);
    return null;
  }
};

/**
 * Get a username by user ID
 * @param {string} userId - Keycloak user ID
 * @returns {Promise<string>} Username
 */
export const getUsernameById = async (userId) => {
  try {
    const user = await getUserById(userId);
    return user ? (user.username || 'Unknown') : 'Unknown';
  } catch (error) {
    console.error(`Error getting username for user ID ${userId}:`, error);
    return 'Unknown';
  }
};

/**
 * Get all users
 * @returns {Promise<Array>} Array of user objects
 */
export const getAllUsers = async () => {
  try {
    // Authenticate if needed
    if (!kcAdminClient.accessToken) {
      await authenticate();
    }
    
    // Get all users from Keycloak
    const users = await kcAdminClient.users.find();
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};

export default {
  authenticate,
  getUserById,
  getUsernameById,
  getAllUsers,
}; 