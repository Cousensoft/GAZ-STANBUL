
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SECTORS, DISTRICTS } from '../../utils/constants';
import { useRequests } from '../../context/RequestContext';
// Fix: Added useAuth import to satisfy userId requirement in ServiceRequest
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest } from '../../types';
import { 
  FileText, 
  Camera, 
  CheckCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Info,
  ChevronLeft,
  AlertCircle,
  Building2,
  Lock,
  UploadCloud,
  Video,
  Save
} from 'lucide-react';
import { WidgetCard } from '../../components/dashboard/Widgets';

const RequestQuote: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addRequest } = useRequests();
  // Fix: Destructured user from useAuth
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check for target company passed via state
  const targetCompany = location.state?.targetCompany;

  // Form State
  const [formData, setFormData] = useState({
    sector: targetCompany?.sector || '',
    district: '',
    title: '',
    description: '',
    urgency: 'normal', // normal, urgent, emergency
    timing: 'flexible', // flexible, asap, date
    emergencyNote: '', // New field for emergency reason
    name: '',
    phone: ''
  });

  // Ensure sector is set if targetCompany changes
  useEffect(() => {
    if (targetCompany) {
      setFormData(prev => ({ ...prev, sector: targetCompany.sector }));
    }
  }, [targetCompany]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Combine description with emergency note if applicable
      let finalDescription = formData.description;
      if (formData.urgency === 'asap' && formData.emergencyNote) {
          finalDescription = `[ACİL DURUM NOTU]: ${formData.emergencyNote}\n\n${formData.description}`;
      }

      const newRequest: ServiceRequest = {
        id: `REQ-${Math.floor(Math.random() * 10000)}`,
        // Fix: Added missing userId property required by ServiceRequest
        userId: user?.id || 'guest',
        title: formData.title,
        sector: formData.sector,
        district: formData.district,
        status: targetCompany ? 'Özel Talep' : (formData.urgency === 'asap' || formData.urgency === 'emergency' ? 'Acil' : 'Açık'),
        date: new Date().toLocaleDateString('tr-TR'),
        description: finalDescription,
        targetCompanyId: targetCompany?.id,
        targetCompanyName: targetCompany?.name
      };

      addRequest(newRequest);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-[80px] pb-20 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Talebiniz Alındı!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            {targetCompany 
                ? `Özel talebiniz başarıyla ${targetCompany.name} firmasına iletildi. Firma yetkilisi en kısa sürede sizinle iletişime geçecektir.`
                : 'Hizmet talebiniz başarıyla oluşturuldu ve ilgili firmalara iletildi. En kısa sürede teklifler gelmeye başlayacaktır.'
            }
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/requests')} 
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Taleplerimi Görüntüle
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-slate-50 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-[120px] pb-20">
      
      {/* Header Area */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm mb-4">
            <ChevronLeft size={18} /> Geri Dön
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 flex items-center gap-3">
                    {targetCompany ? (
                        <>
                            Özel Fiyat Teklifi <Lock size={28} className="text-slate-700" />
                        </>
                    ) : 'Ücretsiz Teklif Al'}
                </h1>
                <p className="text-slate-500 max-w-xl">
                    {targetCompany 
                        ? 'Bu talep formu sadece seçtiğiniz firma içindir.' 
                        : 'İhtiyacınızı detaylandır, bölgedeki en iyi firmalardan hızlıca fiyat teklifi topla.'
                    }
                </p>
            </div>
            {!targetCompany && (
                <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                    <ShieldCheck size={16} className="text-green-500" />
                    <span>%100 Ücretsiz & Güvenli</span>
                </div>
            )}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- LEFT: FORM --- */}
          <div className="w-full lg:w-2/3">
            
            {/* Target Company Info Box (Light Style) */}
            {targetCompany && (
                <div className="bg-slate-50 border-l-4 border-slate-900 p-5 mb-6 rounded-r-xl flex items-start gap-4 animate-fade-in shadow-sm">
                    <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-900 shrink-0">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">Hedef Firma: {targetCompany.name}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Bu talep formu aracılığıyla oluşturduğunuz içerik, <strong>sadece</strong> seçtiğiniz firmaya iletilecektir. Genel iş havuzunda yayınlanmaz ve diğer firmalar tarafından görüntülenemez.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Kategori & Konum & Detaylar */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><FileText size={18}/></div>
                    Hizmet Detayları
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Hizmet Kategorisi</label>
                        <select 
                            required
                            disabled={!!targetCompany} // Lock sector if target company is set
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-700 appearance-none disabled:opacity-70 disabled:cursor-not-allowed"
                            value={formData.sector}
                            onChange={(e) => setFormData({...formData, sector: e.target.value})}
                        >
                            <option value="">Seçiniz</option>
                            {SECTORS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">İlçe / Bölge</label>
                        <select 
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-700 appearance-none"
                            value={formData.district}
                            onChange={(e) => setFormData({...formData, district: e.target.value})}
                        >
                            <option value="">Seçiniz</option>
                            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Talep Başlığı</label>
                    <input 
                        required
                        type="text" 
                        placeholder="Örn: Kombi Petek Temizliği İhtiyacı" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium placeholder-slate-400"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Detaylı Açıklama</label>
                    <textarea 
                        required
                        rows={4}
                        placeholder="Yapılacak işin detaylarını, marka/model bilgisini ve varsa özel isteklerinizi buraya yazın..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium placeholder-slate-400 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                </div>
              </div>

               {/* --- MOVED MEDIA ATTACHMENTS SECTION HERE --- */}
               <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><Camera size={18}/></div>
                        Medya Ekleri (Opsiyonel)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Photo Upload */}
                        <div className="border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group h-32 relative overflow-hidden">
                            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform relative z-10">
                                <Camera size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 relative z-10">Fotoğraf Yükle</span>
                            <span className="text-[9px] text-slate-400 mt-1 relative z-10 font-medium">Max 5MB (JPG/PNG)</span>
                            {/* Decor */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full opacity-20 group-hover:scale-150 transition-transform"></div>
                        </div>

                        {/* Video Upload */}
                        <div className="border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group h-32 relative overflow-hidden">
                            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-red-500 mb-2 group-hover:scale-110 transition-transform relative z-10">
                                <Video size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 group-hover:text-red-700 relative z-10">Video Ekle</span>
                            <span className="text-[9px] text-slate-400 mt-1 relative z-10 font-medium">Max 50MB (MP4)</span>
                            {/* Decor */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-200 rounded-full opacity-20 group-hover:scale-150 transition-transform"></div>
                        </div>
                    </div>
                </div>

              {/* Section 2: Zamanlama & Aciliyet */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Clock size={18}/></div>
                    Zamanlama & Durum
                </h3>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Ne Zaman Yapılmalı?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, urgency: 'asap'})}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.urgency === 'asap' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
                        >
                            <Zap size={24} />
                            <span className="font-bold text-sm">Hemen / Acil</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, urgency: 'normal'})}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.urgency === 'normal' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
                        >
                            <Calendar size={24} />
                            <span className="font-bold text-sm">Normal Süre</span>
                        </button>
                    </div>

                    {/* CONDITIONAL EMERGENCY NOTE FIELD */}
                    {formData.urgency === 'asap' && (
                        <div className="mt-4 bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
                            <label className="block text-xs font-bold text-red-700 uppercase mb-2 flex items-center gap-2">
                                <AlertCircle size={14}/> Acil Durum Nedeni
                            </label>
                            <textarea
                                className="w-full bg-white border border-red-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none placeholder:text-red-300"
                                placeholder="Lütfen aciliyet gerektiren durumun nedenini kısaca belirtiniz (Örn: Gaz kokusu var, su basıyor, elektrik kaçağı)..."
                                rows={2}
                                value={formData.emergencyNote}
                                onChange={(e) => setFormData({...formData, emergencyNote: e.target.value})}
                            />
                        </div>
                    )}
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                    <Info size={20} className="text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Acil durumlar için "Hemen / Acil" seçeneğini kullanmanız, size daha hızlı dönüş yapılmasını sağlar ancak fiyatlandırmayı etkileyebilir.
                    </p>
                </div>

              </div>

              {/* Section 3: Contact Info */}
              <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-900 mb-6">İletişim Bilgileri</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Ad Soyad</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Telefon</label>
                        <input 
                            required
                            type="tel" 
                            placeholder="05XX..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${
                    targetCompany 
                    ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-200' 
                    : 'bg-red-600 hover:bg-red-700 shadow-red-200'
                }`}
              >
                {isSubmitting ? 'Gönderiliyor...' : (
                    <>
                        {targetCompany ? 'Özel Teklifi İlet' : 'Talebi Yayınla'} <ArrowRight size={20} />
                    </>
                )}
              </button>

            </form>
          </div>

          {/* --- RIGHT: INFO SIDEBAR --- */}
          <div className="w-full lg:w-1/3 space-y-6">
             <div className="bg-slate-900 text-white rounded-[24px] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-30 pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Nasıl Çalışır?</h3>
                <ul className="space-y-6 relative z-10">
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">Talebi Oluştur</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">İhtiyaçlarını detaylandır ve formu tamamla.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">
                                {targetCompany ? 'Fiyat Al' : 'Teklifleri Topla'}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {targetCompany ? 'Seçtiğin firma talebini incelesin ve sana özel fiyat versin.' : 'Onaylı firmalar sana özel fiyat teklifleri sunsun.'}
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">Karar Ver</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">Fiyat ve puanları karşılaştır, en iyisini seç.</p>
                        </div>
                    </li>
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
