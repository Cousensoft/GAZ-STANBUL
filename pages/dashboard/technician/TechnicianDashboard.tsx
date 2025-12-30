
import React, { useState } from 'react';
import { ClipboardList, MapPin, Calendar, CheckCircle, Clock, ChevronRight, AlertCircle, Building2, Truck, PlayCircle } from 'lucide-react';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';
import { TechnicianJob } from '../../../types';

interface TechnicianDashboardProps {
    onJobSelect?: (jobId: string) => void;
}

const TechnicianDashboard: React.FC<TechnicianDashboardProps> = ({ onJobSelect }) => {
    // Mock Assigned Jobs (Updated statuses)
    const [jobs, setJobs] = useState<TechnicianJob[]>([
        { 
            id: 'JOB-992', 
            customerName: 'Selin Yılmaz', 
            serviceType: 'Kombi Bakımı', 
            date: '24.10.2024', 
            timeSlot: '14:00 - 16:00',
            status: 'assigned', 
            address: 'Caferağa Mah. Moda Cad. No:15 D:4 Kadıköy', 
            description: 'Kombi su eksiltiyor, bakım ve petek temizliği yapılacak.',
            isAutoAssigned: true
        },
        { 
            id: 'JOB-995', 
            customerName: 'Ahmet Demir', 
            serviceType: 'Gaz Kaçağı Tespiti', 
            date: '25.10.2024', 
            timeSlot: '09:00 - 11:00',
            status: 'en_route', 
            address: 'Bostancı Mah. Bağdat Cad. No:200 D:10 Kadıköy', 
            description: 'Mutfakta gaz kokusu var, acil kontrol gerekli.',
            isAutoAssigned: false,
            corporateOverride: true
        },
        { 
            id: 'JOB-998', 
            customerName: 'Mehmet Öz', 
            serviceType: 'Petek Temizliği', 
            date: '24.10.2024', 
            timeSlot: '11:00 - 13:00',
            status: 'completed', 
            address: 'Fenerbahçe Mah. Fener Kalamış Cad.', 
            description: 'Tüm petekler makine ile temizlendi.',
            isAutoAssigned: true
        }
    ]);

    const getStatusBadge = (status: TechnicianJob['status']) => {
        switch(status) {
            case 'assigned': return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-200 flex items-center gap-1"><Clock size={10}/> Atandı</span>;
            case 'en_route': return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-200 flex items-center gap-1"><Truck size={10}/> Yolda</span>;
            case 'in_progress': return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-amber-200 flex items-center gap-1"><PlayCircle size={10}/> Serviste</span>;
            case 'completed': return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-green-200 flex items-center gap-1"><CheckCircle size={10}/> Tamamlandı</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PerformanceStat label="Bugünkü İşler" value={jobs.filter(j => j.status !== 'completed').length} subtext="Bekleyen / Aktif" colorName="blue" hexColor="#3b82f6" icon={ClipboardList} type="circle" percentage={75} />
                <PerformanceStat label="Tamamlanan" value={jobs.filter(j => j.status === 'completed').length} subtext="Bugün" colorName="green" hexColor="#22c55e" icon={CheckCircle} type="circle" percentage={33} />
                <div className="bg-indigo-50 border border-indigo-100 rounded-[20px] p-6 flex flex-col justify-center">
                    <h4 className="text-indigo-900 font-bold text-sm mb-2 flex items-center gap-2">
                        <Building2 size={16}/> Bağlı Kurum
                    </h4>
                    <p className="text-indigo-700 text-lg font-black">Bosphorus Enerji</p>
                    <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded w-fit mt-2 font-bold uppercase">Onaylı Personel</span>
                </div>
            </div>

            {/* Job List */}
            <WidgetCard title="İş Listesi (Randevular)">
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div 
                            key={job.id} 
                            onClick={() => onJobSelect && onJobSelect(job.id)}
                            className={`bg-white border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden ${job.status === 'completed' ? 'border-slate-100 opacity-60 hover:opacity-100' : 'border-slate-200 hover:border-blue-300'}`}
                        >
                            {/* Auto Assign Badge */}
                            {job.isAutoAssigned && (
                                <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider border-b border-l border-slate-200">
                                    Otomatik Atama
                                </div>
                            )}
                            {job.corporateOverride && (
                                <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-700 text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider border-b border-l border-indigo-200">
                                    Yönetici Ataması
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                                            {job.serviceType}
                                        </h3>
                                        {getStatusBadge(job.status)}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={14} className="text-slate-400"/> {job.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} className="text-slate-400"/> {job.timeSlot}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400"/> {job.address}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-3 line-clamp-1 italic border-l-2 border-slate-200 pl-3">"{job.description}"</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="text-center py-10 text-slate-400">
                            <AlertCircle size={48} className="mx-auto mb-3 opacity-20"/>
                            <p>Şu an atanmış bir iş bulunmuyor.</p>
                        </div>
                    )}
                </div>
            </WidgetCard>
        </div>
    );
};

export default TechnicianDashboard;
