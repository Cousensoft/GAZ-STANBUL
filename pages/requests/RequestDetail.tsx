
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES, MOCK_REQUESTS } from '../../utils/constants'; // MOCK_REQUESTS'i buradan alıyoruz
import { useRequests } from '../../context/RequestContext';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  FileText, 
  TurkishLira, 
  Briefcase, 
  X, 
  Send, 
  Lock,
  Building2,
  Image as ImageIcon,
  PlayCircle,
  Maximize2
} from 'lucide-react';
import { WidgetCard } from '../../components/dashboard/Widgets';

const RequestDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getRequestById } = useRequests();
  const [request, setRequest] = useState<any>(null);
  
  // Medya Lightbox State - Index tabanlı
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerDuration, setOfferDuration] = useState('');
  const [offerNote, setOfferNote] = useState('');
  const [isOfferSubmitting, setIsOfferSubmitting] = useState(false);
  const [offerSent, setOfferSent] = useState(false);

  useEffect(() => {
    if (id) {
        // Context'ten veya Mock veriden çekmeyi dene
        const found = getRequestById(id) || MOCK_REQUESTS.find(r => r.id === id);
        if (found) {
            setRequest(found);
        }
    }
    window.scrollTo(0, 0);
  }, [id, getRequestById]);

  if (!request) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Yükleniyor...</div>;

  // KRİTİK MANTIK: Sadece bu firmanın teklifi görünür (eğer talep özel ise)
  const isPrivate = !!request?.targetCompanyId;
  const isTargetCompany = user && isPrivate && user.id === request.targetCompanyId;
  const isOwner = user && request && user.id === request.userId;

  // Mock Teklifler (Demo için filtrelenmiş şekilde kullanılır)
  const ALL_OFFERS = [
    { id: 101, companyId: 'corp-1', price: 18500, duration: '3 Gün', note: 'Keşif sonrası net fiyat verilecektir.', date: '2 saat önce', status: 'pending' },
    { id: 102, companyId: 'corp-2', price: 21000, duration: '5 Gün', note: 'Tüm işçilik dahildir.', date: '5 saat önce', status: 'pending' }
  ];

  const visibleOffers = isPrivate 
    ? ALL_OFFERS.filter(o => o.companyId === request.targetCompanyId)
    : ALL_OFFERS;

  const handleOfferClick = () => {
    if (!isAuthenticated) {
        navigate('/login');
        return;
    }
    if (isPrivate && !isTargetCompany) {
        alert("Bu özel bir taleptir, sadece hedeflenen firma teklif verebilir.");
        return;
    }
    setIsOfferModalOpen(true);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOfferSubmitting(true);
    setTimeout(() => {
        setIsOfferSubmitting(false);
        setOfferSent(true);
        setTimeout(() => setIsOfferModalOpen(false), 2000);
    }, 1500);
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
    <div className="min-h-screen bg-slate-50 pt-[120px] pb-20">
        
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

        {/* TEKLİF MODALI */}
        {isOfferModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOfferModalOpen(false)}></div>
                <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                    <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                            <FileText size={20} className="text-red-600"/> Teklif Ver
                        </h3>
                        <button onClick={() => setIsOfferModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={16} /></button>
                    </div>

                    {!offerSent ? (
                        <form onSubmit={handleSubmitOffer} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fiyat (TL)</label>
                                <div className="relative">
                                    <TurkishLira className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10 pr-4 text-sm font-bold" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tahmini Süre</label>
                                <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium" value={offerDuration} onChange={(e) => setOfferDuration(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notunuz</label>
                                <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium resize-none" value={offerNote} onChange={(e) => setOfferNote(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-sm">Gönder</button>
                        </form>
                    ) : (
                        <div className="p-8 text-center flex flex-col items-center">
                            <CheckCircle size={48} className="text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-900">Teklif İletildi!</h3>
                        </div>
                    )}
                </div>
            </div>
        )}

        <div className="container mx-auto px-4 md:px-8 mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"><ChevronLeft size={18} /> Geri Dön</button>
        </div>

        <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* --- SOL TARA: DETAY VE AÇIKLAMA --- */}
                <div className="w-full lg:w-2/3 space-y-8">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                        {isPrivate && (
                            <div className="mb-4 bg-purple-50 border border-purple-100 p-4 rounded-2xl flex items-center gap-3">
                                <Lock size={20} className="text-purple-600" />
                                <div>
                                    <h4 className="font-bold text-purple-900 text-sm">Özel Talep Bildirimi</h4>
                                    <p className="text-xs text-purple-700">Bu talep sadece bir firma için oluşturulmuştur ve diğer firmalar tarafından teklif verilemez.</p>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${request.status === 'Acil' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-blue-100 text-blue-600'}`}>{request.status}</span>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">{request.title}</h1>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-t border-slate-100 pt-6 gap-6">
                            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-slate-600">
                                <div className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /><span className="font-bold">{request.district}, İstanbul</span></div>
                                <div className="flex items-center gap-2"><Briefcase size={16} className="text-blue-500" /><span className="font-bold">{request.sector}</span></div>
                                <div className="flex items-center gap-2"><Calendar size={16} className="text-amber-500" /><span className="font-bold">{request.date}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <WidgetCard title="Talep Açıklaması">
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">{request.description}</p>
                    </WidgetCard>
                    
                    {/* Media Gallery */}
                    {request.media && request.media.length > 0 && (
                        <WidgetCard title="Medya ve Ekler">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {request.media.map((item: any, idx: number) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => setSelectedMediaIndex(idx)}
                                        className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
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
                        </WidgetCard>
                    )}
                </div>

                {/* --- SAĞ TARAF: SÜREÇ VE TEKLİFLER --- */}
                <div className="w-full lg:w-1/3 space-y-6 sticky top-24">
                    
                    {/* Teklif Verme Butonu (Kurumsal için) */}
                    {user?.role === 'corporate' && (!isPrivate || isTargetCompany) && (
                        <button onClick={handleOfferClick} className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-200 uppercase tracking-widest">
                            <Send size={18} /> Hızlı Teklif Ver
                        </button>
                    )}

                    {/* Süreç Bilgisi */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
                        <h3 className="font-bold text-lg mb-6 relative z-10">Süreç Durumu</h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-slate-900 font-bold"><CheckCircle size={16}/></div>
                                <div><h4 className="text-sm font-bold">Talep İletildi</h4><p className="text-xs text-slate-400">Firmalar bilgilendirildi</p></div>
                            </div>
                            <div className="flex gap-4 opacity-80">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold"><Clock size={16}/></div>
                                <div><h4 className="text-sm font-bold">Teklif Toplanıyor</h4><p className="text-xs text-slate-400">Firmaların dönüşü bekleniyor</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Gelen Teklifler (Sidebar) */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900 text-lg">Gelen Teklifler</h3>
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">{visibleOffers.length}</span>
                        </div>
                        <div className="space-y-4 animate-fade-in">
                            {visibleOffers.length > 0 ? visibleOffers.map((offer) => {
                                const company = MOCK_COMPANIES.find(c => c.id === offer.companyId) || MOCK_COMPANIES[0];
                                return (
                                    <div key={offer.id} className={`bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition-all ${offer.companyId === request.targetCompanyId ? 'border-purple-200 bg-purple-50/10' : 'border-slate-100'}`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                                                <img src={company.logoUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-slate-900 text-sm truncate">{company.name}</h3>
                                                <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold"><Star size={10} fill="currentColor" /> {company.rating}</div>
                                            </div>
                                        </div>
                                        <div className="border-t border-slate-50 pt-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Teklif Tutarı</span>
                                                <span className="text-lg font-black text-slate-900">{offer.price.toLocaleString('tr-TR')} ₺</span>
                                            </div>
                                            <div className="bg-slate-50 p-2 rounded-lg text-xs text-slate-600 italic mb-3 line-clamp-2">"{offer.note}"</div>
                                            {isOwner && (
                                                <button className="w-full bg-green-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-sm">
                                                    Teklifi Kabul Et
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                        <Clock size={24}/>
                                    </div>
                                    <p className="text-slate-500 font-bold text-sm">Henüz teklif gelmedi.</p>
                                    <p className="text-xs text-slate-400 mt-1">Firmalar talebinizi inceliyor.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default RequestDetail;
