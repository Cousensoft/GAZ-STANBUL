
import React from 'react';
import { Upload, MoreHorizontal, FileText, Eye } from 'lucide-react';

const CompanyDocs = ({ documents }: { documents: any[] }) => {
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Yüklü Belgeler</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload size={14}/> Belge Yükle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {documents.map((doc, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow group relative">
                        <div className="absolute top-4 right-4"><MoreHorizontal size={16} className="text-slate-400 cursor-pointer"/></div>
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4"><FileText size={24}/></div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">{doc.name}</h4>
                        <p className="text-xs text-slate-500 mb-3">{doc.type} • {doc.date}</p>
                        <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                doc.status === 'valid' ? 'bg-green-100 text-green-700' : 
                                doc.status === 'expired' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                                {doc.status === 'valid' ? 'Geçerli' : doc.status === 'expired' ? 'Süresi Doldu' : 'İnceleniyor'}
                            </span>
                            <button className="text-slate-400 hover:text-slate-900"><Eye size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyDocs;
