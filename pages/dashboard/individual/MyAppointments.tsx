
import React, { useState } from 'react';
import { CheckCircle, Clock, MessageSquare, Trash2, Calendar, MapPin, XCircle, ChevronRight, Filter } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface MyAppointmentsProps {
    onViewDetail?: (appointment: any) => void;
}

const IndividualAppointments: React.FC<MyAppointmentsProps> = ({ onViewDetail }) => {
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');

    // Geliştirilmiş Mock Data
    const appointments = [
        { 
            id: 'APT-1024', 
            company: 'Bosphorus Enerji', 
            service: 'Yıllık Kombi Bakımı', 
            date: '28 Ekim 2024', 
            fullDate: new Date(2024, 9, 28),
            time: '14:00 - 16:00', 
            status: 'upcoming', 
            address: 'Ev Adresi',
            technician: 'Ahmet Usta',
            price: 850
        },
        { 
            id: 'APT-1025', 
            company: 'Galata Mekanik', 
            service: 'Doğalgaz Proje Keşfi', 
            date: '15 Kasım 2024', 
            fullDate: new Date(2024, 10, 15),
            time: '09:30', 
            status: 'upcoming', 
            address: 'İş Yeri (Ofis)',
            technician: 'Atanıyor...',
            price: 0
        },
        { 
            id: 'APT-0998', 
            company: 'TechIstanbul', 
            service: 'Akıllı Kilit Montajı', 
            date: '10 Ekim 2024', 
            fullDate: new Date(2024, 9, 10),
            time: '11:00', 
            status: 'completed', 
            address: 'Ev Adresi',
            technician: 'Mehmet Y.',
            price: 2400
        },
        { 
            id: 'APT-0850', 
            company: 'Anadolu Elektrik', 
            service: 'Pano Arıza Onarımı', 
            date: '05 Eylül 2024', 
            fullDate: new Date(2024, 8, 5),
            time: '16:00', 
            status: 'cancelled', 
            address: 'Yazlık',
            technician: '-',
            price: 450
        },
    ];

    const filteredAppointments = appointments.filter(app => filter === 'all' || app.status === filter);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="text-blue-600" size={24} /> Randevularım
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Planlanmış servis, bakım ve keşif randevularınız.</p>
                </div>
                
                <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {[
                        { id: 'upcoming', label: 'Yaklaşan', icon: Clock },
                        { id: 'completed', label: 'Geçmiş', icon: CheckCircle },
                        { id: 'cancelled', label: 'İptal', icon: XCircle }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                                filter === tab.id 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
                    <WidgetCard 
                        key={app.id} 
                        className="group hover:border-blue-300 transition-all cursor-pointer p-0 overflow-hidden border border-slate-200"
                        onClick={() => onViewDetail && onViewDetail(app)}
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Sol: Tarih ve Durum Çubuğu */}
                            <div className={`p-6 flex flex-col items-center justify-center min-w-[120px] text-center border-b md:border-b-0 md:border-r border-slate-100 ${
                                app.status === 'upcoming' ? 'bg-blue-50/50' : 
                                app.status === 'completed' ? 'bg-green-50/50' : 'bg-red-50/50'
                            }`}>
                                <span className={`text-xs font-black uppercase tracking-wider mb-1 ${
                                    app.status === 'upcoming' ? 'text-blue-600' : 
                                    app.status === 'completed' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {app.fullDate.toLocaleDateString('tr-TR', { month: 'short' })}
                                </span>
                                <span className="text-4xl font-black text-slate-900 leading-none mb-1">
                                    {app.fullDate.getDate()}
                                </span>
                                <span className="text-xs font-bold text-slate-500">
                                    {app.fullDate.toLocaleDateString('tr-TR', { weekday: 'short' })}
                                </span>
                            </div>

                            {/* Orta: Detaylar */}
                            <div className="p-6 flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                                        {app.service}
                                    </h4>
                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
                                        app.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                        app.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : 
                                        'bg-red-100 text-red-700 border-red-200'
                                    }`}>
                                        {app.status === 'upcoming' ? 'Bekleniyor' : app.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                                    </span>
                                </div>
                                
                                <p className="text-sm font-bold text-slate-600 mb-4">{app.company}</p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        <Clock size={14} className="text-slate-400"/> {app.time}
                                    </div>
                                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        <MapPin size={14} className="text-slate-400"/> {app.address}
                                    </div>
                                </div>
                            </div>

                            {/* Sağ: Aksiyon */}
                            <div className="p-4 flex items-center justify-center md:border-l border-slate-100 bg-slate-50/30">
                                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </WidgetCard>
                )) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Calendar size={32} className="text-slate-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Randevu Bulunamadı</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-xs">
                            Seçili filtreye uygun bir randevu kaydınız bulunmamaktadır.
                        </p>
                        {filter !== 'all' && (
                            <button onClick={() => setFilter('all')} className="mt-4 text-blue-600 font-bold text-sm hover:underline">
                                Tümünü Göster
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndividualAppointments;
