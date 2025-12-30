
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Red Glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-6 inline-block">
                <span className="text-3xl font-black tracking-tighter text-white">
                   GAZİSTANBUL
                </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              İstanbul'un enerji, mekanik ve teknoloji altyapısını tek bir dijital çatıda buluşturan yeni nesil hizmet pazaryeri.
            </p>
            <div className="flex gap-4">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Facebook} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 border-b border-red-500/20 inline-block pb-1">Hızlı Erişim</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/companies" className="hover:text-red-500 transition-colors">Firmalar</Link></li>
              <li><Link to="/market" className="hover:text-red-500 transition-colors">Market</Link></li>
              <li><Link to="/requests" className="hover:text-red-500 transition-colors">Talep Oluştur</Link></li>
              <li><Link to="/news" className="hover:text-red-500 transition-colors">Haberler</Link></li>
              <li><Link to="/blog" className="hover:text-red-500 transition-colors">Blog</Link></li>
              <li><Link to="/social" className="hover:text-red-500 transition-colors">Topluluk</Link></li>
            </ul>
          </div>

           {/* Sectors */}
           <div>
            <h4 className="text-white font-semibold mb-6 border-b border-red-500/20 inline-block pb-1">Sektörler</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-red-500 cursor-pointer transition-colors">Doğalgaz Sistemleri</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Mekanik Tesisat</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Akıllı Ev & IoT</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Elektrik & Aydınlatma</li>
            </ul>
          </div>

          {/* Mobile App Download - Centered & Square Buttons Side-by-Side (Smaller) */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-white font-semibold mb-6 border-b border-red-500/20 inline-block pb-1">Uygulamayı İndirin</h4>
            <p className="text-sm text-slate-500 mb-6">
                Gazistanbul cebinizde! Hizmetlere ve ürünlere her an, her yerden ulaşın.
            </p>
            <div className="flex flex-row justify-center gap-4 w-full">
                {/* App Store Button - Square Small */}
                <a href="#" className="flex flex-col items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-black hover:border-slate-700 w-24 h-24 rounded-2xl transition-all group shadow-lg shadow-slate-900/20 hover:-translate-y-1">
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-7 h-7 text-white group-hover:scale-110 transition-transform">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                    </svg>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-medium text-slate-400 leading-none mb-0.5 group-hover:text-slate-300">İndirin</span>
                        <span className="text-xs font-bold text-white leading-none font-sans">App Store</span>
                    </div>
                </a>

                {/* Google Play Button - Square Small */}
                <a href="#" className="flex flex-col items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-black hover:border-slate-700 w-24 h-24 rounded-2xl transition-all group shadow-lg shadow-slate-900/20 hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white group-hover:scale-110 transition-transform">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,13.11L17.5,15.8L15.24,13.55L20.3,10.89C20.73,10.66 20.73,12.89 20.3,13.11M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                    </svg>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-medium text-slate-400 leading-none mb-0.5 group-hover:text-slate-300">KEŞFEDİN</span>
                        <span className="text-xs font-bold text-white leading-none font-sans">Google Play</span>
                    </div>
                </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>&copy; {currentYear} Gazistanbul Teknoloji A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-red-500 cursor-pointer transition-colors">Kullanım Koşulları</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">Gizlilik Politikası</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">KVKK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon }: { Icon: any }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300">
    <Icon size={16} />
  </a>
);

export default Footer;
