
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Settings, FileText, CheckCircle, Briefcase, MoreHorizontal, ChevronRight, Bell, Navigation, Star, PlusCircle, Activity, Wallet, TrendingUp, Clock, Zap, Award, Trophy } from 'lucide-react';
import { WidgetCard, CircularProgress } from '../../../components/dashboard/Widgets';
import { MOCK_COMPANIES } from '../../../utils/constants';

const IndividualOverview = ({ user, addresses, onChangeTab }: { user: any, addresses: any[], onChangeTab: (tab: string) => void }) => {
    const navigate = useNavigate();
    const hasAddress = addresses && addresses.length > 0;
    const nearbyCompanies = hasAddress ? MOCK_COMPANIES.slice(0, 3) : [];
    const calendarDays = [
        { day: 'Pzt', date: 12, active: false },
        { day: 'Sal', date: 13, active: true },
        { day: 'Çar', date: 14, active: false },
        { day: 'Per', date: 15, active: false },
        { day: 'Cum', date: 16, active: false },
        { day: 'Cmt', date: 17, active: false },
        { day: 'Paz', date: 18, active: false },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden h-full flex flex-col justify-center min-h-[220px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-10 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 pointer-events-none"></div>
                        <div className="relative z-10 max-w-lg">
                            <div className="flex items-center gap-2 mb-2 bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                <Calendar size={14} /> <span>{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">İyi Günler, {user?.name.split(' ')[0]}! 👋</h1>
                            <p className="text-blue-100 text-sm md:text-base font-medium mb-6">Yaklaşan randevularınızı kontrol etmeyi ve yeni fırsatları incelemeyi unutmayın.</p>
                            <button onClick={() => onChangeTab('requests')} className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">Taleplerimi Yönet</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <WidgetCard className="h-full bg-slate-900 text-white border-none relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-600 to-slate-900 opacity-50"></div>
                        <div className="relative z-10 flex flex-col items-center text-center mt-4">
                            <div className="w-20 h-20 rounded-full p-1 bg-white mb-3">
                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-full h-full rounded-full object-cover" alt="Profile" />
                            </div>
                            <h3 className="text-lg font-bold">{user.name}</h3>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Bireysel Üye</p>
                            <div className="flex items-center gap-1 text-xs text-slate-400 mb-6"><MapPin size={12} /> İstanbul, TR</div>
                            <div className="grid grid-cols-2 gap-4 w-full border-t border-slate-800 pt-6">
                                <div><span className="block text-xl font-bold text-blue-400">1</span><span className="text-[10px] text-slate-500 uppercase font-bold">Randevu</span></div>
                                <div><span className="block text-xl font-bold text-amber-400">5</span><span className="text-[10px] text-slate-500 uppercase font-bold">Favori</span></div>
                            </div>
                            <button onClick={() => onChangeTab('profile')} className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"><Settings size={16} /></button>
                        </div>
                    </WidgetCard>
                </div>
            </div>
            
            {/* Analytics & Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Stat 1: Active Processes */}
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <Zap size={24} />
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Aktif İşlemler</p>
                        <h3 className="text-3xl font-black text-slate-900">3 Adet</h3>
                        
                        <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                            <div className="h-full bg-blue-500 w-2/3"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                            <span>2 Talep</span>
                            <span>1 Randevu</span>
                        </div>
                    </div>
                </div>

                {/* Stat 2: Completed Jobs (Spending embedded as small data) */}
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                            <CheckCircle size={24} />
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Tamamlanan İş</p>
                        <h3 className="text-3xl font-black text-slate-900">12</h3>
                        
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Toplam Harcama</p>
                                <p className="text-sm font-black text-emerald-600">14.250 ₺</p>
                            </div>
                            <div className="text-right">
                                <span className="text-amber-600 font-bold flex items-center justify-end gap-0.5 text-xs"><Star size={12} fill="currentColor"/> 4.8</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-7">
                    <WidgetCard className="h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-sm font-bold text-slate-900">Randevularım</h4>
                            <button onClick={() => onChangeTab('appointments')} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">Tümü</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 group">
                                <div className="text-center min-w-[50px]"><span className="block text-xs font-bold text-slate-400">14:00</span><div className="h-8 w-0.5 bg-slate-100 mx-auto mt-1 group-last:hidden"></div></div>
                                <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center hover:border-red-200 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3"><div className="w-2 h-10 rounded-full bg-red-500"></div><div><h5 className="font-bold text-slate-900 text-sm">Kombi Bakımı</h5><p className="text-xs text-slate-500">Bosphorus Enerji</p></div></div>
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm"><ChevronRight size={14} /></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="text-center min-w-[50px]"><span className="block text-xs font-bold text-slate-400">16:30</span></div>
                                <div className="flex-1 bg-white border-2 border-dashed border-slate-200 rounded-xl p-3 flex justify-center items-center text-slate-400 text-xs font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/companies')}>
                                    <PlusCircle size={16} className="mr-2"/> Yeni Randevu Ekle
                                </div>
                            </div>
                        </div>
                    </WidgetCard>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <WidgetCard className="h-full bg-slate-900 text-white border-none">
                        <div className="flex justify-between items-center mb-6"><h4 className="text-sm font-bold">Takvimim</h4><span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">Ekim 2024</span></div>
                        <div className="flex justify-between items-center text-center mb-6">
                            {calendarDays.map((day, idx) => (
                                <div key={idx} className={`flex flex-col gap-2 p-2 rounded-xl transition-colors ${day.active ? 'bg-blue-600 shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800'}`}><span className="text-[10px] text-slate-400 uppercase">{day.day}</span><span className="text-sm font-bold">{day.date}</span></div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Bugün</p>
                            <div 
                                className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 border border-slate-700 cursor-pointer hover:border-green-500/50 transition-colors"
                                onClick={() => onChangeTab('requests')}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">Yeni Teklif Geldi</h5>
                                    <p className="text-xs text-slate-400">"Kombi Bakımı" talebinize 2 yeni teklif.</p>
                                </div>
                            </div>
                        </div>
                    </WidgetCard>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-full flex items-center justify-between"><h3 className="font-bold text-slate-900 flex items-center gap-2"><Navigation size={18} className="text-blue-600" /> Yakınınızdaki Firmalar</h3>{hasAddress ? (<button onClick={() => navigate('/companies')} className="text-xs font-bold text-slate-500 hover:text-slate-900">Tümünü Gör</button>) : (<button onClick={() => onChangeTab('addresses')} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">Adres Ekle</button>)}</div>
                {hasAddress ? nearbyCompanies.map(comp => (
                    <WidgetCard key={comp.id} className="p-4 flex items-center gap-4 hover:border-blue-200 cursor-pointer transition-all hover:shadow-md group">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0"><img src={comp.logoUrl} className="w-full h-full object-cover" alt={comp.name} /></div>
                        <div className="flex-1 min-w-0"><h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">{comp.name}</h4><p className="text-xs text-slate-500 truncate">{comp.sector}</p><div className="flex items-center gap-1 mt-1"><Star size={10} className="text-amber-400 fill-current" /><span className="text-[10px] font-bold text-slate-700">{comp.rating}</span></div></div>
                        <button onClick={() => navigate(`/company/${comp.id}`)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"><ChevronRight size={14} /></button>
                    </WidgetCard>
                )) : (
                    <div className="col-span-full bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4"><div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse"><MapPin size={24} /></div><div><h4 className="font-bold text-slate-900 text-lg">Konumunuzu Belirleyin</h4><p className="text-slate-600 text-sm">Size en yakın hizmet verenleri listelemek için lütfen adres ekleyin.</p></div></div>
                        <button onClick={() => onChangeTab('addresses')} className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-colors whitespace-nowrap">Adres Ekle</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndividualOverview;
