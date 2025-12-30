
export interface TechnicalDocument {
  title: string;
  url: string;
  type: 'PDF' | 'IMAGE';
}

export interface ProductVariant {
  id: string;
  name: string; // örn: Kapasite, Boru Çapı
  options: {
    label: string;
    priceModifier: number;
    stock: number;
  }[];
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  district: string;
  rating: number;
  isVerified: boolean;
  description: string;
  phone: string;
  email: string;
  address: string;
  services: string[];
  logoUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  avgShippingTime?: number; // Saat cinsinden
  authorizedBrands?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: number;
  salePrice?: number; // İndirimli fiyat
  sku?: string; // Stok Kodu
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  tag?: string;
  stock: number;
  // Yeni Teknik Alanlar
  isExpressShipping?: boolean;
  condition?: 'new' | 'refurbished';
  taxRate?: number; // Örn: 20
  variants?: ProductVariant[];
  technicalDocuments?: TechnicalDocument[];
}

export interface ServiceRequestMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // Video için kapak görseli
}

export interface ServiceRequest {
  id: string;
  userId: string;
  title: string;
  sector: string;
  district: string;
  status: 'Acil' | 'Açık' | 'Teklif Toplanıyor' | 'Tamamlandı' | 'İptal Edildi' | 'Özel Talep';
  date: string;
  description: string;
  targetCompanyId?: string;
  targetCompanyName?: string;
  media?: ServiceRequestMedia[]; // Medya desteği
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  imageUrl?: string;
  tag: 'Sektör' | 'Ekonomi' | 'Duyuru' | 'Belediye';
}

export interface SocialPost {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  shares: number;
  timeAgo: string;
  imageUrl?: string;
  avatarUrl: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'superadmin' | 'editor' | 'viewer';
  lastLogin: string;
  createdBy?: string;
}

export interface TechnicianJob {
  id: string;
  customerName: string;
  address: string;
  serviceType: string;
  status: 'assigned' | 'reviewing' | 'offered' | 'in_progress' | 'completed' | 'en_route';
  date: string;
  timeSlot: string;
  description: string;
  isAutoAssigned: boolean; // Otomatik atama mı?
  corporateOverride?: boolean; // Kurum mu atadı?
  price?: number;
  customerPhone?: string;
  coordinates?: { lat: number; lng: number };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'suspended';
  joinDate: string;
  completedJobs: number;
  rating: number;
  avatar?: string;
  role: 'manager' | 'worker'; // Yönetici veya Usta/Eleman
}