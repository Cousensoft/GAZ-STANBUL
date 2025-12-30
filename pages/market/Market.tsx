
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, SECTORS } from '../../utils/constants';
import { 
  ShoppingCart, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  Flame,
  Wrench,
  Zap,
  HardHat,
  Home,
  Cpu
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import MarketNavbar from '../../components/market/MarketNavbar';

const Market: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Helper to map sector IDs to images for the circular category view
  const getSectorImage = (id: string) => {
    switch(id) {
        case 'gas': return 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400&auto=format&fit=crop';
        case 'mechanical': return 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop';
        case 'electric': return 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=400&auto=format&fit=crop';
        case 'construction': return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop';
        case 'security': return 'https://images.unsplash.com/photo-1557324232-b8917d3c3d63?q=80&w=400&auto=format&fit=crop';
        case 'smart_home': return 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=400&auto=format&fit=crop';
        case 'iot': return 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=400&auto=format&fit=crop';
        default: return 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?q=80&w=400&auto=format&fit=crop';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame size={20} />;
      case 'Wrench': return <Wrench size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'HardHat': return <HardHat size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'Home': return <Home size={20} />;
      case 'Cpu': return <Cpu size={20} />;
      default: return <Wrench size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      <MarketNavbar />
      
      {/* 1. HERO SECTION (Reference: Top Banner) */}
      <div className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
         {/* Background Decor Elements */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F3F4F6] rounded-l-[100px] -z-10 hidden lg:block"></div>
         <div className="absolute top-20 right-20 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -z-10"></div>

         <div className="container mx-auto px-4 md:px-8">
             <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                 
                 {/* Text Content */}
                 <div className="lg:w-1/2 space-y-6 text-center lg:text-left animate-fade-in-up">
                     <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck size={14} /> %100 Güvenli Alışveriş
                     </div>
                     <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                         Tüm Mekanik & <br/>
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">Enerji İhtiyaçlarınız</span> <br/>
                         Tek Platformda.
                     </h1>
                     <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                         Kombiden endüstriyel vanalara, akıllı ev sistemlerinden yedek parçaya kadar binlerce onaylı ürün kapınızda.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button 
                            onClick={() => navigate('/market/products')} // Route would need to exist
                            className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Alışverişe Başla
                        </button>
                        <button className="text-slate-900 font-bold text-sm px-6 py-4 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all">
                            Tüm Markalar
                        </button>
                     </div>
                 </div>

                 {/* Hero Image */}
                 <div className="lg:w-1/2 flex justify-center relative animate-fade-in">
                     <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                         {/* Circle Behind */}
                         <div className="absolute inset-0 bg-[#E5E7EB] rounded-full scale-90"></div>
                         {/* Product Image */}
                         <img 
                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop" 
                            alt="Hero Product" 
                            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl mix-blend-multiply hover:scale-105 transition-transform duration-700 z-10"
                         />
                         {/* Badge */}
                         <div className="absolute top-10 right-10 z-20 bg-slate-900 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl animate-bounce-subtle border-4 border-white">
                             <span className="text-xs font-bold uppercase">Sadece</span>
                             <span className="text-xl font-black">14B ₺</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* 2. CATEGORIES SECTION (Reference: Circular Categories - Updated Sizes & Layout) */}
      <div className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-10">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sektörler</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Kategoriye Göre Alışveriş</h2>
              </div>
              
              <div className="flex flex-nowrap overflow-x-auto gap-4 md:gap-8 pb-4 hide-scrollbar justify-start md:justify-center px-2">
                  {SECTORS.map((sector, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => navigate('/market/products', { state: { initialCategory: sector.name } })}
                        className="group cursor-pointer flex flex-col items-center gap-3 flex-shrink-0 w-24 md:w-32"
                      >
                          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-slate-900 transition-all shadow-md relative bg-slate-50">
                              <img 
                                src={getSectorImage(sector.id)} 
                                alt={sector.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                              />
                              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors"></div>
                          </div>
                          <div className="text-center">
                              <h3 className="font-bold text-slate-900 text-xs md:text-sm group-hover:text-slate-600 transition-colors whitespace-nowrap">{sector.name}</h3>
                              <span className="text-[10px] text-slate-400 font-medium hidden md:block">240+ Ürün</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. PROMO BANNERS (Reference: Two large side-by-side banners) */}
      <div className="py-16 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Banner 1: Light Theme */}
              <div className="bg-[#F3F4F6] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1">
                  <div className="flex-1 relative z-10 space-y-4 text-center md:text-left">
                      <div className="inline-block bg-white text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                          Kış Kampanyası
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                          Isınma <br/> Çözümleri
                      </h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Kombi, radyatör ve oda termostatlarında geçerli %25'e varan indirimler başladı.
                      </p>
                      <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg">
                          Fırsatları Gör <ArrowRight size={14} />
                      </button>
                  </div>
                  <div className="w-full md:w-1/2 aspect-square relative z-10 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop" 
                        alt="Heating" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                  </div>
                  {/* Decorative Blob */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
              </div>

              {/* Banner 2: Dark Theme */}
              <div className="bg-[#1E293B] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1">
                  <div className="flex-1 relative z-10 space-y-4 text-center md:text-left">
                      <div className="inline-block bg-slate-700 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm border border-slate-600">
                          Teknoloji
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                          Akıllı Ev <br/> Sistemleri
                      </h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">
                          Güvenlik ve konforu bir arada sunan yeni nesil IoT cihazları ile evinizi yönetin.
                      </p>
                      <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-lg">
                          Şimdi Keşfet <ArrowRight size={14} />
                      </button>
                  </div>
                  <div className="w-full md:w-1/2 aspect-square relative z-10 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=600&auto=format&fit=crop" 
                        alt="Smart Home" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                  </div>
                  {/* Decorative Blob */}
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
              </div>

          </div>
      </div>

      {/* 4. FEATURED PRODUCTS (Grid Layout) */}
      <div className="py-16 container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
              <div>
                  <h2 className="text-3xl font-bold text-slate-900">Trend Ürünler</h2>
                  <div className="h-1 w-20 bg-slate-900 mt-2 rounded-full"></div>
              </div>
              <button className="text-slate-500 font-bold text-sm hover:text-slate-900 flex items-center gap-1 transition-colors">
                  Tümünü Gör <ChevronRight size={16}/>
              </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {MOCK_PRODUCTS.slice(0, 5).map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                      <div className="bg-white rounded-3xl p-6 relative overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[3/4] flex flex-col justify-between">
                          
                          {/* Wishlist Button */}
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
                                  <ShoppingCart size={14}/>
                              </button>
                          </div>

                          <div className="flex-1 flex items-center justify-center p-2">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                              />
                          </div>

                          <div className="text-center pt-4">
                              <div className="flex justify-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                                  ))}
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                              <p className="text-xs text-slate-500 mb-2">{product.brand}</p>
                              
                              <div className="flex items-center justify-center gap-2">
                                  {product.salePrice ? (
                                      <>
                                          <span className="text-slate-400 text-xs line-through font-bold">{formatCurrency(product.price)}</span>
                                          <span className="text-red-600 font-black text-sm">{formatCurrency(product.salePrice)}</span>
                                      </>
                                  ) : (
                                      <span className="text-slate-900 font-black text-sm">{formatCurrency(product.price)}</span>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 5. BOTTOM INFO SECTION (Reference: Your Journey...) */}
      <div className="mt-12 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-8 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left: Image Grid */}
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4 mt-8">
                          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg w-full object-cover h-48" alt="Team"/>
                          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg w-full object-cover h-64" alt="Industrial"/>
                      </div>
                      <div className="space-y-4">
                          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg w-full object-cover h-64" alt="Boiler"/>
                          <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg w-full object-cover h-48" alt="Pipes"/>
                      </div>
                  </div>

                  {/* Right: Content */}
                  <div>
                      <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">Hakkımızda</span>
                      <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                          Profesyonellerin <br/> Bir Numaralı Tercihi
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-8">
                          GazMarket, sektördeki en güvenilir markaları ve tedarikçileri bir araya getirerek işinizi kolaylaştırır. 
                          Binlerce onaylı ürün, garantili alışveriş ve profesyonel lojistik ağı ile projeleriniz asla yarım kalmaz.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <div className="flex gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                                  <Truck size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Hızlı Teslimat</h4>
                                  <p className="text-xs text-slate-500 mt-1">Aynı gün kargo imkanı.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                                  <CreditCard size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Güvenli Ödeme</h4>
                                  <p className="text-xs text-slate-500 mt-1">256-bit SSL koruması.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                                  <ShieldCheck size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Orijinal Ürün</h4>
                                  <p className="text-xs text-slate-500 mt-1">Yetkili satıcı garantisi.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100">
                                  <Phone size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900">7/24 Destek</h4>
                                  <p className="text-xs text-slate-500 mt-1">Uzman teknik ekip.</p>
                              </div>
                          </div>
                      </div>

                      <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-xl">
                          Daha Fazla Bilgi
                      </button>
                  </div>

              </div>
          </div>
      </div>

    </div>
  );
};

export default Market;
