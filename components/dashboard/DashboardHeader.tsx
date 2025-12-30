
import React, { useState } from 'react';
import { Search, Bell, Mail, ChevronDown, Globe, LogOut, User, Settings, Shield, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSearch, onNotificationClick, onMessageClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm shadow-slate-100/50">
      
      {/* Sol: Akıllı Arama Çubuğu */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Dashboard'da ara..." 
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Sağ: Aksiyonlar & Profil */}
      <div className="flex items-center gap-2">
        
        {/* Siteyi Görüntüle Linki */}
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all mr-2 group border border-transparent hover:border-blue-100"
          title="Ana Sayfaya Dön"
        >
          <Globe size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-black uppercase tracking-widest hidden lg:block">Siteyi Görüntüle</span>
        </Link>

        {/* Dil Seçici */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border-r border-slate-100 mr-2">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">TR</span>
          <ChevronDown size={14} className="text-slate-400" />
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-1 mr-4">
          <button 
            onClick={onMessageClick}
            className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group"
            title="Mesajlar"
          >
            <Mail size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity">2</span>
          </button>
          <button 
            onClick={onNotificationClick}
            className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group"
            title="Bildirimler"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-sm shadow-blue-200"></span>
          </button>
        </div>

        {/* Kullanıcı Profili */}
        <div className="relative">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 pl-1.5 pr-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ef4444&color=fff`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-xs font-bold text-slate-700 hidden md:block group-hover:text-blue-600 transition-colors">
              {user.name}
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
              <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 animate-fade-in-up">
                 <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hesap Yönetimi</span>
                 </div>
                 <button onClick={() => { navigate('/dashboard'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 text-sm font-bold transition-colors">
                    <User size={16} /> Profilim
                 </button>
                 <button onClick={() => { navigate('/dashboard', {state: {initialTab: 'security'}}); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-600 text-sm font-bold transition-colors">
                    <Settings size={16} /> Ayarlar
                 </button>
                 {user.role === 'admin' && (
                    <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm font-bold transition-colors">
                        <Shield size={16} /> Admin Paneli
                    </button>
                 )}
                 <div className="h-px bg-slate-50 my-1"></div>
                 <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-500 text-sm font-bold transition-colors"
                 >
                    <LogOut size={16} /> Çıkış Yap
                 </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;
