
import React, { useState } from 'react';
import { Check, X, Zap, Star, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Membership: React.FC = () => {
  const navigate = useNavigate();

  // Her paket için seçili ay çarpanını tutan state
  const [multipliers, setMultipliers] = useState<{ [key: string]: number }>({
    'Eco': 1,
    'Gold Paket': 1,
    'Premium Paket': 1
  });

  const packages = [
    {
      name: 'Standart',
      basePrice: 0,
      isFree: true,
      description: 'Temel özellikler.',
      buttonText: 'Hemen Başla',
      highlight: false,
      features: [
        { label: 'Firma Ekleme', value: '1 Adet', status: true },
        { label: 'Logo Ekleme', value: 'Var', status: true },
        { label: 'Video Ekleme', value: 'Yok', status: false },
        { label: 'Eleman İlanı', value: '5 Adet', status: true },
        { label: 'Resim Ekleme', value: 'Yok', status: false },
        { label: 'Haber Ekleme', value: 'Yok', status: false },
        { label: 'Haritalarda Görünüm', value: 'Var', status: true },
        { label: 'Aramalarda Üst Sıra', value: 'Yok', status: false },
        { label: 'Firma Vitrini', value: 'Yok', status: false },
        { label: 'Teklif Verme', value: 'Yok', status: false },
        { label: 'Hizmet Ekleyebilme', value: 'Yok', status: false },
      ]
    },
    {
      name: 'Eco',
      basePrice: 200,
      isFree: false,
      description: 'Ekonomik çözüm.',
      buttonText: 'Satın Al',
      highlight: false,
      features: [
        { label: 'Firma Ekleme', value: '5 Adet', status: true },
        { label: 'Logo Ekleme', value: 'Var', status: true },
        { label: 'Video Ekleme', value: '3 Adet', status: true },
        { label: 'Eleman İlanı', value: 'Yok', status: false },
        { label: 'Resim Ekleme', value: '5 Adet', status: true },
        { label: 'Haber Ekleme', value: '30 Adet', status: true },
        { label: 'Haritalarda Görünüm', value: 'Var', status: true },
        { label: 'Aramalarda Üst Sıra', value: 'Var', status: true },
        { label: 'Firma Vitrini', value: 'Yok', status: false },
        { label: 'Teklif Verme', value: 'Yok', status: false },
        { label: 'Hizmet Ekleyebilme', value: 'Var', status: true },
      ]
    },
    {
      name: 'Gold Paket',
      basePrice: 399,
      isFree: false,
      description: 'Hızlı büyüme.',
      buttonText: 'Satın Al',
      highlight: true, 
      features: [
        { label: 'Firma Ekleme', value: '5 Adet', status: true },
        { label: 'Logo Ekleme', value: 'Var', status: true },
        { label: 'Video Ekleme', value: '10 Adet', status: true },
        { label: 'Eleman İlanı', value: '100 Adet', status: true },
        { label: 'Resim Ekleme', value: '10 Adet', status: true },
        { label: 'Haber Ekleme', value: '100 Adet', status: true },
        { label: 'Haritalarda Görünüm', value: 'Var', status: true },
        { label: 'Aramalarda Üst Sıra', value: 'Var', status: true },
        { label: 'Firma Vitrini', value: 'Var', status: true },
        { label: 'Teklif Verme', value: 'Var', status: true },
        { label: 'Hizmet Ekleyebilme', value: 'Var', status: true },
      ]
    },
    {
      name: 'Premium Paket',
      basePrice: 499,
      isFree: false,
      description: 'Sınırsız erişim.',
      buttonText: 'Satın Al',
      highlight: true,
      features: [
        { label: 'Firma Ekleme', value: '5 Adet', status: true },
        { label: 'Logo Ekleme', value: 'Var', status: true },
        { label: 'Video Ekleme', value: '3 Adet', status: true },
        { label: 'Eleman İlanı', value: '100 Adet', status: true },
        { label: 'Resim Ekleme', value: '30 Adet', status: true },
        { label: 'Haber Ekleme', value: '5 Adet', status: true },
        { label: 'Haritalarda Görünüm', value: 'Var', status: true },
        { label: 'Aramalarda Üst Sıra', value: 'Var', status: true },
        { label: 'Firma Vitrini', value: 'Var', status: true },
        { label: 'Teklif Verme', value: 'Var', status: true },
        { label: 'Hizmet Ekleyebilme', value: 'Var', status: true },
      ]
    }
  ];

  const handleMultiplierChange = (pkgName: string, value: string) => {
    setMultipliers(prev => ({
        ...prev,
        [pkgName]: parseInt(value)
    }));
  };

  const getCardStyle = (pkgName: string) => {
    if (pkgName.includes('Gold')) {
      return {
        container: 'border-amber-400 ring-1 ring-amber-400/20 shadow-amber-500/5',
        title: 'text-amber-500',
        button: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100',
        badge: 'bg-amber-100 text-amber-700',
        badgeText: 'Çok Satan'
      };
    }
    if (pkgName.includes('Premium')) {
      return {
        container: 'border-red-600 ring-1 ring-red-600/20 shadow-red-500/5',
        title: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-100',
        badge: 'bg-red-100 text-red-600',
        badgeText: 'Önerilen'
      };
    }
    return {
      container: 'border-slate-100 shadow-slate-200/30',
      title: 'text-slate-900',
      button: 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100',
      badge: 'bg-slate-100 text-slate-600',
      badgeText: ''
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="bg-slate-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-red-500 font-black tracking-widest uppercase text-[10px] mb-2 block">Kurumsal Üyelik</span>
          <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">İşinize En Uygun Paketi Seçin</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed font-medium">
            İstanbul'un en büyük altyapı ekosisteminde yerinizi alın, ağınızı genişletin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1200px] mx-auto">
          {packages.map((pkg, index) => {
            const style = getCardStyle(pkg.name);
            const multiplier = multipliers[pkg.name] || 1;
            const totalPrice = pkg.basePrice * multiplier;
            
            return (
              <div 
                key={index} 
                className={`bg-white rounded-3xl shadow-lg flex flex-col transition-all duration-300 hover:-translate-y-1.5 border ${style.container}`}
              >
                {/* Header Section */}
                <div className="p-6 pb-4">
                   <div className="flex justify-between items-start mb-3 h-5">
                      {pkg.highlight && (
                        <span className={`${style.badge} text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest`}>
                           {style.badgeText}
                        </span>
                      )}
                   </div>
                   
                   <div className="mb-4">
                      <h3 className={`text-xl font-black tracking-tight ${style.title}`}>{pkg.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-bold">{pkg.description}</p>
                   </div>
                   
                   <div className="flex items-baseline gap-1 mb-5 min-h-[40px]">
                      <span className="text-3xl font-black text-slate-900">
                        {pkg.isFree ? 'Ücretsiz' : `${totalPrice.toLocaleString('tr-TR')}₺`}
                      </span>
                      {!pkg.isFree && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            / {multiplier > 1 ? `${multiplier} Ay` : 'Aylık'}
                        </span>
                      )}
                   </div>
  
                   {/* Süre Seçimi */}
                   {!pkg.isFree ? (
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                            <Clock size={10} /> Üyelik Süresi
                        </label>
                        <select 
                            value={multiplier}
                            onChange={(e) => handleMultiplierChange(pkg.name, e.target.value)}
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none text-slate-900 font-black cursor-pointer focus:border-red-600 transition-all"
                        >
                            <option value="1">1 Aylık</option>
                            <option value="3">3 Aylık</option>
                            <option value="6">6 Aylık</option>
                            <option value="12">12 Aylık</option>
                        </select>
                      </div>
                   ) : (
                      <div className="h-[62px]"></div> /* Standart paket boşluk dengeleme */
                   )}
                </div>
  
                <div className="w-full h-px bg-slate-50"></div>

                {/* Features Section */}
                <div className="px-6 py-5 flex-1 space-y-3">
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">İçerik</div>
                   {pkg.features.map((feature, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] group">
                         <span className="text-slate-500 font-bold">{feature.label}</span>
                         <div className="flex items-center gap-1.5">
                            <span className={`font-black ${feature.status ? 'text-slate-800' : 'text-slate-300'}`}>
                               {feature.value}
                            </span>
                            {feature.status ? (
                               <Check size={14} className="text-green-500 flex-shrink-0" strokeWidth={4} />
                            ) : (
                               <X size={14} className="text-slate-200 flex-shrink-0" />
                            )}
                         </div>
                      </div>
                   ))}
                </div>
  
                {/* Button Section */}
                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => navigate('/login')}
                    className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-[1.02] active:scale-95 ${style.button}`}
                  >
                    {pkg.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-105 shadow-sm">
              <Zap size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">Hızlı Etkileşim</h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">Taleplere anında teklif verin, müşterilere saniyeler içinde ulaşın.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-105 shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">Onaylı Profil</h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">Güvenli ticaret sertifikası ile müşterilerinizin güvenini kazanın.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-105 shadow-sm">
              <Star size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">Vitrinde Görünün</h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">Arama sonuçlarında rakiplerinizin önüne geçerek görünürlüğü katlayın.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
