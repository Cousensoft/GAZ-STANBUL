import React, { useState } from 'react';
import { List, PlusCircle, Grid, Trash2 } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { MAIN_CATEGORIES, SUB_CATEGORIES } from '../../../utils/constants';

const ServicesManagement = () => {
   // Local state for services list
   const [services, setServices] = useState([
      { id: 1, name: 'Kombi Bakımı', mainCat: 'Isıtma Sistemleri', subCat: 'Kombi Hizmetleri' },
      { id: 2, name: 'Petek Temizliği', mainCat: 'Isıtma Sistemleri', subCat: 'Radyatör Hizmetleri' },
      { id: 3, name: 'Gaz Kaçağı Tespiti', mainCat: 'Doğalgaz', subCat: 'Arıza Tespit' },
   ]);

   const [activeTab, setActiveTab] = useState('list');
   const [newService, setNewService] = useState({ mainCat: '', subCat: '', name: '' });
   const [newMainCat, setNewMainCat] = useState('');
   const [newSubCat, setNewSubCat] = useState({ main: '', name: '' });

   // Handlers
   const handleAddService = () => {
      if(newService.name && newService.mainCat && newService.subCat) {
         setServices([...services, { id: Date.now(), ...newService }]);
         setNewService({ mainCat: '', subCat: '', name: '' });
         setActiveTab('list'); // Switch back to list after adding
      }
   };

   const handleDeleteService = (id: number) => {
      setServices(services.filter(s => s.id !== id));
   };

   const tabs = [
      { id: 'list', label: 'Hizmet Listesi', icon: List },
      { id: 'new', label: 'Yeni Hizmet Ekle', icon: PlusCircle },
      { id: 'categories', label: 'Kategori Yönetimi', icon: Grid },
   ];

   return (
      <div className="animate-fade-in space-y-8 pb-10 max-w-5xl">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">Hizmet Yönetimi</h2>
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

         <div className="w-full">
            {/* 1. Mevcut Hizmetler Listesi (Tab: list) */}
            {activeTab === 'list' && (
               <WidgetCard className="animate-fade-in">
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                     <List size={18} className="text-slate-400" /> Mevcut Hizmetlerim
                  </h3>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="text-xs text-slate-500 border-b border-slate-100">
                              <th className="py-3 font-bold uppercase w-1/3">Hizmet Adı</th>
                              <th className="py-3 font-bold uppercase w-1/3">Kategori</th>
                              <th className="py-3 font-bold uppercase text-right">İşlem</th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {services.map(s => (
                              <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                 <td className="py-3 font-bold text-slate-900">{s.name}</td>
                                 <td className="py-3 text-slate-600">
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs mr-2">{s.mainCat}</span>
                                    <span className="text-xs text-slate-400">{s.subCat}</span>
                                 </td>
                                 <td className="py-3 text-right">
                                    <button onClick={() => handleDeleteService(s.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                       <Trash2 size={16} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                           {services.length === 0 && (
                              <tr>
                                 <td colSpan={3} className="py-8 text-center text-slate-400 text-sm">Henüz hizmet eklenmemiş.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </WidgetCard>
            )}

            {/* 2. Yeni Hizmet Ekle Formu (Tab: new) */}
            {activeTab === 'new' && (
               <WidgetCard className="animate-fade-in">
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                     <PlusCircle size={18} className="text-green-500" /> Yeni Hizmet Ekle
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ana Kategori</label>
                        <select 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none"
                           value={newService.mainCat}
                           onChange={(e) => setNewService({...newService, mainCat: e.target.value})}
                        >
                           <option value="">Seçiniz</option>
                           {MAIN_CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alt Kategori</label>
                        <select 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none"
                           value={newService.subCat}
                           onChange={(e) => setNewService({...newService, subCat: e.target.value})}
                        >
                           <option value="">Seçiniz</option>
                           {SUB_CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hizmet Adı</label>
                        <input 
                           type="text" 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none" 
                           placeholder="Örn: Yıllık Kombi Bakımı"
                           value={newService.name}
                           onChange={(e) => setNewService({...newService, name: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                     <button onClick={handleAddService} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                        Hizmeti Kaydet
                     </button>
                  </div>
               </WidgetCard>
            )}

            {/* 3. Kategori Yönetimi (Tab: categories) */}
            {activeTab === 'categories' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  {/* Ana Kategori Ekle */}
                  <WidgetCard>
                     <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Ana Kategori Ekle</h3>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori Adı</label>
                           <input 
                              type="text" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none" 
                              value={newMainCat}
                              onChange={(e) => setNewMainCat(e.target.value)}
                           />
                        </div>
                        <button className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:border-slate-900 hover:text-slate-900 transition-colors">
                           Kategori Kaydet
                        </button>
                     </div>
                  </WidgetCard>

                  {/* Alt Kategori Ekle */}
                  <WidgetCard>
                     <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Alt Kategori Ekle</h3>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ana Kategori Seç</label>
                           <select 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
                              value={newSubCat.main}
                              onChange={(e) => setNewSubCat({...newSubCat, main: e.target.value})}
                           >
                              <option value="">Seçiniz</option>
                              {MAIN_CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                           </select>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alt Kategori Adı</label>
                           <input 
                              type="text" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
                              value={newSubCat.name}
                              onChange={(e) => setNewSubCat({...newSubCat, name: e.target.value})}
                           />
                        </div>
                        <button className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:border-slate-900 hover:text-slate-900 transition-colors">
                           Alt Kategori Kaydet
                        </button>
                     </div>
                  </WidgetCard>
               </div>
            )}
         </div>
      </div>
   );
};

export default ServicesManagement;