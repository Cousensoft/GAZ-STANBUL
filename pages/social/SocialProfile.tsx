
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  MoreHorizontal, 
  MessageCircle, 
  /* Added missing MessageSquare and Plus icons */
  MessageSquare,
  Plus,
  UserPlus, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Star, 
  Briefcase, 
  ShieldCheck, 
  ImageIcon, 
  PlayCircle,
  ArrowLeft,
  Settings,
  Mail,
  ThumbsUp,
  Activity
} from 'lucide-react';
import { WidgetCard } from '../../components/dashboard/Widgets';

const SocialProfile: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'projects' | 'about'>('posts');

    // Mock Profil Verisi
    const profile = {
        name: 'Hakan Çelik',
        username: '@hakan_celik',
        role: 'Makine Mühendisi',
        bio: 'İstanbul genelinde endüstriyel iklimlendirme ve doğalgaz projelendirme uzmanı. 15 yıllık sektörel deneyim. 🔧🏙️',
        location: 'Kadıköy, İstanbul',
        joined: 'Mayıs 2023',
        website: 'www.hakancelik.com',
        followers: '12.4K',
        following: '842',
        postsCount: 154,
        trustScore: 96,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop'
    };

    // Mock Gönderiler
    const userPosts = [
        {
            id: 1,
            content: 'Beşiktaş projemizde kaskad sistem kurulumunu bugün tamamladık. %30 enerji tasarrufu hedefliyoruz. #Mühendislik #IstanbulEnerji',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1000&auto=format&fit=crop',
            time: '2 gün önce',
            likes: 452,
            comments: 24,
            shares: 12
        },
        {
            id: 2,
            content: 'Yeni nesil akıllı termostatların entegrasyonu hakkında hazırladığım rehber yayında! Profilimdeki linkten ulaşabilirsiniz.',
            time: '5 gün önce',
            likes: 210,
            comments: 15,
            shares: 8
        }
    ];

    return (
        <div className="min-h-screen bg-[#F0F2F5] pb-20 font-sans">
            {/* Üst Navigasyon */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-4 h-14 flex items-center gap-4">
                <button onClick={() => navigate('/social')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-700" />
                </button>
                <div>
                    <h2 className="font-black text-slate-900 text-sm leading-tight">{profile.name}</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{profile.postsCount} GÖNDERİ</p>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl">
                {/* Profile Header Card */}
                <div className="bg-white border-x border-b border-slate-200 overflow-hidden rounded-b-[32px] shadow-sm mb-6">
                    {/* Banner */}
                    <div className="h-48 md:h-64 bg-slate-200 relative group">
                        <img src={profile.banner} className="w-full h-full object-cover" alt="Banner" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                    </div>

                    {/* Profile Info Area */}
                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 md:-mt-20">
                            {/* Avatar */}
                            <div className="relative inline-block">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-100">
                                    <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                                </div>
                                {profile.isVerified && (
                                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-lg">
                                        <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mb-2">
                                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-red-600 transition-all shadow-lg">Takip Et</button>
                                {/* Fixed: Added MessageSquare icon below */}
                                <button className="p-2.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all border border-slate-200"><MessageSquare size={20}/></button>
                                <button className="p-2.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all border border-slate-200"><Settings size={20}/></button>
                            </div>
                        </div>

                        {/* Name & Bio */}
                        <div className="mt-4">
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{profile.name}</h1>
                            <p className="text-slate-500 font-medium">{profile.username}</p>
                            
                            <div className="mt-4 max-w-2xl">
                                <p className="text-slate-800 text-sm md:text-base leading-relaxed">{profile.bio}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-slate-400"/> {profile.role}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400"/> {profile.location}</span>
                                <span className="flex items-center gap-1.5"><LinkIcon size={16} className="text-blue-500"/> <a href="#" className="text-blue-600 hover:underline">{profile.website}</a></span>
                                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-slate-400"/> {profile.joined} katıldı</span>
                            </div>

                            <div className="flex gap-6 mt-6 pt-6 border-t border-slate-100">
                                <button className="hover:underline"><span className="font-black text-slate-900">{profile.following}</span> <span className="text-slate-500 text-sm">Takip Edilen</span></button>
                                <button className="hover:underline"><span className="font-black text-slate-900">{profile.followers}</span> <span className="text-slate-500 text-sm">Takipçi</span></button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-t border-slate-100">
                        {['posts', 'media', 'projects', 'about'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                                    activeTab === tab ? 'text-red-600' : 'text-slate-400 hover:text-slate-700'
                                }`}
                            >
                                {tab === 'posts' ? 'Gönderiler' : tab === 'media' ? 'Medya' : tab === 'projects' ? 'Projeler' : 'Hakkında'}
                                {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-red-600 rounded-t-full"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: Main Feed */}
                    <div className="lg:col-span-8 space-y-6">
                        {activeTab === 'posts' && (
                            <div className="space-y-6 animate-fade-in">
                                {userPosts.map(post => (
                                    <WidgetCard key={post.id} className="p-0 overflow-hidden">
                                        <div className="p-4 flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <img src={profile.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-900">{profile.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{post.time} • <Globe size={10} className="inline"/></p>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><MoreHorizontal size={20}/></button>
                                        </div>
                                        <div className="px-4 pb-4">
                                            <p className="text-sm text-slate-800 leading-relaxed">{post.content}</p>
                                        </div>
                                        {post.image && (
                                            <div className="w-full bg-slate-100">
                                                <img src={post.image} className="w-full h-auto object-cover max-h-[500px]" alt="Post" />
                                            </div>
                                        )}
                                        <div className="p-4 flex items-center justify-between border-t border-slate-50">
                                            <div className="flex gap-6">
                                                <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-bold text-xs"><Heart size={18}/> {post.likes}</button>
                                                {/* Fixed: Added MessageSquare icon below */}
                                                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors font-bold text-xs"><MessageSquare size={18}/> {post.comments}</button>
                                                <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors font-bold text-xs"><Share2 size={18}/> {post.shares}</button>
                                            </div>
                                        </div>
                                    </WidgetCard>
                                ))}
                            </div>
                        )}
                        
                        {activeTab === 'media' && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 animate-fade-in">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="aspect-square bg-slate-200 rounded-lg overflow-hidden cursor-pointer group relative">
                                        <img src={`https://picsum.photos/seed/media${i}/400/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm animate-fade-in space-y-8">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">Mesleki Deneyim</h3>
                                    <p className="text-slate-600 leading-relaxed">{profile.bio} İleri derece otomasyon bilgisi ve ekip yönetimi becerilerine sahibim. Gazistanbul platformu üzerinden birçok projeyi başarıyla yönettim.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Branşlar</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Doğalgaz', 'Projelendirme', 'Mekanik Tesisat', 'Enerji Yönetimi'].map(tag => (
                                                <span key={tag} className="bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-bold">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Sertifikalar</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-green-50 p-2 rounded-lg border border-green-100"><ShieldCheck size={14} className="text-green-600"/> Gazmer Yetkili Mühendis</div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-green-50 p-2 rounded-lg border border-green-100"><ShieldCheck size={14} className="text-green-600"/> ISO 9001 Kalite Yönetimi</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar Stats & Info */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Trust Score Card */}
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Güven Skoru (Reputation)</span>
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={283} strokeDashoffset={283 - (283 * profile.trustScore) / 100} className="text-red-500" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black">{profile.trustScore}</span>
                                        <span className="text-[8px] font-bold opacity-60">SCORE</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mt-4 leading-relaxed px-4">Topluluk içindeki aktiflik ve başarılı projelerle artan prestij puanı.</p>
                            </div>
                        </div>

                        {/* Recent Activity Widget */}
                        <WidgetCard title="Sektörel Hareketler">
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Activity size={16}/></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Beşiktaş projesi için bir makale paylaştı.</p>
                                        <span className="text-[10px] text-slate-400">12 dk önce</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0"><CheckCircle2 size={16}/></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Doğalgaz projesini başarıyla teslim etti.</p>
                                        <span className="text-[10px] text-slate-400">1 saat önce</span>
                                    </div>
                                </div>
                            </div>
                        </WidgetCard>

                        {/* Suggested Follows */}
                        <WidgetCard title="Önerilen Bağlantılar">
                            <div className="space-y-4">
                                {[
                                    { name: 'Selin Yıldız', role: 'Mimar', avatar: 'SY' },
                                    { name: 'Tekno Isı', role: 'Firma', avatar: 'TI' }
                                ].map((person, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 border border-slate-200">{person.avatar}</div>
                                            <div>
                                                <h5 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">{person.name}</h5>
                                                <p className="text-[10px] text-slate-500">{person.role}</p>
                                            </div>
                                        </div>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><UserPlus size={16}/></button>
                                    </div>
                                ))}
                            </div>
                        </WidgetCard>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            {/* Fixed: Added missing Plus icon below */}
            <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all z-50 group">
                <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>
    );
};

const Globe = ({ size, className }: { size: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export default SocialProfile;
