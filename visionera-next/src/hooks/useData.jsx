"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [quotations, setQuotations] = useState([]);
  const [deals, setDeals] = useState([]);
  const [projects, setProjects] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [qRes, dRes, pRes, tRes, eRes] = await Promise.all([
        fetch('/api/quotations'),
        fetch('/api/deals'),
        fetch('/api/projects'),
        fetch('/api/transactions'),
        fetch('/api/expenses'),
      ]);

      const [qData, dData, pData, tData, eData] = await Promise.all([
        qRes.json(), dRes.json(), pRes.json(), tRes.json(), eRes.json()
      ]);

      setQuotations(qData.error ? [] : qData);
      setDeals(dData.error ? [] : dData);
      setProjects(pData.error ? [] : pData);
      setTransactions(tData.error ? [] : tData);
      setExpenses(eData.error ? [] : eData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addQuotation = async (q) => {
    setQuotations([q, ...quotations]);
    await fetch('/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q),
    });
  };

  const addDeal = async (d) => {
    setDeals([d, ...deals]);
    await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
    });
  };

  const addProject = async (p) => {
    setProjects([p, ...projects]);
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
  };

  const addTransaction = async (t) => {
    setTransactions([t, ...transactions]);
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t),
    });
  };

  const addExpense = async (e) => {
    setExpenses([e, ...expenses]);
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e),
    });
  };

  return (
    <DataContext.Provider value={{
      quotations, addQuotation,
      deals, addDeal,
      projects, addProject,
      transactions, addTransaction,
      expenses, addExpense,
      loading,
      refreshData: fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
