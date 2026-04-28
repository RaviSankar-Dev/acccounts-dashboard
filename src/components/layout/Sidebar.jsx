import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  HandCoins, 
  Briefcase, 
  Wallet, 
  Receipt, 
  Users, 
  BarChart3, 
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${isActive 
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}
    `}
  >
    <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

const Sidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: FileText, label: 'Quotations', to: '/quotations' },
    { icon: HandCoins, label: 'Deals & Advances', to: '/deals' },
    { icon: Briefcase, label: 'Projects', to: '/projects' },
    { icon: Wallet, label: 'Accounts', to: '/accounts' },
    { icon: Receipt, label: 'Expenses', to: '/expenses' },
    { icon: Users, label: 'Payroll', to: '/payroll' },
    { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    { icon: Settings, label: 'Automations', to: '/settings' },
  ];

  const variants = {
    open: { x: 0 },
    closed: { x: -280 },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={isMobile ? (isOpen ? 'open' : 'closed') : 'open'}
        variants={variants}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-dark-card 
          border-r border-slate-200 dark:border-dark-border z-50
          flex flex-col lg:relative lg:translate-x-0 shrink-0
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Visionera</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Business Smart</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label} 
              {...item} 
              onClick={() => {
                if (isMobile) onClose();
              }}
            />
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-dark-border space-y-2">
          <button 
            onClick={() => window.location.href='/login'}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-bold text-sm group"
          >
            <div className="p-2 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
              <Settings size={18} className="rotate-45" />
            </div>
            <span>Secure Log Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
