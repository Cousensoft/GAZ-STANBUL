
import React from 'react';
import { Bell, Zap, Calendar, CheckCircle, Info, Clock, Trash2, ArrowRight } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const IndividualNotifications = () => {
    const notifications = [
        { 
            id: 1, 
            type: 'offer', 
            title: 'Yeni Teklif Geldi!', 
            text: 'Kombi Bakımı talebiniz için Bosphorus Enerji firması 1.500₺ teklif sundu.', 
            time: '2 saat önce', 
            isRead: false,
            color: 'blue',
            icon: Zap
        },
        { 
            id: 2, 
            type: 'appointment', 
            title: 'Randevu Hatırlatması', 
            text: 'Galata Mekanik ile yarın saat 14:00\'de randevunuz bulunmaktadır.', 
            time: '5 saat önce', 
            isRead: true,
            color: 'amber',
            icon: Calendar
        },
        { 
            id: 3, 
            type: 'system', 
            title: 'Hesap Doğrulandı', 
            text: 'E-posta adresiniz başarıyla doğrulandı. Güvenle hizmet alabilirsiniz.', 
            time: '2 gün önce', 
            isRead: true,
            color: 'green',
            icon: CheckCircle
        },
    ];

    return (
        <div className="animate-fade-in space-y-6 max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Bildirimler</h2>
                    <p className="text-sm text-slate-500">Talepleriniz ve randevularınızla ilgili güncel gelişmeler.</p>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        Hepsini Okundu İşaretle
                    </button>
                    <button className="text-xs font-bold text-slate-400 hover:text-red-600 px-3 py-1.5 rounded-lg transition-colors">
                        Temizle
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {notifications.map((notif) => (
                    <WidgetCard 
                        key={notif.id} 
                        className={`p-0 overflow-hidden transition-all border-l-4 hover:shadow-md cursor-pointer group ${
                            notif.isRead ? 'border-l-slate-200' : 
                            notif.color === 'blue' ? 'border-l-blue-600 bg-blue-50/20' : 
                            notif.color === 'amber' ? 'border-l-amber-500 bg-amber-50/20' : 
                            'border-l-green-500 bg-green-50/20'
                        }`}
                    >
                        <div className="p-5 flex items-start gap-4">
                            <div className={`p-3 rounded-2xl flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                                notif.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                notif.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                                'bg-green-100 text-green-600'
                            }`}>
                                <notif.icon size={20} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold text-sm ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                                        {notif.title}
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                            <Clock size={10}/> {notif.time}
                                        </span>
                                        {!notif.isRead && <div className="w-2 h-2 rounded-full bg-red-600 shadow-sm"></div>}
                                    </div>
                                </div>
                                <p className={`text-xs leading-relaxed ${notif.isRead ? 'text-slate-500' : 'text-slate-600 font-medium'}`}>
                                    {notif.text}
                                </p>
                                
                                <div className="mt-3 flex items-center justify-between">
                                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-600 flex items-center gap-1 transition-colors">
                                        <Trash2 size={12}/> Sil
                                    </button>
                                    <button className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                                        notif.color === 'blue' ? 'text-blue-600' : 
                                        notif.color === 'amber' ? 'text-amber-600' : 
                                        'text-green-600'
                                    }`}>
                                        Detay <ArrowRight size={14}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </WidgetCard>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Bell size={24} className="text-slate-200" />
                    </div>
                    <h3 className="font-bold text-slate-900">Henüz bildirim yok</h3>
                    <p className="text-sm text-slate-500 max-w-xs mt-1">Önemli gelişmelerden burada haberdar olacaksınız.</p>
                </div>
            )}
        </div>
    );
};

export default IndividualNotifications;
