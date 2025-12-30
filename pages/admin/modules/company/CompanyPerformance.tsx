
import React from 'react';
import { TurkishLira, CheckCircle, Package, Star, Truck, Image as ImageIcon } from 'lucide-react';
import { PerformanceStat } from '../../../../components/dashboard/Widgets';

const CompanyPerformance = ({ performance }: { performance: any }) => {
    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Key Stats */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <PerformanceStat label="Toplam Satış" value={performance.totalSales.toLocaleString('tr-TR') + ' ₺'} subtext="Tüm zamanlar" colorName="emerald" hexColor="#10b981" icon={TurkishLira} type="icon" />
                <PerformanceStat label="Başarı Oranı" value={`%${performance.successRate}`} subtext="Tamamlanan sipariş" colorName="blue" hexColor="#3b82f6" icon={CheckCircle} type="circle" percentage={performance.successRate} />
                <PerformanceStat label="Toplam Sipariş" value={performance.totalOrders} subtext="Adet" colorName="indigo" hexColor="#6366f1" icon={Package} type="icon" />
                <PerformanceStat label="Müşteri Puanı" value={performance.customerRating} subtext="Ortalama" colorName="amber" hexColor="#f59e0b" icon={Star} type="icon" />
            </div>

            {/* Product Performance */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-6">En Popüler Ürünler</h3>
                <div className="space-y-4">
                    {performance.topProducts.map((p: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-slate-500 border border-slate-200">{i+1}</div>
                                <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                            </div>
                            <span className="font-bold text-slate-600 text-sm">{p.sales} Satış</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logistics Stats */}
            <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2"><Truck size={16}/> Lojistik Verileri</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Teslimat Süresi</span> <span className="font-bold">{performance.deliveryTime} Gün</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">İade Oranı</span> <span className="font-bold text-red-600">%{performance.returnRate}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Stok Durumu</span> <span className="font-bold text-green-600">{performance.stockStatus}</span></div>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2"><ImageIcon size={16}/> Ürün Görselleri</h4>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded text-xs font-bold">
                        <CheckCircle size={14}/> %100 Uyumlu ve Kaliteli
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPerformance;
