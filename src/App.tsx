import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <AuthProvider>
              <AppRoutes />
              <Toaster />
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default App;