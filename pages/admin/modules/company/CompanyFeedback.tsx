
import React from 'react';
import { AlertTriangle, MessageSquare, Star } from 'lucide-react';

const CompanyFeedback = ({ feedback }: { feedback: any }) => {
    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500"/> Şikayet & İade Analizi</h3>
                    <div className="mb-4">
                        <span className="text-sm text-slate-500">Toplam Şikayet:</span> <span className="font-bold text-slate-900">{feedback.complaints}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">İade Sebepleri</h4>
                    <div className="space-y-2">
                        {feedback.returnReasons.map((reason: any, i: number) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">{reason.reason}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${(reason.count / 8) * 100}%` }}></div>
                                    </div>
                                    <span className="font-bold text-slate-900">{reason.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><MessageSquare size={18}/> Son Müşteri Yorumları</h3>
                <div className="space-y-4">
                    {feedback.reviews.map((rev: any, i: number) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-slate-900 text-sm">{rev.user}</span>
                                <div className="flex text-amber-400 gap-0.5">
                                    {[...Array(5)].map((_, r) => (
                                        <Star key={r} size={12} fill={r < rev.rating ? "currentColor" : "none"} className={r >= rev.rating ? "text-slate-300" : ""}/>
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm italic">"{rev.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyFeedback;
