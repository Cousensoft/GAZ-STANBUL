
import React from 'react';
import { Package, TrendingUp, CheckCircle, Wallet, ArrowUpRight } from 'lucide-react';
import { BarChart, GaugeChart } from '../../../components/admin/Charts';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';

const generateChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    label: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i],
    value: Math.floor(Math.random() * 45000) + 5000, 
  }));
};

const MarketOverview = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* 1. Market Specific KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat 
                    label="Ortalama Sepet" 
                    value="3.250 ₺" 
                    subtext="Sipariş başına ortalama" 
                    colorName="emerald" 
                    hexColor="#10b981"
                    icon={Wallet}
                    type="icon"
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
                    label="Toplam Ürün" 
                    value="1.250" 
                    subtext="Satıştaki ürünler" 
                    colorName="indigo" 
                    hexColor="#6366f1"
                    icon={Package}
                    type="icon"
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
                    <div className="mt-4 mb-6 flex justify-between items-end px-1">
                        <div>
                            <h4 className="text-3xl font-black text-slate-900 tracking-tighter">142.500 ₺</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Haftalık Toplam Satış</p>
                        </div>
                        <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold mb-1 flex items-center gap-1 border border-green-100">
                            <ArrowUpRight size={12} /> %12.5
                        </div>
                    </div>
                    <div className="h-44 flex items-end">
                        <BarChart data={generateChartData(7)} height={176} color="bg-emerald-500" showYAxis={true} unit="₺" />
                    </div>
                </WidgetCard>

                {/* Sales Analytic (Gauge Chart) */}
                <WidgetCard className="lg:col-span-1" title="Satış Dağılımı">
                    <div className="flex flex-col items-center justify-center py-6">
                        <GaugeChart percentage={58} />
                        <div className="w-full mt-8 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Kurumsal</span>
                                <span className="font-bold text-slate-900">58%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Bireysel</span>
                                <span className="font-bold text-slate-900">42%</span>
                            </div>
                        </div>
                    </div>
                </WidgetCard>

                {/* Product Category Distribution */}
                <WidgetCard className="lg:col-span-1" title="Kategori Dağılımı">
                    <div className="mt-2 mb-6">
                        <h4 className="text-3xl font-black text-slate-900 tracking-tighter">1.250</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Toplam Ürün Sayısı</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { label: 'Kombi & Isıtma', val: 45, color: 'bg-emerald-500' },
                            { label: 'Yedek Parça', val: 30, color: 'bg-slate-300' },
                            { label: 'Akıllı Ev', val: 15, color: 'bg-emerald-500' },
                            { label: 'Mekanik', val: 10, color: 'bg-red-500' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[10px] font-black text-slate-500 mb-1.5 uppercase">
                                    <span>{item.label}</span>
                                    <span>%{item.val}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
                        <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="py-4 pl-4">Ürün Adı</th>
                                <th className="py-4">Satış</th>
                                <th className="py-4">Sipariş</th>
                                <th className="py-4">Dönüşüm</th>
                                <th className="py-4">Stok</th>
                                <th className="py-4 pr-4 text-right">Fiyat</th>
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
