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
  database: process.env.DB_NAME || 'webapp_db',
};

async function verifyConnection() {
  let connection;
  
  try {
    // Create a connection
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to MySQL server successfully');
    
    // Check if the users table exists
    const [rows] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
    `, [dbConfig.database]);
    
    if (rows.length > 0) {
      console.log('✅ Users table exists');
      
      // Check if there are any users
      const [userRows] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log(`✅ Found ${userRows[0].count} users in the database`);
    } else {
      console.log('❌ Users table does not exist. Please run the initialization script.');
    }
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    console.error('Please make sure your MySQL server is running and the credentials in .env are correct');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the verification
verifyConnection(); 