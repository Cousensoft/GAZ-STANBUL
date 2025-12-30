
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center relative z-10 max-w-lg mx-auto">
        <h1 className="text-[120px] md:text-[180px] font-black text-slate-900 leading-none tracking-tighter opacity-10">
            404
        </h1>
        <div className="-mt-12 md:-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Sayfa Bulunamadı
            </h2>
            <p className="text-slate-500 text-lg mb-8">
                Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. İstanbul'un karmaşık sokaklarında kaybolmuş olabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="px-8 py-3.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                    <Home size={20} /> Ana Sayfa
                </Link>
                <Link to="/companies" className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    <Search size={20} /> Firmalara Göz At
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
