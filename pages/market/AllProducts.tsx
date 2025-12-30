
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS, SECTORS } from '../../utils/constants';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Star, 
  ShoppingCart, 
  Heart, 
  Grid, 
  List, 
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import MarketNavbar from '../../components/market/MarketNavbar';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

const AllProducts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // --- FILTERS STATE ---
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string, max: string }>({ min: '', max: '' });
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Initial State from Navigation
  useEffect(() => {
    if (location.state && (location.state as any).initialCategory) {
        const category = (location.state as any).initialCategory;
        setSelectedCategories([category]);
        // Reset scroll to top
        window.scrollTo(0, 0);
    }
  }, [location]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, priceRange, minRating, sortBy, searchQuery]);

  // Mock Brands based on sector (Demo amaçlı statik liste)
  const brands = ['ECA', 'Demirdöküm', 'Vaillant', 'Bosch', 'Viessmann', 'Buderus', 'Siemens', 'Danfoss', 'Viko', 'Legrand', 'Xiaomi', 'Roborock'];

  // --- FILTER LOGIC ---
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const selectAllCategories = () => {
      setSelectedCategories([]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = useMemo(() => {
    // Generate more products for pagination demo by duplicating MOCK_PRODUCTS
    const allItems = Array.from({ length: 64 }).map((_, i) => {
        const base = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
        return { 
            ...base, 
            id: `${base.id}-${i}`, 
            // Randomize prices slightly for demo variety
            price: base.price + (i * 10),
            rating: Math.max(3, Math.min(5, (Math.random() * 2 + 3))).toFixed(1), 
            reviews: Math.floor(Math.random() * 200) + 10
        };
    });

    return allItems.filter(p => {
      // Search Filter
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      
      // Brand Filter (Using name check as mock products might not have brand field consistently populated)
      if (selectedBrands.length > 0) {
          const brandMatch = selectedBrands.some(b => p.name.includes(b) || (p.brand && p.brand === b));
          if (!brandMatch) return false;
      }

      // Price Filter
      const price = p.salePrice || p.price;
      if (priceRange.min && price < parseInt(priceRange.min)) return false;
      if (priceRange.max && price > parseInt(priceRange.max)) return false;

      // Rating Filter
      if (minRating && parseFloat(p.rating as any) < minRating) return false;

      return true;
    }).sort((a, b) => {
       const priceA = a.salePrice || a.price;
       const priceB = b.salePrice || b.price;
       
       if (sortBy === 'price_asc') return priceA - priceB;
       if (sortBy === 'price_desc') return priceB - priceA;
       if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
       // Featured: Demo logic (random sort or ID sort)
       return 0; 
    });
  }, [selectedCategories, selectedBrands, priceRange, minRating, sortBy, searchQuery]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pt-24">
      <MarketNavbar />
      
      <div className="container mx-auto px-4 md:px-8 py-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span onClick={() => navigate('/market')} className="cursor-pointer hover:text-slate-900 transition-colors">Anasayfa</span> 
                    <ChevronRight size={10} />
                    <span className="text-slate-900">Tüm Ürünler</span>
                </nav>
                <h1 className="text-3xl font-black text-slate-900">Tüm Ürünler</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Toplam {filteredProducts.length} ürün listeleniyor</p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
                {/* Mobile Filter Button */}
                <button 
                    onClick={() => setMobileFiltersOpen(true)}
                    className="md:hidden flex-1 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                    <Filter size={16} /> Filtrele
                </button>
                
                {/* Search Bar (In-page) */}
                <div className="relative group flex-1 md:flex-none md:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Ürün ara..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                </div>

                <div className="relative group flex-1 md:flex-none md:w-48">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 px-4 py-2.5 pr-10 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                        <option value="featured">Önerilen Sıralama</option>
                        <option value="price_asc">Fiyat (Artan)</option>
                        <option value="price_desc">Fiyat (Azalan)</option>
                        <option value="rating">Puana Göre</option>
                    </select>
                    <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="hidden md:flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                        <Grid size={18} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                        <List size={18} />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex gap-8 items-start">
            
            {/* --- SIDEBAR FILTERS (Desktop) --- */}
            <aside className="hidden md:block w-64 flex-shrink-0 sticky top-28 space-y-6">
                
                {/* Categories */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest flex items-center justify-between">
                        Kategoriler
                        {selectedCategories.length > 0 && <button onClick={selectAllCategories} className="text-[9px] text-red-500 font-bold hover:underline">Temizle</button>}
                    </h3>
                    <div className="space-y-2">
                        {/* Tümü Seçeneği */}
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategories.length === 0 ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                                {selectedCategories.length === 0 && <Check size={10} className="text-white" strokeWidth={4} />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={selectedCategories.length === 0}
                                onChange={selectAllCategories}
                            />
                            <span className={`text-sm ${selectedCategories.length === 0 ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>Tümü</span>
                        </label>

                        {/* Diğer Sektörler */}
                        {SECTORS.map((sector) => (
                            <label key={sector.id} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(sector.name) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                                    {selectedCategories.includes(sector.name) && <Check size={10} className="text-white" strokeWidth={4} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedCategories.includes(sector.name)}
                                    onChange={() => toggleCategory(sector.name)}
                                />
                                <span className={`text-sm ${selectedCategories.includes(sector.name) ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>{sector.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Fiyat Aralığı</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input 
                                type="number" 
                                placeholder="Min" 
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold outline-none focus:border-slate-900 focus:bg-white transition-all" 
                            />
                        </div>
                        <span className="text-slate-300">-</span>
                        <div className="relative flex-1">
                            <input 
                                type="number" 
                                placeholder="Max" 
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold outline-none focus:border-slate-900 focus:bg-white transition-all" 
                            />
                        </div>
                    </div>
                </div>

                {/* Brands */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Markalar</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                        {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                                    {selectedBrands.includes(brand) && <Check size={10} className="text-white" strokeWidth={4} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                />
                                <span className={`text-sm ${selectedBrands.includes(brand) ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                 {/* Rating */}
                 <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Puan</h3>
                    <div className="space-y-2">
                        {[4, 3, 2, 1].map((r) => (
                            <label key={r} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${minRating === r ? 'border-amber-500 bg-white' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                                    {minRating === r && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                                </div>
                                <input 
                                    type="radio" 
                                    name="rating"
                                    className="hidden" 
                                    checked={minRating === r}
                                    onChange={() => setMinRating(r)}
                                />
                                <div className="flex items-center gap-1">
                                    <div className="flex text-amber-400 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < r ? "currentColor" : "none"} stroke={i < r ? "none" : "currentColor"} className={i >= r ? "text-slate-200" : ""} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-500 font-bold">& Üzeri</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

            </aside>

            {/* --- PRODUCTS GRID --- */}
            <div className="flex-1">
                {currentProducts.length > 0 ? (
                    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                        {currentProducts.map((product) => {
                            const isDiscounted = !!product.salePrice;
                            return (
                                <div 
                                    key={product.id} 
                                    onClick={() => navigate(`/market/product/${product.id.split('-')[0]}`)}
                                    className={`bg-white rounded-3xl border border-slate-100 hover:shadow-2xl transition-all duration-500 cursor-pointer group flex ${viewMode === 'list' ? 'flex-row p-4 gap-6 items-center' : 'flex-col p-5'}`}
                                >
                                    {/* Image Area */}
                                    <div className={`${viewMode === 'list' ? 'w-48 h-48 p-4' : 'aspect-square mb-4 p-6'} bg-slate-50 rounded-2xl overflow-hidden relative`}>
                                        <img 
                                            src={product.imageUrl} 
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                                            alt={product.name}
                                        />
                                        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                                            <Heart size={16}/>
                                        </button>
                                        {isDiscounted && (
                                            <div className="absolute top-3 left-3 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                                                FIRSAT
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
                                            <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-500">
                                                <Star size={10} fill="currentColor"/> {product.rating || '4.8'}
                                            </div>
                                        </div>
                                        
                                        <h3 className={`font-bold text-slate-800 line-clamp-2 group-hover:text-red-600 transition-colors ${viewMode === 'list' ? 'text-lg mb-2' : 'text-xs mb-4 min-h-[2.5rem]'}`}>
                                            {product.name}
                                        </h3>
                                        
                                        {viewMode === 'list' && (
                                            <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
                                        )}

                                        <div className={`mt-auto flex items-center justify-between ${viewMode === 'grid' && 'pt-4 border-t border-slate-50'}`}>
                                            <div>
                                                {isDiscounted && <span className="block text-[9px] text-slate-400 line-through font-bold">{formatCurrency(product.price * 1.25)}</span>}
                                                <span className="text-base font-black text-slate-900 tracking-tighter">{formatCurrency(product.salePrice || product.price)}</span>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                                className={`bg-slate-900 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-slate-200 flex items-center justify-center ${viewMode === 'list' ? 'px-6 py-3 font-bold text-xs gap-2' : 'p-2.5'}`}
                                            >
                                                <ShoppingCart size={16}/>
                                                {viewMode === 'list' && "SEPETE EKLE"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Sonuç Bulunamadı</h3>
                        <p className="text-slate-500 mt-2 text-sm">Arama kriterlerinizi değiştirerek tekrar deneyiniz.</p>
                        <button 
                            onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setPriceRange({min:'', max:''}); setMinRating(null); setSearchQuery(''); }}
                            className="mt-6 text-red-600 font-bold text-sm hover:bg-red-50 px-6 py-2 rounded-xl transition-colors"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}

                {/* --- PAGINATION CONTROLS --- */}
                {filteredProducts.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-12 mb-8 animate-fade-in">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <button 
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                                            currentPage === page 
                                            ? 'bg-slate-900 text-white shadow-lg scale-110' 
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (
                                (page === currentPage - 2 && page > 1) ||
                                (page === currentPage + 2 && page < totalPages)
                            ) {
                                return <span key={page} className="text-slate-400 font-bold px-1">...</span>;
                            }
                            return null;
                        })}

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
              <div className="bg-white w-full sm:max-w-md h-[90vh] sm:h-auto sm:max-h-[80vh] rounded-t-[32px] sm:rounded-[32px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-fade-in-up">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                          <Filter size={20} className="text-slate-400" /> Filtrele
                      </h3>
                      <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                          <X size={20} />
                      </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      {/* Mobile Categories */}
                      <div>
                          <h4 className="font-bold text-slate-900 text-sm uppercase mb-4">Kategoriler</h4>
                          <div className="flex flex-wrap gap-2">
                              <button 
                                onClick={selectAllCategories}
                                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedCategories.length === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                              >
                                  Tümü
                              </button>

                              {SECTORS.map(s => (
                                  <button 
                                    key={s.id} 
                                    onClick={() => toggleCategory(s.name)}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedCategories.includes(s.name) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                                  >
                                      {s.name}
                                  </button>
                              ))}
                          </div>
                      </div>
                      
                      {/* Mobile Price */}
                      <div>
                          <h4 className="font-bold text-slate-900 text-sm uppercase mb-4">Fiyat Aralığı</h4>
                          <div className="flex gap-4">
                              <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none" />
                              <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none" />
                          </div>
                      </div>

                      {/* Mobile Brands */}
                      <div>
                          <h4 className="font-bold text-slate-900 text-sm uppercase mb-4">Markalar</h4>
                          <div className="flex flex-wrap gap-2">
                              {brands.map(b => (
                                  <button 
                                    key={b} 
                                    onClick={() => toggleBrand(b)}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedBrands.includes(b) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                                  >
                                      {b}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50">
                      <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-red-200">
                          Sonuçları Göster ({filteredProducts.length})
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default AllProducts;
