import React, { useState } from 'react';
import { Search, Star, ShieldCheck, Ban, Eye, Percent, Save, CheckCircle2, AlertCircle, X, Settings2, Info, ArrowRight, ShieldAlert } from 'lucide-react';
import MarketVendorDetail from './MarketVendorDetail';

const MarketVendors = () => {
    const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [bulkCommission, setBulkCommission] = useState<string>('10');

    const [vendors, setVendors] = useState([
        { id: 1, name: 'Bosphorus Enerji', status: 'active', rating: 4.8, totalSales: '145.000₺', products: 124, commission: 10 },
        { id: 2, name: 'Galata Mekanik', status: 'pending', rating: 0, totalSales: '0₺', products: 12, commission: 12 },
        { id: 3, name: 'TechIstanbul', status: 'active', rating: 4.9, totalSales: '89.500₺', products: 45, commission: 8 },
        { id: 4, name: 'Anadolu Yedek Parça', status: 'suspended', rating: 3.2, totalSales: '12.000₺', products: 8, commission: 15 },
    ]);

    const handleCommissionChange = (id: number, val: string) => {
        const numVal = parseInt(val) || 0;
        setVendors(prev => prev.map(v => v.id === id ? { ...v, commission: numVal } : v));
    };

    const applyBulkCommission = () => {
        const numVal = parseInt(bulkCommission);
        setVendors(prev => prev.map(v => ({ ...v, commission: numVal })));
        setIsBulkModalOpen(false);
    };

    if (selectedVendorId) {
        return <MarketVendorDetail vendorId={selectedVendorId} onBack={() => setSelectedVendorId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in relative">
            
            {/* --- KURUMSAL TOPLU GÜNCELLEME MODALI --- */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={() => setIsBulkModalOpen(false)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-fade-in-up border border-slate-100">
                        
                        {/* Modal Header - Fontlar Küçültüldü */}
                        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center border border-slate-100">
                                    <ShieldAlert size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 leading-none">Sistem Parametresi Güncelleme</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">Toplu Oran Revizyonu</p>
                                </div>
                            </div>
                            <button onClick={() => setIsBulkModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-300">
                                <X size={18}/>
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            {/* Bilgilendirme Notu - Fontlar Küçültüldü */}
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-[20px] flex gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm h-fit text-blue-500 border border-slate-100">
                                    <Info size={16} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 mb-1">İşlem Özeti</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                        Yeni oran uygulandığında, platformdaki <b>{vendors.length} satıcının</b> tamamı için varsayılan değer güncellenecektir. Bu işlem finansal denetim günlüğüne kaydedilir.
                                    </p>
                                </div>
                            </div>

                            {/* Input Alanı - "Yüzde" yazısı silindi, font küçültüldü */}
                            <div className="max-w-[240px] mx-auto">
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-center">Yeni Global Komisyon Oranı</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Percent size={18} className="text-blue-600 font-black" />
                                    </div>
                                    <input 
                                        type="number" 
                                        value={bulkCommission}
                                        onChange={(e) => setBulkCommission(e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[22px] py-4 px-12 text-2xl font-black text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all text-center shadow-inner"
                                        placeholder="10"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Aksiyon Butonları - Fontlar Küçültüldü */}
                            <div className="flex gap-3 pt-4">
                                <button 
                                    onClick={() => setIsBulkModalOpen(false)}
                                    className="flex-1 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-[11px] hover:bg-slate-50 hover:border-slate-300 transition-all uppercase tracking-widest"
                                >
                                    Vazgeç
                                </button>
                                <button 
                                    onClick={applyBulkCommission}
                                    className="flex-[1.5] py-3.5 rounded-xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.15em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
                                >
                                    Parametreyi Uygula
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TOOLBAR --- */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-4 pl-2">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
                        <Settings2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Satıcı Envanteri</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mt-0.5">Yönetim ve Komisyon Kontrolü</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Arama Kutusu */}
                    <div className="relative w-full sm:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Satıcı adı veya ID ile ara..." 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all" 
                        />
                    </div>

                    <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

                    {/* Toplu Güncelle Butonu - İstenen Değişiklikler Uygulandı */}
                    <button 
                        onClick={() => setIsBulkModalOpen(true)}
                        className="w-full sm:w-auto bg-blue-600 border border-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-[10px] hover:bg-blue-700 hover:border-blue-700 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-3 group"
                    >
                        <Percent size={14} className="text-white transition-transform group-hover:scale-110" />
                        Toplu Komisyon Güncelle
                    </button>
                </div>
            </div>

            {/* --- VENDOR TABLE --- */}
            <div className="bg-white rounded-[36px] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 pl-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Satıcı Profili</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Komisyon Oranı</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Puan</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Toplam Satış</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right pr-10">Yönetim</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {vendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-slate-50/70 group transition-all">
                                <td className="p-6 pl-10">
                                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{vendor.name}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 flex items-center gap-2">
                                        UID: #{vendor.id} 
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        {vendor.products} Aktif Ürün
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex justify-center">
                                        <div className="relative w-28 group/input">
                                            <input 
                                                type="number" 
                                                value={vendor.commission}
                                                onChange={(e) => handleCommissionChange(vendor.id, e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-center"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 group-focus-within/input:text-blue-600 transition-colors uppercase">%</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-center">
                                    <div className="inline-flex items-center gap-1.5 text-amber-500 font-black text-xs bg-amber-50 px-3 py-1 rounded-full border border-amber-100 shadow-sm">
                                        <Star size={12} fill="currentColor" /> {vendor.rating > 0 ? vendor.rating : '-'}
                                    </div>
                                </td>
                                <td className="p-6 text-sm font-black text-slate-900 tracking-tighter">{vendor.totalSales}</td>
                                <td className="p-6 text-right pr-10">
                                    <div className="flex justify-end gap-3">
                                        <button 
                                            onClick={() => setSelectedVendorId(vendor.id)}
                                            className="p-2 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm group/btn" 
                                            title="Profil Detaylarını Gör"
                                        >
                                            <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        
                                        {vendor.status === 'pending' ? (
                                            <button className="p-2 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100" title="Satıcıyı Onayla">
                                                <ShieldCheck size={16} />
                                            </button>
                                        ) : (
                                            <button className="p-2 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100" title="Satışı Durdur">
                                                <Ban size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* --- INFO FOOTER --- */}
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="relative z-10 flex items-start gap-6 max-w-2xl">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 shrink-0">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg leading-tight mb-2">Güvenli Komisyon Yönetimi Sistemi</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Oran değişiklikleri yapıldığı andan itibaren yeni açılan sipariş kalemlerine yansıtılır. Önceki ödeme periyotları ve mevcut hakedişler bu değişiklikten etkilenmez. Tüm finansal işlemler denetim günlüğüne kaydedilmektedir.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            </div>
        </div>
    );
};

export default MarketVendors;