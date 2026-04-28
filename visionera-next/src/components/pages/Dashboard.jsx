"use client";
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Plus,
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge, Input, Select } from '@/components/ui/Forms';
import Modal from '@/components/ui/Modal';
import { useData } from '@/hooks/useData';
import { useToast } from '@/hooks/useToast';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} text-white shadow-lg group-hover:rotate-6 transition-transform`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}%
      </div>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const Dashboard = () => {
  const { deals, projects, addProject } = useData();
  const { addToast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '', deadline: '' });

  const totalRevenue = useMemo(() => deals.reduce((acc, curr) => acc + curr.total, 0), [deals]);
  const activeProjectsCount = useMemo(() => projects.filter(p => p.status !== 'Completed').length, [projects]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.client) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    
    const project = {
      id: `PJ-${Math.floor(Math.random() * 1000)}`,
      ...newProject,
      progress: 0,
      status: 'On Track',
      team: ['Admin'],
    };
    
    addProject(project);
    addToast('Project launched successfully!', 'success');
    setIsModalOpen(false);
    setNewProject({ name: '', client: '', deadline: '' });
  };

  const handleDownloadReport = () => {
    addToast('Preparing your business report...', 'warning');
    setTimeout(() => {
      addToast('Report downloaded successfully!', 'success');
    }, 2000);
  };

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: 12.5, isPositive: true, icon: DollarSign, color: 'bg-blue-500' },
    { title: 'Active Projects', value: activeProjectsCount.toString(), change: 4.3, isPositive: true, icon: Briefcase, color: 'bg-purple-500' },
    { title: 'Total Clients', value: '452', change: 2.1, isPositive: false, icon: Users, color: 'bg-orange-500' },
    { title: 'Quotation Success', value: '64%', change: 8.4, isPositive: true, icon: TrendingUp, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard <span className="text-primary-500">Overview</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring your business growth in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2" onClick={handleDownloadReport}>
            <Download size={18} /> Export Reports
          </Button>
          <Button className="gap-2 shadow-primary-500/40" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 glass-card p-8 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Revenue Intelligence</h3>
              <p className="text-xs text-slate-500">Performance analysis across all sectors</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" className="px-3">LIVE DATA</Badge>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Jan', value: 45000 },
                { name: 'Feb', value: 52000 },
                { name: 'Mar', value: 48000 },
                { name: 'Apr', value: 61000 },
                { name: 'May', value: 55000 },
                { name: 'Jun', value: totalRevenue / 10 },
              ]}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.05} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side List Area */}
        <div className="glass-card p-8 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-900 dark:text-white text-lg">Active Deals</h3>
            <button className="text-primary-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1 group">
              View All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="flex-1 space-y-5">
            {deals.slice(0, 5).map((deal, idx) => (
              <motion.div 
                key={deal.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-black text-slate-400 group-hover:text-primary-500 transition-colors">
                    {deal.client[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{deal.client}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      Balance: ₹{deal.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary-500">₹{deal.total.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 font-bold flex items-center justify-end gap-1 uppercase">
                    {deal.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-500">
            Show System Logs
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Launch New Venture"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Discard</Button>
            <Button className="flex-1" onClick={handleAddProject}>Initialize Project</Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10 mb-4">
            <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
              You are about to initialize a new project workflow. This will notify the operations team.
            </p>
          </div>
          <Input 
            label="Project Name" 
            placeholder="e.g. Enterprise Cloud Migration" 
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Client Name" 
            placeholder="Search or add client..." 
            value={newProject.client}
            onChange={(e) => setNewProject({...newProject, client: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Target Deadline" 
            type="date"
            value={newProject.deadline}
            onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
            className="h-12"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
