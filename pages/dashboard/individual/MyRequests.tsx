
import React from 'react';
import { PlusCircle, FileText, Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { MOCK_REQUESTS } from '../../../utils/constants';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { useNavigate } from 'react-router-dom';

interface MyRequestsProps {
    onViewDetail?: (request: any) => void;
}

const IndividualRequests: React.FC<MyRequestsProps> = ({ onViewDetail }) => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Taleplerim</h2>
                    <p className="text-sm text-slate-500">Oluşturduğunuz hizmet talepleri ve durumları.</p>
                </div>
                <button 
                    onClick={() => navigate('/create-request')}
                    className="bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
                >
                    <PlusCircle size={18} /> Yeni Talep
                </button>
            </div>

            <div className="space-y-4">
                {MOCK_REQUESTS.map(req => (
                    <WidgetCard key={req.id} className="flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group cursor-pointer border border-slate-100">
                        <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                req.status === 'Acil' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                                <FileText size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">{req.title}</h3>
                                    {req.status === 'Acil' && <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase">Acil</span>}
                                </div>
                                <p className="text-sm text-slate-500 mb-3 line-clamp-1">{req.description}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {req.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={12}/> {req.district}</span>
                                    <span className="flex items-center gap-1"><Briefcase size={12}/> {req.sector}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex md:flex-col items-center justify-between md:justify-center gap-2 md:border-l md:border-slate-100 md:pl-6 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                            <div className="text-center">
                                <span className="block text-2xl font-black text-slate-900">3</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Teklif Var</span>
                            </div>
                            <button 
                                onClick={() => onViewDetail && onViewDetail(req)}
                                className="bg-slate-900 text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors w-full flex items-center justify-center gap-1"
                            >
                                İncele <ChevronRight size={12} />
                            </button>
                        </div>
                    </WidgetCard>
                ))}
            </div>
        </div>
    );
};

export default IndividualRequests;
