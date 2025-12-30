
import React, { useState } from 'react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';
import { Store, Truck, Bell, CreditCard, Save, Power, AlertCircle } from 'lucide-react';

const MarketSettings = () => {
    const [isStoreActive, setIsStoreActive] = useState(true);

    return (
        <div className="space-y-6 animate-fade-in">
            
            {/* Store Status / Vacation Mode */}
            <WidgetCard className={`transition-colors duration-300 ${isStoreActive ? 'bg-white border-slate-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${isStoreActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            <Power size={24} />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${isStoreActive ? 'text-slate-900' : 'text-red-900'}`}>
                                Mağaza Durumu: {isStoreActive ? 'Aktif' : 'Kapalı (Pasif Mod)'}
                            </h3>
                            <p className={`text-sm mt-1 ${isStoreActive ? 'text-slate-500' : 'text-red-700'}`}>
                                {isStoreActive 
                                    ? 'Mağazanız şu anda müşterilere açık ve ürünleriniz listeleniyor.' 
                                    : 'Mağazanız geçici olarak kapatıldı. Ürünleriniz aramalarda görünmeyecek ve yeni sipariş alamayacaksınız.'}
                            </p>
                            {!isStoreActive && (
                                <div className="flex items-center gap-2 mt-3 text-xs font-bold text-red-600 bg-white/50 px-3 py-1.5 rounded-lg w-fit">
                                    <AlertCircle size={14} /> Mevcut siparişlerin süreçleri devam edecektir.
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold uppercase ${isStoreActive ? 'text-slate-400' : 'text-red-600'}`}>
                            {isStoreActive ? 'Açık' : 'Kapalı'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={isStoreActive} 
                                onChange={() => setIsStoreActive(!isStoreActive)} 
                            />
                            <div className={`w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500 ${!isStoreActive ? 'peer-checked:bg-slate-400' : ''}`}></div>
                        </label>
                    </div>
                </div>
            </WidgetCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Store Info */}
                <WidgetCard>
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Store size={20} className="text-blue-600"/> Mağaza Bilgileri
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mağaza Adı</label>
                            <input type="text" defaultValue="Bosphorus Market" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mağaza Açıklaması</label>
                            <textarea rows={3} defaultValue="Kaliteli ve güvenilir yedek parça tedarikçisi." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 outline-none resize-none focus:ring-2 focus:ring-slate-900 transition-all"></textarea>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs text-center cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors">Logo Yükle</div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-2">Mağaza logosu (500x500px, PNG/JPG)</p>
                                <button className="text-xs font-bold text-blue-600 hover:underline">Görsel Seç</button>
                            </div>
                        </div>
                    </div>
                </WidgetCard>

                {/* Shipping Settings */}
                <WidgetCard>
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Truck size={20} className="text-amber-600"/> Kargo Ayarları
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-sm font-medium text-slate-700">Ücretsiz Kargo</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ücretsiz Kargo Limiti (TL)</label>
                            <input type="number" defaultValue="500" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Anlaşmalı Kargo Firması</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all">
                                <option>Yurtiçi Kargo</option>
                                <option>Aras Kargo</option>
                                <option>MNG Kargo</option>
                            </select>
                        </div>
                    </div>
                </WidgetCard>

                {/* Notifications */}
                <WidgetCard>
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Bell size={20} className="text-red-600"/> Bildirim Tercihleri
                    </h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">Yeni sipariş e-postası al</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">Stok uyarısı bildirimi</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">Haftalık rapor gönder</span>
                        </label>
                    </div>
                </WidgetCard>

                {/* Save Button Area */}
                <div className="lg:col-span-2 flex justify-end pt-4 border-t border-slate-100">
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2">
                        <Save size={18} /> Ayarları Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketSettings;
