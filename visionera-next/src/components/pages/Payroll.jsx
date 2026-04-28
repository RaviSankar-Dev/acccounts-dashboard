import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  Percent, 
  IndianRupee, 
  Calendar, 
  Bell, 
  ArrowUpRight,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Input } from '@/components/ui/Forms';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Arjun Mehta', role: 'Sr. Developer', salary: 85000, status: 'Paid', date: '2026-04-01' },
  { id: 'EMP-002', name: 'Sneha Rao', role: 'UI Designer', salary: 65000, status: 'Paid', date: '2026-04-01' },
  { id: 'EMP-003', name: 'Rohan Varma', role: 'Marketing', salary: 45000, status: 'Pending', date: '2026-05-01' },
  { id: 'EMP-004', name: 'Priya Singh', role: 'Project Manager', salary: 75000, status: 'Pending', date: '2026-05-01' },
];

const DIRECTORS = [
  { name: 'Director A', share: 40, color: 'bg-indigo-500' },
  { name: 'Director B', share: 35, color: 'bg-purple-500' },
  { name: 'Director C', share: 25, color: 'bg-amber-500' },
];

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [totalProfit, setTotalProfit] = useState(500000);

  const salaryStats = useMemo(() => {
    const paid = MOCK_EMPLOYEES.filter(e => e.status === 'Paid').reduce((acc, curr) => acc + curr.salary, 0);
    const pending = MOCK_EMPLOYEES.filter(e => e.status === 'Pending').reduce((acc, curr) => acc + curr.salary, 0);
    return { paid, pending, total: paid + pending };
  }, []);

  const directorSplits = useMemo(() => {
    return DIRECTORS.map(d => ({
      ...d,
      amount: (totalProfit * d.share) / 100
    }));
  }, [totalProfit]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Payroll & Dividends</h1>
          <p className="text-slate-50 dark:text-slate-400">Manage team compensation and strategic profit distributions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={18} /> Payout Report
          </Button>
          <Button className="gap-2">
            <Bell size={18} /> Reminders
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-dark-border">
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-6 py-3 text-sm font-bold transition-all relative ${
            activeTab === 'employees' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Employee Salaries
          {activeTab === 'employees' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('directors')}
          className={`px-6 py-3 text-sm font-bold transition-all relative ${
            activeTab === 'directors' ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Director Shares
          {activeTab === 'directors' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'employees' ? (
          <motion.div
            key="employees"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 border-l-4 border-l-green-500">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total Paid (Month)</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹{salaryStats.paid.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2 text-green-500 text-xs font-bold">
                  <UserCheck size={14} /> {MOCK_EMPLOYEES.filter(e => e.status === 'Paid').length} Employees
                </div>
              </div>
              <div className="glass-card p-6 border-l-4 border-l-amber-500">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Pending Payouts</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">₹{salaryStats.pending.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2 text-amber-500 text-xs font-bold">
                  <Clock size={14} /> {MOCK_EMPLOYEES.filter(e => e.status === 'Pending').length} Pending
                </div>
              </div>
              <div className="glass-card p-6 bg-slate-900 text-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Payroll Budget</p>
                <h3 className="text-2xl font-bold">₹{salaryStats.total.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2 text-primary-400 text-xs font-bold">
                  <IndianRupee size={14} /> Monthly Recurring
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-dark-border">
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Employee</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Role</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Salary</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-dark-border">
                  {MOCK_EMPLOYEES.map((emp, idx) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{emp.role}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">₹{emp.salary.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge variant={emp.status === 'Paid' ? 'success' : 'warning'}>{emp.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="directors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Split Calculator */}
            <div className="glass-card p-8">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Profit Split Calculator</h3>
                  <p className="text-sm text-slate-500 mb-6">Enter the total distributable profit to see the director split.</p>
                </div>
                <Input 
                  label="Total Profit (₹)" 
                  type="number" 
                  value={totalProfit}
                  onChange={(e) => setTotalProfit(e.target.value)}
                  className="text-center text-2xl font-black py-4 h-auto"
                />
              </div>
            </div>

            {/* Shares Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {directorSplits.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${d.color} opacity-5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-110 transition-transform`} />
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl ${d.color} text-white shadow-lg`}>
                      <Percent size={24} />
                    </div>
                    <Badge variant="primary" className="font-black">{d.share}% Share</Badge>
                  </div>
                  <h4 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{d.name}</h4>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">₹{d.amount.toLocaleString()}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <TrendingUp size={14} className="text-green-500" /> Projected Payout
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payroll;
