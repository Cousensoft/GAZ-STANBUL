import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { MOCK_COMPANIES } from '../../../utils/constants';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const IndividualFavorites = () => {
    const navigate = useNavigate();
    const favorites = MOCK_COMPANIES.slice(0, 4);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Favorilerim</h2>
                <span className="text-sm text-slate-500 font-bold bg-white px-3 py-1 rounded-full border border-slate-200">{favorites.length} Kayıt</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(company => (
                    <WidgetCard key={company.id} className="group hover:border-red-200 transition-all p-0 overflow-hidden relative">
                        <div className="h-24 bg-slate-100 relative">
                            <img src={`https://picsum.photos/seed/${company.id}bg/400/200`} className="w-full h-full object-cover opacity-80" alt="Cover" />
                            <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 shadow-sm hover:bg-red-50 transition-colors">
                                <Heart size={16} fill="currentColor" />
                            </button>
                        </div>
                        <div className="px-6 pb-6 -mt-8 relative z-10">
                            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-sm mb-3">
                                <img src={company.logoUrl} className="w-full h-full object-cover rounded-xl" alt="Logo" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{company.name}</h3>
                            <p className="text-xs text-slate-500 mb-3">{company.sector} • {company.district}</p>
                            
                            <div className="flex items-center gap-1 mb-4">
                                <Star size={14} className="text-amber-400 fill-current" />
                                <span className="text-sm font-bold text-slate-700">{company.rating}</span>
                            </div>

                            <button 
                                onClick={() => navigate(`/company/${company.id}`)}
                                className="w-full bg-slate-50 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors text-sm"
                            >
                                Profili İncele
                            </button>
                        </div>
                    </WidgetCard>
                ))}
            </div>
        </div>
    );
};

export default IndividualFavorites;