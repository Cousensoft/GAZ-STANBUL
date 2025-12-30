
import React, { useState } from 'react';
import { useMarket, MarketProduct } from '../../../../context/MarketContext';
import { Search, Plus, Edit3, Trash2, Filter, Package, AlertCircle } from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

interface ProductListProps {
    onAddClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddClick }) => {
  const { products, deleteProduct } = useMarket();
  const [filter, setFilter] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | 'published' | 'draft' | 'low_stock'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(filter.toLowerCase()) || p.sku.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusTab === 'all' || 
                          (statusTab === 'low_stock' ? p.stock < 10 : p.status === statusTab);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
       
       {/* Actions Bar */}
       <div className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'published', label: 'Yayında' },
                  { id: 'draft', label: 'Taslak' },
                  { id: 'low_stock', label: 'Kritik Stok' }
              ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setStatusTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        statusTab === tab.id 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Ürün ara..." 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                />
             </div>
             <button 
                onClick={onAddClick}
                className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2"
             >
                <Plus size={16} /> <span className="hidden sm:inline">Yeni Ekle</span>
             </button>
          </div>
       </div>

       {/* Product Table */}
       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto custom-scrollbar flex-1">
             <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                   <tr>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ürün Bilgisi</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">Kategori</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fiyat</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">Stok</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlemler</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                               </div>
                               <div>
                                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                                  <span className="text-[10px] text-slate-400 font-mono">SKU: {product.sku}</span>
                               </div>
                            </div>
                         </td>
                         <td className="p-4 text-xs font-medium text-slate-600">{product.category}</td>
                         <td className="p-4 text-sm font-bold text-slate-900">{product.price.toLocaleString('tr-TR')} ₺</td>
                         <td className="p-4">
                            <span className={`text-xs font-bold flex items-center gap-1 ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                               {product.stock < 10 && <AlertCircle size={10}/>}
                               {product.stock} Adet
                            </span>
                         </td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               product.status === 'published' ? 'bg-green-50 text-green-700 border border-green-100' : 
                               product.status === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-slate-100 text-slate-600'
                            }`}>
                               {product.status === 'published' ? 'Yayında' : product.status === 'draft' ? 'Taslak' : 'Arşiv'}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                                  <Edit3 size={14} />
                               </button>
                               <button 
                                  onClick={() => { if(confirm('Silmek istediğine emin misin?')) deleteProduct(product.id) }} 
                                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                               >
                                  <Trash2 size={14} />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             {filteredProducts.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                   <Package size={48} className="mx-auto mb-4 text-slate-300" />
                   <p className="text-sm">Kriterlere uygun ürün bulunamadı.</p>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default ProductList;
