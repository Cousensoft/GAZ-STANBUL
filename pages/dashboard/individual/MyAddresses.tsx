
import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Map, X, Save, Check } from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { DISTRICTS } from '../../../utils/constants';

interface Address {
    id: number;
    title: string;
    type: 'home' | 'work' | 'other';
    city: string;
    district: string;
    fullAddress: string;
    active: boolean;
}

const IndividualAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([
        { id: 1, title: 'Ev Adresi', type: 'home', city: 'İstanbul', district: 'Kadıköy', fullAddress: 'Caferağa Mah. Moda Cad. No: 15 D:4', active: true },
        { id: 2, title: 'İş Yeri', type: 'work', city: 'İstanbul', district: 'Maslak', fullAddress: 'Büyükdere Cad. Plaza No: 123 Kat: 5', active: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Form State
    const [formData, setFormData] = useState<Partial<Address>>({
        title: '',
        type: 'home',
        city: 'İstanbul',
        district: '',
        fullAddress: '',
        active: false
    });

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'home',
            city: 'İstanbul',
            district: '',
            fullAddress: '',
            active: false
        });
        setEditingId(null);
    };

    const handleAddNew = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleEdit = (addr: Address) => {
        setFormData(addr);
        setEditingId(addr.id);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if(window.confirm('Bu adresi silmek istediğinize emin misiniz?')) {
            setAddresses(addresses.filter(a => a.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            // Update existing
            setAddresses(addresses.map(a => a.id === editingId ? { ...a, ...formData } as Address : a));
        } else {
            // Create new
            const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
            setAddresses([...addresses, { ...formData, id: newId } as Address]);
        }

        // If marked active, set others inactive
        if (formData.active) {
            setAddresses(prev => prev.map(a => ({
                ...a,
                active: (editingId ? a.id === editingId : a.id === (Math.max(...prev.map(p => p.id), 0) + 1))
            })));
        }

        setIsModalOpen(false);
        resetForm();
    };

    return (
        <div className="animate-fade-in space-y-6 relative">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Adreslerim</h2>
                    <p className="text-sm text-slate-500">Hizmet almak istediğiniz konumları yönetin.</p>
                </div>
                <button 
                    onClick={handleAddNew}
                    className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200"
                >
                    <Plus size={18} /> Yeni Adres Ekle
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(addr => (
                    <WidgetCard key={addr.id} className={`relative group transition-all border hover:border-slate-300 ${addr.active ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100'}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${addr.type === 'home' ? 'bg-orange-100 text-orange-600' : addr.type === 'work' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {addr.type === 'home' ? <Home size={18} /> : addr.type === 'work' ? <Briefcase size={18} /> : <MapPin size={18} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{addr.title}</h3>
                                    <span className="text-xs text-slate-500 font-medium">{addr.district}, {addr.city}</span>
                                </div>
                            </div>
                            {addr.active && (
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <Check size={10} strokeWidth={3} /> Varsayılan
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-start gap-2 text-slate-600 text-sm bg-white p-3 rounded-lg border border-slate-100 mb-4 min-h-[60px]">
                            <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                            <p className="leading-relaxed">{addr.fullAddress}</p>
                        </div>

                        <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(addr)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(addr.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </WidgetCard>
                ))}

                {/* Add New Placeholder Card */}
                <button 
                    onClick={handleAddNew}
                    className="border-2 border-dashed border-slate-200 rounded-[20px] flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all min-h-[200px] group"
                >
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Map size={24} />
                    </div>
                    <span className="font-bold text-sm">Yeni Adres Ekle</span>
                </button>
            </div>

            {/* --- ADD / EDIT MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl animate-fade-in-up">
                        
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">
                                {editingId ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Adres Başlığı</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Örn: Evim, Yazlık, Ofis"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Adres Tipi</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value as any})}
                                    >
                                        <option value="home">Ev Adresi</option>
                                        <option value="work">İş Yeri</option>
                                        <option value="other">Diğer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Şehir</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                        value={formData.city}
                                        onChange={e => setFormData({...formData, city: e.target.value})}
                                    >
                                        <option value="İstanbul">İstanbul</option>
                                        <option value="Ankara">Ankara</option>
                                        <option value="İzmir">İzmir</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">İlçe</label>
                                <select 
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                                    value={formData.district}
                                    onChange={e => setFormData({...formData, district: e.target.value})}
                                >
                                    <option value="">Seçiniz</option>
                                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Açık Adres</label>
                                <textarea 
                                    required
                                    rows={3}
                                    placeholder="Mahalle, Sokak, Kapı No, Daire No..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                                    value={formData.fullAddress}
                                    onChange={e => setFormData({...formData, fullAddress: e.target.value})}
                                ></textarea>
                            </div>

                            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                <input 
                                    type="checkbox" 
                                    className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                                    checked={formData.active}
                                    onChange={e => setFormData({...formData, active: e.target.checked})}
                                />
                                <span className="text-sm font-bold text-slate-700">Varsayılan adres olarak ayarla</span>
                            </label>

                            <div className="pt-2 flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                                >
                                    İptal
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-[2] py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Save size={18} /> Kaydet
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndividualAddresses;
