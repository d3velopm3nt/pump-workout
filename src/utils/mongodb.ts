// This file is for client-side imports and types only
// MongoDB connections should be handled server-side

// For TypeScript types only
import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

// Define an interface for database operations that will be implemented on the server
export interface DatabaseConnection {
  getCollection: (name: string) => any;
  // Add other methods as needed
}

// Define API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pump-workout';
const MONGODB_DB = process.env.MONGODB_DB || 'pump-workout';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Get the API URL based on environment
const getApiUrl = () => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? '/api' : 'http://localhost:5173/api';
};

// Export the API endpoint for use in other files
export const API_ENDPOINT = getApiUrl();

// Helper function to make API calls to your backend
export async function fetchFromApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const contentType = response.headers.get('content-type');
    let responseData: any;

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || `API request failed: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 