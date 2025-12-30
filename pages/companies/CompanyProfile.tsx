
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_COMPANIES } from '../../utils/constants';
import { MapPin, Phone, Mail, Globe, CheckCircle, Star, MessageSquare, Calendar, Clock, X, ChevronRight, ChevronDown, ChevronUp, User, FileText, Lock, ShieldCheck, AlertCircle, Info, Check, Quote, ExternalLink, Briefcase, Tag, Flame, Wrench, Zap, Thermometer, PenTool, Image as ImageIcon, PlayCircle, Award, ChevronLeft } from 'lucide-react';

const CompanyProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const company = MOCK_COMPANIES.find(c => c.id === id) || MOCK_COMPANIES[0];
  const [activeTab, setActiveTab] = useState('about');
  
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false); // Randevu Modalı
  const [selectedReference, setSelectedReference] = useState<any>(null); // Referans Detay Modalı
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(false);
  
  // Galeri State'i güncellendi: Artık index tutuyoruz
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  
  // Hizmetler Akordeon State'i (Varsayılan olarak hepsi açık)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Doğalgaz Sistemleri", "Mekanik Tesisat", "Merkezi Sistemler", "Elektrik & Enerji"
  ]);
  
  const [step, setStep] = useState(1);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });

  // --- MOCK DATA FOR NEW FEATURES ---
  const AUTHORIZED_BRANDS = [
      { name: 'E.C.A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/E.C.A._logo.svg/2560px-E.C.A._logo.svg.png' },
      { name: 'Demirdöküm', logo: 'https://upload.wikimedia.org/wikipedia/tr/6/64/DemirD%C3%B6k%C3%BCm_logo.png' },
      { name: 'Vaillant', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vaillant_Logo.svg/2560px-Vaillant_Logo.svg.png' },
      { name: 'Bosch', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/2560px-Bosch-logo.svg.png' },
      { name: 'Viessmann', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Viessmann_Logo.svg/2560px-Viessmann_Logo.svg.png' },
      { name: 'Buderus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Buderus_logo.svg/2560px-Buderus_logo.svg.png' }
  ];

  const GALLERY_MEDIA = [
      { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop', title: 'Tanıtım Filmi' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', title: 'Kazan Dairesi Kurulumu' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop', title: 'Endüstriyel Tesisat' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop', title: 'Yerden Isıtma' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', title: 'Ofis Çalışması' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1556911220-e15595b6a281?q=80&w=800&auto=format&fit=crop', title: 'Ekip Toplantısı' },
  ];

  useEffect(() => {
    if (location.state && (location.state as any).openBooking) {
        setIsModalOpen(true);
        window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Galeri Navigasyon Fonksiyonları
  const handleNextMedia = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedMediaIndex !== null) {
          setSelectedMediaIndex((prev) => (prev! + 1) % GALLERY_MEDIA.length);
      }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedMediaIndex !== null) {
          setSelectedMediaIndex((prev) => (prev! - 1 + GALLERY_MEDIA.length) % GALLERY_MEDIA.length);
      }
  };

  // 15 Günlük Pencere
  const getNext15Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return days;
  };

  const next15Days = getNext15Days();

  const handleDateToggle = (date: Date) => {
    const dateStr = date.toDateString();
    const isSelected = selectedDates.find(d => d.toDateString() === dateStr);

    if (isSelected) {
        setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateStr));
    } else {
        if (selectedDates.length < 3) {
            setSelectedDates([...selectedDates, date]);
        }
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep(3), 500);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setSelectedDates([]);
    setFormData({ name: '', phone: '', note: '' });
  };

  const handleRequestQuote = () => {
      navigate('/create-request', { 
          state: { 
              targetCompany: {
                  id: company.id,
                  name: company.name,
                  sector: company.sector
              } 
          } 
      });
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => 
        prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  // --- MOCK REFERENCES DATA ---
  const REFERENCES = [
    { 
        id: 1,
        title: 'Merkezi Sistem Dönüşümü', 
        img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
        category: 'Doğalgaz & Isıtma',
        date: 'Ekim 2023',
        location: 'Kadıköy, İstanbul',
        description: '32 dairelik sitenin merkezi kömürlü sistemden doğalgaz kaskad sistemine dönüşümü başarıyla tamamlandı. Proje kapsamında eski kazan dairesi söküldü, yeni bacalar monte edildi ve Buderus marka 2 adet 150kw kazan devreye alındı. Enerji verimliliği %40 artırıldı.',
        review: {
            user: 'Site Yönetimi (Ahmet Bey)',
            avatar: 'AY',
            rating: 5,
            comment: 'Süreç boyunca çok şeffaf ve temiz çalıştılar. Kış ortasında mağduriyet yaşatmadan 3 günde sistemi çalışır hale getirdiler. Teşekkürler.'
        }
    },
    { 
        id: 2,
        title: 'Endüstriyel Tesisat Kurulumu', 
        img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
        category: 'Sanayi',
        date: 'Ağustos 2023',
        location: 'Tuzla OSB',
        description: 'Metal işleme fabrikası için yüksek basınçlı hava ve doğalgaz hatlarının projelendirilmesi ve montajı. Tüm kaynak işlemleri sertifikalı personel tarafından yapılmış ve sızdırmazlık testleri başarıyla geçilmiştir.',
        review: null
    },
    { 
        id: 3,
        title: 'Akıllı Kazan Dairesi Otomasyonu', 
        img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
        category: 'Otomasyon',
        date: 'Mayıs 2024',
        location: 'Ataşehir, İstanbul',
        description: 'Mevcut kazan dairesine dış hava sensörlü ve uzaktan erişimli otomasyon panosu entegre edildi. Yönetici mobil uygulama üzerinden sıcaklıkları izleyebiliyor ve arıza durumunda anlık bildirim alıyor.',
        review: {
            user: 'Selin Yılmaz',
            avatar: 'SY',
            rating: 4.8,
            comment: 'Teknolojik altyapıları çok iyi. Uygulama üzerinden her şeyi kontrol edebiliyoruz.'
        }
    },
    { 
        id: 4,
        title: 'Villa Yerden Isıtma Projesi', 
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
        category: 'Bireysel Konut',
        date: 'Ocak 2024',
        location: 'Beykoz, İstanbul',
        description: '3 katlı villa için Rehau marka borularla yerden ısıtma sistemi döşendi. Her oda için ayrı termostat kontrolü sağlandı. Zemin şapı öncesi testler yapıldı.',
        review: {
            user: 'Caner Erkin',
            avatar: 'CE',
            rating: 5,
            comment: 'İşçilik kalitesi muazzam. Parkeler döşenmeden önce tüm testleri yaptılar, içimiz rahat.'
        }
    }
  ];

  // --- REVIEW RENDERER ---
  const renderReviewsTab = () => {
    const reviews = [
        { 
            id: 1, 
            user: 'Hakan Çelik', 
            date: '2 hafta önce', 
            title: 'Profesyonel ve Hızlı', 
            content: 'Kombi montajı için anlaştık. Ekip tam vaktinde geldi, çok temiz çalıştılar. İşçiliklerinden çok memnun kaldım, herkese tavsiye ederim.', 
            stars: 5, 
            images: [] 
        },
        { 
            id: 2, 
            user: 'Ayşe Yılmaz', 
            date: '1 ay önce', 
            title: 'İlgili Firma', 
            content: 'Doğalgaz projesi çizimi için çalıştık. Süreç boyunca bilgilendirme yaptılar. Onay süreci biraz uzadı ama firmadan kaynaklı değildi.', 
            stars: 4, 
            images: [] 
        },
        { 
            id: 3, 
            user: 'Mehmet Demir', 
            date: '2 ay önce', 
            title: 'Teşekkürler', 
            content: 'Petek temizliği yaptırdım, ısınma sorunum çözüldü. Fiyatları da piyasaya göre makul.', 
            stars: 5, 
            images: ['https://picsum.photos/seed/review1/300/300'] 
        }
    ];

    return (
        <div className="animate-fade-in space-y-12">
            {/* Rating Summary Section */}
            <div className="flex flex-col md:flex-row gap-12 items-center mb-10">
                {/* Left: Big Score */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start min-w-[160px]">
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-bold text-slate-800 tracking-tight">{company.rating}</span>
                        <span className="text-sm font-semibold text-slate-400">/ 5</span>
                    </div>
                    <div className="flex text-[#F5C34B] my-3 gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={22} fill={i < Math.floor(company.rating) ? "currentColor" : "none"} stroke={i < Math.floor(company.rating) ? "none" : "currentColor"} />)}
                    </div>
                    <p className="text-xs font-semibold text-slate-400">(124 Değerlendirme)</p>
                </div>

                {/* Right: Distribution Bars */}
                <div className="flex-1 w-full max-w-xl space-y-3">
                    {[
                        { star: 5, perc: 75 },
                        { star: 4, perc: 15 },
                        { star: 3, perc: 5 },
                        { star: 2, perc: 3 },
                        { star: 1, perc: 2 }
                    ].map((row) => (
                        <div key={row.star} className="flex items-center gap-4 group">
                            <span className="text-xs font-semibold text-slate-500 w-12 whitespace-nowrap">{row.star} Yıldız</span>
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
            <div className="space-y-8 border-t border-slate-50 pt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Değerlendirmeler</h3>
                        <p className="text-xs text-slate-400 mt-1">Toplam 124 yorumdan 3 tanesi gösteriliyor</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">Sırala:</span>
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors">
                            <span className="text-xs font-bold text-slate-700">En Yeniler</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-10">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="group border-b border-slate-50 pb-10 last:border-0">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={`https://ui-avatars.com/api/?name=${rev.user}&background=random`} alt={rev.user} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="font-bold text-slate-800 text-sm">{rev.user}</h4>
                                            <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5"><CheckCircle size={10}/> Doğrulanmış</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium">{rev.date}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#F5C34B] gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.stars ? "currentColor" : "none"} stroke={i < rev.stars ? "none" : "#E2E8F0"} />)}
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-sm">{rev.title}</h5>
                                </div>
                                
                                <p className="text-sm text-slate-500 leading-relaxed max-w-4xl">{rev.content}</p>

                                {/* Review Images Grid */}
                                {rev.images.length > 0 && (
                                    <div className="flex gap-4 pt-2">
                                        {rev.images.map((img, idx) => (
                                            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 cursor-zoom-in hover:shadow-md transition-shadow">
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
                <div className="flex justify-center pt-2">
                    <button className="bg-slate-50 text-slate-600 border border-slate-200 px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        Daha Fazla Yükle
                    </button>
                </div>
            </div>
        </div>
    );
  };

  // --- SERVICE GROUPS RENDERER (TABLO GÖRÜNÜMÜ) ---
  const renderServicesTab = () => {
    const serviceGroups = [
        {
            title: "Doğalgaz Sistemleri",
            icon: Flame,
            items: [
                { name: "Periyodik Kombi Bakımı", price: 850, desc: "Genel temizlik, filtre kontrolü ve gaz ayarı." },
                { name: "Doğalgaz Proje Çizimi", price: 3500, desc: "İGDAŞ onaylı mühendislik ve proje hizmeti." },
                { name: "Gaz Kaçağı Tespiti", price: null, desc: "Hassas cihazlarla kaçak tespiti ve onarım." }, // Fiyat Yok Örneği
                { name: "Ocak Dönüşümü & Montaj", price: 750, desc: "Flex boru değişimi ve sızdırmazlık testi." }
            ]
        },
        {
            title: "Mekanik Tesisat",
            icon: Wrench,
            items: [
                { name: "Petek Temizliği (Daire)", price: 1200, desc: "Makineli ve ilaçlı çift yönlü yıkama." },
                { name: "Su Kaçağı Tespiti", price: 900, desc: "Termal kamera ile kırmadan tespit." },
                { name: "Sıhhi Tesisat Yenileme", price: null, desc: "Banyo ve mutfak su tesisatı değişimi için keşif gerekir." } // Fiyat Yok
            ]
        },
        {
            title: "Merkezi Sistemler",
            icon: Thermometer,
            items: [
                { name: "Kazan Dairesi Bakımı", price: 2500, desc: "Brülör ayarı, baca analizi ve pompa kontrolü." },
                { name: "Kaskad Sistem Kurulumu", price: 15000, desc: "Çoklu kombi sistemi projelendirme ve montaj." }
            ]
        },
        {
            title: "Elektrik & Enerji",
            icon: Zap,
            items: [
                { name: "Kombi Sigorta Montajı", price: 450, desc: "Viko marka yüksek akım korumalı sigorta." },
                { name: "Oda Termostatı Montajı", price: 600, desc: "Kablosuz veya kablolu termostat kurulumu." }
            ]
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {serviceGroups.map((group, idx) => {
                const isOpen = expandedCategories.includes(group.title);
                
                return (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                        {/* Category Header (Collapsible) */}
                        <div 
                            onClick={() => toggleCategory(group.title)}
                            className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg border shadow-sm transition-colors ${isOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-100'}`}>
                                    <group.icon size={20} />
                                </div>
                                <h4 className="font-bold text-slate-800 text-base">{group.title}</h4>
                            </div>
                            <div className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                <ChevronDown size={20} />
                            </div>
                        </div>

                        {/* Services List (Visible only if open) */}
                        {isOpen && (
                            <div className="divide-y divide-slate-50 animate-fade-in">
                                {group.items.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50/50 transition-colors gap-4">
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h5>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[200px] shrink-0">
                                            <div className="text-right">
                                                {item.price && (
                                                    <>
                                                        <span className="block text-lg font-black text-red-600 tracking-tight leading-none">{item.price.toLocaleString('tr-TR')} ₺</span>
                                                        <span className="block text-[10px] text-slate-400 font-medium italic mt-0.5">'den başlayan fiyatlarla</span>
                                                    </>
                                                )}
                                            </div>
                                            <button 
                                                onClick={() => setIsModalOpen(true)}
                                                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap shadow-sm"
                                            >
                                                Randevu Al
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
  };

  // --- GALLERY RENDERER ---
  const renderGalleryTab = () => (
      <div className="animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_MEDIA.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedMediaIndex(idx)}
                    className="relative group rounded-xl overflow-hidden cursor-pointer aspect-square bg-slate-100"
                  >
                      <img src={item.type === 'video' ? item.thumbnail : item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          {item.type === 'video' ? (
                              <PlayCircle size={48} className="text-white fill-white/20" />
                          ) : (
                              <ImageIcon size={32} className="text-white" />
                          )}
                          <span className="text-white text-xs font-bold mt-2">{item.title}</span>
                      </div>
                      {item.type === 'video' && (
                          <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 backdrop-blur-sm">
                              <PlayCircle size={14} className="text-white" />
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 relative">
      
      {/* --- MEDIA LIGHTBOX (UPDATED) --- */}
      {selectedMediaIndex !== null && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setSelectedMediaIndex(null)}>
              
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white z-[130]"
                onClick={() => setSelectedMediaIndex(null)}
              >
                  <X size={32}/>
              </button>

              {/* Prev Button */}
              <button 
                 className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[130]"
                 onClick={handlePrevMedia}
              >
                  <ChevronLeft size={48} />
              </button>

              {/* Next Button */}
              <button 
                 className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[130]"
                 onClick={handleNextMedia}
              >
                  <ChevronRight size={48} />
              </button>

              {/* Media Content */}
              <div 
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center" 
                onClick={(e) => e.stopPropagation()} // Prevent close on media click
              >
                 {GALLERY_MEDIA[selectedMediaIndex].type === 'video' ? (
                     <video 
                        src={GALLERY_MEDIA[selectedMediaIndex].src} 
                        controls 
                        autoPlay 
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl outline-none"
                     >
                         Tarayıcınız video etiketini desteklemiyor.
                     </video>
                 ) : (
                     <img 
                        src={GALLERY_MEDIA[selectedMediaIndex].src} 
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
                        alt="Gallery Fullscreen" 
                     />
                 )}
                 
                 {/* Caption */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md text-white text-sm font-bold pointer-events-none">
                     {GALLERY_MEDIA[selectedMediaIndex].title} ({selectedMediaIndex + 1} / {GALLERY_MEDIA.length})
                 </div>
              </div>
          </div>
      )}

      {/* --- REFERENCE DETAIL MODAL --- */}
      {selectedReference && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedReference(null)}></div>
              <div className="bg-white rounded-[32px] w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]">
                  
                  {/* Left: Image */}
                  <div className="w-full md:w-1/2 bg-slate-100 h-64 md:h-auto relative group">
                      <img src={selectedReference.img} alt={selectedReference.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                      <div className="absolute bottom-4 left-4 text-white md:hidden">
                          <span className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase mb-1 inline-block">{selectedReference.category}</span>
                      </div>
                  </div>

                  {/* Right: Content */}
                  <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto custom-scrollbar">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <span className="hidden md:inline-block bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-2">
                                  {selectedReference.category}
                              </span>
                              <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedReference.title}</h2>
                          </div>
                          <button onClick={() => setSelectedReference(null)} className="p-2 bg-slate-50 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                              <X size={20} />
                          </button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6 border-b border-slate-100 pb-6">
                          <div className="flex items-center gap-1.5"><Calendar size={16} className="text-slate-400"/> {selectedReference.date}</div>
                          <div className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400"/> {selectedReference.location}</div>
                      </div>

                      <div className="prose prose-sm text-slate-600 mb-8 leading-relaxed">
                          <h4 className="text-slate-900 font-bold mb-2">Proje Detayları</h4>
                          <p>{selectedReference.description}</p>
                      </div>

                      {/* Client Review Section */}
                      {selectedReference.review ? (
                          <div className="mt-auto bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                              <Quote size={32} className="text-slate-200 absolute top-4 right-4" />
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                                      {selectedReference.review.avatar}
                                  </div>
                                  <div>
                                      <div className="font-bold text-slate-900 text-sm">{selectedReference.review.user}</div>
                                      <div className="flex text-amber-400 gap-0.5">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} size={10} fill={i < selectedReference.review.rating ? "currentColor" : "none"} />
                                          ))}
                                      </div>
                                  </div>
                              </div>
                              <p className="text-xs text-slate-600 italic leading-relaxed">"{selectedReference.review.comment}"</p>
                          </div>
                      ) : (
                          <div className="mt-auto p-4 border border-dashed border-slate-200 rounded-xl text-center">
                              <span className="text-xs text-slate-400 font-medium">Bu proje için henüz değerlendirme yapılmamış.</span>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* --- APPOINTMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={resetModal}></div>
            <div className="bg-white rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                
                <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Randevu İsteği Gönder</h3>
                        <p className="text-xs text-slate-500">{company.name}</p>
                    </div>
                    <button onClick={resetModal} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600">
                        <X size={16} />
                    </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {/* ... (Existing appointment modal content remains unchanged) ... */}
                    {step === 1 && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <Calendar size={18} className="text-red-600"/> Uygun Olduğunuz 3 Günü İşaretleyin
                                </h4>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedDates.length === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {selectedDates.length} / 3 SEÇİLDİ
                                </div>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                                {next15Days.map((date, idx) => {
                                    const dateStr = date.toDateString();
                                    const isSelected = selectedDates.find(d => d.toDateString() === dateStr);
                                    const isSunday = date.getDay() === 0;

                                    return (
                                        <button 
                                            key={idx}
                                            disabled={isSunday}
                                            onClick={() => handleDateToggle(date)}
                                            className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                                                isSelected 
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10' 
                                                : isSunday 
                                                    ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed' 
                                                    : 'bg-white text-slate-600 border-slate-100 hover:border-red-200'
                                            }`}
                                        >
                                            <span className={`text-[10px] font-bold uppercase mb-1 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                                                {date.toLocaleDateString('tr-TR', { weekday: 'short' })}
                                            </span>
                                            <span className="text-xl font-black">{date.getDate()}</span>
                                            <span className={`text-[9px] font-bold mt-1 uppercase ${isSelected ? 'text-white/50' : 'text-slate-300'}`}>
                                                {date.toLocaleDateString('tr-TR', { month: 'short' })}
                                            </span>
                                            {isSelected && <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><Check size={12} strokeWidth={4} /></div>}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-3">
                                <Info size={20} className="text-slate-400 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    Firma yetkilisi, seçtiğiniz bu 3 günden kendi programına en uygun olanı seçecek ve randevuyu onaylayacaktır. Seçiminizin ardından süreç panelinizden takip edilebilir.
                                </p>
                            </div>
                            
                            <button 
                                disabled={selectedDates.length !== 3}
                                onClick={() => setStep(2)}
                                className="w-full mt-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                            >
                                Devam Et <ChevronRight size={16} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleConfirm} className="p-6">
                             {/* ... (Existing Step 2 content) ... */}
                             <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tercih Ettiğiniz Günler</h4>
                                    <div className="flex gap-4">
                                        {selectedDates.sort((a,b) => a.getTime() - b.getTime()).map((d, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-center flex-1 border border-white/10">
                                                <span className="block text-[10px] font-bold text-slate-300 uppercase">{d.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>
                                                <span className="text-lg font-black">{d.getDate()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Ad Soyad</label>
                                    <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Telefon</label>
                                    <input required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Not (Opsiyonel)</label>
                                    <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none resize-none" rows={3} value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}></textarea>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 rounded-2xl bg-red-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all">
                                İsteği Kesinleştir
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="p-10 text-center flex flex-col items-center justify-center animate-fade-in">
                            {/* ... (Existing Step 3 content) ... */}
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">Başarıyla İletildi!</h3>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed">
                                Firma temsilcisi seçimlerinizi inceleyecek ve sizin için en uygun günü onaylayacaktır. Randevu durumu ile ilgili SMS ve e-posta ile bilgilendirileceksiniz.
                            </p>
                            <button onClick={resetModal} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all">Kapat</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Cover */}
      <div className="h-64 bg-slate-800 relative">
        <img src={`https://picsum.photos/seed/${company.id}cover/1200/400`} alt="Cover" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative -mt-20">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-32 h-32 bg-white rounded-2xl shadow-lg -mt-16 md:-mt-20 overflow-hidden border-4 border-white flex-shrink-0">
            <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 pt-2">
            <div className="flex flex-col md:flex-row md:justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                  {company.name}
                  {company.isVerified && <CheckCircle className="text-cyan-500" fill="currentColor" color="white" size={24} />}
                </h1>
                <p className="text-slate-500 text-lg">{company.sector} Çözümleri</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-amber-500 font-bold"><Star fill="currentColor" size={16}/> {company.rating}</span>
                  <span className="text-slate-400 text-sm">• 124 Değerlendirme</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 items-start">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={18} /> Randevu İsteği
                </button>
                
                <div 
                    className="relative"
                    onMouseEnter={() => setShowQuoteTooltip(true)}
                    onMouseLeave={() => setShowQuoteTooltip(false)}
                >
                    <button 
                        onClick={handleRequestQuote}
                        className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 relative z-10"
                    >
                        <Lock size={18} className="text-amber-400" /> Özel Fiyat Teklifi İste
                    </button>

                    {showQuoteTooltip && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-50 text-center animate-fade-in-up border border-slate-700">
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-b border-r border-slate-700 rotate-45"></div>
                            <div className="relative z-10">
                                <div className="flex justify-center mb-2">
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-amber-400">
                                        <Lock size={14} />
                                    </div>
                                </div>
                                <h4 className="font-bold text-sm mb-1 text-white">Doğrudan & Özel Teklif</h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Bu işlemle oluşturacağınız talep <u>genel iş havuzunda yayınlanmaz</u>. Sadece <strong>{company.name}</strong> yetkililerine iletilir ve size özel kalır.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
              <div className="flex border-b border-slate-100 overflow-x-auto">
                {['about', 'services', 'gallery', 'projects', 'reviews'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                  >
                    {tab === 'about' ? 'Hakkında' : tab === 'services' ? 'Hizmetler' : tab === 'gallery' ? 'Medya Galeri' : tab === 'projects' ? 'Referanslar' : 'Değerlendirmeler'}
                  </button>
                ))}
              </div>
              
              <div className="p-8">
                {activeTab === 'about' && (
                  <div className="animate-fade-in space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Firma Hakkında</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                        {company.description} 2100 yılından beri İstanbul'un altyapı ihtiyaçlarına modern çözümler sunuyoruz. 
                        Uzman kadromuz ve teknolojik ekipmanlarımızla müşteri memnuniyetini en üst düzeyde tutuyoruz.
                        </p>
                        <h4 className="font-bold text-slate-900 mb-3">Neden Biz?</h4>
                        <ul className="list-disc list-inside text-slate-600 space-y-2">
                        <li>7/24 Teknik Destek</li>
                        <li>Lisanslı Uzman Kadro</li>
                        <li>Garantili İşçilik</li>
                        <li>Ücretsiz Keşif İmkanı</li>
                        </ul>
                    </div>
                    
                    {/* Authorized Brands Section */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Award size={20} className="text-amber-500" /> Yetkili Bayilikler & Markalar
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {AUTHORIZED_BRANDS.map((brand, idx) => (
                                <div key={idx} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50 w-full sm:w-[calc(50%-8px)] hover:border-slate-300 transition-colors">
                                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center p-1">
                                        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">{brand.name}</span>
                                    <CheckCircle size={14} className="text-green-500 ml-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                )}
                {activeTab === 'services' && renderServicesTab()}
                {activeTab === 'gallery' && renderGalleryTab()}
                {activeTab === 'projects' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                     {REFERENCES.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedReference(item)}
                            className="rounded-xl overflow-hidden relative group h-48 cursor-pointer shadow-sm hover:shadow-lg transition-all"
                        >
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">{item.category}</span>
                              <h4 className="text-white font-bold text-sm leading-snug group-hover:text-red-400 transition-colors">{item.title}</h4>
                              <p className="text-slate-300 text-[10px] mt-1 line-clamp-1">{item.description}</p>
                           </div>
                           <div className="absolute top-3 right-3 bg-white/10 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <ExternalLink size={16} className="text-white" />
                           </div>
                        </div>
                     ))}
                  </div>
                )}
                {activeTab === 'reviews' && renderReviewsTab()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Trust Panel (New) */}
            {company.isVerified && (
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-slate-900 shadow-lg shadow-green-500/30">
                                <ShieldCheck size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Doğrulanmış Firma</h3>
                                <p className="text-xs text-slate-400">Gazistanbul Güven Rozeti</p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-xs font-medium text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> Vergi Levhası Onaylı</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> Faaliyet Belgesi Geçerli</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> İmza Sirküsü Kontrol Edildi</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> Kurumsal İletişim Doğrulandı</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4">İletişim Bilgileri</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <MapPin className="text-cyan-600 mt-1 flex-shrink-0" size={18} />
                  <span className="text-sm">{company.address}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Phone className="text-cyan-600 flex-shrink-0" size={18} />
                  <span className="text-sm">{company.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Mail className="text-cyan-600 flex-shrink-0" size={18} />
                  <span className="text-sm">{company.email}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Globe className="text-cyan-600 flex-shrink-0" size={18} />
                  <span className="text-sm">www.website.com</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                   <MessageSquare size={16} /> WhatsApp
                </button>
                <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                   Yol Tarifi
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Çalışma Saatleri</h3>
              <div className="text-sm text-slate-600 space-y-2">
                <div className="flex justify-between"><span>Hafta İçi</span> <span>09:00 - 18:00</span></div>
                <div className="flex justify-between"><span>Cumartesi</span> <span>09:00 - 14:00</span></div>
                <div className="flex justify-between text-red-500"><span>Pazar</span> <span>Kapalı</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
