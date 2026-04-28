import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Target, 
  Zap, 
  Users, 
  Award,
  Globe,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Forms';
import { motion } from 'framer-motion';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 450000, expenses: 320000 },
  { month: 'Feb', revenue: 520000, expenses: 350000 },
  { month: 'Mar', revenue: 480000, expenses: 310000 },
  { month: 'Apr', revenue: 610000, expenses: 400000 },
  { month: 'May', revenue: 550000, expenses: 380000 },
  { month: 'Jun', revenue: 720000, expenses: 450000 },
];

const SERVICE_DATA = [
  { name: 'Web Dev', value: 45, color: '#6366f1' },
  { name: 'Mobile App', value: 30, color: '#a855f7' },
  { name: 'UI/UX', value: 15, color: '#ec4899' },
  { name: 'SEO', value: 10, color: '#f59e0b' },
];

const TOP_CLIENTS = [
  { name: 'Alankar Furniture', revenue: 125000, growth: 12 },
  { name: 'Ghar Sansar', revenue: 95000, growth: 8 },
  { name: 'Efour Tech', revenue: 82000, growth: 15 },
  { name: 'Future Retail', revenue: 75000, growth: -5 },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Advanced Analytics</h1>
          <p className="text-slate-50 dark:text-slate-400">Deep dive into business performance and growth intelligence.</p>
        </div>
        <Button className="gap-2">
          <TrendingUp size={18} /> Generate Insights
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Annual Growth', value: '+24.8%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Net Profit Margin', value: '32.5%', icon: Target, color: 'text-primary-500', bg: 'bg-primary-500/10' },
          { label: 'Active Retention', value: '88%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Lead Conversion', value: '18.4%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <ArrowUpRight size={18} className="text-slate-400" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Revenue vs Expenses</h3>
              <p className="text-xs text-slate-500">6-month financial performance comparison</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-primary-500" /> Revenue
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-red-400" /> Expenses
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profitable Services */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col"
        >
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Service Profitability</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SERVICE_DATA} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }} 
                  width={80}
                />
                <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                   contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {SERVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Growth Insight</p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Web Development and Mobile Apps contribute to 75% of total net profit this quarter.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="text-amber-500" size={20} /> Best Performing Clients
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {TOP_CLIENTS.map((client, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center font-bold text-slate-400">
                    {client.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{client.name}</p>
                    <p className="text-xs text-slate-500">Key Account</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900 dark:text-white">₹{client.revenue.toLocaleString()}</p>
                  <p className={`text-[10px] font-bold ${client.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {client.growth >= 0 ? '+' : ''}{client.growth}% Growth
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Impact / Intelligence */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Globe className="text-primary-500" size={20} /> AI Market Insights
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500 h-fit">
                  <PieChartIcon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Revenue Concentration</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your revenue is highly diversified. No single client contributes more than 15% to your total income, reducing business risk significantly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500 h-fit">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Scalability Potential</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Monthly recurring revenue has increased by 8% in the last 60 days. Current trajectory suggests a 30% YoY growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button variant="primary" className="w-full mt-8">View Full Growth Strategy</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
