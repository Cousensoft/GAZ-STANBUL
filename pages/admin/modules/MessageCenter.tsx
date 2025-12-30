
import React, { useState } from 'react';
import { 
    Search, 
    Send, 
    Phone, 
    X, 
    Filter, 
    MoreVertical, 
    MessageSquare, 
    Building2, 
    User, 
    Plus, 
    Users, 
    Megaphone, 
    Clock, 
    CheckCircle, 
    Trash2, 
    Inbox,
    History,
    List,
    Check,
    Info
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

interface ScheduledMessage {
    id: number;
    target: 'all' | 'individual' | 'corporate' | 'selected';
    content: string;
    scheduledDate: string;
    status: 'pending' | 'sent';
    recipientCount: number;
}

// Mock User Data for Selection
const MOCK_USERS_DB = [
    { id: 1, name: 'Ahmet Yılmaz', type: 'individual', email: 'ahmet@mail.com', avatar: 'AY' },
    { id: 2, name: 'Bosphorus Enerji', type: 'corporate', email: 'info@bosphorus.com', avatar: 'BE' },
    { id: 3, name: 'Selin Demir', type: 'individual', email: 'selin@mail.com', avatar: 'SD' },
    { id: 4, name: 'Galata Mekanik', type: 'corporate', email: 'contact@galata.com', avatar: 'GM' },
    { id: 5, name: 'Mehmet Öz', type: 'individual', email: 'mehmet@mail.com', avatar: 'MÖ' },
    { id: 6, name: 'TechIstanbul', type: 'corporate', email: 'tech@ist.com', avatar: 'TI' },
    { id: 7, name: 'Ayşe Kaya', type: 'individual', email: 'ayse@mail.com', avatar: 'AK' },
    { id: 8, name: 'Mavi Isı Sistemleri', type: 'corporate', email: 'mavi@isi.com', avatar: 'MI' },
    { id: 9, name: 'Caner Erkin', type: 'individual', email: 'caner@mail.com', avatar: 'CE' },
];

const MessageCenter = () => {
    // --- VIEW STATE ---
    const [activeView, setActiveView] = useState<'inbox' | 'compose' | 'scheduled'>('inbox');

    // --- CHAT STATE ---
    const [selectedChat, setSelectedChat] = useState<number | null>(1);
    const activeChats = [
        { id: 1, name: 'Mehmet Yılmaz', type: 'individual', lastMsg: 'Sipariş durumunu öğrenmek istiyorum.', time: '10 dk önce', online: true, unread: 2 },
        { id: 2, name: 'Bosphorus Enerji', type: 'corporate', lastMsg: 'Belgeleri PDF olarak güncelledik.', time: '1 saat önce', online: false, unread: 0 },
        { id: 3, name: 'Ayşe Kaya', type: 'individual', lastMsg: 'Şikayetimle ilgili dönüş bekliyorum.', time: '3 saat önce', online: true, unread: 0 },
    ];

    // --- COMPOSE STATE ---
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');
    const [messageContent, setMessageContent] = useState('');
    
    // --- SELECTION STATE ---
    const [userSearch, setUserSearch] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [broadcastType, setBroadcastType] = useState<'none' | 'all' | 'individual' | 'corporate'>('none');

    // Stats for UI
    const stats = {
        all: 12540,
        individual: 10040,
        corporate: 2500
    };

    const [broadcasts, setBroadcasts] = useState<ScheduledMessage[]>([
        { id: 101, target: 'all', content: 'Sistem bakımı nedeniyle bu gece 03:00 - 05:00 arası kesinti yaşanacaktır.', scheduledDate: '2024-10-25 03:00', status: 'pending', recipientCount: 12540 },
        { id: 102, target: 'corporate', content: 'Kurumsal üyelerimiz için yeni vergi düzenlemesi rehberi yayınlandı.', scheduledDate: '2024-10-24 14:00', status: 'sent', recipientCount: 2450 },
    ]);

    // --- SELECTION LOGIC ---
    const filteredUsers = MOCK_USERS_DB.filter(u => {
        return u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    });

    const toggleUserSelection = (id: number) => {
        // Eğer kullanıcı manuel seçim yaparsa, toplu seçimi iptal et
        if (broadcastType !== 'none') {
            setBroadcastType('none');
            setSelectedUserIds([id]); // Sadece tıklananı seç
        } else {
            setSelectedUserIds(prev => 
                prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
            );
        }
    };

    const selectBroadcastGroup = (type: 'all' | 'individual' | 'corporate') => {
        if (broadcastType === type) {
            setBroadcastType('none'); // Tıklananı geri al
        } else {
            setBroadcastType(type);
            setSelectedUserIds([]); // Manuel seçimleri temizle
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isScheduled && !scheduledTime) {
            alert("Lütfen bir tarih ve saat seçiniz.");
            return;
        }

        if (broadcastType === 'none' && selectedUserIds.length === 0) {
            alert("Lütfen en az bir alıcı seçiniz.");
            return;
        }

        let recipientCount = 0;
        let targetType: ScheduledMessage['target'] = 'selected';

        if (broadcastType !== 'none') {
            recipientCount = stats[broadcastType];
            targetType = broadcastType;
        } else {
            recipientCount = selectedUserIds.length;
            targetType = 'selected';
        }

        const newBroadcast: ScheduledMessage = {
            id: Date.now(),
            target: targetType,
            content: messageContent,
            scheduledDate: isScheduled ? scheduledTime : new Date().toLocaleString('tr-TR'),
            status: isScheduled ? 'pending' : 'sent',
            recipientCount
        };

        setBroadcasts([newBroadcast, ...broadcasts]);
        alert(isScheduled ? "Mesaj başarıyla zamanlandı." : `Mesaj ${recipientCount} kişiye başarıyla gönderildi.`);
        
        // Reset form
        setMessageContent('');
        setScheduledTime('');
        setIsScheduled(false);
        setSelectedUserIds([]);
        setBroadcastType('none');
        setActiveView('scheduled'); 
    };

    const handleDeleteBroadcast = (id: number) => {
        if(confirm("Bu mesajı iptal etmek istediğinize emin misiniz?")) {
            setBroadcasts(prev => prev.filter(b => b.id !== id));
        }
    };

    return (
        <div className="animate-fade-in space-y-6 h-[calc(100vh-140px)] flex flex-col">
            
            {/* --- HEADER & NAVIGATION --- */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        {activeView === 'inbox' && <><MessageSquare size={24} className="text-blue-600"/> Mesaj Merkezi</>}
                        {activeView === 'compose' && <><Plus size={24} className="text-indigo-600"/> Yeni Mesaj Oluştur</>}
                        {activeView === 'scheduled' && <><History size={24} className="text-amber-600"/> Gönderim Geçmişi</>}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        {activeView === 'inbox' && 'Müşteri ve firma görüşmelerini yönetin.'}
                        {activeView === 'compose' && 'Kullanıcılara toplu veya özel mesaj gönderin.'}
                        {activeView === 'scheduled' && 'Zamanlanmış ve gönderilmiş mesajları takip edin.'}
                    </p>
                </div>
                
                {/* Navigation Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    <button 
                        onClick={() => setActiveView('inbox')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            activeView === 'inbox' 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <Inbox size={16} /> Gelen Kutusu
                    </button>
                    <button 
                        onClick={() => setActiveView('compose')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            activeView === 'compose' 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <Plus size={16} /> Yeni Mesaj
                    </button>
                    <button 
                        onClick={() => setActiveView('scheduled')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            activeView === 'scheduled' 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <History size={16} /> Planlananlar
                    </button>
                </div>
            </div>

            {/* --- VIEW: INBOX (Existing Chat Interface) --- */}
            {activeView === 'inbox' && (
                <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm flex-1 flex overflow-hidden animate-fade-in">
                    {/* Sidebar: Conversations */}
                    <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/30">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-900">Konuşmalar</h3>
                                <button className="text-slate-400 hover:text-slate-900"><Filter size={18}/></button>
                            </div>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Kullanıcı veya firma ara..." className="w-full bg-white border border-slate-200 rounded-xl pl-9 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-500" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                            {activeChats.map(chat => (
                                <div 
                                    key={chat.id} 
                                    onClick={() => setSelectedChat(chat.id)}
                                    className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
                                >
                                    <div className="relative">
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${chat.type === 'corporate' ? 'bg-indigo-600' : 'bg-slate-600'}`}>
                                            {chat.name.charAt(0)}
                                        </div>
                                        {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-slate-900 text-sm truncate">{chat.name}</h4>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">{chat.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-slate-500 truncate pr-4">{chat.lastMsg}</p>
                                            {chat.unread > 0 && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{chat.unread}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col bg-slate-50/40">
                        {selectedChat ? (
                            <>
                                <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center font-bold">M</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Mehmet Yılmaz</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                <span className="text-green-500 flex items-center gap-1 uppercase tracking-wider"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Çevrimiçi</span>
                                                <span className="text-slate-300">|</span>
                                                <span className="text-slate-400 uppercase tracking-wider">Müşteri (ID: 1042)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Phone size={18}/></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical size={18}/></button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 md:hidden" onClick={() => setSelectedChat(null)}><X size={18}/></button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                                    <div className="flex justify-center my-4">
                                        <span className="px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Bugün</span>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="max-w-[70%] space-y-1">
                                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700 leading-relaxed">
                                                Merhaba, geçen hafta verdiğim Kombi Bakım siparişi hakkında bilgi almak istiyordum. Durumu nedir acaba?
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 px-1">14:12</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="max-w-[70%] space-y-1 text-right">
                                            <div className="bg-slate-900 p-4 rounded-2xl rounded-tr-none text-white text-sm shadow-lg leading-relaxed text-left">
                                                Merhaba Mehmet Bey, siparişiniz onaylandı ve ilgili firmaya iletildi. Yarın saat 10:00'da keşif için gelecekler.
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 px-1">14:25 - Görüldü</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                                    <div className="flex gap-3 bg-slate-50 rounded-2xl p-2.5 items-center border border-slate-100">
                                        <button className="p-2 text-slate-400 hover:text-slate-600"><Plus size={20}/></button>
                                        <input 
                                            type="text" 
                                            placeholder="Mesajınızı yazın..." 
                                            className="flex-1 bg-transparent px-2 py-1 outline-none text-sm text-slate-900 placeholder:text-slate-400" 
                                        />
                                        <button className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 group">
                                            <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200 shadow-inner">
                                    <MessageSquare size={48} className="opacity-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Mesaj Kutunuz</h3>
                                <p className="text-sm max-w-xs mx-auto leading-relaxed">Firmalarla olan görüşmelerinizi yönetmek için soldaki listeden bir sohbet seçin.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- VIEW: COMPOSE (Unified View) --- */}
            {activeView === 'compose' && (
                <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 animate-fade-in overflow-hidden">
                    {/* Left: User Selector & Quick Broadcast */}
                    <div className="lg:w-1/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        
                        {/* Hızlı Toplu Seçim Alanı */}
                        <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hızlı Toplu Seçim</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => selectBroadcastGroup('all')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${broadcastType === 'all' ? 'bg-amber-500 border-amber-500 text-white shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:border-amber-200'}`}
                                >
                                    <Users size={16} className="mb-1"/>
                                    <span className="text-[9px] font-bold uppercase">Tümü</span>
                                    <span className="text-[9px] opacity-80">{stats.all}</span>
                                </button>
                                <button 
                                    onClick={() => selectBroadcastGroup('individual')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${broadcastType === 'individual' ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'}`}
                                >
                                    <User size={16} className="mb-1"/>
                                    <span className="text-[9px] font-bold uppercase">Bireysel</span>
                                    <span className="text-[9px] opacity-80">{stats.individual}</span>
                                </button>
                                <button 
                                    onClick={() => selectBroadcastGroup('corporate')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${broadcastType === 'corporate' ? 'bg-purple-500 border-purple-500 text-white shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:border-purple-200'}`}
                                >
                                    <Building2 size={16} className="mb-1"/>
                                    <span className="text-[9px] font-bold uppercase">Kurumsal</span>
                                    <span className="text-[9px] opacity-80">{stats.corporate}</span>
                                </button>
                            </div>
                        </div>

                        {/* Manuel Arama */}
                        <div className="p-4 border-b border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Veya Listeden Seç</h4>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Kullanıcı ara..." 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    disabled={broadcastType !== 'none'}
                                />
                            </div>
                        </div>
                        
                        <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <span className="text-[10px] font-bold text-slate-400 uppercase px-2">
                                {broadcastType !== 'none' ? 'Toplu Seçim Aktif' : `${selectedUserIds.length} Kişi Seçildi`}
                            </span>
                            {selectedUserIds.length > 0 && broadcastType === 'none' && (
                                <button onClick={() => setSelectedUserIds([])} className="text-[10px] font-bold text-red-500 hover:underline px-2">Temizle</button>
                            )}
                        </div>

                        <div className={`flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 ${broadcastType !== 'none' ? 'opacity-40 pointer-events-none' : ''}`}>
                            {filteredUsers.map(user => {
                                const isSelected = selectedUserIds.includes(user.id);
                                return (
                                    <div 
                                        key={user.id} 
                                        onClick={() => toggleUserSelection(user.id)}
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-transparent'}`}>
                                            <CheckCircle size={12} strokeWidth={4} />
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.type === 'corporate' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                                            <p className="text-[10px] text-slate-500 truncate">{user.type === 'corporate' ? 'Kurumsal' : 'Bireysel'} • {user.email}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right: Message Form */}
                    <div className="lg:w-2/3 flex flex-col">
                        <WidgetCard title="Mesaj İçeriği" className="h-full flex flex-col">
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Alıcı Durumu</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                                    {broadcastType !== 'none' ? (
                                        <>
                                            <Megaphone size={18} className="text-amber-500"/>
                                            <span className="font-bold text-slate-900">
                                                {broadcastType === 'all' ? 'Tüm Kullanıcılar' : broadcastType === 'individual' ? 'Bireysel Üyeler' : 'Kurumsal Üyeler'}
                                            </span>
                                            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">~{stats[broadcastType]} Kişi</span>
                                        </>
                                    ) : selectedUserIds.length > 0 ? (
                                        <>
                                            <Users size={18} className="text-indigo-500"/>
                                            <span className="font-bold text-slate-900">{selectedUserIds.length} Kişi Seçildi</span>
                                        </>
                                    ) : (
                                        <>
                                            <Info size={18} className="text-slate-400"/>
                                            <span className="text-slate-400 italic">Lütfen sol panelden bir grup veya kişi seçiniz...</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <form onSubmit={handleSend} className="flex-1 flex flex-col">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mesaj</label>
                                    <textarea 
                                        required
                                        value={messageContent}
                                        onChange={(e) => setMessageContent(e.target.value)}
                                        className="w-full h-full min-h-[200px] bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        placeholder="Mesajınızı buraya yazın..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={isScheduled} onChange={e => setIsScheduled(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500"/>
                                            <span className="text-sm font-bold text-slate-700">İleri Tarihli Gönderim</span>
                                        </label>
                                        {isScheduled && (
                                            <input 
                                                type="datetime-local" 
                                                value={scheduledTime}
                                                onChange={e => setScheduledTime(e.target.value)}
                                                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none"
                                            />
                                        )}
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={broadcastType === 'none' && selectedUserIds.length === 0}
                                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold transition-all hover:bg-indigo-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isScheduled ? <Clock size={18}/> : <Send size={18}/>}
                                        {isScheduled ? 'Zamanlamayı Kaydet' : 'Mesajı Gönder'}
                                    </button>
                                </div>
                            </form>
                        </WidgetCard>
                    </div>
                </div>
            )}

            {/* --- VIEW: SCHEDULED & HISTORY --- */}
            {activeView === 'scheduled' && (
                <div className="flex-1 overflow-y-auto custom-scrollbar animate-fade-in">
                    <WidgetCard title="Gönderim Kuyruğu & Geçmişi">
                        <div className="space-y-4">
                            {broadcasts.length === 0 && (
                                <div className="text-center py-20 text-slate-400">
                                    <Clock size={48} className="mx-auto mb-3 opacity-20" />
                                    <p className="text-sm font-bold">Henüz bir gönderim kaydı yok.</p>
                                    <p className="text-xs">Yeni bir mesaj oluşturarak başlayabilirsiniz.</p>
                                    <button 
                                        onClick={() => setActiveView('compose')} 
                                        className="mt-4 text-xs font-bold text-indigo-600 hover:underline"
                                    >
                                        Yeni Mesaj Oluştur
                                    </button>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {broadcasts.map((msg) => (
                                    <div key={msg.id} className="p-5 rounded-2xl border bg-white border-slate-100 shadow-sm relative group hover:border-slate-300 transition-colors flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                                msg.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                                {msg.status === 'pending' ? 'Bekliyor' : 'Gönderildi'}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400">{msg.scheduledDate.replace('T', ' ')}</span>
                                        </div>
                                        <p className="text-sm text-slate-700 font-medium line-clamp-3 mb-4 flex-1">"{msg.content}"</p>
                                        <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-50 pt-3 mt-auto">
                                            <span className="font-bold flex items-center gap-1">
                                                {msg.target === 'all' ? <Users size={14}/> : msg.target === 'corporate' ? <Building2 size={14}/> : msg.target === 'individual' ? <User size={14}/> : <List size={14}/>}
                                                {msg.target === 'all' ? 'Herkese' : msg.target === 'corporate' ? 'Kurumsal' : msg.target === 'individual' ? 'Bireysel' : 'Seçili Kişiler'}
                                            </span>
                                            <span>~{msg.recipientCount} Alıcı</span>
                                        </div>
                                        
                                        {msg.status === 'pending' && (
                                            <button 
                                                onClick={() => handleDeleteBroadcast(msg.id)}
                                                className="absolute top-3 right-3 p-1.5 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                title="İptal Et"
                                            >
                                                <Trash2 size={14}/>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </WidgetCard>
                </div>
            )}

        </div>
    );
};

export default MessageCenter;
