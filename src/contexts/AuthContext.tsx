import { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const login = async () => {
    // Clerk handles login through its components
    window.location.href = '/sign-in';
  };

  const logout = async () => {
    await signOut();
  };

  const value = {
    user,
    loading: !isLoaded,
    error: null,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 