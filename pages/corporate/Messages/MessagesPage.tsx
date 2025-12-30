
import React, { useState } from 'react';
/* Fix: Added MessageSquare to the lucide-react imports */
import { Search, Send, User, Shield, Phone, MoreVertical, X, MessageSquare } from 'lucide-react';

const MessagesPage = () => {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);

    const chats = [
        { id: 1, name: 'Sistem Yöneticisi', type: 'admin', lastMsg: 'Belgeleriniz onaylandı.', time: '14:30', online: true },
        { id: 2, name: 'Müşteri: Ahmet Yılmaz', type: 'customer', lastMsg: 'Pazartesi günü müsaitseniz gelmenizi...', time: 'Dün', online: false },
        { id: 3, name: 'Müşteri: Selin K.', type: 'customer', lastMsg: 'Fiyat teklifiniz için teşekkürler.', time: '2 gün önce', online: false },
    ];

    return (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-[24px] shadow-sm h-[calc(100vh-160px)] flex overflow-hidden">
            
            {/* Sidebar: Chat List */}
            <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">Mesajlar</h3>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Konuşma ara..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 py-2 text-xs outline-none focus:ring-1 focus:ring-slate-900" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-slate-50 ${selectedChat === chat.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                        >
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${chat.type === 'admin' ? 'bg-slate-900' : 'bg-indigo-500'}`}>
                                    {chat.name.charAt(0)}
                                </div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-bold text-slate-900 text-sm truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-slate-400">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat Window */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                {selectedChat ? (
                    <>
                        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">A</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Sistem Yöneticisi</h4>
                                    <p className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1">Çevrimiçi</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-slate-900"><Phone size={18}/></button>
                                <button className="p-2 text-slate-400 hover:text-slate-900 md:hidden" onClick={() => setSelectedChat(null)}><X size={18}/></button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            <div className="flex justify-start">
                                <div className="max-w-[80%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                                    Merhaba Ahmet Bey, Bosphorus Enerji olarak son gönderdiğiniz vergi belgelerinde imza sirküsü eksik görünmektedir. Lütfen profilinizden güncelleyiniz.
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="max-w-[80%] bg-slate-900 p-4 rounded-2xl rounded-tr-none text-white text-sm shadow-md">
                                    Merhaba, uyarınız için teşekkürler. Hemen kontrol edip yüklüyorum.
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2 bg-slate-50 rounded-2xl p-2 items-center">
                                <input type="text" placeholder="Mesajınızı yazın..." className="flex-1 bg-transparent px-2 py-1 outline-none text-sm text-slate-900" />
                                <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                                    <Send size={18}/>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <MessageSquare size={64} className="mb-4 opacity-10" />
                        <p className="text-sm font-bold">Mesajlaşmayı başlatmak için soldan bir konuşma seçin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
