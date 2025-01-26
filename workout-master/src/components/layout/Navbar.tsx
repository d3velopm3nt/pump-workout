
import { Sun, Moon, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  
  const toggleTheme = () => {
    const html = document.querySelector('html');
    const currentTheme = html?.getAttribute('data-theme');
    html?.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">WorkoutMaster</a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          <Sun className="h-5 w-5 hidden dark:block" />
          <Moon className="h-5 w-5 block dark:hidden" />
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.user_metadata.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'} />
            </div>
          </div>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a onClick={() => signOut()}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 