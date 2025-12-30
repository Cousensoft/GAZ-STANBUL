import React, { useState } from 'react';
import { TrendingUp, TurkishLira, ArrowUpRight, Calendar, Info } from 'lucide-react';
import { GroupedBarChart } from '../../../../components/admin/Charts';

const SocialFinancials = () => {
    // Grafik Verisi (Sağlanan tasarımdaki değerlere uygun)
    const incomeTrendData = [
        { label: 'OCA', current: 40, previous: 25 },
        { label: 'ŞUB', current: 55, previous: 40 },
        { label: 'MAR', current: 45, previous: 35 },
        { label: 'NİS', current: 80, previous: 50 },
        { label: 'MAY', current: 65, previous: 55 },
        { label: 'HAZ', current: 90, previous: 70 },
        { label: 'TEM', current: 100, previous: 85 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* KPI Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">TOPLAM REKLAM GELİRİ</span>
                        <h3 className="text-3xl font-black mt-2 tracking-tight">1.842.500 ₺</h3>
                        <div className="mt-4 flex gap-2">
                            <div className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                <ArrowUpRight size={10}/> +%24.5 Yıllık Büyüme
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-5">
                        <TurkishLira size={120} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">SPONSORLU İÇERİK</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">45.200 ₺</h3>
                    <div className="mt-4 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded w-fit uppercase">12 Aktif Kampanya</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">BİRİM MALİYET (CPM)</span>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-2 tracking-tight">0.45 ₺</h3>
                    <div className="mt-4 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit uppercase">%3.2 Tıklanma Oranı</div>
                </div>
            </div>

            {/* --- YENİ MODERN GELİR TRENDİ KARTI --- */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 flex flex-col min-h-[450px]">
                <div className="flex flex-col md:flex-row items-start justify-between mb-10 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">+124</span>
                            <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                                <TrendingUp size={12} strokeWidth={3} /> %8.5
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bu Ay</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Geçen Ay</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex gap-2">
                        <button className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">Yıllık</button>
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">Aylık</button>
                    </div>
                </div>

                {/* Grafik Alanı */}
                <div className="flex-1 min-h-[224px] relative">
                    <GroupedBarChart 
                        data={incomeTrendData} 
                        height={224} 
                        mainColor="bg-indigo-600" 
                        secColor="bg-slate-300" 
                        showYAxis={true} 
                        unit=""
                    />
                </div>

                {/* Alt Bilgi Şeridi */}
                <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex gap-8">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Mevcut Çeyrek</span>
                            <span className="text-lg font-black text-slate-900">452K ₺</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Tahmini Sonuç</span>
                            <span className="text-lg font-black text-indigo-600">510K ₺</span>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-4 py-3 rounded-2xl flex items-center gap-3">
                        <Info size={16} className="text-slate-400" />
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">
                            Gelir verileri GazSocial reklam havuzu ve sponsorlu anlaşmaların <br/> 
                            toplamını yansıtmaktadır. Veriler anlık güncellenir.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialFinancials;