
import React from 'react';
import { SCHEDULE } from '../constants';
import { MapPin, ArrowRight } from 'lucide-react';

const Schedule: React.FC = () => {
  return (
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Event Roadmap</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4">Timeline</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

          <div className="space-y-12">
            {SCHEDULE.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gold glow-gold -translate-x-1/2 z-10 border-4 border-[#0A0A0A]"></div>
                
                {/* Time */}
                <div className="w-full md:w-1/2 flex justify-start md:justify-center">
                  <div className={`text-2xl font-cinzel font-bold text-gold glow-text-gold ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 text-right'}`}>
                    {item.time}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className={`bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">{item.type}</span>
                    </div>
                    <h4 className="text-xl font-cinzel font-bold text-white mb-3">{item.activity}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin size={14} className="text-gold" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
