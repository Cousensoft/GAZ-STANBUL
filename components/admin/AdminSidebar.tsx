
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  LogOut, 
  Activity, 
  ShoppingBag, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  ShieldAlert,
  Bell,
  Mail,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

export const sidebarMenu = [
    {
        title: 'Genel',
        items: [
            { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
            { id: 'approvals', label: 'Onay Kuyruğu', icon: CheckSquare, badge: 5 } // Yeni: Onay Kuyruğu
        ]
    },
    {
        title: 'Platform',
        items: [
            { id: 'companies', label: 'Firma Yönetimi', icon: Building2 },
            { id: 'users', label: 'Kullanıcı Yönetimi', icon: Users },
            { id: 'requests', label: 'Talepler & İşler', icon: Activity },
            { 
                id: 'content-management', 
                label: 'İçerik Yönetimi', 
                icon: FileText,
                subItems: [
                    { id: 'blog', label: 'Blog Yazıları' },
                    { id: 'news', label: 'Haberler' }
                ]
            }
        ]
    },
    {
        title: 'İletişim & Destek',
        items: [
            { id: 'messages', label: 'Mesaj Merkezi', icon: Mail },
            { id: 'notifications', label: 'Bildirim Yönetimi', icon: Bell },
            { id: 'support', label: 'Destek & Şikayet', icon: ShieldAlert }
        ]
    },
    {
        title: 'Modüller',
        items: [
            { id: 'market', label: 'GazMarket', icon: ShoppingBag },
            { id: 'social', label: 'GazSocial', icon: MessageCircle }
        ]
    },
    {
        title: 'Sistem',
        items: [
            { id: 'settings', label: 'Ayarlar', icon: Settings }
        ]
    }
];

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['content-management']);

    const toggleMenu = (id: string) => {
        setExpandedMenus(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    if (!user) return null;

    return (
        <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col fixed h-full z-20 transition-all">
            <div className="h-20 flex items-center px-6 border-b border-slate-800">
                <span className="text-xl font-black text-white tracking-tight">GAZİSTANBUL <span className="text-red-600 text-xs align-top">ADMIN</span></span>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">
                {sidebarMenu.map((group, index) => (
                    <div key={index}>
                        <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-70">
                            {group.title}
                        </div>
                        <div className="space-y-1">
                            {group.items.map(item => {
                                const hasSubItems = (item as any).subItems && (item as any).subItems.length > 0;
                                const isExpanded = expandedMenus.includes(item.id);
                                const isItemActive = activeTab === item.id;

                                return (
                                    <div key={item.id}>
                                        <button
                                            onClick={() => {
                                                if (hasSubItems) {
                                                    toggleMenu(item.id);
                                                } else {
                                                    setActiveTab(item.id);
                                                }
                                            }}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                                isItemActive && !hasSubItems
                                                ? 'bg-red-600 text-white shadow-lg shadow-red-900/50 translate-x-1' 
                                                : 'hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={18} />
                                                <span className="flex-1 text-left">{item.label}</span>
                                                {item.badge && (
                                                    <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                            {hasSubItems && (
                                                isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                            )}
                                        </button>

                                        {hasSubItems && isExpanded && (
                                            <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
                                                {(item as any).subItems.map((sub: any) => (
                                                    <button
                                                        key={sub.id}
                                                        onClick={() => setActiveTab(sub.id)}
                                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                                            activeTab === sub.id 
                                                            ? 'text-red-500 bg-white/5' 
                                                            : 'text-slate-500 hover:text-white hover:bg-white/5'
                                                        }`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${activeTab === sub.id ? 'bg-red-500' : 'bg-slate-600'}`}></div>
                                                        {sub.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                </div>
                <button 
                    onClick={() => { logout(); navigate('/admin/login'); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                    <LogOut size={14} /> Çıkış Yap
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
