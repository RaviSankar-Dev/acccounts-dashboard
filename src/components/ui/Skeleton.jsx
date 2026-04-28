import React from 'react';
import { cn } from './Button';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200 dark:bg-slate-800',
        className
      )}
      {...props}
    />
  );
};

export const TableSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);

export const CardSkeleton = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex justify-between">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
  </div>
);
