import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Globe,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import {
  BusinessVerticalId,
  CASE_STUDIES,
  FAQ_ITEMS,
  SYSTEM_PILLARS,
  VALUE_STACK_ITEMS,
} from './data/offerData';
import { KiralyteLogo } from './components/KiralyteLogo';
import { FunnelSimulator } from './components/FunnelSimulator';
import { RoiCalculator } from './components/RoiCalculator';
import { StrategyCallBooking } from './components/StrategyCallBooking';
import { AdPreviewModal } from './components/AdPreviewModal';

const NAV_LINKS = [
  { label: 'The System', href: '#system' },
  { label: 'ROI Calculator', href: '#calculator' },
  { label: 'The Offer', href: '#offer' },
  { label: 'Case Studies', href: '#proof' },
];

const HERO_METRICS = [
  {
    value: '30 Days',
    label: 'From campaign setup to daily tracked WhatsApp orders and calls',
  },
  {
    value: '3.8x ROAS',
    label: 'Median verified return across 40+ local food, retail, and service clients',
  },
  {
    value: '15 Minutes',
    label: 'Focused diagnostic roadmap call with a certified growth specialist',
  },
  {
    value: '100% Owned',
    label: 'Every ad account, creative asset, and WhatsApp buyer list stays yours',
  },
];

const TREND_TRAP_POINTS = [
  {
    title: 'Viral views from people who can never buy from you',
    detail:
      'Entertainment algorithms push dance reels to teenagers in other cities instead of hungry or ready-to-buy neighbors within 5km.',
  },
  {
    title: 'Hours wasted filming trends between running your shop',
    detail:
      'You opened a restaurant, supermarket, or service business—not a full-time content studio. When posting stops, sales vanish.',
  },
  {
    title: 'Boosted posts that burn budget on cheap likes',
    detail:
      'Tapping "Boost Post" optimizes for passive scrollers and giveaway hunters rather than purchase-ready local customers.',
  },
  {
    title: 'Unanswered DMs that leak cash every evening',
    detail:
      'Without instant routing into a structured WhatsApp menu or booking line, interested prospects message a competitor in 3 minutes.',
  },
];

const BUYER_SYSTEM_POINTS = [
  {
    title: 'Strict 3–10km geo-fenced buyer targeting',
    detail:
      'Every ad impression is locked to people living, working, or searching inside your exact delivery zone or walk-in neighborhood.',
  },
  {
    title: 'Direct-response offers—zero dancing required',
    detail:
      'Clear product photos, irresistible meal/pantry/service bundles, and proof creatives engineered to trigger immediate inquiries.',
  },
  {
    title: 'Automated WhatsApp order & call capture',
    detail:
      'Prospects tap straight into pre-filled WhatsApp order menus, quick price lists, and tap-to-call lines that convert while you serve.',
  },
  {
    title: 'Tracked weekly revenue & repeat buyer broadcasts',
    detail:
      'Every inquiry builds an owned customer list so payday and weekend broadcasts fill your calendar before you even run new ads.',
  },
];

export default function App() {
  const [selectedVertical, setSelectedVertical] =
    useState<BusinessVerticalId>('food-vendor');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [adModalOpen, setAdModalOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-[#FAFAFB] text-[#111315]">
      {/* Top Bar Contract: Single row, 3 clean zones separated by gap-8 */}
      <header className="sticky top-0 z-40 h-16 bg-[#FAFAFB]/95 backdrop-blur-sm border-b border-[#E4E7EC]">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB5E00] rounded-md"
          >
            <KiralyteLogo />
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525866]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#111315] hover:underline underline-offset-8 decoration-[#EB5E00] decoration-2 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#book-call"
              className="px-4 py-2 rounded-lg bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
            >
              Book Free Call
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 rounded-lg border border-[#E4E7EC] bg-white flex items-center justify-center text-[#111315]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E4E7EC] px-4 py-4 shadow-lg">
            <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-medium text-[#111315] border-b border-[#F2F4F7] last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:08025418932"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2 text-sm font-semibold text-[#EB5E00] font-mono tabular-nums"
              >
                Call or WhatsApp: 08025418932
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Proposition Column */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                {/* Unboxed Zero-Pill Audience Metadata */}
                <p className="text-xs sm:text-sm font-medium text-[#525866]">
                  <span>For Small Businesses</span>
                  <span className="mx-2 text-[#EB5E00]" aria-hidden="true">
                    ·
                  </span>
                  <span>Local Services</span>
                  <span className="mx-2 text-[#EB5E00]" aria-hidden="true">
                    ·
                  </span>
                  <span>Food Vendors</span>
                  <span className="mx-2 text-[#EB5E00]" aria-hidden="true">
                    ·
                  </span>
                  <span>Supermarkets</span>
                </p>

                <h1 className="mt-4 text-[clamp(2.35rem,4.3vw,3.75rem)] font-extrabold leading-[1.06] tracking-tight text-[#111315]">
                  Dancing on Social Media Is{' '}
                  <span className="text-[#EB5E00]">Not</span> a Marketing
                  Strategy.
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#525866] leading-relaxed max-w-[54ch]">
                  Views don’t pay rent—customers do. Stop chasing fleeting
                  trends and let Kiralyte install a predictable acquisition
                  system for daily WhatsApp orders, booked calls, and walk-in
                  buyers.
                </p>

                {/* Single Primary CTA + Quiet Secondary Direct Contact */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <a
                    href="#book-call"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
                  >
                    <span>Book Your Free 15-Min Strategy Call</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href="tel:08025418932"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#111315] hover:text-[#EB5E00] transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#EB5E00]" aria-hidden="true" />
                    <span className="font-mono tabular-nums">08025418932</span>
                  </a>
                </div>

                {/* Unboxed Specialist Assurance Line */}
                <div className="mt-7 pt-6 border-t border-[#E4E7EC] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#525866]">
                  <span>
                    With a Certified Growth &amp; Digital Marketing Specialist
                  </span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setAdModalOpen(true)}
                    className="text-[#111315] font-medium underline underline-offset-4 decoration-[#E4E7EC] hover:decoration-[#EB5E00] transition-colors"
                  >
                    View campaign brief
                  </button>
                </div>
              </div>

              {/* Right Interactive Focal Carrier (Mirrors Ad Banner Dark Phone Funnel) */}
              <div className="lg:col-span-6">
                <FunnelSimulator
                  selectedVertical={selectedVertical}
                  onSelectVertical={setSelectedVertical}
                  currency={currency}
                />
              </div>
            </div>

            {/* Full-Width 4-Column Proof Strip Below Hero Split */}
            <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#E4E7EC] divide-y sm:divide-y-0 sm:divide-x divide-[#E4E7EC]">
              {HERO_METRICS.map((metric) => (
                <div key={metric.value} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                  <dt className="font-mono text-2xl sm:text-3xl font-semibold text-[#111315] tabular-nums tracking-tight">
                    {metric.value}
                  </dt>
                  <dd className="mt-1.5 text-xs sm:text-sm text-[#525866] leading-relaxed">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM CONTRAST (TREND TRAP VS BUYER SYSTEM) */}
        <section className="py-16 sm:py-24 bg-white border-y border-[#E4E7EC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#EB5E00]">
                The Local Business Reality
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111315]">
                Why 50,000 video views still leave your cash register quiet.
              </h2>
              <p className="mt-3 text-base text-[#525866] leading-relaxed">
                Most agencies sell you content calendars and viral hooks that
                entertain strangers. We engineer direct buyer pipelines that
                turn local demand into daily sales.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Old Way */}
              <div className="rounded-2xl bg-[#FAFAFB] border border-[#E4E7EC] p-7 sm:p-9">
                <div className="flex items-center justify-between pb-5 border-b border-[#E4E7EC]">
                  <h3 className="text-xl font-bold text-[#111315]">
                    The Social Media Trend Trap
                  </h3>
                  <span className="text-xs font-medium text-[#525866]">
                    Unpredictable Sales
                  </span>
                </div>
                <ul className="mt-6 space-y-6">
                  {TREND_TRAP_POINTS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 w-6 h-6 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center shrink-0 text-[#525866]"
                        aria-hidden="true"
                      >
                        <X className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[#111315]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-[#525866] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kiralyte Way */}
              <div className="rounded-2xl bg-[#111315] text-white border border-[#262A30] p-7 sm:p-9">
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">
                    The Kiralyte Daily Buyer System
                  </h3>
                  <span className="text-xs font-medium text-[#FF8533]">
                    Predictable Orders
                  </span>
                </div>
                <ul className="mt-6 space-y-6">
                  {BUYER_SYSTEM_POINTS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 w-6 h-6 rounded-full bg-[#EB5E00] flex items-center justify-center shrink-0 text-white"
                        aria-hidden="true"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 4-PILLAR MECHANISM (ASYMMETRIC BENTO GRID) */}
        <section id="system" className="py-16 sm:py-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-[#EB5E00]">
                  The Growth Architecture
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111315]">
                  Four connected components that turn local attention into paid
                  receipts.
                </h2>
              </div>
              <p className="text-sm text-[#525866] max-w-sm">
                Installed end-to-end by Kiralyte Technology Solutions in 7 days,
                then optimized weekly for lower cost per order.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {SYSTEM_PILLARS.map((pillar) => (
                <article
                  key={pillar.number}
                  className={`${pillar.spanClass} bg-white rounded-2xl border border-[#E4E7EC] p-7 sm:p-8 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-sm font-semibold text-[#EB5E00] tabular-nums">
                        {pillar.number}
                      </span>
                      <span className="text-xs font-medium text-[#525866] text-right">
                        {pillar.outcome}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#111315] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#525866] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <ul className="mt-6 pt-5 border-t border-[#E4E7EC] space-y-2.5">
                    {pillar.deliverables.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-[#111315]"
                      >
                        <Check
                          className="w-4 h-4 text-[#EB5E00] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE ROI CALCULATOR */}
        <section id="calculator" className="pb-16 sm:pb-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <RoiCalculator
              selectedVertical={selectedVertical}
              onSelectVertical={setSelectedVertical}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>
        </section>

        {/* SECTION 5: THE $100K GRAND SLAM OFFER VALUE STACK & GUARANTEE */}
        <section
          id="offer"
          className="py-16 sm:py-24 bg-[#111315] text-white scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-[#FF8533]">
                  The Complete Local Growth Offer
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Everything installed to make daily orders your new baseline.
                </h2>
                <p className="mt-3 text-base text-zinc-300 leading-relaxed">
                  No bloated retainers for meaningless social posts. Every
                  deliverable in this stack exists for one outcome: qualified
                  WhatsApp orders, incoming calls, and walk-in buyers.
                </p>
              </div>

              <div className="inline-flex items-center p-1 rounded-lg bg-white/10 border border-white/10 self-start md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrency('NGN')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    currency === 'NGN'
                      ? 'bg-white text-[#111315]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  NGN (₦)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    currency === 'USD'
                      ? 'bg-white text-[#111315]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Clean Tabular Value Stack Ledger */}
            <div className="mt-10 rounded-2xl bg-[#181B20] border border-white/10 overflow-hidden">
              <div className="divide-y divide-white/10">
                {VALUE_STACK_ITEMS.map((item) => {
                  const isBonus = item.category === 'Fast-Action Bonus';
                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="max-w-2xl">
                        <p
                          className={`text-xs font-medium ${
                            isBonus ? 'text-[#FF8533]' : 'text-zinc-400'
                          }`}
                        >
                          {item.category}
                        </p>
                        <h3 className="mt-1 text-base sm:text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <p className="text-xs text-zinc-400">Standalone Value</p>
                        <p className="font-mono text-lg font-semibold text-white tabular-nums mt-0.5">
                          {currency === 'NGN' ? item.valueNgn : item.valueUsd}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ledger Total & Strategy Call Entry */}
              <div className="p-6 sm:px-8 sm:py-7 bg-white/[0.03] border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-zinc-400">
                    Combined System &amp; Bonus Value
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-2xl sm:text-3xl font-semibold text-zinc-400 line-through tabular-nums">
                      {currency === 'NGN' ? '₦2,150,000' : '$9,000'}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Step 1: Free 15-Min Strategy Call &amp; Custom Roadmap
                    </span>
                  </div>
                </div>
                <a
                  href="#book-call"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
                >
                  <span>Get Your Roadmap Today</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Ironclad 30-Day Risk Reversal Guarantee */}
            <div className="mt-8 rounded-2xl bg-[#181B20] border border-[#EB5E00]/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="w-11 h-11 rounded-xl bg-[#EB5E00]/15 text-[#FF8533] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    The Kiralyte 30-Day Predictable Buyer Guarantee
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">
                    If the acquisition system we install for your business does
                    not produce measurable, tracked WhatsApp orders, calls, or
                    walk-in buyers within your first 30 days live, we continue
                    optimizing and managing your campaigns at zero management
                    fee until it does.
                  </p>
                </div>
              </div>
              <p className="font-mono text-xs text-zinc-400 shrink-0 tabular-nums">
                Zero long-term lock-in · Written SLA
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: CLAIM-TO-PROOF ADJACENCY — LOCAL CASE STUDIES */}
        <section
          id="proof"
          className="py-16 sm:py-24 bg-white border-b border-[#E4E7EC] scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#EB5E00]">
                Verified Client Outcomes
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111315]">
                Local businesses that traded trend-chasing for daily buyers.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {CASE_STUDIES.map((study) => (
                <article
                  key={study.id}
                  className="rounded-2xl bg-[#FAFAFB] border border-[#E4E7EC] p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Zero-Pill Metadata */}
                    <div className="text-xs font-medium text-[#525866]">
                      <span>{study.vertical}</span>
                      <span className="mx-1.5" aria-hidden="true">
                        ·
                      </span>
                      <span>{study.location}</span>
                      <span className="mx-1.5" aria-hidden="true">
                        ·
                      </span>
                      <span>{study.timeframe}</span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-[#111315]">
                      {study.business}
                    </h3>

                    <div className="mt-5 pb-5 border-b border-[#E4E7EC]">
                      <p className="font-mono text-2xl font-semibold text-[#EB5E00] tabular-nums">
                        {study.headlineMetric}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#525866] tabular-nums">
                        {study.subMetric}
                      </p>
                    </div>

                    <dl className="mt-5 space-y-3.5 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-[#111315]">
                          Before
                        </dt>
                        <dd className="mt-0.5 text-[#525866] leading-relaxed">
                          {study.before}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#111315]">
                          What Changed
                        </dt>
                        <dd className="mt-0.5 text-[#525866] leading-relaxed">
                          {study.change}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#111315]">
                          Measured Outcome
                        </dt>
                        <dd className="mt-0.5 text-[#111315] font-medium leading-relaxed">
                          {study.outcome}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <blockquote className="mt-6 pt-5 border-t border-[#E4E7EC]">
                    <p className="text-sm text-[#111315] leading-relaxed">
                      “{study.quote}”
                    </p>
                    <footer className="mt-3 text-xs text-[#525866]">
                      <span className="font-semibold text-[#111315]">
                        {study.author}
                      </span>{' '}
                      · {study.role}
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: INTERACTIVE STRATEGY CALL BOOKING */}
        <section id="book-call" className="py-16 sm:py-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <StrategyCallBooking selectedVertical={selectedVertical} />
          </div>
        </section>

        {/* SECTION 8: OBJECTION-CRUSHING FAQ */}
        <section className="py-16 sm:py-20 bg-white border-t border-[#E4E7EC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-medium text-[#EB5E00]">
                Common Questions
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#111315]">
                Straight answers before we get on the call.
              </h2>
            </div>

            <div className="mt-10 divide-y divide-[#E4E7EC] border-y border-[#E4E7EC]">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={item.question} className="py-5">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : idx)
                      }
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB5E00] rounded-md"
                    >
                      <span className="text-base font-semibold text-[#111315]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#525866] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#EB5E00]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm sm:text-base text-[#525866] leading-relaxed pr-8">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER — Matches Ad Banner Contact Bar Cleanly */}
      <footer className="bg-[#111315] text-zinc-300 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <KiralyteLogo darkText={false} />
              <p className="mt-2 text-xs text-zinc-400">
                Kiralyte Technology Solutions · Growth &amp; Local Customer
                Acquisition Systems
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
              <a
                href="tel:08025418932"
                className="inline-flex items-center gap-2 text-white hover:text-[#FF8533] font-mono tabular-nums transition-colors whitespace-nowrap"
              >
                <MessageCircle
                  className="w-4 h-4 text-[#FF8533]"
                  aria-hidden="true"
                />
                <span>08025418932</span>
              </a>
              <a
                href="https://instagram.com/kiralytetechnologysolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
              >
                <Instagram
                  className="w-4 h-4 text-[#FF8533]"
                  aria-hidden="true"
                />
                <span>@kiralytetechnologysolutions</span>
              </a>
              <a
                href="#book-call"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#FF8533]" aria-hidden="true" />
                <span>Book on Calendly</span>
              </a>
              <a
                href="https://www.kiralyte.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
              >
                <Globe className="w-4 h-4 text-[#FF8533]" aria-hidden="true" />
                <span>www.kiralyte.com</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <p>
              © {new Date().getFullYear()} Kiralyte Technology Solutions. All
              rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setAdModalOpen(true)}
                className="hover:text-white transition-colors"
              >
                Campaign Ad
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AdPreviewModal
        open={adModalOpen}
        onClose={() => setAdModalOpen(false)}
      />
    </div>
  );
}
