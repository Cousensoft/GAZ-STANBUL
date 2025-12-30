
import React from 'react';
import { 
    ArrowLeft, 
    Edit3, 
    Trash2, 
    Eye, 
    CheckCircle, 
    AlertCircle, 
    Package, 
    BarChart2, 
    MessageSquare,
    Link as LinkIcon
} from 'lucide-react';

const MarketProductDetail = ({ productId, onBack }: { productId: string, onBack: () => void }) => {
    // Mock Data based on ID
    const product = {
        id: productId,
        name: 'Akıllı Termostat X1',
        sku: 'GZ-101',
        category: 'Akıllı Ev',
        price: '1.250₺',
        stock: 45,
        seller: 'TechIstanbul',
        status: 'active',
        description: 'Wi-Fi özellikli, uzaktan kontrol edilebilir akıllı termostat. Enerji tasarrufu sağlar ve tüm kombi modelleri ile uyumludur.',
        images: [
            'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=400&auto=format&fit=crop&flip=h'
        ],
        stats: {
            views: 1250,
            sales: 85,
            returns: 2,
            rating: 4.7
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">SKU: {product.sku}</span>
                            <span>•</span>
                            <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                                {product.seller} <LinkIcon size={10}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Edit3 size={18} />
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Media & Status */}
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                    Yayında
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-slate-900 transition-colors">
                                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-300 text-slate-400 text-xs font-bold cursor-pointer hover:bg-slate-100">
                                +2
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Stok Durumu</h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Mevcut Stok</span>
                            <span className="text-xl font-bold text-slate-900">{product.stock} Adet</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[45%]"></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Stok seviyesi iyi durumda.</p>
                    </div>
                </div>

                {/* Middle Column: Details & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                            <Eye size={20} className="text-blue-500 mb-1"/>
                            <span className="text-xl font-black text-slate-900">{product.stats.views}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Görüntülenme</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                            <Package size={20} className="text-green-500 mb-1"/>
                            <span className="text-xl font-black text-slate-900">{product.stats.sales}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Satış</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                            <AlertCircle size={20} className="text-red-500 mb-1"/>
                            <span className="text-xl font-black text-slate-900">{product.stats.returns}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">İade</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                            <BarChart2 size={20} className="text-amber-500 mb-1"/>
                            <span className="text-xl font-black text-slate-900">{product.stats.rating}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Puan</span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Ürün Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                                <div className="text-slate-900 font-medium">{product.category}</div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Satış Fiyatı</label>
                                <div className="text-slate-900 font-black text-lg">{product.price}</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Açıklama</label>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><MessageSquare size={18}/> Son Değerlendirmeler</h3>
                            <button className="text-xs text-blue-600 font-bold hover:underline">Tümünü Gör</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-sm text-slate-800">Müşteri {i}</span>
                                        <div className="flex text-amber-400 text-xs">★★★★★</div>
                                    </div>
                                    <p className="text-xs text-slate-500">Ürün beklentimi karşıladı, kargo hızlıydı. Teşekkürler.</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarketProductDetail;
