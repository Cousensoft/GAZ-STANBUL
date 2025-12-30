
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, LogOut, Shield, UserCircle, LayoutDashboard, MapPin, Heart, FileText, Lock, LogIn, UserPlus, ShoppingCart, Users, Briefcase, Settings, ShoppingBag, TurkishLira, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('light');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Firmalar', path: '/companies' },
    { name: 'Sektörler', path: '/sectors' },
    { name: 'Talepler', path: '/requests' },
    { name: 'Haberler', path: '/news' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isMarketPage = location.pathname === '/market';
  const isDashboard = location.pathname === '/dashboard';
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isDashboard || isAdminPage) return;

    const path = location.pathname;
    const darkHeaderPaths = [
        '/',
        '/services',
        '/news',
        '/blog',
        '/requests',
        '/sectors',
        '/contact',
        '/membership'
    ];

    const isDarkHeader = 
        darkHeaderPaths.includes(path) || 
        path.startsWith('/company/');

    setHeaderTheme(isDarkHeader ? 'dark' : 'light');

  }, [location.pathname, isDashboard, isAdminPage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const goToDashboard = (tab?: string) => {
      navigate('/dashboard', { state: { initialTab: tab } });
  };

  const isTextWhite = isDashboard || (!isScrolled && headerTheme === 'dark');

  if (isAdminPage) return null;

  return (
    <>
      <header 
        className={`fixed z-50 transition-all duration-500 ease-in-out left-0 right-0 flex flex-col items-center ${
          !isDashboard && isScrolled ? 'top-4' : 'top-0'
        }`}
      >
        {isMarketPage && !isScrolled && !isDashboard && (
          <div className="w-full bg-red-600 text-white py-2 px-6 lg:px-8 shadow-md relative z-50 transition-all duration-300">
             <div className="container mx-auto flex flex-wrap justify-end items-center gap-x-6 gap-y-2 text-[11px] md:text-xs font-medium tracking-wide">
                <Link to="/register" className="hover:text-red-100 transition-colors">Gaz İstanbulda Satıcı Ol</Link>
                <Link to="/companies" className="hover:text-red-100 transition-colors">Firma Rehberi</Link>
                <Link to="/companies" className="hover:text-red-100 transition-colors">Mağazalar</Link>
                <Link to="/companies" className="hover:text-red-100 transition-colors">Markalar</Link>
                <Link to="/blog" className="hover:text-red-100 transition-colors">Blog</Link>
                
                <div className="w-px h-3 bg-red-400 mx-1 hidden md:block"></div>

                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 cursor-pointer hover:text-red-100">
                      <span>Dil Seçiniz</span>
                      <ChevronDown size={12} />
                   </div>
                   <div className="flex items-center gap-1 cursor-pointer hover:text-red-100">
                      <span>TL - Türk Lirası</span>
                      <ChevronDown size={12} />
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className={`
          relative flex items-center justify-between transition-all duration-500 ease-in-out px-4 lg:px-8 mt-2
          ${isDashboard 
            ? 'w-full bg-slate-900 border-b border-slate-800 h-24 mt-0 shadow-sm' 
            : (isScrolled 
              ? 'w-[98%] max-w-[1400px] bg-white/80 backdrop-blur-3xl border border-white/50 shadow-2xl shadow-slate-200/20 rounded-2xl h-20' 
              : 'w-full bg-transparent border-transparent h-24')
          }
        `}>
          
          <Link to="/" className="flex items-center gap-1 group relative z-10 shrink-0 mr-4">
             <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
               isTextWhite ? 'text-white' : 'text-slate-900'
             }`}>
               GAZİSTANBUL
             </span>
             <div className={`w-2 h-2 rounded-full mb-3 ml-0.5 ${
               isTextWhite ? 'bg-red-500' : 'bg-red-600'
             }`}></div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-full text-base font-bold transition-all duration-300 ${
                  isActive(link.path) 
                    ? (isDashboard 
                        ? 'bg-slate-800 text-white border border-slate-700' 
                        : (isScrolled ? 'bg-slate-900 text-white' : (isTextWhite ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-slate-900 text-white')))
                    : (isDashboard 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                        : (isScrolled ? 'text-slate-600 hover:bg-slate-100' : (isTextWhite ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100')))
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 relative z-10 ml-auto">
             
             {/* GÜNCELLEME: Doğrudan markete yönlendirir */}
             <Link
                to="/market"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-blue-500/50"
              >
                <ShoppingCart size={18} />
                <span>GazMarket</span>
              </Link>

              {/* GÜNCELLEME: Doğrudan sosyal alana yönlendirir (İçeride kontrol edilecek) */}
              <Link
                to="/social"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-purple-500/50"
              >
                <Users size={18} />
                <span>GazSocial</span>
              </Link>

              <Link 
                to="/cart"
                className={`relative p-2.5 rounded-full transition-all group ${
                    isDashboard 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : (isScrolled ? 'bg-slate-50 text-slate-900 hover:bg-slate-100' : (isTextWhite ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'))
                }`}
              >
                 <ShoppingCart size={20} />
                 {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                       {totalItems}
                    </span>
                 )}
              </Link>

             {isAuthenticated ? (
                <div className="relative group">
                   <button className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-all border ${
                      isDashboard 
                      ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white' 
                      : (isScrolled 
                        ? 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md' 
                        : (isTextWhite ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-white border-slate-200 hover:shadow-md'))
                   }`}>
                      <img 
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff`} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex flex-col items-start text-left mr-1">
                         <span className={`text-xs font-bold leading-tight ${isTextWhite ? 'text-white' : 'text-slate-900'}`}>
                            {user?.name}
                         </span>
                         <span className={`text-[10px] ${isTextWhite ? 'text-slate-200' : 'text-slate-500'}`}>
                            {user?.role === 'admin' ? 'Yönetici' : (user?.role === 'corporate' ? 'Kurumsal' : 'Hesabım')}
                         </span>
                      </div>
                      <ChevronDown size={14} className={`${isTextWhite ? 'text-slate-200' : 'text-slate-400'}`} />
                   </button>

                   <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                      
                      <div className="px-4 py-3 border-b border-slate-50 mb-2">
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Giriş Yapıldı</p>
                         <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                         <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                             user?.role === 'admin' 
                             ? 'bg-red-50 text-red-600 border-red-100' 
                             : (user?.role === 'corporate' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100')
                         }`}>
                            {user?.role === 'corporate' ? 'Kurumsal Üye' : (user?.role === 'admin' ? 'Yönetici' : 'Bireysel Üye')}
                         </span>
                      </div>

                      <div className="px-2 space-y-1">
                         {user?.role === 'admin' && (
                             <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item">
                                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                   <Shield size={16} />
                                </div>
                                <span className="text-sm font-medium">Yönetim Paneli</span>
                             </Link>
                         )}

                         <button onClick={() => goToDashboard('overview')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                               <LayoutDashboard size={16} />
                            </div>
                            <span className="text-sm font-medium">Genel Bakış</span>
                         </button>
                         
                         {user?.role === 'individual' && (
                            <>
                                <button onClick={() => goToDashboard('profile')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                                        <UserCircle size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Kişisel Bilgilerim</span>
                                </button>
                                <button onClick={() => goToDashboard('requests')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover/item:bg-cyan-600 group-hover/item:text-white transition-colors">
                                    <FileText size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Taleplerim</span>
                                </button>
                                <button onClick={() => goToDashboard('appointments')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">
                                    <Calendar size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Randevularım</span>
                                </button>
                                <button onClick={() => goToDashboard('favorites')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center group-hover/item:bg-pink-600 group-hover/item:text-white transition-colors">
                                    <Heart size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Favorilerim</span>
                                </button>
                                <button onClick={() => goToDashboard('addresses')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                                    <MapPin size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Adreslerim</span>
                                </button>
                            </>
                         )}

                         {user?.role === 'corporate' && (
                            <>
                                <button onClick={() => goToDashboard('company')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                                        <Briefcase size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Firma Profili</span>
                                </button>
                                <button onClick={() => goToDashboard('services')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">
                                        <Settings size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Hizmet Yönetimi</span>
                                </button>
                                <button onClick={() => goToDashboard('market-panel')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                        <ShoppingBag size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Market Paneli</span>
                                </button>
                                <button onClick={() => goToDashboard('finance')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                                        <TurkishLira size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Finans & Ödemeler</span>
                                </button>
                            </>
                         )}

                         <button onClick={() => goToDashboard('security')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors group/item text-left">
                            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                               <Lock size={16} />
                            </div>
                            <span className="text-sm font-medium">Güvenlik</span>
                         </button>
                      </div>

                      <div className="border-t border-slate-50 mt-2 pt-2 px-2">
                         <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                         >
                            <LogOut size={16} />
                            <span className="text-sm font-medium">Çıkış Yap</span>
                         </button>
                      </div>
                   </div>
                </div>
             ) : (
                <div className="relative group">
                    <button className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 hover:shadow-lg border ${
                        isTextWhite 
                        ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                        : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
                    }`}>
                        <UserCircle size={20} />
                        <span>Üye İşlemleri</span>
                        <ChevronDown size={14} />
                    </button>

                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hesap Erişimi</span>
                        </div>
                        <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors">
                            <LogIn size={18} className="text-slate-400" />
                            <span className="font-bold text-sm">Giriş Yap</span>
                        </Link>
                        <Link to="/register" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors">
                            <UserPlus size={18} className="text-slate-400 group-hover:text-red-600" />
                            <span className="font-bold text-sm">Kayıt Ol</span>
                        </Link>
                    </div>
                </div>
             )}
          </div>

          <button 
            className={`lg:hidden p-2 rounded-xl transition-colors ${
               isDashboard 
                 ? 'bg-slate-800 text-white hover:bg-slate-700' 
                 : (isScrolled ? 'bg-slate-100 text-slate-900' : (isTextWhite ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'))
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden flex flex-col justify-center px-8 ${
         isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
         <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between text-white border border-slate-700">
               <div className="flex items-center gap-3">
                  <ShoppingCart size={24} />
                  <span className="font-bold">Sepetim</span>
               </div>
               {totalItems > 0 && (
                  <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-full text-sm">{totalItems} Ürün</span>
               )}
            </Link>

            <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/market" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-white border-0 shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    <ShoppingCart size={28} />
                    <span className="font-bold text-sm">GazMarket</span>
                </Link>
                <Link 
                  to="/social" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-white border-0 shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                    <Users size={28} />
                    <span className="font-bold text-sm">GazSocial</span>
                </Link>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            {isAuthenticated && (
               <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl mb-4 border border-white/5">
                  <img 
                     src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff`} 
                     alt="Profile" 
                     className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                     <h4 className="text-white font-bold text-lg">{user?.name}</h4>
                     <p className="text-slate-400 text-xs">{user?.email}</p>
                  </div>
               </div>
            )}

            {navLinks.map((link) => (
               <Link 
                 key={link.path}
                 to={link.path}
                 onClick={() => setIsMenuOpen(false)}
                 className="text-2xl font-bold text-white hover:text-red-500 transition-colors flex items-center justify-between group"
               >
                  {link.name}
                  <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-500" />
               </Link>
            ))}
            
            <div className="w-full h-px bg-white/10 my-2"></div>

            {isAuthenticated ? (
               <div className="space-y-4">
                  {user?.role === 'admin' ? (
                      <Link 
                        to="/admin/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-3"
                      >
                        <Shield size={20} /> Yönetim Paneli
                      </Link>
                  ) : (
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-3"
                      >
                        <LayoutDashboard size={20} /> Hesabım / Panel
                      </Link>
                  )}
                  <button 
                     onClick={handleLogout}
                     className="text-xl font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-3"
                  >
                     <LogOut size={20} /> Çıkış Yap
                  </button>
               </div>
            ) : (
               <div className="flex flex-col gap-4">
                  <Link 
                     to="/login" 
                     onClick={() => setIsMenuOpen(false)}
                     className="w-full py-4 rounded-2xl bg-white/5 text-white font-bold text-center border border-white/10 hover:bg-white/10 transition-colors"
                  >
                     Giriş Yap
                  </Link>
                  <Link 
                     to="/register" 
                     onClick={() => setIsMenuOpen(false)}
                     className="w-full py-4 rounded-2xl bg-red-600 text-white font-bold text-center hover:bg-red-700 transition-colors shadow-lg shadow-red-900/50"
                  >
                     Kayıt Ol
                  </Link>
               </div>
            )}
         </div>
      </div>
    </>
  );
};

export default Navbar;
