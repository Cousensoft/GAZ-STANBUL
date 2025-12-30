
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_BLOG } from '../../utils/constants';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, BookOpen } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const found = MOCK_BLOG.find(b => b.id === id);
    if (found) {
      setPost(found);
    } else {
      // Fallback for demo if ID not found, just show first one
      setPost(MOCK_BLOG[0]);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) return <div className="min-h-screen pt-40 text-center flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20">
      
      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
         <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-bold text-sm transition-colors group"
         >
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-all shadow-sm group-hover:shadow-md">
                <ArrowLeft size={18} />
            </div>
            <span>Geri Dön</span>
         </button>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
         
         {/* Hero Section */}
         <div className="relative h-[400px] md:h-[500px] w-full rounded-[32px] overflow-hidden shadow-2xl mb-12 group">
            <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={post.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Clock size={16}/> 5 dk okuma
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 max-w-4xl">{post.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm font-bold">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                            <User size={20} />
                        </div>
                        <span>Gazistanbul Editör</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    <span className="flex items-center gap-2 text-slate-300"><Calendar size={18}/> {post.date}</span>
                </div>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-12">
             
             {/* Left: Share & Sticky */}
             <div className="hidden lg:flex flex-col gap-6 w-16 sticky top-32 h-fit">
                <button className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all shadow-sm">
                    <Facebook size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all shadow-sm">
                    <Twitter size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all shadow-sm">
                    <Linkedin size={20} />
                </button>
                <div className="w-full h-px bg-slate-200 my-2"></div>
                <button className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all shadow-sm">
                    <Share2 size={20} />
                </button>
             </div>

             {/* Center: Content */}
             <div className="flex-1">
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="lead text-xl text-slate-600 font-medium mb-8 leading-relaxed border-l-4 border-red-500 pl-4">
                        {post.summary}
                    </p>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
                        Cras venenatis euismod malesuada. Nullam ac odio ante. Duis sed diam at lectus egestas ullamcorper. 
                        Quisque volutpat, est eu ultricies accumsan, nunc sem scelerisque mauris, ac interdum ante erat in nisi.
                    </p>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Teknolojinin Getirdiği Yenilikler</h3>
                    <p>
                        Curabitur mattis nulla id ornare sodales. Aliquam erat volutpat. 
                        Integer a metus sed magna fermentum ultrices. Ut eget urna sit amet ligula interdum facilisis.
                        Sed quis tortor et justo dapibus ullamcorper at a lectus.
                    </p>
                    
                    <figure className="my-10">
                        <img 
                            src="https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1200&auto=format&fit=crop" 
                            className="w-full rounded-2xl shadow-xl" 
                            alt="Detail View"
                        />
                        <figcaption className="text-center text-sm text-slate-500 mt-2 italic">Modern altyapı sistemlerinden bir görünüm.</figcaption>
                    </figure>

                    <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Gelecek Vizyonu</h3>
                    <p>
                        Donec tincidunt, nisl eget aliquet scelerisque, elit metus mollis nunc, 
                        vel cursus ipsum mauris at orci. Fusce eget sem id urna suscipit mattis non a purus.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700 marker:text-red-500">
                        <li>Enerji verimliliği artışı ve sürdürülebilirlik hedefleri.</li>
                        <li>Sürdürülebilir altyapı projeleri ile karbon ayak izini azaltma.</li>
                        <li>Akıllı şehir entegrasyonları ve IoT çözümleri.</li>
                    </ul>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen size={18}/> İlgili Etiketler</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Teknoloji', 'İstanbul', 'Altyapı', 'Enerji', 'Gelecek', 'İnovasyon'].map(tag => (
                            <span key={tag} className="bg-slate-50 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 cursor-pointer transition-all">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
             </div>

             {/* Right: Sidebar */}
             <div className="hidden xl:block w-80 space-y-8">
                {/* Recommend Widget */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Bunları da Okuyun</h4>
                    <div className="space-y-4">
                        {MOCK_BLOG.filter(b => b.id !== post.id).slice(0, 3).map(b => (
                            <div key={b.id} onClick={() => navigate(`/blog/${b.id}`)} className="group cursor-pointer">
                                <div className="h-32 rounded-xl overflow-hidden mb-2 relative">
                                    <img src={b.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={b.title} />
                                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-slate-900">{b.category}</span>
                                </div>
                                <h5 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-red-600 transition-colors">{b.title}</h5>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[50px] opacity-20 pointer-events-none"></div>
                    <h4 className="text-lg font-bold mb-2 relative z-10">Bültene Katılın</h4>
                    <p className="text-slate-400 text-xs mb-4 relative z-10">Sektörel gelişmelerden ve yeni makalelerden ilk siz haberdar olun.</p>
                    <div className="flex flex-col gap-2 relative z-10">
                        <input type="email" placeholder="E-posta adresiniz" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:bg-white/20" />
                        <button className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Abone Ol
                        </button>
                    </div>
                </div>
             </div>

         </div>
      </div>
    </div>
  );
};

export default BlogPost;
