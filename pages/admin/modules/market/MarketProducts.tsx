
import React, { useState } from 'react';
import { Search, Filter, Edit3, Trash2, Eye } from 'lucide-react';
import MarketProductDetail from './MarketProductDetail';

const MarketProducts = () => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const products = [
        { id: '101', name: 'Akıllı Termostat X1', category: 'Akıllı Ev', price: '1.250₺', stock: 45, seller: 'TechIstanbul', status: 'active' },
        { id: '102', name: 'Kombi Yedek Parça Seti', category: 'Mekanik', price: '4.500₺', stock: 12, seller: 'Bosphorus Enerji', status: 'low_stock' },
        { id: '103', name: 'Güvenlik Kamerası Pro', category: 'Güvenlik', price: '2.800₺', stock: 0, seller: 'TechIstanbul', status: 'out_of_stock' },
        { id: '104', name: 'Endüstriyel Vana', category: 'Mekanik', price: '850₺', stock: 150, seller: 'Galata Mekanik', status: 'active' },
    ];

    if (selectedProductId) {
        return <MarketProductDetail productId={selectedProductId} onBack={() => setSelectedProductId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Tümü</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold">Onay Bekleyen</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold">Stoksuz</button>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Ürün ara..." className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none" />
                    </div>
                    <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ürün Adı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Kategori</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fiyat</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Stok</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Satıcı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 group">
                                <td className="p-4">
                                    <div className="font-bold text-slate-900">{p.name}</div>
                                    <div className="text-xs text-slate-400">SKU: GZ-{p.id}</div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{p.category}</td>
                                <td className="p-4 text-sm font-bold text-slate-900">{p.price}</td>
                                <td className="p-4">
                                    <span className={`font-bold text-sm ${p.stock === 0 ? 'text-red-600' : p.stock < 20 ? 'text-amber-600' : 'text-slate-700'}`}>
                                        {p.stock} Adet
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-blue-600 hover:underline cursor-pointer">{p.seller}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                        p.status === 'active' ? 'bg-green-100 text-green-700' :
                                        p.status === 'low_stock' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {p.status === 'active' ? 'Yayında' : p.status === 'low_stock' ? 'Kritik Stok' : 'Tükendi'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => setSelectedProductId(p.id)}
                                            className="p-1.5 hover:bg-slate-100 rounded text-slate-500" 
                                            title="İncele"
                                        >
                                            <Eye size={16}/>
                                        </button>
                                        <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600"><Edit3 size={16}/></button>
                                        <button className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 size={16}/></button>
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

export default MarketProducts;
