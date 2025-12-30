
import React, { useState, useRef, useEffect } from 'react';
import { 
    LifeBuoy, 
    Plus, 
    Search, 
    Filter, 
    FileText, 
    Paperclip, 
    X, 
    Send, 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    ChevronRight, 
    UploadCloud, 
    Image as ImageIcon,
    MessageSquare,
    ShieldCheck,
    Briefcase,
    Calendar,
    Star,
    History
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { useAuth } from '../../../context/AuthContext';

// --- TYPES & ENUMS ---
type TicketStatus = 'Oluşturuldu' | 'İnceleniyor' | 'Beklemede' | 'Çözüldü' | 'Kapatıldı';
type TicketPriority = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
type TicketType = 'Şikayet' | 'Destek Talebi' | 'Bilgi Talebi' | 'Teknik Arıza' | 'Hukuki/Etik';

interface TimelineEvent {
    date: string;
    action: string;
    actor: string; // 'Sistem', 'Admin', 'Kullanıcı'
    note?: string;
}

interface Ticket {
    id: string;
    type: TicketType;
    subject: string;
    description: string;
    category: string;
    affectedService?: string;
    incidentDate?: string;
    priority: TicketPriority;
    status: TicketStatus;
    createdDate: string;
    lastUpdate: string;
    
    // Kurumsal Alanlar
    contractNo?: string;
    projectNo?: string;

    messages: {
        id: number;
        sender: 'user' | 'support';
        text: string;
        date: string;
        attachments?: string[];
    }[];
    
    timeline: TimelineEvent[];
    
    // Kapanış
    satisfactionScore?: number;
    satisfactionComment?: string;
}

const SupportPage = () => {
    const { user } = useAuth();
    const isCorporate = user?.role === 'corporate';

    // --- MOCK DATA ---
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: 'TKT-2024-001',
            type: 'Teknik Arıza',
            subject: 'Ödeme Entegrasyonu Hatası',
            description: 'API üzerinden ödeme almaya çalışırken 500 hatası alıyoruz.',
            category: 'Teknik',
            affectedService: 'Sanal POS',
            priority: 'Yüksek',
            status: 'İnceleniyor',
            createdDate: '24.10.2024 10:00',
            lastUpdate: '2 saat önce',
            contractNo: isCorporate ? 'CN-2023-885' : undefined,
            messages: [
                { id: 1, sender: 'user', text: 'Hata loglarını ekte paylaşıyorum. Acil destek rica ederim.', date: '24.10.2024 10:00' },
                { id: 2, sender: 'support', text: 'Merhaba, konuyu teknik ekibimize ilettik. İnceliyoruz.', date: '24.10.2024 10:45' }
            ],
            timeline: [
                { date: '24.10.2024 10:00', action: 'Talep Oluşturuldu', actor: 'Kullanıcı' },
                { date: '24.10.2024 10:45', action: 'Durum Değişti: İnceleniyor', actor: 'Admin (Destek Ekibi)' }
            ]
        },
        {
            id: 'TKT-2024-002',
            type: 'Şikayet',
            subject: 'Servis Personeli Davranışı',
            description: 'Gelen ekip maske takmıyordu ve randevu saatine 2 saat geç kaldı.',
            category: 'Hizmet Kalitesi',
            priority: 'Orta',
            status: 'Çözüldü',
            createdDate: '20.10.2024 14:00',
            lastUpdate: '1 gün önce',
            messages: [
                { id: 1, sender: 'user', text: 'Şikayetçiyim, lütfen gereği yapılsın.', date: '20.10.2024 14:00' },
                { id: 2, sender: 'support', text: 'Yaşanan aksaklık için özür dileriz. İlgili personele uyarı verildi.', date: '21.10.2024 09:00' }
            ],
            timeline: [
                { date: '20.10.2024 14:00', action: 'Talep Oluşturuldu', actor: 'Kullanıcı' },
                { date: '21.10.2024 09:00', action: 'Çözüm Önerildi', actor: 'Admin' }
            ]
        }
    ]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    
    // --- NEW TICKET FORM STATE ---
    const [formData, setFormData] = useState({
        type: 'Destek Talebi',
        category: 'Genel',
        subject: '',
        description: '',
        affectedService: '',
        incidentDate: '',
        contractNo: '', // Corporate only
        projectNo: '',  // Corporate only
        kvkkConsent: false,
        accuracyConsent: false
    });

    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- SATISFACTION SURVEY STATE ---
    const [rating, setRating] = useState(0);
    const [ratingComment, setRatingComment] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Basit dosya boyutu kontrolü (örn: 5MB)
            const newFiles = Array.from(e.target.files).filter((file: File) => file.size <= 5 * 1024 * 1024);
            if (newFiles.length !== e.target.files.length) alert('Bazı dosyalar 5MB sınırını aştığı için eklenmedi.');
            setAttachedFiles(prev => [...prev, ...newFiles]);
        }
    };

    // OTOMATİK ÖNCELİK BELİRLEME MANTIĞI
    const calculateInitialPriority = (type: string): TicketPriority => {
        switch (type) {
            case 'Teknik Arıza': return 'Yüksek';
            case 'Hukuki/Etik': return 'Yüksek';
            case 'Şikayet': return 'Orta';
            case 'Destek Talebi': return 'Orta';
            case 'Bilgi Talebi': return 'Düşük';
            default: return 'Düşük';
        }
    };

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.kvkkConsent || !formData.accuracyConsent) {
            alert("Lütfen yasal onay kutucuklarını işaretleyiniz.");
            return;
        }

        // Önceliği seçilen tipe göre belirle
        const determinedPriority = calculateInitialPriority(formData.type);

        const newTicket: Ticket = {
            id: `TKT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
            type: formData.type as TicketType,
            subject: formData.subject,
            description: formData.description,
            category: formData.category,
            affectedService: formData.affectedService,
            incidentDate: formData.incidentDate,
            priority: determinedPriority, // Dinamik öncelik
            status: 'Oluşturuldu',
            createdDate: new Date().toLocaleString('tr-TR'),
            lastUpdate: 'Şimdi',
            contractNo: isCorporate ? formData.contractNo : undefined,
            projectNo: isCorporate ? formData.projectNo : undefined,
            messages: [{
                id: 1,
                sender: 'user',
                text: formData.description,
                date: 'Şimdi',
                attachments: attachedFiles.map(f => f.name)
            }],
            timeline: [{
                date: new Date().toLocaleString('tr-TR'),
                action: 'Talep Oluşturuldu',
                actor: user?.name || 'Kullanıcı',
                note: `Sistem Tarafından Atanan Öncelik: ${determinedPriority}`
            }]
        };

        setTickets([newTicket, ...tickets]);
        setIsCreateModalOpen(false);
        // Reset Form
        setFormData({
            type: 'Destek Talebi', category: 'Genel', subject: '', description: '', affectedService: '', incidentDate: '', contractNo: '', projectNo: '', kvkkConsent: false, accuracyConsent: false
        });
        setAttachedFiles([]);
        alert(`Talebiniz başarıyla oluşturuldu. Öncelik Seviyesi: ${determinedPriority}`);
    };

    const handleCloseTicket = () => {
        if (!selectedTicket) return;
        if (rating === 0) {
            alert("Lütfen kapatmadan önce hizmetimizi puanlayın.");
            return;
        }

        const updatedTicket = {
            ...selectedTicket,
            status: 'Kapatıldı' as TicketStatus,
            satisfactionScore: rating,
            satisfactionComment: ratingComment,
            timeline: [
                ...selectedTicket.timeline,
                { date: 'Şimdi', action: 'Kullanıcı Onayı ile Kapatıldı', actor: user?.name || 'Kullanıcı', note: `Puan: ${rating}/5` }
            ]
        };

        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? updatedTicket : t));
        setSelectedTicket(updatedTicket);
        alert("Geri bildiriminiz için teşekkürler. Talep kapatıldı.");
    };

    const getStatusBadge = (status: TicketStatus) => {
        const styles = {
            'Oluşturuldu': 'bg-slate-100 text-slate-600',
            'İnceleniyor': 'bg-blue-100 text-blue-700',
            'Beklemede': 'bg-amber-100 text-amber-700',
            'Çözüldü': 'bg-green-100 text-green-700',
            'Kapatıldı': 'bg-gray-800 text-white'
        };
        return (
            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${styles[status] || styles['Oluşturuldu']}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* --- NEW TICKET MODAL --- */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                <LifeBuoy size={20} className="text-red-600"/> Yeni Destek Kaydı
                            </h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-white rounded-full text-slate-400 transition-colors"><X size={20}/></button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmitTicket} className="space-y-6">
                                
                                {/* Meta Bilgiler */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Talep Türü</label>
                                        <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none"
                                            value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                            <option>Destek Talebi</option>
                                            <option>Şikayet</option>
                                            <option>Bilgi Talebi</option>
                                            <option>Teknik Arıza</option>
                                            <option>Hukuki/Etik</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Kategori</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none"
                                            value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                            <option>Genel</option>
                                            <option>Teknik</option>
                                            <option>Finansal</option>
                                            <option>Hizmet Kalitesi</option>
                                            <option>Güvenlik</option>
                                        </select>
                                    </div>
                                </div>

                                {/* İçerik */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Konu Başlığı <span className="text-red-500">*</span></label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold"
                                            value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Kısaca özetleyin..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Detaylı Açıklama <span className="text-red-500">*</span></label>
                                        <textarea required rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm resize-none"
                                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Lütfen sorunu detaylandırın. Ne zaman oldu? Nasıl tekrarlanır?" />
                                    </div>
                                </div>

                                {/* Ek Bilgiler */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Etkilenen Modül/Hizmet</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm"
                                            value={formData.affectedService} onChange={e => setFormData({...formData, affectedService: e.target.value})} placeholder="Örn: Market Sepeti" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Olay Tarihi & Saati</label>
                                        <input type="datetime-local" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm"
                                            value={formData.incidentDate} onChange={e => setFormData({...formData, incidentDate: e.target.value})} />
                                    </div>
                                    
                                    {isCorporate && (
                                        <>
                                            <div>
                                                <label className="block text-xs font-bold text-indigo-500 uppercase mb-2">Sözleşme No (Kurumsal)</label>
                                                <input type="text" className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-sm"
                                                    value={formData.contractNo} onChange={e => setFormData({...formData, contractNo: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-indigo-500 uppercase mb-2">Proje / Sipariş No</label>
                                                <input type="text" className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-sm"
                                                    value={formData.projectNo} onChange={e => setFormData({...formData, projectNo: e.target.value})} />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Dosya Yükleme */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Ekler / Kanıtlar (Max 5MB)</label>
                                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center gap-3 text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
                                        <UploadCloud size={20}/>
                                        <span className="text-sm font-medium">Dosya seçmek için tıklayın</span>
                                        <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                    </div>
                                    {attachedFiles.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {attachedFiles.map((f, i) => (
                                                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
                                                    <Paperclip size={10}/> {f.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Hukuki Onaylar */}
                                <div className="space-y-3 pt-2 border-t border-slate-100">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required checked={formData.accuracyConsent} onChange={e => setFormData({...formData, accuracyConsent: e.target.checked})} className="mt-1" />
                                        <span className="text-xs text-slate-600">Paylaştığım bilgilerin ve belgelerin doğruluğunu beyan ederim. Yanıltıcı beyan durumunda hesabımın kısıtlanabileceğini kabul ediyorum.</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required checked={formData.kvkkConsent} onChange={e => setFormData({...formData, kvkkConsent: e.target.checked})} className="mt-1" />
                                        <span className="text-xs text-slate-600">Kişisel verilerimin şikayet/destek sürecinin yürütülmesi amacıyla işlenmesine ve ilgili birimlerle paylaşılmasına <span className="text-blue-600 hover:underline">KVKK Aydınlatma Metni</span> kapsamında rıza gösteriyorum.</span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <ShieldCheck size={18}/> Talebi Onayla ve Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LIST & DETAIL VIEW --- */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                        <LifeBuoy size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Destek Merkezi</h2>
                        <p className="text-sm text-slate-500">Tüm talepleriniz hukuki güvence altındadır.</p>
                    </div>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-800 shadow-lg">
                    <Plus size={18} /> Yeni Talep
                </button>
            </div>

            <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6 overflow-hidden">
                {/* List */}
                <div className={`flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${selectedTicket ? 'hidden md:flex md:w-1/3' : 'w-full'}`}>
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-2">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <input type="text" placeholder="Talep no veya konu..." className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-slate-900"/>
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900"><Filter size={18}/></button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {tickets.map(ticket => (
                            <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedTicket?.id === ticket.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-mono text-[10px] text-slate-400">{ticket.id}</span>
                                    <span className="text-[10px] text-slate-400">{ticket.lastUpdate}</span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-900 mb-2 truncate">{ticket.subject}</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(ticket.status)}
                                        <span className={`text-[10px] px-2 py-0.5 rounded border ${ticket.priority === 'Yüksek' || ticket.priority === 'Kritik' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>{ticket.priority}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail */}
                {selectedTicket ? (
                    <div className="flex-[2] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in relative">
                        {/* Header */}
                        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{selectedTicket.subject}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{selectedTicket.id}</span>
                                    <span>•</span>
                                    <span>{selectedTicket.type}</span>
                                    <span>•</span>
                                    <span>{selectedTicket.category}</span>
                                </div>
                                {selectedTicket.contractNo && (
                                    <div className="mt-2 flex items-center gap-2 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded w-fit">
                                        <Briefcase size={12}/> Sözleşme: {selectedTicket.contractNo}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button onClick={() => setSelectedTicket(null)} className="md:hidden p-2 bg-slate-100 rounded-full"><X size={16}/></button>
                                {getStatusBadge(selectedTicket.status)}
                                <span className="text-[10px] text-slate-400">{selectedTicket.createdDate}</span>
                            </div>
                        </div>

                        {/* Content Scroll */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            
                            {/* Main Description */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Talep Detayı</h4>
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
                                {selectedTicket.affectedService && (
                                    <div className="mt-4 pt-4 border-t border-slate-200 text-xs">
                                        <span className="font-bold text-slate-600">Etkilenen Hizmet:</span> {selectedTicket.affectedService}
                                    </div>
                                )}
                            </div>

                            {/* Timeline */}
                            <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                                {selectedTicket.timeline.map((event, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">{event.action}</p>
                                                <p className="text-[10px] text-slate-500">İşlem Yapan: {event.actor}</p>
                                                {event.note && <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded italic">"{event.note}"</p>}
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-mono">{event.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Messages */}
                            {selectedTicket.messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                                        <p>{msg.text}</p>
                                        <span className="text-[10px] opacity-60 mt-2 block text-right">{msg.date}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Solution & Close */}
                            {selectedTicket.status === 'Çözüldü' && !selectedTicket.satisfactionScore && (
                                <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-4 animate-pulse">
                                    <CheckCircle size={32} className="text-green-600 mx-auto"/>
                                    <h4 className="text-lg font-bold text-green-900">Çözüm Onayı ve Kapanış</h4>
                                    <p className="text-sm text-green-700">Admin tarafından talep çözüldü olarak işaretlendi. Memnuniyetinizi belirterek talebi kapatabilirsiniz.</p>
                                    
                                    <div className="flex justify-center gap-2 py-2">
                                        {[1,2,3,4,5].map(star => (
                                            <Star key={star} size={24} className={`cursor-pointer ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} onClick={() => setRating(star)}/>
                                        ))}
                                    </div>
                                    <textarea className="w-full bg-white border border-green-200 rounded-xl p-3 text-sm resize-none" placeholder="Yorumunuz (Opsiyonel)" value={ratingComment} onChange={e => setRatingComment(e.target.value)}></textarea>
                                    
                                    <button onClick={handleCloseTicket} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all">Onayla ve Kapat</button>
                                </div>
                            )}

                             {selectedTicket.status === 'Kapatıldı' && (
                                <div className="bg-gray-100 p-6 rounded-2xl text-center border border-gray-200">
                                    <History size={24} className="mx-auto text-gray-400 mb-2"/>
                                    <p className="text-sm font-bold text-gray-600">Bu talep arşive kaldırılmıştır.</p>
                                    <p className="text-xs text-gray-500 mt-1">Memnuniyet Puanı: {selectedTicket.satisfactionScore}/5</p>
                                </div>
                            )}
                        </div>

                        {/* Reply Input */}
                        {selectedTicket.status !== 'Kapatıldı' && selectedTicket.status !== 'Çözüldü' && (
                            <div className="p-4 border-t border-slate-100 bg-white">
                                <div className="relative">
                                    <textarea placeholder="Yanıt yazın..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pr-12 text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none h-24"></textarea>
                                    <div className="absolute bottom-3 right-3 flex gap-2">
                                        <button className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg"><Paperclip size={18}/></button>
                                        <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-md"><Send size={18}/></button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex flex-[2] flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200 border-dashed text-slate-400">
                        <MessageSquare size={64} className="mb-4 opacity-10"/>
                        <p className="font-bold">Detayları görüntülemek için listeden bir kayıt seçin</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportPage;
