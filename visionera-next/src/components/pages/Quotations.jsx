"use client";
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  MoreVertical, 
  Download, 
  Mail, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Input, Select } from '@/components/ui/Forms';
import Modal from '@/components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/hooks/useData';
import { useToast } from '@/hooks/useToast';

const Quotations = () => {
  const { quotations, addQuotation } = useData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuotation, setNewQuotation] = useState({ client: '', project: '', actualPrice: '', discount: '' });

  const totalAmount = useMemo(() => {
    const price = Number(newQuotation.actualPrice) || 0;
    const disc = Number(newQuotation.discount) || 0;
    return Math.max(0, price - disc);
  }, [newQuotation.actualPrice, newQuotation.discount]);

  const filteredQuotations = useMemo(() => {
    return quotations.filter(q => {
      const matchesSearch = q.client.toLowerCase().includes(searchTerm.toLowerCase()) || q.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, quotations]);

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    if (!newQuotation.client || !newQuotation.actualPrice) {
      addToast('Please provide client and actual price', 'error');
      return;
    }
    
    const quotation = {
      id: `QT-2024-${Math.floor(Math.random() * 1000)}`,
      ...newQuotation,
      amount: totalAmount,
      status: 'Sent',
      date: new Date().toISOString().split('T')[0]
    };
    
    await addQuotation(quotation);
    addToast('Quotation generated and saved!', 'success');
    setIsModalOpen(false);
    setNewQuotation({ client: '', project: '', actualPrice: '', discount: '' });
  };

  const handleDownloadPDF = (qt) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Quotation ${qt.id}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
            .details { margin-bottom: 30px; }
            .total { font-size: 24px; font-weight: bold; margin-top: 30px; border-top: 2px solid #eee; padding-top: 20px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Official Quotation</h1>
            <p>ID: ${qt.id} | Date: ${qt.date}</p>
          </div>
          <div class="details">
            <p><strong>Client:</strong> ${qt.client}</p>
            <p><strong>Project:</strong> ${qt.project}</p>
            <p><strong>Status:</strong> ${qt.status}</p>
          </div>
          <table style="width:100%; text-align:left; border-collapse:collapse;">
            <tr style="background:#eee;"><th style="padding:10px;">Description</th><th style="padding:10px;text-align:right;">Amount</th></tr>
            <tr><td style="padding:10px;">${qt.project}</td><td style="padding:10px;text-align:right;">₹${qt.actualPrice || qt.amount}</td></tr>
            ${qt.discount ? `<tr><td style="padding:10px;">Discount</td><td style="padding:10px;text-align:right;color:red;">- ₹${qt.discount}</td></tr>` : ''}
          </table>
          <div class="total">
            Total Amount: ₹${qt.amount.toLocaleString()}
          </div>
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted': return <Badge variant="success" className="gap-1"><CheckCircle2 size={12} /> Accepted</Badge>;
      case 'Sent': return <Badge variant="primary" className="gap-1"><Clock size={12} /> Sent</Badge>;
      case 'Expired': return <Badge variant="danger" className="gap-1"><AlertCircle size={12} /> Expired</Badge>;
      default: return <Badge variant="default">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Quotations</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage and monitor your business proposals.</p>
        </div>
        <Button className="gap-2 shadow-primary-500/30" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Quotation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by client, project or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-40 h-[46px] rounded-2xl"
          >
            <option value="All">All Status</option>
            <option value="Accepted">Accepted</option>
            <option value="Sent">Sent</option>
            <option value="Draft">Draft</option>
            <option value="Expired">Expired</option>
          </Select>
          <Button variant="secondary" className="h-[46px] w-[46px] p-0 rounded-2xl">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Quotation Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-dark-border">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Quotation ID</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Client / Project</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Amount</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Date</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
              <AnimatePresence mode="popLayout">
                {filteredQuotations.map((qt) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={qt.id} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-black font-mono text-slate-400 group-hover:text-primary-500 transition-colors">{qt.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{qt.client}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{qt.project}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">₹{qt.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(qt.status)}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{qt.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => addToast('Sending email...', 'warning')}
                          className="p-2 text-slate-400 hover:text-primary-500 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                        >
                          <Mail size={18} />
                        </button>
                        <button 
                          onClick={() => handleDownloadPDF(qt)}
                          className="p-2 text-slate-400 hover:text-primary-500 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                        >
                          <Download size={18} />
                        </button>
                        <button 
                          className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Quotation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Quotation"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleCreateQuotation}>Generate & Send</Button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          <Input 
            label="Client Name" 
            placeholder="e.g. Alankar Furniture" 
            value={newQuotation.client}
            onChange={(e) => setNewQuotation({...newQuotation, client: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Project Description" 
            placeholder="e.g. Mobile App Development" 
            value={newQuotation.project}
            onChange={(e) => setNewQuotation({...newQuotation, project: e.target.value})}
            className="h-12"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Actual Price (₹)" 
              type="number" 
              placeholder="0.00" 
              value={newQuotation.actualPrice}
              onChange={(e) => setNewQuotation({...newQuotation, actualPrice: e.target.value})}
              className="h-12"
            />
            <Input 
              label="Discount (₹)" 
              type="number" 
              placeholder="0.00" 
              value={newQuotation.discount}
              onChange={(e) => setNewQuotation({...newQuotation, discount: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center border border-slate-200 dark:border-dark-border">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
            <span className="text-2xl font-black text-primary-500">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Quotations;
