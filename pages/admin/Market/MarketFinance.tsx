import React from 'react';
import { Download, TurkishLira, CreditCard, TrendingUp, Filter, ArrowUpDown } from 'lucide-react';
import { BarChart } from '../../../components/admin/Charts';

const MarketFinance = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-slate-400 text-xs font-bold uppercase">Toplam Platform Geliri</span>
                        <h3 className="text-3xl font-black mt-2">2.450.800 ₺</h3>
                        <div className="mt-4 flex gap-3">
                            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                <TrendingUp size={12}/> +%18.2
                            </div>
                            <span className="text-xs text-slate-400 self-center">Geçen aya göre</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-xs font-bold uppercase">Bekleyen Satıcı Ödemeleri</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">142.500 ₺</h3>
                    <p className="text-xs text-slate-400 mt-1">Gelecek ödeme tarihi: 30 Ekim</p>
                    <button className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Ödemeleri Başlat</button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-xs font-bold uppercase">Komisyon Kazancı (Net)</span>
                    <h3 className="text-2xl font-bold text-green-600 mt-2">245.080 ₺</h3>
                    <p className="text-xs text-slate-400 mt-1">Ortalama Komisyon: %10</p>
                    <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[75%]"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block text-right">Hedef: 300K ₺</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Transaction History */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Son İşlemler</h3>
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Download size={18}/></button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${i % 2 === 0 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {i % 2 === 0 ? <TurkishLira size={16}/> : <CreditCard size={16}/>}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Sipariş Ödemesi #ORD-{29380+i}</p>
                                        <p className="text-xs text-slate-500">24 Ekim 2024, 14:{30+i}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-900">+1.250 ₺</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Gelir Analizi</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gerçekleşen Ciro Trendi</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
                            <ArrowUpDown size={14} className="ml-2 text-slate-400"/>
                            <select className="bg-transparent border-none text-[10px] font-black uppercase text-slate-500 rounded-lg outline-none pr-4 py-1.5 cursor-pointer hover:text-slate-700 transition-colors">
                                <option>Bu Hafta</option>
                                <option>Bu Ay</option>
                                <option>Bu Yıl</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-[180px]">
                        <BarChart 
                            data={[
                                {label: 'Pzt', value: 4500}, 
                                {label: 'Sal', value: 6800}, 
                                {label: 'Çar', value: 3200}, 
                                {label: 'Per', value: 8500}, 
                                {label: 'Cum', value: 5500}, 
                                {label: 'Cmt', value: 9800},
                                {label: 'Paz', value: 7500}
                            ]} 
                            height={180} 
                            color="bg-slate-900"
                            showYAxis={true}
                        />
                    </div>

                    {/* Stats Grid at Bottom */}
                    <div className="grid grid-cols-3 gap-3 mt-10">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100 transition-colors group cursor-pointer">
                            <span className="block text-[10px] text-slate-400 font-black uppercase mb-1 group-hover:text-slate-600">Brüt Gelir</span>
                            <span className="block text-base font-black text-slate-900">125K ₺</span>
                        </div>
                        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-center hover:bg-red-100 transition-colors group cursor-pointer">
                            <span className="block text-[10px] text-red-400 font-black uppercase mb-1 group-hover:text-red-600">İadeler</span>
                            <span className="block text-base font-black text-red-700">-12K ₺</span>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center hover:bg-emerald-100 transition-colors group cursor-pointer">
                            <span className="block text-[10px] text-emerald-400 font-black uppercase mb-1 group-hover:text-emerald-600">Net Kâr</span>
                            <span className="block text-base font-black text-emerald-700">113K ₺</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketFinance;
