
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trophy, CheckCircle2, Info, Users, Loader2, User, X, Phone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../supabase';
import { Event, EventCategory } from '../types';
import { EVENTS } from '../constants';

const EventDetailModal: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-[#0D0D0D] w-full max-w-2xl rounded-[2.5rem] border border-gold/20 relative shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-gold transition-colors z-50 p-2">
          <X size={24} />
        </button>
        
        {/* Modal Header/Image */}
        <div className="relative h-44 flex-shrink-0">
          <img src={event.image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-1.5 block">{event.category}</span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-black text-white uppercase tracking-widest leading-tight">{event.title}</h3>
            {event.slogan && (
              <p className="text-gold/60 text-[10px] italic mt-1 font-medium tracking-widest line-clamp-2">"{event.slogan}"</p>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-6 sm:px-8 py-6 custom-scrollbar space-y-10">
          {/* Action Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Registration</p>
              <p className="text-gold font-bold text-xs">₹{event.fee} / head</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Max Team</p>
              <p className="text-white font-bold text-xs flex items-center gap-2 tracking-tighter"><Users size={12} /> {event.maxMembers} Members</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 col-span-2 md:col-span-1">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Prizes</p>
              <p className="text-white font-bold text-xs flex items-center gap-2 truncate"><Trophy size={12} className="text-gold" /> {event.prize}</p>
            </div>
          </div>

          {/* About Section */}
          <section>
            <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2 border-l-2 border-gold pl-3">
               Description
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed antialiased">{event.description}</p>
          </section>

          {/* Rounds Section */}
          {event.rounds && event.rounds.length > 0 && (
            <section>
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2 border-l-2 border-gold pl-3">
                 Event Rounds
              </h4>
              <div className="space-y-4">
                {event.rounds.map((round, i) => (
                  <div key={i} className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 group hover:border-gold/20 transition-all">
                    <h5 className="text-gold font-black text-[10px] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2">
                       <Zap size={12} /> {round.name}
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{round.details}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Rules Section */}
          <section>
            <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2 border-l-2 border-gold pl-3">
               {event.category === EventCategory.NON_TECHNICAL ? 'Rules for Play' : 'Instructions & Guidelines'}
            </h4>
            <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/5">
              <ul className="space-y-4">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/40 flex-shrink-0"></div>
                    <span className="text-gray-400 text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Coordinators Section */}
          {event.coordinators && (
            <section className="pb-4">
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2 border-l-2 border-gold pl-3">
                For Queries
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-gold/30 transition-all">
                    <div className="flex-grow pr-4">
                      <p className="text-white font-bold text-xs uppercase group-hover:text-gold transition-colors">{c.name}</p>
                      <p className="text-gold/50 text-[10px] font-mono mt-1 group-hover:text-gold transition-colors">{c.phone}</p>
                    </div>
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="p-2.5 bg-gold/5 text-gold/40 rounded-xl hover:bg-gold hover:text-black transition-all flex-shrink-0">
                        <Phone size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Modal Footer / CTA */}
        <div className="p-6 sm:p-8 bg-black/50 border-t border-white/5 rounded-b-[2.5rem] flex-shrink-0">
          <Link 
            to={`/register?eventId=${event.id}`} 
            className="w-full bg-gold text-black py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-amber-500 glow-gold transition-all shadow-xl"
          >
            Register Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fallbackImage = 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from('events').select('*');
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(EVENTS);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents(EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category === filter);

  const categories = ['All', ...Object.values(EventCategory)];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <Loader2 className="animate-spin text-gold" size={48} />
    </div>
  );

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Choose Your Battlefield</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4 uppercase tracking-widest">Symposium Events</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-gold text-black border-gold glow-gold shadow-lg shadow-gold/20' 
                    : 'bg-white/5 text-gray-500 border-white/10 hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-cinzel">No events are currently available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="group bg-[#111] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-gold/50 transition-all duration-500 shadow-2xl relative">
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <img 
                    src={event.image || fallbackImage} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                  <div className="absolute top-6 right-6 bg-gold text-black px-4 py-1.5 text-[10px] font-black rounded-full shadow-lg uppercase tracking-widest">₹{event.fee} / Head</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] text-gold font-black uppercase tracking-[0.2em]">{event.category}</span>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users size={12} />
                      <span className="text-[10px] font-bold uppercase">Max {event.maxMembers}</span>
                    </div>
                  </div>

                  <h4 className="text-2xl font-cinzel font-black text-white mb-4 group-hover:text-gold transition-colors uppercase tracking-widest leading-tight">{event.title}</h4>
                  <p className="text-gray-400 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest hover:bg-white/10"
                    >
                      {event.category === EventCategory.NON_TECHNICAL ? 'Rules for Play' : 'Instructions'}
                    </button>
                    <Link 
                      to={`/register?eventId=${event.id}`} 
                      className="bg-gold text-black py-4 rounded-xl font-black transition-all text-center text-[10px] uppercase tracking-widest hover:bg-amber-500 glow-gold"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
