
import React, { useState } from 'react';
import { MessageCircle, BarChart3, Users, ShieldAlert, TurkishLira, FileText } from 'lucide-react';
import SocialOverview from './social/SocialOverview';
import SocialContent from './social/SocialContent';
import SocialUsers from './social/SocialUsers';
import SocialModeration from './social/SocialModeration';
import SocialFinancials from './social/SocialFinancials';

const SocialManager = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'users' | 'moderation' | 'finance'>('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Genel Bakış', icon: BarChart3 },
        { id: 'content', label: 'İçerik Yönetimi', icon: FileText },
        { id: 'users', label: 'Kullanıcılar', icon: Users },
        { id: 'moderation', label: 'Moderasyon', icon: ShieldAlert },
        { id: 'finance', label: 'Gelirler', icon: TurkishLira },
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard': return <SocialOverview />;
            case 'content': return <SocialContent />;
            case 'users': return <SocialUsers />;
            case 'moderation': return <SocialModeration />;
            case 'finance': return <SocialFinancials />;
            default: return <SocialOverview />;
        }
    };

    return (
        <div className="space-y-6">
             {/* Header / Tabs */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                        <MessageCircle size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">GazSocial Yönetimi</h2>
                        <p className="text-xs text-slate-500">Topluluk & Etkileşim Paneli</p>
                    </div>
                </div>
                
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-1 px-2 w-full md:w-auto">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)} 
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default SocialManager;
