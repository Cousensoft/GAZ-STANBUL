
import React, { useState } from 'react';
import { useCorporate, CorporateOffer } from '../../../context/CorporateContext';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { 
    CheckCircle, 
    Clock, 
    XCircle, 
    FileText, 
    Eye, 
    Edit2, 
    Trash2, 
    MessageSquare, 
    X, 
    Save, 
    Calendar,
    AlertCircle,
    RefreshCw,
    Check,
    ChevronRight,
    TurkishLira,
    Info,
    ArrowRight
} from 'lucide-react';

interface OffersListProps {
    onTabChange?: (tab: string) => void;
}

const OffersList: React.FC<OffersListProps> = ({ onTabChange }) => {
    const { offers: contextOffers } = useCorporate();
    
    // Senaryolar için genişletilmiş mock data
    const [offers, setOffers] = useState([
        { id: 'OFF-101', requestId: 'REQ-101', requestTitle: 'Kombi Bakımı', customerName: 'Ahmet Yılmaz', amount: 1500, status: 'revision_requested', date: '2 saat önce', validUntil: '30.10.2024', userRevision: { suggestedPrice: 1300, note: "Öğrenciyim, biraz indirim yapabilir misiniz?" } },
        { id: 'OFF-102', requestId: 'REQ-105', requestTitle: 'Petek Temizliği', customerName: 'Selin K.', amount: 800, status: 'accepted', date: '5 saat önce', validUntil: '01.11.2024', proposedDates: [new Date(2024, 9, 28), new Date(2024, 9, 29), new Date(2024, 9, 30)] },
        { id: 'OFF-103', requestId: 'REQ-108', requestTitle: 'Gaz Kaçağı Tespiti', customerName: 'Mehmet Öz', amount: 450, status: 'pending', date: '1 gün önce', validUntil: '28.10.2024' },
    ]);

    const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
    const [appointmentModal, setAppointmentModal] = useState<any | null>(null);
    const [revisionModal, setRevisionModal] = useState<any | null>(null);

    // --- AKSİYONLAR ---

    const handleConfirmAppointment = (offerId: string, date: Date) => {
        setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'completed', finalizedDate: date } : o));
        setAppointmentModal(null);
        alert(`${date.toLocaleDateString('tr-TR')} tarihine randevu başarıyla oluşturuldu!`);
    };

    const handleAcceptRevision = (offerId: string, newAmount: number) => {
        setOffers(prev => prev.map(o => o.id === offerId ? { ...o, amount: newAmount, status: 'pending' } : o));
        setRevisionModal(null);
        alert("Revize kabul edildi, teklif güncellendi.");
    };

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'accepted': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 border border-blue-200 shadow-sm"><Check size={10}/> Kabul Edildi</span>;
            case 'revision_requested': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 border border-amber-200 shadow-sm animate-pulse"><RefreshCw size={10}/> Revize İstendi</span>;
            case 'completed': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 border border-green-200 shadow-sm"><CheckCircle size={10}/> Kesinleşti</span>;
            case 'pending': return <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 border border-slate-200">Bekliyor</span>;
            default: return <span className="bg-slate-50 text-slate-400 px-2 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-100">{status}</span>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            
            {/* --- RANDEVU KESİNLEŞTİRME MODALI --- */}
            {appointmentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setAppointmentModal(null)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-xl">Randevu Tarihini Seçin</h3>
                                <p className="text-blue-100 text-xs mt-1">Müşterinin seçtiği 3 aday günden birini onaylayın.</p>
                            </div>
                            <button onClick={() => setAppointmentModal(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 gap-4">
                                {appointmentModal.proposedDates.map((date: Date, i: number) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleConfirmAppointment(appointmentModal.id, date)}
                                        className="group flex items-center justify-between p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <span className="text-[10px] font-black uppercase">{date.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>
                                                <span className="text-lg font-black leading-none">{date.getDate()}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-blue-900">{date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</h4>
                                                <p className="text-xs text-slate-500">Müşterinin {i+1}. tercihi</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-300 transition-all">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- REVİZE TALEBİ İNCELEME MODALI (Daha dar/kısa - max-w-md) --- */}
            {revisionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setRevisionModal(null)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-amber-500 p-5 text-white flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2"><RefreshCw size={20}/> Revize Talebi</h3>
                            <button onClick={() => setRevisionModal(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Mevcut Teklifiniz</span>
                                    <div className="text-xl font-black text-slate-400 line-through decoration-red-400">{revisionModal.amount} ₺</div>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 ring-2 ring-amber-500/10">
                                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-2">Müşterinin İstediği</span>
                                    <div className="text-3xl font-black text-slate-900">{revisionModal.userRevision.suggestedPrice} ₺</div>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-slate-100 p-4 rounded-2xl italic text-sm text-slate-600 relative">
                                <div className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Müşteri Notu</div>
                                "{revisionModal.userRevision.note}"
                            </div>

                            <div className="flex flex-col gap-2 pt-2">
                                <button 
                                    onClick={() => handleAcceptRevision(revisionModal.id, revisionModal.userRevision.suggestedPrice)}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl"
                                >
                                    Fiyatı Onayla ve Güncelle
                                </button>
                                <button className="w-full bg-white text-slate-600 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Kendi Teklifini Gönder</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <div className="flex justify-between items-center px-1">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Teklif Yönetimi</h2>
                    <p className="text-sm text-slate-500">Müşteri geri bildirimleri ve randevu seçimlerini yönetin.</p>
                </div>
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md">Aktifler</button>
                    <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-bold transition-all">Arşiv</button>
                </div>
            </div>

            {/* --- OFFERS LIST --- */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                            <th className="p-4 pl-6">Hizmet & Müşteri</th>
                            <th className="p-4">Teklif Tutarı</th>
                            <th className="p-4">Son İşlem</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 pr-6 text-right">Aksiyon</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {offers.map(offer => (
                            <tr key={offer.id} className={`group hover:bg-slate-50 transition-colors ${offer.status === 'revision_requested' ? 'bg-amber-50/20' : ''}`}>
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm border border-slate-100 ${offer.status === 'revision_requested' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {offer.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{offer.requestTitle}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{offer.customerName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-900">{offer.amount.toLocaleString('tr-TR')} ₺</span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">KDV Dahil</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                        <Clock size={12}/> {offer.date}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {getStatusBadge(offer.status)}
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        {offer.status === 'revision_requested' && (
                                            <button 
                                                onClick={() => setRevisionModal(offer)}
                                                className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 shadow-lg shadow-amber-100 flex items-center gap-2"
                                            >
                                                <RefreshCw size={14}/> Revizeyi İncele
                                            </button>
                                        )}
                                        
                                        {offer.status === 'accepted' && (
                                            <button 
                                                onClick={() => setAppointmentModal(offer)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 animate-bounce-subtle"
                                            >
                                                <Calendar size={14}/> Randevu Seç
                                            </button>
                                        )}

                                        {offer.status === 'completed' && (
                                            <button className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-100 flex items-center gap-2">
                                                <Info size={16}/> <span className="text-xs font-bold">Takip Et</span>
                                            </button>
                                        )}

                                        {offer.status === 'pending' && (
                                            <div className="flex gap-1">
                                                <button className="p-2 hover:bg-white rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all"><Edit2 size={16}/></button>
                                                <button className="p-2 hover:bg-white rounded-lg text-slate-400 border border-transparent hover:border-slate-200 transition-all"><Eye size={16}/></button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bilgilendirme Kartı */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Info size={12}/> İpucu
                        </div>
                        <h3 className="text-2xl font-black mb-2 tracking-tight">Tekliflerinizi Hızlandırın!</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Müşteriler genellikle 30 dakika içinde yanıt veren firmaları tercih ediyor. Randevu seçimlerini hızlı yaparak iş takviminizi önceden doldurabilirsiniz.
                        </p>
                    </div>
                    <button 
                        onClick={() => onTabChange?.('schedule')}
                        className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shrink-0"
                    >
                        Takvimimi Yönet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OffersList;
