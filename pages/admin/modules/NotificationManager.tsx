
import React, { useState } from 'react';
import { Bell, Send, Users, Building2, ShieldAlert, Clock, CheckCircle, Trash2, Plus, Info, Calendar, Timer, ArrowLeft } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface ScheduledNotification {
    id: number;
    title: string;
    target: string;
    scheduledDate: string;
    status: 'scheduled';
}

const NotificationManager = () => {
    const [view, setView] = useState<'list' | 'create' | 'scheduled'>('list');
    const [target, setTarget] = useState<'all' | 'individual' | 'corporate'>('all');
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [pastNotifications] = useState([
        { id: 1, title: 'Bakım Çalışması', target: 'Tümü', date: '2 saat önce', sentBy: 'Super Admin', status: 'delivered', readCount: 1240 },
        { id: 2, title: 'Yeni Belge Gereksinimi', target: 'Kurumsal', date: '1 gün önce', sentBy: 'Sistem', status: 'delivered', readCount: 450 },
        { id: 3, title: 'Haftalık Sektör Özeti', target: 'Bireysel', date: '3 gün önce', sentBy: 'Editor', status: 'delivered', readCount: 2100 },
    ]);

    const [scheduledNotifications, setScheduledNotifications] = useState<ScheduledNotification[]>([
        { id: 101, title: '29 Ekim Kutlama Mesajı', target: 'Tümü', scheduledDate: '2024-10-29 09:00', status: 'scheduled' },
        { id: 102, title: 'Haftalık Market İndirimleri', target: 'Bireysel', scheduledDate: '2024-11-01 10:00', status: 'scheduled' }
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (isScheduled && !scheduledTime) {
            alert("Lütfen bir zaman seçiniz!");
            return;
        }

        if (isScheduled) {
            const newScheduled: ScheduledNotification = {
                id: Date.now(),
                title,
                target: target === 'all' ? 'Tümü' : target === 'individual' ? 'Bireysel' : 'Kurumsal',
                scheduledDate: scheduledTime,
                status: 'scheduled'
            };
            setScheduledNotifications([newScheduled, ...scheduledNotifications]);
            alert(`Bildirim ${scheduledTime} tarihine başarıyla zamanlandı!`);
            setView('scheduled');
        } else {
            alert("Bildirim anlık olarak tüm kullanıcılara gönderildi!");
            setView('list');
        }

        setTitle('');
        setMessage('');
        setIsScheduled(false);
        setScheduledTime('');
    };

    const cancelScheduled = (id: number) => {
        if (confirm('Bu zamanlanmış bildirimi iptal etmek istediğinize emin misiniz?')) {
            setScheduledNotifications(prev => prev.filter(n => n.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Bildirim Yönetimi</h2>
                    <p className="text-sm text-slate-500">Kullanıcılara anlık mesaj, sistem duyurusu veya zamanlanmış bildirim gönderin.</p>
                </div>
                <div className="flex gap-2">
                    {view !== 'list' && (
                         <button 
                            onClick={() => setView('list')} 
                            className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                         >
                            <ArrowLeft size={18}/> Listeye Dön
                        </button>
                    )}
                    {view === 'list' && (
                        <>
                            <button 
                                onClick={() => setView('scheduled')} 
                                className="px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                <Clock size={18}/> Zamanlananlar
                            </button>
                            <button onClick={() => setView('create')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
                                <Plus size={18}/> Yeni Oluştur
                            </button>
                        </>
                    )}
                </div>
            </div>

            {view === 'create' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <WidgetCard title="Bildirim İçeriği">
                            <form onSubmit={handleSend} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Başlık</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-500" 
                                        placeholder="Bildirim başlığını giriniz..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mesaj</label>
                                    <textarea 
                                        rows={5}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                        placeholder="Göndermek istediğiniz mesaj içeriği..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-4">Gönderim Zamanlaması</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => setIsScheduled(false)}
                                            className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${!isScheduled ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${!isScheduled ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                                <Send size={18}/>
                                            </div>
                                            <div className="text-left">
                                                <span className="block font-bold text-sm">Hemen Gönder</span>
                                                <span className="text-[10px] opacity-70">Anlık bildirim olarak iletilir.</span>
                                            </div>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setIsScheduled(true)}
                                            className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${isScheduled ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${isScheduled ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                                <Calendar size={18}/>
                                            </div>
                                            <div className="text-left">
                                                <span className="block font-bold text-sm">Zamanla</span>
                                                <span className="text-[10px] opacity-70">Belirli bir tarihte gönderilir.</span>
                                            </div>
                                        </button>
                                    </div>

                                    {isScheduled && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-fade-in">
                                            <label className="block text-[10px] font-black text-blue-700 uppercase mb-2">Gönderim Tarihi ve Saati</label>
                                            <div className="relative">
                                                <input 
                                                    type="datetime-local" 
                                                    required
                                                    value={scheduledTime}
                                                    onChange={(e) => setScheduledTime(e.target.value)}
                                                    className="w-full bg-white border border-blue-200 rounded-xl p-3 text-sm font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className={`w-full text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg ${isScheduled ? 'bg-blue-600 shadow-blue-900/20' : 'bg-slate-900 shadow-slate-900/20'}`}>
                                        {isScheduled ? <Clock size={18}/> : <Send size={18}/>}
                                        {isScheduled ? 'Bildirimi Zamanla' : 'Hemen Gönder'}
                                    </button>
                                </div>
                            </form>
                        </WidgetCard>
                    </div>

                    <div className="space-y-6">
                        <WidgetCard title="Hedef Kitle">
                            <div className="space-y-3">
                                <button onClick={() => setTarget('all')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${target === 'all' ? 'border-red-500 bg-red-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <Users size={20} className={target === 'all' ? 'text-red-600' : 'text-slate-400'}/>
                                        <span className={`text-sm font-bold ${target === 'all' ? 'text-red-900' : 'text-slate-600'}`}>Tüm Kullanıcılar</span>
                                    </div>
                                    {target === 'all' && <CheckCircle size={16} className="text-red-600"/>}
                                </button>
                                <button onClick={() => setTarget('individual')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${target === 'individual' ? 'border-blue-500 bg-blue-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <Users size={20} className={target === 'individual' ? 'text-blue-600' : 'text-slate-400'}/>
                                        <span className={`text-sm font-bold ${target === 'individual' ? 'text-blue-900' : 'text-slate-600'}`}>Bireysel Üyeler</span>
                                    </div>
                                    {target === 'individual' && <CheckCircle size={16} className="text-blue-600"/>}
                                </button>
                                <button onClick={() => setTarget('corporate')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${target === 'corporate' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <Building2 size={20} className={target === 'corporate' ? 'text-indigo-600' : 'text-slate-400'}/>
                                        <span className={`text-sm font-bold ${target === 'corporate' ? 'text-indigo-900' : 'text-slate-600'}`}>Kurumsal Üyeler</span>
                                    </div>
                                    {target === 'corporate' && <CheckCircle size={16} className="text-indigo-600"/>}
                                </button>
                            </div>
                        </WidgetCard>

                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                            <div className="flex items-center gap-3 text-amber-700 font-bold mb-2">
                                <ShieldAlert size={18}/>
                                <h4 className="text-sm">Güvenlik Uyarısı</h4>
                            </div>
                            <p className="text-xs text-amber-600 leading-relaxed">
                                Gönderdiğiniz bildirimler tüm aktif kullanıcıların ekranında anlık olarak belirecektir. Lütfen içeriklerin doğruluğundan emin olun.
                            </p>
                        </div>
                    </div>
                </div>
            ) : view === 'scheduled' ? (
                <WidgetCard title="Zamanlanmış Bildirimler (Kuyruk)">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Bildirim Konusu</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Hedef</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Planlanan Zaman</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {scheduledNotifications.length > 0 ? scheduledNotifications.map(notif => (
                                    <tr key={notif.id} className="hover:bg-slate-50/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <Timer size={16}/>
                                                </div>
                                                <div className="font-bold text-slate-900 text-sm">{notif.title}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{notif.target}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                                                <Calendar size={14}/>
                                                {notif.scheduledDate.replace('T', ' ')}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => cancelScheduled(notif.id)}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors flex items-center gap-1 ml-auto text-xs font-bold"
                                            >
                                                <Trash2 size={16}/> İptal Et
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-slate-400">
                                            <Clock size={48} className="mx-auto mb-4 opacity-10" />
                                            <p className="font-medium">Planlanmış bir bildirim bulunmuyor.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            ) : (
                <WidgetCard title="Gönderim Geçmişi">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Bildirim Konusu</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Hedef</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Zaman</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Okunma</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {pastNotifications.map(notif => (
                                    <tr key={notif.id} className="hover:bg-slate-50/50">
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 text-sm">{notif.title}</div>
                                            <div className="text-[10px] text-slate-400">Gönderen: {notif.sentBy}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                notif.target === 'Tümü' ? 'bg-red-50 text-red-600' :
                                                notif.target === 'Kurumsal' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {notif.target}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-slate-500">{notif.date}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="bg-green-500 h-full w-[85%]"></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600">{notif.readCount}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                                                <Trash2 size={16}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            )}
        </div>
    );
};

export default NotificationManager;
