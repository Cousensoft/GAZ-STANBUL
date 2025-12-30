import React from 'react';
import { WidgetCard } from '../../../components/dashboard/Widgets';

const IncomingLeads = () => {
   return (
      <div className="animate-fade-in space-y-6">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Gelen Talepler</h2>
            <div className="flex gap-2">
               <button className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Tümü</button>
               <button className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Okunmamış</button>
            </div>
         </div>

         <WidgetCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100">
                     <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Müşteri</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hizmet</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tarih</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Durum</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">İşlem</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">M{i}</div>
                                 <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Ahmet Yılmaz</h4>
                                    <p className="text-xs text-slate-400">Kadıköy, İstanbul</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className="font-medium text-slate-700 text-sm">Kombi Bakımı</span>
                           </td>
                           <td className="p-4 text-sm text-slate-500">
                              2 saat önce
                           </td>
                           <td className="p-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                 i === 1 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                 {i === 1 ? 'Onaylandı' : 'Yeni'}
                              </span>
                           </td>
                           <td className="p-4 text-right">
                              <button className="bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors">Detay</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </WidgetCard>
      </div>
   );
};

export default IncomingLeads;