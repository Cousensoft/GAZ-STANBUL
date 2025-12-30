
import React from 'react';
import { Building2, FileText, TrendingUp, Server, ArrowRight, Flame, Wrench, Cpu, Zap, AlertCircle, Radio, Activity, CheckCircle2, CheckSquare, Crown, Lock, Trophy, BarChart2 } from 'lucide-react';
import { GroupedBarChart } from '../../../components/admin/Charts';
import { PerformanceStat, WidgetCard } from '../../../components/dashboard/Widgets';

const DashboardOverview = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
    const liveActivity = [
        { id: 1, type: 'order', text: 'Yeni Market Siparişi (#ORD-552)', time: 'Şimdi', color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 2, type: 'request', text: 'Kadıköy: Acil Kombi Arızası Bildirildi', time: '2 dk önce', color: 'text-red-600', bg: 'bg-red-50' },
        { id: 3, type: 'user', text: 'Yeni Kurumsal Üye Başvurusu: Atlas Teknik', time: '5 dk önce', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const sectorStats = [
        { name: 'Doğalgaz Sistemleri', value: 42, color: 'bg-orange-500', icon: Flame },
        { name: 'Mekanik Tesisat', value: 28, color: 'bg-blue-500', icon: Wrench },
        { name: 'Akıllı Ev & IoT', value: 18, color: 'bg-purple-500', icon: Cpu },
        { name: 'Elektrik & Enerji', value: 12, color: 'bg-yellow-500', icon: Zap },
    ];

    // En çok özel talep alan firmalar (Marka Gücü Yüksek)
    const topPrivateDemandCompanies = [
        { id: 1, name: 'Bosphorus Enerji', count: 154, trend: '+12%', share: 35 },
        { id: 2, name: 'TechIstanbul', count: 98, trend: '+5%', share: 22 },
        { id: 3, name: 'Galata Mekanik', count: 76, trend: '-2%', share: 18 },
        { id: 4, name: 'Kuzey Elektrik', count: 45, trend: '+8%', share: 10 },
        { id: 5, name: 'Mavi Isı', count: 32, trend: '+1%', share: 7 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat label="Sistem Yükü" value="%14" subtext="Bulut Kaynak kullanımı" colorName="indigo" hexColor="#6366f1" icon={Server} type="circle" percentage={14} />
                <PerformanceStat label="Aktif Oturum" value="1.840" subtext="Anlık online kullanıcı" colorName="blue" hexColor="#3b82f6" icon={Activity} type="icon" />
                <PerformanceStat label="Hizmet Talebi" value="542" subtext="Bugün oluşturulan" colorName="orange" hexColor="#f97316" icon={FileText} type="circle" percentage={64} />
                <PerformanceStat label="İşlem Hacmi" value="1.2M ₺" subtext="Günlük toplam ciro" colorName="emerald" hexColor="#10b981" icon={TrendingUp} type="icon" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live System Pulse */}
                <WidgetCard className="lg:col-span-1" title="Canlı Sistem Akışı" action={<Radio size={16} className="text-red-500 animate-pulse" />}>
                    <div className="space-y-4">
                        {liveActivity.map((log) => (
                            <div key={log.id} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className={`p-2 rounded-xl ${log.bg} ${log.color} shrink-0`}><Activity size={16}/></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate leading-tight">{log.text}</p>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onTabChange?.('activities')} className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all">
                        Tüm Logları Görüntüle
                    </button>
                </WidgetCard>

                {/* Main Performance Chart */}
                <WidgetCard className="lg:col-span-2" title="Platform Genel Performansı">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">854.250 ₺</span>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                                    <TrendingUp size={12} /> %14.2
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest mt-2">
                                <span className="flex items-center gap-1.5 text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Bu Hafta</span>
                                <span className="flex items-center gap-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Geçen Hafta</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-44 w-full">
                        <GroupedBarChart data={[
                            { label: 'Pzt', current: 45000, previous: 35000 }, 
                            { label: 'Sal', current: 60000, previous: 50000 }, 
                            { label: 'Çar', current: 35000, previous: 45000 }, 
                            { label: 'Per', current: 80000, previous: 65000 }, 
                            { label: 'Cum', current: 55000, previous: 50000 }, 
                            { label: 'Cmt', current: 90000, previous: 75000 }, 
                            { label: 'Paz', current: 75000, previous: 60000 }
                        ]} height={176} mainColor="bg-emerald-500" secColor="bg-slate-300" unit="₺" />
                    </div>
                </WidgetCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* YENİLENMİŞ MARKALAR TABLOSU */}
                <WidgetCard className="lg:col-span-1" title="Marka Liderleri (Özel Talep)">
                    <div className="space-y-4">
                        {topPrivateDemandCompanies.map((comp, index) => (
                            <div key={comp.id} className="group">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs ${
                                            index === 0 ? 'bg-amber-100 text-amber-700' : 
                                            index === 1 ? 'bg-slate-200 text-slate-600' : 
                                            index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-xs">{comp.name}</h5>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-slate-500">{comp.count} Talep</span>
                                        <span className={`text-[9px] font-black ${comp.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>{comp.trend}</span>
                                    </div>
                                </div>
                                {/* Progress Bar Layout */}
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${comp.share}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white flex items-center gap-3 shadow-lg shadow-purple-200">
                        <Trophy size={20} className="text-amber-300"/>
                        <div>
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Ayın Lideri</p>
                            <p className="text-sm font-black">Bosphorus Enerji</p>
                        </div>
                    </div>
                </WidgetCard>

                <WidgetCard className="lg:col-span-1" title="Onay Kuyruğu" action={<span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-black">5 BEKLEYEN</span>}>
                    <div className="divide-y divide-slate-50">
                        {[
                            { name: 'Sistem Isı Ltd.', type: 'Belge Güncelleme', time: '12 dk önce' },
                            { name: 'Mavi Enerji', type: 'Yeni Hizmet: VRF Servis', time: '45 dk önce' },
                            { name: 'Usta Eller', type: 'Profil Resmi Onayı', time: '2 saat önce' },
                        ].map((item, i) => (
                            <div key={i} className="py-3 flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-400 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{item.name.charAt(0)}</div>
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => onTabChange?.('approvals')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors">
                                        <ArrowRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onTabChange?.('approvals')} className="w-full mt-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                        <CheckSquare size={14}/> Tüm Kuyruğu Yönet
                    </button>
                </WidgetCard>

                <WidgetCard className="lg:col-span-1" title="Sektörel Talep Dağılımı">
                    <div className="space-y-4 mt-2">
                        {sectorStats.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <div className="flex items-center gap-2"><div className={`p-1.5 rounded-lg bg-slate-50 text-slate-600`}><item.icon size={14} /></div><span className="text-sm font-bold text-slate-700">{item.name}</span></div>
                                    <span className="text-xs font-black text-slate-900">%{item.value}</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.value}%` }}></div></div>
                            </div>
                        ))}
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default DashboardOverview;
