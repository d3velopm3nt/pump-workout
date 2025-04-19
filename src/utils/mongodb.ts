// This file is for client-side imports and types only
// MongoDB connections should be handled server-side

// For TypeScript types only
import type { Db } from 'mongodb';

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
export async function fetchFromApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
  };

  try {
    const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // Add cache: 'no-store' to force fresh data
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type');
    let responseData: any;

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      responseData = {
        success: response.ok,
        data: text,
        message: response.ok ? 'Success' : 'Error',
      };
    }

    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || `API request failed: ${response.statusText}`);
    }

    // If the response is in our ApiResponse format
    if (typeof responseData === 'object' && 'success' in responseData) {
      return responseData.data as T;
    }

    // If the response is a direct array or object, return it as is
    return responseData as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 