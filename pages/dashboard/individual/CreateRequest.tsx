
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SECTORS, DISTRICTS } from '../../../utils/constants';
import { useRequests } from '../../../context/RequestContext';
// Fix: Added useAuth import to satisfy userId requirement in ServiceRequest
import { useAuth } from '../../../context/AuthContext';
import { ServiceRequest } from '../../../types';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { 
  FileText, 
  Camera, 
  CheckCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Zap, 
  Info,
  ChevronLeft,
  AlertCircle,
  Building2,
  Briefcase,
  MapPin,
  Save,
  Video,
  UploadCloud
} from 'lucide-react';

interface CreateRequestProps {
    onBack: () => void;
    onSuccess: () => void;
}

const CreateRequest: React.FC<CreateRequestProps> = ({ onBack, onSuccess }) => {
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
        title: '',
        sector: targetCompany?.sector || '',
        district: '',
        urgency: 'normal',
        timing: 'flexible',
        description: '',
        emergencyNote: '', // New field for emergency reason
        name: '',
        phone: ''
    });

    // If coming from a specific company, pre-fill sector and handle data
    useEffect(() => {
        if(targetCompany) {
            setFormData(prev => ({...prev, sector: targetCompany.sector}));
        }
    }, [targetCompany]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call delay
        setTimeout(() => {
            // Combine description with emergency note if applicable
            let finalDescription = formData.description;
            if (formData.urgency === 'emergency' && formData.emergencyNote) {
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
                    ? `Özel talebiniz başarıyla ${targetCompany.name} firmasına iletildi. En kısa sürede dönüş yapılacaktır.`
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
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {targetCompany ? 'Özel Teklif İste' : 'Yeni Talep Oluştur'}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {targetCompany ? `${targetCompany.name} firmasından doğrudan fiyat alın.` : 'İhtiyacınızı belirtin, firmalardan teklif alın.'}
                    </p>
                </div>
            </div>

            {targetCompany && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 animate-fade-in">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm">Hedef Firma: {targetCompany.name}</h4>
                        <p className="text-xs text-blue-700">Bu talep sadece seçili firmaya iletilecektir ve diğer firmalar tarafından görülmeyecektir.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <WidgetCard className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Talep Başlığı</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Örn: Kombi Petek Temizliği İhtiyacı" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium placeholder-slate-400"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2"><Briefcase size={14}/> Hizmet Kategorisi</label>
                            <select 
                                required
                                disabled={!!targetCompany} // Disable if pre-filled by target company
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
                                value={formData.sector}
                                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                            >
                                <option value="">Seçiniz</option>
                                {SECTORS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2"><MapPin size={14}/> İlçe / Bölge</label>
                            <select 
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                value={formData.district}
                                onChange={(e) => setFormData({...formData, district: e.target.value})}
                            >
                                <option value="">Seçiniz</option>
                                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2"><Zap size={14}/> Aciliyet Durumu</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'normal', label: 'Normal', desc: 'Teklifleri bekleyebilirim' },
                                { id: 'urgent', label: 'Acele', desc: 'Bu hafta yapılmalı' },
                                { id: 'emergency', label: 'Acil', desc: 'Hemen müdahale gerekli' }
                            ].map(option => (
                                <div 
                                    key={option.id}
                                    onClick={() => setFormData({...formData, urgency: option.id})}
                                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                        formData.urgency === option.id 
                                        ? 'border-slate-900 bg-slate-50' 
                                        : 'border-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-3 h-3 rounded-full ${formData.urgency === option.id ? 'bg-slate-900' : 'bg-slate-300'}`}></div>
                                        <span className="font-bold text-sm text-slate-900">{option.label}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 pl-5">{option.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* CONDITIONAL EMERGENCY NOTE FIELD */}
                        {formData.urgency === 'emergency' && (
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

                    {/* Timing Section */}
                    <div className="mb-6">
                         <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Zamanlama Tercihi</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, timing: 'flexible'})}
                                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.timing === 'flexible' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}
                            >
                                Zamanım Esnek
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, timing: 'asap'})}
                                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.timing === 'asap' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}
                            >
                                Mümkün Olan En Kısa Sürede
                            </button>
                         </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2"><FileText size={14}/> Açıklama</label>
                        <textarea 
                            required
                            rows={4}
                            placeholder="İşin detaylarını buraya yazın..." 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    {/* --- NEW MEDIA ATTACHMENTS SECTION --- */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                           <UploadCloud size={14}/> Medya Ekleri (Opsiyonel)
                        </label>
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

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-colors">
                            İptal
                        </button>
                        <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
                            <Save size={16} /> {targetCompany ? 'Teklif İste' : 'Talebi Yayınla'}
                        </button>
                    </div>
                </WidgetCard>
            </form>
        </div>
    );
};

export default CreateRequest;
