
import React, { useState, useMemo } from 'react';
import { 
    Calendar as CalendarIcon, 
    MapPin, 
    User, 
    ChevronLeft, 
    ChevronRight, 
    CheckCircle,
    Phone,
    MessageSquare,
    ArrowLeft,
    LayoutList,
    Grid3X3,
    Navigation,
    Briefcase,
    HardHat,
    Users,
    X,
    PlusCircle,
    AlertCircle
} from 'lucide-react';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { useAuth } from '../../../context/AuthContext';

interface Job {
    id: string;
    customer: string;
    service: string;
    date: string;
    location: string;
    status: 'confirmed' | 'pending' | 'completed' | 'unassigned';
    phone: string;
    address: string;
    notes: string;
    technicianId: string | null; // Null ise atanmamış
    technicianName: string;
}

interface MockEmployee {
    id: string;
    name: string;
    role: string;
    status: 'available' | 'busy';
    currentJobs: number;
    avatar: string;
}

const SchedulePage = () => {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1)); // Ekim 2024
    
    // Atama Modalı State'leri
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [jobToAssign, setJobToAssign] = useState<Job | null>(null);

    const isTechnician = user?.role === 'technician';
    // Eğer user 'technician' ise ve 'manager' yetkisi varsa veya user 'corporate' ise yönetici sayılır
    const isManager = user?.role === 'corporate' || (user?.role === 'technician' && user?.employeeRole === 'manager');

    // Mock Çalışan Verileri (Atama için)
    const availableEmployees: MockEmployee[] = [
        { id: 'tech-user-01', name: 'Ahmet Usta (Siz)', role: 'Yönetici', status: 'available', currentJobs: 2, avatar: 'AU' },
        { id: 'emp-002', name: 'Mehmet Demir', role: 'Kıdemli Usta', status: 'busy', currentJobs: 4, avatar: 'MD' },
        { id: 'emp-003', name: 'Ali Veli', role: 'Tekniker', status: 'available', currentJobs: 0, avatar: 'AV' },
        { id: 'emp-004', name: 'Zeynep Yılmaz', role: 'Stajyer', status: 'available', currentJobs: 1, avatar: 'ZY' },
    ];

    // Mock İş Verileri
    const [allJobs, setAllJobs] = useState<Job[]>([
        { 
            id: 'JOB-201', 
            customer: 'Selin K.', 
            service: 'Petek Temizliği', 
            date: '2024-10-28', 
            location: 'Beşiktaş', 
            status: 'confirmed', 
            phone: '0532 111 22 33', 
            address: 'Bebek Mah. Cevdetpaşa Cad. No:42 D:3', 
            notes: 'Müşteri bina girişinde bekleyecek.',
            technicianId: 'tech-user-01', 
            technicianName: 'Ahmet Usta'
        },
        { 
            id: 'JOB-202', 
            customer: 'Ahmet Yılmaz', 
            service: 'Kombi Bakımı', 
            date: '2024-10-29', 
            location: 'Kadıköy', 
            status: 'confirmed', 
            phone: '0533 444 55 66', 
            address: 'Moda Cad. Ferit Tek Sok. No:12', 
            notes: 'Kombi balkonda, anahtar kapıcıda.',
            technicianId: 'tech-user-01',
            technicianName: 'Ahmet Usta'
        },
        { 
            id: 'JOB-205', 
            customer: 'Site Yönetimi', 
            service: 'Merkezi Sistem Kontrol', 
            date: '2024-10-30', 
            location: 'Ümraniye', 
            status: 'unassigned', // Atanmamış İş Örneği
            phone: '0216 111 22 33', 
            address: 'Tepeüstü Mah. Poyraz Cad.', 
            notes: 'Acil ekip yönlendirilmesi gerekiyor.',
            technicianId: null,
            technicianName: 'Atanmadı'
        },
        { 
            id: 'JOB-203', 
            customer: 'Mert Demir', 
            service: 'Gaz Kaçağı Tespiti', 
            date: '2024-10-30', 
            location: 'Üsküdar', 
            status: 'confirmed', 
            phone: '0544 777 88 99', 
            address: 'Mimar Sinan Mah. Selmani Pak Cad. No:5', 
            notes: 'Acil kontrol gerekli.',
            technicianId: 'emp-002',
            technicianName: 'Mehmet Demir'
        },
    ]);

    const handleAssignClick = (e: React.MouseEvent, job: Job) => {
        e.stopPropagation();
        setJobToAssign(job);
        setIsAssignModalOpen(true);
    };

    const confirmAssignment = (employeeId: string) => {
        if (!jobToAssign) return;
        
        const employee = availableEmployees.find(e => e.id === employeeId);
        
        setAllJobs(prev => prev.map(job => {
            if (job.id === jobToAssign.id) {
                return {
                    ...job,
                    technicianId: employeeId,
                    technicianName: employee ? employee.name : 'Bilinmiyor',
                    status: 'confirmed'
                };
            }
            return job;
        }));

        // Eğer detay modundaysak ve o anki işi güncellediysek, seçili işi de güncelle
        if (selectedJob && selectedJob.id === jobToAssign.id) {
             setSelectedJob({
                    ...selectedJob,
                    technicianId: employeeId,
                    technicianName: employee ? employee.name : 'Bilinmiyor',
                    status: 'confirmed'
             });
        }

        setIsAssignModalOpen(false);
        setJobToAssign(null);
        alert(`${jobToAssign.id} numaralı iş başarıyla ${employee?.name} isimli personele atandı.`);
    };

    // Rol tabanlı filtreleme
    const filteredJobs = useMemo(() => {
        if (isTechnician && !isManager) {
            // Sadece worker olanlar sadece kendi işlerini görür
            return allJobs.filter(job => job.technicianId === user?.id);
        }
        // Kurumsal veya Manager olanlar tüm işleri görür
        return allJobs;
    }, [user, isTechnician, isManager, allJobs]);

    // --- GELİŞMİŞ TAKVİM HESAPLAMA (42 GÜN) ---
    const getCalendarDays = (viewDate: Date) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        const days = [];
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startOffset - 1; i >= 0; i--) {
            days.push(new Date(year, month - 1, prevMonthLastDay - i));
        }
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        
        const remainingSlots = 42 - days.length;
        for (let i = 1; i <= remainingSlots; i++) {
            days.push(new Date(year, month + 1, i));
        }
        
        return days;
    };

    const calendarDays = getCalendarDays(currentMonth);

    // --- DETAY GÖRÜNÜMÜ ---
    if (selectedJob) {
        return (
            <div className="animate-fade-in space-y-6">
                
                {/* ATAMA MODALI (Detay içinden çağrılırsa) */}
                {isAssignModalOpen && jobToAssign && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssignModalOpen(false)}></div>
                        <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h3 className="font-bold text-slate-900">Personel Ata</h3>
                                    <p className="text-xs text-slate-500">İş ID: {jobToAssign.id}</p>
                                </div>
                                <button onClick={() => setIsAssignModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={18}/></button>
                            </div>
                            <div className="p-4 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-3">
                                    {availableEmployees.map(emp => (
                                        <button 
                                            key={emp.id}
                                            onClick={() => confirmAssignment(emp.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                                                    {emp.avatar}
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                                                    <p className="text-xs text-slate-500">{emp.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${emp.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {emp.status === 'available' ? 'Müsait' : 'Meşgul'}
                                                </span>
                                                <p className="text-[10px] text-slate-400 mt-1">{emp.currentJobs} Aktif İş</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedJob(null)} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Randevu Detayı</h2>
                        <p className="text-sm text-slate-500">#{selectedJob.id} numaralı iş kaydı.</p>
                    </div>
                    {isManager && (
                         <button 
                            onClick={(e) => handleAssignClick(e, selectedJob)}
                            className="ml-auto bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-blue-600 transition-colors"
                         >
                            <Users size={16}/> {selectedJob.technicianId ? 'Personeli Değiştir' : 'Personel Ata'}
                         </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <WidgetCard className="relative overflow-hidden border-l-4 border-l-blue-600">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Hizmet Bilgisi</span>
                                        <span className={`text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded ${!selectedJob.technicianId ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                            <HardHat size={12}/> {selectedJob.technicianId ? `Atanan: ${selectedJob.technicianName}` : 'PERSONEL ATANMADI'}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{selectedJob.service}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                                        <CalendarIcon size={16} /> 
                                        {new Date(selectedJob.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })}
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col gap-2">
                                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase border flex items-center gap-2 ${selectedJob.status === 'unassigned' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                                        {selectedJob.status === 'unassigned' ? <AlertCircle size={14}/> : <CheckCircle size={14}/>} 
                                        {selectedJob.status === 'unassigned' ? 'Bekliyor' : 'Onaylı İş'}
                                    </span>
                                </div>
                            </div>
                        </WidgetCard>
                        {/* ... Diğer detay bileşenleri (aynı kalır) ... */}
                        <WidgetCard title="Müşteri ve Konum">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">
                                            {selectedJob.customer.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{selectedJob.customer}</h4>
                                            <p className="text-xs text-slate-500">Bireysel Müşteri</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all font-bold text-sm">
                                            <Phone size={18}/> {selectedJob.phone}
                                        </button>
                                        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all font-bold text-sm">
                                            <MessageSquare size={18}/> Mesaj Gönder
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <MapPin size={12}/> Açık Adres
                                        </h5>
                                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                            {selectedJob.address} <br/>
                                            <span className="font-black text-slate-900">{selectedJob.location} / İstanbul</span>
                                        </p>
                                    </div>
                                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                                        <Navigation size={16}/> Yol Tarifi Al
                                    </button>
                                </div>
                            </div>
                        </WidgetCard>
                    </div>

                    <div className="space-y-6">
                        <WidgetCard title="Notlar">
                            <p className="text-sm text-slate-600 italic bg-amber-50 p-4 rounded-xl border border-amber-100">
                                "{selectedJob.notes}"
                            </p>
                        </WidgetCard>
                        
                        {/* Eğer bakan kişi işi yapan kişiyse */}
                        {(isTechnician && !isManager) && selectedJob.technicianId === user?.id && (
                            <WidgetCard title="İşlem Yönetimi">
                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-green-700 transition-all">İşi Başlat</button>
                                    <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50">Erteleme Talebi</button>
                                </div>
                            </WidgetCard>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in relative">
            
            {/* ATAMA MODALI (Liste üzerinden çağrılırsa) */}
            {isAssignModalOpen && jobToAssign && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssignModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold text-slate-900">Personel Ata</h3>
                                <p className="text-xs text-slate-500">İş: {jobToAssign.service} ({jobToAssign.location})</p>
                            </div>
                            <button onClick={() => setIsAssignModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={18}/></button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-3">
                                {availableEmployees.map(emp => (
                                    <button 
                                        key={emp.id}
                                        onClick={() => confirmAssignment(emp.id)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                                                {emp.avatar}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                                                <p className="text-xs text-slate-500">{emp.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${emp.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {emp.status === 'available' ? 'Müsait' : 'Meşgul'}
                                            </span>
                                            <p className="text-[10px] text-slate-400 mt-1">{emp.currentJobs} Aktif İş</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header / View Switcher */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isTechnician && !isManager ? 'İş Programım' : 'Şirket Takvimi'}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {isTechnician && !isManager ? 'Size atanan işlerin takibi.' : 'Tüm ekibin iş dağılımı ve atama yönetimi.'}
                    </p>
                </div>
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <LayoutList size={14}/> Liste
                    </button>
                    <button 
                        onClick={() => setViewMode('calendar')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'calendar' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Grid3X3 size={14}/> Takvim
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                /* --- LİSTE GÖRÜNÜMÜ --- */
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1 space-y-4">
                        <WidgetCard className="bg-slate-900 text-white border-none">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Özet Bilgi</h4>
                            <div className="space-y-6 relative">
                                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                                {filteredJobs.slice(0, 3).map((job, i) => (
                                    <div key={i} className="flex gap-4 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-black text-xs shadow-lg shadow-blue-900/50">
                                            {new Date(job.date).getDate()}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-sm line-clamp-1">{job.service}</h5>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">{job.location} • {job.customer}</p>
                                        </div>
                                    </div>
                                ))}
                                {filteredJobs.length === 0 && (
                                    <p className="text-xs text-slate-500 italic">Planlanmış iş bulunmuyor.</p>
                                )}
                            </div>
                        </WidgetCard>
                        
                        {isManager && (
                             <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ekip Durumu</h4>
                                <div className="space-y-3">
                                    {availableEmployees.map(emp => (
                                        <div key={emp.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600">{emp.avatar}</div>
                                                <span className="text-xs font-bold text-slate-700">{emp.name}</span>
                                            </div>
                                            <span className={`w-2 h-2 rounded-full ${emp.status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        )}
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><CalendarIcon size={18} className="text-blue-600"/> Yaklaşan Randevular ({filteredJobs.length})</h3>
                        </div>

                        <div className="space-y-3">
                            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                                <WidgetCard key={job.id} className={`transition-all group border-l-4 ${!job.technicianId ? 'border-l-red-500 hover:border-red-200' : 'border-l-transparent hover:border-blue-200'}`}>
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-all shrink-0">
                                                <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-white/60">
                                                    {new Date(job.date).toLocaleDateString('tr-TR', { month: 'short' })}
                                                </span>
                                                <span className="text-2xl font-black text-slate-900 leading-none group-hover:text-white">
                                                    {new Date(job.date).getDate()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.service}</h4>
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${!job.technicianId ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                                                        {job.technicianId ? 'Onaylı' : 'Personel Bekliyor'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 font-bold">
                                                    <span className="flex items-center gap-1.5"><User size={14} className="text-slate-400"/> {job.customer}</span>
                                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {job.location}</span>
                                                    
                                                    {/* Yönetici Görünümü: Personel Göster/Ata */}
                                                    {isManager ? (
                                                        <button 
                                                            onClick={(e) => handleAssignClick(e, job)}
                                                            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-colors ${!job.technicianId ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                                                        >
                                                            <HardHat size={12}/> {job.technicianName} {!job.technicianId && '(Ata)'}
                                                        </button>
                                                    ) : !isTechnician && (
                                                        <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 rounded-full"><HardHat size={12}/> {job.technicianName}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all border border-slate-100" title="Ara"><Phone size={18}/></button>
                                            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100" title="Mesaj"><MessageSquare size={18}/></button>
                                            <button onClick={() => setSelectedJob(job)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-100">Detay</button>
                                        </div>
                                    </div>
                                </WidgetCard>
                            )) : (
                                <div className="py-12 text-center text-slate-400 bg-white border border-dashed border-slate-200 rounded-2xl">
                                    <Briefcase size={48} className="mx-auto mb-3 opacity-20"/>
                                    <p>Görüntülenecek iş bulunamadı.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* --- TAKVİM GÖRÜNÜMÜ --- */
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-fade-in h-[750px]">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                            </h3>
                            <div className="flex gap-1">
                                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-900"><ChevronLeft size={20}/></button>
                                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-900"><ChevronRight size={20}/></button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div> Planlı İş</div>
                            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Atanmamış</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/20">
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                            <div key={day} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 grid grid-cols-7 grid-rows-6 overflow-hidden">
                        {calendarDays.map((date, i) => {
                            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                            const dateStr = date.toISOString().split('T')[0];
                            const dayJobs = filteredJobs.filter(j => j.date === dateStr);
                            const isToday = new Date().toDateString() === date.toDateString();

                            return (
                                <div key={i} className={`p-2 border-r border-b border-slate-100 flex flex-col gap-1 transition-colors relative h-full ${!isCurrentMonth ? 'bg-slate-50/50 grayscale opacity-40' : 'hover:bg-slate-50/50'} ${isToday ? 'bg-blue-50/20' : ''}`}>
                                    <span className={`text-xs font-black ${isToday ? 'text-blue-600' : isCurrentMonth ? 'text-slate-900' : 'text-slate-300'} mb-1`}>
                                        {date.getDate()}
                                    </span>
                                    
                                    <div className="space-y-1 overflow-y-auto hide-scrollbar">
                                        {dayJobs.map(job => (
                                            <button 
                                                key={job.id}
                                                onClick={() => setSelectedJob(job)}
                                                className={`w-full text-left p-1.5 rounded-lg text-white hover:opacity-90 transition-all shadow-sm group/btn relative overflow-hidden ${!job.technicianId ? 'bg-red-500' : 'bg-blue-600'}`}
                                            >
                                                <div className="text-[9px] font-black uppercase tracking-tighter truncate relative z-10">{job.service}</div>
                                                <div className="text-[8px] font-bold opacity-80 truncate relative z-10">
                                                    {isTechnician && !isManager ? job.customer : `${job.technicianName} • ${job.customer}`}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;
