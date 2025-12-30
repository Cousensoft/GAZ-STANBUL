
import { Company, Product, ServiceRequest, BlogPost, SocialPost, NewsItem } from '../types';

export const SECTORS = [
  { id: 'gas', name: 'Doğalgaz', icon: 'Flame' },
  { id: 'mechanical', name: 'Mekanik Tesisat', icon: 'Wrench' },
  { id: 'electric', name: 'Elektrik Sistemleri', icon: 'Zap' },
  { id: 'construction', name: 'İnşaat / Müteahhit', icon: 'HardHat' },
  { id: 'security', name: 'Güvenlik', icon: 'ShieldCheck' },
  { id: 'smart_home', name: 'Akıllı Ev', icon: 'Home' },
  { id: 'iot', name: 'IoT / Teknoloji', icon: 'Cpu' },
];

export const TURKEY_GEO: Record<string, string[]> = {
  "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Altındağ", "Pursaklar", "Gölbaşı", "Polatlı"],
  "İzmir": ["Konak", "Karşıyaka", "Bornova", "Buca", "Çiğli", "Gaziemir", "Balçova", "Narlıdere", "Güzelbahçe", "Bayraklı", "Karabağlar"]
};

export const DISTRICTS = TURKEY_GEO["İstanbul"];
export const CITIES = Object.keys(TURKEY_GEO).sort();

export const MAIN_CATEGORIES = [
  { id: '1', name: 'Isıtma Sistemleri' },
  { id: '2', name: 'Soğutma Sistemleri' },
  { id: '3', name: 'Elektrik & Elektronik' },
  { id: '4', name: 'Güvenlik Teknolojileri' }
];

export const SUB_CATEGORIES = [
  { id: '101', mainId: '1', name: 'Kombi Bakımı' },
  { id: '102', mainId: '1', name: 'Yerden Isıtma' },
  { id: '201', mainId: '2', name: 'Klima Montajı' }
];

export const MARKET_PROMO_ITEMS = [
  {
    title: 'ECA Proteus Lite',
    subtitle: 'Kompakt ve Güçlü',
    price: '18.450 ₺',
    oldPrice: '21.000 ₺',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#F9EADF]', // Pastel Beige
    textColor: 'text-slate-900',
    tag: 'Büyük Fırsat'
  },
  {
    title: 'Akıllı Termostat V3',
    subtitle: 'Tasarruf Modu Aktif',
    price: '1.250 ₺',
    oldPrice: '1.500 ₺',
    image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#F6E6E6]', // Pastel Pinkish
    textColor: 'text-slate-900',
    tag: '%15 İndirim'
  },
  {
    title: 'Güvenlik Kamerası',
    subtitle: '360° Gece Görüşlü',
    price: '2.800 ₺',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3d63?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#EBF4FA]', // Pastel Blue
    textColor: 'text-slate-900',
    tag: 'Akıllı Ev'
  },
  {
    title: 'Gaz Alarm Cihazı',
    subtitle: 'Hayat Kurtaran Teknoloji',
    price: '450 ₺',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#F5F5F5]', // Light Grey
    textColor: 'text-slate-900',
    tag: 'En İyi Fiyat'
  },
  {
    title: 'Endüstriyel Vana',
    subtitle: '3. Nesil Dayanıklılık',
    price: '850 ₺',
    oldPrice: '1.100 ₺',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#EAEFF8]', // Pastel Indigo
    textColor: 'text-slate-900',
    tag: '%25 Net İndirim'
  },
  {
    title: 'Proje Çizim Hizmeti',
    subtitle: 'Onay Garantili',
    price: '3.500 ₺',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop',
    bgColor: 'bg-[#F2F4F8]', // Slate White
    textColor: 'text-slate-900',
    tag: 'Yeni Eklendi'
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Bosphorus Enerji',
    sector: 'Doğalgaz',
    district: 'Kadıköy',
    rating: 4.8,
    isVerified: true,
    description: 'Profesyonel doğalgaz tesisat ve projelendirme hizmetleri.',
    phone: '0216 123 45 67',
    email: 'info@bosphorusenerji.com',
    address: 'Moda Cad. No:12',
    services: ['Proje Çizimi', 'Kombi Montajı', 'Tesisat'],
    logoUrl: 'https://ui-avatars.com/api/?name=Bosphorus+Enerji&background=ef4444&color=fff',
    coordinates: { lat: 40.9901, lng: 29.0292 }
  },
  {
    id: '2',
    name: 'Galata Mekanik',
    sector: 'Mekanik Tesisat',
    district: 'Beyoğlu',
    rating: 4.5,
    isVerified: true,
    description: 'Endüstriyel mekanik çözümler ve sıhhi tesisat.',
    phone: '0212 987 65 43',
    email: 'info@galatamekanik.com',
    address: 'İstiklal Cad. No:45',
    services: ['Sıhhi Tesisat', 'Yangın Sistemleri'],
    logoUrl: 'https://ui-avatars.com/api/?name=Galata+Mekanik&background=0369a1&color=fff',
    coordinates: { lat: 41.0335, lng: 28.9778 }
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'ECA Proteus Premix Kombi',
    category: 'Doğalgaz',
    brand: 'ECA',
    price: 18450,
    salePrice: 17500,
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    description: 'A++ enerji sınıfı, sessiz çalışma prensibi ve yüksek verimli yoğuşma teknolojisi.',
    rating: 4.9,
    reviews: 128,
    tag: 'gas',
    stock: 50
  },
  {
    id: '105',
    name: 'Smart Cam 360 Pro',
    category: 'Güvenlik',
    brand: 'Xiaomi',
    price: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2070&auto=format&fit=crop',
    description: 'Gece görüşlü, hareket sensörlü ve bulut kayıt özellikli 360 derece güvenlik kamerası.',
    rating: 4.8,
    reviews: 120,
    tag: 'security',
    stock: 3
  },
  {
    id: '106',
    name: 'Bass Pro İş Güvenliği Kulaklığı',
    category: 'IoT / Teknoloji',
    brand: '3M',
    price: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    description: 'Yüksek gürültülü ortamlarda maksimum koruma sağlayan profesyonel iş kulaklığı.',
    rating: 5.0,
    reviews: 1200,
    tag: 'iot',
    stock: 120
  },
  {
    id: '107',
    name: 'Robot Vacuum V2 Akıllı Süpürge',
    category: 'Akıllı Ev',
    brand: 'Roborock',
    price: 8900,
    salePrice: 7999,
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
    description: 'Lidar navigasyonlu, otomatik boşaltma istasyonlu yeni nesil robot süpürge.',
    rating: 4.4,
    reviews: 1000,
    tag: 'smart_home',
    stock: 8
  },
  {
    id: '109',
    name: 'PowerHub 2000 Enerji İstasyonu',
    category: 'Elektrik Sistemleri',
    brand: 'EcoFlow',
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1780&auto=format&fit=crop',
    description: 'Güneş paneli uyumlu, taşınabilir yüksek kapasiteli güç kaynağı.',
    rating: 4.9,
    reviews: 500,
    tag: 'electric',
    stock: 25
  },
  {
    id: '110',
    name: 'Sektörel Vana Pro X',
    category: 'Mekanik Tesisat',
    brand: 'Siemens',
    price: 2750,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=2028&auto=format&fit=crop',
    description: 'Yüksek basınca dayanıklı, sızdırmazlık garantili profesyonel vana sistemi.',
    rating: 4.7,
    reviews: 300,
    tag: 'mechanical',
    stock: 200
  }
];

export const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 'REQ-101',
    userId: 'user-bireysel',
    title: 'Kombi Bakımı ve Petek Temizliği',
    sector: 'Doğalgaz',
    district: 'Kadıköy',
    status: 'Acil',
    date: '2 saat önce',
    description: 'Kombimiz su akıtıyor ve petekler ısınmıyor. Acil bakım rica ediyoruz.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' }
    ]
  },
  {
    id: 'REQ-102',
    userId: 'user-mehmet',
    title: 'Kazan Dairesi Ses Sorunu',
    sector: 'Mekanik Tesisat',
    district: 'Üsküdar',
    status: 'Açık',
    date: '5 saat önce',
    description: 'Apartman kazan dairesinden garip sesler geliyor, videoyu ekledim. Kontrol edilmesi gerekiyor.',
    media: [
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop' }
    ]
  },
  {
    id: 'REQ-103',
    userId: 'user-selin',
    title: 'Mutfak Doğalgaz Tesisatı Değişimi',
    sector: 'Doğalgaz',
    district: 'Beşiktaş',
    status: 'Teklif Toplanıyor',
    date: '1 gün önce',
    description: 'Mutfak tadilatı nedeniyle doğalgaz borularının yerinin değiştirilmesi gerekiyor. Proje çizimi de lazım.',
    media: [
       { type: 'image', url: 'https://images.unsplash.com/photo-1556911220-e15595b6a281?q=80&w=800&auto=format&fit=crop' }
    ]
  }
];

export const MOCK_BLOG: BlogPost[] = [
  {
    id: '1',
    title: 'Kış Aylarında Doğalgaz Tasarrufu Nasıl Yapılır?',
    summary: 'Faturalarınızı düşürmek için uygulayabileceğiniz basit ama etkili yöntemler.',
    date: '24 Ekim 2024',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop',
    category: 'Rehber'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'İGDAŞ Altyapı Çalışmaları Hakkında Duyuru',
    source: 'İGDAŞ Basın',
    date: '25 Ekim 2024',
    summary: 'Kadıköy ve Üsküdar ilçelerinde planlı bakım çalışmaları nedeniyle gaz kesintisi yaşanacaktır.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=2070&auto=format&fit=crop',
    tag: 'Duyuru'
  }
];

export const MOCK_SOCIAL: SocialPost[] = [
  {
    id: '1',
    author: 'Mehmet Yılmaz',
    role: 'Makine Mühendisi',
    content: 'Bugün Kadıköy projesinde VRF klima sistemlerinin devreye alımını tamamladık. Harika bir iş oldu! 👍 #Mühendislik #İklimlendirme',
    likes: 45,
    shares: 5,
    timeAgo: '2 saat önce',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mehmet+Yilmaz&background=0d9488&color=fff'
  }
];