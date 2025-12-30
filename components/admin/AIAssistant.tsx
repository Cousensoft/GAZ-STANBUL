
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, XCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: 'Merhaba! Ben Gazistanbul Asistanı. Size nasıl yardımcı olabilirim? Örneğin: "Bugünkü ciro nedir?" veya "En aktif firma hangisi?"' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => scrollToBottom(), [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            /* Initializing GoogleGenAI using apiKey from process.env.API_KEY as per guidelines */
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            /* Using gemini-3-flash-preview for text based assistant tasks as per guidelines */
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { 
                                text: `You are an AI assistant for the admin panel of "Gazistanbul", a platform for infrastructure services in Istanbul.
                                       Your goal is to assist the admin with insights about the platform's performance, user data, and system status.
                                       
                                       Current Context & Mock Data for Reference:
                                       - Total Companies: 2,845
                                       - Total Users: 12,450
                                       - Monthly Requests: 854
                                       - Total Revenue: 1.2M TL
                                       - Active Requests: 142
                                       - Ongoing Jobs: 24
                                       - Completed Jobs: 89
                                       - Top Company Today: 'Bosphorus Enerji'
                                       - System Status: 99.9% Uptime, Healthy
                                       
                                       Answer the user's question based on this context or general knowledge about the platform.
                                       Keep the tone professional, helpful, and concise.
                                       
                                       User Question: ${userMsg}` 
                            }
                        ]
                    }
                ]
            });

            /* Extracting text content from response.text property directly as per guidelines */
            const botResponse = response.text || "Üzgünüm, şu anda yanıt veremiyorum.";
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Bir hata oluştu. Lütfen tekrar deneyin." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 h-96 mb-4 flex flex-col overflow-hidden animate-fade-in-up">
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <span className="font-bold text-sm">AI Yönetici Asistanı</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><XCircle size={18}/></button>
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                                    m.role === 'user' 
                                    ? 'bg-red-600 text-white rounded-tr-none' 
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 text-slate-500 rounded-xl rounded-tl-none p-3 text-xs shadow-sm italic">
                                    Yazıyor...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Bir soru sor..."
                            disabled={isLoading}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-900 disabled:opacity-50"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-900 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center"
            >
                {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
            </button>
        </div>
    );
};

export default AIAssistant;
