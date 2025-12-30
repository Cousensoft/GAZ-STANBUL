
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CreditCard, ArrowRight, Wrench, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MarketNavbar from '../../components/market/MarketNavbar';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [includeInstallation, setIncludeInstallation] = useState(false);

  const shipping = cartTotal > 5000 ? 0 : 150;
  const installationFee = includeInstallation ? 1200 : 0;
  const total = cartTotal + shipping + installationFee; 

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
        <MarketNavbar />
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300 border border-slate-200 shadow-inner"><CreditCard size={48} /></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sepetiniz Boş</h2>
        <p className="text-slate-500 mb-8">Henüz sepetinize ürün eklemediniz.</p>
        <button onClick={() => navigate('/market')} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">Alışverişe Başla</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-36 pb-20">
      <MarketNavbar />
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><ArrowLeft size={20} /></button>
          <h1 className="text-2xl font-bold text-slate-900">Alışveriş Sepeti ({cartItems.length} Ürün)</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 md:gap-6 items-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-sm md:text-base truncate pr-4">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 size={18} /></button>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{item.category}</p>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:text-red-600 transition-colors"><Minus size={14}/></button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:text-red-600 transition-colors"><Plus size={14}/></button>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Montaj Upsell Alanı */}
            <div className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer ${includeInstallation ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-200' : 'bg-white border-slate-100 border-dashed hover:border-slate-300'}`} onClick={() => setIncludeInstallation(!includeInstallation)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${includeInstallation ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400'}`}>
                            <Wrench size={28} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg ${includeInstallation ? 'text-white' : 'text-slate-900'}`}>Montaj Hizmeti İstiyorum</h4>
                            <p className={`text-xs ${includeInstallation ? 'text-slate-400' : 'text-slate-500'}`}>Yetkili servis tarafından profesyonel kurulum (+1.200 ₺)</p>
                        </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${includeInstallation ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 text-transparent'}`}>
                        <Check size={18} strokeWidth={4} />
                    </div>
                </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-red-900 text-sm">Güvenli Alışveriş Garantisi</h4>
                <p className="text-xs text-red-700 mt-1">Tüm siparişleriniz Gazistanbul ve GazMarket güvencesi altındadır.</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-36">
              <h3 className="font-bold text-lg text-slate-900 mb-6">Sipariş Özeti</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-50">
                <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Ara Toplam</span><span className="font-bold text-slate-900">{cartTotal.toLocaleString('tr-TR')} ₺</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Kargo</span><span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-slate-900'}`}>{shipping === 0 ? 'Ücretsiz' : `${shipping} ₺`}</span></div>
                {includeInstallation && (
                    <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Montaj Hizmeti</span><span className="font-bold text-slate-900">1.200 ₺</span></div>
                )}
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-slate-900 text-lg">Genel Toplam</span>
                <span className="font-black text-red-600 text-2xl">{total.toLocaleString('tr-TR')} ₺</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg">Siparişi Tamamla <ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
