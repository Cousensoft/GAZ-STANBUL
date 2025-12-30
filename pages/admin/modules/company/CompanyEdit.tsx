
import React, { useState, useEffect, useRef } from 'react';
import { Save, Briefcase, Image as ImageIcon, MapPin, Clock, FileText, Camera, Upload, PlusCircle, X, Navigation, Crosshair, Info, ShieldCheck, CheckCircle, AlertCircle, Trash2, File, RefreshCw } from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';
import { SECTORS } from '../../../../utils/constants';

// Leaflet global type definition fix for TypeScript
declare const L: any;

interface DocItem {
    id: string;
    name: string;
    required: boolean;
    uploaded: boolean;
    file: string | null;
    date?: string;
    status?: 'valid' | 'expired' | 'pending';
}

const CompanyEdit = ({ company }: { company: any }) => {
   const [activeTab, setActiveTab] = useState('info');
   
   // State for Documents (Mock Data - Mevcut veriden geldiği varsayılır)
   const [documents, setDocuments] = useState<DocItem[]>([
       { id: 'auth_cert', name: 'Yetki Belgesi', required: true, uploaded: true, file: 'yetki_belgesi_2024.pdf', date: '12.01.2024', status: 'valid' },
       { id: 'quality_cert', name: 'Kalite Belgesi (ISO 9001)', required: false, uploaded: false, file: null },
       { id: 'tax_plate', name: 'Vergi Levhası', required: true, uploaded: true, file: 'vergi_levhasi.pdf', date: '01.01.2024', status: 'valid' },
       { id: 'trade_gazette', name: 'Ticaret Sicil Gazetesi', required: true, uploaded: true, file: 'sicil_gazetesi.pdf', date: '15.05.2023', status: 'expired' },
   ]);

   // State for Location (Mock - Kadıköy)
   const [coordinates, setCoordinates] = useState({ lat: 40.9901, lng: 29.0292 });
   const mapContainerRef = useRef<HTMLDivElement>(null);
   const mapInstanceRef = useRef<any>(null);
   const markerRef = useRef<any>(null);

   // State for Working Hours (Pre-filled)
   const [workingHours, setWorkingHours] = useState([
      { day: 'Pazartesi', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Salı', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Çarşamba', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Perşembe', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Cuma', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'Cumartesi', isOpen: true, start: '09:00', end: '14:00' },
      { day: 'Pazar', isOpen: false, start: '09:00', end: '18:00' },
   ]);

   const handleUpload = (id: string) => {
       const date = new Date().toLocaleDateString('tr-TR');
       setDocuments(prev => prev.map(doc => 
           doc.id === id ? { ...doc, uploaded: true, file: 'yeni_yuklenen_belge.pdf', date, status: 'pending' } : doc
       ));
   };

   const handleDeleteDoc = (id: string) => {
       if(confirm('Belgeyi silmek istediğinize emin misiniz?')) {
           setDocuments(prev => prev.map(doc => 
               doc.id === id ? { ...doc, uploaded: false, file: null, date: undefined, status: undefined } : doc
           ));
       }
   };

   const toggleDay = (index: number) => {
      const newHours = [...workingHours];
      newHours[index].isOpen = !newHours[index].isOpen;
      setWorkingHours(newHours);
   };

   // Initialize Map when Address tab is active
   useEffect(() => {
      if (activeTab === 'address' && mapContainerRef.current && !mapInstanceRef.current) {
         if (typeof L === 'undefined') return;
         mapInstanceRef.current = L.map(mapContainerRef.current).setView([coordinates.lat, coordinates.lng], 13);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(mapInstanceRef.current);
         const customIcon = L.divIcon({
            className: 'bg-transparent',
            html: `<div class="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
            iconSize: [32, 32], iconAnchor: [16, 32]
         });
         markerRef.current = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon, draggable: true }).addTo(mapInstanceRef.current);
         markerRef.current.on('dragend', function (event: any) {
            const position = markerRef.current.getLatLng();
            setCoordinates({ lat: position.lat, lng: position.lng });
         });
         mapInstanceRef.current.on('click', function(e: any) {
             markerRef.current.setLatLng(e.latlng);
             setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
         });
      }
   }, [activeTab]);

   const tabs = [
      { id: 'info', label: 'Firma Bilgileri', icon: Briefcase },
      { id: 'documents', label: 'Kurumsal Belgeler', icon: ShieldCheck },
      { id: 'media', label: 'Medya & Görsel', icon: ImageIcon },
      { id: 'address', label: 'Adres & Konum', icon: MapPin },
      { id: 'hours', label: 'Çalışma Saatleri', icon: Clock },
      { id: 'description', label: 'Firma Açıklaması', icon: FileText },
   ];

   return (
      <div className="animate-fade-in max-w-6xl pb-10">
         <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">Firma Düzenle: {company.name}</h2>
                <span className={`bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase border border-slate-200`}>
                    ID: #{company.id}
                </span>
            </div>
            <div className="flex gap-2">
                <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <RefreshCw size={16} /> Değişiklikleri Geri Al
                </button>
                <button 
                    onClick={() => alert('Firma bilgileri güncellendi!')}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                >
                    <Save size={16} /> Güncelle
                </button>
            </div>
         </div>

         {/* --- SEKME BAŞLIKLARI --- */}
         <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100 mb-6">
            <div className="flex gap-1 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                           activeTab === tab.id 
                           ? 'bg-slate-900 text-white shadow-md' 
                           : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>
         </div>

         {/* --- İÇERİK ALANI --- */}
         <div className="w-full">
            <WidgetCard className="min-h-[600px] p-6 md:p-8">
                  
                  {/* 1. Firma Bilgileri */}
                  {activeTab === 'info' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-tight border-b border-slate-100 pb-4">
                           <Briefcase size={22} className="text-slate-400" /> Firma Bilgileri
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Firma Adı</label>
                              <input type="text" defaultValue={company.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Firma Yetkilisi</label>
                              <input type="text" defaultValue={company.manager?.name || 'Ahmet Yılmaz'} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Firma E-Mail</label>
                              <input type="email" defaultValue={company.manager?.email || 'info@firma.com'} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Firma Web Sitesi</label>
                              <input type="url" defaultValue="www.bosphorusenerji.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Sabit Tel</label>
                              <input type="tel" defaultValue="0216 555 44 33" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">GSM Tel</label>
                              <input type="tel" defaultValue={company.manager?.phone || '0532 555 00 00'} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Fax Tel</label>
                              <input type="tel" defaultValue="0216 555 44 34" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Ana Sektör</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none h-[46px]" defaultValue="Doğalgaz">
                                 {SECTORS.map(s => <option key={s.id}>{s.name}</option>)}
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Alt Sektör</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none h-[46px]" defaultValue="Tesisat Döşeme">
                                 <option>Kombi Bakımı</option>
                                 <option>Tesisat Döşeme</option>
                                 <option>Proje Çizimi</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 2. KURUMSAL BELGELER */}
                  {activeTab === 'documents' && (
                     <div className="animate-fade-in">
                        <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                            <div>
                                <h3 className="font-bold text-slate-900 flex items-center gap-3 text-lg uppercase tracking-tight">
                                    <ShieldCheck size={22} className="text-blue-500" /> Resmi Belgeler
                                </h3>
                                <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                                    Bu alanda firmanın yüklediği belgeleri görüntüleyebilir, silebilir veya yeni belge yükleyebilirsiniz.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {documents.map((doc) => (
                                <div 
                                    key={doc.id} 
                                    className={`relative p-6 rounded-2xl border-2 transition-all group ${
                                        doc.uploaded 
                                        ? (doc.status === 'valid' ? 'border-green-200 bg-green-50/30' : doc.status === 'expired' ? 'border-red-200 bg-red-50/30' : 'border-amber-200 bg-amber-50/30')
                                        : (doc.id === 'auth_cert' ? 'border-red-200 bg-red-50/10' : 'border-slate-100 bg-slate-50/50')
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${doc.uploaded ? (doc.status === 'valid' ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400 border border-slate-200') : 'bg-white text-slate-400 border border-slate-200'}`}>
                                                {doc.uploaded ? <CheckCircle size={24} /> : <FileText size={24} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base">{doc.name}</h4>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                                                    {doc.required ? <span className="text-red-500">* Zorunlu</span> : 'Opsiyonel'}
                                                </p>
                                            </div>
                                        </div>
                                        {doc.uploaded && (
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                                                    <Info size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteDoc(doc.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Belgeyi Sil"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {doc.uploaded ? (
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/50">
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                <File size={16} />
                                                <span className="truncate max-w-[150px]">{doc.file}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">Durum</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                                    doc.status === 'valid' ? 'text-green-700 bg-green-100' :
                                                    doc.status === 'expired' ? 'text-red-700 bg-red-100' : 'text-amber-700 bg-amber-100'
                                                }`}>
                                                    {doc.status === 'valid' ? 'Geçerli' : doc.status === 'expired' ? 'Süresi Dolmuş' : 'İnceleniyor'}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-4">
                                            <button 
                                                onClick={() => handleUpload(doc.id)}
                                                className="w-full border-2 border-dashed border-slate-300 rounded-xl py-3 text-slate-500 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all flex items-center justify-center gap-2"
                                            >
                                                <Upload size={16} /> Dosya Seç veya Sürükle
                                            </button>
                                            {doc.id === 'auth_cert' && (
                                                <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={12} /> Bu belge olmadan firma onayı alamazsınız.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                     </div>
                  )}

                  {/* 3. Medya & Görsel */}
                  {activeTab === 'media' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-tight border-b border-slate-100 pb-4">
                           <ImageIcon size={22} className="text-slate-400" /> Medya & Görsel
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-10">
                           <div className="flex flex-col md:flex-row gap-10">
                              <div className="flex-1">
                                 <label className="block text-xs font-bold text-slate-500 uppercase mb-3 ml-1">Firma Logosu</label>
                                 <div className="flex items-center gap-6">
                                    <div className="w-32 h-32 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center relative group overflow-hidden shadow-sm">
                                       <img src={company.logoUrl || "https://picsum.photos/seed/company1/200/200"} className="w-full h-full object-cover" alt="Logo" />
                                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Camera size={32} className="text-white" />
                                       </div>
                                    </div>
                                    <button className="text-sm font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2">
                                       <Upload size={18} /> Değiştir
                                    </button>
                                 </div>
                              </div>
                              <div className="flex-1">
                                 <label className="block text-xs font-bold text-slate-500 uppercase mb-3 ml-1">Firma Arkaplanı</label>
                                 <div className="w-full h-32 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center relative group overflow-hidden cursor-pointer hover:bg-slate-50 transition-colors">
                                    <img src="https://picsum.photos/seed/bg1/800/300" className="w-full h-full object-cover opacity-60" alt="Background" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-col gap-2 bg-black/30">
                                       <ImageIcon size={32} className="text-white" />
                                       <span className="text-xs font-bold text-white">Arkaplan Değiştir</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Gallery */}
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-3 ml-1">Firma Resimleri (Galeri)</label>
                              <div className="grid grid-cols-4 gap-4 mb-3">
                                 {[1,2,3].map(i => (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group shadow-sm border border-slate-200">
                                       <img src={`https://picsum.photos/seed/gal${i}/400/400`} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                       <button className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                                          <X size={16} />
                                       </button>
                                    </div>
                                 ))}
                                 <button className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-slate-400 transition-all group">
                                    <PlusCircle size={32} className="group-hover:text-slate-600 mb-2 transition-colors"/>
                                    <span className="text-xs font-bold group-hover:text-slate-600 transition-colors">Resim Ekle</span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 4. Adres Bilgileri & Harita */}
                  {activeTab === 'address' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-tight border-b border-slate-100 pb-4">
                           <MapPin size={22} className="text-slate-400" /> Adres & Konum
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">İl</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-900 transition-all">
                                 <option>İstanbul</option>
                                 <option>Ankara</option>
                                 <option>İzmir</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">İlçe</label>
                              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-900 transition-all">
                                 <option>Kadıköy</option>
                                 <option>Beşiktaş</option>
                                 <option>Üsküdar</option>
                                 <option>Ataşehir</option>
                              </select>
                           </div>
                        </div>

                        <div className="mb-8">
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Açık Adres</label>
                           <textarea className="w-full h-28 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none resize-none focus:ring-2 focus:ring-slate-900 transition-all leading-relaxed" defaultValue="Caferağa Mah. Moda Cad. No:12 D:4 Kadıköy/İstanbul"></textarea>
                        </div>

                        {/* Interactive Map Area */}
                        <div>
                           <div className="flex justify-between items-end mb-3">
                               <label className="block text-xs font-bold text-slate-500 uppercase ml-1">Harita Konumu</label>
                               <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 border border-slate-200 font-bold">
                                   LAT: {coordinates.lat.toFixed(6)} | LNG: {coordinates.lng.toFixed(6)}
                               </div>
                           </div>
                           
                           <div className="relative w-full h-[400px] bg-slate-200 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner group">
                               {/* Map Container */}
                               <div ref={mapContainerRef} className="w-full h-full z-0"></div>
                               
                               {/* Overlay Instructions */}
                               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2.5 rounded-xl shadow-md z-[400] text-xs font-bold text-slate-700 flex items-center gap-2 pointer-events-none border border-white/50">
                                   <Crosshair size={16} className="text-red-500"/> 
                                   Konumu sürükleyerek veya tıklayarak ayarlayın
                               </div>
                               
                               <button 
                                   type="button"
                                   onClick={() => {
                                       setCoordinates({ lat: 41.0082, lng: 28.9784 });
                                       if(mapInstanceRef.current) mapInstanceRef.current.setView([41.0082, 28.9784], 13);
                                       if(markerRef.current) markerRef.current.setLatLng([41.0082, 28.9784]);
                                   }}
                                   className="absolute bottom-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-lg z-[400] hover:bg-slate-800 transition-colors"
                                   title="Merkeze Dön"
                               >
                                   <Navigation size={20} />
                               </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 5. Çalışma Saatleri */}
                  {activeTab === 'hours' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-tight border-b border-slate-100 pb-4">
                           <Clock size={22} className="text-slate-400" /> Çalışma Saatleri
                        </h3>
                        
                        <div className="space-y-4">
                           {workingHours.map((wh, idx) => (
                              <div key={idx} className="flex items-center gap-6 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-4 rounded-xl transition-colors">
                                 <div className="w-32 font-bold text-base text-slate-700">{wh.day}</div>
                                 <div className="flex-1 flex items-center gap-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                       <input type="checkbox" checked={wh.isOpen} onChange={() => toggleDay(idx)} className="sr-only peer" />
                                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                       <span className="ml-3 text-sm font-bold text-slate-600 w-16">{wh.isOpen ? 'Açık' : 'Kapalı'}</span>
                                    </label>
                                    {wh.isOpen && (
                                       <div className="flex items-center gap-3 ml-auto sm:ml-0 animate-fade-in">
                                          <input type="time" defaultValue={wh.start} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none text-slate-700 focus:border-slate-400 transition-colors shadow-sm" />
                                          <span className="text-slate-400 font-bold">-</span>
                                          <input type="time" defaultValue={wh.end} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none text-slate-700 focus:border-slate-400 transition-colors shadow-sm" />
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 6. Firma Açıklaması */}
                  {activeTab === 'description' && (
                     <div className="animate-fade-in">
                        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-tight border-b border-slate-100 pb-4">
                           <FileText size={22} className="text-slate-400" /> Firma Açıklaması
                        </h3>
                        <div className="relative">
                           <div className="flex gap-2 mb-3 border-b border-slate-100 pb-3 bg-slate-50 p-2 rounded-t-xl border-t border-x border-slate-200">
                              <button className="p-2 hover:bg-white rounded text-slate-600 text-sm font-bold w-10 border border-transparent hover:border-slate-200 transition-all shadow-sm">B</button>
                              <button className="p-2 hover:bg-white rounded text-slate-600 text-sm italic w-10 border border-transparent hover:border-slate-200 transition-all shadow-sm">I</button>
                              <button className="p-2 hover:bg-white rounded text-slate-600 text-sm underline w-10 border border-transparent hover:border-slate-200 transition-all shadow-sm">U</button>
                           </div>
                           <textarea className="w-full h-[500px] bg-white border border-slate-200 rounded-b-xl p-6 text-base leading-loose outline-none focus:ring-2 focus:ring-slate-900 resize-none text-slate-700" defaultValue="Firma hakkında detaylı bilgi, vizyon, misyon ve hizmet kalitenizden bahsedin..."></textarea>
                        </div>
                     </div>
                  )}

            </WidgetCard>
         </div>
      </div>
   );
};

export default CompanyEdit;
