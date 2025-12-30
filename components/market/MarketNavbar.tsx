
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Globe, Users, LogOut, ChevronDown, UserCircle, LayoutDashboard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MarketNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm font-sans">
      {/* En Üst Şerit: Kırmızı, Küçük Font */}
      <div className="w-full bg-red-600 py-1 px-6 lg:px-12 border-b border-red-700/10">
          <div className="container mx-auto flex flex-wrap justify-end items-center gap-x-4 gap-y-1 text-[10px] md:text-[11px] font-semibold text-white">
            <Link to="/register" className="hover:text-red-100 transition-colors">Gaz İstanbul'da Satıcı Ol</Link>
            <Link to="/companies" className="hover:text-red-100 transition-colors">Firma Rehberi</Link>
            <Link to="/market" className="hover:text-red-100 transition-colors">Mağazalar</Link>
            <Link to="/market" className="hover:text-red-100 transition-colors">Markalar</Link>
            <Link to="/blog" className="hover:text-red-100 transition-colors">Blog</Link>
            
            <div className="flex items-center gap-3 ml-1 border-l border-white/20 pl-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-red-100">
                    <span>TR</span>
                    <ChevronDown size={10} className="text-red-200" />
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-red-100">
                    <span>₺ TL</span>
                    <ChevronDown size={10} className="text-red-200" />
                </div>
            </div>
          </div>
      </div>

      {/* Ana Navbar */}
      <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12">
        {/* Sol Taraf: Logo ve Menü */}
        <div className="flex items-center gap-8">
            <Link to="/market" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
                    <ShoppingCart size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">
                    Gazmarket
                </span>
            </Link>

            {/* Ana Menü Linkleri */}
            <nav className="hidden md:flex items-center gap-6">
                <Link 
                    to="/market/products" 
                    className="text-sm font-bold text-slate-600 hover:text-red-600 transition-colors relative group"
                >
                    Tüm Ürünler
                    <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </Link>
            </nav>
        </div>

        {/* Sağ Taraf - Platform Butonları ve Aksiyonlar */}
        <div className="flex items-center gap-3">
            {/* Platform Geçişleri (Sağa taşındı ve GazMarket kaldırıldı) */}
            <div className="hidden lg:flex items-center gap-2 mr-2">
                <button 
                    onClick={() => navigate('/social')}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold transition-all bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                >
                    <Users size={14} /> GazSocial
                </button>
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold transition-all bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                >
                    <Globe size={14} /> GazIstanbul
                </button>
            </div>

            {/* İkinci Sepet İkonu: Soft Görünüm (Slate/Gri) */}
            <Link 
                to="/cart"
                className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-none border border-slate-200"
            >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                        {totalItems}
                    </span>
                )}
            </Link>

            {/* Üye İşlemleri Dropdown */}
            {isAuthenticated ? (
                <div className="relative group">
                    <button className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                        <img 
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff`} 
                            className="w-8 h-8 rounded-full border border-slate-100 object-cover" 
                            alt="User" 
                        />
                        <span className="text-xs font-bold text-slate-700">{user?.name.split(' ')[0]}</span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>
                    
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hesabım</span>
                        </div>
                        <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 transition-colors text-left text-sm font-medium">
                            <LayoutDashboard size={16} className="text-slate-400" /> Panelim
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors text-left text-sm font-medium">
                            <LogOut size={16} /> Çıkış Yap
                        </button>
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <button 
                        onClick={() => navigate('/login', { state: { platform: 'market' } })}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white text-slate-800 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <UserCircle size={18} className="text-slate-400" />
                        <span>Üye İşlemleri</span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                        <Link to="/login" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-bold text-sm">Giriş Yap</Link>
                        <Link to="/register" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-bold text-sm">Kayıt Ol</Link>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default MarketNavbar;
