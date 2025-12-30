
import React from 'react';
import DashboardOverview from '../../pages/admin/modules/DashboardOverview';
import CompanyManager from '../../pages/admin/modules/CompanyManager';
import UserManager from '../../pages/admin/modules/UserManager';
import RequestManager from '../../pages/admin/modules/RequestManager';
import ContentManager from '../../pages/admin/modules/ContentManager';
import MarketManager from '../../pages/admin/Market/MarketManager'; // Updated Path
import SocialManager from '../../pages/admin/modules/SocialManager';
import AdminSettings from '../../pages/admin/modules/AdminSettings';

interface AdminTabRouterProps {
    activeTab: string;
}

const AdminTabRouter: React.FC<AdminTabRouterProps> = ({ activeTab }) => {
    switch(activeTab) {
        case 'overview': return <DashboardOverview />;
        case 'companies': return <CompanyManager />;
        case 'users': return <UserManager />;
        case 'requests': return <RequestManager />;
        case 'market': return <MarketManager />; 
        case 'social': return <SocialManager />;
        case 'blog': return <ContentManager type="blog" />;
        case 'news': return <ContentManager type="news" />;
        case 'settings': return <AdminSettings />;
        default: return <div>Modül Bulunamadı</div>;
    }
};

export default AdminTabRouter;
