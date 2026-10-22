import React from 'react';

export type ProjectStatusType = 'Active' | 'Completed' | 'Upcoming' | string;

interface StatusBadgeProps {
  status?: ProjectStatusType;
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
  size?: 'sm' | 'md';
}

export const getStatusLabel = (status?: ProjectStatusType): string => {
  if (!status) return 'Active Model';
  const s = status.toLowerCase();
  if (s.includes('complete')) return 'Completed Handover';
  if (s.includes('upcom')) return 'Upcoming Release';
  if (s.includes('active') || s.includes('ongoing') || s.includes('model')) return 'Active Model';
  return status;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = 'Active',
  variant = 'light',
  className = '',
  size = 'sm',
}) => {
  const label = getStatusLabel(status);
  const s = status.toLowerCase();
  const isCompleted = s.includes('complete');
  const isUpcoming = s.includes('upcom');

  let colorClasses = '';

  if (variant === 'glass') {
    if (isCompleted) {
      colorClasses = 'bg-blue-950/85 text-blue-200 border-blue-400/40 backdrop-blur-md shadow-sm';
    } else if (isUpcoming) {
      colorClasses = 'bg-amber-950/85 text-amber-200 border-amber-400/40 backdrop-blur-md shadow-sm';
    } else {
      colorClasses = 'bg-emerald-950/85 text-emerald-200 border-emerald-400/40 backdrop-blur-md shadow-sm';
    }
  } else if (variant === 'dark') {
    if (isCompleted) {
      colorClasses = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    } else if (isUpcoming) {
      colorClasses = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    } else {
      colorClasses = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  } else {
    // light
    if (isCompleted) {
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200/80';
    } else if (isUpcoming) {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80';
    } else {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
  }

  const dotColor = isCompleted
    ? 'bg-blue-500'
    : isUpcoming
    ? 'bg-amber-500'
    : 'bg-emerald-500 animate-pulse';

  const sizeClasses = size === 'md'
    ? 'text-xs px-3.5 py-1.5 gap-2'
    : 'text-[11px] px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-mono font-bold uppercase tracking-wider rounded-full border ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span className="truncate">{label}</span>
    </span>
  );
};
