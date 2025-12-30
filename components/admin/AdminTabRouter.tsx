
import React from 'react';
import DashboardOverview from '../../pages/admin/modules/DashboardOverview';
import CompanyManager from '../../pages/admin/modules/CompanyManager';
import UserManager from '../../pages/admin/modules/UserManager';
import RequestManager from '../../pages/admin/modules/RequestManager';
import ContentManager from '../../pages/admin/modules/ContentManager';
import MarketManager from '../../pages/admin/Market/MarketManager';
import SocialManager from '../../pages/admin/modules/SocialManager';
import AdminSettings from '../../pages/admin/modules/AdminSettings';
import SupportManager from '../../pages/admin/modules/SupportManager';
import ActivityLogs from '../../pages/admin/modules/ActivityLogs';
import NotificationManager from '../../pages/admin/modules/NotificationManager';
import MessageCenter from '../../pages/admin/modules/MessageCenter';
import ApprovalManager from '../../pages/admin/modules/ApprovalManager'; // Yeni modül

interface AdminTabRouterProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const AdminTabRouter: React.FC<AdminTabRouterProps> = ({ activeTab, onTabChange }) => {
    switch(activeTab) {
        case 'overview': return <DashboardOverview onTabChange={onTabChange} />;
        case 'approvals': return <ApprovalManager />; // Yeni: Onay kuyruğu eşleşmesi
        case 'companies': return <CompanyManager />;
        case 'users': return <UserManager onTabChange={onTabChange} />;
        case 'requests': return <RequestManager />;
        case 'market': return <MarketManager />; 
        case 'social': return <SocialManager />;
        case 'support': return <SupportManager />;
        case 'messages': return <MessageCenter />;
        case 'notifications': return <NotificationManager />;
        case 'activities': return <ActivityLogs onBack={() => onTabChange('overview')} />;
        case 'blog': return <ContentManager type="blog" />;
        case 'news': return <ContentManager type="news" />;
        case 'settings': return <AdminSettings />;
        default: return <div>Modül Bulunamadı</div>;
    }
};

export default AdminTabRouter;
