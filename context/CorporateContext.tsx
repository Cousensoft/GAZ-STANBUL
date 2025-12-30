import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShieldCheck, Bell, CheckCircle, XCircle } from 'lucide-react';

// --- TYPES ---

export interface CorporateNotification {
  id: string;
  type: 'system' | 'finance' | 'customer';
  title: string;
  text: string;
  date: string;
  icon: any;
  color: 'red' | 'blue' | 'green' | 'amber';
}

export interface CompanyDocument {
  id: string;
  name: string;
  uploadDate: string;
  nextReviewDate: string;
  status: 'active' | 'pending' | 'needs_review';
  type: string;
}

export interface CorporateRequest {
  id: string;
  customerName: string;
  customerAvatar: string;
  serviceType: string;
  date: string;
  status: 'new' | 'read' | 'offered' | 'completed' | 'cancelled';
  district: string;
  description: string;
  urgency: 'normal' | 'urgent';
  targetCompanyId?: string;
}

export interface CorporateOffer {
  id: string;
  requestId: string;
  requestTitle: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'revision_requested';
  date: string;
  validUntil: string; // 'Süresiz' veya Tarih stringi
}

export interface CorporateProject {
  id: string;
  title: string;
  customer: string;
  status: 'planning' | 'active' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
}

export interface CorporateFinanceStats {
  totalEarnings: number;
  pendingPayments: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  invoices: { id: string, date: string, amount: number, status: 'paid' | 'unpaid', customer: string }[];
}

export interface CorporateSocialPost {
  id: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
  status: 'published' | 'scheduled';
}

interface CorporateContextType {
  requests: CorporateRequest[];
  offers: CorporateOffer[];
  projects: CorporateProject[];
  finance: CorporateFinanceStats;
  socialPosts: CorporateSocialPost[];
  documents: CompanyDocument[];
  notifications: CorporateNotification[];
  currentCompanyId: string;
  
  // Actions
  sendOffer: (requestId: string, amount: number, note: string, validityDays: number | 'indefinite') => void;
  rejectOffer: (offerId: string) => void;
  updateRequestStatus: (id: string, status: CorporateRequest['status']) => void;
  addSocialPost: (post: Omit<CorporateSocialPost, 'id' | 'likes' | 'comments'>) => void;
  uploadDocument: (name: string, type: string) => void;
  deleteDocument: (id: string) => void;
  addNotification: (notif: Omit<CorporateNotification, 'id' | 'date'>) => void;
}

const CorporateContext = createContext<CorporateContextType | undefined>(undefined);

export const CorporateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentCompanyId = 'corp-1'; 

  const [requests, setRequests] = useState<CorporateRequest[]>([
    { id: 'REQ-101', customerName: 'Bireysel Test', customerAvatar: 'BT', serviceType: 'Kombi Bakımı', date: '2 saat önce', status: 'new', district: 'Kadıköy', description: 'Kombi su akıtıyor, acil bakım gerekli.', urgency: 'urgent' },
    { id: 'REQ-102', customerName: 'Selin Demir', customerAvatar: 'SD', serviceType: 'Elektrik Tesisatı', date: '5 saat önce', status: 'read', district: 'Beşiktaş', description: 'Tüm daire elektrik tesisatı yenilenecek.', urgency: 'normal' },
    { id: 'REQ-103', customerName: 'Mehmet Öz', customerAvatar: 'MÖ', serviceType: 'Akıllı Ev', date: '1 gün önce', status: 'offered', district: 'Ataşehir', description: 'Otomasyon sistemi kurulumu için teklif rica ediyorum.', urgency: 'normal' },
    { id: 'REQ-999', customerName: 'Zeynep Kaya', customerAvatar: 'ZK', serviceType: 'Özel Proje Danışmanlığı', date: '10 dk önce', status: 'new', district: 'Sarıyer', description: 'Sadece firmanızdan projelendirme hizmeti almak istiyorum.', urgency: 'normal', targetCompanyId: 'corp-1' },
  ]);

  const [offers, setOffers] = useState<CorporateOffer[]>([
    { id: 'OFF-101', requestId: 'REQ-101', requestTitle: 'Kombi Bakımı', customerName: 'Bireysel Test', amount: 1500, status: 'pending', date: '2 saat önce', validUntil: '30.10.2024' }
  ]);

  const [notifications, setNotifications] = useState<CorporateNotification[]>([
    { id: '1', type: 'system', title: 'Hoş Geldiniz', text: 'Gazistanbul kurumsal panele hoş geldiniz. Profilinizi tamamlayarak daha fazla talep alabilirsiniz.', date: '1 gün önce', icon: ShieldCheck, color: 'blue' }
  ]);

  const [projects, setProjects] = useState<CorporateProject[]>([]);
  const [finance, setFinance] = useState<CorporateFinanceStats>({
    totalEarnings: 450000, pendingPayments: 32000, thisMonthEarnings: 85000, lastMonthEarnings: 72000, invoices: []
  });
  const [socialPosts, setSocialPosts] = useState<CorporateSocialPost[]>([]);

  const [documents, setDocuments] = useState<CompanyDocument[]>([
    { id: 'DOC-01', name: 'Vergi Levhası', uploadDate: '15.10.2023', nextReviewDate: '15.10.2024', status: 'needs_review', type: 'PDF' },
    { id: 'DOC-02', name: 'Ticaret Sicil Gazetesi', uploadDate: '20.05.2024', nextReviewDate: '20.05.2025', status: 'active', type: 'PDF' }
  ]);

  const addNotification = (notif: Omit<CorporateNotification, 'id' | 'date'>) => {
    const newNotif: CorporateNotification = {
      ...notif,
      id: `NOT-${Date.now()}`,
      date: 'Şimdi'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const sendOffer = (requestId: string, amount: number, note: string, validityDays: number | 'indefinite') => {
    let validUntil = 'Süresiz';
    if (validityDays !== 'indefinite') {
        const date = new Date();
        date.setDate(date.getDate() + validityDays);
        validUntil = date.toLocaleDateString('tr-TR');
    }

    const request = requests.find(r => r.id === requestId);

    const newOffer: CorporateOffer = {
        id: `OFF-${Date.now()}`, 
        requestId, 
        requestTitle: request?.serviceType || 'Yeni Teklif', 
        customerName: request?.customerName || 'Müşteri',
        amount, 
        status: 'pending', 
        date: new Date().toLocaleDateString('tr-TR'),
        validUntil
    };
    setOffers(prev => [newOffer, ...prev]);
    updateRequestStatus(requestId, 'offered');
  };

  const rejectOffer = (offerId: string) => {
    const targetOffer = offers.find(o => o.id === offerId);
    if (targetOffer) {
      setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'rejected' } : o));
      
      addNotification({
        type: 'customer',
        title: 'Teklif Reddedildi',
        text: `"${targetOffer.requestTitle}" hizmeti için ilettiğiniz ${targetOffer.amount}₺ tutarındaki teklif müşteri tarafından reddedildi.`,
        icon: XCircle,
        color: 'red'
      });
    }
  };

  const updateRequestStatus = (id: string, status: CorporateRequest['status']) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addSocialPost = (post: Omit<CorporateSocialPost, 'id' | 'likes' | 'comments'>) => {
    const newPost: CorporateSocialPost = { id: `P-${Date.now()}`, likes: 0, comments: 0, ...post };
    setSocialPosts(prev => [newPost, ...prev]);
  };

  const uploadDocument = (name: string, type: string) => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    const newDoc: CompanyDocument = {
        id: `DOC-${Date.now()}`,
        name,
        type: type.toUpperCase(),
        uploadDate: today.toLocaleDateString('tr-TR'),
        nextReviewDate: nextYear.toLocaleDateString('tr-TR'),
        status: 'active'
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <CorporateContext.Provider value={{ 
        requests, offers, projects, finance, socialPosts, documents, notifications, currentCompanyId, 
        sendOffer, rejectOffer, updateRequestStatus, addSocialPost, uploadDocument, deleteDocument, addNotification
    }}>
      {children}
    </CorporateContext.Provider>
  );
};

export const useCorporate = () => {
  const context = useContext(CorporateContext);
  if (!context) throw new Error('useCorporate must be used within a CorporateProvider');
  return context;
};