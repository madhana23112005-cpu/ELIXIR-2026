
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, Clock, XCircle, Mail, AlertCircle, ArrowRight, Loader2, RefreshCw, Zap } from 'lucide-react';
import { Registration, RegistrationStatus } from '../types';
import { supabase } from '../supabase';

const Verify: React.FC = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<Registration | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchStatus = async (searchEmail: string) => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', searchEmail.trim().toLowerCase())
        .maybeSingle();
      
      if (error) throw error;
      setResult(data);
    } catch (err) {
      console.error('Search error:', err);
      setResult(null);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSearching(true);
    setHasSearched(false);
    
    await fetchStatus(email);
    
    setIsSearching(false);
    setHasSearched(true);
  };

  // Real-time listener for the searched email
  useEffect(() => {
    if (result && result.email) {
      const userEmail = result.email.toLowerCase();
      
      // Establish Real-time Channel
      const channel = supabase.channel(`live-verify-${userEmail}`)
        .on(
          'postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'registrations',
            filter: `email=eq.${userEmail}` 
          }, 
          (payload) => {
            console.log('Live status update received:', payload.new);
            setResult(payload.new as Registration);
            if (navigator.vibrate) navigator.vibrate(200);
          }
        )
        .subscribe((status) => {
          setIsLive(status === 'SUBSCRIBED');
        });
      
      return () => {
        supabase.removeChannel(channel);
        setIsLive(false);
      };
    }
  }, [result?.email]);

  const getStatusDisplay = (status: RegistrationStatus) => {
    switch (status) {
      case RegistrationStatus.PRESENT:
        return {
          icon: <Zap className="text-blue-400" size={48} />,
          title: "Check-in Confirmed",
          color: "text-blue-400",
          bg: "bg-blue-400/10",
          border: "border-blue-400/20",
          message: "Welcome to ELIXIR'26! Your physical entry has been verified at the venue gate."
        };
      case RegistrationStatus.CONFIRMED:
        return {
          icon: <CheckCircle className="text-green-500" size={48} />,
          title: "Payment Verified",
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          message: "Your payment has been successfully verified! Your entry pass is now active in the dashboard."
        };
      case RegistrationStatus.REJECTED:
        return {
          icon: <XCircle className="text-red-500" size={48} />,
          title: "Issue Detected",
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          message: "There was an issue verifying your transaction. Please visit the help desk or contact us."
        };
      default:
        return {
          icon: <Clock className="text-gold" size={48} />,
          title: "Awaiting Verification",
          color: "text-gold",
          bg: "bg-gold/10",
          border: "border-gold/20",
          message: "We've received your registration. Our team is currently verifying your transaction ID."
        };
    }
  };

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Verification Portal</h2>
          <h3 className="text-4xl font-cinzel font-bold mb-4">Check Your Status</h3>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Enter your registered email to track your status. Once found, the page will update **live** as soon as our team verifies your payment.
          </p>
        </div>

        <div className="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl mb-12 relative overflow-hidden">
          {isLive && (
            <div className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full animate-pulse">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
               <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Live Sync Active</span>
            </div>
          )}

          <form onSubmit={handleSearch} className="relative mb-8">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter registered email address..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-gold transition-all"
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-2 bottom-2 bg-gold text-black px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-500 transition-all disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="animate-spin" size={18} /> : <>Verify <Search size={18} /></>}
            </button>
          </form>

          {hasSearched && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {result ? (
                <div className={`p-8 rounded-3xl border ${getStatusDisplay(result.status).border} ${getStatusDisplay(result.status).bg} transition-all duration-700`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 animate-in zoom-in-50 duration-500">{getStatusDisplay(result.status).icon}</div>
                    <h4 className={`text-2xl font-cinzel font-bold mb-2 ${getStatusDisplay(result.status).color}`}>
                      {getStatusDisplay(result.status).title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-sm">
                      {getStatusDisplay(result.status).message}
                    </p>

                    <div className="w-full space-y-4 text-left border-t border-white/10 pt-6">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 uppercase tracking-widest font-bold">Participant</span>
                        <span className="text-white font-bold">{result.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 uppercase tracking-widest font-bold">Reference ID</span>
                        <span className="text-gold font-mono">{result.id}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 uppercase tracking-widest font-bold">College</span>
                        <span className="text-white truncate max-w-[150px]">{result.college}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-4 border-t border-white/5">
                        <span className="text-gray-500 uppercase tracking-widest font-bold">Registration Fee</span>
                        <span className="text-white font-bold text-lg">₹{result.totalFee}</span>
                      </div>
                    </div>

                    {(result.status === RegistrationStatus.CONFIRMED || result.status === RegistrationStatus.PRESENT) && (
                      <Link 
                        to="/dashboard" 
                        onClick={() => localStorage.setItem('elixir_user_email', result.email)}
                        className="mt-8 w-full bg-gold text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-amber-500 transition-all shadow-lg"
                      >
                        Go to Dashboard <ArrowRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-red-500/5 border border-red-500/20 rounded-3xl">
                  <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
                  <h4 className="text-xl font-cinzel font-bold text-white mb-2">Registration Not Found</h4>
                  <p className="text-gray-500 text-sm mb-6">We couldn't find any record for this email. If you just registered, please wait a minute for the cloud sync to complete.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 text-gray-400 font-bold hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-xl">
                      <RefreshCw size={18} /> Retry Search
                    </button>
                    <Link to="/register" className="flex items-center justify-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-all">
                      New Registration <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
            Security Notice
          </p>
          <p className="text-gray-600 text-xs italic leading-relaxed">
            Payment verification is manual. If your status is "Pending" for more than 24 hours, <br/>
            please contact the organizers at <span className="text-gold">gceelixir26@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
