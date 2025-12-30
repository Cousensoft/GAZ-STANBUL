
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronDown
} from 'lucide-react';

// --- MOCK DATA FOR SOCIAL UI ---
const STORIES = [
  { id: 1, user: 'Hikayen', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', isUser: true },
  { id: 2, user: 'Atlas Tesisat', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=200&auto=format&fit=crop' },
  { id: 3, user: 'Mehmet Yılmaz', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop' },
  { id: 4, user: 'Kombi Dünyası', img: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?q=80&w=200&auto=format&fit=crop' },
  { id: 5, user: 'Ayşe Demir', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
];

const POSTS = [
  {
    id: 1,
    author: 'Mehmet Yılmaz',
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
    role: 'Kurumsal Üye',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    content: '📢 Kış kampanyamız başladı! Kombi bakımında %20 indirim fırsatını kaçırmayın. Randevu için profilimizdeki butonu kullanabilirsiniz.',
    timeAgo: '5 saat önce',
    likes: 89,
    comments: 42,
    shares: 12,
  },
  {
    id: 3,
    author: 'Ahmet Tekin',
    role: 'Usta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    content: 'Dün akşamki su kaçağı tespitinden bir kare. Termal kamera ile nokta atışı tespit yaptık. Teknoloji işimizi çok kolaylaştırıyor.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '1 gün önce',
    likes: 256,
    comments: 34,
    shares: 2,
  }
];

const TRENDS = [
  { tag: '#DoğalgazZammı', posts: '12B gönderi' },
  { tag: '#KentselDönüşüm', posts: '8.5B gönderi' },
  { tag: '#GüneşEnerjisi', posts: '5B gönderi' },
  { tag: '#UstaArıyorum', posts: '2.1B gönderi' },
];

const PRO_MEMBERS = [
  { name: 'Tekno Yapı A.Ş.', role: 'İnşaat', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200&auto=format&fit=crop', verified: true },
  { name: 'Dr. Selin Yılmaz', role: 'Mimar', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop', verified: true },
  { name: 'Emre Elektrik', role: 'Elektrikçi', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', verified: false },
];

const ONLINE_USERS = [
  { name: 'Caner Erkin', status: 'online', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Merve Boluğur', status: 'online', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
  { name: 'Murat Boz', status: 'online', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
  { name: 'Hadise Açıkgöz', status: 'idle', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop' },
];

const RECENT_ACTIVITIES = [
  { user: 'Ahmet K.', action: 'yeni bir iş ilanı paylaştı.', time: '5dk önce', icon: Briefcase },
  { user: 'Selin Y.', action: 'profil fotoğrafını güncelledi.', time: '12dk önce', icon: ImageIcon },
  { user: 'Tekno A.Ş.', action: 'bir etkinliğe katılıyor.', time: '1saat önce', icon: Calendar },
];

const Social: React.FC = () => {
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
           <div className="md:hidden w-10 h-10 bg-[#F0F2F5] rounded-full flex items-center justify-center text-slate-600">
              <Search size={20} />
           </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center gap-1 md:w-2/4">
            <NavTab icon={<Home size={24} />} active={true} />
            <NavTab icon={<MonitorPlay size={24} />} />
            <NavTab icon={<Store size={24} />} link="/market" />
            <NavTab icon={<Users size={24} />} />
            <NavTab icon={<Menu size={24} className="lg:hidden" />} />
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center justify-end gap-2 md:gap-3 md:w-1/4">
           
           <button className="hidden lg:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors">
              <Plus size={18} /> <span>Oluştur</span>
           </button>

           <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block"></div>

           <div className="flex gap-2">
             <IconBtn icon={<UserPlus size={20} />} />
             <IconBtn icon={<MessageCircle size={20} />} />
             <IconBtn icon={<Bell size={20} />} badge={3} />
           </div>

           <div className="ml-1 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-red-500 transition-colors"
              />
           </div>
        </div>

      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* --- LEFT SIDEBAR (Navigation & Profile) --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[84px] space-y-4">
                  
                  {/* Profile Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-slate-100 group-hover:border-red-500 transition-colors" alt="Profile" />
                    <div>
                        <h3 className="font-bold text-slate-900 text-sm">Hakan Çelik</h3>
                        <p className="text-xs text-slate-500">Proje Müdürü</p>
                    </div>
                  </div>

                  {/* Navigation Menu */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <nav className="flex flex-col p-2 space-y-1">
                        <MenuItem icon={<Layout size={20} className="text-blue-500"/>} label="Haber Kaynağı" active />
                        <MenuItem icon={<Users size={20} className="text-blue-500"/>} label="Arkadaşlar" />
                        <MenuItem icon={<Bookmark size={20} className="text-purple-600 fill-purple-600"/>} label="Kaydedilenler" />
                        <MenuItem icon={<Users size={20} className="text-blue-500 fill-blue-500"/>} label="Gruplar" />
                        <MenuItem icon={<ShoppingBag size={20} className="text-blue-500"/>} label="Marketplace" />
                        <MenuItem icon={<PlayCircle size={20} className="text-blue-500"/>} label="Watch" />
                        <MenuItem icon={<History size={20} className="text-blue-500"/>} label="Anılar" />
                        
                        <div className="my-2 border-t border-slate-100"></div>
                        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profesyonel</div>
                        
                        <MenuItem icon={<Briefcase size={20} className="text-amber-600"/>} label="İş İlanları" />
                        <MenuItem icon={<MapPin size={20} className="text-red-500"/>} label="Yakındaki Ustalar" />
                        <MenuItem icon={<Calendar size={20} className="text-red-500"/>} label="Etkinlikler" />
                        <MenuItem icon={<Globe size={20} className="text-cyan-500"/>} label="Sektörel Haberler" />
                        
                        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors w-full text-left">
                            <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
                                <ChevronDown size={14} className="text-slate-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Daha Fazla Göster</span>
                        </button>
                    </nav>
                  </div>

                  {/* Shortcuts / Your Pages */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="text-slate-500 font-bold text-xs uppercase mb-3 px-2">Kısayollarım</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">GE</div>
                          <span className="text-sm font-medium text-slate-700">Gaz Enerji Grubu</span>
                        </li>
                        <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">MT</div>
                          <span className="text-sm font-medium text-slate-700">Mekanik Tesisatçılar</span>
                        </li>
                         <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">YD</div>
                          <span className="text-sm font-medium text-slate-700">Yedek Parça Pazarı</span>
                        </li>
                    </ul>
                  </div>

              </div>
            </div>

            {/* --- CENTER FEED --- */}
            <div className="col-span-1 lg:col-span-6 space-y-6">
              
              {/* Stories Reel */}
              <div className="relative bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
                    {STORIES.map((story) => (
                        <div key={story.id} className="flex-shrink-0 w-20 flex flex-col items-center gap-2 cursor-pointer snap-start group">
                          <div className={`w-16 h-16 rounded-full p-0.5 ${story.isUser ? 'border-2 border-slate-200' : 'border-2 border-red-500'}`}>
                              <img src={story.img} className="w-full h-full rounded-full object-cover border-2 border-white" alt={story.user} />
                              {story.isUser && (
                                <div className="absolute bottom-8 right-1 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white">
                                    <UserPlus size={12} />
                                </div>
                              )}
                          </div>
                          <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center group-hover:text-red-600 transition-colors">
                              {story.user}
                          </span>
                        </div>
                    ))}
                  </div>
              </div>

              {/* Create Post */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex gap-3 mb-4">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="User" />
                    <div className="flex-1 bg-slate-100 rounded-full px-4 flex items-center hover:bg-slate-200 transition-colors cursor-pointer">
                        <span className="text-slate-500 text-sm font-medium">Ne düşünüyorsun, Hakan?</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between px-2">
                    <ActionButton icon={<ImageIcon size={20} className="text-green-500"/>} label="Fotoğraf/Video" />
                    <ActionButton icon={<Video size={20} className="text-red-500"/>} label="Canlı Yayın" />
                    <ActionButton icon={<Calendar size={20} className="text-amber-500"/>} label="Etkinlik" />
                  </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                  {POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Post Header */}
                        <div className="p-4 flex justify-between items-start">
                          <div className="flex gap-3">
                              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm hover:underline cursor-pointer">{post.author}</h4>
                                <p className="text-xs text-slate-500">{post.role} • {post.timeAgo} • <Globe size={10} className="inline"/></p>
                              </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50"><MoreHorizontal size={20}/></button>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-3">
                          <p className="text-slate-800 text-sm whitespace-pre-line leading-relaxed">{post.content}</p>
                        </div>

                        {/* Post Image */}
                        {post.image && (
                          <div className="w-full bg-slate-100 cursor-pointer">
                              <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                          </div>
                        )}

                        {/* Post Stats */}
                        <div className="px-4 py-3 flex justify-between items-center border-b border-slate-50">
                          <div className="flex items-center gap-1">
                              <div className="flex -space-x-1">
                                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white"><Heart size={8} className="text-white fill-white"/></div>
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white"><ThumbsUp size={8} className="text-white fill-white"/></div>
                              </div>
                              <span className="text-xs text-slate-500 ml-1 hover:underline cursor-pointer">{post.likes}</span>
                          </div>
                          <div className="flex gap-3 text-xs text-slate-500">
                              <span className="hover:underline cursor-pointer">{post.comments} Yorum</span>
                              <span className="hover:underline cursor-pointer">{post.shares} Paylaşım</span>
                          </div>
                        </div>

                        {/* Post Actions */}
                        <div className="px-2 py-1 flex justify-between items-center">
                          <PostAction icon={<ThumbsUp size={18} />} label="Beğen" />
                          <PostAction icon={<MessageCircle size={18} />} label="Yorum Yap" />
                          <PostAction icon={<Share2 size={18} />} label="Paylaş" />
                        </div>
                    </div>
                  ))}

                  {/* Loading State / End of Feed */}
                  <div className="flex justify-center py-4">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
                  </div>
              </div>

            </div>

            {/* --- RIGHT SIDEBAR (Widgets) --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[84px] space-y-6">

                  {/* 1. Professional Members */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Zap size={18} className="text-amber-500" /> Profesyonel Üyeler
                        </h3>
                        <a href="#" className="text-xs font-bold text-cyan-600 hover:underline">Tümü</a>
                    </div>
                    <div className="space-y-4">
                        {PRO_MEMBERS.map((person, i) => (
                          <div key={i} className="flex items-center gap-3 group cursor-pointer">
                              <div className="relative">
                                <img src={person.img} className="w-10 h-10 rounded-full object-cover border border-slate-100" alt={person.name} />
                                {person.verified && (
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                      <CheckCircle2 size={12} className="text-blue-500 fill-white" />
                                    </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-cyan-600 transition-colors">{person.name}</h4>
                                <p className="text-xs text-slate-500 truncate">{person.role}</p>
                              </div>
                              <button className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                                <UserPlus size={16} />
                              </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  {/* 2. Trending Topics */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
                        Gündem
                        <MoreHorizontal size={16} className="text-slate-400 cursor-pointer" />
                    </h3>
                    <div className="space-y-4">
                        {TRENDS.map((trend, i) => (
                          <div key={i} className="cursor-pointer group">
                              <p className="text-xs text-slate-400 font-medium">Türkiye tarihinde gündemde</p>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">{trend.tag}</h4>
                              <p className="text-xs text-slate-500">{trend.posts}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* 3. Invite Friend */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
                          <Gift size={20} className="text-white" />
                        </div>
                        <h4 className="font-bold text-lg mb-1">Arkadaşını Davet Et</h4>
                        <p className="text-indigo-100 text-xs mb-3">Sektördeki tanıdıklarını davet et, ağını genişlet.</p>
                        <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                          Davet Gönder
                        </button>
                    </div>
                  </div>

                  {/* 4. Recent Activities */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-red-500" /> Son Aktiviteler
                    </h3>
                    <div className="space-y-4 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                        
                        {RECENT_ACTIVITIES.map((act, i) => {
                          const Icon = act.icon;
                          return (
                              <div key={i} className="flex gap-3 relative z-10">
                                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                                    <Icon size={12} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-600 leading-snug">
                                      <span className="font-bold text-slate-900 hover:underline cursor-pointer">{act.user}</span> {act.action}
                                    </p>
                                    <span className="text-[10px] text-slate-400">{act.time}</span>
                                </div>
                              </div>
                          )
                        })}
                    </div>
                  </div>

                  {/* 5. Online Users */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Çevrimiçi
                        </h3>
                        <div className="flex gap-1">
                          <button className="text-slate-400 hover:text-slate-600"><Search size={14}/></button>
                          <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={14}/></button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {ONLINE_USERS.map((user, i) => (
                          <div key={i} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                              <div className="relative">
                                <img src={user.img} className="w-9 h-9 rounded-full object-cover" alt={user.name} />
                                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                              </div>
                              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{user.name}</span>
                          </div>
                        ))}
                    </div>
                    {/* Chat Input Placeholder */}
                    <div className="mt-4 pt-3 border-t border-slate-50">
                        <div className="flex items-center bg-slate-50 rounded-full px-3 py-1.5 border border-slate-100">
                          <input type="text" placeholder="Mesaj gönder..." className="bg-transparent text-xs w-full outline-none text-slate-600 placeholder-slate-400" />
                          <Send size={12} className="text-slate-400 hover:text-blue-500 cursor-pointer" />
                        </div>
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-2 gap-y-1 px-2">
                    <a href="#" className="hover:underline">Gizlilik</a>
                    <span>•</span>
                    <a href="#" className="hover:underline">Koşullar</a>
                    <span>•</span>
                    <a href="#" className="hover:underline">Reklam</a>
                    <span>•</span>
                    <a href="#" className="hover:underline">Çerezler</a>
                    <span>•</span>
                    <span>Gazistanbul © 2024</span>
                  </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const MenuItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors group ${active ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
     {icon}
     <span className={`text-sm font-medium ${active ? 'text-slate-900 font-bold' : 'text-slate-700 group-hover:text-slate-900'}`}>{label}</span>
  </div>
);

const ActionButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
   <button className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors flex-1 justify-center">
      {icon}
      <span className="text-sm font-medium text-slate-600 hidden sm:inline">{label}</span>
   </button>
);

const PostAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
   <button className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors flex-1">
      {icon}
      <span className="text-sm font-medium">{label}</span>
   </button>
);

const NavTab = ({ icon, active, link, className }: { icon: React.ReactNode, active?: boolean, link?: string, className?: string }) => {
  const content = (
    <div className={`
      flex items-center justify-center w-full h-full md:w-24 md:h-12 md:rounded-lg cursor-pointer transition-all relative
      ${active 
        ? 'text-red-600 md:bg-red-50' 
        : 'text-slate-500 hover:bg-slate-100'}
      ${className}
    `}>
       {icon}
       {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 md:hidden"></div>}
    </div>
  );

  return link ? <Link to={link} className="h-full flex items-center">{content}</Link> : <div className="h-full flex items-center">{content}</div>;
};

const IconBtn = ({ icon, badge }: { icon: React.ReactNode, badge?: number }) => (
  <div className="w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center cursor-pointer text-slate-900 relative transition-colors">
     {icon}
     {badge && (
       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
          {badge}
       </span>
     )}
  </div>
);

export default Social;
