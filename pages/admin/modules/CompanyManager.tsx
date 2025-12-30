
import React, { useState, useEffect } from 'react';
import { 
    Building2, 
    Clock, 
    CheckCircle, 
    Star, 
    Eye, 
    ArrowLeft, 
    Lock, 
    Unlock, 
    Trash2, 
    Edit3, 
    PlusCircle, 
    Save, 
    Briefcase, 
    Image as ImageIcon, 
    MapPin, 
    TrendingUp, 
    TurkishLira, 
    AlertTriangle, 
    Wallet, 
    Phone, 
    Mail, 
    Globe, 
    ExternalLink, 
    Shield, 
    Search, 
    Filter, 
    Download, 
    FileText, 
    Upload, 
    X, 
    ChevronRight, 
    MessageSquare, 
    ShieldCheck, 
    Info, 
    Activity,
    Plus,
    Calendar,
    PieChart
} from 'lucide-react';
import { PerformanceStat, WidgetCard } from '../../../components/dashboard/Widgets';
import { GroupedBarChart, DonutChart } from '../../../components/admin/Charts';
import { SECTORS } from '../../../utils/constants';

import CompanyInfo from './company/CompanyInfo';
import CompanyFinance from './company/CompanyFinance';
import CompanyRisk from './company/CompanyRisk';
import CompanyFeedback from './company/CompanyFeedback';
import CompanyDocs from './company/CompanyDocs';
import PaymentReports from './company/PaymentReports';
import CompanyAdd from './company/CompanyAdd';
import CompanyEdit from './company/CompanyEdit'; // Yeni Import

const CompanyManager = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'list' | 'add' | 'detail' | 'payment-reports'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'suspended' | 'risky'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Yeni Filtre State'leri
  const [filterSector, setFilterSector] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  useEffect(() => {
      if (localStorage.getItem('open_company_add') === 'true') {
          setActiveTab('add');
          localStorage.removeItem('open_company_add');
      }
      if (localStorage.getItem('company_filter_pending') === 'true') {
          setFilterStatus('pending');
          setActiveTab('list');
          localStorage.removeItem('company_filter_pending');
      }
  }, []);

  // MOCK COMPANIES - Updated with Request Stats
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Bosphorus Enerji', sector: 'Doğalgaz', status: 'verified', isRisky: false, rating: 4.8, location: 'Kadıköy', date: '12.05.2023', phone: '0216 555 44 33', email: 'info@bosphorus.com', web: 'www.bosphorus.com', address: 'Moda Cad. No:12', privateReq: 154, totalReq: 420 },
    { id: 2, name: 'Galata Mekanik', sector: 'Mekanik Tesisat', status: 'pending', isRisky: false, rating: 0, location: 'Beyoğlu', date: '15.06.2023', phone: '0212 444 33 22', email: 'info@galata.com', web: 'www.galata.com', address: 'İstiklal Cad. No:45', privateReq: 76, totalReq: 120 },
    { id: 3, name: 'TechIstanbul', sector: 'Teknoloji', status: 'verified', isRisky: false, rating: 4.9, location: 'Ataşehir', date: '20.10.2024', phone: '0850 333 22 11', email: 'contact@tech.com', web: 'www.techistanbul.com', address: 'Barbaros Bul. No:8', privateReq: 98, totalReq: 350 },
    { id: 4, name: 'Anadolu Tesisat', sector: 'Mekanik Tesisat', status: 'suspended', isRisky: true, rating: 3.2, location: 'Üsküdar', date: '01.02.2024', phone: '0216 111 00 00', email: 'destek@anadolu.com', web: 'www.anadolu.com', address: 'Üsküdar Meydan', privateReq: 12, totalReq: 80 },
    { id: 5, name: 'Kuzey Elektrik', sector: 'Elektrik Sistemleri', status: 'verified', isRisky: false, rating: 4.5, location: 'Şişli', date: '05.03.2024', phone: '0212 999 88 77', email: 'info@kuzey.com', web: 'www.kuzeyel.com', address: 'Halaskargazi Cad.', privateReq: 45, totalReq: 210 },
    { id: 6, name: 'Riskli Yapı Denetim', sector: 'İnşaat', status: 'verified', isRisky: true, rating: 2.1, location: 'Kartal', date: '01.11.2024', phone: '0216 444 55 66', email: 'info@riskli.com', web: 'www.riskyapi.com', address: 'Kartal Sahil', privateReq: 5, totalReq: 25 },
  ]);

  const filteredCompanies = companies.filter(c => {
      // Status Filtresi
      const matchesStatus = filterStatus === 'all' 
          ? true 
          : filterStatus === 'risky' 
              ? c.isRisky 
              : c.status === filterStatus;
      
      // Arama Filtresi
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower);

      // Sektör Filtresi
      const matchesSector = filterSector === 'all' || c.sector === filterSector;

      // Puan Filtresi
      let matchesRating = true;
      if (filterRating !== 'all') {
          if (filterRating === '4.5+') {
              matchesRating = c.rating >= 4.5;
          } else {
              const [minStr, maxStr] = filterRating.split('-');
              const min = parseFloat(minStr);
              const max = parseFloat(maxStr);
              
              if (!isNaN(min) && !isNaN(max)) {
                  if (max === 5) {
                      matchesRating = c.rating >= min && c.rating <= max;
                  } else {
                      matchesRating = c.rating >= min && c.rating < max;
                  }
              }
          }
      }

      return matchesStatus && matchesSearch && matchesSector && matchesRating;
  });

  const openCompanyDetail = (companyId: number) => {
      setSelectedCompanyId(companyId);
      setActiveTab('detail');
  };

  const goToListWithFilter = (filter: any) => {
      setFilterStatus(filter);
      setSearchQuery('');
      setFilterSector('all');
      setFilterRating('all');
      setActiveTab('list');
  };

  const renderOverview = () => {
    const registrationComparisonData = [
        { label: 'OCA', current: 40, previous: 25 },
        { label: 'ŞUB', current: 55, previous: 40 },
        { label: 'MAR', current: 45, previous: 35 },
        { label: 'NİS', current: 80, previous: 50 },
        { label: 'MAY', current: 65, previous: 55 },
        { label: 'HAZ', current: 90, previous: 70 },
        { label: 'TEM', current: 100, previous: 85 },
    ];

    const activeCompaniesCount = companies.filter(c => c.status === 'verified').length;
    const riskyCompaniesCount = companies.filter(c => c.isRisky).length;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat label="Aylık Toplam Ciro" value="452.500 ₺" subtext="Bu ayki toplam ciro" colorName="emerald" hexColor="#10b981" icon={TurkishLira} type="circle" percentage={82} />
                <div onClick={() => goToListWithFilter('verified')} className="cursor-pointer">
                    <PerformanceStat label="Aktif Firma" value={activeCompaniesCount.toString()} subtext="Filtrelemek için tıkla" colorName="blue" hexColor="#3b82f6" icon={Building2} type="circle" percentage={95} />
                </div>
                <PerformanceStat label="Memnuniyet" value="4.7" subtext="Ortalama puan" colorName="amber" hexColor="#f59e0b" icon={Star} type="icon" />
                <div onClick={() => goToListWithFilter('risky')} className="cursor-pointer">
                    <PerformanceStat label="Riskli Firma" value={riskyCompaniesCount.toString()} subtext="İncelemek için tıkla" colorName="red" hexColor="#ef4444" icon={AlertTriangle} type="icon" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <WidgetCard className="lg:col-span-2 flex flex-col h-full" title="Firma Büyümesi & Kayıtlar">
                    <div className="flex items-start justify-between mb-8 shrink-0">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-4xl font-black text-slate-900 tracking-tighter">+124</span>
                                <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                                    <TrendingUp size={12} strokeWidth={3} /> %8.5
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bu Ay</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Geçen Ay</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[224px]">
                        <GroupedBarChart data={registrationComparisonData} height={224} mainColor="bg-indigo-600" secColor="bg-slate-300" showYAxis={true} />
                    </div>
                </WidgetCard>

                <WidgetCard title="Finansal Durum & Ödemeler" className="flex flex-col h-full">
                    <div className="flex flex-col h-full justify-between gap-6">
                        <div className="flex items-center justify-between">
                            <div><p className="text-xs font-bold text-slate-400 uppercase">Havuz Bakiyesi</p><h3 className="text-3xl font-black text-slate-900 mt-1">1.2M ₺</h3></div>
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><Wallet size={20} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                                <span className="block text-[10px] font-bold text-orange-600 uppercase mb-1">Dağıtılacak</span>
                                <span className="block text-lg font-bold text-slate-900">850K ₺</span>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                <span className="block text-[10px] font-bold text-blue-600 uppercase mb-1">Komisyon</span>
                                <span className="block text-lg font-bold text-slate-900">350K ₺</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs"><span className="font-bold text-slate-500">Ödeme Döngüsü</span><span className="font-bold text-slate-900">15 Gün Kaldı</span></div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-slate-900 h-full w-[50%]"></div></div>
                        </div>
                        <button onClick={() => setActiveTab('payment-reports')} className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors mt-auto">Detaylı Raporu İncele</button>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
  };

  const renderList = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar shrink-0">
                {['all', 'pending', 'verified', 'suspended', 'risky'].map(status => (
                    <button key={status} onClick={() => setFilterStatus(status as any)} className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${filterStatus === status ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{status === 'all' ? 'Tümü' : status === 'pending' ? 'Onay Bekleyen' : status === 'verified' ? 'Onaylılar' : status === 'suspended' ? 'Askıda' : 'Riskli'}</button>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <select 
                    className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer h-[42px]"
                    value={filterSector}
                    onChange={(e) => setFilterSector(e.target.value)}
                >
                    <option value="all">Tüm Sektörler</option>
                    {SECTORS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>

                <select 
                    className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer h-[42px]"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                >
                    <option value="all">Tüm Puanlar</option>
                    <option value="4.5+">4.5 ve Üzeri</option>
                    <option value="4-5">4 - 5 Arası</option>
                    <option value="3-4">3 - 4 Arası</option>
                    <option value="2-3">2 - 3 Arası</option>
                    <option value="1-2">1 - 2 Arası</option>
                    <option value="0-1">0 - 1 Arası</option>
                </select>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Firma adı veya ID..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 shrink-0 h-[42px] w-[42px] flex items-center justify-center">
                    <Filter size={18}/>
                </button>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 w-4"><input type="checkbox" className="rounded border-slate-300" /></th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Firma</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Sektör</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Puan</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Talep Analizi</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Konum</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Durum</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredCompanies.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/50 group">
                                <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm flex-shrink-0 border border-slate-200">
                                            {c.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm flex items-center gap-1">
                                                {c.name}
                                                {c.isRisky && <AlertTriangle size={12} className="text-red-500" />}
                                            </div>
                                            <div className="text-[10px] text-slate-500">ID: #{c.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-xs font-medium text-slate-600">{c.sector}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                        <Star size={14} fill={c.rating > 0 ? "currentColor" : "none"} className={c.rating === 0 ? "text-slate-300" : ""} />
                                        <span className={c.rating === 0 ? "text-slate-400" : ""}>{c.rating > 0 ? c.rating : '-'}</span>
                                    </div>
                                </td>
                                {/* Minimal Talep İstatistiği */}
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-200 flex items-center gap-1">
                                            <Lock size={8}/> {c.privateReq}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">/ {c.totalReq} Toplam</span>
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-slate-500"><span className="flex items-center gap-1"><MapPin size={12}/> {c.location}</span></td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase w-fit ${c.status === 'verified' ? 'bg-green-50 text-green-600' : c.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                                        {c.status === 'verified' ? 'Onaylı' : c.status === 'pending' ? 'Bekliyor' : 'Askıda'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => openCompanyDetail(c.id)} className="bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold">Detay Gör</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div><p className="text-sm text-slate-500">Platform firmalarının yönetimi, listelemesi ve onayı.</p></div>
            {activeTab !== 'detail' && activeTab !== 'payment-reports' && (
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Genel Bakış</button>
                    <button onClick={() => setActiveTab('list')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>Firma Listesi</button>
                    <button onClick={() => setActiveTab('add')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'add' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}><PlusCircle size={14}/> Yeni Ekle</button>
                </div>
            )}
        </div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'list' && renderList()}
        {activeTab === 'add' && <CompanyAdd onBack={() => setActiveTab('list')} />}
        {activeTab === 'detail' && selectedCompanyId && <DetailWrapper id={selectedCompanyId} onBack={() => setActiveTab('list')} />}
        {activeTab === 'payment-reports' && <PaymentReports onBack={() => setActiveTab('overview')} />}
    </div>
  );
};

const DetailWrapper = ({ id, onBack }: any) => {
    const [detailTab, setDetailTab] = useState<'info' | 'finance' | 'risk' | 'feedback' | 'edit' | 'docs'>('info');
    
    // Not State'i
    const [notes, setNotes] = useState([
        { id: 1, text: "Bu firma son 3 ayda satışlarını %15 artırdı. Müşteri memnuniyeti yüksek.", date: "24.10.2024" },
        { id: 2, text: "Firma yetkilisi Ahmet Bey ile görüşüldü, yeni şubeleri için destek istendi.", date: "12.09.2024" }
    ]);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteText, setNewNoteText] = useState("");

    const handleAddNote = () => {
        if (!newNoteText.trim()) return;
        const newNote = {
            id: Date.now(),
            text: newNoteText,
            date: new Date().toLocaleDateString('tr-TR')
        };
        setNotes([newNote, ...notes]);
        setNewNoteText("");
        setIsAddingNote(false);
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const fullCompanyDetails = {
        id,
        name: 'Bosphorus Enerji Ltd.',
        status: 'verified',
        manager: { name: 'Ahmet Yılmaz', phone: '0532 111 22 33', email: 'ahmet@bosphorus.com' },
        financial: {
            pendingPayment: 12500,
            totalPaid: 124000,
            commissionRate: 10,
            nextPaymentDate: '30.10.2024',
            paymentMethod: 'Havale / IBAN',
            lastPaymentDate: '15.10.2024'
        },
        risk: {
            score: 85,
            factors: []
        },
        feedback: {
            complaints: 2,
            returnReasons: [
                { reason: 'Hatalı Parça', count: 3 },
                { reason: 'Geç Teslimat', count: 1 }
            ],
            reviews: [
                { user: 'Caner E.', rating: 5, comment: 'Çok memnun kaldık.' },
                { user: 'Selin Y.', rating: 4, comment: 'Hızlı servis.' }
            ]
        },
        documents: [
            { id: 1, name: 'Vergi Levhası 2024', type: 'PDF', date: '12.05.2024', status: 'valid' },
            { id: 2, name: 'Sicil Gazetesi', type: 'PDF', date: '01.01.2023', status: 'valid' }
        ]
    };

    const tabs = [
        { id: 'info', label: 'Genel Bilgi', icon: Info },
        { id: 'finance', label: 'Finans', icon: TurkishLira },
        { id: 'risk', label: 'Risk Kontrol', icon: ShieldCheck },
        { id: 'feedback', label: 'Geri Bildirim', icon: MessageSquare },
        { id: 'docs', label: 'Belgeler', icon: FileText },
        { id: 'edit', label: 'Düzenle', icon: Edit3 },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> Listeye Dön
                </button>
                <div className="flex gap-2">
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"><Mail size={18}/></button>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"><Phone size={18}/></button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={18}/></button>
                </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center font-black text-4xl text-slate-400 border-2 border-white shadow-lg shrink-0">
                    {fullCompanyDetails.name.substring(0, 1)}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-3">
                        {fullCompanyDetails.name}
                        <CheckCircle size={24} className="text-blue-500" fill="white"/>
                    </h2>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><MapPin size={16}/> İstanbul, Kadıköy</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5 font-bold text-slate-900">ID: #{id}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">Aktif Firma</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2">
                        <ExternalLink size={16}/> Profili Görüntüle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3 space-y-2">
                    <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm flex flex-col gap-1">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setDetailTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all ${
                                    detailTab === tab.id 
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-[1.02]' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <tab.icon size={18}/>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    {/* Hızlı Not Alanı - Sadece Adminlerin Göreceği Fonksiyonel Alan */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hızlı Notlar (Admin-Only)</span>
                                <button 
                                    onClick={() => setIsAddingNote(!isAddingNote)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors text-blue-400"
                                >
                                    {isAddingNote ? <X size={16}/> : <Plus size={16}/>}
                                </button>
                            </div>

                            {isAddingNote && (
                                <div className="mb-4 animate-fade-in">
                                    <textarea 
                                        autoFocus
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 transition-all resize-none"
                                        placeholder="Yeni bir not yazın..."
                                        rows={3}
                                        value={newNoteText}
                                        onChange={(e) => setNewNoteText(e.target.value)}
                                    ></textarea>
                                    <button 
                                        onClick={handleAddNote}
                                        className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase transition-all"
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            )}

                            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {notes.map(note => (
                                    <div key={note.id} className="group relative border-l-2 border-blue-500/30 pl-3 py-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-tighter">
                                                <Calendar size={8}/> {note.date}
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={10}/>
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{note.text}</p>
                                    </div>
                                ))}
                                {notes.length === 0 && !isAddingNote && (
                                    <p className="text-[10px] text-slate-500 italic text-center py-4">Kayıtlı not bulunmuyor.</p>
                                )}
                            </div>
                            
                            {!isAddingNote && (
                                <button 
                                    onClick={() => setIsAddingNote(true)}
                                    className="mt-4 w-full py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-tighter text-blue-400 hover:bg-white/10 rounded-xl transition-all"
                                >
                                    Yeni Not Ekle
                                </button>
                            )}
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                </div>

                <div className="lg:col-span-9 min-h-[600px]">
                    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm h-full">
                        {detailTab === 'info' && <CompanyInfo company={fullCompanyDetails} details={fullCompanyDetails} />}
                        {detailTab === 'finance' && <CompanyFinance financial={fullCompanyDetails.financial} />}
                        {detailTab === 'risk' && <CompanyRisk risk={fullCompanyDetails.risk} />}
                        {detailTab === 'feedback' && <CompanyFeedback feedback={fullCompanyDetails.feedback} />}
                        {detailTab === 'docs' && <CompanyDocs documents={fullCompanyDetails.documents} />}
                        {detailTab === 'edit' && <CompanyEdit company={fullCompanyDetails} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyManager;
