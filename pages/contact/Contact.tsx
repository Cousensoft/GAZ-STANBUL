
import React from 'react';
import { MapPin, Phone, Mail, Building2, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      {/* Header Section */}
      <div className="bg-slate-900 text-white pt-[140px] pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
           <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">İLETİŞİME GEÇİN</h1>
           <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-4"></div>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Sorularınız, iş birliği teklifleriniz veya teknik destek ihtiyaçlarınız için bizimle iletişime geçebilirsiniz.
           </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-12 flex-grow">

        <div className="flex flex-col lg:flex-row gap-12 lg:items-start max-w-6xl mx-auto">
          
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-5/12 pt-4">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Bize Ulaşın</h2>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
              Aşağıdaki iletişim kanallarından veya formu doldurarak bize 7/24 ulaşabilirsiniz. Profesyonel ekibimiz en kısa sürede dönüş yapacaktır.
            </p>

            <div className="space-y-8">
              {/* Location 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300 shadow-sm">
                  <Building2 size={20} className="text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Merkez Ofisimiz</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Hürriyet Blv No:1/151<br/>
                    Beylikdüzü / İSTANBUL
                  </p>
                </div>
              </div>
              
              {/* Phone & Mail */}
               <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 mt-4">
                  <div className="flex items-center gap-3 group cursor-pointer">
                     <div className="p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:text-red-600 transition-colors shadow-sm border border-slate-100">
                        <Phone size={18} />
                     </div>
                     <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">(0850) 305 55 88</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer">
                     <div className="p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:text-red-600 transition-colors shadow-sm border border-slate-100">
                        <Mail size={18} />
                     </div>
                     <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">info@gazistanbul.com</span>
                  </div>
               </div>

            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <h3 className="text-2xl font-bold mb-8 text-white">Mesaj Gönder</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-red-500 transition-colors">Ad Soyad *</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800 border-b-2 border-slate-700 text-white py-3 px-3 outline-none focus:border-red-500 transition-all placeholder-slate-500 rounded-t-lg focus:bg-slate-800/80"
                      placeholder="Adınız"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-red-500 transition-colors">E-Posta Adresi *</label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-800 border-b-2 border-slate-700 text-white py-3 px-3 outline-none focus:border-red-500 transition-all placeholder-slate-500 rounded-t-lg focus:bg-slate-800/80"
                      placeholder="mail@ornek.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-red-500 transition-colors">Konu *</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-800 border-b-2 border-slate-700 text-white py-3 px-3 outline-none focus:border-red-500 transition-all placeholder-slate-500 rounded-t-lg focus:bg-slate-800/80"
                    placeholder="Mesaj konusu"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-red-500 transition-colors">Mesajınız *</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-800 border-b-2 border-slate-700 text-white py-3 px-3 outline-none focus:border-red-500 transition-all placeholder-slate-500 resize-none rounded-t-lg focus:bg-slate-800/80"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                  ></textarea>
                </div>

                <div className="pt-4">
                    <button className="w-full md:w-auto px-8 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/40 transition-all flex items-center justify-center gap-2 group">
                    GÖNDER <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Map Area */}
      <div className="w-full h-[450px] border-t border-slate-200 relative z-0 bg-white">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.6119565013!2d28.8720968925526!3d41.00546324316336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1709667000000!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="opacity-100 transition-opacity duration-500"
        ></iframe>
        {/* Map Overlay Gradient - Fade to White */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      </div>

    </div>
  );
};

export default Contact;
