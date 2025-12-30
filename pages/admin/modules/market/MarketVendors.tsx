
import React, { useState } from 'react';
import { Search, MoreHorizontal, Star, ShieldCheck, Ban, Eye } from 'lucide-react';
import MarketVendorDetail from './MarketVendorDetail';

const MarketVendors = () => {
    const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);

    const vendors = [
        { id: 1, name: 'Bosphorus Enerji', status: 'active', rating: 4.8, totalSales: '145.000₺', products: 124 },
        { id: 2, name: 'Galata Mekanik', status: 'pending', rating: 0, totalSales: '0₺', products: 12 },
        { id: 3, name: 'TechIstanbul', status: 'active', rating: 4.9, totalSales: '89.500₺', products: 45 },
        { id: 4, name: 'Anadolu Yedek Parça', status: 'suspended', rating: 3.2, totalSales: '12.000₺', products: 8 },
    ];

    if (selectedVendorId) {
        return <MarketVendorDetail vendorId={selectedVendorId} onBack={() => setSelectedVendorId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900">Satıcı Listesi</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Satıcı ara..." 
                        className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900" 
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Satıcı Adı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mağaza Puanı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Toplam Satış</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ürün Sayısı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {vendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-slate-50/50 group">
                                <td className="p-4">
                                    <div className="font-bold text-slate-900">{vendor.name}</div>
                                    <div className="text-xs text-slate-400">ID: #{vendor.id}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                        vendor.status === 'active' ? 'bg-green-100 text-green-700' :
                                        vendor.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {vendor.status === 'active' ? 'Aktif' : vendor.status === 'pending' ? 'Onay Bekliyor' : 'Askıda'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                        <Star size={14} fill="currentColor" /> {vendor.rating > 0 ? vendor.rating : '-'}
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-medium text-slate-900">{vendor.totalSales}</td>
                                <td className="p-4 text-sm text-slate-600">{vendor.products}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => setSelectedVendorId(vendor.id)}
                                            className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2" 
                                            title="Detay"
                                        >
                                            <Eye size={16} /> <span className="text-xs font-bold hidden md:inline">Detay</span>
                                        </button>
                                        
                                        {vendor.status === 'pending' && (
                                            <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Onayla">
                                                <ShieldCheck size={16} />
                                            </button>
                                        )}
                                        {vendor.status === 'active' && (
                                            <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Askıya Al">
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
        </div>
    );
};

export default MarketVendors;
