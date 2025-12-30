
import React, { useState } from 'react';
import { 
    ArrowLeft, 
    Printer, 
    Download, 
    MoreHorizontal, 
    Package, 
    User, 
    MapPin, 
    CreditCard, 
    Truck, 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    Phone, 
    Mail,
    Calendar,
    XCircle
} from 'lucide-react';

const MarketOrderDetail = ({ orderId, onBack }: { orderId: string, onBack: () => void }) => {
    // Mock Data based on ID
    const order = {
        id: orderId,
        date: '24.10.2024 14:30',
        status: 'processing', // pending, processing, shipped, delivered, cancelled
        paymentStatus: 'paid',
        paymentMethod: 'Kredi Kartı (**** 4242)',
        shippingMethod: 'Yurtiçi Kargo',
        trackingNumber: 'TR-123456789',
        customer: {
            name: 'Ahmet Yılmaz',
            email: 'ahmet.yilmaz@example.com',
            phone: '0532 555 44 33',
            type: 'Bireysel'
        },
        shippingAddress: 'Caferağa Mah. Moda Cad. No: 15 D:4, Kadıköy / İstanbul',
        billingAddress: 'Caferağa Mah. Moda Cad. No: 15 D:4, Kadıköy / İstanbul',
        items: [
            { id: 101, name: 'Akıllı Termostat X1', sku: 'GZ-101', price: 1250, quantity: 1, total: 1250, image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=100&auto=format&fit=crop' },
            { id: 102, name: 'Kombi Bağlantı Seti', sku: 'GZ-205', price: 450, quantity: 2, total: 900, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=100&auto=format&fit=crop' },
            { id: 105, name: 'Teflon Bant (Hediye)', sku: 'GZ-999', price: 0, quantity: 1, total: 0, image: 'https://images.unsplash.com/photo-1585251318482-141d8c194639?q=80&w=100&auto=format&fit=crop' }
        ],
        subtotal: 2150,
        shippingCost: 50,
        tax: 387,
        total: 2587
    };

    // Timeline steps
    const steps = [
        { label: 'Sipariş Alındı', date: '24.10.2024 14:30', completed: true },
        { label: 'Ödeme Onaylandı', date: '24.10.2024 14:35', completed: true },
        { label: 'Hazırlanıyor', date: '24.10.2024 15:00', completed: true },
        { label: 'Kargoya Verildi', date: '-', completed: false },
        { label: 'Teslim Edildi', date: '-', completed: false },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'processing': return 'bg-amber-100 text-amber-700';
            case 'shipped': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'completed': return 'Tamamlandı';
            case 'processing': return 'Hazırlanıyor';
            case 'shipped': return 'Kargoda';
            case 'cancelled': return 'İptal Edildi';
            default: return 'Bekliyor';
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200 text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-slate-900">Sipariş #{order.id}</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <Calendar size={12}/> {order.date}
                            <span>•</span>
                            <span className="flex items-center gap-1"><CreditCard size={12}/> {order.paymentStatus === 'paid' ? 'Ödendi' : 'Ödeme Bekliyor'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors">
                        <Printer size={16} /> Yazdır
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors">
                        <Download size={16} /> Fatura
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                        <Truck size={16} /> Kargola
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Items & Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Order Items */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Package size={18} className="text-slate-400"/> Sipariş İçeriği
                            </h3>
                            <span className="text-xs font-bold text-slate-500">{order.items.length} Ürün</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">
                                    <tr>
                                        <th className="p-4 pl-6">Ürün</th>
                                        <th className="p-4 text-center">Birim Fiyat</th>
                                        <th className="p-4 text-center">Adet</th>
                                        <th className="p-4 pr-6 text-right">Toplam</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50">
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900">{item.name}</div>
                                                        <div className="text-xs text-slate-500">SKU: {item.sku}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-slate-600">{item.price} ₺</td>
                                            <td className="p-4 text-center font-bold text-slate-900">x{item.quantity}</td>
                                            <td className="p-4 pr-6 text-right font-bold text-slate-900">{item.total} ₺</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-50 border-t border-slate-100">
                                    <tr>
                                        <td colSpan={3} className="p-3 text-right text-xs font-bold text-slate-500 uppercase">Ara Toplam</td>
                                        <td className="p-3 pr-6 text-right font-bold text-slate-700">{order.subtotal} ₺</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="p-3 text-right text-xs font-bold text-slate-500 uppercase">Kargo</td>
                                        <td className="p-3 pr-6 text-right font-bold text-slate-700">{order.shippingCost} ₺</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="p-3 text-right text-xs font-bold text-slate-500 uppercase">KDV (%18)</td>
                                        <td className="p-3 pr-6 text-right font-bold text-slate-700">{order.tax} ₺</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="p-4 text-right text-sm font-black text-slate-900 uppercase">Genel Toplam</td>
                                        <td className="p-4 pr-6 text-right text-xl font-black text-green-600">{order.total} ₺</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400"/> Sipariş Geçmişi
                        </h3>
                        <div className="relative pl-4 space-y-8 before:absolute before:left-[22px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {steps.map((step, idx) => (
                                <div key={idx} className="relative flex items-center gap-4 group">
                                    <div className={`w-4 h-4 rounded-full border-2 z-10 ${step.completed ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`}></div>
                                    <div className={`${step.completed ? 'opacity-100' : 'opacity-50'}`}>
                                        <p className="text-sm font-bold text-slate-900">{step.label}</p>
                                        <p className="text-xs text-slate-500">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Info Cards */}
                <div className="space-y-6">
                    
                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2"><User size={18} className="text-slate-400"/> Müşteri</span>
                            <button className="text-blue-600 text-xs hover:underline">Profili Gör</button>
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                {order.customer.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">{order.customer.name}</div>
                                <div className="text-xs text-slate-500">{order.customer.type} Müşteri</div>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Mail size={16} className="text-slate-400"/> {order.customer.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Phone size={16} className="text-slate-400"/> {order.customer.phone}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-slate-400"/> Teslimat Adresi
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            {order.shippingAddress}
                        </p>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                            <Truck size={20} className="text-slate-400"/>
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold">Kargo Firması</div>
                                <div className="font-bold text-slate-900 text-sm">{order.shippingMethod}</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-slate-400"/> Ödeme Bilgileri
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Ödeme Yöntemi</span>
                                <span className="font-medium text-slate-900">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Durum</span>
                                <span className="font-bold text-green-600 flex items-center gap-1">
                                    <CheckCircle size={12}/> Ödendi
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                        <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                            <AlertCircle size={18}/> İşlemler
                        </h3>
                        <p className="text-xs text-red-700 mb-4">Siparişi iptal etmek veya iade süreci başlatmak için aşağıdaki butonları kullanın.</p>
                        <button className="w-full py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 mb-2">İptal Et</button>
                        <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">İade Talebi Oluştur</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default MarketOrderDetail;
