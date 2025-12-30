import React, { useState } from 'react';
import { MarketProvider } from '../../../context/MarketContext';
import ProductList from './Products/ProductList';
import AddProduct from './Products/AddProduct';
import OrdersList from './Orders/OrdersList';
import StockManager from './Stock/StockManager';
import MarketAnalytics from './Analytics/MarketAnalytics';
import MarketSettings from './Settings/MarketSettings';
import ReturnsManager from './Returns/ReturnsManager';
import { LayoutGrid, Package, ShoppingCart, BarChart3, Settings, AlertCircle, TrendingUp, Store, ExternalLink, RotateCcw } from 'lucide-react';

const MarketDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'stock' | 'returns' | 'settings'>('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleAddProductClick = () => setIsAddingProduct(true);
  const handleBackToList = () => setIsAddingProduct(false);

  const handleTabChange = (tab: any) => {
      setActiveTab(tab);
      setIsAddingProduct(false);
  };

  return (
    <MarketProvider>
      <div className="animate-fade-in space-y-6 h-[calc(100vh-140px)] flex flex-col">
        {!isAddingProduct && (
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Store size={20} /></div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Bosphorus Market</h2>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-green-600"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Aktif</span>
                        <span>•</span>
                        <a href="#" className="hover:text-blue-600 flex items-center gap-1">Mağaza <ExternalLink size={8}/></a>
                    </div>
                </div>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl flex-wrap gap-0.5">
                {[
                    { id: 'overview', label: 'Özet', icon: LayoutGrid },
                    { id: 'orders', label: 'Siparişler', icon: ShoppingCart },
                    { id: 'products', label: 'Ürünler', icon: Package },
                    { id: 'stock', label: 'Stok', icon: AlertCircle },
                    { id: 'returns', label: 'İadeler', icon: RotateCcw },
                    { id: 'settings', label: 'Ayarlar', icon: Settings },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                        activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <tab.icon size={12} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
            </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
           {activeTab === 'overview' && <MarketAnalytics />}
           {activeTab === 'products' && (isAddingProduct ? <AddProduct onBack={handleBackToList} /> : <ProductList onAddClick={handleAddProductClick} />)}
           {activeTab === 'orders' && <OrdersList />}
           {activeTab === 'stock' && <StockManager />}
           {activeTab === 'returns' && <ReturnsManager />}
           {activeTab === 'settings' && <MarketSettings />}
        </div>
      </div>
    </MarketProvider>
  );
};

export default MarketDashboard;