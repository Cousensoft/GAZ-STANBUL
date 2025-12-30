import React from 'react';
import { Star, MessageSquare, ThumbsUp, ChevronRight, User, Calendar } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const ReviewsPage = () => {
    const reviews = [
        { id: 1, user: 'Caner Erkin', rating: 5, comment: 'Bosphorus Enerji işini çok temiz yaptı. Kombi bakımında uzmanlar gerçekten.', date: 'Bugün', verified: true },
        { id: 2, user: 'Selin Yılmaz', rating: 4, comment: 'Hizmet güzel ama usta biraz geç geldi. Yine de memnun kaldım.', date: 'Dün', verified: true },
        { id: 3, user: 'Mert Demir', rating: 5, comment: 'Güler yüzlü hizmet ve profesyonel ekip. Teşekkürler Gazistanbul!', date: '3 gün önce', verified: true },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Müşteri Yorumları</h2>
                    <p className="text-sm text-slate-500">Bireysel müşterilerden gelen geri bildirimler.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-8 shadow-sm">
                    <div className="text-center">
                        <span className="block text-3xl font-black text-slate-900">4.8</span>
                        <div className="flex text-amber-400 gap-0.5 mb-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Ortalama Puan</span>
                    </div>
                    <div className="h-10 w-px bg-slate-100"></div>
                    <div>
                        <span className="block text-xl font-bold text-slate-900">{reviews.length}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Toplam Yorum</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map(rev => (
                    <WidgetCard key={rev.id} className="hover:border-slate-300 transition-colors group">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                    {rev.user.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-slate-900">{rev.user}</h4>
                                        <div className="flex text-amber-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i >= rev.rating ? "text-slate-200" : ""} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Calendar size={12}/> {rev.date}</span>
                                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">Onaylı Hizmet</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:flex-col items-center justify-center gap-2 md:pl-6 md:border-l border-slate-100">
                                <button className="flex-1 md:flex-none text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">Yanıtla</button>
                                <button className="flex-1 md:flex-none text-xs font-bold text-slate-400 hover:text-red-600 px-4 py-2 rounded-lg transition-colors">Raporla</button>
                            </div>
                        </div>
                    </WidgetCard>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;