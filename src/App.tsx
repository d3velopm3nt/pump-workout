import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { MuscleGroupNavigation } from './components/muscle-groups/MuscleGroupNavigation';
import { AuthProvider } from './contexts/AuthContext';
import { ExerciseList } from './components/muscle-groups/ExerciseList';
import { ExerciseDetail } from './components/muscle-groups/ExerciseDetail';
import LandingPage from './pages/LandingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div data-theme="dark" className="min-h-screen bg-base-100">
      <button className="btn btn-primary">Test Button</button>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<LandingPage />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<MuscleGroupNavigation />} />
                <Route path="/muscles/:section/:group" element={<ExerciseList />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App; 