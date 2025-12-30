
import React, { useState } from 'react';
import { useMarket, MarketProduct } from '../../../../context/MarketContext';
import { AlertTriangle, Save, Search, Package, TrendingDown, TrendingUp, History, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

const StockManager = () => {
  const { products, updateStock } = useMarket();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);

  // Filtered Products
  const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  // Mock History Data (Dynamic based on selection)
  const getStockHistory = (id: string) => [
      { type: 'in', amount: 50, date: '20.10.2024', note: 'Mal Kabul', user: 'Depo Sorumlusu' },
      { type: 'out', amount: 2, date: '22.10.2024', note: 'Sipariş #ORD-1002', user: 'Sistem' },
      { type: 'out', amount: 1, date: '24.10.2024', note: 'Sipariş #ORD-1003', user: 'Sistem' },
  ];

  const handleUpdate = () => {
      if(selectedProduct) {
          updateStock(selectedProduct.id, adjustAmount);
      }
  };

  const handleSelect = (product: MarketProduct) => {
      setSelectedProduct(product);
      setAdjustAmount(product.stock);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
       
       {/* Top KPI Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <XCircle size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Tükenen Ürünler</p>
                  <h3 className="text-2xl font-black text-slate-900">{outOfStockCount} <span className="text-sm font-medium text-slate-400">Adet</span></h3>
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Kritik Stok</p>
                  <h3 className="text-2xl font-black text-slate-900">{lowStockCount} <span className="text-sm font-medium text-slate-400">Adet</span></h3>
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package size={24} />
              </div>
              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Toplam Stok Değeri</p>
                  <h3 className="text-2xl font-black text-slate-900">{totalStockValue.toLocaleString('tr-TR')} <span className="text-sm font-bold text-slate-400">₺</span></h3>
              </div>
          </div>
       </div>

       {/* Main Content Split View */}
       <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
          
          {/* Left: Product List */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50 shrink-0">
                  <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                          type="text" 
                          placeholder="Ürün adı veya SKU ara..." 
                          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100">
                      Filtrele
                  </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                  <table className="w-full text-left border-collapse">
                      <thead className="bg-white sticky top-0 z-10">
                          <tr>
                              <th className="p-3 text-[10px] font-bold text-slate-400 uppercase pl-4">Ürün</th>
                              <th className="p-3 text-[10px] font-bold text-slate-400 uppercase">Kategori</th>
                              <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-right">Mevcut Stok</th>
                              <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-right pr-4">Durum</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                          {filteredProducts.map(p => (
                              <tr 
                                  key={p.id} 
                                  onClick={() => handleSelect(p)}
                                  className={`cursor-pointer transition-colors group ${selectedProduct?.id === p.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                              >
                                  <td className="p-3 pl-4">
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 p-1 flex-shrink-0">
                                              <img src={p.imageUrl} className="w-full h-full object-contain" alt="" />
                                          </div>
                                          <div>
                                              <div className="font-bold text-slate-900 text-xs line-clamp-1">{p.name}</div>
                                              <div className="text-[10px] text-slate-400 font-mono">{p.sku}</div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="p-3 text-xs text-slate-500">{p.category}</td>
                                  <td className="p-3 text-right">
                                      <span className="font-bold text-slate-900 text-sm">{p.stock}</span>
                                  </td>
                                  <td className="p-3 text-right pr-4">
                                      {p.stock === 0 ? (
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-600"><XCircle size={10}/> Tükendi</span>
                                      ) : p.stock < 10 ? (
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-600"><AlertCircle size={10}/> Kritik</span>
                                      ) : (
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-600"><CheckCircle size={10}/> Stokta</span>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* Right: Detail & Edit Panel */}
          <div className="w-full lg:w-[350px] flex flex-col gap-6 shrink-0">
              
              {selectedProduct ? (
                  <>
                      {/* Update Stock Card */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-slide-in-right">
                          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Package size={18} className="text-blue-600"/> Stok Güncelle
                          </h3>
                          
                          <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 p-2">
                                  <img src={selectedProduct.imageUrl} className="w-full h-full object-contain" alt="" />
                              </div>
                              <div>
                                  <div className="text-sm font-bold text-slate-900 line-clamp-1">{selectedProduct.name}</div>
                                  <div className="text-xs text-slate-500 mb-1">{selectedProduct.sku}</div>
                                  <div className={`text-xs font-bold ${selectedProduct.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                                      Mevcut: {selectedProduct.stock} Adet
                                  </div>
                              </div>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 text-center">Yeni Stok Miktarı</label>
                              <div className="flex items-center justify-center gap-3">
                                  <button onClick={() => setAdjustAmount(Math.max(0, adjustAmount - 1))} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors font-bold text-lg">-</button>
                                  <input 
                                      type="number" 
                                      value={adjustAmount}
                                      onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                                      className="w-20 text-center bg-white border border-slate-200 rounded-xl py-2 font-black text-2xl text-slate-900 outline-none focus:border-blue-500"
                                  />
                                  <button onClick={() => setAdjustAmount(adjustAmount + 1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors font-bold text-lg">+</button>
                              </div>
                          </div>

                          <button 
                              onClick={handleUpdate}
                              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                          >
                              <Save size={16} /> Güncelle
                          </button>
                      </div>

                      {/* History Card */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-1 animate-slide-in-right delay-75">
                          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <History size={18} className="text-slate-400"/> Stok Geçmişi
                          </h3>
                          <div className="space-y-4 relative">
                              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                              {getStockHistory(selectedProduct.id).map((h, i) => (
                                  <div key={i} className="flex gap-3 relative z-10">
                                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-1 ${h.type === 'in' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <div>
                                          <div className="flex items-center gap-2">
                                              <span className={`text-xs font-bold ${h.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                                  {h.type === 'in' ? '+' : '-'}{h.amount} Adet
                                              </span>
                                              <span className="text-[10px] text-slate-400">{h.date}</span>
                                          </div>
                                          <p className="text-xs text-slate-600 font-medium">{h.note}</p>
                                          <p className="text-[10px] text-slate-400">İşlem: {h.user}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </>
              ) : (
                  <div className="h-full bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                      <Package size={48} className="mb-4 opacity-50"/>
                      <p className="text-sm font-bold">Ürün Seçilmedi</p>
                      <p className="text-xs mt-1">Stok güncellemek ve geçmişi görmek için listeden bir ürün seçin.</p>
                  </div>
              )}

          </div>

       </div>
    </div>
  );
};

export default StockManager;
