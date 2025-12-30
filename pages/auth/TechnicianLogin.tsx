
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrCode, Lock, ArrowRight, Briefcase, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TechnicianLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, logout } = useAuth();
  
  // URL'den firma bilgisini al
  const searchParams = new URLSearchParams(location.search);
  const corpNameParam = searchParams.get('corp');
  // Eğer parametre yoksa ve state'den geliyorsa (navigate ile) onu kullan
  const corpName = corpNameParam || (location.state as any)?.corp || 'Bosphorus Enerji';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Otomatik doldurma (Demo kolaylığı için)
  useEffect(() => {
    const cleanName = corpName.toLowerCase().replace(/[^a-z0-9]/g, '');
    setEmail(`teknik@${cleanName}.com`);
    setPassword('123456');
  }, [corpName]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simüle edilmiş gecikme
    setTimeout(() => {
        if (password === '123456') {
            // STANDART TEKNİK ELEMAN GİRİŞİ
            if (user) logout();

            login({
                id: 'tech-user-01',
                name: 'Teknik Personel (Demo)',
                role: 'technician',
                email: email,
                avatar: 'https://ui-avatars.com/api/?name=Teknik+Personel&background=4f46e5&color=fff',
                connectedCompanyName: corpName,
                connectionStatus: 'approved',
                employeeRole: 'worker' // Standart Eleman
            }, true);
            
            navigate('/dashboard');
        } else if (password === 'admin123') {
            // YÖNETİCİ/MÜDÜR GİRİŞİ (TEST İÇİN)
            if (user) logout();
            
            login({
                id: 'tech-manager-01',
                name: 'Saha Yöneticisi (Demo)',
                role: 'technician',
                email: email,
                avatar: 'https://ui-avatars.com/api/?name=Saha+Yonetici&background=059669&color=fff',
                connectedCompanyName: corpName,
                connectionStatus: 'approved',
                employeeRole: 'manager' // Yönetici Rolü
            }, true);

            navigate('/dashboard');
        } else {
            setError('Giriş bilgileri hatalı. Lütfen kontrol ediniz.');
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        
        {/* Arkaplan Efektleri */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl relative z-10 overflow-hidden">
            
            {/* Üst Kısım: Marka */}
            <div className="bg-slate-950/50 p-8 text-center border-b border-white/5">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                    <Wrench size={32} className="text-white" />
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">Teknik Panel</h1>
                <p className="text-slate-400 text-sm mt-1 font-medium">{corpName} Personel Girişi</p>
            </div>

            {/* Form Kısmı */}
            <div className="p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200 text-sm font-bold">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}
                
                <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200 text-xs text-center">
                    <span className="font-bold">Test İpuçları:</span> <br/>
                    Usta Girişi: Şifre <b>123456</b> <br/>
                    Yönetici Girişi: Şifre <b>admin123</b>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Personel ID / E-Posta</label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                placeholder="teknik@firma.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Güvenlik Şifresi</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                                placeholder="••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-900/50 transition-all flex items-center justify-center gap-2 mt-4 group"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>Sisteme Giriş Yap <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold">
                        <QrCode size={16} /> QR ile Giriş
                    </button>
                    <div className="flex items-center gap-1 text-xs text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <ShieldCheck size={12} /> Güvenli Bağlantı
                    </div>
                </div>
            </div>
            
        </div>

        <p className="mt-6 text-slate-500 text-xs">
            © 2024 Gazistanbul Kurumsal Altyapı Sistemleri
        </p>

    </div>
  );
};

export default TechnicianLogin;