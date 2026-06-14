
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Instagram, Mail, Phone, MapPin, Trophy, Calendar, Users, Briefcase, Camera, Heart, CheckCircle, ChevronRight, LayoutDashboard, Settings, Search, BookOpen, Newspaper, AlertCircle } from 'lucide-react';
import { Registration, RegistrationStatus } from './types';
import { supabase } from './supabase';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Verify from './pages/Verify';
import Login from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = ({ children, isAuthenticated }: { children?: React.ReactNode, isAuthenticated: boolean }) => {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Check Status', path: '/verify' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="font-cinzel text-2xl font-black text-gold glow-text-gold tracking-widest px-2 py-1">
              ELIXIR'26
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive(item.path) ? 'text-gold' : 'text-gray-300 hover:text-gold'
                  } px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/register"
                className="bg-gold hover:bg-amber-500 text-black px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 glow-gold shadow-lg shadow-gold/20"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-gold p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-gold/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium border-b border-white/5 ${
                  isActive(item.path) ? 'text-gold bg-gold/5' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-6 bg-gold text-black px-3 py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-transparent border-t border-gold/10 pt-16 pb-8 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h2 className="font-cinzel text-3xl font-bold text-gold glow-text-gold tracking-widest">ELIXIR'26</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Organized by Department of EEE, Government College of Engineering, Erode. The premier technical symposium celebrating engineering excellence.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com/gce_elixir" target="_blank" className="p-2 bg-gray-900 rounded-full hover:bg-gold hover:text-black transition-colors">
              <Instagram size={20} />
            </a>
            <a href="mailto:gceelixir26@gmail.com" className="p-2 bg-gray-900 rounded-full hover:bg-gold hover:text-black transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-gold font-bold mb-6 flex items-center gap-2">
            <ChevronRight size={18} /> Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/events" className="hover:text-gold transition-colors">Events</Link></li>
            <li><Link to="/verify" className="hover:text-gold transition-colors">Check Status</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold font-bold mb-6 flex items-center gap-2">
            <LayoutDashboard size={18} /> Admin Panel
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/admin" className="hover:text-gold transition-colors">Participants Manager</Link></li>
            <li><Link to="/login" className="hover:text-gold transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold font-bold mb-6 flex items-center gap-2">
            <MapPin size={18} /> Reach Us
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Government College of Engineering, Erode<br />
            Chithode, Erode - 638316<br />
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gold">
              <Phone size={16} /> +91 81225 78554
            </div>
            <div className="flex items-center gap-2 text-sm text-gold">
              <Mail size={16} /> gceelixir26@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} ELIXIR'26 EEE - GCE Erode. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('elixir_admin_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('elixir_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('elixir_admin_auth');
  };

  const fetchRegistrations = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) {
        console.error('Supabase fetch error:', error);
        setFetchError(error.message);
        throw error;
      }
      
      if (data) {
        setRegistrations(data);
      }
    } catch (err: any) {
      console.error('Error fetching registrations:', err);
      setFetchError(err.message || "Unknown error occurred while connecting to Supabase.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
      
      // Enable Real-time listener
      const channel = supabase.channel('registrations-admin')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, (payload) => {
          console.log('Real-time update received:', payload);
          fetchRegistrations();
        })
        .subscribe((status) => {
          console.log('Real-time subscription status:', status);
        });
        
      return () => { 
        supabase.removeChannel(channel); 
      };
    }
  }, [fetchRegistrations, isAuthenticated]);

  const addRegistration = async (reg: Registration) => {
    const { error } = await supabase.from('registrations').insert([reg]);
    if (error) throw error;
  };

  const updateRegistrationStatus = async (id: string, status: RegistrationStatus) => {
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (error) {
      alert("Failed to update status: " + error.message);
      fetchRegistrations();
      throw error;
    }
    // Update local state for immediate feedback
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, status } : reg));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-14 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/register" element={<Register onSubmit={addRegistration} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Admin Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Admin 
                    registrations={registrations} 
                    onUpdateStatus={updateRegistrationStatus}
                    onRefresh={fetchRegistrations}
                    fetchError={fetchError}
                    isLoading={isLoading}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <Link to="/register" className="fixed bottom-6 right-6 z-40 bg-gold text-black p-4 rounded-full shadow-2xl glow-gold transform transition-transform hover:scale-110">
          <Users size={24} />
        </Link>
      </div>
    </Router>
  );
}
