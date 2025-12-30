
import React, { useState } from 'react';
import { useMarket, MarketOrder } from '../../../../context/MarketContext';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight, User, MapPin, Phone, CreditCard, Printer, MoreHorizontal } from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

const OrdersList = () => {
  const { orders, updateOrderStatus } = useMarket();
  const [selectedOrder, setSelectedOrder] = useState<MarketOrder | null>(null);
  const [filter, setFilter] = useState('Tümü');

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'pending': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit"><Clock size={10}/> Bekliyor</span>;
          case 'processing': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit"><Package size={10}/> Hazırlanıyor</span>;
          case 'shipped': return <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit"><Truck size={10}/> Kargoda</span>;
          case 'delivered': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit"><CheckCircle size={10}/> Teslim Edildi</span>;
          case 'cancelled': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit"><XCircle size={10}/> İptal</span>;
          default: return null;
      }
  };

  // Filter Orders
  const filteredOrders = orders.filter(order => {
      if (filter === 'Tümü') return true;
      if (filter === 'Bekleyen') return order.status === 'pending';
      if (filter === 'Hazırlanıyor') return order.status === 'processing';
      if (filter === 'Kargoda') return order.status === 'shipped';
      if (filter === 'Tamamlanan') return order.status === 'delivered';
      return true;
  });

  return (
    <div className="h-full flex flex-col">
       
       {/* Filter Bar */}
       <div className="flex gap-2 overflow-x-auto pb-4 shrink-0">
          {['Tümü', 'Bekleyen', 'Hazırlanan', 'Kargoda', 'Tamamlanan'].map(f => (
             <button 
                key={f} 
                onClick={() => { setFilter(f); setSelectedOrder(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    filter === f 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
             >
                {f}
             </button>
          ))}
       </div>

       <div className="flex-1 flex gap-6 overflow-hidden relative">
          
          {/* Order List */}
          <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedOrder ? 'hidden lg:block lg:w-[60%]' : 'w-full'}`}>
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <tr>
                            <th className="p-3 text-[10px] font-bold text-slate-500 uppercase pl-4">Sipariş No</th>
                            <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Müşteri</th>
                            <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Tutar</th>
                            <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Durum</th>
                            <th className="p-3 text-[10px] font-bold text-slate-500 uppercase text-right pr-4">Detay</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredOrders.map(order => (
                            <tr 
                                key={order.id} 
                                onClick={() => setSelectedOrder(order)}
                                className={`group hover:bg-slate-50 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? 'bg-blue-50/50' : ''}`}
                            >
                                <td className="p-3 pl-4">
                                    <div className="font-mono text-xs font-bold text-slate-900">{order.id}</div>
                                    <div className="text-[10px] text-slate-400">{order.date}</div>
                                </td>
                                <td className="p-3">
                                    <div className="text-xs font-bold text-slate-700">{order.customerName}</div>
                                    <div className="text-[10px] text-slate-500">{order.items.length} Ürün</div>
                                </td>
                                <td className="p-3">
                                    <div className="text-sm font-black text-slate-900">{order.total.toLocaleString('tr-TR')} ₺</div>
                                </td>
                                <td className="p-3">{getStatusBadge(order.status)}</td>
                                <td className="p-3 pr-4 text-right">
                                    <button className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all"><ChevronRight size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="p-10 text-center text-slate-500 text-sm">Bu filtrede sipariş bulunamadı.</div>
                )}
             </div>
          </div>

          {/* Detail Panel */}
          {selectedOrder && (
             <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-[40%] bg-white rounded-2xl border border-slate-200 shadow-xl z-20 flex flex-col overflow-hidden animate-slide-in-right">
                
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="font-bold text-slate-900">Sipariş Detayı</h3>
                        <p className="text-xs text-slate-500 font-mono">#{selectedOrder.id}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600"><Printer size={16}/></button>
                        <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600"><MoreHorizontal size={16}/></button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    
                    {/* Status & Actions */}
                    <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-slate-500 uppercase">Sipariş Durumu</span>
                            {getStatusBadge(selectedOrder.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                                className="py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                            >
                                Hazırla
                            </button>
                            <button 
                                onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                                className="py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                            >
                                Kargola
                            </button>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6 space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2">Müşteri Bilgileri</h4>
                        <div className="flex items-start gap-3">
                            <User size={16} className="text-slate-400 mt-0.5"/>
                            <div>
                                <div className="text-sm font-bold text-slate-900">{selectedOrder.customerName}</div>
                                <div className="text-xs text-slate-500">Bireysel Müşteri</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone size={16} className="text-slate-400 mt-0.5"/>
                            <div className="text-sm text-slate-700 font-mono">{selectedOrder.customerPhone}</div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin size={16} className="text-slate-400 mt-0.5"/>
                            <div className="text-sm text-slate-700 leading-snug">{selectedOrder.customerAddress}</div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2 mb-3">Ürünler</h4>
                        <div className="space-y-3">
                            {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">
                                            {item.quantity}x
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{item.productName}</div>
                                            <div className="text-[10px] text-slate-500">Stok Kodu: SKU-0{idx+1}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-slate-900">{item.price.toLocaleString('tr-TR')} ₺</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-slate-900 text-white p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2 text-slate-400 text-xs">
                            <span className="flex items-center gap-1"><CreditCard size={12}/> Ödeme Yöntemi</span>
                            <span>{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                            <span className="font-bold">Toplam Tutar</span>
                            <span className="text-xl font-black">{selectedOrder.total.toLocaleString('tr-TR')} ₺</span>
                        </div>
                    </div>

                </div>
             </div>
          )}

       </div>
    </div>
  );
};

export default OrdersList;
