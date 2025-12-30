
import React from 'react';
import { useCorporate } from '../../../context/CorporateContext';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { DollarSign, Download, TrendingUp, CreditCard } from 'lucide-react';

const FinanceDashboard = () => {
    const { finance } = useCorporate();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-slate-400 text-xs font-bold uppercase">Toplam Kazanç</span>
                        <h3 className="text-3xl font-black mt-2">{finance.totalEarnings.toLocaleString('tr-TR')} ₺</h3>
                        <div className="mt-4 flex gap-3 text-sm text-slate-300">
                            <span>Bu Ay: <b>+{finance.thisMonthEarnings.toLocaleString('tr-TR')} ₺</b></span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-xs font-bold uppercase">Ödeme Bekleyen</span>
                    <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-slate-900">{finance.pendingPayments.toLocaleString('tr-TR')} ₺</h3>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">Hakediş</span>
                    </div>
                    <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Ödeme Talep Et</button>
                </div>
            </div>

            <WidgetCard title="Son Faturalar ve Hareketler">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fatura No</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Müşteri</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tarih</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tutar</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İndir</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {finance.invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-mono text-xs font-bold text-slate-600">{inv.id}</td>
                                    <td className="p-4 text-sm font-bold text-slate-900">{inv.customer}</td>
                                    <td className="p-4 text-xs text-slate-500">{inv.date}</td>
                                    <td className="p-4 font-bold text-slate-900">{inv.amount.toLocaleString('tr-TR')} ₺</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {inv.status === 'paid' ? 'Ödendi' : 'Ödenmedi'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
        </div>
    );
};

export default FinanceDashboard;
