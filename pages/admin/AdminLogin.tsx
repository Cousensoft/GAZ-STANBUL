
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Pre-fill credentials for demo purposes
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Admin Credentials
    if (username === 'admin' && password === 'admin123') {
        // Added missing id property
        login({
            id: 'admin-super',
            name: 'Super Admin',
            email: 'admin@gazistanbul.com',
            role: 'admin',
            adminRole: 'superadmin',
            avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000&color=fff'
        });
        navigate('/admin/dashboard');
    } else if (username === 'editor' && password === 'editor123') {
        // Added missing id property
        login({
            id: 'admin-editor',
            name: 'Content Editor',
            email: 'editor@gazistanbul.com',
            role: 'admin',
            adminRole: 'editor',
            avatar: 'https://ui-avatars.com/api/?name=Content+Editor&background=333&color=fff'
        });
        navigate('/admin/dashboard');
    } else {
        setError('Geçersiz yönetici kimlik bilgileri.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-red-500 mb-4 shadow-2xl shadow-red-900/20">
                <ShieldAlert size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Yönetim Paneli</h1>
            <p className="text-slate-500 text-sm">Sadece yetkili personel girişi içindir.</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Kullanıcı Adı</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors font-mono text-sm"
                        placeholder="admin_usr"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Şifre</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors font-mono text-sm"
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2">
                        <ShieldAlert size={14} /> {error}
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                >
                    <Lock size={16} /> Güvenli Giriş
                </button>
            </form>
        </div>

        <div className="text-center mt-8">
            <button onClick={() => navigate('/')} className="text-slate-600 text-xs font-bold hover:text-slate-400 transition-colors flex items-center justify-center gap-1 mx-auto">
                <ArrowRight size={12} className="rotate-180" /> Siteye Dön
            </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
