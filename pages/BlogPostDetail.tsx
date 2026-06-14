import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader2, Share2, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { supabase } from '../supabase';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <Loader2 className="animate-spin text-gold" size={48} />
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A]">
      <h2 className="text-4xl font-cinzel text-white mb-4">Article Not Found</h2>
      <Link to="/blog" className="text-gold flex items-center gap-2 font-bold"><ArrowLeft size={18}/> Back to Blog</Link>
    </div>
  );

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-10 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold border border-gold/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {blog.category}
            </span>
            <div className="h-px flex-grow bg-white/10"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-cinzel font-black text-white mb-8 leading-tight glow-text-gold">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Author</p>
                <p className="text-white text-sm font-bold">{blog.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Published</p>
                <p className="text-white text-sm font-bold">{new Date(blog.published_at).toLocaleDateString()}</p>
              </div>
            </div>
            <button className="ml-auto p-3 bg-white/5 rounded-full hover:bg-gold/10 hover:text-gold transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 border border-white/10 shadow-2xl">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <article className="prose prose-invert prose-gold max-w-none mb-20">
          <div className="text-gray-300 text-lg leading-relaxed space-y-8 whitespace-pre-wrap font-inter">
            {blog.content}
          </div>
        </article>

        <footer className="pt-12 border-t border-white/5">
          <div className="flex items-center gap-2 mb-8">
            <Tag size={16} className="text-gold" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Tagged in: {blog.category}, Symposium, EEE</span>
          </div>
          <div className="bg-[#111] p-10 rounded-3xl border border-white/5 text-center">
            <h4 className="text-2xl font-cinzel font-bold text-white mb-4">Want more insights?</h4>
            <p className="text-gray-400 mb-8">Join ELIXIR'26 and witness technical innovation firsthand.</p>
            <Link to="/register" className="bg-gold text-black px-10 py-4 rounded-full font-bold hover:bg-amber-500 transition-all glow-gold">
              Register for Event
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostDetail;