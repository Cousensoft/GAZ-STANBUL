
import React, { useState, useEffect } from 'react';
import { useCorporate, CorporateRequest } from '../../../context/CorporateContext';
import { MOCK_REQUESTS } from '../../../utils/constants'; // MOCK_REQUESTS eklendi
import { Search, MapPin, CheckCircle, Clock, AlertCircle, FileText, X, Send, Lock, ChevronRight, ChevronLeft, List, LayoutGrid, MoreHorizontal, Calendar, Info, Infinity, Image as ImageIcon, PlayCircle, Maximize2 } from 'lucide-react';

interface RequestsListProps {
    initialFilter?: string;
}

const RequestsList: React.FC<RequestsListProps> = ({ initialFilter = 'all' }) => {
    const { requests, updateRequestStatus, sendOffer, currentCompanyId } = useCorporate();
    const [requestScope, setRequestScope] = useState<'general' | 'private'>('general');
    const [filter, setFilter] = useState(initialFilter);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<CorporateRequest | null>(null);

    // Medya Lightbox State - Index tabanlı
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

    // Form States
    const [offerPrice, setOfferPrice] = useState('');
    const [offerNote, setOfferNote] = useState('');
    const [validityMode, setValidityMode] = useState<'days' | 'indefinite'>('days');
    const [validityDays, setValidityDays] = useState(3);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Selected Request'in detaylı verisi (Medya dahil)
    // Context'teki CorporateRequest tipi basit olduğu için, full veriyi Mock'tan çekiyoruz
    // Gerçekte API'den detay endpoint'ine istek atılırdı.
    const fullRequestData = selectedRequest ? MOCK_REQUESTS.find(r => r.id === selectedRequest.id) : null;

    // Filter Logic
    const filteredRequests = requests.filter(r => {
        const isPrivateForMe = r.targetCompanyId === currentCompanyId;
        const isPublic = !r.targetCompanyId;

        if (requestScope === 'general' && !isPublic) return false;
        if (requestScope === 'private' && !isPrivateForMe) return false;

        const matchesFilter = filter === 'all' || r.status === filter;
        const matchesSearch = r.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              r.customerName.toLowerCase().includes(searchQuery.toLowerCase());
                              
        return matchesFilter && matchesSearch;
    });

    const privateCount = requests.filter(r => r.targetCompanyId === currentCompanyId && r.status === 'new').length;

    const handleSubmitOffer = () => {
        if (!selectedRequest) return;
        if (!offerPrice || Number(offerPrice) <= 0) {
            alert("Lütfen geçerli bir fiyat giriniz.");
            return;
        }
        if (validityMode === 'days' && validityDays < 3) {
            alert("Teklif geçerlilik süresi en az 3 gün olmalıdır.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            sendOffer(
                selectedRequest.id, 
                Number(offerPrice), 
                offerNote, 
                validityMode === 'indefinite' ? 'indefinite' : validityDays
            );
            setIsSubmitting(false);
            setSelectedRequest(null);
            setOfferPrice('');
            setOfferNote('');
            setValidityDays(3);
            setValidityMode('days');
            alert("Teklifiniz başarıyla iletildi.");
        }, 800);
    };

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'new': return <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold">Yeni</span>;
            case 'offered': return <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold">Teklif Verildi</span>;
            case 'read': return <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">Okundu</span>;
            default: return null;
        }
    };

    // --- GALERİ NAVİGASYONU ---
    const handleNextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedMediaIndex !== null && fullRequestData?.media) {
            setSelectedMediaIndex((prev) => (prev! + 1) % fullRequestData.media!.length);
        }
    };

    const handlePrevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedMediaIndex !== null && fullRequestData?.media) {
            setSelectedMediaIndex((prev) => (prev! - 1 + fullRequestData.media!.length) % fullRequestData.media!.length);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            
            {/* LIGHTBOX FOR MEDIA */}
            {selectedMediaIndex !== null && fullRequestData && fullRequestData.media && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setSelectedMediaIndex(null)}>
                    <button className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[210]" onClick={() => setSelectedMediaIndex(null)}>
                        <X size={32} />
                    </button>

                    {/* Navigation Buttons */}
                    {fullRequestData.media.length > 1 && (
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
                        {fullRequestData.media[selectedMediaIndex].type === 'video' ? (
                            <video 
                                src={fullRequestData.media[selectedMediaIndex].url} 
                                controls 
                                autoPlay 
                                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl outline-none" 
                            />
                        ) : (
                            <img 
                                src={fullRequestData.media[selectedMediaIndex].url} 
                                alt="Detail" 
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
                            />
                        )}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md text-white text-sm font-bold pointer-events-none">
                             {selectedMediaIndex + 1} / {fullRequestData.media.length}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200 shrink-0 w-fit">
                <button onClick={() => {setRequestScope('general'); setSelectedRequest(null);}} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${requestScope === 'general' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>Genel Havuz</button>
                <button onClick={() => {setRequestScope('private'); setSelectedRequest(null);}} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${requestScope === 'private' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                    <Lock size={14} /> Bana Özel {privateCount > 0 && <span className="bg-white text-purple-600 px-1.5 py-0.5 rounded text-[10px] font-black">{privateCount}</span>}
                </button>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden relative">
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedRequest ? 'hidden lg:block lg:w-[60%]' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-6">Hizmet</th>
                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Müşteri</th>
                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Durum</th>
                                    <th className="p-4 text-right pr-6"><MoreHorizontal size={16}/></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredRequests.map(req => (
                                    <tr key={req.id} onClick={() => setSelectedRequest(req)} className={`group hover:bg-slate-50 transition-colors cursor-pointer ${selectedRequest?.id === req.id ? 'bg-blue-50/50 border-l-4 border-slate-900' : 'border-l-4 border-transparent'}`}>
                                        <td className="p-4 pl-6">
                                            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">{req.serviceType} {req.urgency === 'urgent' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}</div>
                                            <div className="text-[10px] text-slate-400">{req.district} • {req.date}</div>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-700">{req.customerName}</td>
                                        <td className="p-4">{getStatusBadge(req.status)}</td>
                                        <td className="p-4 text-right pr-6"><ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedRequest && (
                    <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-[40%] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-slide-in-right flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400"><FileText size={16}/></div>
                                <h3 className="font-bold text-slate-900">Teklif Hazırla</h3>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X size={20}/></button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Müşteri Talebi</h4>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h5 className="font-bold text-slate-900 text-sm mb-1">{selectedRequest.serviceType}</h5>
                                    <p className="text-xs text-slate-500 leading-relaxed italic">"{selectedRequest.description}"</p>

                                    {/* --- MEDIA PREVIEW IN CORPORATE PANEL --- */}
                                    {fullRequestData && fullRequestData.media && fullRequestData.media.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-slate-200">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                                <ImageIcon size={12}/> Ekli Medya ({fullRequestData.media.length})
                                            </p>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {fullRequestData.media.map((item, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => setSelectedMediaIndex(idx)}
                                                        className="relative w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 border border-slate-300"
                                                    >
                                                        <img src={item.type === 'video' ? item.thumbnail : item.url} alt="Media" className="w-full h-full object-cover" />
                                                        {item.type === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><PlayCircle size={12} className="text-white"/></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 space-y-6">
                                {/* Fiyat Girişi */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Fiyat Teklifi (TL)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₺</span>
                                        <input 
                                            type="number" 
                                            value={offerPrice}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                            placeholder="0.00" 
                                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 pl-9 text-sm font-black focus:ring-2 focus:ring-slate-900 outline-none transition-all" 
                                        />
                                    </div>
                                </div>

                                {/* Geçerlilik Süresi Seçici */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                                        <Calendar size={14} /> Teklif Geçerlilik Süresi
                                    </label>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <button 
                                            onClick={() => setValidityMode('days')}
                                            className={`py-2.5 rounded-xl text-[11px] font-black uppercase transition-all border-2 ${validityMode === 'days' ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            Süreli (Gün)
                                        </button>
                                        <button 
                                            onClick={() => setValidityMode('indefinite')}
                                            className={`py-2.5 rounded-xl text-[11px] font-black uppercase transition-all border-2 ${validityMode === 'indefinite' ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            <div className="flex items-center justify-center gap-1.5"><Infinity size={14}/> Süresiz</div>
                                        </button>
                                    </div>

                                    {validityMode === 'days' && (
                                        <div className="animate-fade-in space-y-4">
                                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                <button 
                                                    onClick={() => setValidityDays(prev => Math.max(3, prev - 1))}
                                                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-lg hover:bg-slate-50 transition-colors"
                                                >-</button>
                                                <div className="flex-1 text-center">
                                                    <span className="text-xl font-black text-slate-900">{validityDays}</span>
                                                    <span className="text-xs font-bold text-slate-400 ml-1">GÜN</span>
                                                </div>
                                                <button 
                                                    onClick={() => setValidityDays(prev => prev + 1)}
                                                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-lg hover:bg-slate-50 transition-colors"
                                                >+</button>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {[3, 7, 15, 30].map(d => (
                                                    <button 
                                                        key={d}
                                                        onClick={() => setValidityDays(d)}
                                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${validityDays === d ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
                                                    >
                                                        {d} GÜN
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex items-start gap-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                                <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                                <p className="text-[10px] text-blue-700 font-medium leading-tight">Minimum 3 gün geçerlilik zorunludur. Teklifiniz <b>{new Date(Date.now() + validityDays * 24*60*60*1000).toLocaleDateString('tr-TR')}</b> tarihine kadar geçerli kalacaktır.</p>
                                            </div>
                                        </div>
                                    )}

                                    {validityMode === 'indefinite' && (
                                        <div className="animate-fade-in p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Infinity size={18} />
                                            </div>
                                            <p className="text-[10px] text-emerald-800 font-bold uppercase leading-tight tracking-wider">Teklifiniz müşteri tarafından kabul edilene veya siz iptal edene kadar geçerli kalacaktır.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Not Alanı */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Teklif Notu</label>
                                    <textarea 
                                        rows={4} 
                                        value={offerNote}
                                        onChange={(e) => setOfferNote(e.target.value)}
                                        placeholder="Müşteriye iletmek istediğiniz özel notunuzu buraya yazın..." 
                                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm resize-none focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-300"
                                    ></textarea>
                                </div>

                                <button 
                                    onClick={handleSubmitOffer}
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <><Send size={18} /> Teklifinizi Gönderin</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestsList;
