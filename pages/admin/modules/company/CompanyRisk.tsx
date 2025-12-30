import React, { useState } from 'react';
import { 
    ShieldAlert, 
    CheckCircle, 
    AlertTriangle, 
    XCircle, 
    Activity, 
    Lock, 
    Unlock,
    AlertOctagon,
    Info,
    Save,
    HelpCircle,
    Loader2
} from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';

const CompanyRisk = ({ risk }: { risk: any }) => {
    const [riskScore, setRiskScore] = useState(65);
    const [isProcessing, setIsProcessing] = useState<'suspend' | 'review' | 'complete' | null>(null);
    const [isQuarantined, setIsQuarantined] = useState(false);
    
    const [permissions, setPermissions] = useState({
        market: { canSell: true, canList: true, canEditPrice: true },
        service: { canReceiveRequests: true, canOffer: true },
        finance: { canWithdraw: false },
        social: { canPost: true, canComment: true }
    });

    const [riskFactors] = useState([
        { id: 1, label: 'Yüksek İade Oranı (%12)', severity: 'high' },
        { id: 2, label: 'Müşteri Şikayetlerinde Artış', severity: 'medium' },
        { id: 3, label: 'Belge Yenileme Yaklaşıyor', severity: 'low' },
    ]);

    const handlePermissionChange = (category: string, key: string) => {
        setPermissions(prev => {
            const cat = category as keyof typeof prev;
            const categoryObj = prev[cat] as Record<string, boolean>;
            return {
                ...prev,
                [cat]: { ...categoryObj, [key]: !categoryObj[key] }
            };
        });
    };

    const handleSuspend = () => {
        if(confirm("DİKKAT: Firmanın tüm ticari faaliyetleri durdurulacaktır. Devam etmek istiyor musunuz?")) {
            setIsProcessing('suspend');
            setTimeout(() => {
                setIsProcessing(null);
                setRiskScore(10);
                alert("Firma hesabı askıya alındı.");
            }, 1500);
        }
    };

    // TASK 30: İnceleme Başlat -> İncelemeyi Tamamla geçişi
    const handleRiskReview = () => {
        setIsProcessing('review');
        setTimeout(() => {
            setIsProcessing(null);
            setIsQuarantined(true);
            setPermissions(prev => ({
                ...prev,
                finance: { canWithdraw: false },
                market: { ...prev.market, canSell: false }
            }));
            alert("Risk incelemesi başlatıldı. Firma kısıtlı moda alındı.");
        }, 1200);
    };

    const handleCompleteReview = () => {
        setIsProcessing('complete');
        setTimeout(() => {
            setIsProcessing(null);
            setIsQuarantined(false);
            setPermissions(prev => ({
                ...prev,
                finance: { canWithdraw: true },
                market: { ...prev.market, canSell: true }
            }));
            setRiskScore(85);
            alert("İnceleme tamamlandı. Firma normal statüsüne döndürüldü.");
        }, 1200);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-2xl border-2 flex items-center justify-between relative group ${getScoreColor(riskScore)}`}>
                    <div>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase opacity-80 mb-1">
                            Güven Skoru 
                            <div className="relative group/tooltip">
                                <HelpCircle size={14} className="cursor-help" />
                                <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-900 text-white text-[10px] p-3 rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 shadow-2xl font-medium leading-relaxed border border-slate-700">
                                    <p className="font-bold text-blue-400 mb-1 uppercase tracking-wider">Hesaplama Parametreleri:</p>
                                    <ul className="space-y-1">
                                        <li>• Firma Yaşı (Platform Süresi)</li>
                                        <li>• Başarılı İş/Teslimat Oranı</li>
                                        <li>• Müşteri Şikayet/Çözüm Hızı</li>
                                        <li>• İade Oranı ve Sebepleri</li>
                                        <li>• Kimlik/Belge Doğrulama Durumu</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="text-4xl font-black">{riskScore}<span className="text-lg opacity-60">/100</span></div>
                        <span className="text-xs font-bold mt-2 inline-block px-2 py-1 bg-white/50 rounded-lg">
                            {riskScore >= 80 ? 'Düşük Risk' : riskScore >= 50 ? 'Orta Risk' : 'Yüksek Risk'}
                        </span>
                    </div>
                    <Activity size={48} className="opacity-20" />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <h4 className="text-slate-500 text-xs font-bold uppercase mb-2">Güvenlik Durumu</h4>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isQuarantined ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {isQuarantined ? <AlertOctagon size={20} /> : <CheckCircle size={20} />}
                        </div>
                        <div>
                            <span className="block font-bold text-slate-900">{isQuarantined ? 'İnceleme Altında' : 'Güvenli Profil'}</span>
                            <span className="text-xs text-slate-500">{isQuarantined ? 'İşlemler kısıtlı.' : 'Tüm belgeler onaylı.'}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center gap-3">
                    <button onClick={handleSuspend} disabled={isProcessing !== null} className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50">
                        {isProcessing === 'suspend' ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />} Hesabı Askıya Al
                    </button>
                    
                    {/* TASK 30: Dinamik buton değişimi */}
                    {isQuarantined ? (
                        <button onClick={handleCompleteReview} disabled={isProcessing !== null} className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white font-bold text-sm rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:opacity-50">
                            {isProcessing === 'complete' ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} İncelemeyi Tamamla
                        </button>
                    ) : (
                        <button onClick={handleRiskReview} disabled={isProcessing !== null} className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50">
                            {isProcessing === 'review' ? <Loader2 size={16} className="animate-spin" /> : <ShieldAlert size={16} />} Risk İncelemesi Başlat
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WidgetCard title="Risk Faktörleri" className="h-full">
                    <div className="space-y-4">
                        {riskFactors.map((factor) => (
                            <div key={factor.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <div className={`mt-0.5 ${factor.severity === 'high' ? 'text-red-500' : factor.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'}`}><AlertTriangle size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{factor.label}</p>
                                    <span className={`text-[10px] font-bold uppercase ${factor.severity === 'high' ? 'text-red-600' : factor.severity === 'medium' ? 'text-amber-600' : 'text-blue-600'}`}>
                                        {factor.severity === 'high' ? 'Kritik' : factor.severity === 'medium' ? 'Orta Seviye' : 'Bilgi'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Admin Notu Ekle</label>
                            <textarea className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" rows={3} placeholder="Risk durumu hakkında not..."></textarea>
                            <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Kaydet</button>
                        </div>
                    </div>
                </WidgetCard>

                <WidgetCard title="İzinler ve Yetkiler" className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">Market & Satış</h4>
                            <div className="space-y-3">
                                <PermissionToggle label="Market Satışı Yapabilir" desc="Ürün listeleme ve satış yetkisi." checked={permissions.market.canSell} onChange={() => handlePermissionChange('market', 'canSell')} />
                                <PermissionToggle label="Yeni Ürün Ekleyebilir" checked={permissions.market.canList} onChange={() => handlePermissionChange('market', 'canList')} />
                                <PermissionToggle label="Fiyat Güncelleyebilir" checked={permissions.market.canEditPrice} onChange={() => handlePermissionChange('market', 'canEditPrice')} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">Hizmet & Teklif</h4>
                            <div className="space-y-3">
                                <PermissionToggle label="Hizmet Talebi Alabilir" desc="Kullanıcı taleplerini görüntüleme." checked={permissions.service.canReceiveRequests} onChange={() => handlePermissionChange('service', 'canReceiveRequests')} />
                                <PermissionToggle label="Teklif Verebilir" checked={permissions.service.canOffer} onChange={() => handlePermissionChange('service', 'canOffer')} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">Finans</h4>
                            <div className="space-y-3">
                                <PermissionToggle label="Hakediş Çekebilir" desc="Otomatik ödeme talimatı." checked={permissions.finance.canWithdraw} onChange={() => handlePermissionChange('finance', 'canWithdraw')} isRisk={true} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">Sosyal</h4>
                            <div className="space-y-3">
                                <PermissionToggle label="İçerik Paylaşabilir" checked={permissions.social.canPost} onChange={() => handlePermissionChange('social', 'canPost')} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end pt-4 border-t border-slate-100">
                        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"><Save size={16} /> Değişiklikleri Kaydet</button>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

const PermissionToggle = ({ label, desc, checked, onChange, isRisk }: { label: string, desc?: string, checked: boolean, onChange: () => void, isRisk?: boolean }) => (
    <div className="flex items-start justify-between group">
        <div>
            <span className={`text-sm font-medium transition-colors ${checked ? 'text-slate-900' : 'text-slate-400 line-through'}`}>{label}</span>
            {desc && <p className="text-[10px] text-slate-400 leading-tight">{desc}</p>}
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
            <div className={`w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${checked ? (isRisk ? 'peer-checked:bg-amber-500' : 'peer-checked:bg-green-600') : ''}`}></div>
        </label>
    </div>
);

export default CompanyRisk;