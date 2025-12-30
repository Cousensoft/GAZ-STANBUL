
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Truck, 
  FileText, 
  Lock, 
  Building2, 
  User, 
  Zap, 
  Info,
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import MarketNavbar from '../../components/market/MarketNavbar';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Adres ve Fatura
  const [addresses] = useState([
    { id: 1, title: 'Ev Adresi', detail: 'Caferağa Mah. Moda Cad. No: 15 D:4, Kadıköy / İstanbul' }
  ]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(1);
  const [billingType, setBillingType] = useState<'individual' | 'corporate'>('individual');
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Kargo
  const shippingMethods = [
    { id: 'standard', name: 'Standart Teslimat', price: 150, time: '2-3 İş Günü', icon: Truck },
    { id: 'express', name: 'JetLojistik (Aynı Gün)', price: 450, time: 'Bugün', icon: Zap }
  ];
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const currentShippingPrice = cartTotal > 5000 ? 0 : (shippingMethods.find(m => m.id === selectedShipping)?.price || 0);
  const total = cartTotal + currentShippingPrice;

  const handlePlaceOrder = () => {
    setStep(4);
    setTimeout(() => clearCart(), 100);
  };

  const steps = [
    { id: 1, label: 'Adres & Fatura' }, 
    { id: 2, label: 'Kargo' }, 
    { id: 3, label: 'Ödeme' }, 
    { id: 4, label: 'Onay' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <MarketNavbar />
      <div className="container mx-auto px-4 md:px-8">
        {/* Stepper - Orijinal Tasarım Dilinde */}
        <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative px-2">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-red-600 -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
                {steps.map((s) => (
                    <div key={s.id} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-4 ${step >= s.id ? 'bg-red-600 text-white border-white shadow-lg' : 'bg-white text-slate-300 border-slate-100'}`}>
                            {step > s.id ? <CheckCircle size={18} /> : s.id}
                        </div>
                        <span className={`text-[10px] font-black uppercase mt-3 tracking-widest ${step >= s.id ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
                {/* 1. ADIM: ADRES VE FATURA */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8"><MapPin className="text-red-600" /> TESLİMAT ADRESİ</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {addresses.map(addr => (
                                    <div key={addr.id} onClick={() => setSelectedDeliveryAddress(addr.id)} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedDeliveryAddress === addr.id ? 'border-red-600 bg-red-50/10' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-slate-900">{addr.title}</span>
                                            {selectedDeliveryAddress === addr.id && <CheckCircle size={20} className="text-red-600" />}
                                        </div>
                                        <p className="text-sm text-slate-500">{addr.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6"><FileText className="text-blue-600" /> FATURA BİLGİLERİ</h2>
                            
                            <div className="flex bg-slate-100 p-1 rounded-xl mb-8 w-fit">
                                <button onClick={() => setBillingType('individual')} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${billingType === 'individual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Bireysel</button>
                                <button onClick={() => setBillingType('corporate')} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${billingType === 'corporate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Kurumsal</button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {billingType === 'individual' ? (
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">TC Kimlik Numarası</label>
                                            <input type="text" maxLength={11} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" placeholder="11 Haneli TC No" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Firma Ünvanı</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" placeholder="Şirket Tam Adı" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Vergi Numarası</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" placeholder="Vergi No" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Vergi Dairesi</label>
                                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" placeholder="Vergi Dairesi" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                                    <input type="checkbox" checked={billingSameAsShipping} onChange={e => setBillingSameAsShipping(e.target.checked)} className="w-5 h-5 rounded text-red-600" />
                                    <span className="text-sm font-bold text-slate-700">Fatura adresim teslimat adresiyle aynı olsun</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={() => setStep(2)} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-xl">Devam Et</button>
                        </div>
                    </div>
                )}

                {/* 2. ADIM: KARGO SEÇİMİ */}
                {step === 2 && (
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-fade-in">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 uppercase"><Truck className="text-amber-500" /> Kargo Yöntemi</h2>
                        <div className="space-y-4">
                            {shippingMethods.map(method => (
                                <div key={method.id} onClick={() => setSelectedShipping(method.id)} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedShipping === method.id ? 'border-amber-500 bg-amber-50/20' : 'border-slate-100 hover:border-slate-200'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedShipping === method.id ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <method.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{method.name}</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase mt-1">{method.time}</p>
                                        </div>
                                    </div>
                                    <span className={`text-lg font-black ${cartTotal > 5000 ? 'text-green-600' : 'text-slate-900'}`}>
                                        {cartTotal > 5000 ? 'ÜCRETSİZ' : `${method.price} ₺`}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-between">
                            <button onClick={() => setStep(1)} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-xs">Geri Dön</button>
                            <button onClick={() => setStep(3)} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-xl">Ödemeye Geç</button>
                        </div>
                    </div>
                )}

                {/* 3. ADIM: ÖDEME */}
                {step === 3 && (
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-fade-in">
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8 uppercase"><CreditCard className="text-green-600" /> ÖDEME BİLGİLERİ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <input type="text" placeholder="Kart Sahibi" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" />
                                <input type="text" placeholder="Kart Numarası" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="AA/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" />
                                    <input type="text" placeholder="CVV" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-600" />
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Sipariş Özeti</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between font-medium opacity-80"><span>Ürünler:</span><span>{cartTotal.toLocaleString('tr-TR')} ₺</span></div>
                                    <div className="flex justify-between font-medium opacity-80"><span>Kargo:</span><span>{currentShippingPrice === 0 ? 'Bedava' : `${currentShippingPrice} ₺`}</span></div>
                                    <div className="flex justify-between pt-6 border-t border-white/10 font-black text-2xl">
                                        <span>TOPLAM:</span>
                                        <span className="text-red-500">{total.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-between">
                            <button onClick={() => setStep(2)} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase text-xs">Geri Dön</button>
                            <button onClick={handlePlaceOrder} className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center gap-2"><Lock size={16}/> Siparişi Onayla</button>
                        </div>
                    </div>
                )}

                {/* 4. ADIM: ONAY */}
                {step === 4 && (
                    <div className="bg-white rounded-3xl p-16 text-center animate-fade-in shadow-sm border border-slate-200">
                        <CheckCircle size={64} className="text-green-600 mx-auto mb-8" strokeWidth={3} />
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">SİPARİŞ ALINDI</h2>
                        <p className="text-slate-500 mb-10 leading-relaxed max-w-sm mx-auto">Siparişiniz başarıyla oluşturuldu. Sipariş numaranız: <b>#ORD-{Math.floor(Math.random()*900000)}</b></p>
                        <button onClick={() => navigate('/market')} className="bg-slate-900 text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all">Markete Dön</button>
                    </div>
                )}
            </div>

            {/* Yan Panel: Orijinal Sepet Özeti */}
            {step < 4 && (
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-32">
                        <h3 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-widest border-b border-slate-50 pb-4">SEPET İÇERİĞİ</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar mb-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 p-1 flex-shrink-0">
                                        <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt=""/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[10px] font-bold text-slate-900 truncate uppercase">{item.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold mt-1">{item.quantity} Adet × {item.price.toLocaleString('tr-TR')} ₺</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 pt-6 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase"><span>Ara Toplam</span><span className="text-slate-900">{cartTotal.toLocaleString('tr-TR')} ₺</span></div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase"><span>Kargo</span><span className={currentShippingPrice === 0 ? 'text-green-600' : 'text-slate-900'}>{currentShippingPrice === 0 ? 'Bedava' : `${currentShippingPrice} ₺`}</span></div>
                            <div className="flex justify-between items-center pt-6 text-2xl font-black text-red-600">
                                <span>TOPLAM</span>
                                <span>{total.toLocaleString('tr-TR')} ₺</span>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <ShieldCheck size={18} className="text-green-600" />
                           <span className="text-[10px] font-bold text-slate-500 uppercase leading-snug">Güvenli 256-Bit SSL Ödeme</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
