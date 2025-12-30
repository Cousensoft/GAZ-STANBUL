
import React, { useState } from 'react';
import { Search, Flame, Wrench, Zap, HardHat, ShieldCheck, Home as HomeIcon, Cpu, ArrowRight, MapPin, Star, Phone, Heart, ChevronRight, Check, Play, TrendingUp, Users, ShoppingCart, MessageCircle, Clock, Tag, FileText, Calendar, CheckCircle, Globe, ChevronDown, MousePointer2, Settings, UserCheck, Shield, Building2, Layers, Activity, Bird, BarChart3, MousePointerClick, Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SECTORS, DISTRICTS, MOCK_COMPANIES, MOCK_BLOG, MOCK_REQUESTS, MOCK_PRODUCTS, MOCK_SOCIAL } from '../../utils/constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleSearch = () => {
    navigate('/companies');
  };

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

  const HOW_IT_WORKS = [
    {
      icon: <MapPin size={20} />,
      title: "Konumunu Seç",
      desc: "Size en yakın hizmet noktalarını listelemek için bölgenizi belirleyin.",
      color: "red"
    },
    {
      icon: <Search size={20} />,
      title: "Hizmeti Bul",
      desc: "İhtiyacınız olan kategorideki doğrulanmış firmaları inceleyin.",
      color: "slate"
    },
    {
      icon: <MessageCircle size={20} />,
      title: "İletişime Geç",
      desc: "Firmalarla mesajlaşın veya doğrudan arayarak bilgi alın.",
      color: "red"
    },
    {
      icon: <FileText size={20} />,
      title: "Teklif İste",
      desc: "İşiniz için detayları paylaşın, en uygun fiyat tekliflerini toplayın.",
      color: "slate"
    },
    {
      icon: <CheckCircle size={20} />,
      title: "İşi Tamamla",
      desc: "Hizmeti alın, ödemeyi güvenle yapın ve firmayı puanlayın.",
      color: "red"
    }
  ];

  // Random nodes for the city animation
  const cityNodes = [
    { top: '30%', left: '20%', delay: '0s', color: 'bg-red-500' },
    { top: '45%', left: '50%', delay: '1s', color: 'bg-blue-500' },
    { top: '60%', left: '80%', delay: '2s', color: 'bg-amber-500' },
    { top: '25%', left: '70%', delay: '1.5s', color: 'bg-green-500' },
    { top: '70%', left: '30%', delay: '0.5s', color: 'bg-purple-500' },
    { top: '40%', left: '90%', delay: '2.5s', color: 'bg-cyan-500' },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans">
      
      {/* Custom Styles for Animation */}
      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes float-fog {
          0% { transform: translateX(0); opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { transform: translateX(-20%); opacity: 0.2; }
        }
        @keyframes fly-1 {
            0% { left: -5%; top: 30%; transform: scale(0.5) rotate(5deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { left: 105%; top: 15%; transform: scale(0.8) rotate(-5deg); opacity: 0; }
        }
        @keyframes fly-2 {
            0% { left: -5%; top: 50%; transform: scale(0.4) rotate(10deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { left: 105%; top: 35%; transform: scale(0.6) rotate(0deg); opacity: 0; }
        }
        .animate-ken-burns {
          animation: ken-burns 30s ease-in-out infinite;
        }
        .animate-pulse-ring::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: inherit;
          transform: translate(-50%, -50%);
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .animate-fly-1 {
            animation: fly-1 35s linear infinite;
        }
        .animate-fly-2 {
            animation: fly-2 45s linear infinite;
            animation-delay: 15s;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
      `}</style>

      {/* --- HERO SECTION (ANIMATED CITY) --- */}
      <section className="relative w-full h-[850px] md:h-[750px] flex flex-col items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Layer 1: Animated Background Image - ISTANBUL BOSPHORUS */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1605650170417-64b584982181?q=80&w=2535&auto=format&fit=crop" 
            alt="Istanbul Skyline Night" 
            className="w-full h-full object-cover animate-ken-burns opacity-60"
          />
          {/* Dark Overlay Gradient - Navy Blue Tone */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900"></div>
          
          {/* Moving Fog/Mist Overlay */}
          <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cloud.png')] bg-repeat-x opacity-10 blur-3xl animate-[float-fog_60s_linear_infinite]" style={{ backgroundSize: '50%' }}></div>
        </div>

        {/* Layer 2: Animated Seagulls (Martı) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
           <div className="absolute animate-fly-1">
              <Bird className="text-white/40 rotate-12" size={32} strokeWidth={1.5} />
           </div>
           <div className="absolute animate-fly-2">
              <Bird className="text-white/30 -rotate-6" size={24} strokeWidth={1.5} />
           </div>
        </div>

        {/* Layer 3: Infrastructure Nodes (Pulse Effect) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {cityNodes.map((node, i) => (
             <div 
               key={i} 
               className={`absolute w-3 h-3 rounded-full ${node.color} animate-pulse-ring shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
               style={{ top: node.top, left: node.left, animationDelay: node.delay }}
             >
                <div className={`w-full h-full rounded-full ${node.color} animate-ping absolute opacity-75`}></div>
             </div>
          ))}
          {/* Connecting Lines (Simulated via SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 stroke-white/50" style={{ strokeDasharray: '5,5' }}>
             <line x1="20%" y1="30%" x2="50%" y2="45%" strokeWidth="1" />
             <line x1="50%" y1="45%" x2="80%" y2="60%" strokeWidth="1" />
             <line x1="50%" y1="45%" x2="70%" y2="25%" strokeWidth="1" />
             <line x1="30%" y1="70%" x2="50%" y2="45%" strokeWidth="1" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 w-full max-w-5xl mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-white text-xs font-bold tracking-wider uppercase">İstanbul'un Dijital Altyapısı</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            İstanbul'un Enerjisini <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Yönetmeye Başla</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
             Boğaziçi'nden Tarihi Yarımada'ya, İstanbul'un tüm teknik altyapı, doğalgaz ve mekanik hizmetlerine tek noktadan ulaşın.
          </p>

          {/* Search Bar - Glassmorphism Style */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl md:rounded-full p-2 shadow-2xl shadow-black/50 flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-white/10 w-full max-w-4xl mx-auto border border-white/20 relative z-30 transition-all hover:bg-white/15">
            
            {/* Search Input */}
            <div className="flex-1 px-6 py-4 md:py-3 flex items-center gap-3 group">
              <Search className="text-slate-300 group-focus-within:text-white transition-colors" size={20} />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-wider">Ne arıyorsun?</span>
                <input 
                  type="text" 
                  placeholder="Firma, hizmet, ürün..." 
                  className="w-full outline-none text-white placeholder-slate-400 text-sm font-medium bg-transparent"
                />
              </div>
            </div>

            {/* District Select */}
            <div className="flex-1 px-6 py-4 md:py-3 flex items-center gap-3 group">
              <MapPin className="text-slate-300 group-focus-within:text-white transition-colors" size={20} />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-wider">İlçe Seç</span>
                <select 
                  className="w-full outline-none text-white bg-transparent text-sm font-medium cursor-pointer appearance-none [&>option]:text-slate-900"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Tüm İstanbul</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Sector Select */}
            <div className="flex-1 px-6 py-4 md:py-3 flex items-center gap-3 group">
              <Wrench className="text-slate-300 group-focus-within:text-white transition-colors" size={20} />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-wider">Kategori</span>
                <select 
                  className="w-full outline-none text-white bg-transparent text-sm font-medium cursor-pointer appearance-none [&>option]:text-slate-900"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                >
                  <option value="">Tüm Sektörler</option>
                  {SECTORS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="p-2 md:p-1 w-full md:w-auto">
              <button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white rounded-2xl md:rounded-full px-8 py-4 font-bold transition-all shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Ara</span>
                <Search size={18} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* --- HERO STATS SECTION (Updated for Dark Mode) --- */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up opacity-90">
              
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-red-500 shadow-lg shadow-black/20 border border-white/10">
                    <Building2 size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left">
                    <div className="text-3xl font-black text-white leading-none">2.500+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Onaylı Firma</div>
                 </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-blue-400 shadow-lg shadow-black/20 border border-white/10">
                    <Layers size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left">
                    <div className="text-3xl font-black text-white leading-none">39</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">İlçe Hizmet Ağı</div>
                 </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-amber-400 shadow-lg shadow-black/20 border border-white/10">
                    <Activity size={20} strokeWidth={2.5} />
                 </div>
                 <div className="text-left">
                    <div className="text-3xl font-black text-white leading-none">12B+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Tamamlanan İş</div>
                 </div>
              </div>

          </div>

        </div>
        
        {/* Bottom Fade Gradient for Smooth Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20"></div>
      </section>

      {/* --- CATEGORIES STRIP (Background handled by Hero or next section, typically sits on transition) --- */}
      <section className="relative z-30 -mt-20 pb-20 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {SECTORS.map((sector) => (
            <div 
              key={sector.id}
              onClick={() => navigate('/companies')}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:-translate-y-2 group border border-transparent hover:border-red-100"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center transition-colors group-hover:bg-red-600 group-hover:text-white">
                {getIcon(sector.icon)}
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-red-600 text-center px-2">
                {sector.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 1: WHAT WE DO (WHITE) --- */}
      <section className="py-20 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                  alt="Expert Technician" 
                  className="w-full object-cover"
                />
             </div>
             {/* Floating Info Card */}
             <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-slate-100">
                <div className="flex items-center gap-4 mb-3">
                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      <Users size={24} />
                   </div>
                   <div>
                      <span className="block text-2xl font-bold text-slate-900">5.000+</span>
                      <span className="text-xs text-slate-500 font-bold">Mutlu Müşteri</span>
                   </div>
                </div>
                <p className="text-xs text-slate-400">İstanbul genelinde en güvenilir hizmet ağı.</p>
             </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2">
             <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Biz Kimiz?</span>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Şehrin En İyilerini <br/> Keşfedin
             </h2>
             <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Gazistanbul, şehrin karmaşık altyapı ihtiyaçlarını basitleştiren dijital bir köprüdür. 
                Isıtmadan soğutmaya, elektrikten güvenliğe kadar tüm teknik ihtiyaçlarınız için en doğru uzmanı bulmanızı sağlıyoruz.
             </p>
             
             <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                   <CheckCircle className="text-green-500 flex-shrink-0" />
                   <span className="text-slate-700 font-medium">Doğrulanmış Kurumsal Firmalar</span>
                </li>
                <li className="flex items-center gap-3">
                   <CheckCircle className="text-green-500 flex-shrink-0" />
                   <span className="text-slate-700 font-medium">Güvenli Ödeme ve Teklif Sistemi</span>
                </li>
                <li className="flex items-center gap-3">
                   <CheckCircle className="text-green-500 flex-shrink-0" />
                   <span className="text-slate-700 font-medium">7/24 Teknik Destek Ağı</span>
                </li>
             </ul>

             <div className="flex gap-4">
                <button onClick={() => navigate('/companies')} className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                   Hemen Keşfet
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: REQUESTS (GREY) --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Fırsatlar</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Güncel Hizmet Talepleri</h2>
            </div>
            <button onClick={() => navigate('/requests')} className="mt-4 md:mt-0 text-slate-600 hover:text-red-600 font-bold flex items-center gap-2 transition-colors">
               Tüm Talepleri Gör <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {MOCK_REQUESTS.slice(0, 3).map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-red-100 hover:shadow-lg transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                         req.status === 'Acil' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>{req.status}</span>
                      <span className="text-xs text-slate-400">{req.date}</span>
                   </div>
                   <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-red-600 transition-colors">{req.title}</h3>
                   <p className="text-slate-500 text-sm mb-4 line-clamp-2">{req.description}</p>
                   <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin size={14} /> {req.district} • {req.sector}
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FEATURED COMPANIES (WHITE) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Keşfetmeye Başla</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Öne Çıkan Firmalar</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              İstanbul genelinde en yüksek puana sahip, doğrulanmış altyapı ve teknoloji firmaları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_COMPANIES.map((company) => (
              <div key={company.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                {/* Card Image Header */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${company.id}bg/500/350`} 
                    alt={company.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      {company.sector}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-green-200">
                      Açık
                    </span>
                    {company.isVerified && (
                        <div className="flex items-center justify-end bg-green-50 border border-green-200 text-green-600 rounded-full px-2 py-1 transition-all duration-300 w-8 group-hover:w-auto overflow-hidden whitespace-nowrap shadow-sm">
                           <CheckCircle size={16} strokeWidth={2.5} className="flex-shrink-0" />
                           <span className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto transition-all duration-300 ml-0 group-hover:ml-1 text-[10px] font-bold">Onaylı Firma</span>
                        </div>
                    )}
                  </div>
                  <button className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 backdrop-blur hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <Heart size={16} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 relative">
                  {/* Floating Logo */}
                  <div className="absolute -top-8 left-5 w-16 h-16 bg-white rounded-xl p-1 shadow-md border border-slate-100">
                    <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-lg" />
                  </div>

                  <div className="pt-8">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-red-600 transition-colors mb-1 truncate">
                      {company.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                       <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(company.rating) ? "currentColor" : "none"} />
                          ))}
                       </div>
                       <span className="text-xs font-bold text-slate-400">({company.rating})</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                       <MapPin size={16} />
                       <span className="truncate">{company.district}, İstanbul</span>
                    </div>
                    
                    <button 
                       onClick={() => navigate(`/company/${company.id}`, { state: { openBooking: true } })}
                       className="w-full mb-3 py-2 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                       <Calendar size={16} /> Randevu Oluştur
                    </button>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                       <a href={`tel:${company.phone}`} className="text-slate-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 transition-colors">
                          <Phone size={14} /> Hemen Ara
                       </a>
                       <button onClick={() => navigate(`/company/${company.id}`)} className="text-slate-900 hover:text-red-600 text-sm font-bold flex items-center gap-1 transition-colors">
                          İncele <ChevronRight size={14} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <button onClick={() => navigate('/companies')} className="px-8 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 hover:border-red-200 hover:text-red-600 transition-all shadow-sm">
                Tüm Firmaları Görüntüle
             </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: HOW IT WORKS (GREYISH / SLATE-50) --- */}
      <section className="py-24 bg-slate-50 relative overflow-hidden font-sans">
        {/* Subtle Background Pattern - Changed to blend with slate-50 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 opacity-50"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-white/30 skew-y-6 pointer-events-none"></div>

        {/* --- DESKTOP RADIAL LAYOUT --- */}
        <div className="hidden lg:flex relative w-full max-w-[1280px] mx-auto h-[750px] items-center justify-center">
            
            {/* Central Hub (ENLARGED to w-96 h-96) */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-20">
                <div className="w-96 h-96 rounded-full bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] border-[8px] border-slate-50 flex flex-col items-center justify-center text-center p-8 relative z-10 group">
                    {/* Inner 3D Gradient */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-200 opacity-60"></div>
                    
                    {/* Floating Elements inside Hub */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Settings size={40} className="animate-spin-slow" />
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 leading-none mb-2 tracking-tight">NASIL<br/>ÇALIŞIR?</h2>
                      <div className="w-16 h-1.5 bg-red-600 rounded-full mb-3"></div>
                      <p className="text-slate-500 text-base font-medium">Hızlı ve Kolay</p>
                    </div>

                    {/* Outer Glow Ring */}
                    <div className="absolute inset-[-20px] border-2 border-dashed border-red-200 rounded-full animate-spin-slow pointer-events-none opacity-50"></div>
                </div>
            </div>

            {/* The Arc SVG Line (Widened Radius r="350") */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                    {/* 
                       Hub Center is approx at x=340px, y=375px.
                       Radius INCREASED to 350px to spread cards further out.
                    */}
                     <circle cx="340" cy="375" r="350" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="12 12" className="opacity-60" />
                     
                     {/* Decorative dots on the arc track (Recalculated for r=350, spread vertically to 100px-650px) */}
                     <circle cx="556" cy="100" r="6" fill="#ef4444" className="animate-pulse" /> {/* Top */}
                     <circle cx="661" cy="237" r="6" fill="#0f172a" /> {/* Mid-Top */}
                     <circle cx="690" cy="375" r="6" fill="#ef4444" className="animate-pulse" /> {/* Middle */}
                     <circle cx="661" cy="513" r="6" fill="#0f172a" /> {/* Mid-Bot */}
                     <circle cx="556" cy="650" r="6" fill="#ef4444" className="animate-pulse" /> {/* Bot */}
                </svg>
            </div>

            {/* Steps positioned along the arc (Vertical Spread) */}
            {HOW_IT_WORKS.map((item, index) => {
                // Expanded positions matching r=350 and vertical spread 100px-650px
                const positions = [
                  { top: '100px', left: '556px' }, 
                  { top: '237px', left: '661px' }, 
                  { top: '375px', left: '690px' }, 
                  { top: '513px', left: '661px' }, 
                  { top: '650px', left: '556px' }, 
                ];
                
                const pos = positions[index];
                const isRed = item.color === 'red';

                return (
                  <div 
                    key={index}
                    className="absolute z-20 flex items-center group perspective-1000"
                    style={{ top: pos?.top, left: pos?.left, transform: 'translateY(-50%)' }}
                  >
                     {/* Connecting Line/Arrow to the Dot */}
                     <div className="w-8 h-[3px] bg-slate-300 group-hover:bg-red-500 transition-colors duration-300 origin-right"></div>
                     
                     {/* The Card (Slightly smaller: w-[22rem]) */}
                     <div className="relative bg-white p-5 rounded-3xl shadow-xl border border-slate-100 w-[22rem] flex gap-5 items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-100 group-hover:-translate-y-1">
                        
                        {/* Step Number Badge */}
                        <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white shadow-md ${isRed ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                          0{index + 1}
                        </div>

                        {/* Arrow shape on left side of card */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-b border-l border-slate-100 transform rotate-45"></div>

                        {/* Icon Box */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${isRed ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
                           <div className="scale-110">{item.icon}</div>
                        </div>

                        {/* Text */}
                        <div>
                           <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                           <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                     </div>
                  </div>
                );
            })}
        </div>

        {/* --- MOBILE STACK LAYOUT (Visible on smaller screens) --- */}
        <div className="lg:hidden container mx-auto px-4">
           {/* Mobile Hub */}
           <div className="flex justify-center mb-12">
              <div className="w-64 h-64 rounded-full bg-white shadow-xl border-8 border-slate-50 flex flex-col items-center justify-center text-center p-6 relative">
                 <Settings size={32} className="text-red-600 mb-3 animate-spin-slow" />
                 <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">NASIL<br/>ÇALIŞIR?</h2>
                 <p className="text-slate-400 text-xs font-bold">Adım Adım Rehber</p>
              </div>
           </div>

           {/* Mobile Steps */}
           <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-300"></div>

              {HOW_IT_WORKS.map((item, index) => (
                 <div key={index} className="relative flex items-start gap-6 pl-2">
                    {/* Step Number/Dot */}
                    <div className={`relative z-10 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center font-bold text-lg flex-shrink-0 ${item.color === 'red' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                       {index + 1}
                    </div>

                    {/* Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1">
                       <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${item.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
                             {item.icon}
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                       </div>
                       <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- SECTION 5: MARKET (WHITE) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3">
                 <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Market</span>
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">İhtiyacın Olan <br/> Ürünler Burada</h2>
                 <p className="text-slate-500 mb-8">Kombiden akıllı ev sistemlerine, yedek parçadan güvenlik ekipmanlarına kadar binlerce ürün en uygun fiyatlarla.</p>
                 <button onClick={() => navigate('/login', { state: { platform: 'market' } })} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-slate-200">
                    Market'e Git
                 </button>
              </div>
              <div className="w-full md:w-2/3">
                 <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
                    {MOCK_PRODUCTS.map((product) => (
                       <div key={product.id} className="min-w-[260px] bg-slate-50 rounded-2xl p-4 shadow-sm border border-slate-100 snap-center hover:scale-105 transition-transform">
                          <div className="h-40 bg-white rounded-xl mb-4 overflow-hidden">
                             <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-bold text-slate-900 truncate">{product.name}</h4>
                          <span className="text-xs text-slate-500">{product.category}</span>
                          <div className="flex justify-between items-center mt-3">
                             <span className="text-red-600 font-bold">{product.price.toLocaleString('tr-TR')} ₺</span>
                             <button className="p-2 bg-white rounded-lg hover:bg-slate-900 hover:text-white transition-colors border border-slate-100">
                                <ShoppingCart size={16} />
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 6: SOCIAL (GREY) --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-12">
              <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Topluluk</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Sektörün Nabzı</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {MOCK_SOCIAL.map((post) => (
                 <div key={post.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                       <img src={post.avatarUrl} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                       <div>
                          <h4 className="font-bold text-slate-900 text-sm">{post.author}</h4>
                          <span className="text-xs text-slate-400">{post.role} • {post.timeAgo}</span>
                       </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{post.content}</p>
                    <div className="flex gap-4 text-xs text-slate-400 font-bold">
                       <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer"><Heart size={14} /> {post.likes}</span>
                       <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"><MessageCircle size={14} /> {post.shares}</span>
                    </div>
                 </div>
              ))}
           </div>
           <div className="text-center mt-8">
               <button onClick={() => navigate('/social')} className="text-slate-900 font-bold hover:text-red-600 transition-colors flex items-center justify-center gap-2 w-full">
                  Topluluğa Katıl <ArrowRight size={16} />
               </button>
           </div>
        </div>
      </section>

      {/* --- SECTION 7: NEWS / BLOG (WHITE) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Blog</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Son Haberler & Gelişmeler</h2>
            </div>
            <button onClick={() => navigate('/blog')} className="mt-4 md:mt-0 text-slate-600 hover:text-red-600 font-bold flex items-center gap-2 transition-colors">
               Tümünü Oku <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_BLOG.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-slate-900 uppercase">
                    {post.category}
                  </span>
                </div>
                <div>
                   <span className="text-xs text-slate-400 font-bold mb-2 block">{post.date}</span>
                   <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors leading-snug">
                      {post.title}
                   </h3>
                   <p className="text-slate-500 text-sm line-clamp-2">{post.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: NEW PREMIUM CORPORATE CARD (DARK VERSION REVERTED) --- */}
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 md:px-8">
             <div className="relative rounded-[32px] bg-slate-900 overflow-hidden shadow-2xl group isolate border border-slate-800">
                {/* Background Gradients */}
                {/* Enhanced Blue/Indigo Gradient on Bottom-Left */}
                <div className="absolute bottom-0 left-0 -translate-x-10 translate-y-10 w-[600px] h-[600px] bg-blue-600/40 blur-[120px] rounded-full pointer-events-none"></div>
                {/* Subtle Cyan glow on Top-Right (Replacing the red one to maintain depth but strictly cool colors) */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Glass Texture */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-10 md:p-12 items-center">
                
                {/* LEFT: Copy & Value */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-400 text-slate-900 px-3 py-1 text-[10px] rounded-full font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                        <Crown size={12} className="fill-slate-900" /> Premium Üyelik
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                        Şehrin En Prestijli <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">İş Ağına Katılın</span>
                    </h2>
                    
                    <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-md">
                        Sıradan bir listelemenin ötesine geçin. Markanızı elit firmalar arasına taşıyın ve dönüşüm oranlarınızı katlayın.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 my-6">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-white/5 text-amber-500 border border-white/10"><ShieldCheck size={16} /></div>
                            <span className="text-sm font-bold text-slate-300">Onaylı Firma Rozeti</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-white/5 text-amber-500 border border-white/10"><Zap size={16} /></div>
                            <span className="text-sm font-bold text-slate-300">Sınırsız Teklif Hakkı</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-white/5 text-amber-500 border border-white/10"><TrendingUp size={16} /></div>
                            <span className="text-sm font-bold text-slate-300">Öncelikli Listeleme</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-white/5 text-amber-500 border border-white/10"><BarChart3 size={16} /></div>
                            <span className="text-sm font-bold text-slate-300">Detaylı İstatistikler</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button onClick={() => navigate('/membership')} className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2">
                            Paketleri İncele <ArrowRight size={14} />
                        </button>
                        <button className="px-6 py-3 rounded-2xl font-bold text-xs text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            Avantajları Gör
                        </button>
                    </div>
                </div>

                {/* RIGHT: Abstract Dashboard Visual */}
                <div className="relative hidden lg:block">
                    <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
                        {/* Mock Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5">
                                <img src="https://ui-avatars.com/api/?name=Elite+Co&background=000&color=fff" className="w-full h-full rounded-full object-cover border-2 border-slate-900" alt="Logo"/>
                            </div>
                            <div>
                                <div className="w-20 h-2 bg-slate-700 rounded-full mb-1"></div>
                                <div className="w-12 h-1.5 bg-slate-600 rounded-full"></div>
                            </div>
                            </div>
                            <div className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase flex items-center gap-1 border border-green-500/30">
                            <CheckCircle2 size={10} /> Onaylı
                            </div>
                        </div>

                        {/* Mock Chart */}
                        <div className="flex items-end gap-1.5 h-24 mb-4 px-1">
                            {[40, 65, 45, 80, 55, 90, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>

                        {/* Mock Notification Floating */}
                        <div className="absolute -right-6 top-1/2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce-subtle max-w-[160px]">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shrink-0 border border-red-500/30">
                            <Sparkles size={16} />
                            </div>
                            <div>
                            <span className="block text-[10px] font-bold">Yeni Talep!</span>
                            <span className="text-[8px] text-slate-400">Premium eşleşme.</span>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
