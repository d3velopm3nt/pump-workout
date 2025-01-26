import { useLocation, Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Trophy, 
  Target, 
  User, 
  Settings,
  BarChart
} from 'lucide-react';
import { FaTrophy, FaList, FaFire } from 'react-icons/fa';

export const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Dumbbell, label: 'Exercises', path: '/' },
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
                transition-colors duration-200
                ${isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-300'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}; 