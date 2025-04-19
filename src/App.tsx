import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { MuscleGroupNavigation } from './components/muscle-groups/MuscleGroupNavigation';
import { AuthProvider } from './contexts/AuthContext';
import { ExerciseList } from './components/muscle-groups/ExerciseList';
import { ExerciseDetail } from './components/muscle-groups/ExerciseDetail';
import { ExerciseManagement } from './pages/ExerciseManagement';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Leaderboard } from './components/gamification/Leaderboard';
import { Achievements } from './components/gamification/Achievements';
import { Challenges } from './components/gamification/Challenges';
import { Goals } from './components/gamification/Goals';
import { Profile } from './components/profile/Profile';
import CharacterCreation from './pages/CharacterCreation';
import { ExerciseSetup } from './pages/ExerciseSetup';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';

const queryClient = new QueryClient();

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <ClerkProvider publishableKey={clerkPubKey}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  {/* Public routes - accessible without authentication */}
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Protected routes - require authentication */}
                  <Route element={<ProtectedLayout />}>
                    <Route path="/create-character" element={<CharacterCreation />} />
                    <Route path="/" element={<MuscleGroupNavigation />} />
                    <Route path="/exercises" element={<ExerciseList />} />
                    <Route path="/exercise/:id" element={<ExerciseDetail />} />
                    <Route path="/exercise-management" element={<ExerciseManagement />} />
                    <Route path="/exercise-setup" element={<ExerciseSetup />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/training-zones" element={<MuscleGroupNavigation />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Redirect all other routes to landing */}
                  <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
                <Toaster />
              </AuthProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ClerkProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;