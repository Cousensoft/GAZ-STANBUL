
import React, { useState } from 'react';
import { 
    MessageSquare, 
    Search, 
    Filter, 
    AlertCircle, 
    CheckCircle, 
    Clock, 
    User, 
    Phone, 
    MoreVertical, 
    Send, 
    X, 
    Star, 
    Mail, 
    Flag, 
    ShieldAlert, 
    ChevronRight, 
    UserCheck, 
    Paperclip, 
    Upload, 
    FileText, 
    File, 
    Trash2, 
    Check, 
    Download, 
    Eye, 
    Lock, 
    History, 
    Activity, 
    Save, 
    Building2 
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

// --- TYPES ---
interface AdminTicket {
    id: string;
    user: string;
    userType: 'Individual' | 'Corporate';
    type: 'Şikayet' | 'Destek Talebi' | 'Bilgi Talebi' | 'Teknik Arıza' | 'Hukuki/Etik'; 
    subject: string;
    description: string;
    category: string; // Finansal, Teknik, Hesap vb.
    priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
    status: 'Oluşturuldu' | 'İnceleniyor' | 'Beklemede' | 'Çözüldü' | 'Kapatıldı';
    date: string;
    slaDeadline?: string;
    assignedTo?: string;
    
    internalNotes: string[];
    auditLog: { date: string, action: string, actor: string }[];
    messages: { sender: string, text: string, date: string, isInternal: boolean }[];
    attachments: { name: string, size: string, type: string }[];
}

const SupportManager = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); 
    const [filterCategory, setFilterCategory] = useState('all'); // Yeni Kategori Filtresi
    const [activeTab, setActiveTab] = useState<'details' | 'internal' | 'audit'>('details');
    const [internalNoteInput, setInternalNoteInput] = useState('');
    
    // MOCK DATA with Extended Properties
    const [tickets, setTickets] = useState<AdminTicket[]>([
        { 
            id: 'TKT-1045', 
            user: 'Ahmet Yılmaz', 
            userType: 'Individual',
            type: 'Şikayet',
            subject: 'Ödeme Sorunu - Kredi Kartı', 
            description: 'Market siparişimde kredi kartı hatası alıyorum. İşlem provizyon alıyor ama sistemde hata görünüyor.',
            category: 'Finansal',
            status: 'Oluşturuldu', 
            priority: 'Yüksek', 
            date: '24.10.2024 10:00',
            slaDeadline: '24.10.2024 14:00', // 4 Saat SLA
            internalNotes: [],
            auditLog: [{ date: '24.10.2024 10:00', action: 'Talep Oluşturuldu', actor: 'Ahmet Yılmaz' }],
            messages: [{ sender: 'Ahmet Yılmaz', text: 'Dekont ektedir.', date: '10:05', isInternal: false }],
            attachments: [{ name: 'dekont_01.pdf', size: '240KB', type: 'PDF' }]
        },
        { 
            id: 'TKT-1044', 
            user: 'Bosphorus Enerji', 
            userType: 'Corporate',
            type: 'Destek Talebi',
            subject: 'Yetki Belgesi Onayı', 
            description: 'Belgelerimi yükledim ancak hala onay bekliyor görünüyor.',
            category: 'Hesap / Yetki',
            status: 'İnceleniyor', 
            priority: 'Orta', 
            date: '24.10.2024 09:00', 
            assignedTo: 'admin_elif',
            slaDeadline: '25.10.2024 09:00',
            internalNotes: ['Belge OCR taramasından geçti, manuel kontrol gerekiyor.'],
            auditLog: [
                { date: '24.10.2024 09:00', action: 'Talep Oluşturuldu', actor: 'Bosphorus Enerji' },
                { date: '24.10.2024 09:30', action: 'Atama Yapıldı: admin_elif', actor: 'System' }
            ],
            messages: [],
            attachments: [] 
        },
        { 
            id: 'TKT-1043', 
            user: 'Mehmet Öz', 
            userType: 'Individual',
            type: 'Şikayet',
            subject: 'Personel Davranışı', 
            description: 'Eve gelen teknik personel maske takmıyordu.',
            category: 'Hizmet Kalitesi',
            status: 'Oluşturuldu', 
            priority: 'Orta', 
            date: '23.10.2024 14:00', 
            internalNotes: [],
            auditLog: [],
            messages: [],
            attachments: [] 
        },
         { 
            id: 'TKT-1042', 
            user: 'Tekno Yapı', 
            userType: 'Corporate',
            type: 'Teknik Arıza',
            subject: 'API Entegrasyon Hatası', 
            description: 'Ürünleri toplu yüklerken 500 hatası alıyoruz.',
            category: 'Teknik',
            status: 'Beklemede', 
            priority: 'Yüksek', 
            date: '22.10.2024 16:00', 
            internalNotes: [],
            auditLog: [],
            messages: [],
            attachments: [] 
        },
    ]);

    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    // Kategori Listesi (Sabit)
    const categories = ['Genel', 'Teknik', 'Finansal', 'Hizmet Kalitesi', 'Güvenlik', 'Hesap / Yetki'];

    // --- ACTIONS ---
    const handleStatusChange = (newStatus: AdminTicket['status']) => {
        if (!selectedTicket) return;
        
        if (selectedTicket.status === 'Kapatıldı' && newStatus !== 'Kapatıldı') {
            if(!confirm("Kapanmış bileti yeniden açmak istediğinize emin misiniz?")) return;
        }

        const logEntry = { date: new Date().toLocaleString(), action: `Durum Değişti: ${selectedTicket.status} -> ${newStatus}`, actor: 'Admin' };
        
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { 
            ...t, 
            status: newStatus,
            auditLog: [logEntry, ...t.auditLog]
        } : t));
    };

    const handleAddInternalNote = () => {
        if (!selectedTicket || !internalNoteInput.trim()) return;
        const note = `${new Date().toLocaleString()} - Admin: ${internalNoteInput}`;
        const logEntry = { date: new Date().toLocaleString(), action: 'İç Not Eklendi', actor: 'Admin' };
        
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
            ...t,
            internalNotes: [note, ...t.internalNotes],
            auditLog: [logEntry, ...t.auditLog]
        } : t));
        setInternalNoteInput('');
    };

    const getStatusBadge = (status: string) => {
        const styles: any = {
            'Oluşturuldu': 'bg-red-100 text-red-600 border-red-200',
            'İnceleniyor': 'bg-blue-100 text-blue-600 border-blue-200',
            'Beklemede': 'bg-amber-100 text-amber-600 border-amber-200',
            'Çözüldü': 'bg-green-100 text-green-600 border-green-200',
            'Kapatıldı': 'bg-gray-800 text-white border-gray-700'
        };
        return <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${styles[status]}`}>{status}</span>;
    };

    const getPriorityBadge = (p: string) => {
        const colors: any = { 'Kritik': 'bg-red-600 text-white', 'Yüksek': 'text-red-600 bg-red-50', 'Orta': 'text-amber-600 bg-amber-50', 'Düşük': 'text-slate-500 bg-slate-50' };
        return <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${colors[p]}`}>{p}</span>;
    };

    // Filter Logic
    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              t.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        
        return matchesSearch && matchesType && matchesCategory;
    });

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Destek Yönetim Paneli</h2>
                    <p className="text-xs text-slate-500">SLA takibi, denetim ve çözüm merkezi.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* TYPE FILTER */}
                    <div className="relative">
                        <select 
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer h-[38px] min-w-[130px]"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">Tüm Tipler</option>
                            <option value="Şikayet">Şikayet</option>
                            <option value="Destek Talebi">Destek Talebi</option>
                            <option value="Teknik Arıza">Teknik Arıza</option>
                            <option value="Bilgi Talebi">Bilgi Talebi</option>
                            <option value="Hukuki/Etik">Hukuki/Etik</option>
                        </select>
                    </div>

                    {/* CATEGORY FILTER */}
                    <div className="relative">
                        <select 
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer h-[38px] min-w-[130px]"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">Tüm Kategoriler</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 h-[38px]">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-600 whitespace-nowrap">SLA İhlali: 0</span>
                    </div>

                    <div className="relative w-full md:w-56 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Ara..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-slate-900 h-[38px]" 
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
                {/* LIST AREA */}
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedTicket ? 'hidden lg:block lg:w-2/5' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 pl-6">ID & Kullanıcı</th>
                                    <th className="p-4">Tip / Kategori</th>
                                    <th className="p-4">Öncelik</th>
                                    <th className="p-4">Durum</th>
                                    <th className="p-4 text-right pr-6">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTickets.map(t => (
                                    <tr key={t.id} onClick={() => setSelectedTicketId(t.id)} className={`group hover:bg-slate-50 cursor-pointer ${selectedTicketId === t.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}>
                                        <td className="p-4 pl-6">
                                            <div className="font-bold text-slate-900 text-sm">{t.subject}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                                {t.id} • {t.userType === 'Corporate' ? <Building2 size={10}/> : <User size={10}/>} {t.user}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-[10px] font-bold text-slate-700">{t.type}</div>
                                            <div className="text-[9px] text-slate-400 uppercase">{t.category}</div>
                                        </td>
                                        <td className="p-4">{getPriorityBadge(t.priority)}</td>
                                        <td className="p-4">{getStatusBadge(t.status)}</td>
                                        <td className="p-4 text-right pr-6"><ChevronRight size={16} className="text-slate-300"/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredTickets.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                Kriterlere uygun kayıt bulunamadı.
                            </div>
                        )}
                    </div>
                </div>

                {/* DETAIL AREA */}
                {selectedTicket && (
                    <div className="flex-[3] bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-slide-in-right">
                        
                        {/* Detail Header */}
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-start shrink-0">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-900">{selectedTicket.subject}</h3>
                                    {getStatusBadge(selectedTicket.status)}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="font-mono bg-white border px-1.5 rounded">{selectedTicket.id}</span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> Oluşturulma: {selectedTicket.date}</span>
                                    <span className="flex items-center gap-1 font-bold text-slate-700 bg-slate-200 px-2 rounded-md">{selectedTicket.type}</span>
                                    {selectedTicket.slaDeadline && <span className="flex items-center gap-1 text-red-600 font-bold"><AlertCircle size={12}/> SLA: {selectedTicket.slaDeadline}</span>}
                                </div>
                            </div>
                            <button onClick={() => setSelectedTicketId(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={20}/></button>
                        </div>

                        {/* Status Control Bar */}
                        <div className="p-3 bg-slate-900 text-white flex gap-2 items-center justify-between shadow-md shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-widest pl-2">Durum Değiştir:</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleStatusChange('İnceleniyor')} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-[10px] font-bold uppercase transition-colors">İncelemeye Al</button>
                                <button onClick={() => handleStatusChange('Beklemede')} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded text-[10px] font-bold uppercase transition-colors">Beklemeye Al</button>
                                <button onClick={() => handleStatusChange('Çözüldü')} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded text-[10px] font-bold uppercase transition-colors">Çözüldü İşaretle</button>
                                {selectedTicket.status === 'Çözüldü' && (
                                    <button onClick={() => handleStatusChange('Kapatıldı')} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-[10px] font-bold uppercase transition-colors">Kapat</button>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-100 bg-white shrink-0">
                            <button onClick={() => setActiveTab('details')} className={`px-6 py-3 text-xs font-bold border-b-2 transition-all ${activeTab === 'details' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500'}`}>Genel Bakış</button>
                            <button onClick={() => setActiveTab('internal')} className={`px-6 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'internal' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'}`}><Lock size={12}/> İç Notlar ({selectedTicket.internalNotes.length})</button>
                            <button onClick={() => setActiveTab('audit')} className={`px-6 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'audit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500'}`}><Activity size={12}/> Denetim Logu</button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 custom-scrollbar">
                            
                            {activeTab === 'details' && (
                                <div className="space-y-6">
                                    {/* Description Card */}
                                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Talep Açıklaması</h4>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
                                        
                                        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                                            <div><span className="font-bold text-slate-500">Kategori:</span> {selectedTicket.category}</div>
                                            <div><span className="font-bold text-slate-500">Atanan Personel:</span> {selectedTicket.assignedTo || '-'}</div>
                                        </div>
                                    </div>

                                    {/* Attachments */}
                                    {selectedTicket.attachments.length > 0 && (
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Paperclip size={14}/> Ekler</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedTicket.attachments.map((file, i) => (
                                                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                                                        <FileText size={14} className="text-blue-500"/> {file.name} <span className="text-slate-400 font-normal">({file.size})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Public Reply Box */}
                                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Yanıt Gönder (Müşteriye)</h4>
                                        <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24" placeholder="Çözüm veya bilgilendirme mesajınız..."></textarea>
                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex gap-2">
                                                <button className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-600 transition-colors">Şablon Kullan</button>
                                            </div>
                                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                                                <Send size={14}/> Gönder
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'internal' && (
                                <div className="space-y-4">
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-800 text-xs flex items-center gap-2">
                                        <Lock size={14}/> Bu alandaki notlar sadece yöneticiler tarafından görülebilir. Müşteriye iletilmez.
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {selectedTicket.internalNotes.map((note, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-amber-400 shadow-sm text-sm text-slate-700">
                                                {note}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-4">
                                        <textarea 
                                            value={internalNoteInput}
                                            onChange={(e) => setInternalNoteInput(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-amber-400"
                                            placeholder="Dahili not ekle..."
                                            rows={3}
                                        ></textarea>
                                        <button 
                                            onClick={handleAddInternalNote}
                                            className="mt-2 bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors w-full"
                                        >
                                            Notu Kaydet
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'audit' && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500">
                                            <tr>
                                                <th className="p-3">Tarih</th>
                                                <th className="p-3">İşlem</th>
                                                <th className="p-3">Kişi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {selectedTicket.auditLog.map((log, i) => (
                                                <tr key={i} className="hover:bg-slate-50">
                                                    <td className="p-3 font-mono text-slate-400">{log.date}</td>
                                                    <td className="p-3 font-medium text-slate-700">{log.action}</td>
                                                    <td className="p-3 text-slate-500">{log.actor}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportManager;
