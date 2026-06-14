
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Settings, CheckCircle, Search, Users, User, Shield, AlertCircle, LayoutDashboard, Eye, Loader2, X, Download, Cloud, MapPin, TrendingUp, Camera, RefreshCw, Scan, LogOut, Database, Zap, UserCheck, Clock, History, ChevronRight, GraduationCap, Plus, UserPlus, FileSpreadsheet, Trash2, Mail, Phone, Calendar
} from 'lucide-react';
import { Registration, RegistrationStatus } from '../types';
import { supabase } from '../supabase';
import { Html5Qrcode } from 'html5-qrcode';
import { EVENTS } from '../constants';

interface AdminProps {
  registrations: Registration[];
  onUpdateStatus: (id: string, status: RegistrationStatus) => Promise<void>;
  onRefresh?: () => void;
  fetchError?: string | null;
  isLoading?: boolean;
  onLogout: () => void;
}

const playSuccessSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    console.warn("Audio feedback failed");
  }
};

const LiveScanner: React.FC<{ 
  onScan: (id: string) => void; 
  onError: (err: string) => void;
  onClose: () => void;
  lastScannedParticipant: Registration | null;
}> = ({ onScan, onError, onClose, lastScannedParticipant }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isSuccessfullyScanned, setIsSuccessfullyScanned] = useState(false);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("reader", { verbose: false });
        scannerRef.current = scanner;
        const config = { fps: 60, qrbox: { width: 280, height: 280 }, aspectRatio: 1.0, disableFlip: false };
        await scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            if (isSuccessfullyScanned) return;
            try {
              const payload = JSON.parse(decodedText);
              if (payload.type === 'ELIXIR_ENTRY' && payload.id) {
                onScan(payload.id);
                setIsSuccessfullyScanned(true);
                playSuccessSound();
                if (navigator.vibrate) navigator.vibrate(100);
                setTimeout(() => setIsSuccessfullyScanned(false), 3000);
              }
            } catch (e) {
              console.warn("Invalid QR Format");
            }
          },
          () => {} 
        );
      } catch (err: any) {
        onError(err.message || "Camera access failed.");
      }
    };
    startScanner();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {}).finally(() => {
           const container = document.getElementById("reader");
           if (container) container.innerHTML = "";
        });
      }
    };
  }, [onScan, onError, isSuccessfullyScanned]);

  return (
    <div className="relative w-full aspect-square bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 transition-colors duration-300 border-white/10">
      <div id="reader" className="w-full h-full object-cover"></div>
      {!isSuccessfullyScanned && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-64 h-64 border-2 border-white/10 rounded-[2rem]">
             <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
             <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-gold rounded-tr-2xl"></div>
             <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-gold rounded-bl-2xl"></div>
             <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-gold/30 animate-pulse"></div>
          </div>
        </div>
      )}
      {isSuccessfullyScanned && (
        <div className="absolute inset-0 bg-green-500/20 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
          <div className="bg-green-500 text-white p-4 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.5)] mb-6 animate-bounce">
            <CheckCircle size={48} strokeWidth={4} />
          </div>
          <div className="text-center space-y-3 bg-black/80 p-8 rounded-[2rem] border-2 border-gold/30 shadow-2xl max-w-xs w-full">
            <h4 className="text-white text-3xl font-cinzel font-black uppercase tracking-wider line-clamp-2">
              {lastScannedParticipant?.name || 'VERIFIED'}
            </h4>
          </div>
        </div>
      )}
      <button onClick={onClose} className="absolute top-6 right-6 z-40 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"><X size={20} /></button>
    </div>
  );
};

const ManualEntryModal: React.FC<{ onClose: () => void; onSave: (reg: Registration) => Promise<void> }> = ({ onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: '',
    email: '',
    phone: '',
    selectedEvents: [] as string[]
  });

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const regId = `MAN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const newReg: Registration = {
        id: regId,
        name: formData.name,
        college: formData.college,
        department: formData.department,
        email: formData.email.toLowerCase(),
        phone: formData.phone,
        teamMembers: [],
        events: formData.selectedEvents,
        totalFee: 0,
        transactionId: 'ON-SPOT',
        status: RegistrationStatus.CONFIRMED,
        timestamp: new Date().toISOString()
      };
      await onSave(newReg);
      onClose();
    } catch (err) {
      alert("Error adding participant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#111] w-full max-w-xl rounded-[3rem] border border-gold/20 p-10 relative overflow-hidden shadow-2xl">
         <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24} /></button>
         <h3 className="text-2xl font-cinzel font-black uppercase tracking-widest text-gold mb-8">Manual Entry</h3>
         <form onSubmit={handleManualSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
              <input type="text" placeholder="College" required value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
              <input type="text" placeholder="Dept" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
              <input type="tel" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
              <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Select Events</p>
              <div className="flex flex-wrap gap-2">
                {EVENTS.map(ev => (
                  <button 
                    key={ev.id}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      selectedEvents: prev.selectedEvents.includes(ev.title) ? prev.selectedEvents.filter(t => t !== ev.title) : [...prev.selectedEvents, ev.title]
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${formData.selectedEvents.includes(ev.title) ? 'bg-gold border-gold text-black' : 'border-white/10 text-gray-500'}`}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>
            </div>
            <button disabled={loading} className="w-full bg-gold text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-amber-500 glow-gold flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Register Participant
            </button>
         </form>
      </div>
    </div>
  );
};

type AdminTab = 'registrations' | 'scanner' | 'settings';

const Admin: React.FC<AdminProps> = ({ registrations, onUpdateStatus, onRefresh, fetchError, isLoading, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('registrations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<RegistrationStatus | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lastScannedId, setLastScannedId] = useState<string | null>(null);
  const [recentScans, setRecentScans] = useState<Registration[]>([]);
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const selectedReg = useMemo(() => registrations.find(r => r.id === selectedId) || null, [selectedId, registrations]);
  const lastScannedParticipant = useMemo(() => {
    if (!lastScannedId) return null;
    return registrations.find(r => r.id.toUpperCase() === lastScannedId.toUpperCase()) || null;
  }, [lastScannedId, registrations]);

  const stats = useMemo(() => {
    const total = registrations.length;
    const confirmed = registrations.filter(r => r.status === RegistrationStatus.CONFIRMED || r.status === RegistrationStatus.PRESENT).length;
    const pending = registrations.filter(r => r.status === RegistrationStatus.PENDING).length;
    const present = registrations.filter(r => r.status === RegistrationStatus.PRESENT).length;
    return { total, confirmed, pending, present };
  }, [registrations]);

  const handleScan = async (id: string) => {
    const participant = registrations.find(r => r.id.toUpperCase() === id.trim().toUpperCase());
    if (participant) {
      setLastScannedId(participant.id);
      if (participant.status !== RegistrationStatus.PRESENT) {
        await onUpdateStatus(participant.id, RegistrationStatus.PRESENT);
      }
      setRecentScans(prev => {
        const filtered = prev.filter(p => p.id !== participant.id);
        return [participant, ...filtered].slice(0, 5);
      });
      // Automatically open the full profile
      setSelectedId(participant.id);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = reg.name.toLowerCase().includes(s) || reg.id.toLowerCase().includes(s);
    const matchesFilter = (filter === 'ALL' || reg.status === filter);
    return matchesSearch && matchesFilter;
  });

  const handleManualSave = async (reg: Registration) => {
    const { error } = await supabase.from('registrations').insert([reg]);
    if (error) throw error;
    if (onRefresh) onRefresh();
  };

  const handleExportData = () => {
    setIsExporting(true);
    try {
      const headers = ['ID', 'Name', 'College', 'Department', 'Email', 'Phone', 'Events', 'Total Fee', 'Transaction ID', 'Status', 'Timestamp'];
      const csvContent = [
        headers.join(','),
        ...registrations.map(r => [
          r.id,
          `"${r.name}"`,
          `"${r.college}"`,
          `"${r.department}"`,
          r.email,
          r.phone,
          `"${r.events.join(', ')}"`,
          r.totalFee,
          r.transactionId || 'N/A',
          r.status,
          r.timestamp
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `elixir_registrations_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export data.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen text-white font-inter">
      {isManualEntryOpen && <ManualEntryModal onClose={() => setIsManualEntryOpen(false)} onSave={handleManualSave} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-in fade-in slide-in-from-top-4">
           {[
             { label: 'Registrations', val: stats.total, icon: <Users size={20} />, color: 'text-white' },
             { label: 'Confirmed', val: stats.confirmed, icon: <CheckCircle size={20} />, color: 'text-green-500' },
             { label: 'Pending', val: stats.pending, icon: <Clock size={20} />, color: 'text-gold' },
             { label: 'Checked In', val: stats.present, icon: <Zap size={20} />, color: 'text-blue-400' }
           ].map((s, i) => (
             <div key={i} className="bg-[#111] p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center shadow-lg">
                <div className={`${s.color} bg-white/5 p-3 rounded-2xl mb-3`}>{s.icon}</div>
                <p className="text-3xl font-cinzel font-black tracking-widest">{s.val}</p>
                <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] mt-1">{s.label}</p>
             </div>
           ))}
        </div>

        {/* Header and Nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gold/10 rounded-2xl text-gold border border-gold/20 shadow-lg"><LayoutDashboard size={32} /></div>
            <div>
              <h2 className="text-4xl font-cinzel font-black tracking-widest uppercase">Admin Hub</h2>
              <div className="flex items-center gap-3 mt-1">
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest font-mono">Status: {isLoading ? 'Syncing...' : 'Live Connected'}</p>
                 <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <button onClick={() => setIsManualEntryOpen(true)} className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/10 text-gold hover:bg-gold hover:text-black transition-all flex items-center gap-2">
              <UserPlus size={16} /> New Entry
            </button>
            <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>
            {['registrations', 'scanner', 'settings'].map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab as AdminTab); setIsCameraActive(false); }}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {tab === 'registrations' ? <Database size={16} /> : tab === 'scanner' ? <Scan size={16} /> : <Settings size={16} />}
                <span className="ml-2 hidden sm:inline">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display */}
        <div className="bg-[#111] rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden min-h-[600px]">
          {activeTab === 'registrations' && (
            <div className="p-8 md:p-12 animate-in fade-in duration-500">
               <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or ID..." className="w-full bg-black/40 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm focus:border-gold/50 text-white" />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    {['ALL', RegistrationStatus.PENDING, RegistrationStatus.CONFIRMED, RegistrationStatus.PRESENT].map(f => (
                      <button key={f} onClick={() => setFilter(f as any)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-gold/20 border-gold text-gold' : 'border-white/5 text-gray-500 hover:text-white'}`}>{f.replace('Payment Pending Verification', 'PENDING')}</button>
                    ))}
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase text-gray-500 font-black tracking-widest">
                           <th className="px-10 py-8">Participant Info</th>
                           <th className="px-10 py-8">Status</th>
                           <th className="px-10 py-8 text-right">Quick Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {filteredRegistrations.map(reg => (
                          <tr key={reg.id} className="hover:bg-white/5 transition-all group">
                             <td className="px-10 py-8">
                                <p className="text-xl font-cinzel font-bold text-white group-hover:text-gold transition-colors">{reg.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">{reg.id}</p>
                                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                  <p className="text-[9px] text-gray-600 font-bold uppercase truncate max-w-[150px]">{reg.college}</p>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase border transition-all flex items-center gap-2 w-fit ${
                                  reg.status === RegistrationStatus.PRESENT ? 'text-blue-400 border-blue-400/30 bg-blue-400/5' : 
                                  reg.status === RegistrationStatus.CONFIRMED ? 'text-green-500 border-green-500/30 bg-green-500/5' : 
                                  'text-gold border-gold/30 bg-gold/5 animate-pulse'
                                }`}>
                                   {reg.status === RegistrationStatus.PRESENT && <Zap size={10} />}
                                   {reg.status === RegistrationStatus.CONFIRMED && <CheckCircle size={10} />}
                                   {reg.status === RegistrationStatus.PENDING && <Clock size={10} />}
                                   {reg.status.replace('Payment Pending Verification', 'PENDING')}
                                </span>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <div className="flex justify-end gap-2">
                                  {reg.status === RegistrationStatus.PENDING && (
                                    <button onClick={() => onUpdateStatus(reg.id, RegistrationStatus.CONFIRMED)} className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-[9px] font-black uppercase hover:bg-green-500 hover:text-white transition-all">Confirm Payment</button>
                                  )}
                                  {reg.status === RegistrationStatus.CONFIRMED && (
                                    <button onClick={() => onUpdateStatus(reg.id, RegistrationStatus.PRESENT)} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[9px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">Check-In</button>
                                  )}
                                  <button onClick={() => setSelectedId(reg.id)} className="p-2 bg-white/5 text-gray-400 hover:text-gold rounded-xl transition-all border border-white/10"><Eye size={18}/></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               {filteredRegistrations.length === 0 && (
                 <div className="text-center py-20">
                    <Database className="text-white/5 mx-auto mb-4" size={64} />
                    <p className="text-gray-500 uppercase font-black text-xs tracking-widest">No matching records found.</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="p-8 md:p-16 flex flex-col items-center animate-in slide-in-from-bottom-10 h-full">
               <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3 space-y-8">
                     {!isCameraActive ? (
                       <div className="aspect-square bg-black/40 border border-white/5 p-16 rounded-[4rem] flex flex-col items-center justify-center space-y-12">
                          <Scan size={64} className="text-gold" />
                          <button onClick={() => setIsCameraActive(true)} className="w-full bg-gold text-black py-7 rounded-[2.5rem] font-cinzel text-3xl font-black uppercase tracking-widest hover:bg-amber-500 glow-gold">Start Scanner</button>
                       </div>
                     ) : (
                       <LiveScanner onScan={handleScan} onError={setCameraError} onClose={() => setIsCameraActive(false)} lastScannedParticipant={lastScannedParticipant} />
                     )}
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                     <div className="bg-black/20 rounded-[3rem] border border-white/5 p-10 h-full">
                        <h4 className="text-lg font-cinzel font-bold text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Real-time Check-ins</h4>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                           {recentScans.map((scan, i) => (
                             <div key={i} className="flex items-center gap-4 p-5 bg-green-500/5 rounded-3xl border border-green-500/10 animate-in slide-in-from-right-4 cursor-pointer" onClick={() => setSelectedId(scan.id)}>
                                <UserCheck size={20} className="text-green-500" />
                                <div className="min-w-0">
                                   <h5 className="text-xs font-black text-white truncate">{scan.name}</h5>
                                   <p className="text-[9px] text-gray-500 font-mono">{scan.id}</p>
                                </div>
                             </div>
                           ))}
                           {recentScans.length === 0 && <p className="text-center text-gray-600 text-[10px] py-10">Scan a QR code to begin attendance check-in.</p>}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-12 md:p-20 space-y-12 animate-in fade-in duration-500">
               <div>
                  <h3 className="text-4xl font-cinzel font-black tracking-widest uppercase mb-4 text-gold">Administrative Options</h3>
                  <p className="text-gray-500 max-w-xl">Configure system behavior and export symposium data for offline processing.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-gold/20 transition-all flex flex-col justify-between">
                     <div>
                        <FileSpreadsheet className="text-gold mb-6" size={40} />
                        <h4 className="text-2xl font-cinzel font-bold text-white mb-2">Export Registrations</h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">Download all participant records in CSV format for institutional documentation and team allocation.</p>
                     </div>
                     <button 
                        onClick={handleExportData} 
                        disabled={isExporting || registrations.length === 0}
                        className="w-full bg-gold text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-amber-500 transition-all shadow-lg glow-gold disabled:opacity-30"
                     >
                        {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                        {isExporting ? 'Exporting...' : 'Download Full Dataset (CSV)'}
                     </button>
                  </div>

                  <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-red-500/20 transition-all flex flex-col justify-between">
                     <div>
                        <LogOut className="text-red-500 mb-6" size={40} />
                        <h4 className="text-2xl font-cinzel font-bold text-white mb-2">Security Logout</h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">Terminate the current administrative session. You will need the access key to log back into the hub.</p>
                     </div>
                     <button 
                        onClick={onLogout}
                        className="w-full border border-red-500/20 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                     >
                        <Shield size={18} /> Terminate Admin Session
                     </button>
                  </div>
               </div>

               <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <GraduationCap className="text-gold/40" size={24} />
                     <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">System Engine</p>
                        <p className="text-white font-bold text-xs">ELIXIR-Cloud v2.0</p>
                     </div>
                  </div>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Department of EEE • GCE Erode</p>
               </div>
            </div>
          )}
        </div>

        {/* Global Inspector Modal */}
        {selectedReg && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-200">
            <div className="bg-[#0A0A0A] w-full max-w-2xl rounded-[4rem] border border-gold/30 p-12 md:p-16 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
               <button onClick={() => setSelectedId(null)} className="absolute top-10 right-10 text-gray-600 hover:text-white p-2 z-20"><X size={32}/></button>
               
               <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-8">
                    <div className="p-6 bg-gold/10 text-gold rounded-3xl border border-gold/10"><User size={48} /></div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-cinzel font-black uppercase tracking-widest leading-tight">{selectedReg.name}</h3>
                      <p className="text-gold text-sm font-mono tracking-widest">{selectedReg.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     <div className="space-y-8">
                        <div>
                           <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-3">Academic Identity</label>
                           <div className="space-y-1">
                              <p className="text-white font-bold text-lg leading-tight">{selectedReg.college}</p>
                              <p className="text-gold font-black uppercase text-[10px] tracking-widest">{selectedReg.department}</p>
                           </div>
                        </div>
                        
                        <div>
                           <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-3">Secure Communication</label>
                           <div className="space-y-3">
                              <div className="flex items-center gap-3 text-white/80 text-sm">
                                 <Mail size={14} className="text-gold/50" />
                                 <span className="font-medium">{selectedReg.email}</span>
                              </div>
                              <div className="flex items-center gap-3 text-white/80 text-sm">
                                 <Phone size={14} className="text-gold/50" />
                                 <span className="font-medium">{selectedReg.phone}</span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-3">Digital Fingerprint</label>
                           <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] text-gray-500">
                                 <span>Transaction</span>
                                 <span className="text-gold font-mono tracking-widest">{selectedReg.transactionId}</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] text-gray-500">
                                 <span>Registered</span>
                                 <div className="flex items-center gap-2">
                                    <Calendar size={10} />
                                    <span>{new Date(selectedReg.timestamp).toLocaleString()}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className={`p-8 rounded-[2.5rem] border flex flex-col justify-center text-center shadow-inner ${
                           selectedReg.status === RegistrationStatus.PRESENT ? 'bg-blue-500/10 border-blue-500/40' : 'bg-green-500/10 border-green-500/40'
                        }`}>
                           <label className="text-[9px] font-black uppercase tracking-widest block mb-4 text-gray-400">Venue Status</label>
                           <p className={`text-2xl md:text-3xl font-cinzel font-bold uppercase tracking-widest ${selectedReg.status === RegistrationStatus.PRESENT ? 'text-blue-400' : 'text-green-500'}`}>
                             {selectedReg.status.replace('Payment Pending Verification', 'PENDING')}
                           </p>
                        </div>

                        {selectedReg.teamMembers.length > 0 && (
                          <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                             <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-4">Confirmed Team</label>
                             <div className="flex flex-col gap-3">
                                {selectedReg.teamMembers.map((member, i) => (
                                   <div key={i} className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40"></div>
                                      <span className="text-xs text-white/90 font-bold uppercase tracking-wide">{member}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                        )}

                        <div>
                           <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-3">Event Selection</label>
                           <div className="flex flex-wrap gap-2">
                             {selectedReg.events.map((e,i) => (
                                <span key={i} className="text-[9px] font-black text-gold border border-gold/20 px-3 py-1.5 rounded-lg bg-gold/5 uppercase tracking-widest">
                                   {e}
                                </span>
                             ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 pt-8 border-t border-white/5">
                    {selectedReg.status !== RegistrationStatus.CONFIRMED && (
                      <button onClick={() => onUpdateStatus(selectedReg.id, RegistrationStatus.CONFIRMED)} className="flex-1 bg-white/5 border border-white/10 text-green-500 py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-green-500 hover:text-black transition-all">Confirm Payment</button>
                    )}
                    {selectedReg.status !== RegistrationStatus.PRESENT && (
                      <button onClick={() => onUpdateStatus(selectedReg.id, RegistrationStatus.PRESENT)} className="flex-1 bg-white/5 border border-white/10 text-blue-400 py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-500 hover:text-black transition-all">Mark Present</button>
                    )}
                    <button onClick={() => setSelectedId(null)} className="flex-[2] bg-gold text-black py-6 rounded-3xl font-cinzel text-3xl font-black uppercase hover:bg-amber-500 glow-gold transition-all">Close Dossier</button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
