import { createContext, useContext, useState, useEffect } from 'react';
import { createClient,  User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
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

// Example of accessing env variables in Vite
console.log(import.meta.env.VITE_AUTH_KEY)

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// List of public routes that don't require authentication
const publicRoutes = ['/landing', '/login', '/signup'];

// Verify Supabase connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  if (session) {
    console.log('Session exists:', session);
  }
});

// Test the connection
// const testSupabaseConnection = async () => {
//   try {
//     const { data, error } = await supabase.from('users').select('*').limit(1);
//     if (error) {
//       console.error('Supabase connection error:', error);
//     } else {
//       console.log('Supabase connection successful');
//     }
//   } catch (err) {
//     console.error('Failed to test Supabase connection:', err);
//   }
// };

// testSupabaseConnection();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Only redirect if not on a public route and not authenticated
      if (!session?.user && !publicRoutes.includes(location.pathname)) {
        navigate('/landing');
      }
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Only redirect if not on a public route and not authenticated
      if (!session?.user && !publicRoutes.includes(location.pathname)) {
        navigate('/landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const value = {
    user,
    login: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error('Sign in error:', error);
          switch (error.message) {
            case 'Invalid login credentials':
              throw new Error('Invalid email or password');
            case 'Email not confirmed':
              throw new Error('Please verify your email address');
            default:
              throw new Error(error.message);
          }
        }

        if (data?.user) {
          console.log('Successfully signed in:', data.user);
          // Check if user has created character
          const { data: userData } = await supabase
            .from('user_profiles')
            .select('has_character')
            .eq('user_id', data.user.id)
            .single();

          if (userData?.has_character) {
            navigate('/');
          } else {
            navigate('/create-character');
          }
        }
      } catch (err) {
        console.error('Detailed sign in error:', err);
        throw err;
      }
    },
    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate('/landing');
      } catch (err) {
        console.error('Sign out error:', err);
        throw err;
      }
    },
    register: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error('Sign up error:', error);
          throw error;
        }

        if (data?.user) {
          console.log('Successfully signed up:', data.user);
          navigate('/');
        }
      } catch (err) {
        console.error('Detailed sign up error:', err);
        throw err;
      }
    },
    isLoading,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 