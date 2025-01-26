import { useLocation, Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Trophy, 
  Target, 
  User, 
  Settings,
  BarChart,
  LogOut
} from 'lucide-react';
import { FaTrophy, FaList, FaFire } from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const menuItems = [
    { icon: GiMuscleUp, label: 'Training Zones', path: '/training-zones' },
    { icon: Dumbbell, label: 'Exercises', path: '/exercises' },
    { icon: FaFire, label: 'Challenges', path: '/challenges' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: BarChart, label: 'Progress', path: '/progress' },
    { icon: FaTrophy, label: 'Achievements', path: '/achievements' },
    { icon: FaList, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="w-64 min-h-screen bg-base-200 p-4">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                text-primary hover:text-primary-focus
                ${isActive 
                  ? 'bg-primary/10 text-primary font-semibold shadow-sm' 
                  : 'hover:bg-primary/5 hover:translate-x-1'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Signout Button */}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg mt-auto
            transition-all duration-200 ease-in-out text-error hover:text-error
            hover:bg-error/5 hover:translate-x-1"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}; 