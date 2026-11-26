import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Page } from '../types';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  urduSubtitle?: string;
  description: string;
  breadcrumbLabel: string;
  accent?: 'emerald' | 'cyan' | 'amber';
  navigateTo?: (page: Page) => void;
  metadata?: string[];
  children?: React.ReactNode;
}

export function PageHeader({
  kicker,
  title,
  urduSubtitle,
  description,
  breadcrumbLabel,
  accent = 'emerald',
  navigateTo,
  metadata,
  children,
}: PageHeaderProps) {
  const accentText =
    accent === 'cyan'
      ? 'text-cyan-400'
      : accent === 'amber'
        ? 'text-amber-400'
        : 'text-emerald-400';

  return (
    <header className="border-b border-white/[0.08] pb-8 mb-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-5">
        <button
          type="button"
          onClick={() => navigateTo?.('apps')}
          className="hover:text-white transition-colors cursor-pointer font-medium"
        >
          NooriTech
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <span className="text-slate-200 font-medium">{breadcrumbLabel}</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          {kicker && (
            <p className={`text-xs font-semibold tracking-wide ${accentText}`}>
              {kicker}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.025em] text-white leading-[1.12]">
            {title}
          </h1>
          {urduSubtitle && (
            <p className={`font-urdu text-lg sm:text-xl font-semibold ${accentText}`}>
              {urduSubtitle}
            </p>
          )}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {description}
          </p>
          {metadata && metadata.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-xs text-slate-400 font-mono tabular-nums">
              {metadata.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-600" aria-hidden="true">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {children && <div className="w-full lg:w-auto shrink-0">{children}</div>}
      </div>
    </header>
  );
}
