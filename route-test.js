// This is a simple script to test your routes
// Install first: npm install axios
const axios = require('axios');

// Define base URL - change this to match your server
const BASE_URL = 'http://localhost:5000';

// Test functions
async function testRegisterRoute() {
  try {
    // Try with /auth/register
    console.log('Testing /auth/register...');
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username: 'testuser1',
      email: 'test1@example.com',
      password: 'password123'
    });
    console.log('SUCCESS! Response:', response.data);
  } catch (error) {
    console.error('Error with /auth/register:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    // Try again with /api/auth/register
    try {
      console.log('\nTrying /api/auth/register as fallback...');
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('SUCCESS with /api/auth/register! Response:', response.data);
    } catch(fallbackError) {
      console.error('Error with /api/auth/register:', fallbackError.message);
      if (fallbackError.response) {
        console.error('Status:', fallbackError.response.status);
        console.error('Data:', fallbackError.response.data);
      }
    }
  }
}

// Run tests
testRegisterRoute();