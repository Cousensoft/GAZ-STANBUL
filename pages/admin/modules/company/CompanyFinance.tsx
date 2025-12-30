
import React from 'react';
import { Wallet } from 'lucide-react';

const CompanyFinance = ({ financial }: { financial: any }) => {
    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-slate-400 text-xs font-bold uppercase">Ödenecek Tutar (Bakiye)</span>
                    <h3 className="text-3xl font-black mt-2">{financial.pendingPayment.toLocaleString('tr-TR')} ₺</h3>
                    <div className="mt-6 flex flex-col gap-2 text-sm text-slate-300">
                        <div className="flex justify-between border-b border-white/10 pb-2"><span>Ödeme Tarihi:</span> <span className="text-white font-bold">{financial.nextPaymentDate}</span></div>
                        <div className="flex justify-between pt-2"><span>Yöntem:</span> <span className="text-white font-bold">{financial.paymentMethod}</span></div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                        <Wallet size={18} className="text-slate-400"/> Finansal Özet
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-100">
                            <span className="text-xs font-bold text-green-700 uppercase">Bugüne Kadar Ödenen</span>
                            <span className="font-black text-green-700">{financial.totalPaid.toLocaleString('tr-TR')} ₺</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="text-xs font-bold text-blue-700 uppercase">Komisyon Oranı</span>
                            <span className="font-black text-blue-700">%{financial.commissionRate}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase">Son Ödeme</span>
                            <span className="font-bold text-slate-700">{financial.lastPaymentDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyFinance;
