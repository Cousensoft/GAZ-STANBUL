
import React from 'react';
import { ShoppingCart, DollarSign, Package, TrendingUp, MoreHorizontal, ArrowUpRight, BarChart2, CheckCircle, Target } from 'lucide-react';
import { BarChart, GaugeChart } from '../../../../components/admin/Charts';
import { WidgetCard, PerformanceStat } from '../../../../components/dashboard/Widgets';

const generateChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    label: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i],
    value: Math.floor(Math.random() * 60) + 20,
  }));
};

const MarketOverview = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* 1. Market Specific KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat 
                    label="Satış Hedefi" 
                    value="%78" 
                    subtext="Haftalık ciro hedefi" 
                    colorName="emerald" 
                    hexColor="#10b981"
                    icon={Target}
                    type="circle"
                    percentage={78}
                />
                <PerformanceStat 
                    label="Sipariş Başarısı" 
                    value="%92" 
                    subtext="Tamamlanan siparişler" 
                    colorName="blue" 
                    hexColor="#3b82f6"
                    icon={CheckCircle}
                    type="circle"
                    percentage={92}
                />
                <PerformanceStat 
                    label="Stok Doluluk" 
                    value="%85" 
                    subtext="Depo kapasitesi" 
                    colorName="amber" 
                    hexColor="#f59e0b"
                    icon={Package}
                    type="circle"
                    percentage={85}
                />
                <PerformanceStat 
                    label="Dönüşüm Oranı" 
                    value="%3.2" 
                    subtext="Ziyaretçi / Satış" 
                    colorName="purple" 
                    hexColor="#a855f7"
                    icon={TrendingUp}
                    type="icon"
                />
            </div>

            {/* 2. Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Sales Performance (Bar Chart) */}
                <WidgetCard className="lg:col-span-1" title="Satış Performansı">
                    <div className="mt-4 mb-2">
                        <h4 className="text-3xl font-black text-slate-900">75%</h4>
                        <p className="text-xs text-slate-400 font-medium">Haftalık Hedef</p>
                    </div>
                    <div className="h-40 flex items-end">
                        <BarChart data={generateChartData(7)} height={32} color="bg-emerald-500" />
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">Son 7 günlük satış verileri</p>
                </WidgetCard>

                {/* Sales Analytic (Gauge Chart) */}
                <WidgetCard className="lg:col-span-1" title="Satış Analitiği">
                    <div className="flex flex-col items-center justify-center py-6">
                        <GaugeChart percentage={63} />
                        <div className="w-full mt-8 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Online Mağaza</span>
                                <span className="font-bold text-slate-900">78%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Doğrudan Satış</span>
                                <span className="font-bold text-slate-900">55%</span>
                            </div>
                        </div>
                    </div>
                </WidgetCard>

                {/* Product Stock (Progress Bars) */}
                <WidgetCard className="lg:col-span-1" title="Kategori Bazlı Stok">
                    <div className="mt-2 mb-6">
                        <h4 className="text-3xl font-black text-slate-900">85%</h4>
                        <p className="text-xs text-slate-400 font-medium">Depo Doluluk Oranı</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { label: 'Kombi & Isıtma', val: 80, color: 'bg-emerald-500' },
                            { label: 'Yedek Parça', val: 48, color: 'bg-slate-300' },
                            { label: 'Akıllı Ev', val: 70, color: 'bg-emerald-500' },
                            { label: 'Mekanik', val: 20, color: 'bg-red-500' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                                    <span>{item.label}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </WidgetCard>
            </div>

            {/* 3. Recent Products Table */}
            <WidgetCard title="Ürün Envanteri & Hareketler" className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="py-4 pl-4 text-xs font-bold text-slate-400 uppercase">Ürün Adı</th>
                                <th className="py-4 text-xs font-bold text-slate-400 uppercase">Satış</th>
                                <th className="py-4 text-xs font-bold text-slate-400 uppercase">Sipariş</th>
                                <th className="py-4 text-xs font-bold text-slate-400 uppercase">Dönüşüm</th>
                                <th className="py-4 text-xs font-bold text-slate-400 uppercase">Stok</th>
                                <th className="py-4 pr-4 text-xs font-bold text-slate-400 uppercase text-right">Fiyat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { name: 'ECA Proteus Premix', cat: 'Kombi', sale: 34, order: 18, conv: '23.42%', stock: '4253 Adet', price: '14.450 ₺', img: 'bg-orange-100 text-orange-600' },
                                { name: 'Danfoss Termostat', cat: 'Yedek Parça', sale: 53, order: 25, conv: '12.83%', stock: '5234 Adet', price: '1.250 ₺', img: 'bg-slate-100 text-slate-600' },
                                { name: 'Siemens Akıllı Vana', cat: 'Otomasyon', sale: 427, order: 244, conv: '14.02%', stock: '324 Adet', price: '850 ₺', img: 'bg-blue-100 text-blue-600' },
                                { name: 'Viko Anahtar', cat: 'Elektrik', sale: 1200, order: 850, conv: '35.10%', stock: '120 Adet', price: '45 ₺', img: 'bg-purple-100 text-purple-600' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${row.img}`}>
                                                {row.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{row.name}</h4>
                                                <p className="text-xs text-slate-400">{row.cat}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="block font-bold text-slate-900 text-sm">{row.sale}</span>
                                        <span className="text-[10px] text-green-500 font-bold">+15%</span>
                                    </td>
                                    <td className="py-4">
                                        <span className="block font-bold text-slate-900 text-sm">{row.order} Bekleyen</span>
                                        <span className="text-[10px] text-slate-400">16 Başarılı</span>
                                    </td>
                                    <td className="py-4">
                                        <span className="block font-bold text-slate-900 text-sm">{row.conv}</span>
                                        <span className="text-[10px] text-green-500 font-bold">+0.16%</span>
                                    </td>
                                    <td className="py-4 font-bold text-slate-900 text-sm">{row.stock}</td>
                                    <td className="py-4 pr-4 text-right font-black text-slate-900">{row.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
        </div>
    );
};

export default MarketOverview;
