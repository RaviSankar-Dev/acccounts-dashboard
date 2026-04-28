import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initial Data or Load from LocalStorage
  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('v_quotations');
    return saved ? JSON.parse(saved) : [
      { id: 'QT-2024-001', client: 'Alankar Furniture', project: 'E-commerce Platform', amount: 45000, status: 'Sent', date: '2024-04-20' },
      { id: 'QT-2024-002', client: 'Ghar Sansar', project: 'Inventory System', amount: 12000, status: 'Accepted', date: '2024-04-18' },
    ];
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('v_deals');
    return saved ? JSON.parse(saved) : [
      { id: 'DL-001', client: 'Alankar Furniture', total: 150000, advance: 45000, balance: 105000, progress: 30, status: 'Active' },
      { id: 'DL-002', client: 'Ghar Sansar', total: 80000, advance: 80000, balance: 0, progress: 100, status: 'Closed' },
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('v_projects');
    return saved ? JSON.parse(saved) : [
      { id: 'PJ-001', name: 'Visionera CRM', client: 'Internal', progress: 65, deadline: '2024-05-15', status: 'On Track', team: ['AS', 'MD'] },
      { id: 'PJ-002', name: 'Alankar Web', client: 'Alankar Furniture', progress: 20, deadline: '2024-06-01', status: 'At Risk', team: ['SK'] },
    ];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('v_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 'TRX-101', date: '2024-04-26 14:30', client: 'Alankar Furniture', account: 'HDFC Corporate', amount: 20000, type: 'Credit', mode: 'Bank Transfer' },
    ];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('v_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 'EXP-501', date: '2024-04-26', title: 'Office Rent', category: 'Rent', amount: 35000, mode: 'Bank' },
    ];
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('v_quotations', JSON.stringify(quotations));
    localStorage.setItem('v_deals', JSON.stringify(deals));
    localStorage.setItem('v_projects', JSON.stringify(projects));
    localStorage.setItem('v_transactions', JSON.stringify(transactions));
    localStorage.setItem('v_expenses', JSON.stringify(expenses));
  }, [quotations, deals, projects, transactions, expenses]);

  // Actions
  const addQuotation = (q) => setQuotations([q, ...quotations]);
  const addDeal = (d) => setDeals([d, ...deals]);
  const addProject = (p) => setProjects([p, ...projects]);
  const addTransaction = (t) => setTransactions([t, ...transactions]);
  const addExpense = (e) => setExpenses([e, ...expenses]);

  return (
    <DataContext.Provider value={{
      quotations, addQuotation,
      deals, addDeal,
      projects, addProject,
      transactions, addTransaction,
      expenses, addExpense
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
