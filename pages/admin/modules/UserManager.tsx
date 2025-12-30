
import React, { useState } from 'react';
import { 
    Users, 
    UserPlus, 
    Eye, 
    ArrowLeft, 
    History, 
    Shield, 
    ShieldAlert, 
    Search, 
    TrendingUp, 
    Clock, 
    Zap,
    MapPin,
    Calendar,
    Award,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { PerformanceStat, WidgetCard } from '../../../components/dashboard/Widgets';
import { DonutChart, GroupedBarChart, BarChart } from '../../../components/admin/Charts';

interface UserManagerProps {
    onTabChange?: (tab: string) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'list' | 'add' | 'detail'>('overview');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
    const [searchQuery, setSearchQuery] = useState(''); 

    const [users, setUsers] = useState([
        { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', role: 'Bireysel', status: 'active', date: '10.10.2024', lastLogin: 'Bugün, 14:30', hours: 1840, score: 95 },
        { id: 2, name: 'Mehmet Demir', email: 'mehmet@mail.com', role: 'Kurumsal', status: 'active', date: '12.10.2024', lastLogin: 'Dün, 09:15', hours: 3250, score: 88 },
        { id: 3, name: 'Ayşe Kaya', email: 'ayse@mail.com', role: 'Bireysel', status: 'suspended', date: '15.10.2024', lastLogin: '3 gün önce', hours: 42, score: 45 },
        { id: 4, name: 'Caner Erkin', email: 'caner@mail.com', role: 'Bireysel', status: 'pending', date: '20.10.2024', lastLogin: '1 hafta önce', hours: 15, score: 60 },
        { id: 5, name: 'Zeynep Tekin', email: 'zeynep@mail.com', role: 'Bireysel', status: 'active', date: '21.10.2024', lastLogin: '5 saat önce', hours: 920, score: 92 },
    ]);

    const handleStatClick = (status: 'all' | 'active' | 'pending' | 'suspended') => {
        setFilterStatus(status);
        setActiveTab('list');
    };

    const filteredUsers = users.filter(u => {
        const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
        const searchLower = searchQuery.toLowerCase();
        return matchesStatus && (u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower));
    });

    const renderOverview = () => {
        const growthData = [
            { label: 'Pzt', current: 35, previous: 12 }, { label: 'Sal', current: 42, previous: 15 }, 
            { label: 'Çar', current: 38, previous: 18 }, { label: 'Per', current: 55, previous: 22 }, 
            { label: 'Cum', current: 48, previous: 20 }, { label: 'Cmt', current: 65, previous: 10 }, 
            { label: 'Paz', current: 50, previous: 8 }
        ];

        return (
            <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div onClick={() => handleStatClick('all')} className="cursor-pointer transition-transform hover:scale-[1.02]">
                        <PerformanceStat label="Toplam Kullanıcı" value="12,450" subtext="+%12 Artış" colorName="blue" hexColor="#3b82f6" icon={Users} type="circle" percentage={75} />
                    </div>
                    <div onClick={() => handleStatClick('active')} className="cursor-pointer transition-transform hover:scale-[1.02]">
                        <PerformanceStat label="Onaylı Üye" value="8,120" subtext="Doğrulanmış" colorName="green" hexColor="#22c55e" icon={Shield} type="circle" percentage={68} />
                    </div>
                    <div onClick={() => handleStatClick('pending')} className="cursor-pointer transition-transform hover:scale-[1.02]">
                        <PerformanceStat label="Bekleyen Onay" value="342" subtext="İnceleme Gereken" colorName="indigo" hexColor="#6366f1" icon={History} type="icon" />
                    </div>
                    <div onClick={() => handleStatClick('suspended')} className="cursor-pointer transition-transform hover:scale-[1.02]">
                        <PerformanceStat label="Riskli Hesap" value="45" subtext="Engellenmiş" colorName="red" hexColor="#ef4444" icon={ShieldAlert} type="icon" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-10">
                            <div><h3 className="font-bold text-slate-900 text-base">Kayıt Büyüme Dağılımı</h3><p className="text-xs text-slate-500">Bireysel vs Kurumsal günlük kayıtlar</p></div>
                            <div className="flex items-center gap-4"><div className="text-right"><span className="block text-xl font-black text-slate-900 leading-none">+438</span><span className="text-[10px] font-bold text-green-600">Bu Hafta</span></div></div>
                        </div>
                        <div className="h-48 w-full relative"><GroupedBarChart data={growthData} height={40} mainColor="bg-blue-600" secColor="bg-purple-500" /></div>
                    </div>

                    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-900 text-base">Kullanıcı Dağılımı</h3></div>
                        <div className="flex items-center justify-center py-6"><DonutChart size="w-32 h-32" /></div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Bireysel</span><span className="font-bold">60%</span></div>
                            <div className="flex justify-between text-xs"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Kurumsal</span><span className="font-bold">35%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderList = () => (
        <div className="space-y-6 animate-fade-in">
            {/* User List Header with Red Back Button */}
            <div className="flex items-center gap-4 mb-2">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                >
                    <ArrowLeft size={18} /> Listeye Dön
                </button>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Kullanıcı Listesi</h2>
                    <p className="text-xs text-slate-500">Tüm platform üyelerini listeleyin, rollerini ve durumlarını yönetin.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['all', 'active', 'pending', 'suspended'].map(status => (
                        <button key={status} onClick={() => setFilterStatus(status as any)} className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${filterStatus === status ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                            {status === 'all' ? 'Tümü' : status === 'active' ? 'Aktif' : status === 'pending' ? 'Bekliyor' : 'Engelli'}
                        </button>
                    ))}
                </div>
                <div className="relative md:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="Kullanıcı ara..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/></div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr><th className="p-4 text-xs font-bold text-slate-500 uppercase">Kullanıcı</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Rol</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Platform Süresi</th><th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th><th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlemler</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/50 group">
                                <td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200">{u.name.charAt(0)}</div><div><div className="font-bold text-slate-900 text-sm">{u.name}</div><div className="text-[10px] text-slate-500">{u.email}</div></div></div></td>
                                <td className="p-4 text-xs font-medium text-slate-600">{u.role}</td>
                                <td className="p-4 text-sm font-bold text-slate-900">{u.hours.toLocaleString('tr-TR')} Saat</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{u.status === 'active' ? 'Aktif' : 'Engelli'}</span></td>
                                <td className="p-4 text-right"><button className="bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ml-1 text-xs font-bold whitespace-nowrap"><Eye size={14} /> Detay</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Kullanıcı Yönetimi</h2>
                    <p className="text-sm text-slate-500">Platform kullanıcıları, rolleri ve erişim yönetimi.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Genel Bakış</button>
                    <button onClick={() => setActiveTab('list')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Kullanıcı Listesi</button>
                </div>
            </div>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'list' && renderList()}
        </div>
    );
};

export default UserManager;
