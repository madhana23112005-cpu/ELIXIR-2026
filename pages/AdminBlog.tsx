import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen, Check, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '../types';
import { supabase } from '../supabase';

const AdminBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'ELIXIR Team',
    category: 'Technical',
    image_url: ''
  });

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = currentBlog.slug || currentBlog.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const blogData = {
      ...currentBlog,
      slug,
      published_at: currentBlog.id ? currentBlog.published_at : new Date().toISOString()
    };

    if (currentBlog.id) {
      const { error } = await supabase.from('blogs').update(blogData).eq('id', currentBlog.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('blogs').insert([blogData]);
      if (error) alert(error.message);
    }

    setIsEditing(false);
    setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', author: 'ELIXIR Team', category: 'Technical', image_url: '' });
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await supabase.from('blogs').delete().eq('id', id);
      fetchBlogs();
    }
  };

  const startEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/10 rounded-xl text-gold">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-cinzel font-bold">Manage Blogs</h2>
              <p className="text-gray-500">Publish and edit technical insights</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsEditing(!isEditing);
              setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', author: 'ELIXIR Team', category: 'Technical', image_url: '' });
            }}
            className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg glow-gold"
          >
            {isEditing ? <X size={20} /> : <Plus size={20} />}
            {isEditing ? 'Cancel Edit' : 'New Article'}
          </button>
        </div>

        {isEditing && (
          <div className="bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-gold/30 mb-12 animate-in slide-in-from-top-4 duration-500">
            <h3 className="text-2xl font-cinzel font-bold text-white mb-8">
              {currentBlog.id ? 'Edit Article' : 'Compose New Insight'}
            </h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                  <input 
                    required
                    value={currentBlog.title}
                    onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})}
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <select 
                    value={currentBlog.category}
                    onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Community">Community</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Excerpt (Brief Summary)</label>
                <textarea 
                  required
                  rows={2}
                  value={currentBlog.excerpt}
                  onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Feature Image URL</label>
                <div className="flex gap-2">
                   <div className="flex-grow relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        value={currentBlog.image_url}
                        onChange={e => setCurrentBlog({...currentBlog, image_url: e.target.value})}
                        type="url" 
                        placeholder="https://..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-gold outline-none" 
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Content (Markdown Supported)</label>
                <textarea 
                  required
                  rows={10}
                  value={currentBlog.content}
                  onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none resize-none"
                  placeholder="Tell your story..."
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-all glow-gold disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                {currentBlog.id ? 'Update Article' : 'Publish Insight'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden">
          {loading && !isEditing ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={48} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 border-b border-white/10">
                    <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Article</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={blog.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-white mb-1">{blog.title}</p>
                            <p className="text-xs text-gray-500">{new Date(blog.published_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Published</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => startEdit(blog)}
                            className="p-2 bg-white/5 text-gray-400 rounded-lg hover:bg-gold/10 hover:text-gold transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id!)}
                            className="p-2 bg-white/5 text-gray-400 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {blogs.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center text-gray-500 italic">No articles found. Start publishing!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;