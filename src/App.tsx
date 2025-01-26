import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { MuscleGroupNavigation } from './components/muscle-groups/MuscleGroupNavigation';
import { AuthProvider } from './contexts/AuthContext';
import { ExerciseList } from './components/muscle-groups/ExerciseList';
import { ExerciseDetail } from './components/muscle-groups/ExerciseDetail';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Leaderboard } from './components/gamification/Leaderboard';
import { Achievements } from './components/gamification/Achievements';
import { Challenges } from './components/gamification/Challenges';

const queryClient = new QueryClient();

function App() {
  return (
    <div data-theme="dark" className="min-h-screen bg-base-100">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              {/* Public routes - accessible without authentication */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes - require authentication */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<MuscleGroupNavigation />} />
                <Route path="/muscles/:section/:group" element={<ExerciseList />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/challenges" element={<Challenges />} />
              </Route>

              {/* Redirect all other routes to landing */}
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App; 