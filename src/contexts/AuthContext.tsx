import { createContext, useContext } from 'react';
import { useUser, useClerk, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: any | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  isLoading: boolean;
}

// Create initial context value
const initialContextValue: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isLoading: true
};

// Initialize context with the default value
const AuthContext = createContext<AuthContextType>(initialContextValue);

// List of public routes that don't require authentication
const publicRoutes = ['/landing', '/login', '/signup'];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { isSignedIn } = useClerkAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect URL from query parameters
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    return redirect ? decodeURIComponent(redirect) : '/';
  };

  const value = {
    user,
    login: async () => {
      // Store the current location to redirect back after login
      const returnTo = location.pathname === '/landing' ? getRedirectUrl() : location.pathname;
      navigate(`/login?redirect=${encodeURIComponent(returnTo)}`);
    },
    logout: async () => {
      await signOut();
      navigate('/landing');
    },
    register: async () => {
      // Store the current location to redirect back after registration
      const returnTo = location.pathname === '/landing' ? getRedirectUrl() : location.pathname;
      navigate(`/signup?redirect=${encodeURIComponent(returnTo)}`);
    },
    isLoading: !isLoaded
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If user is signed in and we have a redirect URL, navigate to it
  if (isSignedIn && location.pathname === '/login') {
    const redirectUrl = getRedirectUrl();
    navigate(redirectUrl);
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 