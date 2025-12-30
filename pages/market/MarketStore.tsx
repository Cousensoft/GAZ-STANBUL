
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES, MOCK_PRODUCTS } from '../../utils/constants';
import { 
  Star, 
  CheckCircle, 
  ShoppingCart, 
  Search,
  MessageSquare,
  ChevronRight,
  Heart,
  Zap,
  ChevronLeft,
  Percent,
  ArrowRight,
  Filter,
  ArrowUpDown,
  ChevronDown,
  User,
  Image as ImageIcon,
  MoreVertical
} from 'lucide-react';
import MarketNavbar from '../../components/market/MarketNavbar';
import { formatCurrency } from '../../utils/formatters';

const MarketStore: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Anasayfa');
  
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('Önerilenler');

  const allProductsBase = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const base = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
    return {
        ...base,
        id: `all-${base.id}-${i}`,
        sales: Math.floor(Math.random() * 500),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
    };
  }), []);

  const discountProducts = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    ...MOCK_PRODUCTS[i % MOCK_PRODUCTS.length],
    id: `promo-${MOCK_PRODUCTS[i % MOCK_PRODUCTS.length].id}-${i}`,
    isPromo: true
  })), []);

  const processedProducts = useMemo(() => {
    let result = [...allProductsBase];
    if (selectedCategory !== 'Tümü') {
        result = result.filter(p => p.category === selectedCategory);
    }
    switch (sortBy) {
        case 'En Yeniler':
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case 'En Beğenilenler':
            result.sort((a, b) => Number(b.rating) - Number(a.rating));
            break;
        case 'En Çok Satan':
            result.sort((a, b) => b.sales - a.sales);
            break;
        case 'Fiyat (Artan)':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'Fiyat (Azalan)':
            result.sort((a, b) => b.price - a.price);
            break;
        default: break;
    }
    return result;
  }, [allProductsBase, selectedCategory, sortBy]);

  useEffect(() => {
    const found = MOCK_COMPANIES.find(c => c.id === id);
    if(found) {
        setCompany({ ...found, avgShippingTime: 18, authorizedBrands: ['ECA', 'Demirdöküm', 'Vaillant'] });
    } else {
        setCompany(MOCK_COMPANIES[0]);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!company) return null;

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'Tüm Ürünler') {
        setSelectedCategory('Tümü');
        setSortBy('Önerilenler');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const storeCategories = ['Tümü', ...new Set(allProductsBase.map(p => p.category))];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <MarketNavbar />

      {/* Mağaza Üst Bilgi */}
      <div className="pt-28 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 flex-shrink-0">
                    <img src={company.logoUrl} className="w-full h-full object-cover rounded-xl" alt="Logo" />
                </div>
                <div>
                    <h1 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                        {company.name}
                        <CheckCircle size={14} className="text-blue-500" fill="currentColor" color="white" />
                    </h1>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1 text-amber-500"><Star size={10} fill="currentColor"/> {company.rating}</span>
                        <span>• 5.2B Takipçi</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-xl w-full">
                <div className="relative">
                    <input type="text" placeholder="Mağaza içinde ara..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500/10" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"><Search size={18}/></button>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="px-5 py-2.5 bg-red-600 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">Takip Et</button>
                <button className="p-2.5 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-all"><MessageSquare size={20}/></button>
            </div>
        </div>
        
        {/* Mağaza Menü */}
        <div className="container mx-auto px-4 md:px-8">
            <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                {['Anasayfa', 'Tüm Ürünler', 'Fırsat Ürünleri', 'Hakkında'].map((tab, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleTabChange(tab)}
                        className={`py-3 text-[11px] font-black uppercase tracking-[0.15em] border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-slate-400 hover:text-slate-900'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-6">
        
        {/* Sadece Anasayfa sekmesinde gösterilecek bloklar */}
        {activeTab === 'Anasayfa' && (
          <>
            {/* --- 1. HERO BANNER SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
                <div className="lg:col-span-8 h-[300px] md:h-[450px] bg-slate-900 rounded-[32px] overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1556911220-e15595b6a281?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Main Offer" />
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white pointer-events-none">
                        <span className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Yeni Yıl Fırsatları</span>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Teknik Altyapıda <br/> En İyi Çözümler</h2>
                        <button className="w-fit bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest pointer-events-auto hover:bg-red-600 hover:text-white transition-all shadow-xl">İncele</button>
                    </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4 h-[300px] md:h-[450px]">
                    <div className="flex-1 bg-indigo-900 rounded-[32px] overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Small 1" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h4 className="text-white font-bold text-lg leading-tight">Mutfak & Banyo <br/>Tesisat Yenileme</h4>
                        </div>
                    </div>
                    <div className="flex-1 bg-emerald-900 rounded-[32px] overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Small 2" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h4 className="text-white font-bold text-lg leading-tight">Akıllı Ev <br/>Sistemlerinde İndirim</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. CIRCLE CATEGORIES --- */}
            <div className="mb-12">
                <div className="flex items-center justify-center mb-6 px-2">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Mağaza Kategorileri</h3>
                </div>
                <div className="flex flex-row justify-between items-start gap-[15px] overflow-x-auto pb-4 hide-scrollbar">
                    {[
                        { name: 'Saklama Kapları', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200' },
                        { name: 'Tesisat Setleri', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200' },
                        { name: 'Kombi Parçaları', img: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=200' },
                        { name: 'Akıllı Vanalar', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200' },
                        { name: 'Ölçüm Cihazları', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200' },
                        { name: 'Aydınlatma', img: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=200' },
                        { name: 'Yedek Parça', img: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=200' },
                    ].map((cat, i) => (
                        <div key={i} className="flex-1 flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group min-w-[100px]">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-red-500 transition-all p-1 bg-white shadow-sm">
                                <img src={cat.img} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform" alt={cat.name} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 group-hover:text-red-600 transition-colors text-center leading-tight">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 3. DISCOUNTS SECTION --- */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[32px] p-6 md:p-10 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                    <Percent size={200} className="text-white fill-white" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-lg">
                            <Percent size={28} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">İndirimler</h2>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                        <span className="text-xs font-bold uppercase opacity-80">Kampanya Bitiş:</span>
                        <div className="flex gap-2">
                            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg font-black text-sm border border-white/10">02</div>
                            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg font-black text-sm border border-white/10">14</div>
                            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg font-black text-sm border border-white/10">52</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {discountProducts.slice(0, 9).map((p) => (
                        <div key={p.id} onClick={() => navigate(`/market/product/${p.id.split('-')[1]}`)} className="bg-white rounded-[24px] p-4 flex gap-4 hover:shadow-2xl transition-all cursor-pointer group">
                            <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={p.imageUrl} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" alt=""/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm truncate">{p.name}</h4>
                                <div className="flex items-center gap-1 text-amber-500 text-[10px] my-1 font-bold">
                                    <Star size={10} fill="currentColor"/> {p.rating}
                                </div>
                                <div className="mt-2">
                                    <span className="block text-[10px] text-slate-400 line-through font-bold">{(p.price * 1.3).toLocaleString('tr-TR')} ₺</span>
                                    <span className="text-lg font-black text-red-600">{formatCurrency(p.price)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center relative z-10">
                    <button 
                        onClick={() => handleTabChange('Fırsat Ürünleri')}
                        className="bg-white text-red-600 px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl flex items-center gap-3"
                    >
                        Tüm İndirimli Ürünler <ArrowRight size={18} />
                    </button>
                </div>
            </div>
          </>
        )}

        {/* --- DİNAMİK İÇERİK ALANI --- */}
        <div id="store-content-area" className={`${activeTab !== 'Anasayfa' ? 'mt-10' : 'mt-16'}`}>
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">
                        {activeTab === 'Anasayfa' ? 'Mağaza Vitrini' : activeTab}
                    </h3>
                    {activeTab === 'Tüm Ürünler' && (
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            {processedProducts.length} Ürün Listeleniyor
                        </p>
                    )}
                </div>

                {activeTab === 'Tüm Ürünler' && (
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                        <div className="pl-3 pr-1 text-slate-400"><ArrowUpDown size={14}/></div>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-xs font-black uppercase tracking-wider text-slate-700 outline-none pr-4 py-1.5 cursor-pointer"
                        >
                            <option>Önerilenler</option>
                            <option>En Yeniler</option>
                            <option>En Beğenilenler</option>
                            <option>En Çok Satan</option>
                            <option>Fiyat (Artan)</option>
                            <option>Fiyat (Azalan)</option>
                        </select>
                    </div>
                )}
            </div>

            {activeTab === 'Tüm Ürünler' && (
                <div className="mb-10 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {storeCategories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all whitespace-nowrap border ${
                                selectedCategory === cat 
                                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-100' 
                                : 'bg-white text-slate-500 border-slate-200 hover:border-red-400'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(activeTab === 'Tüm Ürünler' ? processedProducts : (activeTab === 'Fırsat Ürünleri' ? discountProducts : processedProducts.slice(0, 12))).map(product => {
                    const isPromoTab = activeTab === 'Fırsat Ürünleri';
                    const isDiscounted = isPromoTab || (product as any).isPromo || Math.random() > 0.8; 
                    
                    return (
                        <div key={product.id} onClick={() => navigate(`/market/product/${product.id.toString().split('-')[1]}`)} className="bg-white rounded-3xl border border-slate-100 hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col p-5">
                            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-4 p-6 relative">
                                <img src={product.imageUrl} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt=""/>
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                                    <Heart size={16}/>
                                </button>
                                {isDiscounted && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                                        FIRSAT
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
                                <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-500">
                                    <Star size={10} fill="currentColor"/> {product.rating || '4.8'}
                                </div>
                            </div>
                            <h3 className="text-xs font-bold text-slate-800 mb-4 line-clamp-2 min-h-[2.5rem] group-hover:text-red-600 transition-colors">{product.name}</h3>
                            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div>
                                    {isDiscounted && <span className="block text-[9px] text-slate-400 line-through font-bold">{(product.price * 1.25).toLocaleString('tr-TR')} ₺</span>}
                                    <span className="text-base font-black text-slate-900 tracking-tighter">{formatCurrency(product.price)}</span>
                                </div>
                                <div className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-slate-200">
                                    <ShoppingCart size={16}/>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-blue-600 transition-all z-50 group">
          <MessageSquare size={24} />
          <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap border border-slate-100">Satıcıyla Konuş</span>
      </button>
    </div>
  );
};

export default MarketStore;
