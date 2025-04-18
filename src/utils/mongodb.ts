// This file is for client-side imports and types only
// MongoDB connections should be handled server-side

// For TypeScript types only
import type { Db } from 'mongodb';

// Define an interface for database operations that will be implemented on the server
export interface DatabaseConnection {
  getCollection: (name: string) => any;
  // Add other methods as needed
}

// Get the API URL based on environment
const getApiUrl = () => {
  // Check if we're in production (Vercel deployment)
  const isProduction = import.meta.env.PROD;
  
  // Use relative URL in production (where frontend and API are on same domain)
  // In development, you might need to point to a separate backend server
  return isProduction ? '/api' : '/api';
};

// Export the API endpoint for use in other files
export const API_ENDPOINT = getApiUrl();

// Helper function to make API calls to your backend
export async function fetchFromApi(endpoint: string, options = {}) {
  const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
} 