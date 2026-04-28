import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { DataProvider } from './hooks/useData';
import { ToastProvider } from './hooks/useToast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Quotations from './pages/Quotations';
import Deals from './pages/Deals';
import Projects from './pages/Projects';
import Accounts from './pages/Accounts';
import Expenses from './pages/Expenses';
import Payroll from './pages/Payroll';
import Analytics from './pages/Analytics';
import Automations from './pages/Automations';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="quotations" element={<Quotations />} />
                <Route path="deals" element={<Deals />} />
                <Route path="projects" element={<Projects />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="payroll" element={<Payroll />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Automations />} />
                <Route path="*" element={<div className="p-8 text-center text-slate-500">404 - Page Not Found</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
