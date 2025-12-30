import React from 'react';
import { Lock } from 'lucide-react';
import { WidgetCard } from './Widgets';

const SecuritySettings = () => (
    <div className="animate-fade-in max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Şifre ve Güvenlik</h2>
        <WidgetCard>
            <div className="flex items-center gap-4 mb-8 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <Lock size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Şifre Değiştir</h3>
                    <p className="text-sm text-slate-500">Hesap güvenliğiniz için güçlü bir şifre kullanın.</p>
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Mevcut Şifre</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Yeni Şifre</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Yeni Şifre (Tekrar)</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                    Güncelle
                </button>
            </div>
        </WidgetCard>
    </div>
);

export default SecuritySettings;