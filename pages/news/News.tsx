
import React from 'react';
import { MOCK_NEWS } from '../../utils/constants';
import { Calendar, ChevronRight, Share2, Tag, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const News: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white pt-[118px] pb-12 mb-12">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                 <Newspaper size={24} className="text-red-500" />
              </div>
              <h1 className="text-3xl font-bold">Sektörel Haberler</h1>
           </div>
          <p className="text-slate-400 max-w-2xl text-lg">İstanbul altyapı, enerji ve inşaat sektöründen en güncel gelişmeler ve duyurular.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main News Feed */}
            <div className="w-full lg:w-2/3 space-y-6">
               {MOCK_NEWS.map(item => (
                  <div key={item.id} onClick={() => navigate(`/news/${item.id}`)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-red-200 transition-all group flex flex-col md:flex-row gap-6 cursor-pointer">
                     {item.imageUrl && (
                        <div className="w-full md:w-48 h-32 md:h-auto rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                           <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                     )}
                     <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs mb-2">
                           <span className={`px-2 py-1 rounded font-bold ${
                              item.tag === 'Belediye' ? 'bg-blue-50 text-blue-600' :
                              item.tag === 'Ekonomi' ? 'bg-green-50 text-green-600' :
                              item.tag === 'Duyuru' ? 'bg-amber-50 text-amber-600' :
                              'bg-slate-100 text-slate-600'
                           }`}>
                              {item.tag}
                           </span>
                           <span className="text-slate-400 flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                           {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.summary}</p>
                        
                        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
                           <span className="text-xs font-bold text-slate-400">Kaynak: {item.source}</span>
                           <div className="flex gap-4">
                              <button onClick={(e) => {e.stopPropagation()}} className="text-slate-400 hover:text-slate-600"><Share2 size={16}/></button>
                              <button className="text-red-600 font-bold text-sm flex items-center gap-1 hover:underline">
                                 Oku <ChevronRight size={16} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8">
               
               {/* Categories */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Tag size={18}/> Kategoriler</h4>
                  <div className="flex flex-wrap gap-2">
                     {['Tümü', 'Belediye', 'Ekonomi', 'Sektör', 'Duyuru', 'Yatırım', 'Teknoloji'].map(tag => (
                        <button key={tag} className="px-3 py-1.5 rounded-lg text-sm bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-colors">
                           {tag}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Newsletter */}
               <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                   <h4 className="font-bold text-lg mb-2 relative z-10">Bültene Abone Ol</h4>
                   <p className="text-slate-400 text-sm mb-4 relative z-10">Sektördeki önemli gelişmeleri kaçırmamak için e-bültenimize kayıt olun.</p>
                   <div className="flex gap-2 relative z-10">
                      <input type="email" placeholder="E-posta adresi" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none text-white placeholder-slate-500 focus:bg-white/20" />
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg font-bold text-sm transition-colors">
                         Kayıt
                      </button>
                   </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default News;
