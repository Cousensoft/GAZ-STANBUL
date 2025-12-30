import React from 'react';
import { SECTORS, MAIN_CATEGORIES, SUB_CATEGORIES } from '../../utils/constants';
import { Flame, Wrench, Zap, HardHat, ShieldCheck, Home as HomeIcon, Cpu, ArrowRight, ChevronRight, Activity, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sectors: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame size={24} />;
      case 'Wrench': return <Wrench size={24} />;
      case 'Zap': return <Zap size={24} />;
      case 'HardHat': return <HardHat size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'Home': return <HomeIcon size={24} />;
      case 'Cpu': return <Cpu size={24} />;
      default: return <Wrench size={24} />;
    }
  };

  // TASK 22: Sektör Tıklama Yönlendirmesi
  const handleSectorClick = (sectorName: string) => {
    navigate('/companies', { state: { initialSector: sectorName } });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white pt-[118px] pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-sm uppercase tracking-wider">
             <Activity size={16} />
             <span>Hizmet Ağı</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Sektörler ve Hizmetler</h1>
          <p className="text-slate-400 max-w-2xl text-lg">İstanbul'un altyapı ve teknoloji ihtiyaçları için uzmanlaşmış sektör kategorileri.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-2xl font-black text-slate-900">7</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Ana Sektör</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-2xl font-black text-slate-900">150+</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Hizmet Tipi</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-2xl font-black text-slate-900">2.5B</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Onaylı Firma</span>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-2xl font-black text-slate-900">24/7</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Aktif Sistem</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SECTORS.map((sector) => (
            <div 
              key={sector.id} 
              onClick={() => handleSectorClick(sector.name)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 group flex flex-col h-full cursor-pointer"
            >
               <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                     {getIcon(sector.icon)}
                  </div>
                  <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold font-mono group-hover:bg-slate-900 group-hover:text-white transition-colors">
                     #{sector.id.toUpperCase()}
                  </div>
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{sector.name}</h3>
               <p className="text-slate-500 text-sm mb-6 leading-relaxed">{getSectorDescription(sector.id)}</p>
               <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {getSubServices(sector.id).slice(0, 3).map((sub, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">{sub}</span>
                  ))}
                  <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-xs font-medium text-slate-400">+4</span>
               </div>
               <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">İncele <ArrowRight size={16} /></button>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-16">
           <div className="flex items-center gap-3 mb-8">
              <Layers size={24} className="text-red-600"/>
              <h2 className="text-2xl font-bold text-slate-900">Tüm Kategori Ağacı</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MAIN_CATEGORIES.map((main) => (
                 <div key={main.id} className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100"><ChevronRight size={16} className="text-red-500" />{main.name}</h4>
                    <ul className="space-y-2">
                       {SUB_CATEGORIES.filter(sub => sub.mainId === main.id).map(sub => (
                          <li key={sub.id}><a href="#" className="text-sm text-slate-500 hover:text-red-600 transition-colors block py-1">{sub.name}</a></li>
                       ))}
                    </ul>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const getSectorDescription = (id: string) => {
   switch(id) {
      case 'gas': return 'Doğalgaz tesisatı, proje çizimi, kombi montajı ve endüstriyel dönüşüm hizmetleri.';
      case 'mechanical': return 'Sıhhi tesisat, havalandırma, yangın sistemleri ve iklimlendirme çözümleri.';
      case 'electric': return 'Bina elektriği, aydınlatma, pano kurulumu ve enerji altyapı hizmetleri.';
      case 'construction': return 'İnşaat, taahhüt, tadilat, dekorasyon ve kentsel dönüşüm projeleri.';
      case 'security': return 'Güvenlik kameraları, alarm sistemleri ve geçiş kontrol teknolojileri.';
      case 'smart_home': return 'Ev otomasyonu, akıllı kilitler ve uzaktan erişim sistemleri.';
      case 'iot': return 'Nesnelerin interneti, veri analitiği ve sensör tabanlı endüstriyel çözümler.';
      default: return 'Profesyonel teknik hizmetler ve altyapı çözümleri.';
   }
};

const getSubServices = (sectorId: string) => {
  switch(sectorId) {
    case 'gas': return ['Proje Çizimi', 'Kombi Montajı', 'Gaz Açma', 'Endüstriyel'];
    case 'mechanical': return ['Sıhhi Tesisat', 'Havalandırma', 'Yangın', 'VRF Klima'];
    case 'electric': return ['Tesisat', 'Pano', 'Aydınlatma', 'Güç Kaynakları'];
    case 'smart_home': return ['Otomasyon', 'Akıllı Kilit', 'Uzaktan Erişim', 'Enerji'];
    case 'construction': return ['Tadilat', 'Dönüşüm', 'Mantolama', 'İzolasyon'];
    case 'security': return ['Kamera', 'Alarm', 'Geçiş Kontrol', 'Diafon'];
    case 'iot': return ['Sensörler', 'Veri Analitiği', 'Bulut', 'Network'];
    default: return ['Bakım', 'Montaj', 'Danışmanlık', 'Parça'];
  }
};

export default Sectors;