import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { GamificationProvider } from '../../contexts/GamificationContext';
import { UserLevel } from '../gamification/UserLevel';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GiLevelThree, GiCharacter } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const [hasCharacter, setHasCharacter] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkCharacterStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('has_character')
          .eq('user_id', user.id)
          .single();
        
        setHasCharacter(data?.has_character ?? false);
      }
    };

    checkCharacterStatus();
  }, [user]);

  if (!user) {
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
          <main className="flex-1 p-4 md:p-6 pt-20 md:pt-24">
            {showCharacterBanner && (
              <div className="card bg-base-100 border border-base-300 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300">
                <div className="card-body p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="card-title text-xl md:text-2xl mb-2 text-base-content">Begin Your Adventure!</h2>
                      <p className="text-base-content/70 text-sm md:text-base">
                        Create your character to start earning XP and unlocking achievements.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="badge badge-ghost gap-1">
                          <GiCharacter className="w-4 h-4 text-primary" />
                          +100 XP Bonus
                        </div>
                        <div className="badge badge-ghost">Starter Pack</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="stats bg-base-200 shadow-sm">
                        <div className="stat py-2 px-4">
                          <div className="stat-figure text-primary">
                            <GiCharacter className="w-6 h-6" />
                          </div>
                          <div className="stat-title text-xs">Reward</div>
                          <div className="stat-value text-primary text-2xl">100</div>
                          <div className="stat-desc text-xs">Starting XP</div>
                        </div>
                      </div>
                      <Link 
                        to="/create-character" 
                        className="btn btn-primary btn-outline gap-2 hover:gap-3 transition-all duration-300 w-full sm:w-auto"
                      >
                        Create Character
                        <GiLevelThree className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <UserLevel />
            <Outlet />
          </main>
        </div>
      </div>
    </GamificationProvider>
  );
}; 