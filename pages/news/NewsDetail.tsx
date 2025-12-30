
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_NEWS } from '../../utils/constants';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, Tag, Newspaper, X } from 'lucide-react';

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<any>(null);

  useEffect(() => {
    const found = MOCK_NEWS.find(n => n.id === id);
    if (found) {
      setNewsItem(found);
    } else {
      // Fallback or handle not found
      setNewsItem(MOCK_NEWS[0]);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!newsItem) return <div className="min-h-screen pt-40 text-center flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-white pt-[120px] pb-20">
      
      {/* Header / Breadcrumb / Back Button */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
         <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors group mb-6"
         >
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-all shadow-sm group-hover:shadow-md">
                <ArrowLeft size={18} />
            </div>
            <span>Geri Dön</span>
         </button>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
         
         {/* Article Header */}
         <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    newsItem.tag === 'Belediye' ? 'bg-blue-100 text-blue-700' :
                    newsItem.tag === 'Ekonomi' ? 'bg-green-100 text-green-700' :
                    newsItem.tag === 'Duyuru' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                }`}>
                    {newsItem.tag}
                </span>
                <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                    <Calendar size={14}/> {newsItem.date}
                </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                {newsItem.title}
            </h1>
            <div className="flex items-center justify-between border-y border-slate-100 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <Newspaper size={20} className="text-slate-500"/>
                    </div>
                    <div>
                        <span className="block text-sm font-bold text-slate-900">{newsItem.source}</span>
                        <span className="block text-xs text-slate-500">Editör Masası</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter size={18}/></button>
                    <button className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-[#0A66C2] hover:text-white transition-colors"><Linkedin size={18}/></button>
                    <button className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200 transition-colors"><Share2 size={18}/></button>
                </div>
            </div>
         </div>

         {/* Featured Image */}
         {newsItem.imageUrl && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-lg">
                <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-full object-cover" />
            </div>
         )}

         {/* Content Body */}
         <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-3/4">
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="lead text-xl text-slate-600 font-medium mb-8">
                        {newsItem.summary}
                    </p>
                    
                    {/* Mock Content Generation */}
                    <p>
                        İstanbul genelinde yürütülen altyapı çalışmaları hız kesmeden devam ediyor. 
                        Şehrin enerji ihtiyacını karşılamak ve modern bir şebeke sistemi kurmak amacıyla başlatılan projede önemli bir aşama daha kaydedildi.
                        Yetkililer, yapılan yatırımların uzun vadede enerji tasarrufu ve kesintisiz hizmet olarak geri döneceğini belirtiyor.
                    </p>
                    <h3>Yatırım Hedefleri ve Beklentiler</h3>
                    <p>
                        Bu kapsamda hedeflenen ana maddeler şunlardır:
                    </p>
                    <ul>
                        <li>Eski hatların yenilenmesi ve güvenliğin artırılması.</li>
                        <li>Dijital sayaç sistemlerine geçişin hızlandırılması.</li>
                        <li>Olası afet durumlarına karşı dayanıklı altyapı inşası.</li>
                    </ul>
                    <p>
                        Sektör temsilcileri, bu gelişmelerin sadece altyapıyı değil, aynı zamanda inşaat ve teknoloji sektörlerini de canlandıracağını öngörüyor.
                        Özellikle akıllı şehir teknolojilerinin entegrasyonu ile İstanbul, dünya standartlarında bir hizmet ağına kavuşacak.
                    </p>
                    
                    <div className="bg-slate-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Önemli Bilgilendirme</h4>
                        <p className="text-slate-600 text-sm m-0">
                            Çalışma yapılacak bölgelerdeki vatandaşların, planlı kesintiler hakkında belediyenin resmi web sitesinden veya mobil uygulamasından bilgi almaları önemle rica olunur.
                        </p>
                    </div>

                    <p>
                        Gelecek dönemde planlanan projelerle birlikte, karbon ayak izinin azaltılması ve yenilenebilir enerji kaynaklarının şebekeye daha fazla dahil edilmesi hedefleniyor.
                        Gazistanbul olarak süreci yakından takip etmeye ve sizlere en doğru bilgileri aktarmaya devam edeceğiz.
                    </p>
                </div>

                {/* Related Tags */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-900 block mb-3">İlgili Konular:</span>
                    <div className="flex flex-wrap gap-2">
                        {['Altyapı', 'İstanbul', 'Enerji', 'Yatırım', 'Belediye'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-8">
                
                {/* Latest News Widget */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Son Haberler</h3>
                    <div className="space-y-4">
                        {MOCK_NEWS.filter(n => n.id !== newsItem.id).slice(0, 3).map(item => (
                            <div 
                                key={item.id} 
                                onClick={() => navigate(`/news/${item.id}`)}
                                className="group cursor-pointer"
                            >
                                <span className="text-[10px] text-slate-400 font-bold block mb-1">{item.date}</span>
                                <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ad Space / CTA */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center">
                    <h4 className="font-bold text-lg mb-2">İşinizi Büyütün</h4>
                    <p className="text-slate-300 text-xs mb-4">Gazistanbul kurumsal üyeliği ile binlerce müşteriye ulaşın.</p>
                    <button onClick={() => navigate('/register')} className="bg-red-600 text-white w-full py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">
                        Hemen Başvur
                    </button>
                </div>

            </div>

         </div>
      </div>
    </div>
  );
};

export default NewsDetail;
