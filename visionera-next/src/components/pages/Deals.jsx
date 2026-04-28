"use client";
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  HandCoins, 
  ArrowUpRight, 
  Plus, 
  Calendar, 
  Search,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Input } from '@/components/ui/Forms';
import Modal from '@/components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/hooks/useData';
import { useToast } from '@/hooks/useToast';

const ProgressBar = ({ progress, status }) => {
  const getColor = (s) => {
    if (s === 'At Risk') return 'bg-red-500';
    if (s === 'Closed' || s === 'Completed') return 'bg-emerald-500';
    return 'bg-primary-500';
  };

  return (
    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full ${getColor(status)} shadow-[0_0_15px_rgba(99,102,241,0.4)]`}
      />
    </div>
  );
};

const Deals = () => {
  const { deals, addDeal } = useData();
  const { addToast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({ client: '', total: '', advance: '' });

  const financialStats = useMemo(() => {
    const total = deals.reduce((acc, curr) => acc + curr.total, 0);
    const advance = deals.reduce((acc, curr) => acc + curr.advance, 0);
    const balance = deals.reduce((acc, curr) => acc + curr.balance, 0);
    return { total, advance, balance };
  }, [deals]);

  const handleAddDeal = async (e) => {
    e.preventDefault();
    if (!newDeal.client || !newDeal.total || !newDeal.advance) {
      addToast('Please fill all fields', 'error');
      return;
    }
    
    const total = Number(newDeal.total);
    const advance = Number(newDeal.advance);
    
    const deal = {
      id: `DL-${Math.floor(Math.random() * 1000)}`,
      client: newDeal.client,
      total,
      advance,
      balance: total - advance,
      progress: Math.round((advance / total) * 100),
      status: 'Active'
    };
    
    await addDeal(deal);
    addToast('Deal secured and recorded!', 'success');
    setIsModalOpen(false);
    setNewDeal({ client: '', total: '', advance: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Deals & <span className="text-primary-500">Advances</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Tracking high-value contracts and financial commitments.</p>
        </div>
        <Button className="gap-2 shadow-primary-500/30" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Deal
        </Button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border-l-4 border-l-primary-500 group hover:shadow-2xl transition-all">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Contract Pipeline</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹{financialStats.total.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-primary-500 text-xs font-black">
            <TrendingUp size={14} /> +18% MOM GROWTH
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 border-l-4 border-l-emerald-500 group hover:shadow-2xl transition-all">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Collections</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹{financialStats.advance.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-black">
            <CheckCircle2 size={14} /> {Math.round((financialStats.advance / (financialStats.total || 1)) * 100)}% LIQUIDITY
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 border-l-4 border-l-red-500 group hover:shadow-2xl transition-all">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Pending Invoices</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹{financialStats.balance.toLocaleString()}</h2>
          <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-black">
            <AlertCircle size={14} /> ACTION REQUIRED
          </div>
        </motion.div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {deals.map((deal, idx) => (
            <motion.div
              layout
              key={deal.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 group hover:border-primary-500/50 hover:shadow-2xl transition-all duration-500 border-transparent"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <HandCoins size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 dark:text-white leading-tight">{deal.client}</h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{deal.id}</p>
                  </div>
                </div>
                <Badge variant={deal.status === 'Closed' || deal.status === 'Completed' ? 'success' : deal.status === 'At Risk' ? 'danger' : 'primary'}>
                  {deal.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 text-center">Total</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white text-center">₹{deal.total.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
                  <p className="text-[10px] text-primary-500 uppercase font-black tracking-widest mb-2 text-center">Advance</p>
                  <p className="text-lg font-black text-primary-500 text-center">₹{deal.advance.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <p className="text-[10px] text-red-500 uppercase font-black tracking-widest mb-2 text-center">Balance</p>
                  <p className="text-lg font-black text-red-500 text-center">₹{deal.balance.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Financial Progress</span>
                  <span className="text-sm font-black text-primary-500">{deal.progress}%</span>
                </div>
                <ProgressBar progress={deal.progress} status={deal.status} />
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-primary-500" /> Lifecycle Status: {deal.status === 'Active' ? 'Deployment' : 'Finalized'}
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="ghost" size="sm" className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest">
                    History
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest">
                    Invoices
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lock New High-Value Deal"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAddDeal}>Confirm Deal</Button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          <Input 
            label="Corporate Entity" 
            placeholder="e.g. Alankar Furniture" 
            value={newDeal.client}
            onChange={(e) => setNewDeal({...newDeal, client: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Total Contractual Value (₹)" 
            type="number" 
            placeholder="0.00" 
            value={newDeal.total}
            onChange={(e) => setNewDeal({...newDeal, total: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Initial Advance (₹)" 
            type="number" 
            placeholder="0.00" 
            value={newDeal.advance}
            onChange={(e) => setNewDeal({...newDeal, advance: e.target.value})}
            className="h-12"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Deals;
