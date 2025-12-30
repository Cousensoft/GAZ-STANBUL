
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, 
    Copy, 
    RefreshCw, 
    CheckCircle, 
    XCircle, 
    UserPlus, 
    Clock, 
    MoreHorizontal, 
    ShieldAlert, 
    Link as LinkIcon, 
    ExternalLink, 
    MonitorPlay, 
    Briefcase, 
    Wrench,
    BarChart2,
    ArrowLeft,
    Star,
    TrendingUp,
    Calendar,
    MapPin
} from 'lucide-react';
import { WidgetCard, PerformanceStat } from '../../../components/dashboard/Widgets';
import { BarChart } from '../../../components/admin/Charts';
import { Employee } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

const EmployeeManager = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState('GZ-9284-AB');
    
    // Raporlama için seçilen personel state'i
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    
    // Görüntülenecek Link (Kopyalama için)
    const displayUrl = `gazistanbul.com/login/technician`;
    
    // Uygulama içi yönlendirme parametresi
    const corpName = user?.name || 'Firma';

    const [pendingEmployees, setPendingEmployees] = useState<Employee[]>([
        { id: 'EMP-001', name: 'Ali Veli', email: 'ali@gmail.com', status: 'pending', joinDate: 'Bugün', completedJobs: 0, rating: 0, avatar: 'AV', role: 'worker' },
        { id: 'EMP-002', name: 'Canan Dağ', email: 'canan.d@hotmail.com', status: 'pending', joinDate: 'Dün', completedJobs: 0, rating: 0, avatar: 'CD', role: 'worker' },
    ]);
    const [activeEmployees, setActiveEmployees] = useState<Employee[]>([
        { id: 'EMP-101', name: 'Mehmet Usta', email: 'mehmet@firma.com', status: 'active', joinDate: '12.01.2023', completedJobs: 142, rating: 4.8, avatar: 'MU', role: 'worker' },
        { id: 'EMP-102', name: 'Ayşe Tekin', email: 'ayse@firma.com', status: 'active', joinDate: '05.03.2023', completedJobs: 89, rating: 4.9, avatar: 'AT', role: 'manager' },
        { id: 'EMP-103', name: 'Burak Yılmaz', email: 'burak@firma.com', status: 'suspended', joinDate: '20.10.2023', completedJobs: 12, rating: 3.5, avatar: 'BY', role: 'worker' },
    ]);

    // Mock Performans Verileri (Rapor Ekranı İçin)
    const mockPerformanceData = {
        monthlyJobs: [
            { label: 'May', value: 12 }, { label: 'Haz', value: 18 }, 
            { label: 'Tem', value: 15 }, { label: 'Ağu', value: 24 }, 
            { label: 'Eyl', value: 20 }, { label: 'Eki', value: 28 }
        ],
        recentJobs: [
            { id: 101, service: 'Kombi Bakımı', customer: 'Selin Y.', date: '24.10.2024', rating: 5, comment: 'Çok temiz çalıştı, teşekkürler.' },
            { id: 102, service: 'Petek Temizliği', customer: 'Ahmet K.', date: '22.10.2024', rating: 4, comment: 'Biraz geç geldi ama işçilik iyi.' },
            { id: 103, service: 'Gaz Kaçağı Tespiti', customer: 'Mehmet Ö.', date: '20.10.2024', rating: 5, comment: 'Hızlıca sorunu çözdü.' },
            { id: 104, service: 'Termostat Montajı', customer: 'Caner E.', date: '18.10.2024', rating: 5, comment: 'Profesyonel hizmet.' },
        ],
        ratingDistribution: [
            { star: 5, count: 85 },
            { star: 4, count: 12 },
            { star: 3, count: 3 },
            { star: 2, count: 1 },
            { star: 1, count: 0 },
        ]
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(inviteCode);
        alert('Davet kodu kopyalandı: ' + inviteCode);
    };

    const handleCopyLink = () => {
        const fullUrl = `${window.location.origin}/#/login/technician?corp=${encodeURIComponent(corpName)}`;
        navigator.clipboard.writeText(fullUrl);
        alert('Giriş sayfası bağlantısı kopyalandı.');
    };

    const handleOpenPage = () => {
        navigate('/login/technician', { state: { corp: corpName } });
    };

    const handleRotateCode = () => {
        const newCode = 'GZ-' + Math.floor(1000 + Math.random() * 9000) + '-' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        setInviteCode(newCode);
    };

    const handleApprove = (id: string) => {
        const employee = pendingEmployees.find(e => e.id === id);
        if (employee) {
            setPendingEmployees(prev => prev.filter(e => e.id !== id));
            setActiveEmployees(prev => [...prev, { ...employee, status: 'active' }]);
        }
    };

    const handleReject = (id: string) => {
        if (confirm('Başvuruyu reddetmek istediğinize emin misiniz?')) {
            setPendingEmployees(prev => prev.filter(e => e.id !== id));
        }
    };

    const toggleStatus = (id: string) => {
        setActiveEmployees(prev => prev.map(emp => {
            if (emp.id === id) {
                return { ...emp, status: emp.status === 'active' ? 'suspended' : 'active' };
            }
            return emp;
        }));
    };

    const toggleRole = (id: string) => {
        setActiveEmployees(prev => prev.map(emp => {
            if (emp.id === id) {
                const newRole = emp.role === 'manager' ? 'worker' : 'manager';
                return { ...emp, role: newRole };
            }
            return emp;
        }));
    };

    // --- PERSONEL DETAY / RAPOR EKRANI ---
    if (selectedEmployee) {
        return (
            <div className="animate-fade-in space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedEmployee(null)} className="p-2 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-2xl border border-indigo-100">
                            {selectedEmployee.avatar}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                {selectedEmployee.name}
                                {selectedEmployee.role === 'manager' && <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded uppercase font-black">Yönetici</span>}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                <span className="flex items-center gap-1"><Briefcase size={14}/> {selectedEmployee.role === 'manager' ? 'Saha Yöneticisi' : 'Teknik Uzman'}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={14}/> {selectedEmployee.joinDate}'den beri üye</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Profili Düzenle</button>
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors">Mesaj Gönder</button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PerformanceStat 
                        label="Toplam İş" 
                        value={selectedEmployee.completedJobs} 
                        subtext="Tamamlanan servis" 
                        colorName="blue" 
                        hexColor="#3b82f6" 
                        icon={Briefcase} 
                        type="circle" 
                        percentage={75} 
                    />
                    <PerformanceStat 
                        label="Memnuniyet" 
                        value={selectedEmployee.rating} 
                        subtext="Ortalama puan (5 üzerinden)" 
                        colorName="amber" 
                        hexColor="#f59e0b" 
                        icon={Star} 
                        type="icon"
                    />
                    <PerformanceStat 
                        label="Zamanında Tamamlama" 
                        value="%92" 
                        subtext="Randevu sadakati" 
                        colorName="green" 
                        hexColor="#22c55e" 
                        icon={CheckCircle} 
                        type="circle" 
                        percentage={92} 
                    />
                    <PerformanceStat 
                        label="Aylık Kazanç Katkısı" 
                        value="42.5K ₺" 
                        subtext="Son 30 gün" 
                        colorName="emerald" 
                        hexColor="#10b981" 
                        icon={TrendingUp} 
                        type="icon" 
                    />
                </div>

                {/* Charts & Feedback Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Monthly Performance Chart */}
                    <WidgetCard className="lg:col-span-2" title="İş Performansı (Son 6 Ay)">
                        <div className="h-64 mt-4">
                            <BarChart data={mockPerformanceData.monthlyJobs} height={256} color="bg-indigo-500" />
                        </div>
                    </WidgetCard>

                    {/* Rating Breakdown */}
                    <WidgetCard title="Puan Dağılımı">
                        <div className="space-y-4 mt-2">
                            {mockPerformanceData.ratingDistribution.map((item) => (
                                <div key={item.star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12 shrink-0 text-xs font-bold text-slate-500">
                                        {item.star} <Star size={10} className="text-amber-400 fill-amber-400" />
                                    </div>
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-amber-400 rounded-full" 
                                            style={{ width: `${(item.count / 100) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-8 text-right text-xs font-bold text-slate-700">{item.count}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                            <p className="text-xs text-slate-400">Toplam <b>{selectedEmployee.completedJobs}</b> değerlendirme üzerinden hesaplanmıştır.</p>
                        </div>
                    </WidgetCard>
                </div>

                {/* Recent Jobs Table */}
                <WidgetCard title="Son Tamamlanan İşler">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 pl-6">Hizmet Tipi</th>
                                    <th className="p-4">Müşteri</th>
                                    <th className="p-4">Tarih</th>
                                    <th className="p-4">Puan</th>
                                    <th className="p-4">Müşteri Yorumu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {mockPerformanceData.recentJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6 font-bold text-slate-900 text-sm">{job.service}</td>
                                        <td className="p-4 text-sm text-slate-600">{job.customer}</td>
                                        <td className="p-4 text-xs font-medium text-slate-500"><span className="flex items-center gap-1"><Calendar size={12}/> {job.date}</span></td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-0.5 text-amber-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < job.rating ? "currentColor" : "none"} className={i >= job.rating ? "text-slate-200" : ""} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs text-slate-500 italic">"{job.comment}"</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            </div>
        );
    }

    // --- LİSTE GÖRÜNÜMÜ (Varsayılan) ---
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Access Methods Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Method 1: Invite Code */}
                <div className="bg-slate-900 text-white p-6 rounded-[24px] shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
                    <div className="relative z-10 mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <UserPlus size={24} className="text-blue-400" /> Ekip Davet Kodu
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Teknik elemanlarınız mobil uygulamadan kayıt olurken bu kodu girerek ekibinize katılabilirler.
                        </p>
                    </div>
                    
                    <div className="relative z-10 bg-white/10 p-3 rounded-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
                        <div className="px-4 font-mono text-2xl font-black tracking-widest text-white">
                            {inviteCode}
                        </div>
                        <div className="flex gap-1">
                            <button onClick={handleCopyCode} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Kodu Kopyala">
                                <Copy size={18} />
                            </button>
                            <button onClick={handleRotateCode} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Yeni Kod Üret">
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                {/* Method 2: Dedicated Login Page Link */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-[24px] shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
                    <div className="relative z-10 mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <LinkIcon size={24} className="text-indigo-200" /> Personel Giriş Sayfası
                        </h2>
                        <p className="text-indigo-100 text-sm">
                            Firmanıza özel oluşturulan bu giriş sayfasını ekibinizle paylaşın. Doğrudan kurumsal kimliğinizle giriş yapabilirler.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-3">
                        <div className="bg-black/20 p-3 rounded-xl border border-white/10 flex items-center gap-3">
                            <MonitorPlay size={16} className="text-indigo-300 shrink-0"/>
                            <span className="text-xs text-indigo-100 truncate font-mono">{displayUrl}</span>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleCopyLink}
                                className="flex-1 py-3 bg-white text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <Copy size={16}/> Linki Kopyala
                            </button>
                            <button 
                                onClick={handleOpenPage} 
                                className="flex-1 py-3 bg-indigo-500/50 border border-indigo-400/30 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <ExternalLink size={16}/> Sayfayı Aç
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Pending Approvals */}
            {pendingEmployees.length > 0 && (
                <WidgetCard title="Onay Bekleyen Başvurular" action={<span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">{pendingEmployees.length} Bekleyen</span>}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-slate-50">
                                {pendingEmployees.map(emp => (
                                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm">
                                                    {emp.avatar}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                                                    <p className="text-xs text-slate-500">{emp.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-xs font-medium text-slate-500">
                                            <span className="flex items-center gap-1"><Clock size={12}/> {emp.joinDate}</span>
                                        </td>
                                        <td className="py-4 text-right pr-2">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleReject(emp.id)} className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-all">Reddet</button>
                                                <button onClick={() => handleApprove(emp.id)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-all shadow-lg">Onayla</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </WidgetCard>
            )}

            {/* Active Employees */}
            <WidgetCard title="Aktif Teknik Ekip">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="p-4 pl-6">Personel</th>
                                <th className="p-4">Rol / Yetki</th>
                                <th className="p-4">Durum</th>
                                <th className="p-4">Katılım</th>
                                <th className="p-4">İş/Puan</th>
                                <th className="p-4 text-right pr-6">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {activeEmployees.map(emp => (
                                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${emp.status === 'active' ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-400 grayscale'}`}>
                                                {emp.avatar}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-sm ${emp.status === 'active' ? 'text-slate-900' : 'text-slate-400'}`}>{emp.name}</h4>
                                                <p className="text-xs text-slate-500">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => toggleRole(emp.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${
                                                emp.role === 'manager' 
                                                ? 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200' 
                                                : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'
                                            }`}
                                            title="Rolü Değiştirmek İçin Tıkla"
                                        >
                                            {emp.role === 'manager' ? <Briefcase size={12} /> : <Wrench size={12} />}
                                            {emp.role === 'manager' ? 'Yönetici' : 'Usta'}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                            emp.status === 'active' 
                                            ? 'bg-green-50 text-green-700 border-green-200' 
                                            : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                            {emp.status === 'active' ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs font-bold text-slate-500">{emp.joinDate}</td>
                                    <td className="p-4">
                                        <div className="text-xs">
                                            <span className="font-bold text-slate-900">{emp.completedJobs} İş</span>
                                            <span className="text-slate-300 mx-1">|</span>
                                            <span className="font-bold text-amber-500">★ {emp.rating}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => setSelectedEmployee(emp)}
                                                className="px-3 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-blue-600 transition-all flex items-center gap-1 shadow-sm"
                                            >
                                                <BarChart2 size={12} /> Rapor
                                            </button>
                                            <button 
                                                onClick={() => toggleStatus(emp.id)}
                                                className={`p-2 rounded-lg border transition-all ${
                                                    emp.status === 'active' 
                                                    ? 'border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50' 
                                                    : 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100'
                                                }`}
                                                title={emp.status === 'active' ? 'Pasife Al' : 'Aktifleştir'}
                                            >
                                                {emp.status === 'active' ? <ShieldAlert size={16}/> : <CheckCircle size={16}/>}
                                            </button>
                                            <button className="p-2 border border-slate-200 text-slate-400 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-all">
                                                <MoreHorizontal size={16}/>
                                            </button>
                                        </div>
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

export default EmployeeManager;
