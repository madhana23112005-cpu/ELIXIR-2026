
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, Clock, XCircle, Calendar, RefreshCw, Loader2, Trophy, Share2, QrCode, X, Star, Download, MapPin, Users, BookOpen, Zap, User, MessageCircle } from 'lucide-react';
import { Registration, RegistrationStatus } from '../types';
import { supabase } from '../supabase';
import { EVENTS } from '../constants';
import html2canvas from 'html2canvas';

const PassModal: React.FC<{ registration: Registration; onClose: () => void }> = ({ registration, onClose }) => {
  const passRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [qrBlobUrl, setQrBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrAsBlob = async () => {
      try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&bgcolor=000&color=FFD700&data=${encodeURIComponent(JSON.stringify({ id: registration.id, type: 'ELIXIR_ENTRY' }))}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setQrBlobUrl(blobUrl);
      } catch (err) {
        console.error("QR Blob fetch failed", err);
      }
    };
    fetchQrAsBlob();
    return () => {
      if (qrBlobUrl) URL.revokeObjectURL(qrBlobUrl);
    };
  }, [registration.id]);

  const handleDownload = async () => {
    if (!passRef.current || !qrBlobUrl) return;
    setDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await html2canvas(passRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false
      });
      const link = document.createElement('a');
      link.download = `ELIXIR_PASS_${registration.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert("Capture failed. Please take a screenshot.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative max-w-sm w-full animate-in zoom-in-95 duration-500">
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors">
          <X size={32} />
        </button>
        
        <div ref={passRef} className="relative bg-black border-2 border-gold/40 rounded-[3rem] p-10 shadow-[0_0_50px_rgba(255,215,0,0.3)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-full flex justify-between items-start mb-10">
               <div className="text-left">
                  <p className="text-[10px] text-gold font-black uppercase tracking-[0.4em] mb-1">Entry Pass</p>
                  <h4 className="text-2xl font-cinzel font-black text-white glow-text-gold tracking-widest">ELIXIR'26</h4>
               </div>
               <Star className="text-gold" fill="currentColor" size={28} />
            </div>
            
            <div className="bg-white p-5 rounded-[2.5rem] mb-10 border-4 border-gold/30 shadow-2xl min-h-[200px] flex items-center justify-center w-full max-w-[240px]">
               {qrBlobUrl ? (
                 <img src={qrBlobUrl} alt="Pass QR" className="w-full h-auto" />
               ) : (
                 <Loader2 className="animate-spin text-gold" size={32} />
               )}
            </div>
            
            <div className="w-full text-left space-y-6 mb-8">
               <div>
                 <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1">Participant Leader</p>
                 <p className="text-xl font-cinzel font-bold text-white tracking-wide uppercase">{registration.name}</p>
               </div>
               
               {registration.teamMembers.length > 0 && (
                 <div>
                   <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-2">Team Members</p>
                   <div className="flex flex-wrap gap-2">
                     {registration.teamMembers.map((m, i) => (
                       <span key={i} className="text-[10px] text-white font-bold border border-white/10 px-2 py-0.5 rounded uppercase">{m}</span>
                     ))}
                   </div>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                 <div>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1">Entry ID</p>
                    <p className="text-gold font-mono font-bold uppercase">{registration.id}</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1">Venue</p>
                    <p className="text-white font-bold text-[10px] uppercase">GCE Erode</p>
                 </div>
               </div>
            </div>

            <button 
              onClick={handleDownload} 
              disabled={downloading || !qrBlobUrl}
              className="w-full bg-gold text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all glow-gold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {downloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20}/>}
              {downloading ? 'Processing...' : 'Download Pass'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [userRegistrations, setUserRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState<Registration | null>(null);
  const [isLive, setIsLive] = useState(false);
  const userEmail = localStorage.getItem('elixir_user_email');

  const fetchUserRegistrations = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', userEmail.toLowerCase())
        .order('timestamp', { ascending: false });
      if (error) throw error;
      if (data) setUserRegistrations(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRegistrations();
    if (userEmail) {
      const emailFilter = userEmail.toLowerCase();
      const channel = supabase.channel(`dashboard-live-${emailFilter}`)
        .on(
          'postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'registrations',
            filter: `email=eq.${emailFilter}` 
          }, 
          (payload) => {
            setUserRegistrations(prev => {
              const exists = prev.some(r => r.id === (payload.new as Registration).id);
              if (exists) {
                return prev.map(r => r.id === (payload.new as Registration).id ? (payload.new as Registration) : r);
              }
              return [payload.new as Registration, ...prev];
            });
            if (navigator.vibrate) navigator.vibrate(200);
          }
        )
        .subscribe((status) => {
           setIsLive(status === 'SUBSCRIBED');
        });
      return () => { supabase.removeChannel(channel); };
    }
  }, [userEmail]);

  const getStatusStyle = (status: RegistrationStatus) => {
    switch (status) {
      case RegistrationStatus.PRESENT:
        return { 
          icon: <Zap className="text-blue-400" size={24} />, 
          text: 'text-blue-400', 
          displayText: 'VERIFIED AT VENUE',
          bg: 'bg-blue-500/10', 
          border: 'border-blue-500/20' 
        };
      case RegistrationStatus.CONFIRMED:
        return { 
          icon: <CheckCircle className="text-green-500" size={24} />, 
          text: 'text-green-500', 
          displayText: 'REGISTRATION ACTIVE',
          bg: 'bg-green-500/10', 
          border: 'border-green-500/20' 
        };
      case RegistrationStatus.PENDING:
        return { 
          icon: <Clock className="text-gold" size={24} />, 
          text: 'text-gold', 
          displayText: 'AWAITING VERIFICATION',
          bg: 'bg-gold/10', 
          border: 'border-gold/20' 
        };
      case RegistrationStatus.REJECTED:
        return { 
          icon: <XCircle className="text-red-500" size={24} />, 
          text: 'text-red-500', 
          displayText: 'PAYMENT DECLINED',
          bg: 'bg-red-500/10', 
          border: 'border-red-500/20' 
        };
      default:
        return { icon: <Clock />, text: 'text-gray-400', displayText: 'UNKNOWN', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <Loader2 className="animate-spin text-gold" size={48} />
    </div>
  );

  if (!userEmail || userRegistrations.length === 0) {
    return (
      <div className="py-32 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <LayoutDashboard size={64} className="text-white/10 mx-auto mb-8" />
          <h2 className="text-4xl font-cinzel font-bold text-white mb-4">No Records Found</h2>
          <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">Verify your email address or register for an event first.</p>
          <Link to="/register" className="bg-gold text-black px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all">Register Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      {selectedPass && <PassModal registration={selectedPass} onClose={() => setSelectedPass(null)} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/10 rounded-xl text-gold">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-cinzel font-bold tracking-widest uppercase">My Dashboard</h2>
                {isLive && (
                  <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Live Sync Active</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500">Managing access for: <span className="text-white font-bold">{userEmail}</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userRegistrations.map(reg => {
            const styles = getStatusStyle(reg.status);
            const isConfirmed = reg.status === RegistrationStatus.CONFIRMED || reg.status === RegistrationStatus.PRESENT;

            return (
              <div key={reg.id} className={`bg-[#111] rounded-[2.5rem] border ${isConfirmed ? 'border-gold/30 shadow-[0_0_40px_rgba(255,215,0,0.05)]' : 'border-white/10'} overflow-hidden shadow-2xl transition-all duration-700 animate-in fade-in zoom-in-95`}>
                <div className={`px-8 py-5 flex items-center justify-between border-b ${styles.border} ${styles.bg}`}>
                  <div className="flex items-center gap-3">
                    {styles.icon}
                    <span className={`font-black uppercase text-[10px] tracking-[0.2em] ${styles.text}`}>
                      {styles.displayText}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-2xl font-cinzel font-bold text-white mb-2 uppercase tracking-wide">{reg.name}</h4>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">{reg.college}</p>
                      <p className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">{reg.department}</p>
                    </div>
                  </div>

                  {/* WhatsApp Quick Groups */}
                  <div className="mb-8">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                       <MessageCircle size={12} className="text-[#25D366]" /> Join Event Groups
                    </p>
                    <div className="flex flex-col gap-2">
                       {reg.events.map(eventTitle => {
                          const eventObj = EVENTS.find(e => e.title === eventTitle);
                          if (!eventObj?.whatsappLink) return null;
                          return (
                             <a 
                                key={eventTitle}
                                href={eventObj.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#25D366]/30 transition-all group"
                             >
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{eventTitle}</span>
                                <span className="text-[#25D366] text-[9px] font-black uppercase flex items-center gap-1 group-hover:underline">
                                   Join Now
                                </span>
                             </a>
                          );
                       })}
                    </div>
                  </div>

                  {reg.teamMembers.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><Users size={12}/> Team Members</p>
                      <div className="flex flex-wrap gap-2">
                        {reg.teamMembers.map((m, i) => (
                          <span key={i} className="bg-white/5 text-gray-400 text-[10px] font-bold uppercase px-3 py-1 border border-white/5 rounded-lg">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-10">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><BookOpen size={12}/> Event Roster</p>
                    <div className="flex flex-wrap gap-2">
                      {reg.events.map((ev, i) => (
                        <span key={i} className="bg-gold/5 text-gold text-[10px] font-bold uppercase px-3 py-1 rounded-lg border border-gold/10">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <button 
                      onClick={() => isConfirmed && setSelectedPass(reg)}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest ${
                        isConfirmed 
                          ? 'bg-gold text-black hover:bg-amber-500 glow-gold shadow-lg' 
                          : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed opacity-50'
                      }`}
                      disabled={!isConfirmed}
                    >
                      <QrCode size={18} /> {isConfirmed ? 'View Entry Pass' : 'Verification Required'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
