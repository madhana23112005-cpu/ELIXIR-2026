
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4">Contact Us</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            <h4 className="text-2xl font-cinzel font-bold text-white mb-8">Send Message</h4>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all" placeholder="Event Query" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all resize-none" placeholder="Your query here..."></textarea>
              </div>
              <button className="w-full bg-gold text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-all glow-gold">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h4 className="text-2xl font-cinzel font-bold text-gold mb-8 flex items-center gap-3">
                <MapPin /> Our Location
              </h4>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Department of Electrical and Electronics Engineering<br />
                Government College of Engineering, Erode<br />
                Chithode, Tamil Nadu 638316
              </p>
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <Mail className="text-gold mb-4" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Email Us</p>
                <p className="text-white font-medium">gceelixir26@gmail.com</p>
              </div>
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <Phone className="text-gold mb-4" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Call Us</p>
                <p className="text-white font-medium">+91 81225 78554</p>
              </div>
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <Instagram className="text-gold mb-4" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Social</p>
                <p className="text-white font-medium">@gce_elixir</p>
              </div>
              <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20">
                <MapPin className="text-gold mb-4" size={24} />
                <p className="text-xs text-gold uppercase font-bold mb-1">Department</p>
                <p className="text-white font-medium">EEE Block, GCE Erode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
