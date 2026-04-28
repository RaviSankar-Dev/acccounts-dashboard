"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from './PageTransition';
import { Plus, FileText, Briefcase, IndianRupee } from 'lucide-react';
import { ThemeProvider } from '@/hooks/useTheme';
import { DataProvider } from '@/hooks/useData';
import { ToastProvider } from '@/hooks/useToast';

const RootLayoutWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle initialization or other logic
  
  if (pathname === '/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden transform-gpu">
      {/* Premium Ambient Background Orbs - Optimized */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[60px] pointer-events-none z-0 transform-gpu" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[60px] pointer-events-none z-0 transform-gpu" />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 lg:p-8 xl:p-10 overflow-x-hidden">
          <div className="w-full max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={pathname}>
                {children}
              </PageTransition>
            </AnimatePresence>
          </div>
        </main>
        
        <footer className="p-6 text-center border-t border-slate-200 dark:border-dark-border relative z-10">
          <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
            © 2026 CRK Visionera Smart Business Dashboard
          </p>
        </footer>
      </div>

      {/* Floating Quick Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isQuickMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex flex-col gap-3"
            >
              <button className="flex items-center gap-3 px-4 py-2 rounded-full glass-card hover:bg-primary-50 dark:hover:bg-primary-900/30 font-bold text-sm text-slate-700 dark:text-white transition-colors" onClick={() => setIsQuickMenuOpen(false)}>
                <span>New Quotation</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><FileText size={16} /></div>
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-full glass-card hover:bg-primary-50 dark:hover:bg-primary-900/30 font-bold text-sm text-slate-700 dark:text-white transition-colors" onClick={() => setIsQuickMenuOpen(false)}>
                <span>New Project</span>
                <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center"><Briefcase size={16} /></div>
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-full glass-card hover:bg-primary-50 dark:hover:bg-primary-900/30 font-bold text-sm text-slate-700 dark:text-white transition-colors" onClick={() => setIsQuickMenuOpen(false)}>
                <span>Record Expense</span>
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><IndianRupee size={16} /></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl shadow-primary-500/50 text-white flex items-center justify-center transition-all duration-300 ${isQuickMenuOpen ? 'bg-slate-800 rotate-45' : 'premium-gradient hover:scale-110'}`}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default function RootProviderLayout({ children }) {
  return (
    <ThemeProvider>
      <DataProvider>
        <ToastProvider>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </ToastProvider>
      </DataProvider>
    </ThemeProvider>
  );
}
