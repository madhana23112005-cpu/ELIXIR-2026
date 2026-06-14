
import React from 'react';
import { SPEAKERS } from '../constants';
import { Calendar, Building, Info } from 'lucide-react';

const Speakers: React.FC = () => {
  return (
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Elite Visionaries</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4">The Luminaries</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SPEAKERS.map(speaker => (
            <div key={speaker.id} className="relative group bg-[#111] rounded-3xl border border-white/10 overflow-hidden hover:border-gold/40 transition-all duration-500">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="lg:w-3/5 p-8">
                  <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                    <Calendar size={14} /> {speaker.time}
                  </div>
                  <h4 className="text-3xl font-cinzel font-bold text-white mb-2">{speaker.name}</h4>
                  <div className="flex items-center gap-2 text-amber-500 text-sm font-semibold mb-4">
                    <Building size={14} /> {speaker.institution}
                  </div>
                  <p className="text-gray-400 text-sm italic mb-6 leading-relaxed">"{speaker.bio}"</p>
                  
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                      <Info size={12} /> Session Topic
                    </p>
                    <p className="text-gold font-cinzel font-bold tracking-wide">{speaker.topic}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/20 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speakers;
