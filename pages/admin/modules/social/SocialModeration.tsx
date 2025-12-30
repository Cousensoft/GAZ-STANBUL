import React, { useState } from 'react';
import { 
    AlertTriangle, 
    ShieldAlert, 
    CheckCircle, 
    XCircle, 
    Eye, 
    User, 
    Clock, 
    MoreHorizontal, 
    X, 
    Trash2, 
    Ban, 
    ShieldCheck,
    MessageSquare,
    ChevronRight,
    Flag,
    ExternalLink
} from 'lucide-react';

interface Report {
    id: number;
    type: string;
    reporter: string;
    suspect: string;
    content: string;
    date: string;
    severity: 'low' | 'medium' | 'high';
    status: 'pending' | 'resolved' | 'ignored';
    postImage?: string;
}

const SocialModeration = () => {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [reports, setReports] = useState<Report[]>([
        { id: 101, type: 'Spam', reporter: 'Ali Veli', suspect: '@bot_user', content: 'Bedava Bitcoin kazanmak için hemen profildeki linke tıkla! Kesin kazanç garantisi.', date: '10 dk önce', severity: 'high', status: 'pending' },
        { id: 102, type: 'Hakaret', reporter: 'Ayşe K.', suspect: '@troll_hesap', content: 'Sen ne anlarsın tesisattan, git başka yerde oyna çocuk...', date: '1 saat önce', severity: 'medium', status: 'pending' },
        { id: 103, type: 'Yanlış Bilgi', reporter: 'Mehmet Y.', suspect: '@acemi_usta', content: 'Kombi basıncı her zaman 5 bar olmalı, yoksa patlar demedi demeyin.', date: '3 saat önce', severity: 'low', status: 'pending' },
        { id: 104, type: 'Uygunsuz İçerik', reporter: 'Selin G.', suspect: '@gece_ustası', content: 'Şantiyede iş güvenliği kurallarına uymayan bu paylaşım riskli.', date: '5 saat önce', severity: 'medium', status: 'pending', postImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=300&auto=format&fit=crop' },
    ]);

    const handleIgnore = (id: number) => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'ignored' } : r));
        if(selectedReport?.id === id) setSelectedReport(null);
        alert("Şikayet yoksayıldı.");
    };

    const handleResolve = (id: number) => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
        if(selectedReport?.id === id) setSelectedReport(null);
        alert("İçerik kaldırıldı ve işlem tamamlandı.");
    };

    const getSeverityBadge = (severity: Report['severity']) => {
        switch(severity) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col relative">
            {/* Stats Header */}
            <div className="flex gap-6 shrink-0">
                <div className="flex-1 bg-red-50 border border-red-100 p-5 rounded-2xl flex items-center gap-5 shadow-sm">
                    <div className="p-3 bg-red-100 rounded-2xl text-red-600 shadow-sm"><ShieldAlert size={28}/></div>
                    <div>
                        <span className="block text-3xl font-black text-red-900 leading-none">
                            {reports.filter(r => r.status === 'pending' && r.severity === 'high').length}
                        </span>
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider mt-1 block">Kritik Şikayet</span>
                    </div>
                </div>
                <div className="flex-1 bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center gap-5 shadow-sm">
                    <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shadow-sm"><AlertTriangle size={28}/></div>
                    <div>
                        <span className="block text-3xl font-black text-amber-900 leading-none">
                            {reports.filter(r => r.status === 'pending').length}
                        </span>
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1 block">Toplam Bekleyen</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden relative">
                
                {/* Şikayet Listesi */}
                <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${selectedReport ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Flag size={18} className="text-slate-400"/> Şikayet Kuyruğu
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sıralama: En Yeni</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {reports.filter(r => r.status === 'pending').map(report => (
                                <div 
                                    key={report.id} 
                                    onClick={() => setSelectedReport(report)}
                                    className={`p-6 hover:bg-slate-50/80 transition-colors cursor-pointer group ${selectedReport?.id === report.id ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${getSeverityBadge(report.severity)}`}>
                                                    {report.type}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock size={12}/> {report.date}</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-900 mb-2 truncate">
                                                <span className="text-slate-400">Şüpheli:</span> <span className="text-blue-600 font-bold hover:underline">{report.suspect}</span>
                                            </p>
                                            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-sm text-slate-600 italic line-clamp-2 group-hover:border-slate-200 transition-colors">
                                                "{report.content}"
                                            </div>
                                            <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-slate-400">
                                                <User size={12}/> Raporlayan: <span className="text-slate-600">{report.reporter}</span>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                            <button className="flex-1 md:flex-none p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                                                <ChevronRight size={20}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {reports.filter(r => r.status === 'pending').length === 0 && (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4">
                                        <CheckCircle size={40}/>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900">Tebrikler!</h4>
                                    <p className="text-sm text-slate-500">Bekleyen herhangi bir moderasyon şikayeti bulunmuyor.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detay Paneli */}
                {selectedReport && (
                    <div className="absolute inset-0 lg:static lg:inset-auto w-full lg:w-1/3 bg-white rounded-2xl border border-slate-200 shadow-2xl lg:shadow-sm z-30 flex flex-col overflow-hidden animate-slide-in-right">
                        
                        {/* Panel Header */}
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <div>
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Eye size={18} className="text-blue-600"/> Şikayet İnceleme
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">CASE_ID: {selectedReport.id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedReport(null)} 
                                className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={20}/>
                            </button>
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                            
                            {/* Raporlayan Bilgisi */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Şikayet Kaynağı</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                                        {selectedReport.reporter.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{selectedReport.reporter}</div>
                                        <div className="text-[10px] text-slate-500">Bireysel Kullanıcı</div>
                                    </div>
                                    <button className="ml-auto p-2 text-slate-400 hover:text-slate-900"><ExternalLink size={16}/></button>
                                </div>
                            </div>

                            {/* Şüpheli İçerik Önizleme */}
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Şikayet Edilen İçerik</h4>
                                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black border border-blue-200">
                                            {selectedReport.suspect.charAt(1).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-slate-900 text-xs">{selectedReport.suspect}</div>
                                    </div>
                                    {selectedReport.postImage && (
                                        <div className="w-full h-40 bg-slate-100">
                                            <img src={selectedReport.postImage} className="w-full h-full object-cover" alt="Reported Post"/>
                                        </div>
                                    )}
                                    <div className="p-4 text-sm text-slate-700 leading-relaxed italic">
                                        "{selectedReport.content}"
                                    </div>
                                </div>
                            </div>

                            {/* Moderatör Aksiyonları */}
                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Karar Ver</h4>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleIgnore(selectedReport.id)}
                                        className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200"
                                    >
                                        <CheckCircle size={16}/> Yoksay
                                    </button>
                                    <button 
                                        onClick={() => handleResolve(selectedReport.id)}
                                        className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        <Trash2 size={16}/> İçeriği Sil
                                    </button>
                                </div>

                                <button 
                                    onClick={() => {if(confirm('Kullanıcıyı süresiz yasaklamak istediğinize emin misiniz?')) handleResolve(selectedReport.id)}}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                                >
                                    <Ban size={16}/> Kullanıcıyı Yasakla (Ban)
                                </button>

                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                                    <MessageSquare size={16}/> Kullanıcıyla İletişime Geç
                                </button>
                            </div>

                        </div>

                        {/* Panel Footer */}
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-green-400"/>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Güvenlik Denetimi Aktif</span>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default SocialModeration;
