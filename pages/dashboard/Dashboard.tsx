
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CorporateProvider } from '../../context/CorporateContext';
import { MarketProvider } from '../../context/MarketContext';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Heart, 
  MapPin, 
  Lock, 
  Briefcase, 
  Bell, 
  Settings,
  MessageSquare,
  ShoppingBag,
  DollarSign,
  Share2,
  Star,
  Calendar,
  Package,
  Wrench,
  ClipboardList,
  LifeBuoy // New Icon
} from 'lucide-react';

// Shared Components
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SecuritySettings from '../../components/dashboard/SecuritySettings';
import SupportPage from './Support/SupportPage'; // New Component

// Individual Components
import IndividualOverview from './individual/Overview';
import PersonalProfile from './individual/Profile';
import IndividualRequests from './individual/MyRequests';
import IndividualRequestDetail from './individual/RequestDetail';
import IndividualFavorites from './individual/Favorites';
import IndividualAppointments from './individual/MyAppointments';
import AppointmentDetail from './individual/AppointmentDetail';
import IndividualAddresses from './individual/MyAddresses';
import IndividualMessages from './individual/Messages';
import IndividualNotifications from './individual/Notifications';
import IndividualOrders from './individual/MyOrders';
import OrderDetail from './individual/OrderDetail';

// Corporate Components
import CorporateOverview from '../corporate/Dashboard/CorporateDashboard'; 
import RequestsList from '../corporate/Requests/RequestsList'; 
import OffersList from '../corporate/Offers/OffersList'; 
import FinanceDashboard from '../corporate/Finance/FinanceDashboard'; 
import CorporatePosts from '../corporate/Social/CorporatePosts'; 
import CompanyProfileEdit from '../corporate/Company/CompanyProfileEdit'; 
import ServicesManagement from '../corporate/Services/ServicesManagement'; 
import MarketDashboard from '../corporate/Market/MarketDashboard';
import NotificationsPage from '../corporate/Notifications/NotificationsPage';
import MessagesPage from '../corporate/Messages/MessagesPage';
import ReviewsPage from '../corporate/Reviews/ReviewsPage';
import SchedulePage from '../corporate/Schedule/SchedulePage';
import EmployeeManager from '../corporate/Employees/EmployeeManager';

// Technician Components
import TechnicianDashboard from './technician/TechnicianDashboard';
import JobDetail from './technician/JobDetail';

const MenuLink = ({ item, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] md:text-xs font-bold transition-all duration-300 ${
      isActive 
      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <item.icon size={14} />
    {item.label}
  </button>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // View States
  const [requestView, setRequestView] = useState<'list' | 'detail'>('list');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  const [appointmentView, setAppointmentView] = useState<'list' | 'detail'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  
  const [orderView, setOrderView] = useState<'list' | 'detail'>('list');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Technician Job View State
  const [jobView, setJobView] = useState<'list' | 'detail'>('list');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const [requestsFilter, setRequestsFilter] = useState('all');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    if (location.state && (location.state as any).initialTab) {
        setActiveTab((location.state as any).initialTab);
    }
  }, [location]);

  if (!user) return null;

  const isCorporate = user.role === 'corporate';
  const isTechnician = user.role === 'technician';
  const isTechnicianManager = isTechnician && user.employeeRole === 'manager';

  const mainMenuItems = isCorporate ? [
    { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'company', label: 'Firma Profili', icon: Briefcase },
    { id: 'employees', label: 'Eleman Yönetimi', icon: User },
    { id: 'schedule', label: 'İş Takvimi', icon: Calendar },
    { id: 'requests', label: 'Gelen Talepler', icon: Bell },
    { id: 'offers', label: 'Tekliflerim', icon: FileText },
    { id: 'finance', label: 'Finans & Muhasebe', icon: DollarSign },
    { id: 'services', label: 'Hizmet Yönetimi', icon: Settings },
    { id: 'support', label: 'Destek Merkezi', icon: LifeBuoy }, // Yeni
    { id: 'security', label: 'Güvenlik', icon: Lock },
  ] : isTechnician ? [
    // Teknik Personel Menüsü (Yönetici ise ekstra seçenekler)
    { id: 'overview', label: 'İş Paneli', icon: LayoutDashboard },
    { id: 'jobs', label: 'Atanan İşler', icon: ClipboardList },
    { id: 'schedule', label: 'Takvimim', icon: Calendar },
    ...(isTechnicianManager ? [
        { id: 'requests', label: 'Gelen Talepler', icon: Bell },
        { id: 'offers', label: 'Teklifler', icon: FileText },
    ] : []),
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare },
    { id: 'profile', label: 'Profilim', icon: User },
    { id: 'support', label: 'Destek', icon: LifeBuoy }, // Yeni
    { id: 'security', label: 'Güvenlik', icon: Lock },
  ] : [
    { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'profile', label: 'Profilim', icon: User },
    { id: 'orders', label: 'Siparişlerim', icon: Package },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'requests', label: 'Taleplerim', icon: FileText },
    { id: 'appointments', label: 'Randevularım', icon: Calendar },
    { id: 'favorites', label: 'Favorilerim', icon: Heart },
    { id: 'addresses', label: 'Adreslerim', icon: MapPin },
    { id: 'support', label: 'Destek Merkezi', icon: LifeBuoy }, // Yeni
    { id: 'security', label: 'Güvenlik', icon: Lock },
  ];

  const moduleMenuItems = isCorporate ? [
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare },
    { id: 'reviews', label: 'Müşteri Yorumları', icon: Star },
    { id: 'market-panel', label: 'Market Yönetimi', icon: ShoppingBag },
    { id: 'social', label: 'Sosyal Medya', icon: Share2 },
  ] : [];

  const handleNavigateToRequests = (filter: string = 'all') => {
      setRequestsFilter(filter);
      setActiveTab('requests');
  };
  
  const handleJobSelect = (jobId: string) => {
      setSelectedJobId(jobId);
      setJobView('detail');
  };

  const renderContent = () => {
    if (isCorporate) {
        switch (activeTab) {
            case 'overview': return <CorporateOverview onNavigateToRequests={handleNavigateToRequests} />;
            case 'requests': return <RequestsList initialFilter={requestsFilter} />;
            case 'offers': return <OffersList onTabChange={setActiveTab} />;
            case 'schedule': return <SchedulePage />;
            case 'notifications': return <NotificationsPage />;
            case 'messages': return <MessagesPage />;
            case 'reviews': return <ReviewsPage />;
            case 'market-panel': return <MarketDashboard />;
            case 'finance': return <FinanceDashboard />;
            case 'social': return <CorporatePosts />;
            case 'company': return <CompanyProfileEdit />;
            case 'employees': return <EmployeeManager />; 
            case 'services': return <ServicesManagement />;
            case 'support': return <SupportPage />; // Yeni
            case 'security': return <SecuritySettings />;
            default: return <CorporateOverview onNavigateToRequests={handleNavigateToRequests} />;
        }
    } else if (isTechnician) {
        // TEKNİSYEN PANELİ İÇERİĞİ
        switch (activeTab) {
            case 'overview': 
                if (jobView === 'detail' && selectedJobId) return <JobDetail jobId={selectedJobId} onBack={() => setJobView('list')} />;
                return <TechnicianDashboard onJobSelect={handleJobSelect} />;
            case 'jobs': 
                if (jobView === 'detail' && selectedJobId) return <JobDetail jobId={selectedJobId} onBack={() => setJobView('list')} />;
                return <TechnicianDashboard onJobSelect={handleJobSelect} />;
            case 'schedule': return <SchedulePage />; 
            case 'requests': return isTechnicianManager ? <RequestsList initialFilter={requestsFilter} /> : null;
            case 'offers': return isTechnicianManager ? <OffersList onTabChange={setActiveTab} /> : null;
            case 'messages': return <MessagesPage />; 
            case 'profile': return <PersonalProfile user={user} />;
            case 'support': return <SupportPage />; // Yeni
            case 'security': return <SecuritySettings />;
            default: return <TechnicianDashboard onJobSelect={handleJobSelect} />;
        }
    } else {
        switch (activeTab) {
            case 'overview': return <IndividualOverview user={user} addresses={[]} onChangeTab={setActiveTab} />;
            case 'profile': return <PersonalProfile user={user} />;
            case 'orders': 
                if (orderView === 'detail' && selectedOrder) return <OrderDetail order={selectedOrder} onBack={() => setOrderView('list')} />;
                return <IndividualOrders onViewDetail={(order) => { setSelectedOrder(order); setOrderView('detail'); }} />;
            case 'messages': return <IndividualMessages />;
            case 'notifications': return <IndividualNotifications />;
            case 'requests': 
                if (requestView === 'detail' && selectedRequest) return <IndividualRequestDetail request={selectedRequest} onBack={() => setRequestView('list')} />;
                return <IndividualRequests onViewDetail={(req) => { setSelectedRequest(req); setRequestView('detail'); }} />;
            case 'appointments': 
                if (appointmentView === 'detail' && selectedAppointment) return <AppointmentDetail appointment={selectedAppointment} onBack={() => setAppointmentView('list')} />;
                return <IndividualAppointments onViewDetail={(appt) => { setSelectedAppointment(appt); setAppointmentView('detail'); }} />;
            case 'favorites': return <IndividualFavorites />;
            case 'addresses': return <IndividualAddresses />;
            case 'support': return <SupportPage />; // Yeni
            case 'security': return <SecuritySettings />;
            default: return <IndividualOverview user={user} addresses={[]} onChangeTab={setActiveTab} />;
        }
    }
  };

  return (
    <CorporateProvider>
      <MarketProvider>
        <div className="min-h-screen bg-slate-50 flex">
          
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block bg-white border-r border-slate-100 h-screen sticky top-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-50">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl ${isTechnician ? 'bg-indigo-600' : 'bg-slate-900'}`}>G</div>
                 <div>
                    <span className="font-black text-slate-900 tracking-tighter text-lg uppercase block">Gazistanbul</span>
                    {isTechnician && <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">Teknik Panel</span>}
                    {isCorporate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Kurumsal</span>}
                 </div>
              </div>

              <nav className="space-y-1">
                {mainMenuItems.map(item => (
                  <MenuLink key={item.id} item={item} isActive={activeTab === item.id} onClick={() => { setActiveTab(item.id); setOrderView('list'); setRequestView('list'); setAppointmentView('list'); setJobView('list'); }} />
                ))}
                {isCorporate && (
                    <div className="pt-4 mt-2">
                        <div className="px-3 pb-2 mb-2 border-b border-slate-50">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modüller</span>
                        </div>
                        <div className="space-y-1">
                            {moduleMenuItems.map(item => (
                                <MenuLink key={item.id} item={item} isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
                            ))}
                        </div>
                    </div>
                )}
                {isTechnician && isTechnicianManager && (
                   <div className="pt-4 mt-2 px-3">
                       <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-center">
                           <span className="text-[10px] font-bold text-indigo-700 uppercase">Yönetici Modu Aktif</span>
                       </div>
                   </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
             <DashboardHeader 
                onSearch={(q) => console.log('Searching:', q)} 
                onNotificationClick={() => setActiveTab('notifications')}
                onMessageClick={() => setActiveTab('messages')}
             />
             <main className="p-4 md:p-8 overflow-y-auto">{renderContent()}</main>
          </div>

        </div>
      </MarketProvider>
    </CorporateProvider>
  );
};

export default Dashboard;
