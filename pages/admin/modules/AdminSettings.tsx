
import React, { useState } from 'react';
import { 
    Globe, 
    Shield, 
    TurkishLira, 
    Palette, 
    Link2, 
    History, 
    Save, 
    Upload, 
    CheckCircle, 
    AlertCircle, 
    Clock,
    Lock,
    Eye,
    MessageSquare,
    Facebook,
    Twitter,
    Instagram,
    Image as ImageIcon,
    Percent,
    Wrench,
    Flame,
    Zap,
    Cpu
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'marketplace' | 'branding' | 'integrations' | 'logs'>('general');
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

    const tabs = [
        { id: 'general', label: 'Genel Ayarlar', icon: Globe },
        { id: 'marketplace', label: 'Pazaryeri & Komisyon', icon: TurkishLira },
        { id: 'branding', label: 'Görünüm & Branding', icon: Palette },
        { id: 'integrations', label: 'Entegrasyonlar', icon: Link2 },
        { id: 'logs', label: 'Denetim Geçmişi', icon: History },
    ];

    const categoryCommissions = [
        { id: 1, name: 'Doğalgaz & Isıtma', icon: Flame, current: 10, target: 12, trend: 'up' },
        { id: 2, name: 'Mekanik Tesisat', icon: Wrench, current: 12, target: 12, trend: 'stable' },
        { id: 3, name: 'Akıllı Ev & IoT', icon: Cpu, current: 15, target: 10, trend: 'down' },
        { id: 4, name: 'Elektrik', icon: Zap, current: 10, target: 10, trend: 'stable' },
    ];

    const handleSave = () => {
        alert("Sistem ayarları başarıyla güncellendi.");
    };

    return (
        <div className="animate-fade-in flex flex-col h-[calc(100vh-140px)]">
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sistem Kontrol Merkezi</h2>
                    <p className="text-sm text-slate-500 font-medium">Platformun global parametrelerini ve teknik altyapısını yönetin.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group"
                >
                    <Save size={18} className="group-hover:scale-110 transition-transform"/>
                    Ayarları Kaydet
                </button>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
                
                {/* --- Sidebar Tabs --- */}
                <div className="w-64 flex flex-col gap-1 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200 ring-2 ring-slate-900/5' 
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-red-600' : 'text-slate-400'} />
                            {tab.label}
                        </button>
                    ))}

                    <div className="mt-auto p-4 bg-slate-100/50 rounded-2xl border border-slate-200/50">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                            <Clock size={12}/> Son Güncelleme
                        </div>
                        <p className="text-xs text-slate-600 font-bold">24.10.2024 - 14:30</p>
                        <p className="text-[10px] text-slate-400 mt-1">Yönetici: Super Admin</p>
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="space-y-6">
                        
                        {/* TAB: GENERAL SETTINGS */}
                        {activeTab === 'general' && (
                            <div className="space-y-6 animate-fade-in">
                                <WidgetCard title="Site Bilgileri">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Site Başlığı (Title)</label>
                                            <input type="text" defaultValue="Gazistanbul - Geleceğin Altyapısı" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">İletişim E-Posta</label>
                                            <input type="email" defaultValue="info@gazistanbul.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                                        </div>
                                    </div>
                                </WidgetCard>

                                <WidgetCard title="Güvenlik & Bakım">
                                    <div className="space-y-4">
                                        <div className={`p-4 rounded-2xl border transition-all ${isMaintenanceMode ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className={`block text-sm font-bold ${isMaintenanceMode ? 'text-red-900' : 'text-slate-900'}`}>Bakım Modu (Under Construction)</span>
                                                    <span className="text-xs text-slate-500">Siteyi geçici olarak ziyaretçilere kapatır.</span>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" checked={isMaintenanceMode} onChange={() => setIsMaintenanceMode(!isMaintenanceMode)} />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </WidgetCard>
                            </div>
                        )}

                        {/* TAB: MARKETPLACE (Dinamik Komisyon Alanı) */}
                        {activeTab === 'marketplace' && (
                            <div className="space-y-6 animate-fade-in">
                                <WidgetCard title="Finansal Parametreler">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Global Komisyon Oranı (%)</label>
                                            <div className="relative">
                                                <input type="number" defaultValue="10" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black outline-none focus:ring-2 focus:ring-slate-900" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase">Özel kategori ayarlanmamış tüm ürünler için geçerlidir.</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hakediş Alt Limiti</label>
                                            <div className="relative">
                                                <input type="number" defaultValue="1000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black outline-none focus:ring-2 focus:ring-slate-900" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₺</span>
                                            </div>
                                        </div>
                                    </div>
                                </WidgetCard>

                                <WidgetCard title="Kategori Bazlı Komisyon Yönetimi" action={<button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Sektör Ekle</button>}>
                                    <div className="overflow-hidden border border-slate-100 rounded-2xl">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-slate-50 border-b border-slate-100">
                                                <tr>
                                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sektör / Kategori</th>
                                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mevcut Oran</th>
                                                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Planlanan</th>
                                                    <th className="p-4 text-right pr-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">İşlem</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {categoryCommissions.map(cat => (
                                                    <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 shadow-sm"><cat.icon size={16}/></div>
                                                                <span className="text-sm font-bold text-slate-900">{cat.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-black">
                                                                %{cat.current}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <input type="number" defaultValue={cat.target} className="w-16 bg-slate-50 border border-slate-200 rounded-lg p-1 text-center text-xs font-bold" />
                                                        </td>
                                                        <td className="p-4 text-right pr-6">
                                                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Güncelle</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </WidgetCard>
                            </div>
                        )}

                        {/* Diğer Ayar Sekmeleri (Önceden vardı) */}
                        {activeTab === 'branding' && <div className="animate-fade-in p-8 text-center text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">Görünüm Ayarları Yükleniyor...</div>}
                        {activeTab === 'integrations' && <div className="animate-fade-in p-8 text-center text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">API Entegrasyonları Yükleniyor...</div>}
                        {activeTab === 'logs' && <div className="animate-fade-in p-8 text-center text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">Sistem Logları Yükleniyor...</div>}

                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminSettings;
