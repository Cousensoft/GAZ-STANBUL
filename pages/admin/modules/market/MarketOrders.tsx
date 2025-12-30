
import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronRight, Eye } from 'lucide-react';
import MarketOrderDetail from './MarketOrderDetail';

const MarketOrders = () => {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const orders = [
        { id: 'ORD-29381', customer: 'Ahmet Yılmaz', total: '2.450₺', status: 'processing', date: 'Bugün, 14:30', items: 3 },
        { id: 'ORD-29380', customer: 'Selin Demir', total: '12.800₺', status: 'shipped', date: 'Dün, 09:15', items: 1 },
        { id: 'ORD-29379', customer: 'Mehmet Öz', total: '450₺', status: 'delivered', date: '22.10.2024', items: 2 },
        { id: 'ORD-29378', customer: 'Caner Erkin', total: '8.900₺', status: 'cancelled', date: '21.10.2024', items: 5 },
    ];

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'processing': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12}/> Hazırlanıyor</span>;
            case 'shipped': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 w-fit"><Truck size={12}/> Kargoda</span>;
            case 'delivered': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12}/> Teslim Edildi</span>;
            case 'cancelled': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12}/> İptal</span>;
            default: return null;
        }
    };

    if (selectedOrderId) {
        return <MarketOrderDetail orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock size={20}/></div>
                    <div><span className="block text-lg font-bold text-slate-900">12</span><span className="text-xs text-slate-500">Bekleyen</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20}/></div>
                    <div><span className="block text-lg font-bold text-slate-900">45</span><span className="text-xs text-slate-500">Kargoda</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg"><XCircle size={20}/></div>
                    <div><span className="block text-lg font-bold text-slate-900">2</span><span className="text-xs text-slate-500">İade Talebi</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={20}/></div>
                    <div><span className="block text-lg font-bold text-slate-900">1.2K</span><span className="text-xs text-slate-500">Tamamlanan</span></div>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Son Siparişler</h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Tümünü Gör</button>
                </div>
                <div className="divide-y divide-slate-50">
                    {orders.map((order) => (
                        <div 
                            key={order.id} 
                            onClick={() => setSelectedOrderId(order.id)}
                            className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900 transition-colors">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{order.id}</h4>
                                    <p className="text-xs text-slate-500">{order.customer} • {order.items} Ürün</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <span className="block font-bold text-slate-900 text-sm">{order.total}</span>
                                    <span className="text-xs text-slate-400">{order.date}</span>
                                </div>
                                <div className="w-32 flex justify-center">
                                    {getStatusBadge(order.status)}
                                </div>
                                <div className="p-2 hover:bg-slate-100 rounded-full text-slate-300 group-hover:text-slate-600 transition-colors">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketOrders;
