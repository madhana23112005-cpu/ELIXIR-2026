import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Hardcoded password for administrative access
    setTimeout(() => {
      if (password === 'admin123') {
        onLogin();
        navigate(from, { replace: true });
      } else {
        setError('Invalid Administrative Credentials');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-gold/10 text-gold mb-6 border border-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
            <Lock size={40} />
          </div>
          <h2 className="text-4xl font-cinzel font-black text-white mb-2 tracking-widest uppercase">Admin Login</h2>
          <p className="text-gray-500 text-sm tracking-wider">ELIXIR'26 CONTROL CENTER ACCESS</p>
        </div>

        <div className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 blur-[60px] rounded-full group-hover:bg-gold/10 transition-all duration-700"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] ml-1">Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold transition-all text-center tracking-[0.5em] text-lg font-bold"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-500 transition-all glow-gold transform active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Authorize Access <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-gold/40" /> Secure Encryption Active
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-600 text-[10px] uppercase tracking-widest">
          Department of EEE • GCE Erode
        </p>
      </div>
    </div>
  );
};

export default Login;