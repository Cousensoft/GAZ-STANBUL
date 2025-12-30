import React from 'react';

// Y-Ekseni ölçeklendirme için yardımcı fonksiyon
const getCeiling = (val: number) => {
  if (val === 0) return 100;
  const magnitude = Math.pow(10, Math.floor(Math.log10(val)));
  const normalized = val / magnitude;
  let ceiling;
  if (normalized <= 1) ceiling = 1;
  else if (normalized <= 2) ceiling = 2;
  else if (normalized <= 5) ceiling = 5;
  else ceiling = 10;
  return ceiling * magnitude;
};

const generateYLabels = (maxVal: number) => {
  const steps = 4;
  const labels = [];
  for (let i = steps; i >= 0; i--) {
    const val = (maxVal / steps) * i;
    labels.push(val >= 1000 ? `${(val / 1000).toFixed(1)}k` : Math.round(val).toString());
  }
  return labels;
};

/**
 * Modern BarChart - Single Pillar
 */
export const BarChart = ({ 
  data, 
  height = 160, 
  color = 'bg-slate-900', 
  showYAxis = true,
  unit = '₺',
  onHover
}: { 
  data: any[], 
  height?: number, 
  color?: string, 
  showYAxis?: boolean,
  unit?: string,
  onHover?: (item: any) => void
}) => {
  const rawMax = Math.max(...data.map(d => d.value)) || 100;
  const maxVal = getCeiling(rawMax);
  const yLabels = generateYLabels(maxVal);

  return (
    <div className="flex flex-col w-full" style={{ height: `${height}px` }}>
      <div className="flex flex-1 min-h-0 relative">
        {/* Y-Axis Labels */}
        {showYAxis && (
          <div className="flex flex-col justify-between text-[10px] font-black text-slate-400 w-12 pr-3 border-r border-slate-100 shrink-0 text-right py-1 select-none">
            {yLabels.map((label, idx) => <span key={idx}>{label}</span>)}
          </div>
        )}

        {/* Chart Drawing Area */}
        <div className="flex-1 relative flex items-end justify-between px-4">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1 px-4">
            {yLabels.map((_, i) => (
              <div key={i} className="w-full border-t border-slate-100/80"></div>
            ))}
          </div>

          {/* Bars */}
          {data.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative h-full z-10" onMouseEnter={() => onHover?.(item)}>
              <div className="flex-1 w-full flex items-end justify-center px-1 md:px-2">
                <div 
                  className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 ease-out cursor-pointer hover:brightness-110 shadow-sm ${color}`}
                  style={{ height: `${(item.value / maxVal) * 100}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-slate-700 flex flex-col items-center">
                    <span className="text-[8px] text-slate-400 uppercase mb-0.5">{item.label}</span>
                    <span>{item.value.toLocaleString('tr-TR')} {unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex shrink-0 pt-3">
        {showYAxis && <div className="w-12 shrink-0"></div>}
        <div className="flex-1 flex justify-between px-4">
          {data.map((item, i) => (
            <span key={i} className="flex-1 text-center text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Modern GroupedBarChart - Dual Pillar
 */
export const GroupedBarChart = ({ 
  data, 
  height = 160, 
  mainColor = 'bg-indigo-600', 
  secColor = 'bg-slate-300',
  unit = '₺',
  showYAxis = true
}: { 
  data: any[], 
  height?: number, 
  mainColor?: string, 
  secColor?: string,
  unit?: string,
  showYAxis?: boolean
}) => {
  const rawMax = Math.max(...data.map(d => Math.max(d.current, d.previous))) || 100;
  const maxVal = getCeiling(rawMax);
  const yLabels = generateYLabels(maxVal);

  return (
    <div className="flex flex-col w-full" style={{ height: `${height}px` }}>
      <div className="flex flex-1 min-h-0 relative">
        {/* Y-Axis Labels */}
        {showYAxis && (
          <div className="flex flex-col justify-between text-[10px] font-black text-slate-400 w-12 pr-3 border-r border-slate-100 shrink-0 text-right py-1 select-none">
            {yLabels.map((label, idx) => <span key={idx}>{label}</span>)}
          </div>
        )}

        {/* Chart Drawing Area */}
        <div className="flex-1 relative flex items-end justify-between px-4">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1 px-4">
            {yLabels.map((_, i) => (
              <div key={i} className="w-full border-t border-slate-100/80"></div>
            ))}
          </div>

          {/* Grouped Bars */}
          {data.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative h-full z-10">
              <div className="flex-1 w-full flex items-end justify-center gap-1.5 px-1">
                {/* Previous Month Bar */}
                <div 
                  className={`w-2.5 rounded-t-sm transition-all duration-500 opacity-60 hover:opacity-100 ${secColor}`}
                  style={{ height: `${(item.previous / maxVal) * 100}%` }}
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-full bg-slate-700 text-white text-[9px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-50 shadow-xl border border-slate-600">
                        G: {item.previous.toLocaleString('tr-TR')}
                    </div>
                </div>
                {/* Current Month Bar */}
                <div 
                  className={`w-3.5 rounded-t-md transition-all duration-500 shadow-md ${mainColor} hover:brightness-110 origin-bottom hover:scale-y-105`}
                  style={{ height: `${(item.current / maxVal) * 100}%` }}
                >
                    <div className="absolute -top-12 left-1/2 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-slate-700 flex flex-col items-center">
                        <span className="text-[7px] text-slate-400 uppercase mb-0.5">Mevcut</span>
                        <span>{item.current.toLocaleString('tr-TR')} {unit}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex shrink-0 pt-4">
        {showYAxis && <div className="w-12 shrink-0"></div>}
        <div className="flex-1 flex justify-between px-4">
          {data.map((item, i) => (
            <span key={i} className="flex-1 text-center text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LineChart = ({ 
  data, 
  height = 160, 
  color = "text-indigo-500" 
}: { 
  data: any[], 
  height?: number, 
  color?: string 
}) => {
  const maxVal = Math.max(...data.map(d => d.value)) || 100;
  const padding = 5;
  const dataPoints = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (100 - 2 * padding),
    y: (100 - padding) - (d.value / maxVal) * (100 - 2 * padding)
  }));
  const pointsStr = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `M ${dataPoints[0].x},100 ` + dataPoints.map(p => `L ${p.x},${p.y}`).join(' ') + ` L ${dataPoints[dataPoints.length - 1].x},100 Z`;

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <path
          d={areaPath}
          fill="currentColor"
          className={`${color.replace('text-', 'fill-')} opacity-10`}
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={color}
          points={pointsStr}
        />
      </svg>
    </div>
  );
};

export const DonutChart = ({ size = "w-24 h-24" }: { size?: string }) => (
    <div className={`relative ${size} shrink-0`}>
        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
            <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="text-blue-500" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path className="text-purple-500" strokeDasharray="25, 100" strokeDashoffset="-65" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
    </div>
);

export const GaugeChart = ({ percentage = 75 }: { percentage?: number }) => (
    <div className="relative w-24 h-12 overflow-hidden mx-auto mt-2">
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[6px] border-slate-100 box-border"></div>
        <div 
            className="absolute top-0 left-0 w-24 h-24 rounded-full border-[6px] border-transparent border-t-orange-500 border-l-orange-500 box-border rotate-[-45deg] transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${ -135 + (percentage * 1.8) }deg)` }}
        ></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center -translate-y-2">
            <span className="text-lg font-black text-slate-800 block -mb-1">{percentage}%</span>
        </div>
    </div>
);
