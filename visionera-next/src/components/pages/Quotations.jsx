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
    const printWindow = window.open('', '', 'width=800,height=1100');
    
    // Formatting numbers with commas
    const fmt = (num) => Number(num).toLocaleString('en-IN');
    
    // Constructing exact layout
    printWindow.document.write(`
      <html>
        <head>
          <title>Quotation ${qt.id}</title>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            @page { size: A4; margin: 0; }
            body { 
              font-family: 'Montserrat', sans-serif; 
              margin: 0; 
              padding: 0; 
              background: #fff;
              color: #111;
              position: relative;
              width: 210mm;
              height: 297mm;
              box-sizing: border-box;
            }
            .content-wrapper { padding: 40mm 20mm 30mm 20mm; position: relative; z-index: 10; height: 100%; box-sizing: border-box;}
            
            /* Background Waves */
            .top-wave { position: absolute; top: 0; right: 0; width: 100%; z-index: 1; }
            .bottom-wave { position: absolute; bottom: 0; left: 0; width: 100%; z-index: 1; }

            /* Header / Logo Area */
            .logo-area { text-align: center; margin-bottom: 25px; }
            .logo-icon { width: 120px; height: auto; margin-bottom: 5px; }
            .company-name { font-size: 24px; font-weight: 800; color: #1e3a8a; letter-spacing: 1px; margin: 0; }
            .company-sub { font-size: 11px; color: #475569; letter-spacing: 0.5px; margin: 0; }
            
            /* Title Area */
            .title-area { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px; }
            .doc-title { font-size: 16px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin: 0; }
            .doc-date { font-size: 12px; font-weight: 700; margin: 0; }
            
            /* Table */
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11px; }
            th, td { border: 1px solid #333; padding: 10px; text-align: center; }
            th { background-color: #eadab8; font-weight: 700; }
            td:nth-child(2) { text-align: left; font-weight: 500; }
            
            /* Summary & Terms Area */
            .bottom-grid { display: grid; grid-template-columns: 1fr 220px; gap: 30px; margin-top: 10px; }
            
            /* Summary Table */
            .summary { text-align: right; font-size: 12px; font-weight: 700; }
            .summary-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .summary-row.total-row { 
              border-top: 2px solid #000; 
              border-bottom: 2px solid #000; 
              padding: 8px 0; 
              margin-top: 8px; 
              font-size: 13px;
            }
            .summary-val { width: 100px; text-align: center; }
            
            /* Terms */
            .terms { font-size: 8px; color: #333; line-height: 1.4; padding-right: 20px;}
            .terms h4 { font-size: 9px; font-weight: 700; margin: 0 0 5px 0; }
            .terms ul { padding-left: 12px; margin: 0; }
            .terms li { margin-bottom: 4px; }
            
            /* Signature */
            .signature-area { text-align: center; margin-top: 40px; position: relative; }
            .stamp { position: absolute; right: 40px; top: -30px; width: 80px; opacity: 0.8; }
            .signature-img { width: 120px; margin-bottom: -15px; position: relative; z-index: 2; }
            .auth-text { font-size: 10px; color: #333; border-top: 1px dashed #999; display: inline-block; padding-top: 5px; width: 140px; }
          </style>
        </head>
        <body>
          <!-- Top Waves SVG -->
          <svg class="top-wave" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M400,0 C600,0 700,100 800,50 L800,0 L0,0 Z" fill="#6d2828" />
            <path d="M500,0 C650,20 750,150 800,100 L800,0 L0,0 Z" fill="#d97706" />
          </svg>

          <!-- Bottom Waves SVG -->
          <svg class="bottom-wave" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M0,200 C200,200 300,100 0,150 L0,200 Z" fill="#6d2828" />
            <path d="M0,200 C150,180 250,50 0,100 L0,200 Z" fill="#d97706" />
            <path d="M0,200 L800,200 L800,150 C600,220 400,80 0,180 Z" fill="#6d2828" />
            <path d="M0,200 L800,200 L800,180 C500,220 300,120 0,190 Z" fill="#d97706" />
          </svg>

          <div class="content-wrapper">
            <div class="logo-area">
              <!-- Mock Eagle Logo with CSS/SVG -->
              <svg class="logo-icon" viewBox="0 0 100 60">
                <ellipse cx="50" cy="30" rx="40" ry="20" fill="none" stroke="#1e3a8a" stroke-width="2"/>
                <path d="M20,30 Q50,0 80,30 Q50,40 20,30 Z" fill="#1e3a8a" />
                <path d="M30,30 Q50,10 70,30" fill="none" stroke="#fff" stroke-width="2" />
                <circle cx="50" cy="25" r="3" fill="#fff" />
              </svg>
              <h1 class="company-name">CRK VISIONERA</h1>
              <p class="company-sub">Technologies Pvt Ltd</p>
            </div>

            <div class="title-area">
              <h2 class="doc-title">QUOTATION FOR ${qt.project.toUpperCase()}</h2>
              <p class="doc-date">Date: ${qt.date}</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th width="5%">No.</th>
                  <th width="50%">Description</th>
                  <th width="10%">Quantity</th>
                  <th width="15%">Price</th>
                  <th width="20%">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>${qt.project} (Development & Setup)</td>
                  <td>1</td>
                  <td>${fmt(qt.actualPrice || qt.amount)}</td>
                  <td>${fmt(qt.actualPrice || qt.amount)}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Software Installation & Initial Configuration</td>
                  <td>1</td>
                  <td>Included</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Server Deployment (Hardware Provided by Client)</td>
                  <td>1</td>
                  <td>Included</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Staff Training & Handover</td>
                  <td>1</td>
                  <td>Complimentary</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>

            <div class="bottom-grid">
              <div class="terms">
                <h4>Terms & Conditions:</h4>
                <ul>
                  <li>The scope includes only the agreed features and functionalities. Any additional work will be charged extra after submitting the project.</li>
                  <li>The software will be installed on the client's local system/server. Required hardware must be provided by the client.</li>
                  <li>The client agrees to provide all necessary information, data, and approvals within the agreed timeframe. Any delay from the client's side may impact the project schedule, and the revised delivery timeline will be adjusted accordingly.</li>
                  <li>By confirming this quotation, the client agrees to all the terms and conditions stated above. A 30% advance payment is required to initiate the project, and the remaining 70% balance must be paid upon completion.</li>
                  <li>The quotation is valid for "15 days" from the date of issue.</li>
                </ul>
              </div>

              <div>
                <div class="summary">
                  <div class="summary-row">
                    <span>SUB TOTAL -</span>
                    <span class="summary-val">${fmt(qt.actualPrice || qt.amount)}</span>
                  </div>
                  <div class="summary-row">
                    <span>DISCOUNT -</span>
                    <span class="summary-val">${fmt(qt.discount || 0)}</span>
                  </div>
                  <div class="summary-row total-row">
                    <span>TOTAL</span>
                    <span class="summary-val">${fmt(qt.amount)}</span>
                  </div>
                </div>

                <div class="signature-area">
                  <!-- Circular Stamp Mock -->
                  <svg class="stamp" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#333" stroke-width="1.5" stroke-dasharray="4 2"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#333" stroke-width="1"/>
                    <path d="M30,50 Q50,30 70,50 Q50,55 30,50 Z" fill="#555" />
                    <text x="50" y="20" font-size="8" text-anchor="middle" fill="#333" transform="rotate(20 50 50)">CRK VISIONERA TECH</text>
                    <text x="50" y="88" font-size="8" text-anchor="middle" fill="#333" transform="rotate(-20 50 50)">PVT LTD</text>
                  </svg>
                  
                  <!-- Signature Mock -->
                  <svg class="signature-img" viewBox="0 0 150 50">
                    <path d="M10,40 Q20,10 30,30 T50,20 T70,35 T90,15 T110,40 T130,25" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round"/>
                    <path d="M20,35 L140,20" fill="none" stroke="#111" stroke-width="1" opacity="0.5"/>
                  </svg>
                  
                  <div class="auth-text">Authorized Signature</div>
                </div>
              </div>
            </div>
          </div>

          <script>
            window.onload = () => { 
              setTimeout(() => {
                window.print(); 
                window.close(); 
              }, 300);
            }
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
