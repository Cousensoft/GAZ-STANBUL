
import React, { useState } from 'react';
import { DISTRICTS } from '../../utils/constants';
import { useRequests } from '../../context/RequestContext';
import { useAuth } from '../../context/AuthContext';
import { Search, Check, Star, MessageSquare, ChevronDown, ChevronRight, Clock, Folder, FolderOpen, MapPin, PlusCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTOR_TREE = [
  { id: 'altyapi', label: 'Altyapı & Tesisat', children: ['Doğalgaz', 'Mekanik Tesisat', 'Elektrik Sistemleri'] },
  { id: 'teknoloji', label: 'Teknoloji & Güvenlik', children: ['Akıllı Ev', 'Güvenlik', 'IoT / Teknoloji'] },
  { id: 'insaat', label: 'Yapı & İnşaat', children: ['İnşaat / Müteahhit'] }
];

const Requests: React.FC = () => {
  const navigate = useNavigate();
  const { requests } = useRequests();
  const { user } = useAuth();
  
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['altyapi', 'teknoloji', 'insaat']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => prev.includes(groupId) ? prev.filter(g => g !== groupId) : [...prev, groupId]);
  };

  const clearFilters = () => {
    setSelectedSector('');
    setSelectedDistrict('');
    setSearchQuery('');
  };

  // KRİTİK FİLTRE: targetCompanyId'si olan talepler (Özel Talepler) genel listede ASLA görünmez.
  const filteredRequests = requests.filter(req => {
    const isPrivate = !!req.targetCompanyId;
    if (isPrivate) return false; // Özel talepleri havuzdan çıkar

    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === '' || req.sector === selectedSector;
    const matchesDistrict = selectedDistrict === '' || req.district === selectedDistrict;
    
    return matchesSearch && matchesSector && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white pt-[118px] pb-12 mb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div>
                <h1 className="text-3xl font-bold mb-2">Talep Havuzu</h1>
                <p className="text-slate-400 max-w-xl">Tüm firmalara açık, herkese yayınlanmış iş fırsatlarını inceleyin.</p>
             </div>
             <button 
                onClick={() => navigate('/create-request')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all transform hover:scale-105"
             >
                <PlusCircle size={18} /> Hemen Talep Oluştur
             </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
         <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-72 flex-shrink-0">
               <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm sticky top-36">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                     <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Filtreler</h3>
                     {(selectedSector !== '' || selectedDistrict !== '') && (
                        <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:underline">Temizle</button>
                     )}
                  </div>
                  <div className="mb-8">
                     <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Sektörler</h4>
                     <div className="space-y-1">
                        {SECTOR_TREE.map((group) => {
                           const isExpanded = expandedGroups.includes(group.id);
                           return (
                              <div key={group.id} className="select-none">
                                 <div onClick={() => toggleGroup(group.id)} className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-slate-50 rounded-lg text-slate-700 font-bold text-sm">
                                    {isExpanded ? <FolderOpen size={16} className="text-red-500" /> : <Folder size={16} className="text-slate-400" />}
                                    <span className="flex-1">{group.label}</span>
                                    {isExpanded ? <ChevronDown size={14} className="text-slate-400"/> : <ChevronRight size={14} className="text-slate-400"/>}
                                 </div>
                                 {isExpanded && (
                                    <div className="ml-2 pl-4 border-l border-slate-100 mt-1 space-y-1">
                                       {group.children.map((child) => (
                                             <div key={child} onClick={() => setSelectedSector(selectedSector === child ? '' : child)} className={`cursor-pointer text-sm py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between ${selectedSector === child ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                                                <span>{child}</span>
                                                {selectedSector === child && <Check size={14} />}
                                             </div>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
                  <div>
                     <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Konum (İlçe)</h4>
                     <div className="relative">
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium cursor-pointer">
                           <option value="">Tüm İstanbul</option>
                           {DISTRICTS.map((district) => <option key={district} value={district}>{district}</option>)}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronDown size={16} /></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1">
               <div className="mb-6">
                  <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center mb-4">
                      <div className="pl-3 text-slate-400"><Search size={18} /></div>
                      <input type="text" placeholder="İş ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent p-2.5 outline-none text-slate-700 text-sm placeholder-slate-400" />
                  </div>
                  <div className="flex items-center justify-between px-1">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Açık İşler ({filteredRequests.length})</span>
                  </div>
               </div>

               <div className="space-y-4">
                  {filteredRequests.length > 0 ? filteredRequests.map((req) => (
                        <div key={req.id} onClick={() => navigate(`/requests/${req.id}`)} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer">
                           <div className="flex-shrink-0">
                              <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden border border-slate-100">
                                 <img src={`https://ui-avatars.com/api/?name=${req.sector}+User&background=random&color=fff&size=128`} alt="User" className="w-full h-full object-cover" />
                              </div>
                           </div>
                           <div className="flex-1 min-0">
                              <div className="mb-3">
                                 <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 hover:text-red-600 transition-colors truncate">{req.title}</h3>
                                 <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{req.sector} | {req.district}</p>
                              </div>
                              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-5">
                                 <div className="flex items-center gap-1 text-slate-900 bg-slate-50 px-2 py-0.5 rounded"><Star size={12} className="text-amber-400 fill-current" /><span>5.0</span></div>
                                 <span className="flex items-center gap-1"><Clock size={12}/> {req.date}</span>
                              </div>
                              <div className="space-y-2">
                                 <div className="flex text-sm"><span className="w-24 font-bold text-slate-900 flex-shrink-0">Durum</span><span className={req.status === 'Acil' ? 'text-red-600 font-bold' : 'text-slate-600'}>{req.status}</span></div>
                                 <div className="flex text-sm"><span className="w-24 font-bold text-slate-900 flex-shrink-0">Açıklama</span><span className="text-slate-500 line-clamp-1">{req.description}</span></div>
                              </div>
                           </div>
                           <div className="flex flex-col items-end justify-center gap-3 min-w-[180px] md:border-l md:border-slate-50 md:pl-6 md:ml-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                               <button className="w-full bg-red-600 text-white py-2.5 rounded-lg font-bold text-xs hover:bg-red-700 transition-all shadow-sm uppercase tracking-wide">
                                  {user?.role === 'corporate' ? 'Hemen Teklif Ver' : 'Talebi İncele'}
                               </button>
                               <button className="w-full bg-white text-slate-600 border border-slate-200 py-2.5 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"><MessageSquare size={14} /> Mesaj Gönder</button>
                           </div>
                        </div>
                  )) : (
                     <div className="bg-white rounded-xl p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300"><Search size={24} /></div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Açık Talep Bulunmuyor</h3>
                        <p className="text-sm text-slate-500 mb-6">Şu an havuzda yeni bir talep bulunmamaktadır.</p>
                        <button onClick={clearFilters} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">Havuzu Yenile</button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Requests;
