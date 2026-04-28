"use client";
import React from 'react';
import { Menu, Sun, Moon, Bell, Search } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Navbar = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [greeting, setGreeting] = React.useState('');

  React.useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/60 dark:bg-dark-card/40 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 shadow-sm flex items-center px-4 lg:px-8">
      {/* Mobile Menu Trigger */}
      <button
        onClick={onMenuClick}
        className="p-2 mr-4 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); alert('Global search triggered!'); }}
        className="hidden md:flex flex-1 max-w-md relative"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Global system search..."
          className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary-500 rounded-2xl text-sm transition-all outline-none"
        />
      </form>

      <div className="flex-1 lg:hidden" />

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-dark-border mx-2 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-slate-200/60 dark:border-dark-border/40">
          <div className="text-right hidden xl:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{greeting}</p>
            <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Visionera Admin</p>
          </div>
          <div className="relative group">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
              alt="User"
              className="w-10 h-10 rounded-2xl border-2 border-white dark:border-slate-800 shadow-xl group-hover:scale-110 transition-transform cursor-pointer"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
