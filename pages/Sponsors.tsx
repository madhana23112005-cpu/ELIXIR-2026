
import React from 'react';
import { SPONSORS } from '../constants';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const Sponsors: React.FC = () => {
  const tiers = ['Title', 'Gold', 'Silver', 'Bronze'];

  return (
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Corporate Partners</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4">Sponsors</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        {tiers.map(tier => {
          const tierSponsors = SPONSORS.filter(s => s.tier === tier);
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier} className="mb-24">
              <div className="flex items-center gap-4 mb-10">
                <h4 className="text-2xl font-cinzel font-bold text-gold tracking-widest uppercase">{tier} Sponsors</h4>
                <div className="flex-grow h-px bg-white/10"></div>
              </div>
              <div className={`grid gap-8 ${
                tier === 'Title' ? 'grid-cols-1 md:grid-cols-2' : 
                tier === 'Gold' ? 'grid-cols-2 md:grid-cols-3' : 
                'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              }`}>
                {tierSponsors.map(sponsor => (
                  <div key={sponsor.id} className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-gold/40 transition-all flex flex-col items-center justify-center group">
                    <div className="h-24 md:h-32 w-full flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all">
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-gray-400 font-bold tracking-wider group-hover:text-gold transition-colors">{sponsor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-gradient-to-br from-amber-900/10 to-[#111] p-12 rounded-[3rem] border border-gold/10 text-center">
          <h4 className="text-3xl font-cinzel font-bold mb-6">Partner With Us</h4>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Gain brand visibility among 2000+ elite engineering students. Contact our marketing team to explore custom sponsorship tiers for ELIXIR'26.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:gceelixir26@gmail.com" className="flex items-center gap-3 bg-gold text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 transition-all">
              <Mail size={20} /> Email Sponsorship Desk
            </a>
            <a href="tel:+918122578554" className="flex items-center gap-3 bg-white/5 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              <Phone size={20} /> +91 81225 78554
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
