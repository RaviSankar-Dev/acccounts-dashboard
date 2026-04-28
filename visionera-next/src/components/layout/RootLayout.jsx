"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import { ThemeProvider } from '@/hooks/useTheme';
import { DataProvider } from '@/hooks/useData';
import { ToastProvider } from '@/hooks/useToast';

const RootLayoutWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Handle initialization or other logic
  
  if (pathname === '/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
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
        
        <footer className="p-6 text-center border-t border-slate-200 dark:border-dark-border">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 CRK Visionera Smart Business Dashboard. All rights reserved.
          </p>
        </footer>
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
