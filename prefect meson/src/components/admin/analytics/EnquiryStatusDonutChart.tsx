import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnquirySubmission } from '../../../data/contactData';
import {
  PieChart as PieChartIcon,
  ChevronRight,
  Info,
} from 'lucide-react';

interface EnquiryStatusDonutChartProps {
  enquiries: EnquirySubmission[];
}

interface StatusSliceConfig {
  status: string;
  label: string;
  color: string;
  bgLight: string;
  textLight: string;
  ringColor: string;
  description: string;
}

const STATUS_CONFIGS: StatusSliceConfig[] = [
  {
    status: 'New',
    label: 'New Enquiries',
    color: '#f59e0b', // Amber
    bgLight: 'bg-amber-50',
    textLight: 'text-amber-800',
    ringColor: 'ring-amber-200',
    description: 'Fresh incoming requests awaiting first contact',
  },
  {
    status: 'In Progress',
    label: 'In Progress',
    color: '#8b5cf6', // Violet
    bgLight: 'bg-purple-50',
    textLight: 'text-purple-800',
    ringColor: 'ring-purple-200',
    description: 'Active design review, estimation, or site inspection',
  },
  {
    status: 'Contacted',
    label: 'Contacted',
    color: '#2563eb', // Royal Blue
    bgLight: 'bg-blue-50',
    textLight: 'text-blue-800',
    ringColor: 'ring-blue-200',
    description: 'Initial phone or WhatsApp communication established',
  },
  {
    status: 'Closed',
    label: 'Closed / Handover',
    color: '#10b981', // Emerald Green
    bgLight: 'bg-emerald-50',
    textLight: 'text-emerald-800',
    ringColor: 'ring-emerald-200',
    description: 'Completed contracts or finalized consultations',
  },
];

export const EnquiryStatusDonutChart: React.FC<EnquiryStatusDonutChartProps> = ({
  enquiries,
}) => {
  const navigate = useNavigate();
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const total = enquiries.length;

  // Aggregate actual database counts
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    enquiries.forEach((enq) => {
      const st = enq.status || 'New';
      counts[st] = (counts[st] || 0) + 1;
    });

    return STATUS_CONFIGS.map((cfg) => {
      const count = counts[cfg.status] || 0;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return {
        ...cfg,
        count,
        percentage,
      };
    });
  }, [enquiries, total]);

  // Donut Geometry
  const size = 180;
  const radius = 64;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius; // ~402.12

  // Count active segments for spacing gap
  const activeSlicesCount = statusData.filter((s) => s.count > 0).length;
  const gapSize = activeSlicesCount > 1 ? 4 : 0;

  // Calculate cumulative stroke dash offset with consistent segment spacing
  let accumulatedOffset = 0;
  const slicesWithOffsets = statusData.map((item) => {
    const rawDash = (item.percentage / 100) * circumference;
    const strokeDash = Math.max(0, rawDash - gapSize);
    const offset = -accumulatedOffset;
    accumulatedOffset += rawDash;
    return {
      ...item,
      strokeDasharray: `${strokeDash} ${circumference - strokeDash}`,
      strokeDashoffset: offset,
    };
  });

  const activeItem = statusData.find((s) => s.status === hoveredStatus);

  const handleStatusClick = (status: string) => {
    navigate(`/admin/enquiries?status=${encodeURIComponent(status)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-purple-50 text-purple-600 border border-purple-100/90 shadow-2xs">
                <PieChartIcon className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-purple-700">
                PIPELINE STATUS
              </span>
              <div className="group relative inline-flex items-center">
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                  <div className="bg-slate-900 text-white text-[11px] font-sans px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                    Distribution of incoming customer enquiries across lifecycle stages
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                </div>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-950 font-sans tracking-tight">
              Enquiry Status Distribution
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Breakdown of consultation leads across the execution funnel.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/enquiries')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 font-sans cursor-pointer"
            aria-label="Open CRM enquiry pipeline"
          >
            <span>Open CRM</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Donut & Interactive Legend Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-6 pb-2">
          {/* Left: SVG Donut Visual (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full -rotate-90 overflow-visible"
              >
                {/* Background Track Circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#F1F5F9"
                  strokeWidth={strokeWidth}
                />

                {/* Status Segments with Consistent Spacing */}
                {total > 0 &&
                  slicesWithOffsets.map((slice) => {
                    if (slice.count === 0) return null;
                    const isHovered = hoveredStatus === slice.status;

                    return (
                      <circle
                        key={slice.status}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                        strokeDasharray={slice.strokeDasharray}
                        strokeDashoffset={slice.strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredStatus(slice.status)}
                        onMouseLeave={() => setHoveredStatus(null)}
                        onClick={() => handleStatusClick(slice.status)}
                        role="button"
                        aria-label={`${slice.label}: ${slice.count} enquiries (${slice.percentage.toFixed(1)}%)`}
                      />
                    );
                  })}
              </svg>

              {/* Center Donut Label */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none transition-all px-4"
              >
                {activeItem ? (
                  <>
                    <span
                      className="text-3xl font-extrabold font-sans leading-none tracking-tight transition-colors duration-150"
                      style={{ color: activeItem.color }}
                    >
                      {activeItem.count}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-700 mt-1 truncate max-w-[110px]">
                      {activeItem.status}
                    </span>
                    <span className="font-mono text-[10.5px] text-slate-400 font-semibold mt-0.5">
                      {activeItem.percentage.toFixed(1)}% of total
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold text-slate-950 font-sans leading-none tracking-tight">
                      {total}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                      TOTAL ENQUIRIES
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 font-medium mt-0.5">
                      100% Tracked
                    </span>
                  </>
                )}
              </div>
            </div>

            <span className="text-[10.5px] font-mono text-slate-400 mt-3 text-center">
              Click any segment or item to filter CRM
            </span>
          </div>

          {/* Right: Interactive Legend List (7 Cols) */}
          <div className="md:col-span-7 space-y-2">
            {statusData.map((item) => {
              const isHovered = hoveredStatus === item.status;

              return (
                <div
                  key={item.status}
                  onClick={() => handleStatusClick(item.status)}
                  onMouseEnter={() => setHoveredStatus(item.status)}
                  onMouseLeave={() => setHoveredStatus(null)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    isHovered
                      ? 'border-blue-300 bg-blue-50/50 shadow-2xs translate-x-1'
                      : 'border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/80 shadow-2xs'
                  }`}
                  title={`Filter CRM by ${item.status}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleStatusClick(item.status)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 font-sans flex items-center gap-1.5 truncate">
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                      {item.count}
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold text-slate-500 w-11 text-right">
                      {item.percentage.toFixed(1)}%
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isHovered ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Synchronized with CRM pipeline</span>
        </span>
        <button
          type="button"
          onClick={() => navigate('/admin/enquiries')}
          className="font-semibold text-blue-600 hover:underline text-[11px] cursor-pointer"
        >
          View all in CRM →
        </button>
      </div>
    </div>
  );
};
