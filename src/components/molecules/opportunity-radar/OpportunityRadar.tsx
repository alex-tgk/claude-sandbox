import { forwardRef, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export type OpportunityImpact = 'low' | 'medium' | 'high';
export type OpportunityTrend = 'up' | 'down' | 'steady';

export interface OpportunityRadarItem {
  id: string;
  label: string;
  description?: string;
  impact: OpportunityImpact;
  confidence: number; // 0-1
  owner?: string;
  tag?: string;
  trend?: OpportunityTrend;
}

export interface OpportunityRadarProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  spotlightLabel?: string;
  spotlightValue?: string;
  spotlightChange?: string;
  items: OpportunityRadarItem[];
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}

const impactStyles: Record<OpportunityImpact, string> = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-rose-50 text-rose-700',
};

const impactProgress: Record<OpportunityImpact, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-500',
};

const trendCopy: Record<OpportunityTrend, { label: string; icon: string; color: string }> = {
  up: { label: 'Trending up', icon: '^', color: 'text-emerald-600' },
  down: { label: 'Trending down', icon: 'v', color: 'text-rose-600' },
  steady: { label: 'Holding steady', icon: '->', color: 'text-slate-500' },
};

export const OpportunityRadar = forwardRef<HTMLElement, OpportunityRadarProps>(function OpportunityRadar(
  {
    eyebrow,
    title,
    subtitle,
    spotlightLabel = 'Velocity score',
    spotlightValue = '84',
    spotlightChange = '+18% WoW',
    items,
    primaryAction,
    secondaryAction,
    className,
    ...rest
  },
  ref
) {
  const cappedItems = useMemo(() => items.slice(0, 6), [items]);
  const completion = useMemo(() => {
    if (!items.length) {
      return 0;
    }
    const weighted = items.reduce((acc, item) => acc + item.confidence, 0);
    return Math.round((weighted / items.length) * 100);
  }, [items]);

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-4xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]',
        className
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 select-none opacity-60">
        <div className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-200/60 via-sky-100 to-purple-100 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gradient-to-br from-amber-100 via-white to-transparent blur-2xl" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
          )}
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h3>
            {subtitle && <p className="max-w-2xl text-base text-slate-600">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        </div>

        <div className="w-full max-w-xs rounded-3xl border border-slate-200/60 bg-white/70 p-6 text-center shadow-inner">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{spotlightLabel}</p>
          <p className="mt-3 text-6xl font-semibold text-slate-900">{spotlightValue}</p>
          <p className="mt-2 text-sm font-medium text-emerald-600">{spotlightChange}</p>
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Alignment index</div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-600">{completion}% validated confidence</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        {cappedItems.length ? (
          <ol className="space-y-4">
            {cappedItems.map((item) => {
              const trend = item.trend ? trendCopy[item.trend] : undefined;
              const clampedConfidence = Math.min(Math.max(item.confidence, 0), 1);
              return (
                <li
                  key={item.id}
                  className="group rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-1 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium text-slate-900">{item.label}</p>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
                            impactStyles[item.impact]
                          )}
                        >
                          {item.impact} impact
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {item.owner && <span>Owner: {item.owner}</span>}
                        {item.tag && (
                          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                            {item.tag}
                          </span>
                        )}
                        {trend && (
                          <span className={cn('inline-flex items-center gap-1 font-medium', trend.color)}>
                            <span aria-hidden="true">{trend.icon}</span>
                            {trend.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full max-w-[220px] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span>Confidence</span>
                        <span>{Math.round(clampedConfidence * 100)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className={cn('h-full rounded-full', impactProgress[item.impact])}
                          style={{ width: `${clampedConfidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-8 text-center text-sm text-slate-500">
            Add opportunity signals to project confidence and prioritize the backlog.
          </div>
        )}
      </div>
    </section>
  );
});

OpportunityRadar.displayName = 'OpportunityRadar';
