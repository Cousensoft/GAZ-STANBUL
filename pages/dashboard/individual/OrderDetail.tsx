import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Package, Truck, CheckCircle, MapPin, CreditCard, 
    Download, HelpCircle, Clock, ChevronRight, RotateCcw, X, AlertCircle, Star, Send,
    // Fix: Add missing Building2 import from lucide-react to resolve the error on line 88
    Building2
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { useMarket } from '../../../context/MarketContext';

interface OrderDetailProps {
    order: any;
    onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
    const navigate = useNavigate();
    const { createReturnRequest, returns } = useMarket();
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const existingReturn = returns.find(r => r.orderId === order.id);
    
    const steps = [
        { label: 'Sipariş Alındı', time: '24.10.2024 14:30', completed: true },
        { label: 'Hazırlanıyor', time: '24.10.2024 15:12', completed: order.status !== 'pending' },
        { label: 'Kargoya Verildi', time: order.status === 'shipped' || order.status === 'delivered' ? '25.10.2024 09:00' : '-', completed: order.status === 'shipped' || order.status === 'delivered' },
        { label: 'Teslim Edildi', time: order.status === 'delivered' ? '26.10.2024 11:20' : '-', completed: order.status === 'delivered' },
    ];

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            {/* --- REVIEW MODAL --- */}
            {isReviewOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsReviewOpen(false)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-slate-900 p-8 text-white">
                            <h3 className="text-2xl font-black">Deneyimin Nasıl?</h3>
                            <p className="text-slate-400 text-sm mt-1">Bu ürünü başkalarına tavsiye eder misin?</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex justify-center gap-3">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={40} className={`cursor-pointer transition-all ${i <= rating ? 'text-amber-400 fill-amber-400 scale-110' : 'text-slate-200'}`} onClick={() => setRating(i)} />
                                ))}
                            </div>
                            <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-600 resize-none" placeholder="Ürün ve satıcı hakkında görüşlerini paylaş..."></textarea>
                            <button onClick={() => {alert('Yorumun için teşekkürler!'); setIsReviewOpen(false);}} className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-xl">Yorumu Yayınla</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600"><ArrowLeft size={20} /></button>
                    <div><h2 className="text-2xl font-bold text-slate-900">Sipariş Detayı</h2><p className="text-xs font-mono text-slate-500">#{order.id}</p></div>
                </div>
                <div className="flex gap-2">
                    {order.status === 'delivered' && (
                        <button onClick={() => setIsReviewOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-900 rounded-xl font-bold text-xs hover:bg-amber-50 transition-all shadow-lg shadow-amber-200"><Star size={16}/> Değerlendir</button>
                    )}
                    {order.status === 'delivered' && !existingReturn && (
                        <button onClick={() => setIsReturnModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-xs hover:bg-red-50 transition-all"><RotateCcw size={16}/> İade Talebi</button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <WidgetCard title="Teslimat Durumu">
                        <div className="relative pt-4 pb-2 px-2">
                            <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                            <div className="space-y-8 relative z-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className={`flex gap-5 ${!step.completed && 'opacity-40'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0 ${step.completed ? 'bg-green-50 text-white' : 'bg-slate-200 text-slate-400'}`}>{step.completed ? <CheckCircle size={18} /> : <div className="w-2 h-2 rounded-full bg-slate-400"></div>}</div>
                                        <div><h4 className="font-bold text-slate-900 text-sm">{step.label}</h4><p className="text-xs text-slate-400 font-medium">{step.time}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </WidgetCard>
                </div>
                <div className="space-y-6">
                    <WidgetCard title="Firma Bilgisi">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"><Building2 size={24}/></div>
                            <div><h4 className="font-bold text-slate-900 text-sm">Bosphorus Enerji</h4><p className="text-[10px] text-blue-600 font-black uppercase">Kurumsal Satıcı</p></div>
                        </div>
                        <button 
                            onClick={() => navigate('/market/store/1')}
                            className="w-full mt-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                        >
                            Mağazayı Gör
                        </button>
                    </WidgetCard>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;