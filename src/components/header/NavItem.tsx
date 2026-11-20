import React from 'react';
import { ChevronDown } from 'lucide-react';
import { NavItemType } from '../../types/navigation';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick: (e: React.MouseEvent) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  isOpen = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className={`group relative flex items-center gap-1 py-1.5 px-2 xl:px-2.5 2xl:px-3 text-[11.5px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-sans font-bold uppercase tracking-[0.04em] xl:tracking-[0.06em] whitespace-nowrap shrink-0 transition-colors duration-250 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 rounded-sm cursor-pointer ${
          isActive || isOpen
            ? 'text-black font-extrabold'
            : 'text-slate-900 hover:text-black font-bold'
        }`}
        aria-label={item.label}
        aria-expanded={item.hasMegaMenu ? isOpen : undefined}
      >
        <span className="relative inline-flex items-center pb-0.5 whitespace-nowrap">
          {item.label}
          
          {/* Animated Black Underline with micro endpoint */}
          <span
            className={`absolute bottom-0 left-0 h-[2.5px] bg-slate-950 transition-all duration-300 ease-out origin-left flex items-center justify-end ${
              isActive || isOpen
                ? 'w-full opacity-100 scale-x-100'
                : 'w-full opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
            }`}
          >
            {/* Accent Endpoint Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 transform translate-x-0.5" />
          </span>
        </span>

        {/* Subtle Dropdown Chevron for Services */}
        {item.hasMegaMenu && (
          <ChevronDown
            className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-black' : 'text-slate-700 group-hover:text-black'
            }`}
            strokeWidth={2.5}
          />
        )}
      </button>
    </div>
  );
};
