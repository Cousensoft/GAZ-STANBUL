
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- TYPES ---
export interface MarketVariant {
  id: string;
  name: string; 
  options: { label: string; stock: number; priceModifier?: number }[];
}

export interface MarketProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: 'published' | 'draft' | 'archived';
  imageUrl: string;
  description: string;
  variants?: MarketVariant[];
  salesCount: number;
  viewsCount: number;
}

export interface MarketOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  items: { productName: string; quantity: number; price: number; id: string }[];
  paymentMethod: string;
}

export interface MarketReturn {
  id: string;
  orderId: string;
  customerName: string;
  productName: string;
  reason: string;
  note: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
}

export interface MarketStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockAlerts: number;
  dailySales: { day: string; value: number }[];
  topProducts: { name: string; sales: number }[];
}

interface MarketContextType {
  products: MarketProduct[];
  orders: MarketOrder[];
  returns: MarketReturn[];
  stats: MarketStats;
  addProduct: (product: MarketProduct) => void;
  updateProduct: (id: string, data: Partial<MarketProduct>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number) => void;
  updateOrderStatus: (orderId: string, status: MarketOrder['status']) => void;
  createReturnRequest: (data: Omit<MarketReturn, 'id' | 'status' | 'date'>) => void;
  updateReturnStatus: (id: string, status: MarketReturn['status']) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<MarketProduct[]>([
    { 
      id: '101', name: 'Akıllı Termostat X1', sku: 'TH-001', category: 'Otomasyon', price: 1250, stock: 45, status: 'published', 
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=200&auto=format&fit=crop', 
      description: 'Wi-Fi bağlantılı akıllı termostat.', salesCount: 120, viewsCount: 1500 
    },
    { 
      id: '102', name: 'Kombi Bağlantı Seti', sku: 'KB-023', category: 'Yedek Parça', price: 450, stock: 12, status: 'published', 
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200&auto=format&fit=crop', 
      description: 'Tam uyumlu bağlantı seti.', salesCount: 85, viewsCount: 900 
    }
  ]);

  const [orders, setOrders] = useState<MarketOrder[]>([
    { 
      id: 'ORD-99210', customerName: 'Ahmet Yılmaz', customerPhone: '0555 111 22 33', customerAddress: 'Kadıköy, İstanbul', 
      date: '2024-10-24', total: 1250, status: 'delivered', paymentMethod: 'Kredi Kartı',
      items: [{ id: '101', productName: 'Akıllı Termostat X1', quantity: 1, price: 1250 }]
    }
  ]);

  const [returns, setReturns] = useState<MarketReturn[]>([
    { id: 'RET-4512', orderId: 'ORD-99150', customerName: 'Mehmet Öz', productName: 'Vana Pro', reason: 'Yanlış Ürün', note: 'Mavi istemiştim kırmızı geldi.', date: '2 saat önce', status: 'pending', amount: 850 }
  ]);

  const [stats, setStats] = useState<MarketStats>({
    totalRevenue: 25000, totalOrders: 142, totalProducts: 24, lowStockAlerts: 3,
    dailySales: [{ day: 'Pzt', value: 4500 }, { day: 'Sal', value: 6200 }, { day: 'Çar', value: 3800 }, { day: 'Per', value: 7100 }, { day: 'Cum', value: 5400 }, { day: 'Cmt', value: 8900 }, { day: 'Paz', value: 6500 }],
    topProducts: [{ name: 'Termostat X1', sales: 45 }, { name: 'Kombi Seti', sales: 32 }, { name: 'Vana Pro', sales: 28 }]
  });

  const addProduct = (product: MarketProduct) => setProducts(prev => [product, ...prev]);
  const updateProduct = (id: string, data: Partial<MarketProduct>) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateStock = (productId: string, newStock: number) => setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  const updateOrderStatus = (orderId: string, status: MarketOrder['status']) => setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));

  const createReturnRequest = (data: Omit<MarketReturn, 'id' | 'status' | 'date'>) => {
    const newReturn: MarketReturn = {
        ...data,
        id: `RET-${Math.floor(Math.random() * 9000) + 1000}`,
        status: 'pending',
        date: 'Şimdi'
    };
    setReturns(prev => [newReturn, ...prev]);
  };

  const updateReturnStatus = (id: string, status: MarketReturn['status']) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <MarketContext.Provider value={{ products, orders, returns, stats, addProduct, updateProduct, deleteProduct, updateStock, updateOrderStatus, createReturnRequest, updateReturnStatus }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within a MarketProvider');
  return context;
};
