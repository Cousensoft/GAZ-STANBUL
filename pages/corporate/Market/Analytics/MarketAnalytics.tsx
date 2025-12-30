
import React from 'react';
import { useMarket } from '../../../../context/MarketContext';
import { TurkishLira, ShoppingBag, Package, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { BarChart, GaugeChart } from '../../../../components/admin/Charts';
import { PerformanceStat, WidgetCard } from '../../../../components/dashboard/Widgets';

const MarketAnalytics = () => {
  const { stats } = useMarket();

  return (
    <div className="space-y-6">
       {/* KPIs Row */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PerformanceStat 
             label="Toplam Ciro" 
             value={`${stats.totalRevenue.toLocaleString('tr-TR')} ₺`} 
             subtext="Bu ay" 
             colorName="emerald" 
             hexColor="#10b981" 
             icon={TurkishLira} 
             type="circle" 
             percentage={78} 
          />
          <PerformanceStat 
             label="Siparişler" 
             value={stats.totalOrders} 
             subtext="Bekleyen: 3" 
             colorName="blue" 
             hexColor="#3b82f6" 
             icon={ShoppingBag} 
             type="circle" 
             percentage={92} 
          />
          <PerformanceStat 
             label="Aktif Ürün" 
             value={stats.totalProducts} 
             subtext="Toplam Envanter" 
             colorName="indigo" 
             hexColor="#6366f1" 
             icon={Package} 
             type="icon" 
          />
          <PerformanceStat 
             label="Kritik Stok" 
             value={stats.lowStockAlerts} 
             subtext="Ürün tükeniyor" 
             colorName="red" 
             hexColor="#ef4444" 
             icon={AlertTriangle} 
             type="icon" 
          />
       </div>

       {/* Detailed Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Sales Chart */}
          <WidgetCard className="lg:col-span-2" title="Satış Grafiği (Son 7 Gün)">
             <div className="flex items-center gap-4 mb-8">
                 <div>
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">42.500 ₺</span>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Haftalık Toplam</p>
                 </div>
                 <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold border border-green-100">
                     <TrendingUp size={14}/> +15%
                 </div>
             </div>
             <div className="h-56 w-full">
                <BarChart data={stats.dailySales} height={224} color="bg-slate-900" showYAxis={true} unit="₺" />
             </div>
          </WidgetCard>

          {/* Top Products & Category */}
          <div className="flex flex-col gap-6">
              <WidgetCard title="Kategori Dağılımı">
                 <div className="flex flex-col items-center justify-center py-2">
                    <GaugeChart percentage={65} />
                    <p className="text-center text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-wider">En çok satış "Kombi" kategorisinde.</p>
                 </div>
              </WidgetCard>

              <WidgetCard title="En Çok Satanlar" className="flex-1">
                 <div className="space-y-3">
                    {stats.topProducts.map((p, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                                 {i + 1}
                             </div>
                             <span className="font-bold text-slate-700 text-xs md:text-sm truncate max-w-[120px]">{p.name}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{p.sales} Adet</span>
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-4 flex items-center justify-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                     Tümünü Gör <ArrowRight size={12}/>
                 </button>
              </WidgetCard>
          </div>
       </div>
    </div>
  );
};

export default MarketAnalytics;
