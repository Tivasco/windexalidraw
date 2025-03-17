import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
};

// Basic schema for the application
const schema = `
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'webapp_db'};

-- Use the database
USE ${process.env.DB_NAME || 'webapp_db'};

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Drop existing boards table if it exists
DROP TABLE IF EXISTS excalidraw_boards;

-- Create boards table without user_id
CREATE TABLE IF NOT EXISTS excalidraw_boards (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a default admin user
INSERT INTO users (id, username, email, password) 
VALUES ('1', 'admin', 'admin@example.com', '$2b$10$JqHRdQbM8LzRMtzfwYf5/.XaXgP5Q44wLS0QMqmN9NsJcAUZVYYyG')
ON DUPLICATE KEY UPDATE username = 'admin';
`;

async function initializeDatabase() {
  let connection;
  
  try {
    // Create a connection
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Connected to MySQL server');
    
    // Execute the schema
    await connection.query(schema);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase(); 