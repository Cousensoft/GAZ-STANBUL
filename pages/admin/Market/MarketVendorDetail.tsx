import React, { useState } from 'react';
import { 
    ArrowLeft, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    Star, 
    CheckCircle, 
    XCircle, 
    Shield, 
    FileText,
    ExternalLink,
    MessageSquare,
    MoreHorizontal,
    Edit3,
    Lock,
    Activity,
    Ban,
    Trash2,
    X,
    Send,
    Save,
    CreditCard,
    Calendar,
    Wallet,
    ChevronRight,
    Package,
    Truck,
    Printer,
    Eye,
    TrendingUp,
    AlertCircle,
    ArrowUpRight,
    ShoppingCart,
    Percent
} from 'lucide-react';
import { BarChart } from '../../../components/admin/Charts';
import MarketProductDetail from './MarketProductDetail';
import MarketOrderDetail from './MarketOrderDetail';
import CompanyPerformance from '../modules/company/CompanyPerformance';

const MarketVendorDetail = ({ vendorId, onBack }: { vendorId: number, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'performance' | 'documents'>('overview');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
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
        pendingBalance: 12450,
        joinDate: '12.05.2023',
        commissionRate: 10,
        completedOrders: 42,
        activeProducts: 124,
        performance: {
            totalSales: 1450000,
            successRate: 92,
            totalOrders: 850,
            customerRating: 4.8,
            deliveryTime: 2.4,
            returnRate: 1.2,
            stockStatus: 'İyi',
            topProducts: [
                { name: 'Kombi X-Pro 2000', sales: 124 },
                { name: 'Yerden Isıtma Boru Seti', sales: 98 },
                { name: 'Akıllı Termostat G3', sales: 45 }
            ]
        },
    });

    const vendorOrders = [
        { id: 'ORD-3921', customer: 'Selin Yılmaz', date: '24.10.2024', total: '1.250₺', status: 'completed', items: 3 },
        { id: 'ORD-3922', customer: 'Mehmet Demir', date: '23.10.2024', total: '450₺', status: 'shipped', items: 1 },
        { id: 'ORD-3923', customer: 'Ayşe Kara', date: '22.10.2024', total: '2.100₺', status: 'processing', items: 5 },
    ];

    const vendorProducts = [
        { id: '101', name: 'Akıllı Termostat X1', sku: 'GZ-101', price: '1.250₺', stock: 45, status: 'active', category: 'Akıllı Ev' },
        { id: '102', name: 'Kombi Bağlantı Seti', sku: 'GZ-205', price: '450₺', stock: 12, status: 'low_stock', category: 'Yedek Parça' },
        { id: '103', name: 'Termostatik Vana', sku: 'GZ-442', price: '850₺', stock: 150, status: 'active', category: 'Mekanik' },
    ];

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newCommission = parseInt(formData.get('commission') as string);
        
        setVendor(prev => ({
            ...prev,
            name: formData.get('name') as string,
            commissionRate: newCommission
        }));
        
        setIsEditModalOpen(false);
        alert("Satıcı bilgileri ve komisyon oranı güncellendi.");
    };

    const renderOverview = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Toplam Ciro</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">{vendor.totalSales}</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><TrendingUp size={16}/></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-200 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Komisyon Oranı</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-indigo-600">%{vendor.commissionRate}</span>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform"><Percent size={16}/></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-emerald-200 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Ürün Sayısı</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">{vendor.activeProducts}</span>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform"><Package size={16}/></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-amber-200 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Mağaza Puanı</span>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-amber-500">{vendor.rating}</span>
                        <div className="p-2 bg-amber-50 text-amber-500 rounded-lg group-hover:scale-110 transition-transform"><Star size={16} fill="currentColor"/></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/> Satış Performansı (Son 6 Ay)
                    </h3>
                    <div className="h-48">
                        <BarChart data={[
                            {label: 'May', value: 40}, {label: 'Haz', value: 65}, {label: 'Tem', value: 45},
                            {label: 'Ağu', value: 80}, {label: 'Eyl', value: 55}, {label: 'Eki', value: 90}
                        ]} height={48} color="bg-slate-900" />
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ödeme Bekleyen</span>
                            <h3 className="text-3xl font-black mt-2 text-emerald-400">{vendor.pendingBalance.toLocaleString('tr-TR')} ₺</h3>
                            <p className="text-[10px] text-slate-400 mt-1">Gelecek Ödeme: 30.10.2024</p>
                            <button className="w-full mt-4 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-xs font-bold border border-white/10 uppercase tracking-widest">Ödeme Emri Ver</button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase pl-6">Ürün Bilgisi</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Kategori</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Fiyat</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Stok</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Durum</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-right pr-6">İşlem</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {vendorProducts.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="p-4 pl-6">
                                <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</div>
                            </td>
                            <td className="p-4 text-xs text-slate-600 font-medium">{p.category}</td>
                            <td className="p-4 text-sm font-black text-slate-900">{p.price}</td>
                            <td className="p-4 text-sm font-bold text-slate-600">{p.stock} Adet</td>
                            <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                    p.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                    {p.status === 'active' ? 'Satışta' : 'Kritik Stok'}
                                </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                                <button 
                                    onClick={() => setSelectedProduct(p)}
                                    className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all"
                                >
                                    <Eye size={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderOrders = () => (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase pl-6">Sipariş No</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Müşteri</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Tarih</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Tutar</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Durum</th>
                        <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-right pr-6">İşlem</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {vendorOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="p-4 pl-6 font-mono text-xs font-bold text-slate-600">{order.id}</td>
                            <td className="p-4 text-sm font-bold text-slate-900">{order.customer}</td>
                            <td className="p-4 text-xs text-slate-500">{order.date}</td>
                            <td className="p-4 text-sm font-black text-slate-900">{order.total}</td>
                            <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {order.status === 'completed' ? 'Teslim Edildi' : 
                                     order.status === 'shipped' ? 'Kargoda' : 'Hazırlanıyor'}
                                </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                                <button 
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all"
                                >
                                    <Eye size={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (selectedProduct) {
        return <MarketProductDetail productId={selectedProduct.id} onBack={() => setSelectedProduct(null)} />;
    }

    if (selectedOrder) {
        return <MarketOrderDetail orderId={selectedOrder.id} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div className="animate-fade-in space-y-6 relative pb-20">
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-900 text-lg">Satıcı Ayarlarını Düzenle</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mağaza Adı</label>
                                <input name="name" type="text" defaultValue={vendor.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Özel Komisyon Oranı (%)</label>
                                <div className="relative">
                                    <input name="commission" type="number" defaultValue={vendor.commissionRate} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Bu satıcıya özel komisyon oranı atanacaktır.</p>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">Değişiklikleri Kaydet</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200 text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-2xl border border-indigo-100 shadow-sm">
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
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                vendor.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>
                                {vendor.status === 'active' ? 'Aktif Satıcı' : 'Askıda'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2">
                        <Edit3 size={16} /> Düzenle
                    </button>
                    <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all border border-slate-200">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                    { id: 'overview', label: 'Genel Bakış', icon: Activity },
                    { id: 'performance', label: 'Performans', icon: TrendingUp },
                    { id: 'products', label: 'Ürünler', icon: Package },
                    { id: 'orders', label: 'Siparişler', icon: ShoppingCart },
                    { id: 'documents', label: 'Belgeler', icon: FileText },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
                            activeTab === tab.id 
                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                            : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
                        }`}
                    >
                        <tab.icon size={16}/>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'performance' && <CompanyPerformance performance={vendor.performance} />}
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'documents' && (
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 animate-fade-in">
                        <FileText size={48} className="mx-auto mb-4 opacity-10"/>
                        <p className="font-bold uppercase text-xs tracking-widest">Kurumsal belgeler listeleniyor...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketVendorDetail;