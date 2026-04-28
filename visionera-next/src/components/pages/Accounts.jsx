"use client";
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search, 
  Filter, 
  Download,
  Plus,
  Calendar,
  MoreHorizontal,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Input, Select } from '@/components/ui/Forms';
import Modal from '@/components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/hooks/useData';
import { useToast } from '@/hooks/useToast';

const AccountCard = ({ account, balance }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-8 overflow-hidden relative group cursor-pointer"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${account.color} opacity-5 group-hover:opacity-10 rounded-bl-full -mr-12 -mt-12 transition-all duration-500`} />
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-4 rounded-2xl ${account.color} text-white shadow-xl group-hover:rotate-6 transition-transform`}>
        <account.icon size={28} />
      </div>
      <Badge variant="default" className="bg-slate-100 dark:bg-slate-800 font-black uppercase tracking-widest text-[10px]">{account.type}</Badge>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1 relative z-10">{account.name}</h3>
    <p className="text-3xl font-black text-slate-900 dark:text-white relative z-10">₹{balance.toLocaleString()}</p>
    
    <div className="mt-6 flex items-center justify-between relative z-10">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</span>
        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><ArrowUpCircle size={12} /> +2.4%</span>
      </div>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
        <MoreHorizontal size={16} />
      </Button>
    </div>
  </motion.div>
);

const Accounts = () => {
  const { transactions, addTransaction } = useData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrx, setNewTrx] = useState({ client: '', account: 'HDFC Corporate', amount: '', type: 'Credit', mode: 'Bank Transfer' });

  const ACCOUNTS_CONFIG = [
    { id: 1, name: 'HDFC Corporate', type: 'Bank', baseBalance: 450000, color: 'bg-indigo-600', icon: CreditCard },
    { id: 2, name: 'Office Cash', type: 'Cash', baseBalance: 25000, color: 'bg-emerald-600', icon: Banknote },
    { id: 3, name: 'Business UPI', type: 'UPI', baseBalance: 85000, color: 'bg-purple-600', icon: Smartphone },
  ];

  const accountBalances = useMemo(() => {
    return ACCOUNTS_CONFIG.map(acc => {
      const accTransactions = transactions.filter(t => t.account === acc.name);
      const balance = accTransactions.reduce((total, t) => {
        return t.type === 'Credit' ? total + Number(t.amount) : total - Number(t.amount);
      }, acc.baseBalance);
      return { ...acc, balance };
    });
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.client.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, transactions]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTrx.client || !newTrx.amount) {
      addToast('Please fill all fields', 'error');
      return;
    }
    
    await addTransaction({
      id: `TRX-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleString(),
      ...newTrx,
      amount: Number(newTrx.amount)
    });
    
    addToast('Transaction recorded successfully!', 'success');
    setIsModalOpen(false);
    setNewTrx({ client: '', account: 'HDFC Corporate', amount: '', type: 'Credit', mode: 'Bank Transfer' });
  };

  const exportToCSV = () => {
    addToast('Generating financial ledger...', 'warning');
    setTimeout(() => {
      addToast('Statement downloaded successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial <span className="text-primary-500">Accounts</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring liquidity and multi-account capital flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={exportToCSV} className="gap-2 shadow-sm">
            <Download size={18} /> Export Statement
          </Button>
          <Button className="gap-2 shadow-primary-500/30" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Record Entry
          </Button>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {accountBalances.map((acc) => (
          <AccountCard key={acc.id} account={acc} balance={acc.balance} />
        ))}
      </div>

      {/* Transaction History */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet size={20} className="text-primary-500" /> Transaction Ledger
          </h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search ledger by entity or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/50 shadow-sm"
              />
            </div>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white dark:bg-dark-card h-[46px] rounded-2xl px-4"
            >
              <option value="All">All Types</option>
              <option value="Credit">Credits Only</option>
              <option value="Debit">Debits Only</option>
            </Select>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-dark-border">
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Transaction ID</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Entity / Description</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Account</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Payment Mode</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.map((trx, idx) => (
                    <motion.tr
                      layout
                      key={trx.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-black font-mono text-slate-400 group-hover:text-primary-500 transition-colors">{trx.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <Calendar size={14} className="text-primary-500" />
                          {trx.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{trx.client}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="default" className="bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest px-3 py-1">
                          {trx.account}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {trx.mode}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`flex items-center justify-end gap-1.5 font-black text-lg ${trx.type === 'Credit' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {trx.type === 'Credit' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                          ₹{trx.amount.toLocaleString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Financial Transaction"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAddTransaction}>Post Transaction</Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <Input 
            label="Counterparty / Entity" 
            placeholder="e.g. Alankar Furniture" 
            value={newTrx.client}
            onChange={(e) => setNewTrx({...newTrx, client: e.target.value})}
            className="h-12"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Account Source"
              value={newTrx.account}
              onChange={(e) => setNewTrx({...newTrx, account: e.target.value})}
              className="h-12 rounded-2xl"
            >
              {ACCOUNTS_CONFIG.map(acc => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
            </Select>
            <Select 
              label="Entry Type"
              value={newTrx.type}
              onChange={(e) => setNewTrx({...newTrx, type: e.target.value})}
              className="h-12 rounded-2xl"
            >
              <option value="Credit">Credit (+)</option>
              <option value="Debit">Debit (-)</option>
            </Select>
          </div>
          <Input 
            label="Amount (₹)" 
            type="number" 
            placeholder="0.00" 
            value={newTrx.amount}
            onChange={(e) => setNewTrx({...newTrx, amount: e.target.value})}
            className="h-12"
          />
          <Select 
            label="Payment Mode"
            value={newTrx.mode}
            onChange={(e) => setNewTrx({...newTrx, mode: e.target.value})}
            className="h-12 rounded-2xl"
          >
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Accounts;
