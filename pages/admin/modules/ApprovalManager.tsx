
import React, { useState } from 'react';
import { 
    CheckSquare, 
    Clock, 
    FileText, 
    Building2, 
    Package, 
    User, 
    Eye, 
    Check, 
    X, 
    ArrowRight, 
    Search, 
    Filter,
    ShieldCheck,
    AlertCircle,
    Info,
    ChevronRight,
    ArrowLeft,
    Maximize2,
    MessageSquare,
    Zap,
    Download,
    CheckCircle
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface ApprovalItem {
    id: string;
    type: 'company' | 'service' | 'product' | 'document';
    title: string;
    subtitle: string;
    date: string;
    urgency: 'normal' | 'high';
    details: any;
}

const ApprovalManager = () => {
    // State tipine 'document' eklendi
    const [filterType, setFilterType] = useState<'all' | 'company' | 'service' | 'product' | 'document'>('all');
    const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const approvalQueue: ApprovalItem[] = [
        { 
            id: 'APP-001', 
            type: 'company', 
            title: 'Sistem Isı Ltd.', 
            subtitle: 'Profil Bilgisi Güncellemesi', 
            date: '12 dk önce', 
            urgency: 'high',
            details: {
                field: 'Adres & Telefon',
                old: { address: 'Kadıköy, Moda No:10', phone: '0216 111 22 33' },
                new: { address: 'Ataşehir, Barbaros Blv. No:52 Kat:3', phone: '0216 444 55 66' }
            }
        },
        { 
            id: 'APP-002', 
            type: 'service', 
            title: 'Mavi Enerji', 
            subtitle: 'Yeni Hizmet Talebi: VRF Klima Servisi', 
            date: '45 dk önce', 
            urgency: 'normal',
            details: {
                description: 'Endüstriyel soğutma ve VRF sistemleri için periyodik bakım hizmeti.',
                certifications: ['TSE Hizmet Yeterlilik', 'Gazmer Yetki Belgesi'],
                priceRange: '500₺ - 2500₺'
            }
        },
        { 
            id: 'APP-003', 
            type: 'product', 
            title: 'Atlas Teknik', 
            subtitle: 'Yeni Ürün: E.C.A Proteus Premix', 
            date: '2 saat önce', 
            urgency: 'normal',
            details: {
                category: 'Kombi',
                price: '18.450 ₺',
                stock: '50 Adet',
                description: 'A++ Enerji sınıfı yoğuşmalı kombi.'
            }
        },
        { 
            id: 'APP-004', 
            type: 'document', 
            title: 'Galata Mekanik', 
            subtitle: 'Belge Yenileme: Vergi Levhası 2024', 
            date: '3 saat önce', 
            urgency: 'high',
            details: {
                docType: 'PDF',
                previewUrl: 'https://via.placeholder.com/600x800?text=VERGI+LEVHASI+2024'
            }
        },
    ];

    const filteredItems = approvalQueue.filter(item => filterType === 'all' || item.type === filterType);

    const handleApprove = (id: string) => {
        alert(`${id} onaylandı ve yayına alındı.`);
        setSelectedItem(null);
    };

    const handleReject = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${selectedItem?.id} için red kararı verildi. Gerekçe: ${rejectReason}`);
        setIsRejectModalOpen(false);
        setRejectReason('');
        setSelectedItem(null);
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* Red Gerekçesi Modalı */}
            {isRejectModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsRejectModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-red-50">
                            <h3 className="font-bold text-red-900 flex items-center gap-2"><X size={18}/> Talebi Reddet</h3>
                            <button onClick={() => setIsRejectModalOpen(false)} className="p-2 hover:bg-red-100 rounded-full text-red-400"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleReject} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Red Gerekçesi</label>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-red-500 mb-4"
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    required
                                >
                                    <option value="">Gerekçe Seçiniz...</option>
                                    <option value="Eksik Belge">Eksik veya Geçersiz Belge</option>
                                    <option value="Hatalı Kategori">Hatalı Kategori Seçimi</option>
                                    <option value="Düşük Çözünürlük">Görsel Kalitesi Yetersiz</option>
                                    <option value="Yanıltıcı İçerik">Yanıltıcı Fiyat/Bilgi</option>
                                    <option value="Diğer">Diğer (Açıklama Yazınız)</option>
                                </select>
                                <textarea 
                                    rows={4} 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                    placeholder="Firmaya iletilecek detaylı not..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-200">Kararı Bildir</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {/* Filtre butonlarına 'document' eklendi */}
                    {['all', 'company', 'service', 'product', 'document'].map(type => (
                        <button 
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                                filterType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {type === 'all' ? 'Tümü' : type === 'company' ? 'Firmalar' : type === 'service' ? 'Hizmetler' : type === 'product' ? 'Ürünler' : 'Belgeler'}
                        </button>
                    ))}
                </div>
                <div className="relative md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Kuyrukta ara..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 text-xs outline-none focus:ring-2 focus:ring-slate-900" />
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden relative">
                
                {/* Sol: Onay Listesi */}
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedItem ? 'hidden lg:block lg:w-1/3' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 pl-6">İçerik Sahibi</th>
                                    <th className="p-4">Tip</th>
                                    <th className="p-4">Zaman</th>
                                    <th className="p-4 text-right pr-6">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredItems.map(item => (
                                    <tr 
                                        key={item.id} 
                                        onClick={() => setSelectedItem(item)}
                                        className={`group hover:bg-slate-50 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm border border-slate-100 ${
                                                    item.type === 'company' ? 'bg-blue-50 text-blue-600' :
                                                    item.type === 'service' ? 'bg-purple-50 text-purple-600' :
                                                    item.type === 'document' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                    {item.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600">{item.title}</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[150px]">{item.subtitle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                                                item.urgency === 'high' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-100'
                                            }`}>
                                                {item.type === 'document' ? 'Belge' : item.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-slate-400 font-bold whitespace-nowrap">{item.date}</td>
                                        <td className="p-4 text-right pr-6"><ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors inline"/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sağ: Detaylı İnceleme Paneli */}
                {selectedItem && (
                    <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-2/3 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setSelectedItem(null)} className="lg:hidden p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft size={20}/></button>
                                <div><h3 className="font-bold text-slate-900">İnceleme Merkezi</h3><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{selectedItem.id} / {selectedItem.title}</p></div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsRejectModalOpen(true)} className="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-xs hover:bg-red-50 transition-all">Reddet</button>
                                <button onClick={() => handleApprove(selectedItem.id)} className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all shadow-lg">Onayla ve Yayınla</button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            
                            {/* --- 1. PROFIL GÜNCELLEME (DIFF VIEW) --- */}
                            {selectedItem.type === 'company' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-4">
                                        <Zap size={18} className="text-amber-500"/> Değişiklik Özeti
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4 opacity-60">
                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded w-fit">Eski Veri</h5>
                                            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4">
                                                <div><span className="text-[10px] font-bold text-slate-400 uppercase block">Adres</span><p className="text-sm font-medium text-slate-600">{selectedItem.details.old.address}</p></div>
                                                <div><span className="text-[10px] font-bold text-slate-400 uppercase block">Telefon</span><p className="text-sm font-medium text-slate-600">{selectedItem.details.old.phone}</p></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded w-fit">Yeni Veri (Önerilen)</h5>
                                            <div className="p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/20 space-y-4 ring-4 ring-blue-500/5">
                                                <div><span className="text-[10px] font-bold text-blue-400 uppercase block">Adres</span><p className="text-sm font-black text-slate-900">{selectedItem.details.new.address}</p></div>
                                                <div><span className="text-[10px] font-bold text-blue-400 uppercase block">Telefon</span><p className="text-sm font-black text-slate-900">{selectedItem.details.new.phone}</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- 2. BELGE İNCELEME --- */}
                            {selectedItem.type === 'document' && (
                                <div className="space-y-8 animate-fade-in text-center">
                                    <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 text-left">
                                        <ShieldCheck size={18} className="text-green-500"/> Belge Güvenlik Kontrolü
                                    </div>
                                    <div className="bg-slate-100 rounded-3xl p-4 inline-block relative group">
                                        <img src={selectedItem.details.previewUrl} className="max-w-md h-auto rounded-xl shadow-2xl border border-white" alt="Belge" />
                                        <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold rounded-xl">
                                            <Maximize2 size={24}/> Tam Ekran İncele
                                        </button>
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"><Download size={16}/> Orijinal Dosyayı İndir</button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"><Info size={16}/> Metadata Bilgisi</button>
                                    </div>
                                </div>
                            )}

                            {/* --- 3. HIZMET / URUN DETAY --- */}
                            {(selectedItem.type === 'service' || selectedItem.type === 'product') && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-4">
                                        <Package size={18} className="text-indigo-500"/> İçerik Detayları
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Açıklama Metni</h4>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium italic">"{selectedItem.details.description}"</p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Ek Parametreler</h4>
                                            {selectedItem.type === 'service' ? (
                                                <div className="space-y-2">
                                                    {selectedItem.details.certifications.map((c: string, i: number) => (
                                                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg"><CheckCircle size={14}/> {c}</div>
                                                    ))}
                                                    <div className="mt-4 p-3 bg-indigo-50 rounded-xl text-indigo-700 border border-indigo-100">
                                                        <span className="text-[10px] font-black uppercase block mb-1">Fiyat Aralığı</span>
                                                        <span className="text-lg font-black">{selectedItem.details.priceRange}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-3 text-center">
                                                    <div className="p-3 bg-white border border-slate-200 rounded-xl"><span className="block text-[10px] font-bold text-slate-400 uppercase">Fiyat</span><span className="font-black text-slate-900">{selectedItem.details.price}</span></div>
                                                    <div className="p-3 bg-white border border-slate-200 rounded-xl"><span className="block text-[10px] font-bold text-slate-400 uppercase">Stok</span><span className="font-black text-slate-900">{selectedItem.details.stock}</span></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer Information */}
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sistem Hazır</span></div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase"><MessageSquare size={12}/> Talebi Reddetmeden Önce Firma İle İletişime Geçebilirsiniz</div>
                            </div>
                            <button className="text-[10px] font-black text-blue-400 uppercase hover:text-blue-300 transition-colors flex items-center gap-1">Firmaya Mesaj At <ChevronRight size={12}/></button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovalManager;
