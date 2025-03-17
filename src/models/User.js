import db from '../utils/db.js';

/**
 * @typedef {Object} User
 * @property {number|string} [id]
 * @property {string} username
 * @property {string} email
 * @property {string} [password]
 * @property {Date} [created_at]
 * @property {Date} [updated_at]
 * @property {boolean} [keycloak]
 */

/**
 * User model for handling user-related operations
 */
class UserModel {
  /**
   * Get user by ID
   * @param {number|string} id
   * @returns {Promise<User|null>}
   */
  async getById(id) {
    const [rows] = await db.execute(
      'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  }
  
  /**
   * Get user by username
   * @param {string} username
   * @returns {Promise<User|null>}
   */
  async getByUsername(username) {
    const [rows] = await db.execute(
      'SELECT id, username, email, password, created_at, updated_at FROM users WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  }
  
  /**
   * Create a new user
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [user.username, user.email, user.password]
    );
    
    return {
      id: result.insertId,
      username: user.username,
      email: user.email
    };
  }
  
  /**
   * Get the current user ID from the request
   * @param {Object} req - Express request object
   * @returns {string} User ID
   */
  static getCurrentUserId(req) {
    if (req.user && req.user.id) {
      return req.user.id;
    }
    return '1'; // Default user ID for system operations
  }
  
  /**
   * Get the current username from the request
   * @param {Object} req - Express request object
   * @returns {string} Username
   */
  static getCurrentUsername(req) {
    if (req.user && req.user.username) {
      return req.user.username;
    }
    return 'System'; // Default username for system operations
  }

  /**
   * Check if the current user is authenticated
   * @param {Object} req - Express request object
   * @returns {boolean} Whether the user is authenticated
   */
  static isAuthenticated(req) {
    return !!req.user;
  }

  /**
   * Check if the current user has a specific role
   * @param {Object} req - Express request object
   * @param {string} role - Role to check
   * @returns {boolean} Whether the user has the role
   */
  static hasRole(req, role) {
    if (!req.user || !req.user.roles) {
      return false;
    }
    return req.user.roles.includes(role);
  }
}

export const User = {};
export default UserModel; 