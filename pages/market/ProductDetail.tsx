
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_COMPANIES } from '../../utils/constants';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  Check, 
  Minus, 
  Plus, 
  CheckCircle,
  ChevronRight,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  CreditCard,
  Headphones,
  ArrowUpRight,
  ChevronDown,
  X
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import MarketNavbar from '../../components/market/MarketNavbar';
import { formatCurrency } from '../../utils/formatters';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [showNotification, setShowNotification] = useState(false);

  // Mock seller mapping
  const seller = MOCK_COMPANIES[0]; 

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct({
          ...found,
          rating: 4.8,
          reviews: 245,
          isExpressShipping: true,
          technicalDocuments: [
              { title: 'Kullanım Kılavuzu', url: '#', type: 'PDF' },
              { title: 'Teknik Çizim', url: '#', type: 'IMAGE' }
          ]
      });
    } else {
        navigate('/market');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  const images = [
    product.imageUrl, 
    'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // --- REVIEWS SECTION RENDERER (BİREBİR GÖRSEL TASARIMI) ---
  const renderReviewsTab = () => (
    <div className="animate-fade-in space-y-12">
        {/* Rating Summary Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            {/* Left: Big Score */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start min-w-[160px]">
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-slate-800 tracking-tight">4.8</span>
                    <span className="text-sm font-semibold text-slate-400">out of 5</span>
                </div>
                <div className="flex text-[#F5C34B] my-3 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" stroke="none" />)}
                </div>
                <p className="text-xs font-semibold text-slate-400">(245 Reviews)</p>
            </div>

            {/* Right: Distribution Bars */}
            <div className="flex-1 w-full max-w-xl space-y-3">
                {[
                    { star: 5, perc: 85 },
                    { star: 4, perc: 55 },
                    { star: 3, perc: 35 },
                    { star: 2, perc: 15 },
                    { star: 1, perc: 5 }
                ].map((row) => (
                    <div key={row.star} className="flex items-center gap-4 group">
                        <span className="text-xs font-semibold text-slate-500 w-12 whitespace-nowrap">{row.star} Star</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#F5C34B] transition-all duration-700" 
                                style={{ width: `${row.perc}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Review List Header */}
        <div className="space-y-10 border-t border-slate-50 pt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Review List</h3>
                    <p className="text-xs text-slate-400 mt-1">Showing 1-4 of 24 results</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Sort by :</span>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-bold text-slate-700">Newest</span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-12">
                {[
                    { 
                        id: 1, 
                        user: 'Kristin Watson', 
                        date: '1 month ago', 
                        title: 'Absolutely love this product!', 
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
                        stars: 5, 
                        images: ['https://picsum.photos/seed/p1/300/300', 'https://picsum.photos/seed/p2/300/300', 'https://picsum.photos/seed/p3/300/300'] 
                    },
                    { 
                        id: 2, 
                        user: 'Jenny Wilson', 
                        date: '2 month ago', 
                        title: 'Perfect for my routine!', 
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
                        stars: 5, 
                        images: [] 
                    },
                    { 
                        id: 3, 
                        user: 'Darlene Robertson', 
                        date: '2 month ago', 
                        title: 'Good value for money', 
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
                        stars: 4, 
                        images: [] 
                    }
                ].map((rev) => (
                    <div key={rev.id} className="group border-b border-slate-50 pb-12 last:border-0">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                                    <img src={`https://ui-avatars.com/api/?name=${rev.user}&background=random`} alt={rev.user} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-bold text-slate-800 text-sm">{rev.user}</h4>
                                        <span className="text-[10px] text-slate-400 font-medium">(Verified)</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">{rev.date}</p>
                        </div>

                        <div className="space-y-3">
                            <h5 className="font-bold text-slate-800 text-sm leading-tight">{rev.title}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">{rev.content}</p>
                            
                            <div className="flex items-center gap-2 pt-1">
                                <div className="flex text-[#F5C34B] gap-0.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.stars ? "currentColor" : "none"} stroke={i < rev.stars ? "none" : "#E2E8F0"} />)}
                                </div>
                                <span className="text-[11px] font-bold text-slate-700">{rev.stars.toFixed(1)}</span>
                            </div>

                            {/* Review Images Grid */}
                            {rev.images.length > 0 && (
                                <div className="flex gap-4 pt-4">
                                    {rev.images.map((img, idx) => (
                                        <div key={idx} className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 cursor-zoom-in hover:shadow-md transition-shadow">
                                            <img src={img} className="w-full h-full object-cover" alt="Review thumbnail" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Button */}
            <div className="flex justify-center pt-6">
                <button className="bg-slate-900 text-white px-10 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl">
                    Load More Reviews
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <MarketNavbar />
      
      {/* Toast Notification */}
      {showNotification && (
          <div className="fixed top-24 right-4 z-[100] animate-fade-in-up">
              <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="bg-green-50 rounded-full p-1"><Check size={14} strokeWidth={3} /></div>
                  <span className="font-bold text-sm">Ürün sepete eklendi!</span>
              </div>
          </div>
      )}

      {/* --- BREADCRUMBS --- */}
      <div className="bg-slate-50 pt-36 pb-4">
        <div className="container mx-auto px-4 md:px-8">
            <nav className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <Link to="/market" className="hover:text-red-600 transition-colors">Anasayfa</Link>
                <ChevronRight size={8} />
                <span className="hover:text-red-600 cursor-pointer" onClick={() => navigate('/market/products', { state: { initialCategory: product.category } })}>{product.category}</span>
                <ChevronRight size={8} />
                <span className="text-slate-900">{product.name}</span>
            </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT: GALLERY SECTION --- */}
            <div className="lg:col-span-5">
               <div className="relative aspect-square bg-slate-50 rounded-[32px] overflow-hidden mb-4 flex items-center justify-center border border-slate-100 group">
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name} 
                    className="w-4/5 h-4/5 object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all">
                          <ChevronRight size={16} className="rotate-180" />
                      </button>
                      <button onClick={() => setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))} className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all">
                          <ChevronRight size={16} />
                      </button>
                  </div>
               </div>

               <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                     <button 
                        key={idx} 
                        onClick={() => setSelectedImage(idx)} 
                        className={`aspect-square rounded-xl border-2 overflow-hidden p-1 transition-all ${selectedImage === idx ? 'border-red-600 bg-white shadow-md' : 'border-slate-100 bg-slate-50 opacity-60 hover:opacity-100'}`}
                     >
                        <img src={img} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                     </button>
                  ))}
               </div>
            </div>

            {/* --- RIGHT: INFO & PURCHASE SECTION --- */}
            <div className="lg:col-span-7 flex flex-col">
               <div className="mb-6">
                  <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.3em] mb-2 block">{product.category}</span>
                  <div className="flex justify-between items-start gap-4">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">{product.name}</h1>
                    <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 whitespace-nowrap">Stokta</div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                      <div className="flex text-[#F5C34B]">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} strokeWidth={2.5} />)}
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">4.8 ({product.reviews} Yorum)</span>
                  </div>

                  <div className="flex items-baseline gap-3 mt-6">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">{formatCurrency(product.price)}</span>
                      <span className="text-lg text-slate-300 font-bold line-through decoration-red-500/20">{formatCurrency(product.price * 1.2)}</span>
                  </div>

                  {/* Seller Card */}
                  <div 
                    onClick={() => navigate(`/market/store/${seller.id}`)}
                    className="mt-6 mb-6 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-6 cursor-pointer hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group/seller w-fit"
                  >
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white rounded-xl p-1 shadow-sm border border-slate-100 flex-shrink-0">
                            <img src={seller.logoUrl} className="w-full h-full object-cover rounded-lg" alt={seller.name} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Yetkili Satıcı</span>
                                <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[9px]">
                                    <Star size={8} fill="currentColor"/> {seller.rating}
                                </div>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm group-hover/seller:text-blue-600 transition-colors flex items-center gap-1">
                                {seller.name} 
                                <CheckCircle size={12} className="text-blue-500" fill="currentColor" color="white" />
                            </h4>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/seller:bg-blue-600 group-hover/seller:text-white group-hover/seller:border-blue-600 transition-all">
                        <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mt-4 max-w-2xl font-medium">
                      {product.description} İstanbul projelerinde en çok tercih edilen profesyonel çözüm ortağınız. Uzun ömür garantisi ile teknik altyapınıza değer katar.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-8">
                       <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-14">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors"><Minus size={16} strokeWidth={3}/></button>
                            <span className="w-10 text-center font-black text-slate-900 text-lg">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors"><Plus size={16} strokeWidth={3}/></button>
                       </div>
                       <button onClick={handleAddToCart} className="flex-1 min-w-[140px] h-14 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                           <ShoppingCart size={18} /> SEPETE EKLE
                       </button>
                       <button className="flex-1 min-w-[140px] h-14 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                           HEMEN AL
                       </button>
                       <button className="w-14 h-14 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-100 transition-all">
                           <Heart size={20} />
                       </button>
                  </div>
               </div>
            </div>
         </div>

         {/* --- CENTER: TABS SECTION --- */}
         <div className="mt-16">
            <div className="flex justify-center border-b border-slate-100 gap-8 md:gap-12">
                {[
                    { id: 'info', label: 'Ürün Açıklaması' },
                    { id: 'technical', label: 'Teknik Özellikler' },
                    { id: 'reviews', label: 'Yorumlar' }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full"></div>}
                    </button>
                ))}
            </div>
            
            <div className="py-12 max-w-5xl mx-auto">
                {activeTab === 'info' && (
                    <div className="animate-fade-in space-y-4 text-slate-600 text-sm leading-relaxed font-medium">
                        <p>Gazistanbul güvencesiyle sunulan bu ürün, İstanbul'un zorlu teknik standartları göz önünde bulundurularak seçilmiştir. Sektördeki usta görüşleri ve teknik veriler ışığında en iyi performans-fiyat dengesini sunar.</p>
                        <p>Ürün, profesyonel montaj ekiplerimiz tarafından incelenmiş ve tam onay almıştır. Akıllı sistem entegrasyonu sayesinde evinizdeki diğer Gazistanbul altyapı bileşenleri ile sorunsuz konuşabilir.</p>
                    </div>
                )}
                {activeTab === 'technical' && (
                    <div className="animate-fade-in bg-white rounded-2xl overflow-hidden border border-slate-200">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                {[
                                    { f: 'Üretim Yeri', d: 'Türkiye' },
                                    { f: 'Garanti Süresi', d: '24 Ay / Yerinde Servis' },
                                    { f: 'Enerji Sınıfı', d: 'A++ (Ultra Verimli)' },
                                    { f: 'Ağırlık', d: '14.5 Kilogram' },
                                    { f: 'Sertifikalar', d: 'CE, TSE, ISO 9001' }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 w-1/3 bg-slate-50 border-r border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-900">{row.f}</td>
                                        <td className="p-4 font-bold text-slate-700 text-xs">{row.d}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'reviews' && renderReviewsTab()}
            </div>
         </div>

         {/* --- BOTTOM: RELATED PRODUCTS --- */}
         <div className="mt-16 border-t border-slate-50 pt-16">
            <div className="text-center mb-10">
                <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.4em] mb-3 block">Tamamlayıcı Ürünler</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">İlgili Ürünleri Keşfedin</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {relatedProducts.map(p => (
                    <div key={p.id} onClick={() => navigate(`/market/product/${p.id}`)} className="bg-white rounded-[28px] border border-slate-100 p-4 hover:shadow-xl transition-all duration-500 cursor-pointer group flex flex-col">
                        <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4 group-hover:bg-white transition-colors relative">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-1">
                             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.category}</span>
                             <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500"><Star size={10} fill="currentColor"/> 4.8</div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-xs mb-3 truncate group-hover:text-red-600 transition-colors">{p.name}</h3>
                        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-base font-black text-slate-900 tracking-tighter">{formatCurrency(p.price)}</span>
                            <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"><ShoppingCart size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* --- SERVICE STRIP --- */}
         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-slate-100 text-center md:text-left">
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0"><Truck size={24}/></div>
                 <div><h4 className="font-bold text-slate-900 text-sm">Ücretsiz Kargo</h4><p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">500₺ üzeri siparişlerde</p></div>
             </div>
             <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><CreditCard size={24}/></div>
                 <div><h4 className="font-bold text-slate-900 text-sm">Güvenli Ödeme</h4><p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">SSL Sertifikalı Altyapı</p></div>
             </div>
             <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end">
                 <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"><Headphones size={24}/></div>
                 <div><h4 className="font-bold text-slate-900 text-sm">7/24 Destek</h4><p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Profesyonel Teknik Ekip</p></div>
             </div>
         </div>

      </div>
    </div>
  );
};

export default ProductDetail;
