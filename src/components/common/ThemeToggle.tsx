import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {1
    
  const toggleTheme = () => {
    const html = document.querySelector('html');
    const currentTheme = html?.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html?.setAttribute('data-theme', newTheme);
    // Also update the app div
    const appDiv = document.querySelector('div[data-theme]');
    if (appDiv) {
      appDiv.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <button 
      className="btn btn-ghost btn-circle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
}; 