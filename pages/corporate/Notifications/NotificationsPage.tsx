
import React from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { useCorporate } from '../../../context/CorporateContext';

const NotificationsPage = () => {
    const { documents, notifications } = useCorporate();
    
    // Yıllık kontrolü gelen belgelerden otomatik bildirim üretme simülasyonu
    const docReviewNotifications = documents
        .filter(doc => doc.status === 'needs_review')
        .map(doc => ({
            id: `DOC-NOTIF-${doc.id}`,
            type: 'system' as const,
            title: 'Belge Yenileme Zamanı',
            text: `${doc.name} belgenizin yıllık kontrol süresi dolmuştur. Lütfen sistem güvenliği için güncel belgeyi yükleyiniz.`,
            date: 'Şimdi',
            icon: ShieldCheck,
            color: 'red' as const
        }));

    // Context'ten gelen canlı bildirimler ve belge bildirimlerini birleştir
    const allNotifications = [...docReviewNotifications, ...notifications];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Bildirimler</h2>
                <button className="text-sm font-bold text-blue-600 hover:underline">Tümünü Okundu İşaretle</button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-50">
                {allNotifications.length > 0 ? allNotifications.map(notif => (
                    <div key={notif.id} className={`p-5 flex items-start gap-4 hover:bg-slate-50/80 transition-colors group cursor-pointer ${notif.id.toString().includes('DOC-NOTIF') || notif.title === 'Teklif Reddedildi' ? 'bg-red-50/20' : ''}`}>
                        <div className={`p-3 rounded-xl flex-shrink-0 ${
                            notif.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                            notif.color === 'red' ? 'bg-red-50 text-red-600' :
                            notif.color === 'green' ? 'bg-green-50 text-green-600' :
                            'bg-amber-50 text-amber-600'
                        }`}>
                            <notif.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-900">{notif.title}</h4>
                                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10}/> {notif.date}</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{notif.text}</p>
                        </div>
                    </div>
                )) : (
                    <div className="p-12 text-center text-slate-400">
                        <Bell size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="font-medium">Henüz bir bildiriminiz bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
