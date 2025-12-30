
import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Download, DollarSign, CreditCard } from 'lucide-react';
import { BarChart } from '../../../../components/admin/Charts';

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
                    <button className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">Ödemeleri Başlat</button>
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
                                        {i % 2 === 0 ? <DollarSign size={16}/> : <CreditCard size={16}/>}
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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-6">Gelir Analizi</h3>
                    <BarChart data={[{value: 40}, {value: 65}, {value: 45}, {value: 80}, {value: 55}, {value: 90}]} height={48} color="bg-indigo-500" />
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <span className="block text-xs text-slate-500">Brüt</span>
                            <span className="font-bold text-slate-900">125K</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <span className="block text-xs text-slate-500">İadeler</span>
                            <span className="font-bold text-red-600">-12K</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <span className="block text-xs text-slate-500">Net</span>
                            <span className="font-bold text-green-600">113K</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketFinance;
