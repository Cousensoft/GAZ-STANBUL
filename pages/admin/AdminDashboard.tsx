
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import AdminTabRouter from '../../components/admin/AdminTabRouter';
import AIAssistant from '../../components/admin/AIAssistant';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
       
       <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

       <main className="flex-1 ml-64 min-w-0 flex flex-col">
          <DashboardHeader 
             onSearch={(q) => console.log('Admin search:', q)} 
             onNotificationClick={() => setActiveTab('notifications')}
             onMessageClick={() => setActiveTab('messages')}
          />
          <div className="p-8 flex-1 overflow-y-auto">
             <AdminTabRouter activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
       </main>

       <AIAssistant />
    </div>
  );
};

export default AdminDashboard;
