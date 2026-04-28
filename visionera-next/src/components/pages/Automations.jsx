import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Settings2,
  CheckCircle2,
  AlertTriangle,
  History,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Forms';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_AUTOMATIONS = [
  { id: 1, title: 'Project Deadline Alert', type: 'Email', trigger: '2 days before', status: 'Active', icon: Mail, color: 'text-blue-500' },
  { id: 2, title: 'Payment Due Reminder', type: 'WhatsApp', trigger: 'On due date', status: 'Active', icon: MessageSquare, color: 'text-green-500' },
  { id: 3, title: 'Salary Payout Alert', type: 'System', trigger: '1st of every month', status: 'Inactive', icon: Bell, color: 'text-purple-500' },
  { id: 4, title: 'Database Auto-Backup', type: 'Security', trigger: 'Daily at 02:00 AM', status: 'Active', icon: ShieldCheck, color: 'text-emerald-500' },
];

const NotificationCard = ({ notification }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-card p-4 flex items-center justify-between group"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-primary-500 transition-colors`}>
        <notification.icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notification.title}</h4>
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{notification.trigger} • {notification.type}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Badge variant={notification.status === 'Active' ? 'success' : 'default'}>
        {notification.status}
      </Badge>
      <button className="p-2 text-slate-300 hover:text-slate-500 dark:hover:text-slate-200 transition-colors">
        <Settings2 size={16} />
      </button>
    </div>
  </motion.div>
);

const Automations = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const startBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBackingUp(false), 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Automation Engine</h1>
          <p className="text-slate-50 dark:text-slate-400">Schedule smart notifications and automate recurring business tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2" onClick={startBackup} disabled={isBackingUp}>
            {isBackingUp ? <RotateCcw size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
            {isBackingUp ? 'Backing Up...' : 'Run Backup Now'}
          </Button>
          <Button className="gap-2">
            <Zap size={18} /> New Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-primary-500" /> Active Automations
            </h3>
            <span className="text-xs font-bold text-slate-400">Total: 4 Workflows</span>
          </div>
          <div className="space-y-4">
            {MOCK_AUTOMATIONS.map((auto) => (
              <NotificationCard key={auto.id} notification={auto} />
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Intelligent Assistant Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-bl-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
              <Zap className="text-primary-400" size={20} /> Smart Assistant
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex gap-3">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Upcoming Deadline</p>
                  <p className="text-[10px] text-white/60">"Ghar Sansar App" is due in 48 hours. Team progress is only at 40%.</p>
                  <button className="text-[10px] font-bold text-primary-400 hover:underline">Notify Team</button>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Payment Received</p>
                  <p className="text-[10px] text-white/60">₹20,000 from Alankar Furniture cleared in HDFC account.</p>
                  <button className="text-[10px] font-bold text-primary-400 hover:underline">View TRX</button>
                </div>
              </div>
            </div>
            <Button variant="primary" className="w-full mt-6 bg-white text-slate-900 hover:bg-slate-100 border-none">
              Optimization Suggestions
            </Button>
          </motion.div>

          {/* Backup Status Widget */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> System Integrity
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Last Backup Success</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Today, 02:00 AM</p>
              </div>
              {isBackingUp && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-primary-500">
                    <span>Backing up...</span>
                    <span>{backupProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${backupProgress}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">All Systems Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automations;
