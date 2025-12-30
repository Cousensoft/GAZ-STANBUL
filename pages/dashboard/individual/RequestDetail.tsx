
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES, MOCK_REQUESTS } from '../../../utils/constants'; // MOCK_REQUESTS import edildi
import { useRequests } from '../../../context/RequestContext';
import { useAuth } from '../../../context/AuthContext';
import { useCorporate } from '../../../context/CorporateContext';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star, 
  X, 
  Info, 
  Check,
  RefreshCw,
  TurkishLira,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Trash2,
  Image as ImageIcon,
  PlayCircle,
  Maximize2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { ServiceRequest } from '../../../types';

interface IndividualRequestDetailProps {
    request: any;
    onBack: () => void;
}

const IndividualRequestDetail: React.FC<IndividualRequestDetailProps> = ({ request: initialRequest, onBack }) => {
    const { user } = useAuth();
    const { rejectOffer: notifyRejection } = useCorporate();
    const { getRequestById } = useRequests(); // Context'ten alma (opsiyonel)
    
    // Veriyi MOCK_REQUESTS'ten bulmaya çalış veya prop'tan al (Medya verisi için)
    const foundRequest = MOCK_REQUESTS.find(r => r.id === initialRequest.id) || initialRequest;
    
    const [request, setRequest] = useState<ServiceRequest>(foundRequest);
    const [isRequestCancelled, setIsRequestCancelled] = useState(false);

    // Medya Lightbox State - Index tabanlı
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

    // Dinamik Teklif Listesi - Duration Mantığı için daysLeft ve deadline eklendi
    const [offers, setOffers] = useState([
        { id: 'OFF-101', company: 'Bosphorus Enerji', price: 1500, rating: 4.8, status: 'pending', note: 'Keşif ücretsizdir.', daysLeft: 3, deadline: '28.10.24' },
        { id: 'OFF-102', company: 'Galata Mekanik', price: 1800, rating: 4.5, status: 'pending', note: '2 yıl garanti veriyoruz.', daysLeft: 10, deadline: '05.11.24' },
        { id: 'OFF-103', company: 'Anadolu Teknik', price: 1350, rating: 4.2, status: 'rejected', note: 'Hemen başlayabiliriz.', daysLeft: 1, deadline: '25.10.24' },
        { id: 'OFF-104', company: 'Mavi Isı Sistemleri', price: 1650, rating: 4.6, status: 'pending', note: 'Orijinal parça garantisi.', daysLeft: 5, deadline: '30.10.24' },
    ]);

    // Modallar için State
    const [appointmentModal, setAppointmentModal] = useState<{isOpen: boolean, offer: any | null}>({ isOpen: false, offer: null });
    const [revisionModal, setRevisionModal] = useState<{isOpen: boolean, offer: any | null}>({ isOpen: false, offer: null });
    
    // Form ve Adım State'leri
    const [apptStep, setApptStep] = useState(1);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [revisionData, setRevisionData] = useState({ suggestedPrice: '', note: '' });

    // Takvim Yardımcısı (15 Gün)
    const getNext15Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 15; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            days.push(d);
        }
        return days;
    };
    const next15Days = getNext15Days();

    const handleDateToggle = (date: Date) => {
        const dateStr = date.toDateString();
        const isSelected = selectedDates.find(d => d.toDateString() === dateStr);
        if (isSelected) {
            setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateStr));
        } else if (selectedDates.length < 3) {
            setSelectedDates([...selectedDates, date]);
        }
    };

    // --- SÜRE VE RENK MANTIĞI ---
    const getValidityStyle = (daysLeft: number, deadline: string) => {
        if (daysLeft > 7) {
            // 7 Günden fazla: Mavi, Tarih Formatı
            return {
                text: `Son: ${deadline}`, 
                className: "bg-blue-50 text-blue-700 border-blue-100",
                iconColor: "text-blue-500"
            };
        } else if (daysLeft > 3 && daysLeft <= 7) {
            // 4-7 Gün arası: Turuncu
            return {
                text: `${daysLeft} Gün Kaldı`,
                className: "bg-amber-50 text-amber-700 border-amber-100",
                iconColor: "text-amber-500"
            };
        } else {
            // 3 Gün ve daha az (3 Dahil): Kırmızı Arkaplan
            return {
                text: daysLeft <= 1 ? "Son Gün!" : `${daysLeft} Gün Kaldı`,
                className: "bg-red-600 text-white border-red-600 shadow-md animate-pulse",
                iconColor: "text-white"
            };
        }
    };

    // --- AKSİYONLAR ---

    const handleAcceptClick = (offer: any) => {
        if (isRequestCancelled) return;
        setAppointmentModal({ isOpen: true, offer });
        setApptStep(1);
        setSelectedDates([]);
    };

    const handleConfirmAppointment = () => {
        if (selectedDates.length !== 3) return;
        const targetId = appointmentModal.offer.id;
        
        setOffers(prev => prev.map(o => {
            if (o.id === targetId) return { ...o, status: 'accepted' };
            return { ...o, status: 'rejected' };
        }));

        setApptStep(2);
        setRequest(prev => ({ ...prev, status: 'Tamamlandı' })); // Statü güncellemesi
    };

    const handleOpenRevision = (offer: any) => {
        if (isRequestCancelled) return;
        setRevisionModal({ isOpen: true, offer });
        setRevisionData({ suggestedPrice: '', note: '' });
    };

    const handleSendRevision = (e: React.FormEvent) => {
        e.preventDefault();
        const targetId = revisionModal.offer.id;
        setOffers(prev => prev.map(o => o.id === targetId ? { ...o, status: 'revision_requested' } : o));
        setRevisionModal({ isOpen: false, offer: null });
        alert('Revize talebiniz iletildi.');
    };

    // --- ÇARPI (REJECT) BUTONU DÜZELTMESİ ---
    const handleRejectOffer = (e: React.MouseEvent, offerId: string) => {
        e.preventDefault();
        e.stopPropagation(); // Kart tıklamasını engelle
        
        if (isRequestCancelled) return;

        if (window.confirm('Bu teklifi reddetmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
            // 1. Yerel durumu güncelle
            setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'rejected' } : o));
            // 2. Kurumsal tarafa bildirim gönder
            notifyRejection(offerId);
        }
    };

    // --- GENEL TALEP İPTALİ ---
    const handleCancelEntireRequest = () => {
        if (window.confirm('Bu talebi tamamen iptal etmek istediğinize emin misiniz? Tüm teklifler geçersiz sayılacaktır.')) {
            setIsRequestCancelled(true);
            setRequest(prev => ({ ...prev, status: 'İptal Edildi' }));
            setOffers(prev => prev.map(o => ({ ...o, status: 'rejected' })));
        }
    };

    // --- GALERİ NAVİGASYONU ---
    const handleNextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedMediaIndex !== null && request.media) {
            setSelectedMediaIndex((prev) => (prev! + 1) % request.media!.length);
        }
    };

    const handlePrevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedMediaIndex !== null && request.media) {
            setSelectedMediaIndex((prev) => (prev! - 1 + request.media!.length) % request.media!.length);
        }
    };

    return (
        <div className="animate-fade-in space-y-6 relative pb-20">
            
            {/* LIGHTBOX FOR MEDIA */}
            {selectedMediaIndex !== null && request.media && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setSelectedMediaIndex(null)}>
                    <button className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[210]" onClick={() => setSelectedMediaIndex(null)}>
                        <X size={32} />
                    </button>
                    
                    {/* Navigation Buttons */}
                    {request.media.length > 1 && (
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
                        {request.media[selectedMediaIndex].type === 'video' ? (
                            <video 
                                src={request.media[selectedMediaIndex].url} 
                                controls 
                                autoPlay 
                                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl outline-none" 
                            />
                        ) : (
                            <img 
                                src={request.media[selectedMediaIndex].url} 
                                alt="Detail" 
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
                            />
                        )}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md text-white text-sm font-bold pointer-events-none">
                             {selectedMediaIndex + 1} / {request.media.length}
                        </div>
                    </div>
                </div>
            )}

            {/* --- RANDEVU SEÇİM MODALI --- */}
            {appointmentModal.isOpen && appointmentModal.offer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => apptStep === 2 ? setAppointmentModal({isOpen:false, offer:null}) : null}></div>
                    <div className="bg-white rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                        <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Randevu Planla & Onayla</h3>
                                <p className="text-xs text-slate-500">Firma: {appointmentModal.offer.company}</p>
                            </div>
                            <button onClick={() => setAppointmentModal({isOpen:false, offer:null})} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto custom-scrollbar p-6">
                            {apptStep === 1 ? (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <Calendar size={18} className="text-red-600"/> Müsait Olduğunuz 3 Günü Seçin
                                        </h4>
                                        <div className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 uppercase">
                                            {selectedDates.length} / 3 SEÇİLDİ
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                                        {next15Days.map((date, idx) => {
                                            const isSelected = selectedDates.find(d => d.toDateString() === date.toDateString());
                                            const isSunday = date.getDay() === 0;
                                            return (
                                                <button 
                                                    key={idx}
                                                    disabled={isSunday}
                                                    onClick={() => handleDateToggle(date)}
                                                    className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                                                        isSelected 
                                                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10' 
                                                        : isSunday 
                                                            ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed' 
                                                            : 'bg-white text-slate-600 border-slate-100 hover:border-red-200'
                                                    }`}
                                                >
                                                    <span className={`text-[10px] font-bold uppercase mb-1 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>{date.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>
                                                    <span className="text-xl font-black">{date.getDate()}</span>
                                                    <span className={`text-[9px] font-bold mt-1 uppercase ${isSelected ? 'text-white/50' : 'text-slate-300'}`}>{date.toLocaleDateString('tr-TR', { month: 'short' })}</span>
                                                    {isSelected && <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><Check size={12} strokeWidth={4} /></div>}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 mb-8">
                                        <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                                        <p className="text-xs text-blue-800 leading-relaxed font-medium">Firma bu 3 günden birini onaylayarak randevunuzu kesinleştirecektir. <b>Onaylandığında diğer teklifler otomatik elenecektir.</b></p>
                                    </div>

                                    <button 
                                        disabled={selectedDates.length !== 3}
                                        onClick={handleConfirmAppointment}
                                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all shadow-xl"
                                    >
                                        Teklifi Onayla ve Planla
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-8 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce"><CheckCircle size={40} className="text-green-600" /></div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Harika! Firma Seçildi</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-sm mx-auto">Talebiniz iletildi. Firma randevuyu onayladığında <b>Paneliniz üzerinden bildirim alacaksınız.</b> Diğer tüm teklifler elendi.</p>
                                    <button onClick={() => setAppointmentModal({isOpen:false, offer:null})} className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">Kapat</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- REVİZE MODALI --- */}
            {revisionModal.isOpen && revisionModal.offer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setRevisionModal({ isOpen: false, offer: null })}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-amber-50 border-b border-amber-100 p-5 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2"><RefreshCw size={20} className="text-amber-500"/> Teklif Revize Talebi</h3>
                            <button onClick={() => setRevisionModal({ isOpen: false, offer: null })} className="p-2 hover:bg-white rounded-full text-slate-400 transition-colors"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSendRevision} className="p-6 space-y-5">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mevcut Teklif:</span>
                                <span className="text-lg font-black text-slate-900">{revisionModal.offer.price} ₺</span>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">İstediğiniz Fiyat (₺)</label>
                                <div className="relative">
                                    <TurkishLira className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                        placeholder="Hedef fiyatınızı girin..."
                                        value={revisionData.suggestedPrice}
                                        onChange={e => setRevisionData({...revisionData, suggestedPrice: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Revize Nedeniniz / Notunuz</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                                    placeholder="Neden revize istediğinizi veya beklentinizi belirtin..."
                                    value={revisionData.note}
                                    onChange={e => setRevisionData({...revisionData, note: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-amber-100">Revize Talebini İlet</button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"><ArrowLeft size={20} /></button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Talep Detayı</h2>
                    <p className="text-sm text-slate-500">#{request.id} numaralı talebe gelen tüm teklifler.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <WidgetCard className={isRequestCancelled ? 'opacity-60 grayscale' : ''}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{request.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin size={12}/> {request.district}</span>
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {request.date}</span>
                                    <span className={`px-2 py-0.5 rounded font-bold ${request.status === 'Acil' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed border border-slate-100 mb-4">
                            {request.description}
                        </div>

                        {/* --- MEDYA GALERİSİ ALANI --- */}
                        {request.media && request.media.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <ImageIcon size={14} /> Ekli Dosyalar / Medya
                                </h4>
                                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                                    {request.media.map((item: any, idx: number) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setSelectedMediaIndex(idx)}
                                            className="relative flex-shrink-0 w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                                        >
                                            <img src={item.type === 'video' ? item.thumbnail : item.url} alt="Request media" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                {item.type === 'video' ? <PlayCircle size={32} className="text-white drop-shadow-md" /> : <Maximize2 size={24} className="text-white drop-shadow-md" />}
                                            </div>
                                            {item.type === 'video' && (
                                                <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full backdrop-blur-sm">
                                                    <PlayCircle size={12} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </WidgetCard>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h4 className="text-lg font-bold text-slate-900">Gelen Teklifler ({offers.length})</h4>
                        </div>
                        <div className="space-y-3">
                            {offers.map(offer => {
                                // Style Logic Calculation
                                const badgeInfo = getValidityStyle(offer.daysLeft, offer.deadline);
                                
                                return (
                                    <WidgetCard key={offer.id} className={`flex flex-col md:flex-row gap-4 items-center transition-all relative overflow-hidden ${
                                        offer.status === 'accepted' ? 'border-green-300 bg-green-50/30 shadow-lg scale-[1.02]' : 
                                        offer.status === 'rejected' ? 'opacity-50 bg-slate-50 grayscale border-dashed' : 
                                        'hover:border-slate-300'
                                    }`}>
                                        
                                        {/* ABSOLUTE TOP-RIGHT DURATION BADGE (UPDATED LOGIC) */}
                                        {offer.daysLeft && offer.status !== 'rejected' && (
                                            <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm border ${badgeInfo.className}`}>
                                                <Clock size={12} className={badgeInfo.iconColor} /> {badgeInfo.text}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 flex-1 w-full">
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200">
                                                {offer.company.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h5 className={`font-bold ${offer.status === 'rejected' ? 'text-slate-400' : 'text-slate-900'}`}>{offer.company}</h5>
                                                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold"><Star size={12} fill="currentColor" /> {offer.rating}</div>
                                                <p className="text-xs text-slate-500 mt-1 italic">"{offer.note}"</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                                            <div className="text-right min-w-[100px]">
                                                <span className={`block text-xl font-black ${offer.status === 'rejected' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{offer.price} ₺</span>
                                                
                                                {offer.status === 'rejected' && <span className="text-[10px] text-red-500 font-black uppercase flex items-center justify-end gap-1">Elenmiş</span>}
                                                {offer.status === 'revision_requested' && <span className="text-[10px] text-amber-600 font-black uppercase flex items-center justify-end gap-1"><RefreshCw size={10} className="animate-spin-slow"/> Revize Bekleniyor</span>}
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                {offer.status === 'accepted' ? (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-xs border border-green-200"><CheckCircle size={14} /> Kabul Edildi</div>
                                                ) : offer.status === 'rejected' ? (
                                                    <div className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-bold text-xs border border-slate-200 flex items-center gap-2 cursor-not-allowed">
                                                        <XCircle size={14} /> Reddedildi
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2 relative z-10">
                                                        <button 
                                                            disabled={isRequestCancelled}
                                                            onClick={(e) => { e.stopPropagation(); handleOpenRevision(offer); }} 
                                                            className="p-2.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 border border-amber-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                                                            title="Revize İste"
                                                        >
                                                            <RefreshCw size={18} />
                                                        </button>
                                                        <button 
                                                            disabled={isRequestCancelled}
                                                            onClick={(e) => handleRejectOffer(e, offer.id)} 
                                                            className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white border border-red-100 transition-all cursor-pointer shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed" 
                                                            title="Teklifi Reddet"
                                                        >
                                                            <X size={18} className="group-hover:scale-110 transition-transform" />
                                                        </button>
                                                        <button 
                                                            disabled={isRequestCancelled}
                                                            onClick={(e) => { e.stopPropagation(); handleAcceptClick(offer); }} 
                                                            className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition-all shadow-md shadow-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Kabul Et
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </WidgetCard>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <WidgetCard className="bg-slate-900 text-white border-none transition-all shadow-xl">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2"><Clock size={20} className="text-blue-400"/> Süreç Takibi</h4>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-700"></div>
                            <div className="flex gap-4 relative z-10">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]"><Check size={16} strokeWidth={4} /></div>
                                <div><h5 className="font-bold text-sm">Talep Alındı</h5><p className="text-xs text-slate-400">Firmalar bilgilendirildi</p></div>
                            </div>
                            <div className="flex gap-4 relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${request.status === 'İşlemde' || request.status === 'Tamamlandı' ? 'bg-green-500 text-slate-900 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : request.status === 'İptal Edildi' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`}>{request.status === 'İşlemde' || request.status === 'Tamamlandı' ? <Check size={16} strokeWidth={4} /> : request.status === 'İptal Edildi' ? <XCircle size={16}/> : <Clock size={16} />}</div>
                                <div><h5 className="font-bold text-sm">{request.status === 'İşlemde' || request.status === 'Tamamlandı' ? 'Firma Onaylandı' : request.status === 'İptal Edildi' ? 'Talep İptal Edildi' : 'Karar Aşaması'}</h5><p className="text-xs text-slate-400">{request.status === 'İşlemde' ? 'Randevu bekleniyor' : request.status === 'Tamamlandı' ? 'İşlemler bitti' : request.status === 'İptal Edildi' ? 'İşlem durduruldu' : 'Teklifler değerlendiriliyor'}</p></div>
                            </div>
                        </div>

                        {!isRequestCancelled && (
                            <button 
                                onClick={handleCancelEntireRequest}
                                className="w-full mt-10 py-3 bg-white/5 border border-white/10 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14}/> Talebi İptal Et
                            </button>
                        )}
                    </WidgetCard>
                    
                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">İşlem Güvenliği</h4>
                        <div className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                            <ShieldCheck className="text-green-500 shrink-0" size={18} />
                            <p>Kabul ettiğiniz firma <b>Gazistanbul Onaylı</b> statüsündedir. Tüm süreç sistem denetimindedir.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualRequestDetail;
