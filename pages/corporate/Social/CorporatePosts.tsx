
import React, { useState } from 'react';
import { useCorporate } from '../../../context/CorporateContext';
import { WidgetCard } from '../../../components/dashboard/Widgets';
import { Image as ImageIcon, Heart, MessageCircle, Send, PlusCircle } from 'lucide-react';

const CorporatePosts = () => {
    const { socialPosts, addSocialPost } = useCorporate();
    const [newContent, setNewContent] = useState('');

    const handlePost = () => {
        if (!newContent.trim()) return;
        addSocialPost({
            content: newContent,
            date: 'Şimdi',
            status: 'published'
        });
        setNewContent('');
    };

    return (
        <div className="space-y-6 animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Create Post */}
            <div className="lg:col-span-3">
                <WidgetCard className="bg-white border border-slate-200">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                        <div className="flex-1">
                            <textarea 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-slate-900"
                                placeholder="Takipçilerinle bir şeyler paylaş..."
                                rows={3}
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            ></textarea>
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ImageIcon size={20}/></button>
                                </div>
                                <button 
                                    onClick={handlePost}
                                    className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                                >
                                    <Send size={16}/> Paylaş
                                </button>
                            </div>
                        </div>
                    </div>
                </WidgetCard>
            </div>

            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
                {socialPosts.map(post => (
                    <WidgetCard key={post.id} className="p-0 overflow-hidden">
                        <div className="p-4 flex items-center gap-3 border-b border-slate-50">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Firma Adı</h4>
                                <p className="text-xs text-slate-500">{post.date} • {post.status === 'published' ? 'Yayında' : 'Taslak'}</p>
                            </div>
                        </div>
                        {post.image && (
                            <div className="w-full h-64 bg-slate-100">
                                <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <p className="text-sm text-slate-700 mb-4">{post.content}</p>
                            <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
                                <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer"><Heart size={18}/> {post.likes}</span>
                                <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"><MessageCircle size={18}/> {post.comments}</span>
                            </div>
                        </div>
                    </WidgetCard>
                ))}
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
                <WidgetCard title="Sosyal İstatistikler">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Toplam Takipçi</span>
                            <span className="font-bold text-slate-900">12.5K</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Profil Görüntülenme</span>
                            <span className="font-bold text-slate-900">45K</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Etkileşim Oranı</span>
                            <span className="font-bold text-green-600">%4.2</span>
                        </div>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default CorporatePosts;
