
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ShoppingCart, Users, Gem, ArrowRight, Eye, EyeOff, Building2, Shield, AlertCircle, Check, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, isAuthenticated } = useAuth();
  
  // URL Parametrelerini Çözümle
  const searchParams = new URLSearchParams(location.search);
  const paramRole = searchParams.get('role');
  const corpName = searchParams.get('corp');
  
  // Check if we are on the /login/technician route (supports both standard and hash routing patterns)
  const isTechnicianRoute = location.pathname.includes('/login/technician');
  const isTechnicianMode = isTechnicianRoute || paramRole === 'technician';

  const initialPlatform = location.state?.platform === 'market' || location.state?.platform === 'social' 
    ? location.state.platform 
    : 'gazistanbul';

  const [platform, setPlatform] = useState<'gazistanbul' | 'market' | 'social'>(initialPlatform);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Başlangıç Ayarları - Mod Kontrolü
  useEffect(() => {
      if (isTechnicianMode) {
          // Teknik Personel Giriş Modu
          setAccountType('individual'); // Teknik personeller bireysel giriş yapar
          const cleanCorpName = corpName ? corpName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'firma';
          setEmail(`teknik@${cleanCorpName}.com`);
          setPassword('123456');
      } else {
          // Standart Giriş
          // Eğer önceden girilmiş değerler yoksa varsayılanları ata
          if (!email) setEmail('bireysel@gazistanbul.com');
          if (!password) setPassword('123456');
      }
  }, [isTechnicianMode, corpName]);

  // Authenticated redirection logic
  useEffect(() => {
    if (isAuthenticated) {
      // Eğer kullanıcı Teknik Personel rotasındaysa
      if (isTechnicianRoute) {
          // Zaten teknisyen ise dashboard'a yönlendir
          if (user?.role === 'technician') {
              navigate('/dashboard');
          }
          // Eğer başka bir rol (Kurumsal/Bireysel) ile giriş yapmışsa, 
          // yönlendirme yapma (Login sayfasında kalıp hesap değiştirmesine izin ver)
          return;
      }

      // Standart yönlendirmeler
      if (platform === 'market') {
        navigate('/market');
      } else if (platform === 'social') {
        navigate('/social');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, platform, navigate, isTechnicianRoute, user]);

  const handleAccountTypeChange = (type: 'individual' | 'corporate') => {
    setAccountType(type);
    setError(null);
    
    if (type === 'individual') {
        setEmail('bireysel@gazistanbul.com');
        setPassword('123456');
    } else {
        setEmail('kurumsal@gazistanbul.com');
        setPassword('123456');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // --- ÖZEL TEKNİK PERSONEL GİRİŞİ ---
    if (isTechnicianMode) {
        // Basit bir doğrulama simülasyonu
        if (trimmedPassword === '123456') {
            login({
                id: 'tech-user-01',
                name: 'Teknik Personel (Demo)',
                role: 'technician', // Teknik Rolü
                email: trimmedEmail,
                avatar: 'https://ui-avatars.com/api/?name=Teknik+Personel&background=4f46e5&color=fff',
                connectedCompanyName: corpName || 'Bosphorus Enerji',
                connectionStatus: 'approved'
            }, rememberMe);
            // Login fonksiyonu state'i güncelleyecek ve useEffect yönlendirmeyi yapacak
        } else {
            setError("Teknik personel şifresi hatalı.");
        }
        return;
    }

    // --- STANDART GİRİŞ MANTIĞI ---
    if (accountType === 'individual') {
        if (trimmedEmail === 'bireysel@gazistanbul.com' && trimmedPassword === '123456') {
            login({
                id: 'user-bireysel',
                name: 'Bireysel Test Kullanıcısı',
                role: 'individual',
                email: trimmedEmail,
                avatar: 'https://ui-avatars.com/api/?name=Bireysel+Test&background=ef4444&color=fff'
            }, rememberMe);
        } else {
            setError("E-posta veya şifre hatalı.");
        }
    } else if (accountType === 'corporate') {
        if (trimmedEmail === 'kurumsal@gazistanbul.com' && trimmedPassword === '123456') {
            login({
                id: 'corp-1',
                name: 'Bosphorus Enerji (Kurumsal)',
                role: 'corporate',
                email: trimmedEmail,
                avatar: 'https://ui-avatars.com/api/?name=Bosphorus+Enerji&background=0f172a&color=fff'
            }, rememberMe);
        } else {
            setError("E-posta veya şifre hatalı.");
        }
    }
  };

  const getPlatformInfo = () => {
    switch (platform) {
      case 'market':
        return { title: 'Market Girişi', color: 'text-blue-600', ring: 'focus:ring-blue-500', bg: 'bg-blue-600', accent: 'blue' };
      case 'social':
        return { title: 'Social Girişi', color: 'text-purple-600', ring: 'focus:ring-purple-500', bg: 'bg-purple-600', accent: 'purple' };
      default:
        return { title: 'Gazistanbul Girişi', color: 'text-red-600', ring: 'focus:ring-red-500', bg: 'bg-red-600', accent: 'red' };
    }
  };

  const info = getPlatformInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 relative">
      <div className="absolute top-6 right-6 z-50">
         <Link 
            to="/admin/login" 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-bold text-slate-500 hover:text-red-600 hover:border-red-200 transition-all group"
         >
            <Shield size={14} className="group-hover:fill-red-600 transition-colors" />
            <span>Yönetici Girişi</span>
         </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100">
          
          {/* LEFT SIDEBAR - Changes if Technician Mode */}
          <div className={`hidden md:flex w-1/2 relative flex-col justify-between p-12 text-white ${isTechnicianMode ? 'bg-indigo-900' : 'bg-slate-900'}`}>
            <div className="absolute inset-0 z-0">
               <img 
                 src={isTechnicianMode 
                    ? "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
                 } 
                 className="w-full h-full object-cover opacity-30" 
                 alt=""
               />
               <div className={`absolute inset-0 bg-gradient-to-r ${isTechnicianMode ? 'from-indigo-900 via-indigo-900/80 to-indigo-900/90' : 'from-slate-900 via-slate-900/80 to-slate-900/90'}`}></div>
            </div>
            
            <div className="relative z-10">
               <Link to="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                  <span className="text-3xl font-black tracking-tighter text-white">GAZİSTANBUL</span>
               </Link>
               
               {isTechnicianMode ? (
                   <>
                       <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl mb-4 inline-block">
                           <Briefcase size={32} className="text-indigo-300 mb-2"/>
                           <h2 className="text-2xl font-bold leading-tight text-white">{corpName || 'Kurumsal Firma'}</h2>
                           <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mt-1">Personel Giriş Paneli</p>
                       </div>
                       <p className="text-slate-300 text-sm leading-relaxed">
                           Bu panel üzerinden iş emirlerinizi görüntüleyebilir, müşteri randevularını yönetebilir ve servis raporlarını girebilirsiniz.
                       </p>
                   </>
               ) : (
                   <>
                       <h2 className="text-3xl font-bold leading-tight mb-2">Platform Seçimi</h2>
                       <p className="text-slate-400 text-sm">Lütfen giriş yapacağınız hizmeti seçin.</p>
                   </>
               )}
            </div>

            {!isTechnicianMode && (
                <div className="relative z-10 flex flex-col gap-4 mt-8 mb-auto">
                <button onClick={() => {setPlatform('gazistanbul'); setError(null);}} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${platform === 'gazistanbul' ? 'bg-red-600 border-red-500 shadow-lg shadow-red-900/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${platform === 'gazistanbul' ? 'bg-white text-red-600' : 'bg-slate-800 text-slate-400'}`}><Gem size={24} /></div>
                    <div><h4 className={`font-bold text-lg ${platform === 'gazistanbul' ? 'text-white' : 'text-slate-300'}`}>Gazistanbul</h4><p className={`text-xs ${platform === 'gazistanbul' ? 'text-red-100' : 'text-slate-500'}`}>Genel Altyapı Çözümleri</p></div>
                </button>
                <button onClick={() => {setPlatform('market'); setError(null);}} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${platform === 'market' ? 'bg-blue-600 border-red-500 shadow-lg shadow-blue-900/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${platform === 'market' ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'}`}><ShoppingCart size={24} /></div>
                    <div><h4 className={`font-bold text-lg ${platform === 'market' ? 'text-white' : 'text-slate-300'}`}>GazMarket</h4><p className={`text-xs ${platform === 'market' ? 'text-blue-100' : 'text-slate-500'}`}>Ürün Tedarik Merkezi</p></div>
                </button>
                <button onClick={() => {setPlatform('social'); setError(null);}} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group ${platform === 'social' ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-900/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${platform === 'social' ? 'bg-white text-purple-600' : 'bg-slate-800 text-slate-400'}`}><Users size={24} /></div>
                    <div><h4 className={`font-bold text-lg ${platform === 'social' ? 'text-white' : 'text-slate-300'}`}>GazSocial</h4><p className={`text-xs ${platform === 'social' ? 'text-purple-100' : 'text-slate-500'}`}>Sektörel Topluluk</p></div>
                </button>
                </div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
             <div className="text-center md:text-left mb-6">
                <h1 className={`text-2xl font-bold mb-2 transition-colors ${isTechnicianMode ? 'text-indigo-600' : info.color}`}>
                   {isTechnicianMode ? 'Teknik Ekip Girişi' : (accountType === 'corporate' ? 'Kurumsal Giriş' : 'Bireysel Giriş')}
                </h1>
                <p className="text-slate-500 text-sm">
                    {isTechnicianMode 
                        ? 'Lütfen size verilen e-posta ve şifre ile giriş yapın.' 
                        : 'Doğru hesap türünü seçtiğinizden emin olun.'}
                </p>
             </div>

             {!isTechnicianMode && (
                <div className="bg-slate-100 p-1.5 rounded-2xl flex mb-8">
                    <button 
                        onClick={() => handleAccountTypeChange('individual')} 
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${accountType === 'individual' ? 'bg-white text-slate-900 shadow-md transform scale-[1.02]' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                    <User size={16} /> Bireysel
                    </button>
                    <button 
                        onClick={() => handleAccountTypeChange('corporate')} 
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${accountType === 'corporate' ? `bg-white ${info.color} shadow-md transform scale-[1.02]` : 'text-slate-500 hover:text-slate-700'}`}
                    >
                    <Building2 size={16} /> Kurumsal
                    </button>
                </div>
             )}

             {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-fade-in ring-2 ring-red-500/10">
                    <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs font-bold text-red-800 leading-relaxed">{error}</p>
                </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">E-posta Adresi</label>
                   <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={20} /></div>
                      <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value); setError(null);}} 
                        placeholder="mail@ornek.com" 
                        className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 outline-none focus:ring-2 focus:border-transparent transition-all ${isTechnicianMode ? 'focus:ring-indigo-500' : info.ring}`}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Şifre</label>
                   <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={20} /></div>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); setError(null);}}
                        placeholder="••••••••" 
                        className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 text-slate-900 outline-none focus:ring-2 focus:border-transparent transition-all ${isTechnicianMode ? 'focus:ring-indigo-500' : info.ring}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${rememberMe ? (isTechnicianMode ? 'bg-indigo-600 border-indigo-600' : platform === 'social' ? 'bg-purple-600 border-purple-600' : platform === 'market' ? 'bg-blue-600 border-blue-600' : 'bg-red-600 border-red-600') : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="sr-only"
                            />
                            {rememberMe && <Check size={14} className="text-white" strokeWidth={4} />}
                        </div>
                        <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Beni Hatırla</span>
                    </label>
                    <a href="#" className={`text-xs font-bold hover:underline ${isTechnicianMode ? 'text-indigo-600' : info.color}`}>Şifremi Unuttum?</a>
                </div>

                <button className={`w-full text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90 ${isTechnicianMode ? 'bg-indigo-600 hover:bg-indigo-700' : (platform === 'gazistanbul' ? 'bg-slate-900 hover:bg-red-600' : platform === 'market' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700')}`}>
                   Giriş Yap <ArrowRight size={20} />
                </button>
             </form>

             <div className="mt-8 text-center text-sm text-slate-500">Hesabınız yok mu? <Link to="/register" className={`font-bold hover:underline ${isTechnicianMode ? 'text-indigo-600' : info.color}`}>Hemen Kayıt Olun</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
