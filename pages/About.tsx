
import React from 'react';
import { Shield, Target, Users, MapPin, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Legacy of Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 text-white uppercase tracking-widest">Department of EEE</h3>
            <div className="w-20 h-1 bg-gold mb-8"></div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              The Department of Electrical and Electronics Engineering at Government College of Engineering, Erode has been a beacon of technical education since the college's inception. Known for its rigorous academic standards and focus on practical engineering solutions, the department produces engineers who lead in power systems, electronics, and sustainable energy.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              ELIXIR'26 is our flagship annual technical symposium, a platform where students from across the country converge to showcase innovation, compete in high-stakes technical arenas, and learn from the best in the industry.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold z-0"></div>
            <img 
              src="https://drive.google.com/thumbnail?id=13_YHLKtKakHsHGpOVNBaY7-15uQpzYSm&sz=w1000" 
              alt="GCE Erode EEE Department" 
              className="rounded-2xl shadow-2xl relative z-10 border border-white/10 w-full h-auto object-cover aspect-video lg:aspect-square"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('uc?id=')) {
                   target.src = "https://drive.google.com/uc?id=13_YHLKtKakHsHGpOVNBaY7-15uQpzYSm";
                }
              }}
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold z-0"></div>
          </div>
        </div>

        {/* Stats/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-[#111] p-10 rounded-2xl border border-white/5 text-center">
            <Target className="text-gold mx-auto mb-6" size={40} />
            <h4 className="text-2xl font-cinzel font-bold mb-4 text-white uppercase tracking-wider">Our Mission</h4>
            <p className="text-gray-400">To foster innovation and technical proficiency among engineering aspirants through challenging competitions and knowledge sharing.</p>
          </div>
          <div className="bg-[#111] p-10 rounded-2xl border border-white/5 text-center">
            <Shield className="text-gold mx-auto mb-6" size={40} />
            <h4 className="text-2xl font-cinzel font-bold mb-4 text-white uppercase tracking-wider">Our Vision</h4>
            <p className="text-gray-400">To be the most prestigious technical festival in the region, bridging the gap between academic learning and industry demands.</p>
          </div>
          <div className="bg-[#111] p-10 rounded-2xl border border-white/5 text-center">
            <Users className="text-gold mx-auto mb-6" size={40} />
            <h4 className="text-2xl font-cinzel font-bold mb-4 text-white uppercase tracking-wider">Our Community</h4>
            <p className="text-gray-400">Joining hands with 50+ colleges and industry partners to create a vibrant ecosystem for the next generation of engineers.</p>
          </div>
        </div>

        {/* Venue Information */}
        <div className="bg-[#111] rounded-[2rem] p-10 md:p-14 border border-white/5 max-w-4xl mx-auto shadow-2xl">
          <div className="space-y-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-10 tracking-wide uppercase font-cinzel">
                ELIXIR'26 will be held at:
              </h3>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="mt-1 flex-shrink-0">
                    <MapPin className="text-gold" size={24} />
                  </div>
                  <div className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                    Department of Electrical and Electronics Engineering,<br />
                    Government College of Engineering, Erode – 638316
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="mt-1 flex-shrink-0">
                    <Clock size={24} className="text-gold" />
                  </div>
                  <div className="text-gray-400 text-lg md:text-xl font-medium">
                    February 20, 2026, 08:30 AM onwards
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Government+College+of+Engineering+Erode" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gold text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-500 transition-all shadow-lg glow-gold uppercase tracking-widest"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-inner h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.665798485202!2d77.671343715335!3d11.431257491879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba915d3f3f5a6e1%3A0x6b803023e98c9195!2sGovernment%20College%20of%20Engineering%2C%20Erode!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
