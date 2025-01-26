import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { GamificationProvider } from '../../contexts/GamificationContext';
import { UserLevel } from '../gamification/UserLevel';

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <GamificationProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <UserLevel />
            <Outlet />
          </main>
        </div>
      </div>
    </GamificationProvider>
  );
}; 