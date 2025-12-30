
import React, { useState, useEffect } from 'react';
import { 
    Search,
    Calendar,
    User,
    Globe,
    Eye,
    Edit3,
    CheckCircle,
    XCircle,
    Trash2,
    ArrowLeft,
    Save,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link as LinkIcon,
    ImageIcon,
    Quote,
    PlusCircle,
    Clock
} from 'lucide-react';

interface ContentItem {
    id: number;
    title: string;
    date: string;
    status: string;
    views: number;
    img: string;
    category?: string;
    author?: string;
    source?: string;
    tag?: string;
}

const ContentManager = ({ type }: { type: 'blog' | 'news' }) => {
    const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
    
    // --- SEPARATE MOCK DATASETS ---
    const initialBlogData: ContentItem[] = [
        { id: 1, title: 'Kışa Hazırlık: Kombi Bakım Rehberi', category: 'Rehber', date: '24.10.2024 14:30', status: 'published', author: 'Ahmet Y.', views: 1240, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=300&auto=format&fit=crop' },
        { id: 2, title: 'Akıllı Ev Sistemlerinde Tasarruf İpuçları', category: 'Teknoloji', date: '18.10.2024 09:15', status: 'draft', author: 'Selin K.', views: 0, img: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=300&auto=format&fit=crop' },
        { id: 3, title: 'İstanbulda Doğalgaz Tesisatı Standartları', category: 'Mevzuat', date: '10.10.2024 11:45', status: 'published', author: 'Mehmet T.', views: 560, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop' },
    ];

    const initialNewsData: ContentItem[] = [
        { id: 1, title: 'Doğalgaz Zammı Hakkında Resmi Açıklama', source: 'Resmi Gazete', date: '20.10.2024 10:00', status: 'published', tag: 'Ekonomi', views: 5600, img: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=300&auto=format&fit=crop' },
        { id: 2, title: 'Kadıköy Bölgesinde Planlı Kesinti', source: 'İGDAŞ', date: '22.10.2024 16:30', status: 'published', tag: 'Duyuru', views: 3200, img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=300&auto=format&fit=crop' },
        { id: 3, title: 'Yenilenebilir Enerji Zirvesi Başlıyor', source: 'Enerji Bakanlığı', date: '25.10.2024 09:00', status: 'draft', tag: 'Sektör', views: 0, img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=300&auto=format&fit=crop' },
    ];

    // State Initialization based on Type
    const [items, setItems] = useState<ContentItem[]>(type === 'blog' ? initialBlogData : initialNewsData);

    // Reset items when type changes
    useEffect(() => {
        setItems(type === 'blog' ? initialBlogData : initialNewsData);
        setFilterStatus('all');
        setSearchQuery('');
        setActiveTab('list');
    }, [type]);

    const handleStatusToggle = (id: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, status: item.status === 'published' ? 'draft' : 'published' } : item));
    };

    const handleDelete = (id: number) => {
        if(window.confirm('Bu içeriği silmek istediğinize emin misiniz?')) {
            setItems(prev => prev.filter(i => i.id !== id));
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const renderGridList = () => (
        <div className="space-y-6 animate-fade-in">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Tümü</button>
                    <button onClick={() => setFilterStatus('published')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === 'published' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Yayında</button>
                    <button onClick={() => setFilterStatus('draft')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === 'draft' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Taslak</button>
                </div>
                
                <div className="relative md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder={type === 'blog' ? "Yazı başlığı ara..." : "Haber başlığı ara..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* List Content */}
            {filteredItems.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow group">
                            
                            {/* Image Area - Thumbnail */}
                            <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden relative flex-shrink-0">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur-md shadow-sm ${
                                        item.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-amber-500/90 text-white'
                                    }`}>
                                        {item.status === 'published' ? 'Yayında' : 'Taslak'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500">
                                    <span className={`px-2 py-0.5 rounded border ${type === 'blog' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                        {type === 'blog' ? item.category : item.tag}
                                    </span>
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                                </div>

                                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h3>

                                <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            {type === 'blog' ? <User size={14}/> : <Globe size={14}/>}
                                            <span className="font-bold text-slate-700">{type === 'blog' ? item.author : item.source}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye size={14} className="text-slate-400"/> {item.views} Görüntülenme
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions - Right aligned */}
                            <div className="flex md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 justify-end">
                                <button onClick={() => setActiveTab('edit')} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-bold text-xs transition-colors">
                                    <Edit3 size={14} /> Düzenle
                                </button>
                                <button onClick={() => handleStatusToggle(item.id)} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors">
                                    {item.status === 'published' ? <XCircle size={14}/> : <CheckCircle size={14}/>}
                                    {item.status === 'published' ? 'Taslağa Al' : 'Yayınla'}
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition-colors">
                                    <Trash2 size={14} /> Sil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">İçerik Bulunamadı</h3>
                    <p className="text-sm text-slate-500 mt-1">Arama kriterlerinize uygun {type === 'blog' ? 'yazı' : 'haber'} yok.</p>
                    <button onClick={() => {setFilterStatus('all'); setSearchQuery('');}} className="mt-4 text-red-600 font-bold text-sm hover:underline">Filtreleri Temizle</button>
                </div>
            )}
        </div>
    );

    const renderForm = () => (
        <div className="animate-fade-in max-w-6xl mx-auto">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setActiveTab('list')} 
                        className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                    >
                        <ArrowLeft size={18} /> Listeye Dön
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {activeTab === 'edit' ? 'İçeriği Düzenle' : `Yeni ${type === 'blog' ? 'Yazı' : 'Haber'} Ekle`}
                        </h2>
                        <p className="text-xs text-slate-500">İçerik detaylarını giriniz.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors">
                        Önizleme
                    </button>
                    <button className="px-6 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
                        <Save size={16} /> Kaydet
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Editor */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Editor Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder={type === 'blog' ? "Yazı Başlığı" : "Haber Başlığı"}
                                className="w-full text-3xl font-black text-slate-900 placeholder:text-slate-300 outline-none"
                            />
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                <span className="font-bold">Permalink:</span>
                                <span className="bg-slate-50 px-2 py-1 rounded">https://gazistanbul.com/{type}/<span className="text-slate-900">yeni-icerik-basligi</span></span>
                            </div>
                        </div>

                        {/* Editor Toolbar */}
                        <div className="border border-slate-200 rounded-xl overflow-hidden min-h-[500px] flex flex-col">
                            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1 flex-wrap sticky top-0 z-10">
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Bold size={16}/></button>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Italic size={16}/></button>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Underline size={16}/></button>
                                <div className="w-px h-6 bg-slate-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><List size={16}/></button>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ListOrdered size={16}/></button>
                                <div className="w-px h-6 bg-slate-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><LinkIcon size={16}/></button>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ImageIcon size={16}/></button>
                                <div className="w-px h-6 bg-slate-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Quote size={16}/></button>
                            </div>
                            <textarea
                                className="w-full flex-1 p-6 outline-none resize-none text-base leading-relaxed text-slate-700 min-h-[400px]"
                                placeholder="İçeriğinizi buraya yazmaya başlayın..."
                            ></textarea>
                        </div>
                    </div>

                    {/* SEO Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Search size={18} className="text-blue-500"/> SEO Ayarları
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Meta Başlık</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" placeholder="Google arama sonuçlarında görünecek başlık" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Meta Açıklama</label>
                                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none resize-none h-24" placeholder="Kısa özet (160 karakter)..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase flex items-center gap-2">
                            <Clock size={16}/> Yayın Ayarları
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Yayın Durumu</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer">
                                    <option value="draft">Taslak</option>
                                    <option value="published">Yayında</option>
                                    <option value="archived">Arşiv</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Görünürlük</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer">
                                    <option value="public">Herkese Açık</option>
                                    <option value="private">Üyelere Özel</option>
                                    <option value="password">Şifre Korumalı</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Yayın Tarihi & Saati</label>
                                <input 
                                    type="datetime-local" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900" 
                                />
                            </div>

                            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2 mt-2">
                                <CheckCircle size={16}/> Değişiklikleri Uygula
                            </button>
                        </div>
                    </div>

                    {/* Taxonomy Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase">Kategori & Etiket</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none">
                                    <option>Genel</option>
                                    <option>Teknoloji</option>
                                    <option>Rehber</option>
                                    <option>Sektörel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Etiketler</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none" placeholder="Virgülle ayırın..." />
                            </div>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase">Öne Çıkan Görsel</h3>
                        <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer group relative overflow-hidden">
                            <ImageIcon size={32} className="mb-2 group-hover:scale-110 transition-transform"/>
                            <span className="text-xs font-bold">Görsel Yükle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{type === 'blog' ? 'Blog Yönetimi' : 'Haber Yönetimi'}</h2>
                    <p className="text-sm text-slate-500">{type === 'blog' ? 'Kullanıcılar için rehber içerikler ve makaleler.' : 'Sektörel gelişmeler, duyurular ve belediye haberleri.'}</p>
                </div>
                {activeTab === 'list' && (
                    <button onClick={() => setActiveTab('add')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <PlusCircle size={16} /> Yeni {type === 'blog' ? 'Yazı' : 'Haber'} Ekle
                    </button>
                )}
            </div>

            {activeTab === 'list' ? renderGridList() : renderForm()}
        </div>
    );
};

export default ContentManager;
