import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Forms';
import { motion } from 'framer-motion';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@visionera.com' && password === 'admin123') {
      setIsLoading(true);
      setError('');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      setError('Invalid credentials. Use admin@visionera.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -ml-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl premium-gradient items-center justify-center text-white shadow-xl mb-6">
            <BarChart3 size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to Visionera Smart Dashboard</p>
        </div>

        <div className="glass-card p-8 border-white/40 dark:border-slate-800/50 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
                {error}
              </div>
            )}
            <Input 
              label="Email Address" 
              placeholder="admin@visionera.com" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />
            <Input 
              label="Password" 
              placeholder="••••••••" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm font-bold text-primary-600 hover:underline">Forgot Password?</button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 gap-2 text-base shadow-xl shadow-primary-500/30" 
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Sign In'} 
              {!isLoading && <ArrowRight size={18} />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-dark-border text-center">
            <p className="text-sm text-slate-500">
              By signing in, you agree to our <br />
              <button className="font-bold text-slate-900 dark:text-white hover:underline">Terms of Service</button> and <button className="font-bold text-slate-900 dark:text-white hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <ShieldCheck size={14} className="text-emerald-500" /> 256-bit Encryption
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Lock size={14} className="text-emerald-500" /> Secure Login
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
