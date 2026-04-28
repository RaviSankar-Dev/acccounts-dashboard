"use client";
import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            System <span className="text-primary-500">Settings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Configure your application preferences.</p>
        </div>
      </div>
      <div className="glass-card p-8">
        <p className="text-slate-500 dark:text-slate-400">Settings configuration options will appear here.</p>
      </div>
    </div>
  );
};

export default Settings;
