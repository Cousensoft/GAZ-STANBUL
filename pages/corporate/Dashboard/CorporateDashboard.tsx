
import React from 'react';
import { useCorporate } from '../../../context/CorporateContext';
import { 
    Briefcase, 
    FileText, 
    CheckCircle, 
    TrendingUp, 
    TurkishLira, 
    ArrowRight,
    Users
} from 'lucide-react';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';
import { BarChart, GaugeChart } from '../../../components/admin/Charts';

interface CorporateDashboardProps {
    onNavigateToRequests?: (filter: string) => void;
}

const CorporateDashboard: React.FC<CorporateDashboardProps> = ({ onNavigateToRequests }) => {
    const { requests, offers, projects, finance } = useCorporate();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat 
                    label="Aktif İşler" 
                    value={projects.filter(p => p.status === 'active').length} 
                    subtext="Devam eden projeler" 
                    colorName="blue" 
                    hexColor="#3b82f6" 
                    icon={Briefcase} 
                    type="circle" 
                    percentage={65} 
                />
                <PerformanceStat 
                    label="Teknik Ekip" 
                    value="12" 
                    subtext="Aktif personel" 
                    colorName="purple" 
                    hexColor="#a855f7" 
                    icon={Users} 
                    type="icon"
                />
                <PerformanceStat 
                    label="Kazanılan Teklif" 
                    value={offers.filter(o => o.status === 'accepted').length} 
                    subtext="Bu ay onaylanan" 
                    colorName="green" 
                    hexColor="#22c55e" 
                    icon={CheckCircle} 
                    type="circle" 
                    percentage={45} 
                />
                <PerformanceStat 
                    label="Aylık Ciro" 
                    value={`${(finance.thisMonthEarnings / 1000).toFixed(1)}K ₺`} 
                    subtext="Geçen aya göre +%12" 
                    colorName="emerald" 
                    hexColor="#10b981" 
                    icon={TurkishLira} 
                    type="icon" 
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WidgetCard className="lg:col-span-2" title="Gelir Performansı">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">{finance.totalEarnings.toLocaleString('tr-TR')} ₺</span>
                            <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Yıllık Toplam Kazanç</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-bold border border-green-100">
                            <TrendingUp size={14}/> +%24 Büyüme
                        </div>
                    </div>
                    <div className="h-48">
                        <BarChart data={[
                            { label: 'Oca', value: 40000 }, { label: 'Şub', value: 35000 }, { label: 'Mar', value: 55000 },
                            { label: 'Nis', value: 60000 }, { label: 'May', value: 45000 }, { label: 'Haz', value: 70000 },
                            { label: 'Tem', value: 85000 }, { label: 'Ağu', value: 90000 }, { label: 'Eyl', value: 75000 },
                            { label: 'Eki', value: 85000 }
                        ]} height={192} color="bg-slate-900" showYAxis={true} unit="₺" />
                    </div>
                </WidgetCard>

                <WidgetCard title="Teklif Dönüşüm Oranı">
                    <div className="flex flex-col items-center justify-center py-4">
                        <GaugeChart percentage={68} />
                        <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-widest mt-6 px-4">
                            Sektör ortalamasının %15 üzerindesiniz.
                        </p>
                    </div>
                </WidgetCard>
            </div>

            {/* Recent Activities Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WidgetCard title="Son Gelen Talepler">
                    <div className="space-y-4">
                        {requests.slice(0, 3).map((req) => (
                            <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-blue-600 transition-colors">
                                        {req.customerAvatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{req.serviceType}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{req.customerName} • {req.date}</p>
                                    </div>
                                </div>
                                <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${
                                    req.urgency === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {req.urgency === 'urgent' ? 'Acil' : 'Normal'}
                                </span>
                            </div>
                        ))}
                        <button 
                            onClick={() => onNavigateToRequests?.('new')}
                            className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 mt-2 flex items-center justify-center gap-1 transition-colors"
                        >
                            Tüm Talepleri Gör <ArrowRight size={12}/>
                        </button>
                    </div>
                </WidgetCard>

                <WidgetCard title="Aktif Projeler">
                    <div className="space-y-4">
                        {projects.length > 0 ? projects.map((proj) => (
                            <div key={proj.id} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                                    <span className="text-[10px] font-bold text-slate-400">{proj.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${proj.progress}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-blue-600">{proj.progress}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {proj.team.map((member, i) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] font-bold">
                                                {member.charAt(0)}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-slate-400">+ Ekip</span>
                                </div>
                            </div>
                        )) : (
                            <div className="py-8 text-center text-slate-400 flex flex-col items-center">
                                <Briefcase size={32} className="opacity-10 mb-2"/>
                                <p className="text-xs font-bold uppercase tracking-widest">Aktif proje bulunmuyor.</p>
                            </div>
                        )}
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default CorporateDashboard;
