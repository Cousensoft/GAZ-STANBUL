
import React, { useState } from 'react';
import { 
    Zap, 
    FileText, 
    Hammer, 
    CheckCircle, 
    Calendar, 
    MapPin, 
    Phone, 
    MessageSquare, 
    Activity, 
    ChevronRight,
    ChevronLeft, 
    Clock, 
    LayoutGrid, 
    List,
    X,
    Search,
    TrendingUp,
    ThumbsUp,
    PieChart,
    Target,
    MoreVertical,
    Ban,
    Trash2,
    ShieldAlert,
    Lock,
    Globe,
    Building2,
    Image as ImageIcon,
    PlayCircle,
    Maximize2
} from 'lucide-react';
import { CircularProgress } from '../../../components/dashboard/Widgets';
import { MOCK_REQUESTS } from '../../../utils/constants'; // Medya verisi için

const RequestManager = () => {
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
    const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'proposals' | 'ongoing' | 'completed'>('all');
    const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
    
    // Medya Lightbox State - Index tabanlı
    const [lightboxMediaIndex, setLightboxMediaIndex] = useState<number | null>(null);
    const [lightboxMediaArray, setLightboxMediaArray] = useState<any[] | null>(null);

    // Talepler Listesi - Genel ve Özel ayrımı eklendi
    const [requests] = useState([
        { 
            id: 'REQ-1042', 
            user: 'Ahmet Yılmaz', 
            avatar: 'AY', 
            category: 'Kombi Bakımı', 
            status: 'new', 
            date: '10 dk önce', 
            location: 'Kadıköy', 
            type: 'public', 
            description: 'Kombi su akıtıyor, acil bakım gerekli.' 
        },
        { 
            id: 'REQ-1041', 
            user: 'Selin Demir', 
            avatar: 'SD', 
            category: 'Elektrik Tesisatı', 
            status: 'proposals', 
            date: '2 saat önce', 
            location: 'Beşiktaş', 
            type: 'private', 
            targetCompanyName: 'Bosphorus Enerji',
            description: 'Tüm daire elektrik tesisatı yenilenecek.', 
            proposals: 1 
        },
        { 
            id: 'REQ-1040', 
            user: 'Mehmet Öz', 
            avatar: 'MÖ', 
            category: 'Akıllı Ev', 
            status: 'ongoing', 
            date: '1 gün önce', 
            location: 'Ataşehir', 
            type: 'public', 
            description: 'Otomasyon sistemi kurulumu başlatıldı.', 
            company: 'TechIstanbul' 
        },
        { 
            id: 'REQ-1039', 
            user: 'Caner Erkin', 
            avatar: 'CE', 
            category: 'Doğalgaz Proje', 
            status: 'completed', 
            date: '3 gün önce', 
            location: 'Üsküdar', 
            type: 'private', 
            targetCompanyName: 'Galata Mekanik',
            description: 'İGDAŞ proje onayı alındı.', 
            company: 'Galata Mekanik' 
        },
    ]);

    const filteredRequests = requests.filter(r => {
        const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
        const matchesType = filterType === 'all' || (filterType === 'public' ? r.type === 'public' : r.type === 'private');
        return matchesStatus && matchesType;
    });

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'new': return <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-red-100 text-red-600 flex items-center gap-1"><Zap size={10}/> Yeni</span>;
            case 'proposals': return <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-100 text-blue-600 flex items-center gap-1"><FileText size={10}/> Teklifte</span>;
            case 'ongoing': return <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-600 flex items-center gap-1"><Hammer size={10}/> İşlemde</span>;
            case 'completed': return <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-green-100 text-green-600 flex items-center gap-1"><CheckCircle size={10}/> Bitti</span>;
            default: return null;
        }
    };

    const getTypeBadge = (type: string) => {
        if (type === 'private') {
            return <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-purple-100 text-purple-700 flex items-center gap-1 border border-purple-200 uppercase tracking-tighter"><Lock size={10}/> Özel</span>;
        }
        return <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-slate-100 text-slate-600 flex items-center gap-1 border border-slate-200 uppercase tracking-tighter"><Globe size={10}/> Genel</span>;
    };
    
    // --- GALERİ NAVİGASYONU ---
    const handleNextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxMediaIndex !== null && lightboxMediaArray) {
            setLightboxMediaIndex((prev) => (prev! + 1) % lightboxMediaArray.length);
        }
    };

    const handlePrevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxMediaIndex !== null && lightboxMediaArray) {
            setLightboxMediaIndex((prev) => (prev! - 1 + lightboxMediaArray.length) % lightboxMediaArray.length);
        }
    };

    const RequestDetail = ({ req, onClose }: { req: any, onClose: () => void }) => {
        const [showActions, setShowActions] = useState(false);
        // Admin panelindeki mock veriyi MOCK_REQUESTS ile eşleştirerek medya verisini bulmaya çalışıyoruz
        // Gerçekte API'den full detay gelir.
        const fullRequestData = MOCK_REQUESTS.find(r => r.id === 'REQ-101' || r.id === 'REQ-102') || MOCK_REQUESTS[0]; // Demo purpose: fallback to a request with media

        const handleAction = (action: string) => {
            alert(`${req.id} için işlem: ${action}`);
            setShowActions(false);
        };
        
        const openLightbox = (index: number) => {
            if (fullRequestData && fullRequestData.media) {
                setLightboxMediaArray(fullRequestData.media);
                setLightboxMediaIndex(index);
            }
        };

        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in h-full flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-slate-900">{req.category}</h2>
                            {getStatusBadge(req.status)}
                        </div>
                        <div className="flex items-center gap-2">
                            {getTypeBadge(req.type)}
                            <span className="text-[10px] text-slate-400 font-black uppercase">#{req.id}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"><X size={18} className="text-slate-400"/></button>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                    {/* Eğer Özel Talep ise Hedef Firma Kartı */}
                    {req.type === 'private' && (
                        <div className="mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-100 ring-4 ring-purple-500/5">
                            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Lock size={12}/> Hedef Firma (Özel)
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600 border border-purple-100">
                                    <Building2 size={18}/>
                                </div>
                                <span className="text-sm font-black text-purple-900">{req.targetCompanyName}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">{req.avatar}</div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">{req.user}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Bireysel Müşteri • {req.date}</p>
                            <div className="flex gap-2 mt-2">
                                <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 hover:bg-slate-50"><Phone size={10}/> Ara</button>
                                <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 hover:bg-slate-50"><MessageSquare size={10}/> Mesaj</button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Açıklama</h4>
                            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed italic">
                                "{req.description}"
                            </p>
                        </div>

                         {/* --- MEDYA GALERİSİ ALANI (ADMIN) --- */}
                         {fullRequestData && fullRequestData.media && fullRequestData.media.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2 px-1">
                                    <ImageIcon size={12} /> Ekli Medya (Denetim)
                                </h4>
                                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                                    {fullRequestData.media.map((item: any, idx: number) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => openLightbox(idx)}
                                            className="relative flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer group"
                                        >
                                            <img src={item.type === 'video' ? item.thumbnail : item.url} alt="Media" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <PlayCircle size={20} className="text-white drop-shadow-md" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl border border-slate-100 bg-white">
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter block mb-1">Konum</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900"><MapPin size={12} className="text-red-500"/> {req.location}</span>
                            </div>
                            <div className="p-3 rounded-xl border border-slate-100 bg-white">
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter block mb-1">Kategori</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900"><Activity size={12} className="text-blue-500"/> {req.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 relative bg-slate-50/50">
                    {showActions && (
                        <div className="absolute bottom-16 left-4 right-4 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                            <button onClick={() => handleAction('Dondur')} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-50"><Ban size={14} className="text-slate-400"/> İşlemi Durdur</button>
                            <button onClick={() => handleAction('Risk')} className="w-full text-left px-4 py-3 text-xs font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-2 border-b border-slate-50"><ShieldAlert size={14}/> Risk Bildir</button>
                            <button onClick={() => handleAction('Sil')} className="w-full text-left px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14}/> Talebi Sil</button>
                        </div>
                    )}
                    <button 
                        onClick={() => setShowActions(!showActions)}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <MoreVertical size={16}/> Yönetim Menüsü
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* LIGHTBOX FOR MEDIA */}
            {lightboxMediaIndex !== null && lightboxMediaArray && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setLightboxMediaIndex(null)}>
                    <button className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[210]" onClick={() => setLightboxMediaIndex(null)}>
                        <X size={32} />
                    </button>

                    {/* Navigation Buttons */}
                    {lightboxMediaArray.length > 1 && (
                        <>
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[210]" onClick={handlePrevMedia}>
                                <ChevronLeft size={40} />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[210]" onClick={handleNextMedia}>
                                <ChevronRight size={40} />
                            </button>
                        </>
                    )}

                    <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                        {lightboxMediaArray[lightboxMediaIndex].type === 'video' ? (
                            <video 
                                src={lightboxMediaArray[lightboxMediaIndex].url} 
                                controls 
                                autoPlay 
                                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl outline-none" 
                            />
                        ) : (
                            <img 
                                src={lightboxMediaArray[lightboxMediaIndex].url} 
                                alt="Detail" 
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
                            />
                        )}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md text-white text-sm font-bold pointer-events-none">
                             {lightboxMediaIndex + 1} / {lightboxMediaArray.length}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-6 shrink-0">
                <div className="flex justify-between items-center bg-white p-4 rounded-[24px] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 pl-2">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-900/10">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Talep Operasyonları</h2>
                            <p className="text-xs text-slate-500 font-medium">Genel Havuz ve Özel Taleplerin Yönetimi</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}><List size={18}/></button>
                        <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={18}/></button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-red-200 transition-colors">
                        <div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Açık Talepler</span><div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-black text-slate-900">{requests.length}</span></div></div>
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600"><FileText size={24} /></div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-purple-200 transition-colors">
                        <div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Özel Talepler</span><div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-black text-slate-900">{requests.filter(r => r.type === 'private').length}</span></div></div>
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600"><Lock size={24} /></div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                        <div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Başarı Oranı</span><div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-black text-slate-900">%94</span></div></div>
                        <div className="w-16 h-16"><CircularProgress percentage={94} color="#3b82f6" size="w-full h-full" textSize="text-xs" /></div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-green-200 transition-colors">
                        <div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tamamlanan</span><div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-black text-slate-900">124</span></div></div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><CheckCircle size={24} /></div>
                    </div>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-auto pb-2">
                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
                        {['all', 'new', 'proposals', 'ongoing', 'completed'].map(status => (
                            <button key={status} onClick={() => setFilterStatus(status as any)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>{status === 'all' ? 'Tümü' : status === 'new' ? 'Yeni' : status === 'proposals' ? 'Teklifte' : status === 'ongoing' ? 'İşlemde' : 'Bitti'}</button>
                        ))}
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
                        <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>Tüm Tipler</button>
                        <button onClick={() => setFilterType('public')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'public' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>Genel</button>
                        <button onClick={() => setFilterType('private')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'private' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>Özel</button>
                    </div>

                    <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input type="text" placeholder="Talep sahibi veya konu ara..." className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all" /></div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedRequest ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
                    {viewMode === 'list' ? (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="p-5 pl-8">Talep ID & Tip</th>
                                        <th className="p-5">Kategori & Konu</th>
                                        <th className="p-5">Müşteri</th>
                                        <th className="p-5 text-center">Durum</th>
                                        <th className="p-5 text-right pr-8">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredRequests.map(req => (
                                        <tr key={req.id} onClick={() => setSelectedRequest(req)} className={`group hover:bg-slate-50 transition-all cursor-pointer ${selectedRequest?.id === req.id ? 'bg-blue-50/50 border-l-4 border-slate-900' : 'border-l-4 border-transparent'}`}>
                                            <td className="p-5 pl-8">
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-mono text-[10px] font-bold text-slate-400">#{req.id}</span>
                                                    {getTypeBadge(req.type)}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="font-black text-slate-900 text-xs">{req.category}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate max-w-[180px] mt-1">{req.description}</div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[10px] font-black flex items-center justify-center text-slate-400 border border-slate-200">{req.avatar}</div>
                                                    <span className="text-xs font-black text-slate-700">{req.user}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex justify-center">
                                                    {getStatusBadge(req.status)}
                                                </div>
                                            </td>
                                            <td className="p-5 text-right pr-8">
                                                <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                                                    <ChevronRight size={18}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                            {filteredRequests.map(req => (
                                <div key={req.id} onClick={() => setSelectedRequest(req)} className={`bg-white rounded-[28px] p-6 border transition-all hover:shadow-xl group cursor-pointer ${selectedRequest?.id === req.id ? 'border-slate-900 ring-4 ring-slate-900/5 shadow-lg shadow-slate-900/10' : 'border-slate-200'}`}>
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{req.id}</span>
                                            {getTypeBadge(req.type)}
                                        </div>
                                        {getStatusBadge(req.status)}
                                    </div>
                                    <h3 className="font-black text-slate-900 mb-2 text-sm group-hover:text-red-600 transition-colors">{req.category}</h3>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md">{req.avatar}</div>
                                        <div>
                                            <span className="block text-xs font-black text-slate-700">{req.user}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">{req.date}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-50 pt-4 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><MapPin size={12} className="text-red-500"/> {req.location}</span>
                                        <span className="text-slate-300 group-hover:text-slate-900 transition-colors">Detay Gör <ChevronRight size={12} className="inline ml-1"/></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedRequest && (
                    <div className="w-full lg:w-[400px] shrink-0 h-full animate-slide-in-right">
                        <RequestDetail req={selectedRequest} onClose={() => setSelectedRequest(null)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestManager;
