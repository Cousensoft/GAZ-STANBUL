
import React from 'react';
import { Eye, FileText, CheckCircle, DollarSign, BarChart3, Star, PlusCircle, Store, MoreHorizontal, TrendingUp, ThumbsUp } from 'lucide-react';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';
import { BarChart, GaugeChart } from '../../../components/admin/Charts';

const CorporateOverview = ({ user, onChangeTab }: { user: any, onChangeTab: (tab: string) => void }) => {
    return (
        <div className="animate-fade-in space-y-6">
            
            {/* 1. Header Banner (Simplified/Clean) */}
            <div className="bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="relative z-10">
                  <h1 className="text-3xl font-black text-slate-900 mb-2">Hoş geldin, {user.name} 👋</h1>
                  <p className="text-slate-500 text-sm max-w-xl">Profiliniz %95 oranında tamamlandı. Yeni fırsatları değerlendirmek için talepleri inceleyin.</p>
               </div>
               <div className="flex gap-3 relative z-10">
                  <button onClick={() => onChangeTab('leads')} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                     Talepleri Gör
                  </button>
                  <button onClick={() => onChangeTab('company')} className="bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200">
                     Profili Düzenle
                  </button>
               </div>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <PerformanceStat 
                    label="Profil İlgisi" 
                    value="%42" 
                    subtext="Görüntülenme artışı" 
                    colorName="blue" 
                    hexColor="#3b82f6"
                    icon={Eye}
                    type="circle"
                    percentage={42}
               />
               <PerformanceStat 
                    label="Teklif Başarısı" 
                    value="%18" 
                    subtext="Kabul edilen teklifler" 
                    colorName="green" 
                    hexColor="#22c55e"
                    icon={CheckCircle}
                    type="circle"
                    percentage={18}
               />
               <PerformanceStat 
                    label="Ciro Hedefi" 
                    value="%65" 
                    subtext="Aylık hedef durumu" 
                    colorName="indigo" 
                    hexColor="#6366f1"
                    icon={DollarSign}
                    type="circle"
                    percentage={65}
               />
               <PerformanceStat 
                    label="Memnuniyet" 
                    value="4.8" 
                    subtext="Ortalama puan" 
                    colorName="orange" 
                    hexColor="#f97316"
                    icon={Star}
                    type="icon"
               />
            </div>

            {/* 3. Main Dashboard Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               
               {/* Left Column (Activity) */}
               <WidgetCard className="lg:col-span-2 min-h-[300px]" title="Haftalık Performans">
                    <div className="flex items-center gap-4 mb-6">
                        <div>
                            <span className="text-3xl font-black text-slate-900">85%</span>
                            <p className="text-xs text-slate-400 font-medium">Doluluk Oranı</p>
                        </div>
                        <div className="h-8 w-px bg-slate-100"></div>
                        <div>
                            <span className="text-3xl font-black text-slate-900">124</span>
                            <p className="text-xs text-slate-400 font-medium">Yeni Müşteri</p>
                        </div>
                    </div>
                    <BarChart data={[
                        { label: 'Pzt', value: 40 },
                        { label: 'Sal', value: 65 },
                        { label: 'Çar', value: 30 },
                        { label: 'Per', value: 85 },
                        { label: 'Cum', value: 50 },
                        { label: 'Cmt', value: 95 },
                        { label: 'Paz', value: 60 }
                    ]} height={48} />
               </WidgetCard>

               {/* Right Column (Rating & Gauge) */}
               <div className="space-y-6">
                  <WidgetCard title="Müşteri Memnuniyeti">
                     <div className="flex flex-col items-center justify-center">
                        <GaugeChart percentage={92} />
                        <div className="flex items-center gap-2 mt-4 bg-orange-50 px-4 py-2 rounded-full">
                            <Star size={16} className="text-orange-500 fill-orange-500"/> 
                            <span className="font-bold text-orange-700 text-sm">4.8 / 5.0</span>
                        </div>
                     </div>
                  </WidgetCard>

                  <WidgetCard title="Hızlı İşlemler">
                     <div className="space-y-2">
                        <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                           <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg text-slate-500 group-hover:text-orange-500 shadow-sm"><PlusCircle size={18}/></div>
                                <span className="font-bold text-slate-700 text-sm">Yeni Ürün Ekle</span>
                           </div>
                           <MoreHorizontal size={16} className="text-slate-300"/>
                        </button>
                        <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                           <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg text-slate-500 group-hover:text-blue-500 shadow-sm"><Store size={18}/></div>
                                <span className="font-bold text-slate-700 text-sm">Mağaza Ayarları</span>
                           </div>
                           <MoreHorizontal size={16} className="text-slate-300"/>
                        </button>
                     </div>
                  </WidgetCard>
               </div>

            </div>
            
            {/* Recent Leads Table */}
            <WidgetCard title="Son Gelen Talepler" className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="py-3 pl-2 text-xs font-bold text-slate-400 uppercase">Müşteri</th>
                                <th className="py-3 text-xs font-bold text-slate-400 uppercase">Hizmet</th>
                                <th className="py-3 text-xs font-bold text-slate-400 uppercase">Tarih</th>
                                <th className="py-3 text-xs font-bold text-slate-400 uppercase">Durum</th>
                                <th className="py-3 pr-2 text-xs font-bold text-slate-400 uppercase text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3].map(i => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">M{i}</div>
                                            <span className="font-bold text-slate-900 text-sm">Müşteri {i}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-sm text-slate-600">Kombi Bakımı</td>
                                    <td className="py-3 text-xs text-slate-400">2 saat önce</td>
                                    <td className="py-3">
                                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Yeni</span>
                                    </td>
                                    <td className="py-3 pr-2 text-right">
                                        <button className="text-xs font-bold text-slate-500 hover:text-orange-500">Detay</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </WidgetCard>
        </div>
    );
};

export default CorporateOverview;
