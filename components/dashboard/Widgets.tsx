import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface WidgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ children, className = "", title, action, ...props }) => (
  <div className={`bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col ${className}`} {...props}>
    {(title || action) && (
        <div className="flex justify-between items-center mb-6 shrink-0">
            {title && <h3 className="font-bold text-slate-800 text-lg">{title}</h3>}
            {action ? action : <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20}/></button>}
        </div>
    )}
    <div className="flex-1 min-h-0">
      {children}
    </div>
  </div>
);

export const MiniStat = ({ label, value, trend, color, icon: Icon }: any) => {
  const baseColor = color.replace('bg-', '').replace('-500', '');
  
  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex items-center gap-5 relative overflow-hidden group">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300 ${color}`}>
           <Icon size={28} strokeWidth={2} />
        </div>
        <div className="flex-1">
           <div className="flex justify-between items-start">
              <div>
                  <h4 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
              </button>
           </div>
           {trend && (
             <div className="mt-2 flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.includes('+') || trend.includes('Artış') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                   {trend}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Geçen aya göre</span>
             </div>
           )}
        </div>
    </div>
  );
};

export const CircularProgress = ({ percentage, label, color, size = "w-40 h-40", showText = true, textSize = "text-3xl" }: any) => {
    const center = 50;
    const radius = 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className={`relative flex items-center justify-center ${size}`}>
         <svg viewBox="0 0 100 100" className="rotate-[-90deg] w-full h-full">
            <circle
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
              strokeLinecap="round"
            />
            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              strokeLinecap="round"
              r={radius}
              cx={center}
              cy={center}
            />
         </svg>
         {showText && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`font-black text-slate-800 ${textSize}`}>{percentage}%</span>
                {label && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>}
            </div>
         )}
      </div>
    );
};

export const PerformanceStat = ({ label, value, subtext, colorName, hexColor, icon: Icon, type = 'circle', percentage = 0 }: any) => {
    return (
        <div 
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group transition-all hover:border-slate-400 h-full"
          style={{ borderLeft: `4px solid ${hexColor}` }}
        >
            <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-slate-900">{value}</span>
                    {Icon && <Icon size={16} style={{ color: hexColor }} />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
                {type === 'circle' && (
                    <CircularProgress percentage={percentage} color={hexColor} size="w-full h-full" textSize="text-sm" />
                )}
                {type === 'icon' && (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${hexColor}15`, color: hexColor }}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
        </div>
    );
};
