
import React, { useState } from 'react';
import { ShoppingBag, BarChart3, Users, Package, ShoppingCart, TurkishLira } from 'lucide-react';
import MarketOverview from './market/MarketOverview';
import MarketVendors from './market/MarketVendors';
import MarketProducts from './market/MarketProducts';
import MarketOrders from './market/MarketOrders';
import MarketFinance from './market/MarketFinance';

const MarketManager = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'vendors' | 'products' | 'orders' | 'finance'>('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Genel Bakış', icon: BarChart3 },
        { id: 'vendors', label: 'Satıcılar', icon: Users },
        { id: 'products', label: 'Ürünler', icon: Package },
        { id: 'orders', label: 'Siparişler', icon: ShoppingCart },
        { id: 'finance', label: 'Finans', icon: TurkishLira },
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard': return <MarketOverview />;
            case 'vendors': return <MarketVendors />;
            case 'products': return <MarketProducts />;
            case 'orders': return <MarketOrders />;
            case 'finance': return <MarketFinance />;
            default: return <MarketOverview />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header / Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">GazMarket Yönetimi</h2>
                        <p className="text-xs text-slate-500">Süper Admin Paneli</p>
                    </div>
                </div>
                
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-1 px-2 w-full md:w-auto">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)} 
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default MarketManager;
