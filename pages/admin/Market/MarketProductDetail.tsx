
import React, { useState } from 'react';
import { 
    ArrowLeft, 
    Edit3, 
    Trash2, 
    Eye, 
    EyeOff,
    AlertCircle, 
    Package, 
    BarChart2, 
    MessageSquare,
    Link as LinkIcon,
    Star,
    X,
    CheckCircle,
    TrendingUp,
    History,
    ShieldCheck,
    Tag,
    Info,
    ArrowUpRight,
    Zap,
    Lock,
    Store,
    ShieldAlert
} from 'lucide-react';
import { BarChart, LineChart } from '../../../components/admin/Charts';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';

const MarketProductDetail = ({ productId, onBack }: { productId: string, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'analytics' | 'inventory' | 'reviews'>('info');
    const [isHidden, setIsHidden] = useState(false);

    // Mock Data - In real app fetch by productId
    const product = {
        id: productId,
        name: 'Akıllı Termostat X1 Pro',
        sku: `GZ-${productId}PR`,
        category: 'Akıllı Ev / Otomasyon',
        price: '1.250 ₺',
        cost: '850 ₺',
        commission: '%10 (125 ₺)',
        stock: 45,
        warehouse: 'İstanbul Merkez Depo',
        seller: 'TechIstanbul Elektronik',
        status: 'active',
        rating: 4.8,
        description: 'Wi-Fi özellikli, uzaktan kontrol edilebilir akıllı termostat. Enerji tasarrufu sağlar ve tüm kombi modelleri ile %100 uyumludur. Mobil uygulama üzerinden haftalık programlama imkanı sunar.',
        specs: [
            { label: 'Bağlantı', value: 'Wi-Fi 2.4GHz' },
            { label: 'Ekran', value: 'OLED Dokunmatik' },
            { label: 'Güç', value: '2x AA Pil veya 220V' },
            { label: 'Hassasiyet', value: '0.1°C' }
        ],
        stats: {
            views: 4520,
            sales: 342,
            conversions: '%7.5',
            returns: 2
        }
    };

    const salesHistory = [
        { label: 'Pzt', value: 12 }, { label: 'Sal', value: 18 }, { label: 'Çar', value: 15 },
        { label: 'Per', value: 25 }, { label: 'Cum', value: 22 }, { label: 'Cmt', value: 30 },
        { label: 'Paz', value: 28 }
    ];

    const stockLogs = [
        { id: 1, action: 'Stok Girişi', amount: '+50', date: '20.10.2024', user: 'Ahmet Yılmaz' },
        { id: 2, action: 'Sipariş Satışı', amount: '-1', date: '21.10.2024', user: 'Sistem' },
        { id: 3, action: 'İade Kabul', amount: '+1', date: '22.10.2024', user: 'Admin' },
        { id: 4, action: 'Düzenleme', amount: '-5', date: '23.10.2024', user: 'Mehmet Öz' },
    ];

    // Mock Reviews State for Admin Controls
    const [reviews, setReviews] = useState([
        { id: 1, user: 'Selin Y.', rating: 5, comment: 'Harika bir ürün, İstanbul içi kargo çok hızlıydı.', date: '24.10.2024', isVisible: true },
        { id: 2, user: 'Murat K.', rating: 2, comment: 'Ürün kutusu hasarlı geldi, memnun kalmadım.', date: '23.10.2024', isVisible: true },
        { id: 3, user: 'Ayşe T.', rating: 4, comment: 'Kurulumu biraz zordu ama çalışınca çok iyi tasarruf sağladı.', date: '22.10.2024', isVisible: false }
    ]);

    const toggleReviewVisibility = (id: number) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, isVisible: !r.isVisible } : r));
    };

    const handleVisibilityToggle = () => {
        setIsHidden(!isHidden);
        alert(isHidden ? "Ürün tekrar listelemeye eklendi." : "Ürün listelemeden kaldırıldı ve gizlendi.");
    };

    return (
        <div className="animate-fade-in space-y-6 pb-12">
            {/* Upper Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {product.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            <span>SKU: {product.sku}</span>
                            <span>•</span>
                            <span className="text-blue-600 flex items-center gap-1"><Store size={10}/> {product.seller}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleVisibilityToggle}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-sm border ${
                            isHidden 
                            ? 'bg-green-600 border-green-700 text-white hover:bg-green-700' 
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                        {isHidden ? 'Listelemede Göster' : 'Listelemeden Kaldır'}
                    </button>
                    
                    {!isHidden && (
                        <button className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-bold text-xs hover:bg-amber-100 transition-colors flex items-center gap-2 border border-amber-100">
                            <Zap size={14} /> Vitrine Ekle
                        </button>
                    )}
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Toplam Satış</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">{product.stats.sales}</span>
                        <TrendingUp size={16} className="text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Dönüşüm</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">{product.stats.conversions}</span>
                        <ArrowUpRight size={16} className="text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Müşteri Puanı</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-amber-500">{product.rating}</span>
                        <Star size={16} className="text-amber-400" fill="currentColor" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-1 block">İade Sayısı</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-red-600">{product.stats.returns}</span>
                        <AlertCircle size={16} className="text-red-400" />
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                {[
                    { id: 'info', label: 'Ürün Detayları', icon: Info },
                    { id: 'analytics', label: 'Satış Analizi', icon: BarChart2 },
                    { id: 'inventory', label: 'Stok & Lojistik', icon: Package },
                    { id: 'reviews', label: 'Yorum Yönetimi', icon: MessageSquare },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                        }`}
                    >
                        <tab.icon size={16}/>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Section */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'info' && (
                        <div className="animate-fade-in space-y-6">
                            <WidgetCard title="Ürün Açıklaması">
                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    {product.description}
                                </p>
                            </WidgetCard>

                            <WidgetCard title="Teknik Özellikler">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.specs.map((spec, i) => (
                                        <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <span className="text-xs font-bold text-slate-400 uppercase">{spec.label}</span>
                                            <span className="text-sm font-bold text-slate-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </WidgetCard>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <WidgetCard title="Haftalık Satış Trendi" className="animate-fade-in">
                            <div className="h-64 mt-4">
                                <BarChart data={salesHistory} height={64} color="bg-indigo-500" />
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-50 pt-6">
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Görüntülenme</span>
                                    <span className="text-lg font-black text-slate-900">{product.stats.views}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Sepete Ekleme</span>
                                    <span className="text-lg font-black text-blue-600">842</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Başarılı Satış</span>
                                    <span className="text-lg font-black text-green-600">{product.stats.sales}</span>
                                </div>
                            </div>
                        </WidgetCard>
                    )}

                    {activeTab === 'inventory' && (
                        <WidgetCard title="Stok Hareket Kayıtları" className="animate-fade-in">
                            <div className="space-y-4">
                                {stockLogs.map(log => (
                                    <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-white hover:border-slate-200 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${log.amount.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {log.amount}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{log.action}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{log.user} • {log.date}</p>
                                            </div>
                                        </div>
                                        <History size={16} className="text-slate-300 group-hover:text-slate-600" />
                                    </div>
                                ))}
                            </div>
                        </WidgetCard>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-indigo-500" /> Müşteri Yorumları & Denetim
                                </h3>
                                <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldAlert size={12}/> Admin: Sadece Görünürlük Kontrolü
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                {reviews.map(rev => (
                                    <div key={rev.id} className={`pb-6 border-b border-slate-50 last:border-0 last:pb-0 group transition-opacity ${!rev.isVisible ? 'opacity-60' : 'opacity-100'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm">{rev.user.charAt(0)}</div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h5 className="font-bold text-slate-900 text-sm">{rev.user}</h5>
                                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${rev.isVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {rev.isVisible ? 'Yayında' : 'Gizli'}
                                                        </span>
                                                    </div>
                                                    <div className="flex text-amber-400 mt-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-200"}/>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => toggleReviewVisibility(rev.id)}
                                                    className={`p-2 rounded-xl transition-all border flex items-center gap-2 text-[10px] font-bold uppercase ${
                                                        rev.isVisible 
                                                        ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100' 
                                                        : 'bg-green-600 text-white border-green-500 hover:bg-green-700'
                                                    }`}
                                                    title={rev.isVisible ? "Yorumu Müşterilere Gizle" : "Yorumu Tekrar Yayınla"}
                                                >
                                                    {rev.isVisible ? <><EyeOff size={14}/> Gizle</> : <><Eye size={14}/> Yayınla</>}
                                                </button>
                                            </div>
                                        </div>
                                        <p className={`text-xs leading-relaxed italic p-3 rounded-xl border border-slate-100 ${!rev.isVisible ? 'bg-slate-100/50 text-slate-400' : 'bg-slate-50/50 text-slate-600'}`}>
                                            "{rev.comment}"
                                        </p>
                                        <div className="mt-3 flex items-center gap-3">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Tarih: {rev.date}</span>
                                            <div className="w-px h-2 bg-slate-200"></div>
                                            <span className="text-[9px] font-bold text-blue-600 uppercase">Sadece Satıcı Yanıtlayabilir</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <WidgetCard title="Finansal Özet">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Satış Fiyatı</span> <span className="font-black text-slate-900">{product.price}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Maliyet</span> <span className="font-bold text-red-600">{product.cost}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Komisyon</span> <span className="font-bold text-indigo-600">{product.commission}</span></div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase">Net Kar / Birim</span>
                                <span className="text-lg font-black text-emerald-600">275 ₺</span>
                            </div>
                        </div>
                    </WidgetCard>

                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package size={18}/> Lojistik Bilgisi</h3>
                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Depo</span> <span className="font-bold">{product.warehouse}</span></div>
                                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Kargo Süresi</span> <span className="font-bold">Aynı Gün</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Desi / Ağırlık</span> <span className="font-bold">2.4 Desi / 1.2 KG</span></div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    <WidgetCard title="Denetim & Güvenlik">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-green-700 text-xs font-bold border border-green-100">
                                <ShieldCheck size={14} /> İçerik Onaylandı
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-blue-700 text-xs font-bold border border-blue-100">
                                <CheckCircle size={14} /> Marka Orijinal
                            </div>
                            <button className="w-full mt-2 py-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                                <Lock size={14} /> Satışı Durdur
                            </button>
                        </div>
                    </WidgetCard>
                </div>

            </div>
        </div>
    );
};

export default MarketProductDetail;
