import React, { useState, useMemo } from 'react';
import { AdminActivityLog } from '../../../context/DataContext';
import { EnquirySubmission } from '../../../data/contactData';
import { BarChart3, Activity, Calendar } from 'lucide-react';

interface MonthlyActivityBarChartProps {
  activityLogs: AdminActivityLog[];
  enquiries: EnquirySubmission[];
}

export const MonthlyActivityBarChart: React.FC<MonthlyActivityBarChartProps> = ({
  activityLogs,
  enquiries,
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Group actual activity logs and enquiries by Month
  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, { monthKey: string; label: string; updates: number; enquiries: number; total: number }>();

    // Generate past 6 calendar months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      monthMap.set(monthKey, { monthKey, label, updates: 0, enquiries: 0, total: 0 });
    }

    // Tally real activity logs
    activityLogs.forEach((log) => {
      if (!log.timestamp) return;
      const logDate = new Date(log.timestamp);
      if (isNaN(logDate.getTime())) return;
      const key = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`;
      if (monthMap.has(key)) {
        const item = monthMap.get(key)!;
        item.updates += 1;
        item.total += 1;
      }
    });

    // Tally real enquiries
    enquiries.forEach((enq) => {
      if (!enq.createdAt) return;
      const enqDate = new Date(enq.createdAt);
      if (isNaN(enqDate.getTime())) return;
      const key = `${enqDate.getFullYear()}-${String(enqDate.getMonth() + 1).padStart(2, '0')}`;
      if (monthMap.has(key)) {
        const item = monthMap.get(key)!;
        item.enquiries += 1;
        item.total += 1;
      }
    });

    return Array.from(monthMap.values());
  }, [activityLogs, enquiries]);

  const maxTotal = useMemo(() => {
    const peak = Math.max(...monthlyData.map((m) => m.total), 0);
    return Math.max(5, Math.ceil(peak * 1.2));
  }, [monthlyData]);

  const totalHistoricalEvents = useMemo(
    () => monthlyData.reduce((acc, m) => acc + m.total, 0),
    [monthlyData]
  );

  const activeMonthData = monthlyData.find((m) => m.monthKey === hoveredMonth);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <BarChart3 className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                MONTHLY AUDIT TRAIL
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
              Website & Pipeline Activity
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Monthly volume of CMS updates, content publications, and customer requests.
            </p>
          </div>

          <div className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            {totalHistoricalEvents} Total Events
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-6 pb-2">
          {totalHistoricalEvents === 0 ? (
            <div className="h-44 flex flex-col items-center justify-center text-slate-400 space-y-1.5 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Activity className="w-6 h-6 text-slate-300" />
              <span className="text-xs font-medium text-slate-500">
                No activity recorded across the past 6 months.
              </span>
              <span className="text-[10px] text-slate-400">
                Activity records populate as content is saved and enquiries arrive.
              </span>
            </div>
          ) : (
            <div className="relative h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 select-none">
              {monthlyData.map((m) => {
                const heightPercent = maxTotal > 0 ? (m.total / maxTotal) * 100 : 0;
                const isHovered = hoveredMonth === m.monthKey;

                return (
                  <div
                    key={m.monthKey}
                    onMouseEnter={() => setHoveredMonth(m.monthKey)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Value Badge on Hover */}
                    <div
                      className={`font-mono text-[10px] font-bold mb-1 transition-opacity ${
                        isHovered ? 'text-blue-700 opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {m.total}
                    </div>

                    {/* Bar Pill */}
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden h-32 flex flex-col justify-end p-0.5">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          isHovered
                            ? 'bg-blue-600 shadow-sm'
                            : m.total > 0
                            ? 'bg-blue-500/85 hover:bg-blue-600'
                            : 'bg-transparent'
                        }`}
                        style={{ height: `${Math.max(m.total > 0 ? 10 : 0, heightPercent)}%` }}
                      />
                    </div>

                    {/* Month Label */}
                    <span
                      className={`font-mono text-[10px] mt-2 transition-colors ${
                        isHovered ? 'font-bold text-slate-950' : 'text-slate-500 font-medium'
                      }`}
                    >
                      {m.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Hover Tooltip Detail */}
          {activeMonthData && activeMonthData.total > 0 && (
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold text-slate-900">{activeMonthData.label}:</span>
                <span className="text-slate-600">
                  {activeMonthData.updates} CMS updates, {activeMonthData.enquiries} enquiries
                </span>
              </div>
              <span className="font-mono font-bold text-blue-700">
                {activeMonthData.total} total
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>Real operational logs from PostgreSQL</span>
        </span>
        <span className="font-mono text-[10px]">
          Derived from audit trail
        </span>
      </div>
    </div>
  );
};
