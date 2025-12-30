
import React, { useState } from 'react';
import { 
    ArrowLeft, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    Star, 
    Package, 
    DollarSign, 
    CheckCircle, 
    XCircle, 
    Shield, 
    FileText,
    MoreHorizontal,
    ExternalLink,
    MessageSquare,
    Edit3,
    Lock,
    Ban,
    Trash2,
    Activity,
    X,
    Save,
    Send
} from 'lucide-react';
import { BarChart } from '../../../../components/admin/Charts';

const MarketVendorDetail = ({ vendorId, onBack }: { vendorId: number, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'documents'>('overview');
    
    // --- MODAL & DROPDOWN STATE ---
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<'message' | 'edit' | 'audit' | null>(null);
    const [messageText, setMessageText] = useState('');

    // Mock Data based on ID
    const [vendor, setVendor] = useState({
        id: vendorId,
        name: 'Bosphorus Enerji Market',
        owner: 'Ahmet Yılmaz',
        email: 'market@bosphorus.com',
        phone: '0850 300 44 55',
        website: 'www.bosphorusmarket.com',
        address: 'İkitelli OSB, Metal İş Sanayi Sitesi, Başakşehir/İstanbul',
        status: 'active',
        rating: 4.8,
        totalSales: '145.000₺',
        joinDate: '12.05.2023',
        commissionRate: '%10'
    });

    const vendorProducts = [
        { id: 101, name: 'Kombi Bağlantı Seti', price: '450₺', stock: 120, sales: 45 },
        { id: 102, name: 'Termostatik Vana', price: '250₺', stock: 50, sales: 12 },
        { id: 103, name: 'Doğalgaz Sayacı', price: '1.200₺', stock: 15, sales: 8 },
    ];

    const documents = [
        { name: 'Vergi Levhası', status: 'valid', date: '2024' },
        { name: 'İmza Sirküleri', status: 'valid', date: '2024' },
        { name: 'Faaliyet Belgesi', status: 'expired', date: '2023' },
    ];

    const auditLogs = [
        { id: 1, action: 'Giriş Yapıldı', ip: '192.168.1.1', date: '24.10.2024 14:30', user: 'Ahmet Yılmaz' },
        { id: 2, action: 'Ürün Eklendi (ID: 104)', ip: '192.168.1.1', date: '24.10.2024 15:45', user: 'Ahmet Yılmaz' },
        { id: 3, action: 'Fiyat Güncellendi', ip: '192.168.1.1', date: '23.10.2024 09:12', user: 'Ahmet Yılmaz' },
        { id: 4, action: 'Şifre Değiştirildi', ip: '88.241.x.x', date: '20.10.2024 11:00', user: 'Sistem Yöneticisi' },
    ];

    // --- ACTIONS ---
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Mesaj gönderildi: ${messageText}`);
        setMessageText('');
        setActiveModal(null);
    };

    const handleEditSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Satıcı bilgileri güncellendi.");
        setActiveModal(null);
    };

    const handleResetPassword = () => {
        if(confirm("Satıcının şifresini sıfırlamak ve e-posta ile yeni şifre göndermek istediğinize emin misiniz?")) {
            alert("Şifre sıfırlandı ve kullanıcıya iletildi.");
            setIsActionMenuOpen(false);
        }
    };

    const handleSuspend = () => {
        const newStatus = vendor.status === 'active' ? 'suspended' : 'active';
        if(confirm(`Bu satıcıyı ${newStatus === 'suspended' ? 'askıya almak' : 'aktif etmek'} istediğinize emin misiniz?`)) {
            setVendor({...vendor, status: newStatus});
            setIsActionMenuOpen(false);
        }
    };

    const handleDelete = () => {
        if(confirm("DİKKAT! Bu işlem geri alınamaz. Satıcıyı ve tüm verilerini silmek istediğinize emin misiniz?")) {
            alert("Satıcı silindi.");
            onBack();
        }
    };

    return (
        <div className="animate-fade-in space-y-6 relative">
            
            {/* --- MODALS --- */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
                    <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        
                        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-bold text-slate-900 text-lg">
                                {activeModal === 'message' && 'Satıcıya Mesaj Gönder'}
                                {activeModal === 'edit' && 'Satıcı Bilgilerini Düzenle'}
                                {activeModal === 'audit' && 'Denetim Kayıtları (Loglar)'}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* MESSAGE MODAL */}
                            {activeModal === 'message' && (
                                <form onSubmit={handleSendMessage} className="space-y-4">
                                    <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-xs flex items-center gap-2">
                                        <Shield size={14} /> Bu mesaj, satıcı panelinde "Sistem Mesajları" bölümüne düşecektir.
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Konu</label>
                                        <input type="text" className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" placeholder="Örn: Belge Eksikliği Hakkında" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Mesajınız</label>
                                        <textarea 
                                            rows={5}
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                                            placeholder="Mesajınızı buraya yazın..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 flex items-center justify-center gap-2">
                                        <Send size={16} /> Gönder
                                    </button>
                                </form>
                            )}

                            {/* EDIT MODAL */}
                            {activeModal === 'edit' && (
                                <form onSubmit={handleEditSave} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Firma Adı</label>
                                        <input type="text" defaultValue={vendor.name} className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Yetkili</label>
                                            <input type="text" defaultValue={vendor.owner} className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Komisyon Oranı</label>
                                            <input type="text" defaultValue={vendor.commissionRate} className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Telefon</label>
                                        <input type="tel" defaultValue={vendor.phone} className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Adres</label>
                                        <textarea rows={3} defaultValue={vendor.address} className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900 resize-none"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 flex items-center justify-center gap-2">
                                        <Save size={16} /> Değişiklikleri Kaydet
                                    </button>
                                </form>
                            )}

                            {/* AUDIT LOGS MODAL */}
                            {activeModal === 'audit' && (
                                <div className="space-y-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3">İşlem</th>
                                                    <th className="p-3">Kullanıcı</th>
                                                    <th className="p-3">IP</th>
                                                    <th className="p-3 text-right">Tarih</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {auditLogs.map((log) => (
                                                    <tr key={log.id}>
                                                        <td className="p-3 font-medium text-slate-900">{log.action}</td>
                                                        <td className="p-3 text-slate-600">{log.user}</td>
                                                        <td className="p-3 text-slate-500 text-xs font-mono">{log.ip}</td>
                                                        <td className="p-3 text-right text-slate-500 text-xs">{log.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-2xl border border-indigo-100">
                        {vendor.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            {vendor.name}
                            {vendor.status === 'active' 
                                ? <CheckCircle size={20} className="text-green-500 fill-white" />
                                : <XCircle size={20} className="text-red-500 fill-white" />
                            }
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1"><MapPin size={14}/> İstanbul</span>
                            <span>•</span>
                            <span>ID: #{vendor.id}</span>
                            <span>•</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${vendor.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {vendor.status === 'active' ? 'Aktif Satıcı' : 'Askıda'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 relative">
                    <button 
                        onClick={() => setActiveModal('message')}
                        className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        <MessageSquare size={16} /> Mesaj Gönder
                    </button>
                    
                    {/* Actions Button & Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2"
                        >
                            İşlemler <MoreHorizontal size={16} />
                        </button>

                        {/* Dropdown Menu */}
                        {isActionMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsActionMenuOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden animate-fade-in-up">
                                    <div className="p-1.5 space-y-0.5">
                                        <button 
                                            onClick={() => { setIsActionMenuOpen(false); setActiveModal('edit'); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                        >
                                            <Edit3 size={16} className="text-blue-500" /> Düzenle
                                        </button>
                                        <button 
                                            onClick={handleResetPassword}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                        >
                                            <Lock size={16} className="text-amber-500" /> Şifre Sıfırla
                                        </button>
                                        <button 
                                            onClick={() => { setIsActionMenuOpen(false); setActiveModal('audit'); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                        >
                                            <Activity size={16} className="text-slate-500" /> Log Kayıtları
                                        </button>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button 
                                            onClick={handleSuspend}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left"
                                        >
                                            <Ban size={16} className={vendor.status === 'active' ? "text-orange-500" : "text-green-500"} /> 
                                            {vendor.status === 'active' ? 'Hesabı Dondur' : 'Aktif Et'}
                                        </button>
                                        <button 
                                            onClick={handleDelete}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium"
                                        >
                                            <Trash2 size={16} /> Sil
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['overview', 'products', 'orders', 'documents'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all capitalize whitespace-nowrap ${
                            activeTab === tab 
                            ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                        }`}
                    >
                        {tab === 'overview' ? 'Genel Bakış' : tab === 'products' ? 'Ürünler' : tab === 'orders' ? 'Siparişler' : 'Belgeler'}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Toplam Satış</span>
                                    <div className="text-2xl font-black text-slate-900 mt-1">{vendor.totalSales}</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Mağaza Puanı</span>
                                    <div className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                                        {vendor.rating} <Star size={20} fill="currentColor"/>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Komisyon</span>
                                    <div className="text-2xl font-black text-indigo-600 mt-1">{vendor.commissionRate}</div>
                                </div>
                            </div>

                            {/* Performance Chart */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-6">Satış Performansı (Son 6 Ay)</h3>
                                <BarChart data={[{value: 40}, {value: 60}, {value: 45}, {value: 80}, {value: 55}, {value: 90}]} height={64} color="bg-indigo-500" />
                            </div>
                        </>
                    )}

                    {activeTab === 'products' && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ürün Adı</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fiyat</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Stok</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Satış Adedi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {vendorProducts.map(p => (
                                        <tr key={p.id} className="hover:bg-slate-50">
                                            <td className="p-4 font-bold text-slate-900">{p.name}</td>
                                            <td className="p-4 text-sm text-slate-600">{p.price}</td>
                                            <td className="p-4 text-sm text-slate-600">{p.stock}</td>
                                            <td className="p-4 text-sm font-bold text-green-600">{p.sales}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {documents.map((doc, i) => (
                                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><FileText size={20}/></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                                            <p className="text-xs text-slate-500">{doc.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${doc.status === 'valid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {doc.status === 'valid' ? 'Geçerli' : 'Süresi Dolmuş'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Right Column (Info Sidebar) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">İletişim Bilgileri</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="w-6"><Shield size={18} className="text-slate-400"/></span>
                                <div>
                                    <span className="block text-xs font-bold text-slate-500 uppercase">Yetkili</span>
                                    <span className="text-slate-900 font-medium">{vendor.owner}</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6"><Mail size={18} className="text-slate-400"/></span>
                                <div>
                                    <span className="block text-xs font-bold text-slate-500 uppercase">E-Posta</span>
                                    <span className="text-slate-900 font-medium">{vendor.email}</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6"><Phone size={18} className="text-slate-400"/></span>
                                <div>
                                    <span className="block text-xs font-bold text-slate-500 uppercase">Telefon</span>
                                    <span className="text-slate-900 font-medium">{vendor.phone}</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6"><Globe size={18} className="text-slate-400"/></span>
                                <div>
                                    <span className="block text-xs font-bold text-slate-500 uppercase">Web Sitesi</span>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                                        {vendor.website} <ExternalLink size={12}/>
                                    </a>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6"><MapPin size={18} className="text-slate-400"/></span>
                                <div>
                                    <span className="block text-xs font-bold text-slate-500 uppercase">Adres</span>
                                    <span className="text-slate-900 text-xs">{vendor.address}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Ödeme Bekleyen</h3>
                            <p className="text-slate-400 text-xs mb-4">Bu satıcının hesabına aktarılmayı bekleyen bakiye.</p>
                            <div className="text-3xl font-black text-green-400">12.450₺</div>
                            <button className="mt-4 w-full bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-sm font-bold">Ödeme Planla</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketVendorDetail;
