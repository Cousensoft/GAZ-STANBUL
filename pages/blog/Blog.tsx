
import React from 'react';
import { MOCK_BLOG } from '../../utils/constants';
import { Calendar, ArrowRight, BookOpen, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white pt-[118px] pb-12 mb-12">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4">
             <BookOpen size={24} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Gazistanbul Blog</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Uzman tavsiyeleri, teknik rehberler ve yaşam alanınız için ipuçları.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
           {MOCK_BLOG.map(post => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-slate-100 cursor-pointer"
              >
                 <div className="h-56 overflow-hidden relative">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-slate-900 uppercase shadow-sm">
                       {post.category}
                    </span>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center text-slate-400 text-xs mb-3 gap-2 font-medium">
                       <Calendar size={14} className="text-red-500" />
                       {post.date}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors leading-snug">{post.title}</h2>
                    <p className="text-slate-500 mb-6 text-sm line-clamp-3 leading-relaxed">{post.summary}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                       <span className="inline-flex items-center text-slate-900 font-bold text-sm group-hover:text-red-600 transition-colors">
                          Makaleyi Oku <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                       </span>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* Writer CTA Section */}
        <div className="rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl animate-fade-in-up group">
            
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" 
                    alt="Blog Writer" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Red Overlay - Opacity Reduced */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-600/60 backdrop-blur-[1px]"></div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 shadow-lg">
                        <PenTool size={14} /> İçerik Üreticisi Olun
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight drop-shadow-md">
                        Gazistanbul'da <br/> Blog Yazarı Olmak İster misiniz?
                    </h2>
                    <p className="text-white text-lg leading-relaxed font-medium drop-shadow-sm">
                        Sektörel bilgi birikiminizi paylaşın, binlerce kişiye ulaşın. Teknik yazılar, rehberler ve analizlerinizle topluluğumuza değer katın.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <button 
                        onClick={() => navigate('/contact')} 
                        className="bg-white text-red-700 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group/btn"
                    >
                        Başvuru Yap <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;
