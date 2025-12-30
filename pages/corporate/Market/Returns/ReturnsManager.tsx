
import React, { useState } from 'react';
import { useMarket, MarketReturn } from '../../../../context/MarketContext';
import { 
    RotateCcw, Search, AlertCircle, CheckCircle, XCircle, 
    ChevronRight, Package, User, Clock, FileText, X, Check, ArrowLeft 
} from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

const ReturnsManager = () => {
    const { returns, updateReturnStatus } = useMarket();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReturn, setSelectedReturn] = useState<MarketReturn | null>(null);

    const handleAction = (id: string, status: MarketReturn['status']) => {
        updateReturnStatus(id, status);
        setSelectedReturn(null);
        alert(`İade talebi ${status === 'approved' ? 'onaylandı' : 'reddedildi'}.`);
    };

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'pending': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 border border-amber-200 shadow-sm"><Clock size={10}/> İnceleniyor</span>;
            case 'approved': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 border border-green-200 shadow-sm"><Check size={10}/> Onaylandı</span>;
            case 'rejected': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 border border-red-200 shadow-sm"><XCircle size={10}/> Reddedildi</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <WidgetCard className="bg-white border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={24}/></div>
                        <div>
                            <p className="text-xs text-slate-500 font-black uppercase">Bekleyen İadeler</p>
                            <h3 className="text-2xl font-black text-slate-900">{returns.filter(r => r.status === 'pending').length} Adet</h3>
                        </div>
                    </div>
                </WidgetCard>
                <WidgetCard className="bg-white border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><RotateCcw size={24}/></div>
                        <div>
                            <p className="text-xs text-slate-500 font-black uppercase">Toplam İade Hacmi</p>
                            <h3 className="text-2xl font-black text-slate-900">{returns.reduce((acc, r) => acc + r.amount, 0).toLocaleString('tr-TR')} ₺</h3>
                        </div>
                    </div>
                </WidgetCard>
                <WidgetCard className="bg-white border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={24}/></div>
                        <div>
                            <p className="text-xs text-slate-500 font-black uppercase">Tamamlanan</p>
                            <h3 className="text-2xl font-black text-slate-900">{returns.filter(r => r.status === 'approved').length} Adet</h3>
                        </div>
                    </div>
                </WidgetCard>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden relative">
                {/* List Area */}
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedReturn ? 'hidden lg:block lg:w-[60%]' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase pl-6">İade No</th>
                                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase">Müşteri</th>
                                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase">Tutar</th>
                                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase">Durum</th>
                                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase text-right pr-6">Detay</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {returns.map(ret => (
                                    <tr 
                                        key={ret.id} 
                                        onClick={() => setSelectedReturn(ret)}
                                        className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${selectedReturn?.id === ret.id ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <td className="p-4 pl-6 font-mono text-xs font-bold text-slate-900">{ret.id}</td>
                                        <td className="p-4 text-xs font-bold text-slate-700">{ret.customerName}</td>
                                        <td className="p-4 text-sm font-black text-slate-900">{ret.amount.toLocaleString('tr-TR')} ₺</td>
                                        <td className="p-4">{getStatusBadge(ret.status)}</td>
                                        <td className="p-4 text-right pr-6">
                                            <button className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-red-600 transition-all"><ChevronRight size={14}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Panel */}
                {selectedReturn && (
                    <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-[40%] bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-slide-in-right">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold text-slate-900">İade İnceleme</h3>
                                <p className="text-[10px] text-slate-500 font-mono">#{selectedReturn.id}</p>
                            </div>
                            <button onClick={() => setSelectedReturn(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 block">İade Nedeni</span>
                                <h4 className="text-sm font-bold text-red-900">{selectedReturn.reason}</h4>
                                <p className="text-xs text-red-700 mt-2 italic">"{selectedReturn.note}"</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-medium">Sipariş No</span>
                                    <span className="font-bold text-slate-900">#{selectedReturn.orderId}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-medium">Ürün Adı</span>
                                    <span className="font-bold text-slate-900">{selectedReturn.productName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Geri Ödeme</span>
                                    <span className="font-black text-red-600 text-lg">{selectedReturn.amount.toLocaleString('tr-TR')} ₺</span>
                                </div>
                            </div>

                            {selectedReturn.status === 'pending' && (
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <button 
                                        onClick={() => handleAction(selectedReturn.id, 'rejected')}
                                        className="py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                                    >
                                        Talebi Reddet
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedReturn.id, 'approved')}
                                        className="py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg"
                                    >
                                        İadeyi Onayla
                                    </button>
                                </div>
                            )}

                            {selectedReturn.status !== 'pending' && (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase">İşlem Tamamlandı</p>
                                    <div className="mt-2">{getStatusBadge(selectedReturn.status)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReturnsManager;
