import React, { useState } from 'react';
import { 
    Search, 
    MoreVertical, 
    MessageCircle, 
    Heart, 
    Share2, 
    Eye, 
    Filter, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    Zap, 
    Pin, 
    ShieldAlert, 
    UserMinus, 
    ChevronDown, 
    ChevronRight,
    AlertTriangle,
    Image as ImageIcon,
    Video,
    BarChart3,
    Clock,
    UserCheck,
    Lock,
    ExternalLink,
    X,
    ThumbsUp,
    Send,
    BellRing,
    ShieldOff
} from 'lucide-react';

interface Post {
    id: number;
    author: string;
    authorRole: string;
    type: 'IMAGE' | 'TEXT' | 'VIDEO' | 'POLL' | 'JOB';
    content: string;
    stats: { likes: number; comments: number; shares: number; views: number };
    status: 'approved' | 'pending' | 'flagged' | 'draft' | 'restricted';
    date: string;
    img?: string;
    reports?: number;
    reportReason?: string;
    isWarned?: boolean;
}

const SocialContent = () => {
    const [viewMode, setViewMode] = useState<'all' | 'flagged' | 'popular' | 'pending'>('all');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState<{ show: boolean, message: string, type: 'success' | 'warning' | 'error' } | null>(null);

    const [posts, setPosts] = useState<Post[]>([
        { id: 1, author: 'Mehmet Yılmaz', authorRole: 'Mühendis', type: 'IMAGE', content: 'Kadıköy şantiyesinde kombi montajı bitti. #usta #istanbul', stats: { likes: 124, comments: 12, shares: 5, views: 1250 }, status: 'approved', date: '2 saat önce', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=300&auto=format&fit=crop' },
        { id: 2, author: 'Hızlı Tesisat', authorRole: 'Kurumsal', type: 'JOB', content: 'Deneyimli doğalgaz kaynak ustası aranıyor. Maaş + SGK + Prim.', stats: { likes: 12, comments: 4, shares: 25, views: 3200 }, status: 'approved', date: '5 saat önce' },
        { id: 3, author: 'Saldırgan_Kullanıcı', authorRole: 'Bireysel', type: 'TEXT', content: 'Bu sektörde herkes hırsız olmuş, hiçbir usta işini bilmiyor!!', stats: { likes: 0, comments: 45, shares: 0, views: 850 }, status: 'flagged', date: '10 dk önce', reports: 12, reportReason: 'Nefret Söylemi' },
        { id: 4, author: 'Caner Erkin', authorRole: 'Bireysel', type: 'VIDEO', content: 'Yeni akıllı ev sistemi incelemesi. Çok pratik!', stats: { likes: 850, comments: 120, shares: 45, views: 15400 }, status: 'pending', date: '1 saat önce', img: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=300&auto=format&fit=crop' },
        { id: 5, author: 'Spam_Bot_99', authorRole: 'Bireysel', type: 'TEXT', content: 'Bedava 500 TL hediye çeki için hemen tıkla: bit.ly/spam-link', stats: { likes: 0, comments: 0, shares: 0, views: 120 }, status: 'flagged', date: '30 dk önce', reports: 5, reportReason: 'Spam / Dolandırıcılık' },
    ]);

    const showToast = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const filteredPosts = posts.filter(p => {
        if (viewMode === 'flagged') return p.status === 'flagged';
        if (viewMode === 'pending') return p.status === 'pending';
        if (viewMode === 'popular') return p.stats.likes > 200;
        return true;
    }).filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAction = (id: number, newStatus: Post['status']) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        if(selectedPost?.id === id) setSelectedPost(prev => prev ? { ...prev, status: newStatus } : null);
        
        let msg = "İşlem başarıyla tamamlandı.";
        if(newStatus === 'approved') msg = "İçerik onaylandı ve yayına alındı.";
        if(newStatus === 'draft') msg = "İçerik taslağa çekildi.";
        if(newStatus === 'restricted') msg = "İçerik erişime kısıtlandı.";
        showToast(msg);
    };

    const handleWarnUser = (id: number) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, isWarned: true } : p));
        if(selectedPost?.id === id) setSelectedPost(prev => prev ? { ...prev, isWarned: true } : null);
        showToast(`${selectedPost?.author} kullanıcısına resmi uyarı gönderildi.`, 'warning');
    };

    const handleRestrictUser = (id: number) => {
        handleAction(id, 'restricted');
        showToast(`${selectedPost?.author} kullanıcısının platform erişimi kısıtlandı.`, 'error');
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-50 text-green-700 border-green-100';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'flagged': return 'bg-red-50 text-red-700 border-red-100';
            case 'restricted': return 'bg-slate-900 text-white border-slate-800';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-24 right-8 z-[100] animate-fade-in-up">
                    <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
                        notification.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' :
                        notification.type === 'warning' ? 'bg-amber-500 border-amber-400 text-white' :
                        'bg-slate-900 border-slate-800 text-white'
                    }`}>
                        {notification.type === 'success' ? <CheckCircle size={20}/> : <AlertTriangle size={20}/>}
                        <span className="font-bold text-sm">{notification.message}</span>
                    </div>
                </div>
            )}

            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {[
                        { id: 'all', label: 'Tümü' },
                        { id: 'flagged', label: 'Şikayetli', count: posts.filter(p => p.status === 'flagged').length },
                        { id: 'pending', label: 'İnceleme', count: posts.filter(p => p.status === 'pending').length },
                        { id: 'popular', label: 'Popüler' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setViewMode(tab.id as any)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                                viewMode === tab.id 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${viewMode === tab.id ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="İçerik veya yazar ara..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-slate-900" 
                        />
                    </div>
                    <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100"><Filter size={18}/></button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden relative">
                
                {/* List View */}
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedPost ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-[10px] font-bold text-slate-500 uppercase">
                                <tr>
                                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Yazar & İçerik</th>
                                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Etkileşim</th>
                                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Durum</th>
                                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredPosts.map(post => (
                                    <tr 
                                        key={post.id} 
                                        onClick={() => setSelectedPost(post)}
                                        className={`group hover:bg-slate-50 transition-colors cursor-pointer ${selectedPost?.id === post.id ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <td className="p-4">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                                    <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <h4 className="font-bold text-slate-900 text-sm truncate">{post.author}</h4>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{post.authorRole}</span>
                                                        {/* Fixed: Moved title to a span because Lucide icons do not support title prop */}
                                                        {post.isWarned && <span title="Uyarılmış Kullanıcı"><BellRing size={12} className="text-amber-500" /></span>}
                                                    </div>
                                                    <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{post.content}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] text-slate-400 flex items-center gap-1"><Clock size={10}/> {post.date}</span>
                                                        <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase ${
                                                            post.type === 'VIDEO' ? 'bg-red-100 text-red-600' : 
                                                            post.type === 'JOB' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            {post.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-center">
                                                    <span className="block text-xs font-bold text-slate-700">{post.stats.likes}</span>
                                                    <span className="text-[9px] text-slate-400 uppercase">Beğeni</span>
                                                </div>
                                                <div className="text-center">
                                                    <span className="block text-xs font-bold text-slate-700">{post.stats.comments}</span>
                                                    <span className="text-[9px] text-slate-400 uppercase">Yorum</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getStatusStyle(post.status)}`}>
                                                {post.status === 'approved' ? 'Yayında' : post.status === 'pending' ? 'İnceleniyor' : post.status === 'restricted' ? 'Kısıtlı' : 'Şikayetli'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all">
                                                <ChevronRight size={16}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredPosts.length === 0 && (
                            <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                                <Search size={48} className="mb-4 opacity-20"/>
                                <p className="font-bold">Aramanızla eşleşen içerik bulunamadı.</p>
                                <button onClick={() => setViewMode('all')} className="text-xs text-blue-600 mt-2 hover:underline">Tümünü Göster</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Detail View Panel */}
                {selectedPost && (
                    <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-1/3 bg-white rounded-2xl border border-slate-200 shadow-xl lg:shadow-sm z-30 flex flex-col overflow-hidden animate-slide-in-right">
                        
                        {/* Panel Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Eye size={18} className="text-blue-600"/> İçerik Detayı
                            </h3>
                            <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><X size={20}/></button>
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                            
                            {/* Author & Media Preview */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                        <img src={`https://ui-avatars.com/api/?name=${selectedPost.author}&background=random`} className="w-full h-full" alt=""/>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">{selectedPost.author}</h4>
                                            {selectedPost.isWarned && <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[8px] font-black uppercase">Uyarılı</span>}
                                        </div>
                                        <p className="text-xs text-slate-500">{selectedPost.authorRole} • {selectedPost.date}</p>
                                    </div>
                                    <button className="ml-auto p-2 text-slate-400 hover:text-slate-900"><ExternalLink size={18}/></button>
                                </div>

                                {selectedPost.img && (
                                    <div className="relative group rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 mb-4 cursor-zoom-in">
                                        <img src={selectedPost.img} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" alt="Preview"/>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">Görseli Büyüt</span>
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed italic">
                                    "{selectedPost.content}"
                                </div>
                            </div>

                            {/* Reports & Safety Info */}
                            {selectedPost.status === 'flagged' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl animate-pulse">
                                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs mb-2">
                                        <AlertTriangle size={14}/> Topluluk Şikayeti Mevcut
                                    </div>
                                    <p className="text-xs text-red-600 mb-1"><b>{selectedPost.reports} kullanıcı</b> tarafından raporlandı.</p>
                                    <p className="text-xs text-red-500 font-medium">Gerekçe: {selectedPost.reportReason}</p>
                                </div>
                            )}

                            {/* Engagement Breakdown */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 px-1 mb-3">
                                    <BarChart3 size={14}/> Etkileşim Analizi
                                </h4>
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="text-center p-2 rounded-lg bg-slate-50"><span className="block text-sm font-bold text-slate-900">{selectedPost.stats.views}</span><span className="text-[8px] text-slate-400 uppercase">Erişim</span></div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50"><span className="block text-sm font-bold text-slate-900">{selectedPost.stats.likes}</span><span className="text-[8px] text-slate-400 uppercase">Beğeni</span></div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50"><span className="block text-sm font-bold text-slate-900">{selectedPost.stats.comments}</span><span className="text-[8px] text-slate-400 uppercase">Yorum</span></div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50"><span className="block text-sm font-bold text-slate-900">{selectedPost.stats.shares}</span><span className="text-[8px] text-slate-400 uppercase">Paylaşım</span></div>
                                </div>
                            </div>

                            {/* Moderator Actions Section */}
                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                
                                {/* Content Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedPost.status !== 'approved' && (
                                        <button 
                                            onClick={() => handleAction(selectedPost.id, 'approved')}
                                            className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                                        >
                                            <CheckCircle size={16}/> Onayla
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleAction(selectedPost.id, 'draft')}
                                        className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                                    >
                                        <Lock size={16}/> Taslağa Al
                                    </button>
                                    {selectedPost.status === 'approved' && (
                                        <button className="flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all shadow-lg shadow-amber-200">
                                            <Zap size={16}/> Öne Çıkar
                                        </button>
                                    )}
                                    <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                                        <Pin size={16}/> Sabitle
                                    </button>
                                </div>

                                <div className="h-px bg-slate-100 my-2"></div>

                                {/* User Punishment Actions */}
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => handleWarnUser(selectedPost.id)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors group border border-amber-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <BellRing size={18}/>
                                            <span className="font-bold text-xs">Kullanıcıyı Uyar</span>
                                        </div>
                                        <ChevronRight size={14} className="text-amber-300"/>
                                    </button>
                                    <button 
                                        onClick={() => handleRestrictUser(selectedPost.id)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ShieldOff size={18}/>
                                            <span className="font-bold text-xs">Erişimini Kısıtla</span>
                                        </div>
                                        <Lock size={14} className="text-red-300"/>
                                    </button>
                                    <button 
                                        onClick={() => { if(confirm('Bu içeriği kalıcı olarak silmek istediğinize emin misiniz?')) handleAction(selectedPost.id, 'draft') }}
                                        className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider hover:underline mt-2"
                                    >
                                        <Trash2 size={14}/> İçeriği Kalıcı Olarak Sil
                                    </button>
                                </div>

                            </div>

                        </div>
                        
                        {/* Footer Notification Area */}
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <UserCheck size={16} className="text-blue-400"/>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontrol Merkezi Aktif</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">POST_ID: {selectedPost.id}</span>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default SocialContent;