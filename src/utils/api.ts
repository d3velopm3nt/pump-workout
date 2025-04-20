// API utilities and types

// Define API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Get the API URL based on environment
const getApiUrl = () => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? '/api' : 'http://localhost:3001/api';
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `API request failed: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 