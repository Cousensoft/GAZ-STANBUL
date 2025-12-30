
import React, { useState } from 'react';
import { 
    ArrowLeft, MapPin, Calendar, Clock, Phone, 
    Camera, Video, CheckCircle, Navigation, 
    FileText, Truck, PlayCircle
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface JobDetailProps {
    jobId: string;
    onBack: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId, onBack }) => {
    // Mock Job Data
    const [job, setJob] = useState({
        id: jobId,
        customerName: 'Selin Yılmaz',
        serviceType: 'Kombi Bakımı',
        date: '24.10.2024',
        timeSlot: '14:00 - 16:00',
        status: 'assigned', // assigned, en_route, in_progress, completed
        address: 'Caferağa Mah. Moda Cad. No:15 D:4 Kadıköy / İstanbul',
        phone: '0532 555 44 33',
        description: 'Kombi su eksiltiyor, bakım ve petek temizliği yapılacak.',
        isAutoAssigned: true
    });

    const [serviceNote, setServiceNote] = useState('');
    
    // Updated Workflow Steps (No Offer Stage)
    const steps = [
        { id: 'assigned', label: 'Atandı' },
        { id: 'en_route', label: 'Yolda' },
        { id: 'in_progress', label: 'Serviste' },
        { id: 'completed', label: 'Tamamlandı' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === job.status);

    const handleStatusUpdate = (newStatus: string) => {
        setJob(prev => ({ ...prev, status: newStatus }));
    };

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">İş Detayı</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500 font-mono">#{job.id}</span>
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Onaylı Randevu</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Job Info & Actions */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Customer & Location Card */}
                    <WidgetCard>
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{job.serviceType}</h3>
                                <p className="text-sm text-slate-500 mb-4">{job.customerName}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                    <span className="flex items-center gap-2"><Calendar size={16}/> {job.date}</span>
                                    <span className="flex items-center gap-2"><Clock size={16}/> {job.timeSlot}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[180px]">
                                <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white rounded-xl font-bold text-xs hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
                                    <Phone size={16}/> Müşteriyi Ara
                                </button>
                                <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                                    <Navigation size={16}/> Yol Tarifi
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                                <MapPin size={14}/> Adres
                            </h4>
                            <p className="text-sm text-slate-700 font-medium">{job.address}</p>
                        </div>

                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                                <FileText size={14}/> İş Emri Notu
                            </h4>
                            <p className="text-sm text-slate-700 italic">"{job.description}"</p>
                        </div>
                    </WidgetCard>

                    {/* Media Upload (Only visible when job is started or completed) */}
                    {(job.status === 'in_progress' || job.status === 'completed') && (
                        <WidgetCard title="Servis Raporu & Medya">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-blue-400 transition-all group">
                                    <Camera size={32} className="text-slate-400 group-hover:text-blue-500 mb-2"/>
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Fotoğraf Ekle</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-red-400 transition-all group">
                                    <Video size={32} className="text-slate-400 group-hover:text-red-500 mb-2"/>
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-red-600">Video Ekle</span>
                                </button>
                            </div>
                            <textarea 
                                rows={3}
                                value={serviceNote}
                                onChange={(e) => setServiceNote(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                                placeholder="Yapılan işlemler hakkında teknik not..."
                            ></textarea>
                        </WidgetCard>
                    )}

                </div>

                {/* Right: Workflow & Actions */}
                <div className="space-y-6">
                    
                    {/* Workflow Status */}
                    <div className="bg-slate-900 text-white p-6 rounded-[24px] shadow-xl relative overflow-hidden">
                        <h4 className="font-bold text-lg mb-6 relative z-10">Operasyon Durumu</h4>
                        <div className="space-y-6 relative z-10">
                            {steps.map((step, idx) => (
                                <div key={step.id} className="flex gap-4 relative">
                                    {idx !== steps.length - 1 && <div className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${idx < currentStepIndex ? 'bg-green-500' : 'bg-slate-700'}`}></div>}
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                                        idx <= currentStepIndex ? 'bg-green-500 text-slate-900' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                        {idx <= currentStepIndex ? <CheckCircle size={14}/> : <div className="w-2 h-2 bg-slate-500 rounded-full"></div>}
                                    </div>
                                    <div className={idx <= currentStepIndex ? 'opacity-100' : 'opacity-50'}>
                                        <span className="text-sm font-bold block">{step.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Dynamic Action Button */}
                        <div className="mt-8 relative z-10">
                            {job.status === 'assigned' && (
                                <button 
                                    onClick={() => handleStatusUpdate('en_route')} 
                                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
                                >
                                    <Truck size={18} /> Yola Çıktım
                                </button>
                            )}
                            {job.status === 'en_route' && (
                                <button 
                                    onClick={() => handleStatusUpdate('in_progress')} 
                                    className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/50"
                                >
                                    <PlayCircle size={18} /> İşe Başla (Vardım)
                                </button>
                            )}
                            {job.status === 'in_progress' && (
                                <button 
                                    onClick={() => handleStatusUpdate('completed')} 
                                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/50"
                                >
                                    <CheckCircle size={18} /> İşi Tamamla
                                </button>
                            )}
                            {job.status === 'completed' && (
                                <div className="w-full py-4 bg-slate-800 text-slate-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700">
                                    <CheckCircle size={18} /> İşlem Kapandı
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDetail;
