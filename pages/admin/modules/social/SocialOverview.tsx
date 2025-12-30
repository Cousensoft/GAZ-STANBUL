import React from 'react';
import { Users, MessageCircle, Heart, Share2, TrendingUp, Activity, ThumbsUp, UserCheck } from 'lucide-react';
import { BarChart, DonutChart } from '../../../../components/admin/Charts';
import { WidgetCard, PerformanceStat } from '../../../../components/dashboard/Widgets';

const SocialOverview = () => {
    // Mock Data
    const engagementData = [
        { value: 45 }, { value: 70 }, { value: 55 }, { value: 90 }, { value: 65 }, { value: 85 }, { value: 95 }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PerformanceStat 
                    label="Aktif Kullanıcılar" 
                    value="8.420" 
                    subtext="Anlık çevrimiçi oturum" 
                    colorName="emerald" 
                    hexColor="#10b981"
                    icon={UserCheck}
                    type="circle"
                    percentage={85}
                />
                <PerformanceStat 
                    label="Üye Büyümesi" 
                    value="%12" 
                    subtext="Bu hafta yeni katılım" 
                    colorName="pink" 
                    hexColor="#ec4899"
                    icon={Users}
                    type="circle"
                    percentage={12}
                />
                <PerformanceStat 
                    label="İçerik Erişimi" 
                    value="%82" 
                    subtext="Görüntülenme başarısı" 
                    colorName="blue" 
                    hexColor="#3b82f6"
                    icon={Share2}
                    type="circle"
                    percentage={82}
                />
                <PerformanceStat 
                    label="Güven Skoru" 
                    value="98" 
                    subtext="Ortalama kullanıcı puanı" 
                    colorName="indigo" 
                    hexColor="#6366f1"
                    icon={ThumbsUp}
                    type="icon"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Kullanıcı Aktivitesi (Son 7 Gün)</h3>
                        <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg outline-none p-2">
                            <option>Etkileşim</option>
                            <option>Yeni Üye</option>
                        </select>
                    </div>
                    <BarChart data={engagementData} height={64} color="bg-purple-500" />
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-6">İçerik Dağılımı</h3>
                    <div className="flex-1 flex items-center justify-center">
                        <DonutChart />
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Fotoğraf</span>
                            <span className="font-bold">55%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Metin</span>
                            <span className="font-bold">25%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Video</span>
                            <span className="font-bold">20%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WidgetCard className="bg-purple-50 border-purple-100">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-900 mb-1">Gündemdeki Etiketler</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="bg-white text-purple-700 px-2 py-1 rounded text-xs font-bold">#DoğalgazZammı</span>
                                <span className="bg-white text-purple-700 px-2 py-1 rounded text-xs font-bold">#KombiBakımı</span>
                                <span className="bg-white text-purple-700 px-2 py-1 rounded text-xs font-bold">#Enerji</span>
                            </div>
                        </div>
                    </div>
                </WidgetCard>
                <WidgetCard className="bg-pink-50 border-pink-100">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-pink-100 rounded-xl text-pink-600">
                            <Heart size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-pink-900 mb-1">En Çok Beğenilen</h4>
                            <p className="text-sm text-pink-700 mb-2">Bu hafta "Kış Hazırlıkları Rehberi" gönderisi rekor beğeni aldı.</p>
                            <span className="text-xs font-black text-pink-800">1.2K Beğeni • 450 Yorum</span>
                        </div>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default SocialOverview;