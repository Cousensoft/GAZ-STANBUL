
import React, { useState } from 'react';
import { Search, Filter, Eye, EyeOff, Package } from 'lucide-react';
import MarketProductDetail from './MarketProductDetail';

const MarketProducts = () => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // Mock veriye 'status' bazlı dinamiklik eklemek için state kullanıyoruz
    const [products, setProducts] = useState([
        { id: '101', name: 'Akıllı Termostat X1', category: 'Akıllı Ev', price: '1.250₺', stock: 45, seller: 'TechIstanbul', status: 'active' },
        { id: '102', name: 'Kombi Yedek Parça Seti', category: 'Mekanik', price: '4.500₺', stock: 12, seller: 'Bosphorus Enerji', status: 'low_stock' },
        { id: '103', name: 'Güvenlik Kamerası Pro', category: 'Güvenlik', price: '2.800₺', stock: 0, seller: 'TechIstanbul', status: 'out_of_stock' },
        { id: '104', name: 'Endüstriyel Vana', category: 'Mekanik', price: '850₺', stock: 150, seller: 'Galata Mekanik', status: 'active' },
    ]);

    const toggleVisibility = (id: string) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                // Eğer ürün gizliyse aktif yap, aktifse gizle (hidden statüsü simülasyonu)
                const newStatus = p.status === 'hidden' ? 'active' : 'hidden';
                return { ...p, status: newStatus };
            }
            return p;
        }));
    };

    if (selectedProductId) {
        return <MarketProductDetail productId={selectedProductId} onBack={() => setSelectedProductId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all">Tümü</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all">Yayında Olanlar</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all">Listelenmeyenler</button>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Ürün ara..." className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                    </div>
                    <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Ürün Bilgisi</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Fiyat</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stok</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Satıcı</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Durum</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.map((p) => (
                            <tr key={p.id} className={`hover:bg-slate-50/50 group transition-all ${p.status === 'hidden' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                                <td className="p-4">
                                    <div className="font-bold text-slate-900">{p.name}</div>
                                    <div className="text-xs text-slate-400 font-mono uppercase tracking-tighter">SKU: GZ-{p.id}</div>
                                </td>
                                <td className="p-4 text-sm text-slate-600 font-medium">{p.category}</td>
                                <td className="p-4 text-sm font-black text-slate-900">{p.price}</td>
                                <td className="p-4">
                                    <span className={`font-bold text-sm ${p.stock === 0 ? 'text-red-600' : p.stock < 20 ? 'text-amber-600' : 'text-slate-700'}`}>
                                        {p.stock} Adet
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-blue-600 hover:underline cursor-pointer font-bold">{p.seller}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase border shadow-sm ${
                                        p.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' :
                                        p.status === 'low_stock' ? 'bg-amber-100 text-amber-700 border-amber-100' : 
                                        p.status === 'hidden' ? 'bg-slate-900 text-white border-slate-800' :
                                        'bg-red-100 text-red-700 border-red-100'
                                    }`}>
                                        {p.status === 'active' ? 'Yayında' : 
                                         p.status === 'low_stock' ? 'Kritik Stok' : 
                                         p.status === 'hidden' ? 'Listelenmiyor' : 'Tükendi'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        {/* İnceleme Butonu */}
                                        <button 
                                            onClick={() => setSelectedProductId(p.id)}
                                            className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all shadow-sm" 
                                            title="Ürün Detaylarını Gör"
                                        >
                                            <Eye size={18}/>
                                        </button>

                                        {/* Listelemeden Kaldır / Geri Ekle Butonu */}
                                        <button 
                                            onClick={() => toggleVisibility(p.id)}
                                            className={`p-2 rounded-xl transition-all shadow-sm border ${
                                                p.status === 'hidden' 
                                                ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white' 
                                                : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white'
                                            }`}
                                            title={p.status === 'hidden' ? 'Tekrar Listele' : 'Listelemeden Kaldır'}
                                        >
                                            {p.status === 'hidden' ? <Eye size={18}/> : <EyeOff size={18}/>}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Alt Bilgilendirme */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
                <Package className="text-blue-600 mt-0.5" size={18} />
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    <b>İpucu:</b> Listelemeden kaldırdığınız ürünler, müşterilerin market aramalarında veya kategorilerde görüntülenmez. Bu işlemi ürünleri kalıcı olarak silmeden stokta olmayan veya geçici olarak satışı durdurulan ürünler için kullanabilirsiniz.
                </p>
            </div>
        </div>
    );
};

export default MarketProducts;
