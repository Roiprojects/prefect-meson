import React, { useState, useMemo, useRef } from 'react';
import { EnquirySubmission } from '../../../data/contactData';
import {
  Calendar,
  TrendingUp,
  Inbox,
  Info,
} from 'lucide-react';

interface EnquiryOverviewLineChartProps {
  enquiries: EnquirySubmission[];
  isLoading?: boolean;
}

type DateRangeFilter = '7d' | '30d' | '90d' | 'all' | 'custom';

export const EnquiryOverviewLineChart: React.FC<EnquiryOverviewLineChartProps> = ({
  enquiries,
  isLoading = false,
}) => {
  const [rangeFilter, setRangeFilter] = useState<DateRangeFilter>('30d');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute date boundaries based on filter
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date();

    if (rangeFilter === '7d') {
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
    } else if (rangeFilter === '30d') {
      start.setDate(end.getDate() - 29);
      start.setHours(0, 0, 0, 0);
    } else if (rangeFilter === '90d') {
      start.setDate(end.getDate() - 89);
      start.setHours(0, 0, 0, 0);
    } else if (rangeFilter === 'custom' && customStartDate && customEndDate) {
      const cStart = new Date(customStartDate);
      cStart.setHours(0, 0, 0, 0);
      const cEnd = new Date(customEndDate);
      cEnd.setHours(23, 59, 59, 999);
      return { startDate: cStart, endDate: cEnd };
    } else {
      // 'all' or fallback: earliest enquiry date or 60 days ago
      if (enquiries.length > 0) {
        const timestamps = enquiries
          .map((e) => new Date(e.createdAt).getTime())
          .filter((t) => !isNaN(t));
        const earliest = timestamps.length > 0 ? Math.min(...timestamps) : Date.now() - 30 * 86400000;
        start.setTime(earliest);
        start.setHours(0, 0, 0, 0);
      } else {
        start.setDate(end.getDate() - 29);
        start.setHours(0, 0, 0, 0);
      }
    }

    return { startDate: start, endDate: end };
  }, [rangeFilter, customStartDate, customEndDate, enquiries]);

  // Aggregate enquiries into day buckets
  const chartData = useMemo(() => {
    const dayMap = new Map<string, { date: Date; count: number; items: EnquirySubmission[] }>();

    // Generate consecutive days between start and end
    const curr = new Date(startDate);
    while (curr <= endDate) {
      const key = curr.toISOString().split('T')[0];
      dayMap.set(key, { date: new Date(curr), count: 0, items: [] });
      curr.setDate(curr.getDate() + 1);
    }

    // Populate with actual database enquiry submissions
    enquiries.forEach((enq) => {
      if (!enq.createdAt) return;
      const enqDate = new Date(enq.createdAt);
      if (isNaN(enqDate.getTime())) return;
      const key = enqDate.toISOString().split('T')[0];
      if (dayMap.has(key)) {
        const entry = dayMap.get(key)!;
        entry.count += 1;
        entry.items.push(enq);
      }
    });

    const points = Array.from(dayMap.entries()).map(([key, val]) => ({
      key,
      date: val.date,
      count: val.count,
      items: val.items,
      label: val.date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
      fullLabel: val.date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }));

    return points;
  }, [startDate, endDate, enquiries]);

  // Metric summaries
  const totalInRange = useMemo(
    () => chartData.reduce((acc, p) => acc + p.count, 0),
    [chartData]
  );

  const peakPoint = useMemo(() => {
    if (chartData.length === 0) return null;
    return chartData.reduce((max, p) => (p.count > max.count ? p : max), chartData[0]);
  }, [chartData]);

  const dailyAvg = useMemo(() => {
    if (chartData.length === 0) return 0;
    return (totalInRange / chartData.length).toFixed(1);
  }, [totalInRange, chartData]);

  // SVG Chart Geometry
  const svgWidth = 650;
  const svgHeight = 220;
  const padding = { top: 25, right: 25, bottom: 35, left: 45 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxCountRaw = peakPoint ? peakPoint.count : 0;
  const yAxisMax = Math.max(4, Math.ceil(maxCountRaw * 1.25));

  // Generate Y axis ticks
  const yTicks = useMemo(() => {
    const step = Math.ceil(yAxisMax / 4);
    return [0, step, step * 2, step * 3, yAxisMax];
  }, [yAxisMax]);

  // Calculate coordinates for points
  const pointsWithCoords = useMemo(() => {
    const total = chartData.length;
    if (total === 0) return [];

    return chartData.map((d, i) => {
      const x =
        total === 1
          ? padding.left + plotWidth / 2
          : padding.left + (i / (total - 1)) * plotWidth;
      const y = padding.top + plotHeight - (d.count / yAxisMax) * plotHeight;
      return { ...d, x, y };
    });
  }, [chartData, plotWidth, plotHeight, padding, yAxisMax]);

  // Build smooth cubic bezier line path
  const { linePath, areaPath } = useMemo(() => {
    if (pointsWithCoords.length === 0) return { linePath: '', areaPath: '' };
    if (pointsWithCoords.length === 1) {
      const p = pointsWithCoords[0];
      return {
        linePath: `M ${p.x - 20} ${p.y} L ${p.x + 20} ${p.y}`,
        areaPath: `M ${p.x - 20} ${padding.top + plotHeight} L ${p.x - 20} ${p.y} L ${p.x + 20} ${p.y} L ${p.x + 20} ${padding.top + plotHeight} Z`,
      };
    }

    let d = `M ${pointsWithCoords[0].x},${pointsWithCoords[0].y}`;
    for (let i = 0; i < pointsWithCoords.length - 1; i++) {
      const p0 = pointsWithCoords[Math.max(0, i - 1)];
      const p1 = pointsWithCoords[i];
      const p2 = pointsWithCoords[i + 1];
      const p3 = pointsWithCoords[Math.min(pointsWithCoords.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) * 0.16;
      const cp1y = p1.y + (p2.y - p0.y) * 0.16;
      const cp2x = p2.x - (p3.x - p1.x) * 0.16;
      const cp2y = p2.y - (p3.y - p1.y) * 0.16;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    const first = pointsWithCoords[0];
    const last = pointsWithCoords[pointsWithCoords.length - 1];
    const baselineY = padding.top + plotHeight;
    const aPath = `${d} L ${last.x},${baselineY} L ${first.x},${baselineY} Z`;

    return { linePath: d, areaPath: aPath };
  }, [pointsWithCoords, padding, plotHeight]);

  // X Axis tick interval to prevent label crowding
  const xTickIndices = useMemo(() => {
    const total = chartData.length;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    if (total <= 14) return Array.from({ length: total }, (_, i) => i).filter((i) => i % 2 === 0);
    if (total <= 31) return Array.from({ length: total }, (_, i) => i).filter((i) => i % 5 === 0 || i === total - 1);
    return Array.from({ length: total }, (_, i) => i).filter((i) => i % Math.ceil(total / 6) === 0 || i === total - 1);
  }, [chartData.length]);

  // Mouse interaction handler
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current || pointsWithCoords.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;

    // Find nearest point
    let closestIndex = 0;
    let minDistance = Infinity;
    pointsWithCoords.forEach((p, idx) => {
      const dist = Math.abs(p.x - mouseX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoveredIndex(closestIndex);
  };

  const activePoint = hoveredIndex !== null ? pointsWithCoords[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100/90 shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
              ENQUIRY OVERVIEW
            </span>
            <div className="group relative inline-flex items-center">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                <div className="bg-slate-900 text-white text-[11px] font-sans px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  Daily incoming consultation requests and website leads
                </div>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
              </div>
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-950 font-sans tracking-tight">
            Consultation Velocity & Lead Flow
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Aggregated from verified website quote submissions and chat consultations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/90 text-xs font-mono font-medium shadow-2xs">
          {(['7d', '30d', '90d', 'all', 'custom'] as DateRangeFilter[]).map((filter) => {
            const labels: Record<DateRangeFilter, string> = {
              '7d': '7D',
              '30d': 'Last 30 Days',
              '90d': '90D',
              all: 'All Time',
              custom: 'Custom',
            };
            const isActive = rangeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setRangeFilter(filter)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Date Range Picker Row (shown when 'custom' selected) */}
      {rangeFilter === 'custom' && (
        <div className="pt-4 pb-2 flex flex-wrap items-center gap-3 text-xs font-mono border-b border-slate-100 bg-slate-50/50 -mx-5 sm:-mx-6 px-5 sm:px-6 mb-4">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>From:</span>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-xs"
            />
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>To:</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-xs"
            />
          </div>
        </div>
      )}

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-2 border-b border-slate-100 text-xs font-sans">
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
            TOTAL IN PERIOD
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-slate-950 font-sans">
              {totalInRange}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">enquiries</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
            DAILY AVERAGE
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-blue-700 font-sans">
              {dailyAvg}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">/ day</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
            PEAK SUBMISSIONS
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-emerald-600 font-sans">
              {peakPoint ? peakPoint.count : 0}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">in 1 day</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
            DATE RANGE
          </span>
          <span className="text-xs font-bold text-slate-800 block truncate">
            {startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} –{' '}
            {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* SVG Interactive Line Chart Canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none pt-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {isLoading ? (
          <div className="h-56 flex flex-col items-center justify-center text-slate-400 space-y-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Loading chart records...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-slate-400 space-y-2 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Inbox className="w-8 h-8 text-slate-300" />
            <span className="text-xs font-medium text-slate-600">
              No enquiries recorded in this date range.
            </span>
            <button
              onClick={() => setRangeFilter('all')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All Time
            </button>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible cursor-crosshair"
            onMouseMove={handleMouseMove}
          >
            <defs>
              {/* Royal Blue Area Gradient Fill */}
              <linearGradient id="enquiryLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.14" />
                <stop offset="75%" stopColor="#2563eb" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
              </linearGradient>

              {/* Glowing Point Filter */}
              <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.30" />
              </filter>
            </defs>

            {/* Subtle Horizontal Grid Lines & Y Axis Labels */}
            {yTicks.map((tickVal) => {
              const y = padding.top + plotHeight - (tickVal / yAxisMax) * plotHeight;
              return (
                <g key={tickVal}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={svgWidth - padding.right}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeDasharray={tickVal === 0 ? '0' : '3 3'}
                    strokeWidth={tickVal === 0 ? '1' : '0.8'}
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    className="font-mono text-[10px] fill-slate-400 font-semibold"
                  >
                    {tickVal}
                  </text>
                </g>
              );
            })}

            {/* Area Path Under Curve */}
            {areaPath && (
              <path d={areaPath} fill="url(#enquiryLineGradient)" />
            )}

            {/* Primary Blue Line Curve */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* X Axis Labels */}
            {xTickIndices.map((idx) => {
              const p = pointsWithCoords[idx];
              if (!p) return null;
              return (
                <text
                  key={p.key}
                  x={p.x}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  className="font-mono text-[10px] fill-slate-500 font-medium select-none"
                >
                  {p.label}
                </text>
              );
            })}

            {/* Interactive Vertical Guide Line & Hover Node */}
            {activePoint && (
              <g pointerEvents="none">
                {/* Vertical Dotted Guide */}
                <line
                  x1={activePoint.x}
                  y1={padding.top}
                  x2={activePoint.x}
                  y2={padding.top + plotHeight}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Outer Ring */}
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="7"
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  filter="url(#pointGlow)"
                />

                {/* Inner Core */}
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="3.5"
                  fill="#2563eb"
                />
              </g>
            )}

            {/* Data Point Markers on curve (Subtle dots) */}
            {pointsWithCoords.length <= 31 &&
              pointsWithCoords.map((p, idx) => {
                if (idx === hoveredIndex) return null;
                if (p.count === 0 && pointsWithCoords.length > 14) return null;

                return (
                  <circle
                    key={p.key}
                    cx={p.x}
                    cy={p.y}
                    r={p.count > 0 ? '3.5' : '2'}
                    fill={p.count > 0 ? '#ffffff' : '#cbd5e1'}
                    stroke={p.count > 0 ? '#2563eb' : '#94a3b8'}
                    strokeWidth={p.count > 0 ? '2' : '1'}
                    className="transition-all"
                  />
                );
              })}
          </svg>
        )}

        {/* Floating Custom Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-75"
            style={{
              left: `${(activePoint.x / svgWidth) * 100}%`,
              top: `${Math.max(10, (activePoint.y / svgHeight) * 100 - 45)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-white text-slate-900 px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-200/90 backdrop-blur-md min-w-[160px] text-xs space-y-1.5 font-sans">
              <div className="font-mono text-[10.5px] text-slate-500 font-semibold border-b border-slate-100 pb-1">
                {activePoint.fullLabel}
              </div>
              <div className="flex items-center justify-between gap-3 pt-0.5">
                <span className="text-slate-600 font-medium">Enquiries:</span>
                <span className="font-bold text-white font-mono bg-blue-600 px-2 py-0.5 rounded-md text-[11px] shadow-2xs">
                  {activePoint.count} {activePoint.count === 1 ? 'Lead' : 'Leads'}
                </span>
              </div>
              {activePoint.items.length > 0 && (
                <div className="pt-1.5 border-t border-slate-100 space-y-1">
                  {activePoint.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-[10.5px] text-slate-600 truncate flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate">{item.fullName}</span>
                      <span className="text-slate-400 truncate">({item.projectType.split(' ')[0]})</span>
                    </div>
                  ))}
                  {activePoint.items.length > 2 && (
                    <div className="text-[9.5px] font-mono text-slate-400 italic pl-3">
                      +{activePoint.items.length - 2} more...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>Real-time records from PostgreSQL database</span>
        </div>
        <span className="font-mono text-[10px]">
          Hover curve to view daily submissions
        </span>
      </div>
    </div>
  );
};
