
import React from 'react';
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    MapPin, 
    Phone, 
    MessageSquare, 
    CheckCircle, 
    XCircle, 
    User, 
    Navigation,
    ShieldCheck,
    AlertCircle,
    Briefcase,
    Building2
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface AppointmentDetailProps {
    appointment: any;
    onBack: () => void;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({ appointment, onBack }) => {
    
    // Mock Technician Data (Gerçekte API'den gelir)
    const technician = {
        name: appointment.technician !== '-' ? appointment.technician : 'Atanıyor...',
        role: 'Kıdemli Teknisyen',
        rating: 4.9,
        phone: '0532 111 22 33',
        image: `https://ui-avatars.com/api/?name=${appointment.technician !== '-' ? appointment.technician : 'Teknisyen'}&background=0f172a&color=fff`
    };

    // Zaman Çizelgesi Mantığı
    const getSteps = (status: string) => {
        const steps = [
            { label: 'Randevu Oluşturuldu', desc: 'Sistem kaydı alındı.', status: 'completed' },
            { label: 'Firma Onayı', desc: 'Firma randevu saatini onayladı.', status: 'completed' },
            { label: 'Teknisyen Atandı', desc: technician.name !== 'Atanıyor...' ? `${technician.name} yönlendirildi.` : 'Ekip atanması bekleniyor.', status: technician.name !== 'Atanıyor...' ? 'completed' : 'current' },
            { label: 'Servis Başladı', desc: 'Ekip adrese ulaştı.', status: status === 'completed' ? 'completed' : 'pending' },
            { label: 'İşlem Tamamlandı', desc: 'Servis başarıyla sonlandı.', status: status === 'completed' ? 'completed' : 'pending' },
        ];
        
        if (status === 'cancelled') {
            return [
                { label: 'Randevu Oluşturuldu', desc: 'Sistem kaydı alındı.', status: 'completed' },
                { label: 'İptal Edildi', desc: 'Randevu iptal edildi.', status: 'error' }
            ];
        }
        
        return steps;
    };

    const steps = getSteps(appointment.status);

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            {/* Header Navigation */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Randevu Detayı</h2>
                    <p className="text-sm text-slate-500 font-medium">#{appointment.id} numaralı servis kaydı.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Service & Company Card */}
                    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                            <div className="flex gap-5">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm flex-shrink-0">
                                    <Briefcase size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-1">{appointment.service}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                        <Building2 size={16} /> {appointment.company}
                                    </div>
                                </div>
                            </div>

                            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border shadow-sm ${
                                appointment.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                                appointment.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-blue-100 text-blue-700 border-blue-200'
                            }`}>
                                {appointment.status === 'upcoming' ? 'Bekleniyor' : 
                                 appointment.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
                            </span>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 w-full sm:w-fit">
                                <div className="p-3 bg-white rounded-xl text-slate-400 shadow-sm border border-slate-50"><Calendar size={20}/></div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Randevu Tarihi</p>
                                    <p className="font-bold text-slate-900 text-lg">{appointment.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <WidgetCard title="Süreç Takibi">
                        <div className="relative pl-4 pt-2">
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                            <div className="space-y-8 relative z-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className={`flex gap-5 group ${step.status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md flex-shrink-0 transition-all ${
                                            step.status === 'completed' ? 'bg-green-500 text-white' :
                                            step.status === 'error' ? 'bg-red-500 text-white' :
                                            step.status === 'current' ? 'bg-blue-500 text-white ring-4 ring-blue-100' :
                                            'bg-slate-100 text-slate-400'
                                        }`}>
                                            {step.status === 'completed' ? <CheckCircle size={18} /> : 
                                             step.status === 'error' ? <XCircle size={18} /> :
                                             step.status === 'current' ? <Clock size={18} /> :
                                             <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>}
                                        </div>
                                        <div className="pt-1">
                                            <h4 className={`font-bold text-sm ${step.status === 'current' ? 'text-blue-600' : 'text-slate-900'}`}>{step.label}</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </WidgetCard>
                </div>

                {/* RIGHT COLUMN: Sidebar Info */}
                <div className="space-y-6">
                    
                    {/* Company Contact Actions */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Firma İletişimi</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                <Phone size={20} />
                                Firmayı Ara
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors">
                                <MessageSquare size={20} />
                                Mesaj Gönder
                            </button>
                        </div>
                    </div>

                    {/* Technician Info (Compact & Read Only) */}
                    {appointment.status !== 'cancelled' && (
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <User size={48} className="text-slate-900" />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Görevli Teknisyen</h4>
                            <div className="flex items-center gap-3">
                                <img src={technician.image} className="w-10 h-10 rounded-xl border border-slate-100 shadow-sm" alt="Tech" />
                                <div>
                                    <h5 className="font-bold text-slate-900 text-sm">{technician.name}</h5>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] text-slate-500">{technician.role}</span>
                                        {technician.name !== 'Atanıyor...' && (
                                            <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">★ {technician.rating}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {technician.name === 'Atanıyor...' && (
                                <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                                    <Clock size={12} /> Firma atama yapıyor...
                                </div>
                            )}
                        </div>
                    )}

                    {/* Address Card */}
                    <WidgetCard>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <MapPin size={14}/> Hizmet Adresi
                        </h4>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                            <p className="text-sm font-bold text-slate-900 mb-1">{appointment.address}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Caferağa Mah. Moda Cad. No: 15 D:4 <br/>
                                Kadıköy / İstanbul
                            </p>
                        </div>
                        <button className="w-full py-2.5 bg-white border border-slate-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                            <Navigation size={14}/> Haritada Gör
                        </button>
                    </WidgetCard>

                    {/* Danger / Help Zone */}
                    <div className="space-y-3">
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <AlertCircle size={14}/> Sorun Bildir
                        </button>
                        {appointment.status === 'upcoming' && (
                            <button className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl text-xs hover:bg-red-100 transition-colors border border-red-100">
                                Randevuyu İptal Et
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AppointmentDetail;
