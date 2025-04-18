import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '@clerk/clerk-react';
import { GamificationProvider } from '../../contexts/GamificationContext';
import { UserLevel } from '../gamification/UserLevel';
import { useState, useEffect } from 'react';
import { GiLevelThree, GiCharacter } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export const ProtectedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [hasCharacter, setHasCharacter] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkCharacterStatus = async () => {
      // TODO: Implement character status check with your backend
      setHasCharacter(true);
    };

    checkCharacterStatus();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Don't show the character creation banner on the character creation page
  const showCharacterBanner = !hasCharacter && location.pathname !== '/create-character';

  return (
    <GamificationProvider>
      <div className="min-h-screen bg-base-100">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-col md:flex-row">
          {/* Mobile Sidebar Overlay */}
          <div 
            className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            className={`fixed md:static inset-y-0 left-0 w-72 bg-base-100 z-40 transform transition-transform duration-300 md:transform-none ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Main Content */}
          <main className="flex-1 pt-16 md:pt-0">
            {showCharacterBanner && (
              <div className="bg-primary/10 p-4 text-center">
                <Link to="/create-character" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <GiCharacter className="h-5 w-5" />
                  Create your character to start your fitness journey!
                </Link>
              </div>
            )}
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </GamificationProvider>
  );
}; 