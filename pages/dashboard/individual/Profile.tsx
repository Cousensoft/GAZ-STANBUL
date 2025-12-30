import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, Calendar, CheckCircle, Lock, Loader2, Award, Building2, Send, AlertTriangle, Clock } from 'lucide-react';
import { WidgetCard, CircularProgress } from '../../../components/dashboard/Widgets';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/authService';

const PersonalProfile = ({ user }: { user: any }) => {
  const { updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    birthDate: user.birthDate || '',
  });

  // Sync state if user prop changes
  useEffect(() => {
    setFormData({
        name: user.name || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
    });
  }, [user]);

  // Profil Doluluk Oranı Hesaplama
  const calculateCompletion = () => {
    const fields = [
        !!user.name,
        !!user.email,
        !!user.phone,
        !!user.birthDate,
        !!user.avatar
    ];
    const completedCount = fields.filter(Boolean).length;
    return (completedCount / fields.length) * 100;
  };

  const completionRate = calculateCompletion();

  // Dinamik Renk Belirleme
  const getProgressColor = (rate: number) => {
    if (rate === 100) return "#22c55e"; // Tamamlanmışsa Yeşil (Green 500)
    if (rate < 50) return "#ef4444";    // %50 altındaysa Kırmızı (Red 500)
    return "#3b82f6";                   // Diğer durumlarda Mavi (Blue 500)
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
        // Call API service
        await authService.updateProfile(formData);
        
        // Update Global Context
        updateUser(formData);
        
        setIsEditing(false);
    } catch (error) {
        console.error("Profil güncellenemedi", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleConnectCompany = () => {
      if (!inviteCode.trim()) return;
      setIsConnecting(true);
      
      // Simülasyon: Bağlantı isteği
      setTimeout(() => {
          updateUser({
              connectionStatus: 'pending',
              connectedCompanyName: 'Bosphorus Enerji (Onay Bekliyor)'
          });
          setIsConnecting(false);
          setInviteCode('');
          alert('Bağlantı talebiniz firmaya iletildi. Onay bekleniyor.');
      }, 1500);
  };

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex flex-col md:flex-row gap-8">
          
          {/* Avatar & Progress Section */}
          <WidgetCard className="md:w-1/3 flex flex-col items-center text-center relative overflow-hidden">
              {completionRate === 100 && (
                <div className="absolute top-4 right-4 text-green-500 animate-bounce" title="Doğrulanmış Profil">
                    <Award size={24} fill="currentColor" className="text-green-100 stroke-green-500" />
                </div>
              )}
              
              <div className="relative group cursor-pointer mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                      <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ef4444&color=fff`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                  </div>
              </div>

              <div className="mb-6 w-full flex flex-col items-center">
                  <CircularProgress 
                    percentage={completionRate} 
                    color={getProgressColor(completionRate)} 
                    size="w-24 h-24"
                    textSize="text-xl"
                    label="Doluluk"
                  />
                  <p className={`text-[10px] font-bold uppercase mt-2 tracking-widest ${
                      completionRate === 100 ? 'text-green-600' : 
                      completionRate < 50 ? 'text-red-600' : 'text-slate-400'
                  }`}>
                    {completionRate === 100 ? 'Profil Tamamlandı' : 
                     completionRate < 50 ? 'Profil Eksik' : 'Profil Güncelleniyor'}
                  </p>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-1">{user.name}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-6">
                  {user.role === 'corporate' ? 'Kurumsal Üye' : user.role === 'technician' ? 'Teknik Uzman' : 'Bireysel Üye'}
              </p>
              
              <div className="flex flex-col gap-2 w-full">
                  <button className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-xs hover:border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <Camera size={14} /> Fotoğraf Yükle
                  </button>
                  <button className="w-full py-3 rounded-xl text-red-500 font-bold text-xs hover:bg-red-50 transition-colors">
                      Fotoğrafı Kaldır
                  </button>
              </div>
          </WidgetCard>

          <div className="flex-1 space-y-6">
            {/* Details Form */}
            <WidgetCard>
                <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Hesap Bilgileri</h3>
                        <p className="text-xs text-slate-500">Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-50 px-3 py-1 rounded-lg transition-colors"
                        >
                            Düzenle
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ad Soyad</label>
                        <div className={`relative ${!isEditing && 'opacity-60'}`}>
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                disabled={!isEditing}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:font-medium disabled:cursor-not-allowed" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-Posta Adresi</label>
                        <div className="relative opacity-60">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled 
                                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3.5 pl-10 pr-10 text-sm font-semibold text-slate-500 cursor-not-allowed" 
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" title="Değiştirilemez">
                                <Lock size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Telefon Numarası</label>
                        <div className={`relative ${!isEditing && 'opacity-60'}`}>
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="tel" 
                                disabled={!isEditing}
                                placeholder="05XX XXX XX XX" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:font-medium disabled:cursor-not-allowed" 
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Doğum Tarihi</label>
                        <div className={`relative ${!isEditing && 'opacity-60'}`}>
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="date" 
                                disabled={!isEditing}
                                value={formData.birthDate}
                                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all cursor-pointer disabled:cursor-not-allowed" 
                            />
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-50 animate-fade-in-up">
                        <button 
                            onClick={() => {
                                setFormData({ name: user.name || '', phone: user.phone || '', birthDate: user.birthDate || '' });
                                setIsEditing(false);
                            }}
                            className="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                        >
                            Vazgeç
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                            {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                        </button>
                    </div>
                )}
            </WidgetCard>

            {/* --- KURUMSAL BAĞLANTI (Teknik Eleman Özelliği) --- */}
            <WidgetCard title="Kurumsal Bağlantı">
                {user.connectionStatus === 'approved' ? (
                     <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-green-900 text-lg">{user.connectedCompanyName}</h4>
                                <p className="text-green-700 text-sm flex items-center gap-2">
                                    <CheckCircle size={14} /> Resmi Teknik Personel
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/60 px-4 py-2 rounded-xl text-xs font-bold text-green-800">
                            Aktif Çalışan
                        </div>
                     </div>
                ) : user.connectionStatus === 'pending' ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                            <Clock size={24} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-amber-900 text-lg">Onay Bekleniyor</h4>
                            <p className="text-amber-700 text-sm">
                                {user.connectedCompanyName || 'Firma'} tarafından onay bekleniyor. Onaylandığında Teknik Eleman paneline erişiminiz açılacaktır.
                            </p>
                        </div>
                    </div>
                ) : user.connectionStatus === 'suspended' ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4">
                        <AlertTriangle size={24} className="text-red-600" />
                        <div>
                            <h4 className="font-bold text-red-900">Hesap Askıya Alındı</h4>
                            <p className="text-red-700 text-sm">Kurumsal bağlantınız firma tarafından geçici olarak durdurulmuştur.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                Bir firmanın teknik ekibine katılmak için, firma yetkilisinden alacağınız <b>Davet Kodu'nu</b> aşağıya girin.
                            </p>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Davet Kodu (Örn: GZ-1234-AB)" 
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-slate-900 uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                />
                                <button 
                                    onClick={handleConnectCompany}
                                    disabled={!inviteCode || isConnecting}
                                    className="bg-slate-900 text-white px-6 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isConnecting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    Bağlan
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block w-px bg-slate-100 self-stretch"></div>
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                            <Building2 size={32} className="text-slate-300 mb-2" />
                            <h4 className="text-sm font-bold text-slate-600">Henüz Bir Ekipte Değil Misiniz?</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Sadece bireysel müşteri olarak devam ediyorsunuz.</p>
                        </div>
                    </div>
                )}
            </WidgetCard>

          </div>
       </div>
    </div>
  );
};

export default PersonalProfile;