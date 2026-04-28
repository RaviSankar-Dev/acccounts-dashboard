"use client";
import { useData } from "@/hooks/useData";
import Dashboard from "@/components/pages/Dashboard";

export default function Home() {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Dashboard />;
}
