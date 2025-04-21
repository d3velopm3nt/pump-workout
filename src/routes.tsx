import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from './contexts/AuthContext';
import { ExerciseLogHistory } from '@/pages/ExerciseLogHistory';
import { LogDetail } from '@/pages/LogDetail';
import { LandingPage } from '@/pages/LandingPage';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { MuscleGroupNavigation } from '@/components/muscle-groups/MuscleGroupNavigation';
import { ExerciseDetail } from '@/components/muscle-groups/ExerciseDetail';
import { ExerciseLogPage } from '@/components/exercise-logging/ExerciseLogPage';
import { ExerciseManagement } from '@/pages/ExerciseManagement';
import { ExerciseSetup } from '@/pages/ExerciseSetup';
import { Achievements } from '@/components/gamification/Achievements';
import { Challenges } from '@/components/gamification/Challenges';
import { Goals } from '@/components/gamification/Goals';
import { Profile } from '@/components/profile/Profile';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { CharacterCreation } from '@/pages/CharacterCreation';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/create-character" element={<CharacterCreation />} />
        <Route path="/" element={<MuscleGroupNavigation />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/log/:id" element={<ExerciseLogPage />} />
        <Route path="/exercises" element={<ExerciseManagement />} />
        <Route path="/exercise-setup" element={<ExerciseSetup />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Log History Routes */}
        <Route path="/history" element={<ExerciseLogHistory />} />
        <Route path="/logs/:logId" element={<LogDetail />} />
      </Route>

      {/* Redirect based on authentication */}
      <Route
        path="*"
        element={
          user ? <Navigate to="/" replace /> : <Navigate to="/landing" replace />
        }
      />
    </Routes>
  );
}; 