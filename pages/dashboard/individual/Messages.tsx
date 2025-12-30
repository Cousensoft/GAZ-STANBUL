
import React, { useState } from 'react';
import { Search, Send, Phone, MoreVertical, X, MessageSquare, Building2, UserCircle, CheckCheck } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const IndividualMessages = () => {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [messageInput, setMessageInput] = useState('');

    const chats = [
        { id: 1, name: 'Bosphorus Enerji', type: 'company', lastMsg: 'Talebiniz için teşekkürler.', time: '14:30', online: true, unread: 2 },
        { id: 2, name: 'Galata Mekanik', type: 'company', lastMsg: 'Pazartesi günü keşif için uygunuz.', time: 'Dün', online: false, unread: 0 },
        { id: 3, name: 'Gazistanbul Destek', type: 'system', lastMsg: 'Profiliniz onaylandı.', time: '3 gün önce', online: true, unread: 0 },
    ];

    const currentMessages = [
        { id: 1, sender: 'company', text: 'Merhaba Ahmet Bey, kombi bakımı talebiniz elimize ulaştı.', time: '14:20' },
        { id: 2, sender: 'user', text: 'Merhaba, teşekkür ederim. Ne zaman gelebilirsiniz?', time: '14:25' },
        { id: 3, sender: 'company', text: 'Yarın öğleden sonra saat 15:00 civarında uygun musunuz?', time: '14:30' },
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        // Mock send
        setMessageInput('');
    };

    return (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-[24px] shadow-sm h-[calc(100vh-160px)] flex overflow-hidden">
            
            {/* Sidebar: Chat List */}
            <div className={`w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0 ${selectedChat !== null ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-5 border-b border-slate-100 bg-slate-50/30">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <MessageSquare size={18} className="text-red-600"/> Mesajlar
                    </h3>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Firma veya mesaj ara..." 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-500 transition-all" 
                        />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                    {chats.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-red-50/50 border-l-4 border-red-600' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
                        >
                            <div className="relative">
                                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${chat.type === 'system' ? 'bg-slate-900' : 'bg-blue-600'}`}>
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
                                    {chat.unread > 0 && (
                                        <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat Window */}
            <div className={`flex-1 flex flex-col bg-slate-50/30 ${selectedChat === null ? 'hidden md:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm relative z-10">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 text-slate-400"><X size={20}/></button>
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    {chats.find(c => c.id === selectedChat)?.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{chats.find(c => c.id === selectedChat)?.name}</h4>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                        <span className="text-green-500 flex items-center gap-1 uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Çevrimiçi
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Phone size={18}/></button>
                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical size={18}/></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                            <div className="flex justify-center mb-4">
                                <span className="px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Bugün</span>
                            </div>
                            
                            {currentMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] space-y-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                        <div className={`p-4 rounded-2xl shadow-sm border text-sm leading-relaxed ${
                                            msg.sender === 'user' 
                                            ? 'bg-slate-900 text-white rounded-tr-none border-slate-800' 
                                            : 'bg-white text-slate-700 rounded-tl-none border-slate-100'
                                        }`}>
                                            {msg.text}
                                        </div>
                                        <div className="flex items-center gap-1 justify-end px-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">{msg.time}</span>
                                            {msg.sender === 'user' && <CheckCheck size={12} className="text-blue-500" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-5 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                            <form onSubmit={handleSendMessage} className="flex gap-3 bg-slate-50 rounded-2xl p-2 items-center border border-slate-100 focus-within:border-red-200 transition-all">
                                <input 
                                    type="text" 
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Mesajınızı buraya yazın..." 
                                    className="flex-1 bg-transparent px-3 py-2 outline-none text-sm text-slate-900 placeholder:text-slate-400" 
                                />
                                <button 
                                    type="submit"
                                    className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 group"
                                >
                                    <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                                </button>
                            </form>
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
    );
};

export default IndividualMessages;
