
import React from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag, ExternalLink, Search } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface MyOrdersProps {
    onViewDetail?: (order: any) => void;
}

const IndividualOrders: React.FC<MyOrdersProps> = ({ onViewDetail }) => {
    // Mock Orders
    const orders = [
        { id: 'ORD-99210', date: '24.10.2024', total: 1250, status: 'processing', statusLabel: 'Hazırlanıyor', items: 1, img: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=200&auto=format&fit=crop' },
        { id: 'ORD-99150', date: '12.10.2024', total: 4500, status: 'shipped', statusLabel: 'Kargoda', items: 2, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200&auto=format&fit=crop' },
        { id: 'ORD-98402', date: '01.09.2024', total: 850, status: 'delivered', statusLabel: 'Teslim Edildi', items: 1, img: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=200&auto=format&fit=crop' },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Siparişlerim</h2>
                    <p className="text-sm text-slate-500">GazMarket üzerinden aldığınız ürünlerin takibi.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Sipariş no ile ara..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" />
                </div>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <WidgetCard 
                        key={order.id} 
                        className="hover:border-slate-300 transition-all cursor-pointer group"
                        onClick={() => onViewDetail && onViewDetail(order)}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-6 flex-1 w-full">
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0 p-2 overflow-hidden">
                                    <img src={order.img} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt=""/>
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-black text-slate-900 font-mono text-sm">{order.id}</h4>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                                            order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                            order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                            {order.statusLabel}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">{order.date} • {order.items} Ürün</p>
                                    <div className="mt-3 flex items-center gap-1.5 text-slate-900 font-black">
                                        <span className="text-lg tracking-tighter">{order.total.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                                {order.status === 'shipped' && (
                                    <button className="flex-1 md:flex-none bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-2">
                                        <Truck size={14}/> Kargo Takip
                                    </button>
                                )}
                                <button className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2 group">
                                    İncele <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                                </button>
                            </div>
                        </div>
                    </WidgetCard>
                ))}
            </div>

            {orders.length === 0 && (
                <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-slate-200" />
                    <h3 className="font-bold text-slate-900">Henüz bir siparişiniz yok</h3>
                    <p className="text-sm text-slate-500 mt-1">İhtiyacınız olan ürünleri marketimizden temin edebilirsiniz.</p>
                </div>
            )}
        </div>
    );
};

export default IndividualOrders;
