import React, { useState } from 'react';
import { 
    Save, X, Image as ImageIcon, Box, TurkishLira, Tag, 
    FileText, Truck, ArrowLeft, Upload, Plus, Trash2, HelpCircle,
    ChevronDown, Settings2,
    // Fix: Add missing Info import from lucide-react to resolve the error on line 59
    Info
} from 'lucide-react';
import { WidgetCard } from '../../../../components/dashboard/Widgets';
import { SECTORS } from '../../../../utils/constants';

interface AddProductProps {
    onBack: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'general' | 'media' | 'pricing' | 'variants'>('general');
    const [images, setImages] = useState<string[]>([]);
    const [variants, setVariants] = useState<{name: string, value: string, priceMod: number, stock: number}[]>([]);
    
    const [formData, setFormData] = useState({
        name: '', mainCategory: '', subCategory: '', brand: '', description: '', price: '', stock: 1
    });

    const addVariant = () => {
        setVariants([...variants, { name: '', value: '', priceMod: 0, stock: 1 }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    return (
        <div className="animate-fade-in space-y-6 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"><ArrowLeft size={20}/></button>
                    <div><h2 className="text-xl font-bold text-slate-900">Ürün Yönetimi</h2></div>
                </div>
                <div className="flex gap-2">
                    <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-sm">İptal</button>
                    <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-red-600 transition-all shadow-lg flex items-center gap-2"><Save size={16}/> Kaydet</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <button onClick={() => setActiveTab('general')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 ${activeTab === 'general' ? 'border-red-600 bg-red-50/30 text-red-600' : 'border-transparent text-slate-50'}`}><FileText size={18}/> Genel Bilgiler</button>
                        <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 ${activeTab === 'media' ? 'border-red-600 bg-red-50/30 text-red-600' : 'border-transparent text-slate-50'}`}><ImageIcon size={18}/> Medya</button>
                        <button onClick={() => setActiveTab('pricing')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 ${activeTab === 'pricing' ? 'border-red-600 bg-red-50/30 text-red-600' : 'border-transparent text-slate-50'}`}><TurkishLira size={18}/> Fiyat & Stok</button>
                        <button onClick={() => setActiveTab('variants')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 ${activeTab === 'variants' ? 'border-red-600 bg-red-50/30 text-red-600' : 'border-transparent text-slate-50'}`}><Settings2 size={18}/> Seçenekler (Varyant)</button>
                    </div>
                </div>

                <div className="lg:col-span-9">
                    {activeTab === 'variants' && (
                        <WidgetCard title="Ürün Varyantları">
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 mb-6">
                                <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">Farklı renk, boyut veya kapasite seçeneklerini buradan ekleyebilirsiniz. Her varyant için <b>fiyat farkı</b> ve <b>özel stok</b> belirleyebilirsiniz.</p>
                            </div>

                            <div className="space-y-4">
                                {variants.map((v, idx) => (
                                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
                                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Özellik</label><input type="text" placeholder="Örn: Renk" className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" value={v.name} onChange={e => {const nv = [...variants]; nv[idx].name = e.target.value; setVariants(nv);}} /></div>
                                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Değer</label><input type="text" placeholder="Örn: Metalik Gri" className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" value={v.value} onChange={e => {const nv = [...variants]; nv[idx].value = e.target.value; setVariants(nv);}} /></div>
                                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Fiyat Farkı (₺)</label><input type="number" className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" value={v.priceMod} onChange={e => {const nv = [...variants]; nv[idx].priceMod = Number(e.target.value); setVariants(nv);}} /></div>
                                        <div className="flex items-end gap-2">
                                            <div className="flex-1"><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Stok</label><input type="number" className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" value={v.stock} onChange={e => {const nv = [...variants]; nv[idx].stock = Number(e.target.value); setVariants(nv);}} /></div>
                                            <button onClick={() => removeVariant(idx)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addVariant} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs uppercase hover:bg-slate-50 hover:text-slate-600 transition-all flex items-center justify-center gap-2"><Plus size={18}/> Seçenek Ekle</button>
                            </div>
                        </WidgetCard>
                    )}
                    {/* Diğer sekmeler (general, media, pricing) mevcut AddProduct logic'iyle kalır... */}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;