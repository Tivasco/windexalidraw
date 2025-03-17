import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import { authenticate, generateToken } from '../middleware/auth.js';
import { getUsernameById } from '../services/KeycloakAdminService.js';

// Load environment variables
dotenv.config();

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.API_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'webapp_db',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Verify database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connection established successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to database:', err);
    console.error('Please make sure your MySQL server is running and the credentials in .env are correct');
    process.exit(1); // Exit if we can't connect to the database
  });

// Login endpoint (unprotected)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find the user in the database
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    const user = users[0];
    
    // Check if the password is correct
    // In this test environment, we'll accept any password for the test users
    // In production, you would use bcrypt.compare(password, user.password)
    const isValidPassword = true;
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Generate a token
    const token = generateToken(user);
    
    // Return the token and user info
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Status endpoint at root level (unprotected)
app.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// Status endpoint (unprotected)
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// Apply authentication middleware to all /api routes except those already defined
app.use('/api', authenticate);

// Get current user
app.get('/api/users/current', async (req, res) => {
  try {
    // The user is already set in the request by the authenticate middleware
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(req.user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
});

// Example protected endpoint
app.get('/api/protected', (req, res) => {
  res.json({ 
    message: 'This is a protected endpoint',
    user: req.user
  });
});

// Excalidraw board endpoints

// Get all boards for current user
app.get('/api/excalidraw/boards', async (req, res) => {
  try {
    const [boards] = await pool.execute(
      'SELECT id, title, created_at, updated_at FROM excalidraw_boards ORDER BY updated_at DESC'
    );
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// Get a specific board
app.get('/api/excalidraw/boards/:id', async (req, res) => {
  try {
    const [boards] = await pool.execute(
      'SELECT * FROM excalidraw_boards WHERE id = ?',
      [req.params.id]
    );
    
    if (boards.length === 0) {
      return res.status(404).json({ error: 'Board not found' });
    }
    
    const board = boards[0];
    console.log('Retrieved board data:', board.data);
    
    // Ensure data is parsed before sending
    board.data = typeof board.data === 'string' ? board.data : JSON.stringify(board.data);
    
    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

// Create a new board
app.post('/api/excalidraw/boards', async (req, res) => {
  try {
    const { title, data } = req.body;
    
    console.log('Received board data:', { title, data });
    
    if (!title || !data) {
      return res.status(400).json({ error: 'Title and data are required' });
    }
    
    const id = uuidv4();
    
    // Ensure data is a valid JSON object
    let jsonData;
    try {
      // If data is a string, try to parse it
      if (typeof data === 'string') {
        jsonData = JSON.parse(data);
      } else {
        jsonData = data;
      }
      
      // Validate the data structure
      if (!jsonData.elements || !Array.isArray(jsonData.elements)) {
        throw new Error('Invalid data structure: missing elements array');
      }
      
      // Convert back to string for storage
      const dataString = JSON.stringify(jsonData);
      console.log('Saving board with data:', dataString);
      
      await pool.execute(
        'INSERT INTO excalidraw_boards (id, title, data) VALUES (?, ?, ?)',
        [id, title, dataString]
      );
      
      res.status(201).json({ id });
    } catch (parseError) {
      console.error('Error processing data:', parseError);
      res.status(400).json({ error: 'Invalid data format: ' + parseError.message });
    }
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ 
      error: 'Failed to create board',
      details: error.message,
      stack: error.stack
    });
  }
});

// Update an existing board
app.put('/api/excalidraw/boards/:id', async (req, res) => {
  try {
    const { title, data } = req.body;
    console.log('Update request:', { id: req.params.id, title, data });
    
    if (!title || !data) {
      return res.status(400).json({ error: 'Title and data are required' });
    }
    
    // Ensure data is a valid JSON object
    let jsonData;
    try {
      // If data is a string, try to parse it
      if (typeof data === 'string') {
        jsonData = JSON.parse(data);
      } else {
        jsonData = data;
      }
      
      // Validate the data structure
      if (!jsonData.elements || !Array.isArray(jsonData.elements)) {
        throw new Error('Invalid data structure: missing elements array');
      }
      
      // Convert back to string for storage
      const dataString = JSON.stringify(jsonData);
      console.log('Updating board with data:', dataString);
      
      const [result] = await pool.execute(
        'UPDATE excalidraw_boards SET title = ?, data = ? WHERE id = ?',
        [title, dataString, req.params.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Board not found' });
      }
      
      res.json({ id: req.params.id });
    } catch (parseError) {
      console.error('Error processing update data:', parseError);
      res.status(400).json({ error: 'Invalid data format: ' + parseError.message });
    }
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ 
      error: 'Failed to update board',
      details: error.message,
      stack: error.stack
    });
  }
});

// Delete a board
app.delete('/api/excalidraw/boards/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM excalidraw_boards WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Board not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
}); 