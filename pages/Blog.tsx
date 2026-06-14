import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';
import { supabase } from '../supabase';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (data) setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm tracking-[0.3em] uppercase mb-4">Latest Insights</h2>
          <h3 className="text-5xl font-cinzel font-bold mb-4">The ELIXIR Blog</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-gold" size={48} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5">
            <BookOpen className="text-gray-700 mx-auto mb-4" size={48} />
            <p className="text-gray-400 font-cinzel text-xl">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.slug}`}
                className="group bg-[#111] rounded-3xl border border-white/10 overflow-hidden flex flex-col hover:border-gold/50 transition-all duration-500"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={blog.image_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                    {blog.category}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-gold" /> {new Date(blog.published_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={12} className="text-gold" /> {blog.author}</span>
                  </div>
                  <h4 className="text-2xl font-cinzel font-bold text-white mb-4 group-hover:text-gold transition-colors">{blog.title}</h4>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;