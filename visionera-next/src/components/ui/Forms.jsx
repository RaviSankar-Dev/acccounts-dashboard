import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-dark-border rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 placeholder:text-slate-400 dark:text-slate-200',
          error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
});

export const Select = React.forwardRef(({ className, label, error, children, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-dark-border rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:text-slate-200',
          error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
});

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
