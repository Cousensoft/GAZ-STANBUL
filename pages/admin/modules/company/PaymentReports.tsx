import React, { useState } from 'react';
/* Added missing Building2 import */
import { ArrowLeft, Download, Filter, Search, TrendingUp, TurkishLira, CreditCard, Calendar, CheckCircle, Clock, Info, MoreHorizontal, Building2 } from 'lucide-react';
import { GroupedBarChart } from '../../../../components/admin/Charts';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

const PaymentReports = ({ onBack }: { onBack: () => void }) => {
    const [filterStatus, setFilterStatus] = useState('all');

    // Grafik Verisi (Sağlanan tasarım değerlerine sadık kalarak)
    const chartData = [
        { label: 'OCA', current: 40, previous: 25 },
        { label: 'ŞUB', current: 55, previous: 40 },
        { label: 'MAR', current: 45, previous: 35 },
        { label: 'NİS', current: 80, previous: 50 },
        { label: 'MAY', current: 65, previous: 55 },
        { label: 'HAZ', current: 90, previous: 70 },
        { label: 'TEM', current: 100, previous: 85 },
    ];

    // Mock İşlemler
    const transactions = [
        { id: 'TRX-9981', company: 'Bosphorus Enerji', amount: '12.450 ₺', commission: '1.245 ₺', date: '24.10.2024', status: 'completed', method: 'Havale' },
        { id: 'TRX-9982', company: 'Galata Mekanik', amount: '4.200 ₺', commission: '420 ₺', date: '23.10.2024', status: 'pending', method: 'Kredi Kartı' },
        { id: 'TRX-9983', company: 'TechIstanbul', amount: '8.900 ₺', commission: '890 ₺', date: '22.10.2024', status: 'completed', method: 'Kredi Kartı' },
        { id: 'TRX-9984', company: 'Anadolu Tesisat', amount: '2.100 ₺', commission: '210 ₺', date: '21.10.2024', status: 'processing', method: 'Havale' },
        { id: 'TRX-9985', company: 'Kuzey Elektrik', amount: '15.600 ₺', commission: '1.560 ₺', date: '20.10.2024', status: 'completed', method: 'Havale' },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Finansal Raporlar</h2>
                        <p className="text-sm text-slate-500">Platform genelindeki hakediş ve ödeme akışı.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 shadow-sm transition-all">
                        <Calendar size={16} /> Bu Ay
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-red-600 shadow-lg shadow-slate-200 transition-all">
                        <Download size={16} /> Raporu Dışa Aktar
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOPLAM CİRO (BRÜT)</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-1">2.4M ₺</h3>
                        <div className="flex items-center gap-1 mt-2 text-green-600 text-[10px] font-black uppercase">
                            <TrendingUp size={14} /> %12 ARTUŞ
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TurkishLira size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-all">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BEKLEYEN ÖDEME</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-1">142.5K ₺</h3>
                        <div className="flex items-center gap-1 mt-2 text-amber-600 text-[10px] font-black uppercase">
                            <Clock size={14} /> 12 FİRMA BEKLİYOR
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CreditCard size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">KOMİSYON GELİRİ</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-1">240K ₺</h3>
                        <div className="flex items-center gap-1 mt-2 text-blue-600 text-[10px] font-black uppercase tracking-tighter">
                            <CheckCircle size={14} /> TAHSİLAT TAMAM
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            {/* --- MODERN DİKEY BLOK GELİR TRENDİ KARTI --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WidgetCard title="Aylık Gelir Trendi" className="lg:col-span-2 p-8" action={<button className="text-slate-400 hover:text-slate-900 transition-colors"><MoreHorizontal size={20}/></button>}>
                    <div className="flex flex-col h-full">
                        {/* Grafik Üst Bilgi Alanı */}
                        <div className="flex items-start justify-between mb-10 shrink-0">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">+124</span>
                                    <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                                        <TrendingUp size={12} strokeWidth={3} /> %8.5
                                    </span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bu Ay</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Geçen Ay</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grafik Alanı - Box'u Dolduran Yapı */}
                        <div className="flex-1 min-h-[224px] w-full relative">
                            <GroupedBarChart 
                                data={chartData} 
                                height={224} 
                                mainColor="bg-indigo-600" 
                                secColor="bg-slate-300" 
                                showYAxis={true} 
                                unit=""
                            />
                        </div>
                    </div>
                </WidgetCard>

                <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10">
                        <h3 className="text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                            <CreditCard size={20} className="text-blue-400" /> Tahsilat Metotları
                        </h3>
                        <div className="space-y-8">
                            <div className="group">
                                <div className="flex justify-between text-xs font-black uppercase mb-3 tracking-widest group-hover:text-blue-400 transition-colors">
                                    <span>Kredi Kartı</span>
                                    <span className="text-blue-400">%65</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                </div>
                            </div>
                            <div className="group">
                                <div className="flex justify-between text-xs font-black uppercase mb-3 tracking-widest group-hover:text-emerald-400 transition-colors">
                                    <span>Havale / EFT</span>
                                    <span className="text-emerald-400">%30</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5">
                                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-[30%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                </div>
                            </div>
                            <div className="group">
                                <div className="flex justify-between text-xs font-black uppercase mb-3 tracking-widest group-hover:text-slate-300 transition-colors">
                                    <span>Diğer</span>
                                    <span className="text-slate-400">%5</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/5">
                                    <div className="bg-slate-600 h-full w-[5%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <Info size={20} className="text-blue-400 opacity-50" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                                    Tahsilat verileri banka provizyon <br/> ekranlarıyla senkronize çalışır.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Arkaplan Süsü */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>
            </div>

            {/* Transaction Table */}
            <WidgetCard title="Platform Finansal Hareketleri" className="overflow-hidden p-0 border-slate-100 shadow-xl shadow-slate-200/40">
                {/* Table Toolbar */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                    <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Tümü</button>
                        <button className="px-4 py-2 text-slate-500 hover:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Tamamlanan</button>
                        <button className="px-4 py-2 text-slate-500 hover:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Bekleyen</button>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="ID, firma veya tarih ara..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            <tr>
                                <th className="p-5 pl-8">İşlem ID</th>
                                <th className="p-5">Firma / Üye</th>
                                <th className="p-5">Tarih</th>
                                <th className="p-5">Metot</th>
                                <th className="p-5">Brüt Tutar</th>
                                <th className="p-5">Komisyon</th>
                                <th className="p-5 text-right pr-8">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((trx, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                    <td className="p-5 pl-8 font-mono text-[10px] text-slate-400 font-bold group-hover:text-slate-900">{trx.id}</td>
                                    <td className="p-5 font-black text-slate-900 text-xs">{trx.company}</td>
                                    <td className="p-5 text-[11px] text-slate-500 font-bold">{trx.date}</td>
                                    <td className="p-5">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-tighter">
                                            {trx.method === 'Havale' ? <Building2 size={12}/> : <CreditCard size={12}/>}
                                            {trx.method}
                                        </span>
                                    </td>
                                    <td className="p-5 font-black text-slate-900 text-sm tracking-tighter">{trx.amount}</td>
                                    <td className="p-5">
                                        <span className="text-red-500 font-black text-xs">-{trx.commission}</span>
                                    </td>
                                    <td className="p-5 text-right pr-8">
                                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border shadow-sm ${
                                            trx.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                            trx.status === 'processing' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {trx.status === 'completed' ? 'Tamamlandı' : trx.status === 'processing' ? 'İşleniyor' : 'Beklemede'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Alt Bilgi Şeridi */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahsilat Sistemi Aktif</span></div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest"><Info size={12}/> Otomatik ödemeler her cuma günü 14:00'te gerçekleşir.</div>
                    </div>
                </div>
            </WidgetCard>
        </div>
    );
};

export default PaymentReports;