import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  BusinessVerticalId,
  VERTICAL_PROFILES,
} from '../data/offerData';

interface RoiCalculatorProps {
  selectedVertical: BusinessVerticalId;
  onSelectVertical: (id: BusinessVerticalId) => void;
  currency: 'NGN' | 'USD';
  onCurrencyChange: (c: 'NGN' | 'USD') => void;
}

const VERTICAL_KEYS: BusinessVerticalId[] = [
  'food-vendor',
  'supermarket',
  'local-service',
  'small-business',
];

export function RoiCalculator({
  selectedVertical,
  onSelectVertical,
  currency,
  onCurrencyChange,
}: RoiCalculatorProps) {
  const profile = VERTICAL_PROFILES[selectedVertical];

  const [aov, setAov] = useState<number>(
    currency === 'NGN' ? profile.defaultAovNgn : profile.defaultAovUsd
  );
  const [monthlyBudget, setMonthlyBudget] = useState<number>(
    currency === 'NGN' ? profile.defaultBudgetNgn : profile.defaultBudgetUsd
  );

  // Sync realistic defaults whenever business type or currency changes
  useEffect(() => {
    const nextProfile = VERTICAL_PROFILES[selectedVertical];
    setAov(
      currency === 'NGN'
        ? nextProfile.defaultAovNgn
        : nextProfile.defaultAovUsd
    );
    setMonthlyBudget(
      currency === 'NGN'
        ? nextProfile.defaultBudgetNgn
        : nextProfile.defaultBudgetUsd
    );
  }, [selectedVertical, currency]);

  const cpl =
    currency === 'NGN' ? profile.costPerLeadNgn : profile.costPerLeadUsd;

  const estimatedInquiries = Math.max(10, Math.round(monthlyBudget / cpl));
  const estimatedOrders = Math.max(
    5,
    Math.round(estimatedInquiries * profile.closeRate)
  );
  const dailyOrders = (estimatedOrders / 30).toFixed(1);
  const projectedRevenue = estimatedOrders * aov;
  const roas = monthlyBudget > 0 ? (projectedRevenue / monthlyBudget).toFixed(1) : '0.0';

  const formatMoney = (amount: number) => {
    if (currency === 'NGN') {
      return `₦${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const aovMin = currency === 'NGN' ? 5000 : 15;
  const aovMax = currency === 'NGN' ? 150000 : 400;
  const aovStep = currency === 'NGN' ? 2500 : 5;

  const budgetMin = currency === 'NGN' ? 100000 : 250;
  const budgetMax = currency === 'NGN' ? 1500000 : 3500;
  const budgetStep = currency === 'NGN' ? 50000 : 50;

  return (
    <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4E7EC]">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-[#EB5E00]">
            Revenue &amp; Daily Order Projection
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-[#111315]">
            See what a predictable local funnel produces for your numbers.
          </h2>
        </div>

        {/* Currency segmented control */}
        <div className="inline-flex items-center p-1 rounded-lg bg-[#F2F4F7] border border-[#E4E7EC] self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onCurrencyChange('NGN')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              currency === 'NGN'
                ? 'bg-white text-[#111315] shadow-xs'
                : 'text-[#525866] hover:text-[#111315]'
            }`}
          >
            NGN (₦)
          </button>
          <button
            type="button"
            onClick={() => onCurrencyChange('USD')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              currency === 'USD'
                ? 'bg-white text-[#111315] shadow-xs'
                : 'text-[#525866] hover:text-[#111315]'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-stretch">
        {/* Controls Column */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-7">
          <div>
            <span className="block text-sm font-semibold text-[#111315] mb-3">
              1. Choose your business model
            </span>
            <div className="grid grid-cols-2 gap-2">
              {VERTICAL_KEYS.map((id) => {
                const item = VERTICAL_PROFILES[id];
                const active = id === selectedVertical;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSelectVertical(id)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-medium text-left border transition-colors whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00] ${
                      active
                        ? 'bg-[#111315] text-white border-[#111315]'
                        : 'bg-[#FAFAFB] text-[#111315] border-[#E4E7EC] hover:border-[#111315]/40'
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2.5">
              <label
                htmlFor="aov-slider"
                className="text-sm font-semibold text-[#111315]"
              >
                2. Average order or job value
              </label>
              <span className="font-mono text-base font-semibold text-[#111315] tabular-nums">
                {formatMoney(aov)}
              </span>
            </div>
            <input
              id="aov-slider"
              type="range"
              min={aovMin}
              max={aovMax}
              step={aovStep}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full kiralyte-range"
            />
            <div className="flex justify-between text-xs text-[#525866] font-mono tabular-nums mt-1.5">
              <span>{formatMoney(aovMin)}</span>
              <span>{formatMoney(aovMax)}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2.5">
              <label
                htmlFor="budget-slider"
                className="text-sm font-semibold text-[#111315]"
              >
                3. Monthly local ad spend
              </label>
              <span className="font-mono text-base font-semibold text-[#111315] tabular-nums">
                {formatMoney(monthlyBudget)}
              </span>
            </div>
            <input
              id="budget-slider"
              type="range"
              min={budgetMin}
              max={budgetMax}
              step={budgetStep}
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              className="w-full kiralyte-range"
            />
            <div className="flex justify-between text-xs text-[#525866] font-mono tabular-nums mt-1.5">
              <span>{formatMoney(budgetMin)}</span>
              <span>{formatMoney(budgetMax)}</span>
            </div>
          </div>

          <p className="text-xs text-[#525866] leading-relaxed">
            Conservative estimate based on Kiralyte client median cost per local
            WhatsApp/call lead ({formatMoney(Math.round(cpl))}) and{' '}
            {Math.round(profile.closeRate * 100)}% sales-team close rate.
          </p>
        </div>

        {/* Output Ledger Column */}
        <div className="lg:col-span-6 bg-[#111315] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-400">
              Projected 30-Day Pipeline · {profile.label}
            </p>
            <div className="mt-4 pb-6 border-b border-white/10">
              <p className="text-sm text-zinc-300">Estimated Monthly Revenue</p>
              <p className="mt-1 font-mono text-4xl sm:text-5xl font-semibold tracking-tight text-white tabular-nums">
                {formatMoney(projectedRevenue)}
              </p>
              <p className="mt-2 text-sm text-[#FF8533] font-medium tabular-nums">
                {roas}x projected return on local ad spend
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-white/10">
              <div>
                <dt className="text-xs text-zinc-400">Qualified Leads</dt>
                <dd className="mt-1 font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  {estimatedInquiries.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">Paid Orders / Mo</dt>
                <dd className="mt-1 font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  {estimatedOrders.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">Daily Pace</dt>
                <dd className="mt-1 font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  {dailyOrders}/day
                </dd>
              </div>
            </dl>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xs">
              Want us to validate these exact numbers for your neighborhood on a
              free 15-minute call?
            </p>
            <a
              href="#book-call"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
            >
              <span>Map My Roadmap</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
