
import React from 'react';
import { Building2, Activity, CheckSquare, Layers, Check, X, Info, TrendingUp, Lock, Globe, Briefcase, MousePointerClick } from 'lucide-react';

const CompanyInfo = ({ company, details }: { company: any, details: any }) => {
    // Mock İstatistik Verileri
    const requestStats = {
        total: 342,
        private: 120, // Doğrudan firmaya gelen
        public: 222   // Havuzdan alınan
    };
    
    // Oran Hesaplama
    const privateRatio = Math.round((requestStats.private / requestStats.total) * 100);
    const publicRatio = 100 - privateRatio;

    return (
        <div className="animate-fade-in space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Haftalık Giriş</span>
                        <div className="text-2xl font-black text-slate-900 mt-1">24</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400"><MousePointerClick size={20}/></div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ciro Hedefi</span>
                        <div className="text-2xl font-black text-blue-600 mt-1">%92</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-500"><Activity size={20}/></div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">İş Tamamlama</span>
                        <div className="text-2xl font-black text-green-600 mt-1">850</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm text-green-500"><CheckSquare size={20}/></div>
                </div>
            </div>

            {/* MODERN TALEP & MARKA ANALİZİ (YENİ TASARIM) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                
                <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                            <TrendingUp size={20} className="text-purple-600"/> Talep Kaynak Analizi
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Firmanın platform üzerindeki marka gücü ve talep çekme performansı.</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-3xl font-black text-slate-900">{requestStats.total}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toplam Talep</span>
                    </div>
                </div>

                {/* Progress Bar Visual */}
                <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
                    <div 
                        className="h-full bg-purple-600 flex items-center justify-center relative group/bar" 
                        style={{ width: `${privateRatio}%` }}
                    >
                        {privateRatio > 10 && <span className="text-[9px] font-bold text-white/90 drop-shadow-md">Özel %{privateRatio}</span>}
                    </div>
                    <div 
                        className="h-full bg-slate-300 flex items-center justify-center relative group/bar" 
                        style={{ width: `${publicRatio}%` }}
                    >
                        {publicRatio > 10 && <span className="text-[9px] font-bold text-slate-600">Havuz %{publicRatio}</span>}
                    </div>
                </div>

                {/* Legend & Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl border border-purple-100 bg-purple-50/50 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><Lock size={16}/></div>
                        <div>
                            <span className="block text-xs font-bold text-purple-900">Özel Talepler</span>
                            <span className="text-[10px] text-purple-700 opacity-80">Doğrudan Marka Araması</span>
                        </div>
                        <span className="ml-auto text-lg font-black text-purple-700">{requestStats.private}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-slate-200 text-slate-700 rounded-lg"><Globe size={16}/></div>
                        <div>
                            <span className="block text-xs font-bold text-slate-700">Genel Havuz</span>
                            <span className="text-[10px] text-slate-500">Platform Üzerinden</span>
                        </div>
                        <span className="ml-auto text-lg font-black text-slate-700">{requestStats.public}</span>
                    </div>
                </div>
            </div>

            {/* Approval Queue */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Layers size={18} className="text-amber-500"/> Onay Bekleyenler
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">Yeni Hizmet: "Vrf Klima Montajı"</h4>
                                <p className="text-[10px] text-slate-500">Sertifika kontrolü gerekiyor.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1.5 bg-white text-green-600 rounded-lg shadow-sm border border-slate-100 hover:bg-green-50"><Check size={14}/></button>
                            <button className="p-1.5 bg-white text-red-600 rounded-lg shadow-sm border border-slate-100 hover:bg-red-50"><X size={14}/></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Basic Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Building2 size={18}/> Kurumsal Kimlik
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Durum</span>
                        <span className={`font-bold ${company.status === 'verified' ? 'text-green-600' : 'text-red-600'}`}>
                            {company.status === 'verified' ? 'Doğrulanmış' : 'Askıda'}
                        </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Yetkili</span>
                        <span className="font-bold text-slate-900">{details.manager.name}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Üyelik Süresi</span>
                        <span className="font-bold text-slate-900">524 Gün</span>
                    </div>
                     <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Lokasyon</span>
                        <span className="font-bold text-slate-900">İstanbul / Kadıköy</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CompanyInfo;
