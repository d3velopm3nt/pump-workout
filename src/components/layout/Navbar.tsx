import { Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { FaFire } from 'react-icons/fa';

export const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl flex items-center gap-2">
          <FaFire className="h-6 w-6 text-primary" />
          <span className="font-bold">FitQuest</span>
        </a>
      </div>
      <div className="flex-none gap-2">
        <ThemeToggle />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.user_metadata.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'} alt="User avatar" />
            </div>
          </div>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a onClick={() => logout()}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 