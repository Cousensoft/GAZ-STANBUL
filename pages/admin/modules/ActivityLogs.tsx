import React, { useState } from 'react';
import { 
    History, 
    Search, 
    Filter, 
    ArrowLeft, 
    Activity, 
    User, 
    Layers, 
    CheckCircle, 
    Clock, 
    ShieldAlert, 
    Download,
    ExternalLink
} from 'lucide-react';

const ActivityLogs = ({ onBack }: { onBack: () => void }) => {
    const logs = [
        { id: 1, user: 'Ahmet Yılmaz', type: 'Yeni Üyelik', module: 'Genel', date: '24.10.2024 14:30', ip: '192.168.1.45', status: 'success' },
        { id: 2, user: 'Bosphorus Enerji', type: 'Ürün Ekleme', module: 'Market', date: '24.10.2024 14:12', ip: '88.241.12.4', status: 'success' },
        { id: 3, user: 'Admin', type: 'Firma Onayı', module: 'Firma', date: '24.10.2024 13:45', ip: '10.0.0.1', status: 'success' },
        { id: 4, user: 'Selin K.', type: 'Talep Oluşturma', module: 'Talepler', date: '24.10.2024 12:20', ip: '176.24.5.11', status: 'success' },
        { id: 5, user: 'Hakan Ç.', type: 'Hatalı Giriş', module: 'Sistem', date: '24.10.2024 11:55', ip: '192.168.1.10', status: 'warning' },
    ];

    const getStatusIcon = (status: string) => {
        return status === 'success' ? <CheckCircle size={14} className="text-green-500"/> : <ShieldAlert size={14} className="text-amber-500"/>;
    };

    return (
        <div className="animate-fade-in space-y-6 flex flex-col h-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"><ArrowLeft size={20}/></button>
                    <div><h2 className="text-xl font-bold text-slate-900">Tüm Platform Aktiviteleri</h2><p className="text-xs text-slate-500">Sistem genelindeki her türlü işlem kaydı.</p></div>
                </div>
                <div className="flex gap-2"><div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="İşlem veya IP ara..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium outline-none" /></div><button className="p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all"><Download size={18}/></button></div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="p-4 pl-6">LOG_ID</th>
                                <th className="p-4">İşlem Yapan</th>
                                <th className="p-4">Aksiyon</th>
                                <th className="p-4">Modül</th>
                                <th className="p-4">Zaman / IP</th>
                                <th className="p-4 text-right pr-6">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-xs">
                            {logs.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6 font-mono font-bold text-slate-400">#L00{log.id}</td>
                                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2"><User size={12} className="text-slate-300"/>{log.user}</td>
                                    <td className="p-4 text-slate-600 font-medium">{log.type}</td>
                                    <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black uppercase text-[9px]">{log.module}</span></td>
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900">{log.date}</div>
                                        <div className="text-[10px] text-slate-400 font-mono">{log.ip}</div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <div className="flex justify-end">{getStatusIcon(log.status)}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Toplam 4.582 kayıt bulundu</span>
                    <div className="flex gap-2"><button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Önceki</button><button className="px-3 py-1 bg-slate-900 text-white rounded">Sonraki</button></div>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogs;