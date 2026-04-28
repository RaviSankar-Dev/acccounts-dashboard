import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  Receipt, 
  TrendingDown, 
  ArrowDownCircle, 
  Plus, 
  Filter, 
  Download,
  ShoppingBag,
  Home,
  Zap,
  Users,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge, Input, Select } from '../components/ui/Forms';
import Modal from '../components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../hooks/useData';
import { useToast } from '../hooks/useToast';

const CATEGORY_COLORS = {
  'Rent': '#6366f1',
  'Ads': '#f59e0b',
  'Tools': '#ec4899',
  'Salaries': '#10b981',
  'Other': '#64748b'
};

const Expenses = () => {
  const { expenses, addExpense } = useData();
  const { addToast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', category: 'Rent', amount: '', mode: 'Bank' });

  const categoryData = useMemo(() => {
    const data = {};
    expenses.forEach(exp => {
      data[exp.category] = (data[exp.category] || 0) + Number(exp.amount);
    });
    return Object.keys(data).map(key => ({
      name: key,
      value: data[key],
      color: CATEGORY_COLORS[key] || '#cbd5e1'
    }));
  }, [expenses]);

  const totalExpenses = useMemo(() => expenses.reduce((acc, curr) => acc + Number(curr.amount), 0), [expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) {
      addToast('Please fill all fields', 'error');
      return;
    }
    
    addExpense({
      id: `EXP-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      ...newExpense,
      amount: Number(newExpense.amount)
    });
    
    addToast('Expense recorded and categorized!', 'success');
    setIsModalOpen(false);
    setNewExpense({ title: '', category: 'Rent', amount: '', mode: 'Bank' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Expense <span className="text-red-500">Analytics</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Tracking operational burn rates and categorical spending.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={18} /> Monthly Audit
          </Button>
          <Button className="gap-2 shadow-red-500/20 bg-red-500 hover:bg-red-600 border-none" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Expenditure
          </Button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Expense Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 glass-card p-8 flex flex-col justify-between border-t-4 border-t-red-500 hover:shadow-2xl transition-all">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl">
                <TrendingDown size={32} />
              </div>
              <Badge variant="danger" className="px-3 font-black">-12.5% VS LAST MONTH</Badge>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Current Month Burn Rate</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-1">₹{totalExpenses.toLocaleString()}</h2>
          </div>
          <div className="mt-10 space-y-4">
            {categoryData.slice(0, 4).map((cat, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-widest text-[10px]">{cat.name}</span>
                </div>
                <span className="font-black text-sm text-slate-900 dark:text-white">₹{cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Distribution (Pie Chart) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 flex flex-col hover:shadow-2xl transition-all">
          <h3 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Categorical Distribution</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-[9px] font-black text-slate-500 uppercase truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Trend (Bar Chart) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 flex flex-col hover:shadow-2xl transition-all">
          <h3 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Expenditure Trend</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', amount: 145000 },
                { month: 'Feb', amount: 168000 },
                { month: 'Mar', amount: 152000 },
                { month: 'Apr', amount: totalExpenses },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.05} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(99,102,241,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: 'none', borderRadius: '16px', color: '#fff' }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10">
            <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">Financial Tip</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Your tools expenditure has decreased by 5% this month. Optimization successful.</p>
          </div>
        </motion.div>
      </div>

      {/* Expense List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt size={20} className="text-red-500" /> Recent Expenditures
          </h2>
          <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest">
            Detailed Audit <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-dark-border">
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Date</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Description</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Category</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Method</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                <AnimatePresence mode="popLayout">
                  {expenses.map((exp, idx) => (
                    <motion.tr
                      layout
                      key={exp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{exp.date}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{exp.title}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{exp.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="default" className="font-black uppercase tracking-widest text-[9px] px-3">
                          {exp.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{exp.mode}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 font-black text-lg text-red-500">
                          <ArrowDownCircle size={18} />
                          ₹{exp.amount.toLocaleString()}
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
        title="Record Company Expenditure"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Discard</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600 border-none" onClick={handleAddExpense}>Post Expense</Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <Input 
            label="Expense Description" 
            placeholder="e.g. AWS Infrastructure Bill" 
            value={newExpense.title}
            onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
            className="h-12"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Classification"
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="h-12 rounded-2xl"
            >
              <option value="Rent">Rent</option>
              <option value="Ads">Ads / Marketing</option>
              <option value="Tools">Software / Tools</option>
              <option value="Salaries">Payroll / Salaries</option>
              <option value="Other">Other Expenses</option>
            </Select>
            <Select 
              label="Payment Source"
              value={newExpense.mode}
              onChange={(e) => setNewExpense({...newExpense, mode: e.target.value})}
              className="h-12 rounded-2xl"
            >
              <option value="Bank">Corporate Bank</option>
              <option value="UPI">UPI / Digital</option>
              <option value="Cash">Petty Cash</option>
              <option value="Card">Corporate Card</option>
            </Select>
          </div>
          <Input 
            label="Amount (₹)" 
            type="number" 
            placeholder="0.00" 
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            className="h-12"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Expenses;
