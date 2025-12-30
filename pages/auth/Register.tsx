
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building2, ArrowRight, Phone, Briefcase, ShoppingCart, Users, Gem } from 'lucide-react';
import { SECTORS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // 1. Platform Selection (Left Panel)
  const [platform, setPlatform] = useState<'gazistanbul' | 'market' | 'social'>('gazistanbul');
  // 2. Account Type Selection (Inside Form)
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual');
  const [showPassword, setShowPassword] = useState(false);

  // TASK: Giriş yapmışsa kayıt sayfasını gösterme
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo registration logic
    navigate('/dashboard');
  };

   // Helper to get current branding info
   const getPlatformInfo = () => {
      switch (platform) {
        case 'market':
          return { title: 'Market Hesabı', color: 'text-blue-600', ring: 'focus:ring-blue-500', bg: 'bg-blue-600' };
        case 'social':
          return { title: 'Social Hesabı', color: 'text-purple-600', ring: 'focus:ring-purple-500', bg: 'bg-purple-600' };
        default:
          return { title: 'Gazistanbul Hesabı', color: 'text-red-600', ring: 'focus:ring-red-500', bg: 'bg-red-600' };
      }
    };
  
    const info = getPlatformInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-slate-100">
          
          {/* Left Side - Navigation Panel */}
          <div className="hidden md:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white">
            {/* Background */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                 alt="Engineer Working" 
                 className="w-full h-full object-cover opacity-30"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/90"></div>
            </div>
            
            {/* Header */}
            <div className="relative z-10">
               <Link to="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                  <span className="text-3xl font-black tracking-tighter text-white">
                     GAZİSTANBUL
                  </span>
               </Link>
               <h2 className="text-3xl font-bold leading-tight mb-2">Kayıt Platformu</h2>
               <p className="text-slate-400 text-sm">Üyelik oluşturmak istediğiniz platformu seçiniz.</p>
            </div>

             {/* Navigation Options (1. Gazistanbul, 2. Market, 3. Social) */}
             <div className="relative z-10 flex flex-col gap-4 mt-8 mb-auto">
               
               {/* Option 1: Gazistanbul (Default) */}
               <button 
                  onClick={() => setPlatform('gazistanbul')}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                    platform === 'gazistanbul' 
                      ? 'bg-red-600 border-red-500 shadow-lg shadow-red-900/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
               >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    platform === 'gazistanbul' ? 'bg-white text-red-600' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                     <Gem size={24} />
                  </div>
                  <div>
                     <h4 className={`font-bold text-lg ${platform === 'gazistanbul' ? 'text-white' : 'text-slate-300'}`}>Gazistanbul</h4>
                     <p className={`text-xs ${platform === 'gazistanbul' ? 'text-red-100' : 'text-slate-500'}`}>Ana Ekosistem Üyeliği</p>
                  </div>
                  {platform === 'gazistanbul' && <div className="ml-auto bg-white/20 p-1 rounded-full"><ArrowRight size={16}/></div>}
               </button>

               {/* Option 2: Market */}
               <button 
                  onClick={() => setPlatform('market')}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                    platform === 'market' 
                      ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
               >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    platform === 'market' ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                     <ShoppingCart size={24} />
                  </div>
                  <div>
                     <h4 className={`font-bold text-lg ${platform === 'market' ? 'text-white' : 'text-slate-300'}`}>Gazistanbul Market</h4>
                     <p className={`text-xs ${platform === 'market' ? 'text-blue-100' : 'text-slate-500'}`}>Tedarikçi ve Alıcı Üyeliği</p>
                  </div>
                  {platform === 'market' && <div className="ml-auto bg-white/20 p-1 rounded-full"><ArrowRight size={16}/></div>}
               </button>

               {/* Option 3: Social */}
               <button 
                  onClick={() => setPlatform('social')}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${
                    platform === 'social' 
                      ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-900/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
               >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    platform === 'social' ? 'bg-white text-purple-600' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                     <Users size={24} />
                  </div>
                  <div>
                     <h4 className={`font-bold text-lg ${platform === 'social' ? 'text-white' : 'text-slate-300'}`}>Gazistanbul Social</h4>
                     <p className={`text-xs ${platform === 'social' ? 'text-purple-100' : 'text-slate-500'}`}>Topluluk Profili Oluştur</p>
                  </div>
                  {platform === 'social' && <div className="ml-auto bg-white/20 p-1 rounded-full"><ArrowRight size={16}/></div>}
               </button>

            </div>

             <p className="relative z-10 text-slate-400 text-xs mt-8">
               © 2024 Gazistanbul Teknoloji A.Ş. Tüm hakları saklıdır.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 relative">
             
             {/* Mobile Logo */}
             <div className="md:hidden flex justify-center mb-8">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <span className="text-2xl font-black tracking-tighter text-slate-900">
                       GAZİSTANBUL
                    </span>
                </Link>
             </div>

             {/* Mobile Tabs (Big Visible Grid) */}
             <div className="md:hidden grid grid-cols-3 gap-2 mb-8">
                <button 
                  onClick={() => setPlatform('gazistanbul')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                     platform === 'gazistanbul' 
                     ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                   <Gem size={24} className="mb-1" />
                   <span className="text-[10px] font-bold uppercase tracking-wide">Gazistanbul</span>
                </button>

                <button 
                  onClick={() => setPlatform('market')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                     platform === 'market' 
                     ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                   <ShoppingCart size={24} className="mb-1" />
                   <span className="text-[10px] font-bold uppercase tracking-wide">Market</span>
                </button>

                <button 
                  onClick={() => setPlatform('social')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                     platform === 'social' 
                     ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-purple-200 hover:text-purple-600'
                  }`}
                >
                   <Users size={24} className="mb-1" />
                   <span className="text-[10px] font-bold uppercase tracking-wide">Social</span>
                </button>
             </div>

             <div className="text-center md:text-left mb-6">
                <h1 className={`text-2xl font-bold mb-2 transition-colors ${info.color}`}>Yeni {info.title} Oluştur</h1>
                <p className="text-slate-500 text-sm">Hemen formu doldurun, aramıza katılın.</p>
             </div>

             {/* Account Type Toggle (Individual / Corporate) - Always visible for registration */}
             <div className="bg-slate-100 p-1 rounded-xl flex mb-6">
                <button 
                  onClick={() => setAccountType('individual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                    accountType === 'individual' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                   <User size={16} /> Bireysel
                </button>
                <button 
                  onClick={() => setAccountType('corporate')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                    accountType === 'corporate' 
                      ? `bg-white ${info.color} shadow-sm` 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                   <Building2 size={16} /> Kurumsal
                </button>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Individual Fields */}
                {accountType === 'individual' && (
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Ad</label>
                         <input type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="Adınız" />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Soyad</label>
                         <input type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="Soyadınız" />
                      </div>
                   </div>
                )}

                {/* Corporate Fields */}
                {accountType === 'corporate' && (
                   <>
                      <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Firma Ünvanı</label>
                         <div className="relative">
                           <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                           <input type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="Şirket Tam Adı" />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Yetkili Kişi</label>
                            <input type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="Ad Soyad" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Vergi No</label>
                            <input type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="VKN" />
                         </div>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Sektör</label>
                         <select className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none transition-all ${info.ring} focus:ring-2 text-slate-700`}>
                            <option value="">Sektör Seçiniz...</option>
                            {SECTORS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                         </select>
                      </div>
                   </>
                )}

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Telefon</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input type="tel" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="05XX..." />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">E-Posta</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input type="email" className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 outline-none transition-all ${info.ring} focus:ring-2`} placeholder="mail@site.com" />
                      </div>
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Şifre</label>
                   <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input 
                        type={showPassword ? "text" : "password"}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 outline-none transition-all ${info.ring} focus:ring-2`}
                        placeholder="En az 6 karakter"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                         {showPassword ? <ArrowRight size={18} className="opacity-0" /> : <ArrowRight size={18} className="opacity-0" />}
                         Toggle
                      </button>
                   </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                   <input type="checkbox" className={`mt-1 rounded ${info.color} focus:ring-offset-0`} required />
                   <span className="text-xs text-slate-500">
                     <a href="#" className={`font-bold hover:underline ${info.color}`}>Kullanım Koşullarını</a> ve <a href="#" className={`font-bold hover:underline ${info.color}`}>Gizlilik Politikasını</a> okudum, onaylıyorum.
                   </span>
                </div>

                <button className={`w-full text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90 mt-4 ${
                   platform === 'gazistanbul' ? 'bg-slate-900 hover:bg-red-600' : 
                   platform === 'market' ? 'bg-blue-600 hover:bg-blue-700' : 
                   'bg-purple-600 hover:bg-purple-700'
                }`}>
                   Kayıt Ol <ArrowRight size={20} />
                </button>
             </form>

             <div className="mt-8 text-center text-sm text-slate-500">
                Zaten hesabınız var mı?{' '}
                <Link to="/login" state={{ platform: platform }} className={`font-bold hover:underline ${info.color}`}>
                   Giriş Yapın
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
