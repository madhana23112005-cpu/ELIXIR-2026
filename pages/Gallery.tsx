
import React from 'react';
import { Camera, Maximize2, Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  // Collection of symposium moments and official media
  const images = [
    {
      id: 1,
      url: 'https://drive.google.com/uc?export=view&id=1pTzLRF9VGa-gnrNbQRTBBb728PwBqYTL',
      category: 'Official Poster',
      title: 'ELIXIR\'26: Main Event at its Core',
      featured: true
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      category: 'Highlights',
      title: 'Technical Presentation'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      category: 'Innovation',
      title: 'Project Display'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
      category: 'Hardware',
      title: 'Circuit Design'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
      category: 'Workshop',
      title: 'Collaborative Learning'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      category: 'Competitions',
      title: 'Tech Hunt Trials'
    }
  ];

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Visual Legacy</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4 flex items-center justify-center gap-4">
            <Camera className="text-gold" /> Photo Gallery
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm uppercase tracking-widest font-medium">
            Capturing the sparks of innovation and the spirit of competition
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-2">
          {images.map(img => (
            <div 
              key={img.id} 
              className={`relative group overflow-hidden rounded-[2rem] border transition-all duration-700 break-inside-avoid shadow-2xl bg-[#111] ${
                img.featured ? 'border-gold/40 shadow-gold/5' : 'border-white/5 hover:border-gold/30'
              }`}
            >
              {img.featured && (
                <div className="absolute top-6 right-6 z-20 bg-gold text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 glow-gold">
                  <Sparkles size={10} /> Featured Media
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-all duration-1000 transform group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800`;
                  }}
                />
                
                {/* Interaction Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block bg-gold text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg mb-3">
                      {img.category}
                    </span>
                    <h4 className="text-white font-cinzel font-bold text-2xl drop-shadow-2xl tracking-wide">{img.title}</h4>
                    <div className="mt-4 flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest opacity-60">
                      <Maximize2 size={12} /> View Full Dimension
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <div className="inline-block p-10 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <p className="relative z-10 text-gray-400 text-sm max-w-xl mx-auto leading-relaxed italic font-cinzel">
               "Reliving the technical grandeur of past symposiums. Every frame tells a story of an engineer finding their spark."
             </p>
             <div className="mt-8 relative z-10 flex justify-center items-center gap-6">
                <div className="h-px w-12 bg-gold/20"></div>
                <a href="https://instagram.com/gce_elixir" target="_blank" rel="noopener noreferrer" className="text-gold font-black text-xs uppercase tracking-[0.3em] hover:text-white transition-colors">
                  Follow @gce_elixir
                </a>
                <div className="h-px w-12 bg-gold/20"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
