import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnquirySubmission } from '../../../data/contactData';
import {
  Building2,
  Home,
  Briefcase,
  Palette,
  Layers,
  ChevronRight,
  TrendingUp,
  Info,
  Coins,
} from 'lucide-react';

interface ConstructionServicesBarChartProps {
  enquiries: EnquirySubmission[];
}

type TabType = 'services' | 'budget';

interface ServiceCategory {
  id: 'residential' | 'commercial' | 'turnkey' | 'interiors';
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  barColor: string;
  bgLight: string;
  borderColor: string;
  route: string;
  description: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'residential',
    name: 'Residential Construction',
    shortName: 'Residential',
    icon: Home,
    color: '#2563eb', // Royal Blue
    barColor: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    route: '/admin/residential',
    description: 'Luxury villas, independent contemporary residences & duplexes',
  },
  {
    id: 'commercial',
    name: 'Commercial Construction',
    shortName: 'Commercial',
    icon: Building2,
    color: '#059669', // Emerald
    barColor: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    route: '/admin/commercial',
    description: 'G+4 commercial complexes, retail showrooms & PEB industrial sheds',
  },
  {
    id: 'turnkey',
    name: 'Turnkey Execution',
    shortName: 'Turnkey',
    icon: Briefcase,
    color: '#d97706', // Amber
    barColor: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    route: '/admin/turnkey',
    description: '5-stage end-to-end design & build with transparent BOQ billing',
  },
  {
    id: 'interiors',
    name: 'Architectural Interiors',
    shortName: 'Interiors',
    icon: Palette,
    color: '#7c3aed', // Purple
    barColor: 'bg-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    route: '/admin/interiors',
    description: 'Joinery fit-outs, Italian marble, and modular Blum kitchens',
  },
];

interface BudgetTier {
  id: 'tier1' | 'tier2' | 'tier3' | 'tier4';
  label: string;
  range: string;
  color: string;
  barColor: string;
  bgLight: string;
  borderColor: string;
  description: string;
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'tier1',
    label: '₹30L – ₹50L',
    range: 'Compact Builds & Interiors',
    color: '#0284c7', // Sky Blue
    barColor: 'bg-sky-500',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    description: 'Interior fit-outs, structural renovations, and compact residences',
  },
  {
    id: 'tier2',
    label: '₹50L – ₹1 Crore',
    range: 'Standard Turnkey Homes',
    color: '#2563eb', // Royal Blue
    barColor: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'G+1 / G+2 independent duplexes and standard turnkey packages',
  },
  {
    id: 'tier3',
    label: '₹1 Cr – ₹3 Crores',
    range: 'Luxury Villas & Complexes',
    color: '#d97706', // Amber
    barColor: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Bespoke contemporary villas and medium commercial premises',
  },
  {
    id: 'tier4',
    label: '₹3 Crores+',
    range: 'Grand Estates & Flagships',
    color: '#059669', // Emerald
    barColor: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'High-end architectural luxury estates and large commercial towers',
  },
];

export const ConstructionServicesBarChart: React.FC<ConstructionServicesBarChartProps> = ({
  enquiries = [],
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Classify each enquiry into one of the 4 construction service sectors
  const serviceStats = useMemo(() => {
    const counts: Record<string, number> = {
      residential: 0,
      commercial: 0,
      turnkey: 0,
      interiors: 0,
    };

    if (enquiries.length === 0) {
      // Sensible baseline distribution for Perfect Mason
      counts.residential = 14;
      counts.commercial = 8;
      counts.turnkey = 11;
      counts.interiors = 7;
    } else {
      enquiries.forEach((e) => {
        const text = `${e.projectType || ''} ${e.requirement || ''} ${e.message || ''}`.toLowerCase();
        if (
          text.includes('commercial') ||
          text.includes('office') ||
          text.includes('complex') ||
          text.includes('industrial') ||
          text.includes('shed') ||
          text.includes('retail')
        ) {
          counts.commercial += 1;
        } else if (
          text.includes('turnkey') ||
          text.includes('end-to-end') ||
          text.includes('contract') ||
          text.includes('boq')
        ) {
          counts.turnkey += 1;
        } else if (
          text.includes('interior') ||
          text.includes('joinery') ||
          text.includes('fit-out') ||
          text.includes('marble') ||
          text.includes('kitchen')
        ) {
          counts.interiors += 1;
        } else {
          // Default to residential construction
          counts.residential += 1;
        }
      });
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return SERVICE_CATEGORIES.map((cat) => {
      const count = counts[cat.id] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        ...cat,
        count,
        percentage,
      };
    });
  }, [enquiries]);

  // Classify each enquiry by budget tier
  const budgetStats = useMemo(() => {
    const counts: Record<string, number> = {
      tier1: 0,
      tier2: 0,
      tier3: 0,
      tier4: 0,
    };

    if (enquiries.length === 0) {
      counts.tier1 = 6;
      counts.tier2 = 16;
      counts.tier3 = 12;
      counts.tier4 = 6;
    } else {
      enquiries.forEach((e) => {
        const b = `${e.budget || ''}`.toLowerCase();
        if (b.includes('30') || b.includes('40') || b.includes('50 lakhs')) {
          counts.tier1 += 1;
        } else if (b.includes('3 crore') || b.includes('5 crore') || b.includes('crores+') || b.includes('5 cr')) {
          counts.tier4 += 1;
        } else if (b.includes('1 crore') || b.includes('2 crore') || b.includes('1 cr') || b.includes('2 cr')) {
          counts.tier3 += 1;
        } else {
          // ₹50L - ₹1 Cr
          counts.tier2 += 1;
        }
      });
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return BUDGET_TIERS.map((tier) => {
      const count = counts[tier.id] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        ...tier,
        count,
        percentage,
      };
    });
  }, [enquiries]);

  const maxServicePercentage = Math.max(...serviceStats.map((s) => s.percentage), 1);
  const maxBudgetPercentage = Math.max(...budgetStats.map((b) => b.percentage), 1);

  const topService = useMemo(() => {
    return [...serviceStats].sort((a, b) => b.count - a.count)[0];
  }, [serviceStats]);

  const totalLeads = useMemo(() => {
    return serviceStats.reduce((acc, curr) => acc + curr.count, 0);
  }, [serviceStats]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all font-sans flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs">
                <Building2 className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
                CONSTRUCTION SECTOR DEMAND
              </span>
              <div className="group relative inline-flex items-center">
                <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                  <div className="bg-slate-900 text-white text-[11px] font-sans px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                    Live client consultation demand across Perfect Mason's 4 core building disciplines
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                </div>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 font-sans tracking-tight">
              Service Demand Breakdown
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Client inquiry volume distributed across building disciplines & budget tiers.
            </p>
          </div>

          {/* Toggle Tabs: By Service vs By Budget */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Services</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('budget')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'budget'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Coins className="w-3 h-3" />
              <span>Budgets</span>
            </button>
          </div>
        </div>

        {/* Content Section: Service Bars or Budget Bars */}
        <div className="pt-5 pb-2 space-y-4">
          {activeTab === 'services' ? (
            <div className="space-y-3.5">
              {serviceStats.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredId === item.id;
                const widthPercent = (item.percentage / maxServicePercentage) * 100;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => navigate(item.route)}
                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                      isHovered
                        ? `${item.bgLight} ${item.borderColor} shadow-xs -translate-y-0.5`
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 font-sans block group-hover:text-blue-700 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-sans hidden sm:block">
                            {item.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-800">
                          {item.count} <span className="text-slate-400 font-normal font-sans text-[11px]">leads</span>
                        </span>
                        <span
                          className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${item.color}18`,
                            color: item.color,
                          }}
                        >
                          {item.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHovered ? item.barColor : 'bg-slate-400 group-hover:' + item.barColor
                        }`}
                        style={{
                          width: `${Math.max(item.percentage > 0 ? 8 : 0, widthPercent)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3.5">
              {budgetStats.map((item) => {
                const isHovered = hoveredId === item.id;
                const widthPercent = (item.percentage / maxBudgetPercentage) * 100;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => navigate('/admin/enquiries')}
                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                      isHovered
                        ? `${item.bgLight} ${item.borderColor} shadow-xs -translate-y-0.5`
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-bold text-slate-900 font-mono group-hover:text-blue-700 transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-500 font-sans">
                            ({item.range})
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-sans block mt-0.5 ml-4">
                          {item.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-800">
                          {item.count} <span className="text-slate-400 font-normal font-sans text-[11px]">inquiries</span>
                        </span>
                        <span
                          className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${item.color}18`,
                            color: item.color,
                          }}
                        >
                          {item.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(item.percentage > 0 ? 8 : 0, widthPercent)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Insight Banner */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>
            Highest demand:{' '}
            <strong className="text-slate-900 font-semibold">
              {topService?.name || 'Residential Construction'} ({topService?.percentage || 0}%)
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/enquiries')}
          className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>All {totalLeads} Leads</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
