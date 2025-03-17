import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_URL = process.env.VITE_API_URL || 'http://localhost:3001';

async function checkApiStatus() {
  try {
    console.log(`Checking API status at ${API_URL}/api/status...`);
    
    const response = await fetch(`${API_URL}/api/status`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API is running:', data);
    } else {
      console.error(`❌ API returned status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error connecting to API:', error.message);
    console.error('Please make sure the API server is running.');
  }
}

// Run the check
checkApiStatus(); 