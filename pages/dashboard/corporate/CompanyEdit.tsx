import React, { useState } from 'react';
import { Save, Briefcase, Image as ImageIcon, MapPin, Clock, FileText, Camera, Upload, PlusCircle, X } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { SECTORS } from '../../../utils/constants';

const CompanyProfileEdit = () => {
   const [activeTab, setActiveTab] = useState('info');
   // State for Working Hours
   const [workingHours, setWorkingHours] = useState([
      { day: 'Pazartesi', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Salı', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Çarşamba', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Perşembe', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Cuma', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Cumartesi', isOpen: true, start: '09:00', end: '14:00' },
      { day: 'Pazar', isOpen: false, start: '09:00', end: '18:00' },
   ]);

   const toggleDay = (index: number) => {
      const newHours = [...workingHours];
      newHours[index].isOpen = !newHours[index].isOpen;
      setWorkingHours(newHours);
   };

   const tabs = [
      { id: 'info', label: 'Firma Bilgileri', icon: Briefcase },
      { id: 'media', label: 'Medya & Görsel', icon: ImageIcon },
      { id: 'address', label: 'Adres & Konum', icon: MapPin },
      { id: 'hours', label: 'Çalışma Saatleri', icon: Clock },
      { id: 'description', label: 'Firma Açıklaması', icon: FileText },
   ];

   return (
      <div className="animate-fade-in max-w-5xl pb-10">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Firma Profili Düzenle</h2>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
               <Save size={16} /> Kaydet
            </button>
         </div>

         {/* Horizontal Tabs */}
         <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 mb-6 overflow-x-auto">
            <div className="flex space-x-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                           activeTab === tab.id 
                           ? 'bg-slate-900 text-white shadow-md' 
                           : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>
         </div>

         {/* Content Area */}
         <div className="w-full">
            <WidgetCard className="min-h-[500px]">
                  
                  {/* 1. Firma Bilgileri */}
                  {activeTab === 'info' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-slate-100 pb-4">
                           <Briefcase size={18} className="text-slate-400" /> Firma Bilgileri
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firma Adı</label>
                              <input type="text" defaultValue="Bosphorus Enerji Ltd. Şti." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firma Yetkilisi</label>
                              <input type="text" defaultValue="Ahmet Yılmaz" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firma E-Mail</label>
                              <input type="email" defaultValue="info@bosphorusenerji.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firma Web Sitesi</label>
                              <input type="url" defaultValue="www.bosphorusenerji.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sabit Tel</label>
                              <input type="tel" defaultValue="0212 555 00 00" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GSM Tel</label>
                              <input type="tel" defaultValue="0532 555 00 00" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fax Tel</label>
                              <input type="tel" defaultValue="0212 555 00 01" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ana Sektör</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none">
                                 {SECTORS.map(s => <option key={s.id}>{s.name}</option>)}
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alt Sektör</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none">
                                 <option>Kombi Bakımı</option>
                                 <option>Tesisat Döşeme</option>
                                 <option>Proje Çizimi</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 2. Medya Bilgileri */}
                  {activeTab === 'media' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-slate-100 pb-4">
                           <ImageIcon size={18} className="text-slate-400" /> Medya & Görsel
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-8">
                           <div className="flex flex-col md:flex-row gap-8">
                              <div className="flex-1">
                                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Firma Logosu</label>
                                 <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden">
                                       <img src="https://picsum.photos/seed/company1/200/200" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" alt="Logo" />
                                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Camera size={24} className="text-slate-600" />
                                       </div>
                                    </div>
                                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                                       <Upload size={14} /> Logo Yükle
                                    </button>
                                 </div>
                              </div>
                              <div className="flex-1">
                                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Firma Arkaplanı</label>
                                 <div className="w-full h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden cursor-pointer">
                                    <img src="https://picsum.photos/seed/bg1/800/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" alt="Background" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-col gap-2">
                                       <ImageIcon size={24} className="text-slate-600" />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Gallery */}
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Firma Resimleri (Galeri)</label>
                              <div className="grid grid-cols-4 gap-2 mb-3">
                                 {[1,2,3].map(i => (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group">
                                       <img src={`https://picsum.photos/seed/gal${i}/200/200`} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                       <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                          <X size={12} />
                                       </button>
                                    </div>
                                 ))}
                                 <button className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-slate-400 transition-all">
                                    <PlusCircle size={24} />
                                    <span className="text-[10px] font-bold mt-1">Ekle</span>
                                 </button>
                              </div>
                              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
                                 <input type="checkbox" id="verified" defaultChecked className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                                 <label htmlFor="verified" className="text-sm font-bold text-slate-700 select-none">Firma Onaylı (Rozet Göster)</label>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 3. Adres Bilgileri & Harita */}
                  {activeTab === 'address' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-slate-100 pb-4">
                           <MapPin size={18} className="text-slate-400" /> Adres & Konum
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">İl</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none">
                                 <option>İstanbul</option>
                                 <option>Ankara</option>
                                 <option>İzmir</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">İlçe</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none">
                                 <option>Kadıköy</option>
                                 <option>Beşiktaş</option>
                                 <option>Üsküdar</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Semt</label>
                              <input type="text" defaultValue="Moda" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mahalle</label>
                              <input type="text" defaultValue="Caferağa Mah." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none" />
                           </div>
                        </div>

                        <div className="mb-6">
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Firma Adresi</label>
                           <textarea className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none resize-none" defaultValue="Caferağa Mah. Moda Cad. No:12 Kadıköy/İstanbul"></textarea>
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Harita Konumu (İşaretle)</label>
                           <div className="w-full h-64 bg-slate-200 rounded-xl border-2 border-slate-200 relative overflow-hidden flex items-center justify-center group cursor-crosshair">
                              <span className="text-slate-500 text-sm font-bold flex items-center gap-2"><MapPin size={16}/> Harita Yükleniyor...</span>
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           </div>
                           <p className="text-[10px] text-slate-400 mt-1">Konumunuzu harita üzerinde tıklayarak belirleyin.</p>
                        </div>
                     </div>
                  )}

                  {/* 4. Çalışma Saatleri */}
                  {activeTab === 'hours' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-slate-100 pb-4">
                           <Clock size={18} className="text-slate-400" /> Çalışma Saatleri
                        </h3>
                        
                        <div className="space-y-3">
                           {workingHours.map((wh, idx) => (
                              <div key={idx} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                                 <div className="w-24 font-bold text-sm text-slate-700">{wh.day}</div>
                                 <div className="flex-1 flex items-center gap-4">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                       <input type="checkbox" checked={wh.isOpen} onChange={() => toggleDay(idx)} className="sr-only peer" />
                                       <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                                       <span className="ml-2 text-xs font-medium text-slate-600">{wh.isOpen ? 'Açık' : 'Kapalı'}</span>
                                    </label>
                                    {wh.isOpen && (
                                       <div className="flex items-center gap-2 ml-auto sm:ml-0">
                                          <input type="time" defaultValue={wh.start} className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold outline-none" />
                                          <span className="text-slate-400">-</span>
                                          <input type="time" defaultValue={wh.end} className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold outline-none" />
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 5. Firma Açıklaması */}
                  {activeTab === 'description' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-slate-100 pb-4">
                           <FileText size={18} className="text-slate-400" /> Firma Açıklaması
                        </h3>
                        <div className="relative">
                           <div className="flex gap-2 mb-2 border-b border-slate-100 pb-2">
                              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 text-xs font-bold">B</button>
                              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 text-xs italic">I</button>
                              <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 text-xs underline">U</button>
                           </div>
                           <textarea className="w-full h-96 bg-white border border-slate-200 rounded-xl p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Firma hakkında detaylı bilgi (Markdown destekli)..."></textarea>
                        </div>
                     </div>
                  )}

            </WidgetCard>
         </div>
      </div>
   );
};

export default CompanyProfileEdit;