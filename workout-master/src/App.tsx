import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { MuscleGroupNavigation } from './components/muscle-groups/MuscleGroupNavigation';
import { AuthProvider } from './contexts/AuthContext';
import { ExerciseList } from './components/muscle-groups/ExerciseList';
import { ExerciseDetail } from './components/muscle-groups/ExerciseDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<MuscleGroupNavigation />} />
              <Route path="/muscles/:section/:group" element={<ExerciseList />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 