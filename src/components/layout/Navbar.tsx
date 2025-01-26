import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { FaFire } from 'react-icons/fa';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40 bg-base-100/95 backdrop-blur-sm border-b border-base-200">
      <div className="flex-none md:hidden">
        <button className="btn btn-ghost btn-square" onClick={onMenuClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
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
    </nav>
  );
}; 