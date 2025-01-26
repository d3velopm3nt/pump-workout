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
      <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {showCharacterBanner && (
              <div className="card bg-base-100 border border-base-300 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="card-title text-2xl mb-2 text-base-content">Begin Your Adventure!</h2>
                      <p className="text-base-content/70">
                        Create your character to start earning XP and unlocking achievements.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <div className="badge badge-ghost gap-1">
                          <GiCharacter className="w-4 h-4 text-primary" />
                          +100 XP Bonus
                        </div>
                        <div className="badge badge-ghost">Starter Pack</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="stats bg-base-200 shadow-sm">
                        <div className="stat">
                          <div className="stat-figure text-primary">
                            <GiCharacter className="w-6 h-6" />
                          </div>
                          <div className="stat-title">Reward</div>
                          <div className="stat-value text-primary">100</div>
                          <div className="stat-desc">Starting XP</div>
                        </div>
                      </div>
                      <Link 
                        to="/create-character" 
                        className="btn btn-primary btn-outline gap-2 hover:gap-3 transition-all duration-300"
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