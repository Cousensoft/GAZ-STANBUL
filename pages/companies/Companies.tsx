
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES, SECTORS, DISTRICTS } from '../../utils/constants';
// Added missing ChevronRight import
import { MapPin, Search, Star, Phone, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Map as MapIcon, Calendar, Clock, X, Building2, Info, Check } from 'lucide-react';
import { Company } from '../../types';

declare const L: any;

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filterSector, setFilterSector] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const [appointmentModal, setAppointmentModal] = useState<{isOpen: boolean, company: Company | null}>({ isOpen: false, company: null });
  const [step, setStep] = useState(1);
  
  // Randevu Yeni State: 3 Gün Seçimi
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  
  const ITEMS_PER_PAGE = 5; 

  // 15 Günlük Pencere Oluşturma
  const getNext15Days = () => {
      const days = [];
      const today = new Date();
      for (let i = 0; i < 15; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          days.push(d);
      }
      return days;
  };

  const next15Days = getNext15Days();

  const handleDateToggle = (date: Date) => {
    const dateStr = date.toDateString();
    const isSelected = selectedDates.find(d => d.toDateString() === dateStr);

    if (isSelected) {
        setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateStr));
    } else {
        if (selectedDates.length < 3) {
            setSelectedDates([...selectedDates, date]);
        }
    }
  };

  useEffect(() => {
    if (location.state && (location.state as any).initialSector) {
        setFilterSector((location.state as any).initialSector);
        window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredCompanies = MOCK_COMPANIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === '' || c.sector === filterSector;
    const matchesDistrict = filterDistrict === '' || c.district === filterDistrict;
    return matchesSearch && matchesSector && matchesDistrict;
  });

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const currentCompanies = filteredCompanies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const container = document.getElementById('company-list-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilterSector('');
    setFilterDistrict('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      setter(value);
      setCurrentPage(1);
  };

  const openAppointmentModal = (e: React.MouseEvent, company: Company) => {
    e.stopPropagation();
    setAppointmentModal({ isOpen: true, company });
  };

  const resetModal = () => {
    setAppointmentModal({ isOpen: false, company: null });
    setStep(1);
    setSelectedDates([]);
    setFormData({ name: '', phone: '', note: '' });
  };

  useEffect(() => {
    if (typeof L === 'undefined' || !document.getElementById('map')) return;
    if (!mapRef.current) {
        mapRef.current = L.map('map').setView([41.0082, 28.9784], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(mapRef.current);
    }
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = [];
    const bounds = L.latLngBounds([]);
    filteredCompanies.forEach(company => {
        if (company.coordinates) {
            const iconHtml = `<div class="relative group"><div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg transform transition-transform duration-300 hover:scale-125 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div></div>`;
            const icon = L.divIcon({ className: 'bg-transparent border-none', html: iconHtml, iconSize: [32, 32], iconAnchor: [16, 32] });
            const marker = L.marker([company.coordinates.lat, company.coordinates.lng], { icon }).addTo(mapRef.current).bindPopup(`<div class="text-center"><h3 class="font-bold text-slate-900">${company.name}</h3><p class="text-xs text-slate-500 mb-1">${company.sector}</p><button onclick="window.location.hash='#/company/${company.id}'" class="text-xs bg-red-600 text-white px-2 py-1 rounded mt-1">İncele</button></div>`);
            markersRef.current.push(marker);
            bounds.extend([company.coordinates.lat, company.coordinates.lng]);
        }
    });
    if (markersRef.current.length > 0) mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    else mapRef.current.setView([41.0082, 28.9784], 11);
  }, [filteredCompanies]); 

  return (
    <div className="h-screen flex flex-col pt-[80px] bg-slate-50 overflow-hidden relative">
      
      {/* --- REVISED APPOINTMENT MODAL --- */}
      {appointmentModal.isOpen && appointmentModal.company && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={resetModal}></div>
            <div className="bg-white rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Randevu İsteği Oluştur</h3>
                        <p className="text-xs text-slate-500">{appointmentModal.company.name}</p>
                    </div>
                    <button onClick={resetModal} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600"><X size={16} /></button>
                </div>
                
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {step === 1 && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <Calendar size={18} className="text-red-600"/> Uygun Olduğunuz 3 Günü Seçin
                                </h4>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedDates.length === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {selectedDates.length} / 3 Seçildi
                                </div>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                                {next15Days.map((date, idx) => {
                                    const dateStr = date.toDateString();
                                    const isSelected = selectedDates.find(d => d.toDateString() === dateStr);
                                    const isSunday = date.getDay() === 0;
                                    const isToday = new Date().toDateString() === dateStr;

                                    return (
                                        <button 
                                            key={idx}
                                            disabled={isSunday}
                                            onClick={() => handleDateToggle(date)}
                                            className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                                                isSelected 
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10' 
                                                : isSunday 
                                                    ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed' 
                                                    : 'bg-white text-slate-600 border-slate-100 hover:border-red-200'
                                            }`}
                                        >
                                            <span className={`text-[10px] font-bold uppercase mb-1 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                                                {date.toLocaleDateString('tr-TR', { weekday: 'short' })}
                                            </span>
                                            <span className="text-xl font-black">{date.getDate()}</span>
                                            <span className={`text-[9px] font-bold mt-1 uppercase ${isSelected ? 'text-white/50' : 'text-slate-300'}`}>
                                                {date.toLocaleDateString('tr-TR', { month: 'short' })}
                                            </span>
                                            {isToday && !isSelected && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                                            {isSelected && <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><Check size={12} strokeWidth={4} /></div>}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
                                <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                    Lütfen müsait olduğunuz <b>3 farklı günü</b> seçiniz. Firma, bu günlerden kendi iş programına en uygun olanını onaylayarak randevunuzu kesinleştirecektir.
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {step === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="p-6">
                            <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <CheckCircle size={14} className="text-green-400" /> Seçtiğiniz Günler
                                    </h4>
                                    <div className="flex gap-4">
                                        {selectedDates.sort((a,b) => a.getTime() - b.getTime()).map((d, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-center flex-1 border border-white/10">
                                                <span className="block text-[10px] font-bold text-slate-300 uppercase">{d.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>
                                                <span className="text-lg font-black">{d.getDate()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div><label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Ad Soyad</label><input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/></div>
                                <div><label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Telefon</label><input required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/></div>
                                <div><label className="text-xs font-bold text-slate-700 uppercase mb-1 block pl-1">Not (Opsiyonel)</label><textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium resize-none" rows={3} placeholder="İşle ilgili kısa bilgi verebilirsiniz..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}></textarea></div>
                            </div>
                            <button type="submit" className="w-full py-4 rounded-2xl bg-red-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95">İsteği Gönder</button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="p-8 text-center flex flex-col items-center justify-center h-full animate-fade-in">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">Talep İletildi!</h3>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-sm">
                                Randevu isteğiniz başarıyla oluşturuldu. Firma, seçtiğiniz 3 günden birini onayladığında size bildirim ve SMS yoluyla bilgi iletilecektir.
                            </p>
                            <button onClick={resetModal} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Kapat</button>
                        </div>
                    )}
                </div>
                {step === 1 && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0">
                        <button 
                            disabled={selectedDates.length !== 3} 
                            onClick={() => setStep(2)} 
                            className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                        >
                            Devam Et
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-10 shrink-0">
           <div className="h-[80px] px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white"><h2 className="text-lg font-bold text-slate-900">Filtrele</h2>{(filterSector || filterDistrict || searchQuery) && <button onClick={clearFilters} className="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded">Temizle</button>}</div>
           <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
               <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Arama</label><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="Firma adı ara..." value={searchQuery} onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900"/></div></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase mb-3 block tracking-wider">Sektörler</label><div className="space-y-1"><label className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${filterSector === '' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}><input type="radio" checked={filterSector === ''} onChange={() => handleFilterChange(setFilterSector, '')} className="w-4 h-4"/><span className="text-sm font-bold">Tümü</span></label>{SECTORS.map(s => <label key={s.id} className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${filterSector === s.name ? 'bg-slate-100' : 'hover:bg-slate-50'}`}><input type="radio" checked={filterSector === s.name} onChange={() => handleFilterChange(setFilterSector, s.name)} className="w-4 h-4"/><span className="text-sm">{s.name}</span></label>)}</div></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase mb-3 block tracking-wider">Konum</label><div className="relative"><select value={filterDistrict} onChange={(e) => handleFilterChange(setFilterDistrict, e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none appearance-none"><option value="">Tümü (İstanbul Geneli)</option>{DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} /></div></div>
           </div>
        </div>

        {/* Company List Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
           <div className="hidden lg:flex h-[80px] items-center justify-between px-6 border-b border-slate-200 bg-white shrink-0 sticky top-0 z-20 shadow-sm/50"><div><h1 className="text-lg font-bold text-slate-900">Firmalar</h1><p className="text-xs text-slate-500 font-medium mt-0.5">İstanbul genelindeki sonuçlar</p></div></div>
           <div id="company-list-container" className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              
              {filteredCompanies.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                 {currentCompanies.map((company) => (
                    <div key={company.id} onClick={() => navigate(`/company/${company.id}`)} className="bg-white rounded-3xl p-5 border border-slate-200 hover:shadow-xl transition-all cursor-pointer group flex flex-col md:flex-row gap-6 relative">
                        
                        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                          {company.isVerified && (
                            <div className="flex items-center justify-end bg-green-50 border border-green-200 text-green-600 rounded-full px-2 py-1 transition-all duration-500 w-9 group-hover:w-32 overflow-hidden whitespace-nowrap shadow-sm cursor-help">
                               <CheckCircle size={20} strokeWidth={2.5} className="flex-shrink-0" />
                               <span className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto transition-all duration-500 ml-0 group-hover:ml-2 text-[10px] font-black uppercase tracking-tighter">Onaylı Firma</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 border border-amber-100 px-2 py-1 rounded-full text-xs shadow-sm">
                             <Star size={12} fill="currentColor" /> {company.rating}
                          </div>
                        </div>

                        <div className="w-full md:w-52 h-52 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 relative">
                           <img src={company.logoUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={company.name} />
                        </div>

                        <div className="flex-1 flex flex-col min-w-0">
                           <div className="flex justify-between items-start mb-2 pr-12 md:pr-0">
                              <h3 className="text-xl font-bold text-slate-900 truncate pr-2 group-hover:text-red-600 transition-colors">{company.name}</h3>
                           </div>

                           <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-1 text-slate-500 text-sm">
                                 <MapPin size={16} />
                                 <span>{company.district}, İstanbul</span>
                              </div>
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border border-blue-100">{company.sector}</span>
                           </div>

                           <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{company.description}</p>

                           <div className="flex flex-wrap gap-1.5 mb-6">
                              {company.services.slice(0, 4).map((s, i) => (
                                 <span key={i} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-100 uppercase tracking-tighter">{s}</span>
                              ))}
                           </div>

                           <div className="mt-auto flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-5">
                              <button onClick={(e) => { e.stopPropagation(); navigate('/create-request'); }} className="w-full sm:w-auto bg-slate-50 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors">Ücretsiz Teklif Al</button>
                              <button onClick={(e) => openAppointmentModal(e, company)} className="w-full sm:w-auto text-slate-500 font-bold text-xs hover:text-red-600 py-2.5 px-4 transition-colors">Randevu Planla</button>
                              <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold text-xs group-hover:bg-red-600 transition-all shadow-lg shadow-slate-200">Profili Gör</button>
                           </div>
                        </div>
                    </div>
                 ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-inner animate-fade-in mx-4">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Search size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Aradığınızı bulamadık</h3>
                  <button 
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <X size={18} /> Filtreleri Temizle
                  </button>
                </div>
              )}

              {filteredCompanies.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-2 mt-12 pb-8">
                  <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"><ChevronLeft size={20} /></button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-lg scale-110' : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm'}`}>{i + 1}</button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"><ChevronRight size={20} /></button>
                </div>
              )}
           </div>
        </div>

        {/* Map View */}
        <div className="w-[400px] xl:w-[35%] hidden xl:block bg-slate-200 relative border-l border-slate-200 shadow-inner z-10">
           <div id="map" className="w-full h-full z-0"></div>
           <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full shadow-2xl border border-white/50 text-[10px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-2 whitespace-nowrap z-[1000] pointer-events-none">
              <MapIcon size={16} className="text-red-500 animate-pulse" />
              <span>Canlı Harita Görünümü</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
