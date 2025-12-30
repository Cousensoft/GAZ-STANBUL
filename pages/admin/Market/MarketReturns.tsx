import React, { useState } from 'react';
import { 
    RotateCcw, 
    Search, 
    Filter, 
    ArrowLeft, 
    ChevronRight, 
    Package, 
    User, 
    Clock, 
    CheckCircle, 
    XCircle, 
    AlertTriangle, 
    Truck, 
    TurkishLira, 
    X, 
    MoreHorizontal,
    ShieldCheck
} from 'lucide-react';

const MarketReturns = () => {
    const [selectedReturn, setSelectedReturn] = useState<any | null>(null);

    const returns = [
        { id: 'RET-3920', orderId: 'ORD-1002', customer: 'Ahmet Yılmaz', seller: 'Bosphorus Enerji', amount: '1.250₺', status: 'pending', reason: 'Yanlış Ürün', date: '2 saat önce' },
        { id: 'RET-3919', orderId: 'ORD-1005', customer: 'Selin Demir', seller: 'TechIstanbul', amount: '450₺', status: 'processing', reason: 'Kusurlu Ürün', date: '1 gün önce' },
        { id: 'RET-3918', orderId: 'ORD-1008', customer: 'Mehmet Öz', seller: 'Galata Mekanik', amount: '2.100₺', status: 'approved', reason: 'Vazgeçildi', date: '3 gün önce' },
    ];

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'pending': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 w-fit"><Clock size={12}/> İnceleniyor</span>;
            case 'processing': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 w-fit"><Truck size={12}/> Kargoda</span>;
            case 'approved': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 w-fit"><CheckCircle size={12}/> Onaylandı</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                <div><h2 className="text-xl font-bold text-slate-900">İade İşlem Yönetimi</h2><p className="text-xs text-slate-500">Market iadelerini ve geri ödemeleri denetleyin.</p></div>
                <div className="flex gap-2">
                    <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="İade veya Sipariş ID..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-slate-900" /></div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 pl-6">İade Detayı</th>
                                    <th className="p-4">Satıcı</th>
                                    <th className="p-4">Tutar</th>
                                    <th className="p-4">Neden</th>
                                    <th className="p-4">Durum</th>
                                    <th className="p-4 text-right pr-6">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {returns.map(ret => (
                                    <tr key={ret.id} onClick={() => setSelectedReturn(ret)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                        <td className="p-4 pl-6">
                                            <div className="font-bold text-slate-900 text-sm">{ret.id}</div>
                                            <div className="text-[10px] text-slate-500">Sipariş: #{ret.orderId} • {ret.customer}</div>
                                        </td>
                                        <td className="p-4 text-xs font-bold text-blue-600">{ret.seller}</td>
                                        <td className="p-4 text-sm font-black text-slate-900">{ret.amount}</td>
                                        <td className="p-4 text-xs text-slate-500 font-medium">{ret.reason}</td>
                                        <td className="p-4">{getStatusBadge(ret.status)}</td>
                                        <td className="p-4 text-right pr-6"><button className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all"><ChevronRight size={16}/></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedReturn && (
                    <div className="w-[400px] bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-slide-in-right">
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><RotateCcw size={18} className="text-orange-500"/> İade İnceleme</h3>
                            <button onClick={() => setSelectedReturn(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={20}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm space-y-4">
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400 font-bold uppercase">Müşteri</span><span className="text-sm font-bold text-slate-900">{selectedReturn.customer}</span></div>
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400 font-bold uppercase">Sipariş No</span><span className="text-sm font-mono font-bold text-blue-600">{selectedReturn.orderId}</span></div>
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400 font-bold uppercase">İade Tutarı</span><span className="text-lg font-black text-red-600">{selectedReturn.amount}</span></div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3">İade Nedeni</h4>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 italic">"{selectedReturn.reason}: Ürün beklediğimden farklı geldi, iade etmek istiyorum."</div>
                            </div>
                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"><CheckCircle size={16}/> İadeyi Onayla ve Geri Öde</button>
                                <button className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"><XCircle size={16}/> İadeyi Reddet</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketReturns;