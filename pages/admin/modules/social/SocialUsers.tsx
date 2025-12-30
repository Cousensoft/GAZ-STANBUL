import React, { useState } from 'react';
import { 
    Search, 
    UserCheck, 
    Shield, 
    AlertTriangle, 
    ArrowLeft, 
    Mail, 
    Phone, 
    Calendar, 
    Clock, 
    MessageSquare, 
    ShieldAlert, 
    Lock, 
    UserMinus, 
    CheckCircle, 
    Eye,
    BellRing,
    ShieldOff,
    History,
    Activity,
    UserCircle
} from 'lucide-react';

interface SocialUser {
    id: number;
    name: string;
    username: string;
    type: 'Kurumsal' | 'Standart';
    followers: string;
    following: string;
    posts: number;
    status: 'active' | 'restricted' | 'banned';
    trustScore: number;
    email: string;
    phone: string;
    joinDate: string;
    lastActive: string;
    warningCount: number;
}

const SocialUsers = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [activeDetailTab, setActiveDetailTab] = useState<'info' | 'activity' | 'moderation'>('info');
    const [filterType, setFilterType] = useState<'all' | 'Kurumsal' | 'Standart'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [users, setUsers] = useState<SocialUser[]>([
        { id: 1, name: 'Selin Yılmaz', username: '@selin_ylmz', type: 'Standart', followers: '12.5K', following: '850', posts: 142, status: 'active', trustScore: 98, email: 'selin@selinyilmaz.com', phone: '0532 000 00 01', joinDate: '12.05.2023', lastActive: '10 dk önce', warningCount: 0 },
        { id: 2, name: 'Ahmet Demir', username: '@ahmetusta', type: 'Standart', followers: '450', following: '120', posts: 12, status: 'active', trustScore: 85, email: 'ahmet@demirtesisat.com', phone: '0533 000 00 02', joinDate: '15.01.2024', lastActive: '2 saat önce', warningCount: 1 },
        { id: 3, name: 'Spam Bot 2024', username: '@free_money', type: 'Standart', followers: '0', following: '5.2K', posts: 50, status: 'restricted', trustScore: 10, email: 'bot@spam.com', phone: 'Bilinmiyor', joinDate: '24.10.2024', lastActive: 'Şimdi', warningCount: 5 },
        { id: 4, name: 'Gazistanbul Resmi', username: '@gazistanbul', type: 'Kurumsal', followers: '50.2K', following: '24', posts: 520, status: 'active', trustScore: 100, email: 'social@gazistanbul.com', phone: '0850 000 00 00', joinDate: '01.01.2023', lastActive: 'Online', warningCount: 0 },
    ]);

    const handleAction = (id: number, newStatus: SocialUser['status'], message: string) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
        alert(message);
    };

    const handleWarn = (id: number) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, warningCount: u.warningCount + 1 } : u));
        alert("Kullanıcıya resmi topluluk uyarısı gönderildi.");
    };

    const getSelectedUser = () => users.find(u => u.id === selectedUserId);

    // Filtreleme Mantığı
    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             u.username.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || u.type === filterType;
        return matchesSearch && matchesType;
    });

    const handleDelete = () => {
        if(confirm("Kullanıcıyı tamamen silmek üzeresiniz. Bu işlem geri alınamaz. Onaylıyor musunuz?")) {
            alert("İşlem başarıyla tamamlandı.");
        }
    };

    // --- DETAY GÖRÜNÜMÜ ---
    if (selectedUserId) {
        const user = getSelectedUser();
        if (!user) return null;

        return (
            <div className="animate-fade-in space-y-6">
                {/* Detay Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedUserId(null)} className="p-2 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-2xl border border-indigo-100">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                {user.name}
                                {user.status === 'active' && <UserCheck size={20} className="text-green-500" />}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                <span className="font-medium">{user.username}</span>
                                <span>•</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                    user.status === 'active' ? 'bg-green-50 text-green-600' : 
                                    user.status === 'restricted' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                }`}>
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleWarn(user.id)}
                            className="px-4 py-2 border border-amber-200 text-amber-700 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors flex items-center gap-2"
                        >
                            <BellRing size={16} /> Uyar
                        </button>
                        {user.status === 'active' ? (
                            <button 
                                onClick={() => handleAction(user.id, 'restricted', 'Hesap kısıtlandı.')}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <ShieldOff size={16} /> Erişimi Kısıtla
                            </button>
                        ) : (
                            <button 
                                onClick={() => handleAction(user.id, 'active', 'Kısıtlama kaldırıldı.')}
                                className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <Shield size={16} /> Kısıtlamayı Kaldır
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200">
                    {[
                        { id: 'info', label: 'Profil Bilgileri', icon: UserCircle },
                        { id: 'activity', label: 'Aktivite Kayıtları', icon: Activity },
                        { id: 'moderation', label: 'Moderasyon & Güvenlik', icon: ShieldAlert }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveDetailTab(tab.id as any)}
                            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                                activeDetailTab === tab.id 
                                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
                                : 'border-transparent text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {activeDetailTab === 'info' && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-fade-in">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">İletişim ve Kimlik</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={18}/></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">E-Posta</p><p className="text-sm font-bold text-slate-900">{user.email}</p></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={18}/></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Telefon</p><p className="text-sm font-bold text-slate-900">{user.phone}</p></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Calendar size={18}/></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Kayıt Tarihi</p><p className="text-sm font-bold text-slate-900">{user.joinDate}</p></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Clock size={18}/></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Son Görülme</p><p className="text-sm font-bold text-slate-900">{user.lastActive}</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Etkileşim Özeti</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-black text-slate-900">{user.posts}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Gönderi</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-black text-slate-900">{user.followers}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Takipçi</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-black text-slate-900">{user.following}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Takip</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeDetailTab === 'activity' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in overflow-hidden">
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-900">Son Hareketler</h3>
                                    <button className="text-xs text-indigo-600 font-bold hover:underline">Tümünü İndir</button>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><MessageSquare size={18}/></div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">Yeni bir gönderi paylaştı</p>
                                                    <p className="text-xs text-slate-500">24 Ekim 2024, 14:2{i}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-300 hover:text-slate-600"><Eye size={16}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeDetailTab === 'moderation' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <History size={18} className="text-slate-400"/> Moderasyon Geçmişi
                                    </h3>
                                    <div className="space-y-4">
                                        {user.warningCount > 0 ? (
                                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                                                <AlertTriangle size={20} className="text-amber-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-bold text-amber-900">Aktif Uyarı Mevcut</p>
                                                    <p className="text-xs text-amber-700 mt-1">Bu kullanıcı toplam {user.warningCount} kez topluluk kurallarını ihlal ettiği gerekçesiyle uyarılmıştır.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-center gap-3">
                                                <CheckCircle size={20} className="text-green-600" />
                                                <p className="text-sm font-bold text-green-900">Aktif İhlal veya Kısıtlama Kaydı Bulunmamaktadır</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                    <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                                        <Lock size={18}/> Kritik Aksiyonlar
                                    </h3>
                                    <p className="text-sm text-red-700 mb-6 font-medium">Bu işlemler kullanıcının platform deneyimini kalıcı olarak etkiler. Lütfen dikkatli işlem yapınız.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button 
                                            onClick={handleDelete}
                                            className="py-3 px-4 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <AlertTriangle size={16}/> Hesabı Tamamen Sil
                                        </button>
                                        <button className="py-3 px-4 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                                            <UserMinus size={16}/> Kara Listeye Al (IP Ban)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-50 pb-3">Güven Analizi</h3>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="relative w-20 h-20 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={283} strokeDashoffset={283 - (283 * user.trustScore) / 100} className={user.trustScore > 80 ? 'text-green-500' : 'text-amber-500'} strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute text-lg font-black text-slate-900">{user.trustScore}%</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Güven Skoru</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">Spam Oranı:</span>
                                    <span className="text-green-600 font-bold">%0.2</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">Raporlanma:</span>
                                    <span className="text-slate-900 font-bold">{user.warningCount} Adet</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-50 pb-3">Hesap Notları</h3>
                            <textarea 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none mb-3"
                                rows={4}
                                placeholder="Yöneticiler için dahili notlar..."
                            ></textarea>
                            <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-colors tracking-widest">Notu Güncelle</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-green-200 transition-colors">
                    <div>
                        <span className="text-3xl font-black text-slate-900">12.5K</span>
                        <span className="text-xs font-bold text-slate-500 uppercase block mt-1">Aktif Kullanıcı</span>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform"><UserCheck size={24}/></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div>
                        <span className="text-3xl font-black text-slate-900">142</span>
                        <span className="text-xs font-bold text-slate-500 uppercase block mt-1">Onaylı Hesap</span>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform"><Shield size={24}/></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-red-200 transition-colors">
                    <div>
                        <span className="text-3xl font-black text-slate-900">24</span>
                        <span className="text-xs font-bold text-slate-500 uppercase block mt-1">Engellenen</span>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform"><AlertTriangle size={24}/></div>
                </div>
            </div>

            {/* User List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-slate-900 whitespace-nowrap">Kullanıcı Yönetimi</h3>
                        {/* Hesap Tipi Filtresi */}
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Tümü</button>
                            <button onClick={() => setFilterType('Standart')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'Standart' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Bireysel</button>
                            <button onClick={() => setFilterType('Kurumsal')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'Kurumsal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Kurumsal</button>
                        </div>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Kullanıcı veya @tag ara..." 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="p-4">Kullanıcı</th>
                                <th className="p-4">Hesap Tipi</th>
                                <th className="p-4">Takipçi</th>
                                <th className="p-4">Güven Skoru</th>
                                <th className="p-4">Durum</th>
                                <th className="p-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200 group-hover:scale-105 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{user.name}</div>
                                                <div className="text-[10px] text-slate-400 font-medium">{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase border ${
                                            user.type === 'Kurumsal' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}>
                                            {user.type === 'Standart' ? 'Bireysel' : user.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-bold text-slate-700">{user.followers}</td>
                                    <td className="p-4">
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${user.trustScore > 80 ? 'bg-green-500' : user.trustScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                style={{ width: `${user.trustScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-1 block font-bold">{user.trustScore}/100</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                                            user.status === 'active' ? 'bg-green-100 text-green-700' : 
                                            user.status === 'restricted' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {user.status === 'active' ? 'Aktif' : user.status === 'restricted' ? 'Kısıtlı' : 'Yasaklı'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => setSelectedUserId(user.id)}
                                            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-2 ml-auto"
                                        >
                                            <Eye size={14} /> Detay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SocialUsers;