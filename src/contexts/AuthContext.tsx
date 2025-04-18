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

  const value = {
    user,
    login: async () => {
      // Clerk handles login through their components
      navigate('/login');
    },
    logout: async () => {
      await signOut();
      navigate('/landing');
    },
    register: async () => {
      // Clerk handles registration through their components
      navigate('/signup');
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 