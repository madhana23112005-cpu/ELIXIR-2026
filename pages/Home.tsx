
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Trophy, Zap, Mic2, ShieldCheck, QrCode, Scroll, Utensils, Info, Smartphone, Code2 } from 'lucide-react';
import { SYMPOSIUM_DATE } from '../constants';

const ClassicEngineeringAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 15000), 100);
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = '#FFD700';
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = '#FFD700';
            const alpha = (1 - distance / connectionDistance) * 0.15;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      const absDiff = Math.max(0, difference);

      setTimeLeft({
        days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((absDiff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#1a1a1a]/80 border border-white/10 rounded-lg w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center transition-all duration-300 hover:border-gold/40 shadow-2xl backdrop-blur-sm">
        <span className="text-3xl md:text-4xl font-cinzel font-bold text-gold mb-1">
          {value.toString().padStart(2, '0')}
        </span>
        <span className="text-[9px] md:text-[10px] text-gold/60 uppercase tracking-widest font-semibold">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 pt-4 pb-2 z-20">
      <Unit value={timeLeft.days} label="Days" />
      <Unit value={timeLeft.hours} label="Hours" />
      <Unit value={timeLeft.minutes} label="Minutes" />
      <Unit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const Home: React.FC = () => {
  const essentials = [
    { 
      icon: <ShieldCheck className="text-gold" />, 
      title: "ID Card Mandatory", 
      desc: "🪪 College ID card is strictly mandatory for all participants at the venue." 
    },
    { 
      icon: <Smartphone className="text-gold" />, 
      title: "Registration QR Required", 
      desc: "📱 Keep your digital registration QR code ready for quick entry at the reception." 
    },
    { 
      icon: <Scroll className="text-gold" />, 
      title: "Certificates for All", 
      desc: "📜 Hard-copy certificates will be provided to all registered participants." 
    },
    { 
      icon: <Utensils className="text-gold" />, 
      title: "Food & Refreshments", 
      desc: "🍽️ Nutritious lunch will be provided for all registered attendees." 
    }
  ];

  return (
    <div className="overflow-hidden relative bg-[#0A0A0A]">
      <ClassicEngineeringAnimation />

      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gold/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
        <div className="z-10 animate-fade-in-up flex flex-col items-center">
          <div className="mb-2">
            <Star size={36} className="text-gold glow-text-gold" fill="currentColor" />
          </div>
          <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-cinzel font-black tracking-widest text-gold glow-text-gold drop-shadow-2xl">
            ELIXIR'26
          </h1>
          <p className="text-lg md:text-2xl font-cinzel text-white/80 mb-6 tracking-[0.4em] font-medium uppercase italic">
            THE STAGE IS SET
          </p>
          <div className="mb-6 flex items-center justify-center gap-1.5 text-gold font-medium tracking-wide text-sm md:text-base">
            <Calendar size={14} className="text-gold" />
            <span>{new Date(SYMPOSIUM_DATE).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <Countdown targetDate={SYMPOSIUM_DATE} />
          <div className="flex flex-row items-center justify-center gap-4 mt-8">
            <Link to="/register" className="bg-gold text-black px-8 py-3 rounded-full font-bold glow-gold transform hover:-translate-y-0.5 transition-all shadow-xl">Register Now</Link>
            <Link to="/events" className="border border-gold text-gold px-8 py-3 rounded-full font-bold hover:bg-gold/10 transition-all">View Events</Link>
          </div>
        </div>
      </section>

      {/* Essentials Section */}
      <section className="py-24 bg-black/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
              <Info size={16} /> Symposium Protocol
            </h2>
            <h3 className="text-4xl font-cinzel font-bold text-white uppercase tracking-widest">PARTICIPANT ESSENTIALS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {essentials.map((item, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-[2rem] border border-white/5 group hover:border-gold/30 transition-all text-center">
                <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/10 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h4 className="text-lg font-cinzel font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Core Philosophy</h2>
          <h3 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-16 uppercase tracking-[0.2em]">HIGHLIGHTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 group hover:border-gold/30 transition-all shadow-2xl">
              <Zap className="text-gold mx-auto mb-8" size={40} />
              <h4 className="text-2xl font-cinzel font-bold mb-4 text-white">Innovation</h4>
              <p className="text-gray-400">Pioneering technical solutions</p>
            </div>
            <div className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 group hover:border-gold/30 transition-all shadow-2xl">
              <Trophy className="text-gold mx-auto mb-8" size={40} />
              <h4 className="text-2xl font-cinzel font-bold mb-4 text-white">Competitions</h4>
              <p className="text-gray-400">Winning at the highest level</p>
            </div>
            <div className="bg-[#111]/80 backdrop-blur-sm p-10 rounded-2xl border border-white/5 group hover:border-gold/30 transition-all shadow-2xl">
              <Mic2 className="text-gold mx-auto mb-8" size={40} />
              <h4 className="text-2xl font-cinzel font-bold mb-4 text-white">Guest Talks</h4>
              <p className="text-gray-400">Knowledge from the masters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development Team Section */}
      <section className="py-24 bg-black/60 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-12 flex items-center justify-center gap-2">
            <Code2 size={16} /> Architects of the Digital Stage
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <div className="group">
              <h4 className="text-2xl font-cinzel font-black text-white group-hover:text-gold transition-colors tracking-widest uppercase">Madhan A</h4>
              <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Department of EEE</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10 self-center"></div>
            <div className="group">
              <h4 className="text-2xl font-cinzel font-black text-white group-hover:text-gold transition-colors tracking-widest uppercase">Chinnasami M</h4>
              <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Department of EEE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
