import { useState } from 'react';
import { Check, MessageCircle, ShieldCheck, ArrowUpRight, Play } from 'lucide-react';
import {
  BusinessVerticalId,
  VERTICAL_PROFILES,
} from '../data/offerData';
import { KiralyteLogo } from './KiralyteLogo';

interface FunnelSimulatorProps {
  selectedVertical: BusinessVerticalId;
  onSelectVertical: (id: BusinessVerticalId) => void;
  currency: 'NGN' | 'USD';
}

const VERTICAL_ORDER: BusinessVerticalId[] = [
  'food-vendor',
  'supermarket',
  'local-service',
  'small-business',
];

export function FunnelSimulator({
  selectedVertical,
  onSelectVertical,
  currency,
}: FunnelSimulatorProps) {
  const [simulatedOrders, setSimulatedOrders] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const profile = VERTICAL_PROFILES[selectedVertical];

  const formattedOrderValue =
    currency === 'NGN'
      ? `₦${profile.incomingValueNgn.toLocaleString()}`
      : `$${profile.incomingValueUsd.toLocaleString()}`;

  const handleTestBuyerFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStageIndex(0);

    window.setTimeout(() => setActiveStageIndex(1), 240);
    window.setTimeout(() => setActiveStageIndex(2), 480);
    window.setTimeout(() => {
      setActiveStageIndex(3);
      setSimulatedOrders((prev) => prev + 1);
      setIsSimulating(false);
    }, 760);
  };

  const funnelWidths = [
    'w-full',
    'w-[94%] sm:w-[84%]',
    'w-[88%] sm:w-[68%]',
    'w-[82%] sm:w-[52%]',
  ];

  return (
    <div className="flex flex-col h-full bg-[#111315] text-white rounded-2xl border border-[#262A30] p-6 sm:p-7">
      {/* Top interactive vertical selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <KiralyteLogo iconOnly />
          <span className="text-sm font-medium text-zinc-200 tracking-wide">
            Predictable Buyer Engine
          </span>
        </div>
        <button
          type="button"
          onClick={handleTestBuyerFlow}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EB5E00] hover:bg-[#D25200] disabled:opacity-70 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
        >
          <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
          <span>{isSimulating ? 'Routing Buyer...' : 'Simulate Buyer Order'}</span>
        </button>
      </div>

      {/* Segmented industry switcher */}
      <div
        role="tablist"
        aria-label="Preview buyer funnel by business type"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 mt-5 rounded-xl bg-white/[0.05] border border-white/10"
      >
        {VERTICAL_ORDER.map((id) => {
          const item = VERTICAL_PROFILES[id];
          const isActive = id === selectedVertical;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                onSelectVertical(id);
                setActiveStageIndex(1);
              }}
              className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00] ${
                isActive
                  ? 'bg-white text-[#111315] font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {item.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Incoming WhatsApp Order Notification (mirrors ad banner top card) */}
      <div className="mt-5 p-4 rounded-xl bg-[#1A1D21] border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="truncate">{profile.incomingTitle}</span>
              <span className="text-zinc-400 font-normal" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-[#FF8533] tabular-nums shrink-0">
                {formattedOrderValue}
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5 truncate">
              {profile.incomingDetail}
            </p>
          </div>
        </div>
        <div
          className="w-7 h-7 rounded-full bg-[#EB5E00] flex items-center justify-center shrink-0 text-white"
          aria-label="Order verified"
        >
          <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </div>
      </div>

      {/* Central Visual Funnel (mirrors the dark-phone orange funnel in the ad banner) */}
      <div className="my-5 flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
          <span>30-Day Local Funnel Conversion</span>
          <span className="font-mono tabular-nums text-zinc-300">
            {simulatedOrders > 0
              ? `+${simulatedOrders} test ${simulatedOrders === 1 ? 'order' : 'orders'} logged`
              : 'Monthly Benchmark'}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          {profile.funnelStages.map((stage, idx) => {
            const isHighlighted = idx === activeStageIndex;
            const isOrangeStage = idx === 1 || isHighlighted;
            return (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`${funnelWidths[idx]} transition-transform duration-150 hover:scale-[1.01] rounded-lg px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-3 text-left border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00] ${
                  isOrangeStage
                    ? 'bg-[#EB5E00] border-[#FF8533] text-white'
                    : idx === 3
                    ? 'bg-white text-[#111315] border-white'
                    : 'bg-[#1D2126] border-white/10 text-zinc-100'
                }`}
              >
                <span className="text-xs sm:text-[13px] font-medium truncate">
                  {stage.label}
                </span>
                <span className="flex items-center gap-2.5 shrink-0 font-mono text-xs tabular-nums">
                  <span className="font-semibold">{stage.volume}</span>
                  <span
                    className={
                      isOrangeStage
                        ? 'text-white/90'
                        : idx === 3
                        ? 'text-zinc-600'
                        : 'text-zinc-400'
                    }
                  >
                    {stage.rate}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lead Captured Footer Card (mirrors ad banner bottom card) */}
      <div className="p-4 rounded-xl bg-[#1A1D21] border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#EB5E00]/15 border border-[#EB5E00]/30 flex items-center justify-center shrink-0 text-[#FF8533]">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {profile.leadTitle}
            </p>
            <p className="text-xs text-zinc-300 mt-0.5 truncate">
              {profile.leadDetail}
            </p>
          </div>
        </div>
        <a
          href="#book-call"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8533] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <span>Install This</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
