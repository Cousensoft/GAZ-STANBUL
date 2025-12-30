
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Video, 
  Calendar, 
  Search, 
  Bell, 
  UserPlus, 
  Users, 
  Bookmark, 
  Briefcase, 
  MapPin, 
  Globe,
  ThumbsUp,
  Zap,
  Gift,
  Activity,
  CheckCircle2,
  Send,
  Home,
  Store,
  MonitorPlay,
  Menu,
  Plus,
  Layout,
  ShoppingBag,
  PlayCircle,
  History,
  ChevronDown,
  UserCircle
} from 'lucide-react';

// --- MOCK DATA FOR SOCIAL UI ---
const STORIES = [
  { id: 1, user: 'Hikayen', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', isUser: true, username: 'hakan_celik' },
  { id: 2, user: 'Atlas Tesisat', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200&auto=format&fit=crop', username: 'atlas_teknik' },
  { id: 3, user: 'Mehmet Yılmaz', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop', username: 'mehmet_u' },
  { id: 4, user: 'Kombi Dünyası', img: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?q=80&w=200&auto=format&fit=crop', username: 'kombi_center' },
  { id: 5, user: 'Ayşe Demir', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', username: 'ayse_d' },
];

const POSTS = [
  {
    id: 1,
    author: 'Mehmet Yılmaz',
    username: 'mehmet_u',
    role: 'Yüksek Mühendis',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    content: 'Bugün Kadıköy projemizde akıllı sayaç entegrasyonunu başarıyla tamamladık. Ekibime teşekkürler! Proje detaylarını yakında paylaşacağım. 🚀🔧\n\n#Gazistanbul #SmartCity #Mühendislik',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '2 saat önce',
    likes: 124,
    comments: 18,
    shares: 5,
  },
  {
    id: 2,
    author: 'Bosphorus Enerji',
    username: 'bosphorus',
    role: 'Kurumsal Üye',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    content: '📢 Kış kampanyamız başladı! Kombi bakımında %20 indirim fırsatını kaçırmayın. Randevu için profilimizdeki butonu kullanabilirsiniz.',
    timeAgo: '5 saat önce',
    likes: 89,
    comments: 42,
    shares: 12,
  }
];

const Social: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans">
      
      {/* --- SOCIAL SPECIFIC HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b border-slate-200 z-50 flex items-center justify-between px-4">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 md:w-1/4">
           <Link to="/" className="group shrink-0">
               <span className="text-2xl font-black tracking-tighter text-slate-900">
                 GAZİSTANBUL
               </span>
           </Link>
           <div className="hidden md:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-full max-w-[240px]">
              <Search size={16} className="text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Gazistanbul'da Ara" 
                className="bg-transparent border-none outline-none text-sm placeholder-slate-500 w-full"
              />
           </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center gap-1 md:w-2/4">
            <NavTab icon={<Home size={24} />} active={true} />
            <NavTab icon={<MonitorPlay size={24} />} />
            <NavTab icon={<Store size={24} />} link="/market" />
            <NavTab icon={<Users size={24} />} />
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center justify-end gap-2 md:gap-3 md:w-1/4">
           <button className="hidden lg:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors">
              <Plus size={18} /> <span>Oluştur</span>
           </button>
           <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block"></div>
           <IconBtn icon={<MessageCircle size={20} />} />
           <IconBtn icon={<Bell size={20} />} badge={3} />
           <div onClick={() => navigate('/social/profile/hakan_celik')} className="ml-1 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-red-500 transition-colors"
              />
           </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* --- LEFT SIDEBAR --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[84px] space-y-4">
                  <div onClick={() => navigate('/social/profile/hakan_celik')} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-slate-100 group-hover:border-red-500 transition-colors" alt="Profile" />
                    <div>
                        <h3 className="font-bold text-slate-900 text-sm">Hakan Çelik</h3>
                        <p className="text-xs text-slate-500">@hakan_celik</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <nav className="flex flex-col p-2 space-y-1">
                        <MenuItem icon={<Layout size={20} className="text-blue-500"/>} label="Haber Kaynağı" active />
                        <MenuItem icon={<Users size={20} className="text-blue-500"/>} label="Bağlantılar" />
                        <MenuItem icon={<Bookmark size={20} className="text-purple-600 fill-purple-600"/>} label="Kaydedilenler" />
                        <MenuItem icon={<Briefcase size={20} className="text-amber-600"/>} label="İş İlanları" />
                    </nav>
                  </div>
              </div>
            </div>

            {/* --- CENTER FEED --- */}
            <div className="col-span-1 lg:col-span-6 space-y-6">
              {/* Stories */}
              <div className="relative bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
                    {STORIES.map((story) => (
                        <div key={story.id} onClick={() => navigate(`/social/profile/${story.username}`)} className="flex-shrink-0 w-20 flex flex-col items-center gap-2 cursor-pointer snap-start group">
                          <div className={`w-16 h-16 rounded-full p-0.5 ${story.isUser ? 'border-2 border-slate-200' : 'border-2 border-red-500'}`}>
                              <img src={story.img} className="w-full h-full rounded-full object-cover border-2 border-white" alt={story.user} />
                          </div>
                          <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center group-hover:text-red-600 transition-colors">
                              {story.user}
                          </span>
                        </div>
                    ))}
                  </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                  {POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-4 flex justify-between items-start">
                          <div className="flex gap-3">
                              <img onClick={() => navigate(`/social/profile/${post.username}`)} src={post.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100 cursor-pointer" />
                              <div>
                                <h4 onClick={() => navigate(`/social/profile/${post.username}`)} className="font-bold text-slate-900 text-sm hover:underline cursor-pointer">{post.author}</h4>
                                <p className="text-xs text-slate-500">{post.role} • {post.timeAgo}</p>
                              </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20}/></button>
                        </div>
                        <div className="px-4 pb-3">
                          <p className="text-slate-800 text-sm leading-relaxed">{post.content}</p>
                        </div>
                        {post.image && <div className="w-full"><img src={post.image} className="w-full h-auto" alt="" /></div>}
                        <div className="px-4 py-3 flex justify-between items-center border-t border-slate-50">
                           <div className="flex gap-6">
                              <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-bold text-xs"><Heart size={18}/> {post.likes}</button>
                              <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold text-xs"><MessageCircle size={18}/> {post.comments}</button>
                           </div>
                           <button className="text-slate-500 hover:text-green-500"><Share2 size={18}/></button>
                        </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[84px] space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <Zap size={18} className="text-amber-500" /> Popüler Etiketler
                    </h3>
                    <div className="space-y-3">
                        {['#KombiBakimi', '#IstanbulEnerji', '#SmartHome', '#Tesisat'].map(tag => (
                          <div key={tag} className="cursor-pointer group">
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600">{tag}</h4>
                              <p className="text-[10px] text-slate-400">1.2B gönderi</p>
                          </div>
                        ))}
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors group ${active ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
     {icon}
     <span className={`text-sm font-medium ${active ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>{label}</span>
  </div>
);

const NavTab = ({ icon, active, link }: { icon: React.ReactNode, active?: boolean, link?: string }) => (
    <div className={`flex items-center justify-center w-20 h-12 rounded-lg cursor-pointer transition-all ${active ? 'text-red-600 bg-red-50' : 'text-slate-500 hover:bg-slate-100'}`}>
       {link ? <Link to={link}>{icon}</Link> : icon}
    </div>
);

const IconBtn = ({ icon, badge }: { icon: React.ReactNode, badge?: number }) => (
  <div className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center cursor-pointer text-slate-900 relative">
     {icon}
     {badge && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">{badge}</span>}
  </div>
);

export default Social;
