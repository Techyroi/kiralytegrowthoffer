export const CALENDLY_URL = 'https://calendly.com/kiralytetechnology/30min';

export type BusinessVerticalId =
  | 'food-vendor'
  | 'supermarket'
  | 'local-service'
  | 'small-business';

export interface VerticalProfile {
  id: BusinessVerticalId;
  label: string;
  shortLabel: string;
  incomingTitle: string;
  incomingDetail: string;
  incomingValueNgn: number;
  incomingValueUsd: number;
  leadTitle: string;
  leadDetail: string;
  funnelStages: {
    label: string;
    volume: string;
    rate: string;
  }[];
  defaultAovNgn: number;
  defaultAovUsd: number;
  defaultBudgetNgn: number;
  defaultBudgetUsd: number;
  costPerLeadNgn: number;
  costPerLeadUsd: number;
  closeRate: number;
}

export const VERTICAL_PROFILES: Record<BusinessVerticalId, VerticalProfile> = {
  'food-vendor': {
    id: 'food-vendor',
    label: 'Food Vendors & Kitchens',
    shortLabel: 'Food Vendors',
    incomingTitle: 'WhatsApp Order',
    incomingDetail: '2x Jollof Platter + Grilled Fish · Delivery (Lekki)',
    incomingValueNgn: 24500,
    incomingValueUsd: 28,
    leadTitle: 'Lead Captured',
    leadDetail: 'Office lunch inquiry · 15 packs for Friday',
    funnelStages: [
      { label: '5km Local Reach', volume: '18,400', rate: '100%' },
      { label: 'Menu Ad Clicks', volume: '940', rate: '5.1%' },
      { label: 'WhatsApp Chats', volume: '312', rate: '33.2%' },
      { label: 'Paid Daily Orders', volume: '168', rate: '53.8%' },
    ],
    defaultAovNgn: 14500,
    defaultAovUsd: 24,
    defaultBudgetNgn: 250000,
    defaultBudgetUsd: 500,
    costPerLeadNgn: 950,
    costPerLeadUsd: 2.4,
    closeRate: 0.48,
  },
  supermarket: {
    id: 'supermarket',
    label: 'Supermarkets & Retail',
    shortLabel: 'Supermarkets',
    incomingTitle: 'WhatsApp Basket Order',
    incomingDetail: 'Monthly pantry bundle · Ready for store pickup',
    incomingValueNgn: 68000,
    incomingValueUsd: 85,
    leadTitle: 'Walk-In Claimed',
    leadDetail: 'Weekend voucher redeemed at checkout counter',
    funnelStages: [
      { label: 'Neighborhood Reach', volume: '26,200', rate: '100%' },
      { label: 'Offer Views', volume: '1,420', rate: '5.4%' },
      { label: 'WhatsApp & Directions', volume: '485', rate: '34.1%' },
      { label: 'Walk-In & Pickups', volume: '240', rate: '49.5%' },
    ],
    defaultAovNgn: 38000,
    defaultAovUsd: 55,
    defaultBudgetNgn: 350000,
    defaultBudgetUsd: 750,
    costPerLeadNgn: 1100,
    costPerLeadUsd: 3.1,
    closeRate: 0.44,
  },
  'local-service': {
    id: 'local-service',
    label: 'Local Services & Clinics',
    shortLabel: 'Local Services',
    incomingTitle: 'Booked Service Call',
    incomingDetail: 'AC unit servicing (3 units) · Confirmed for 2:00 PM',
    incomingValueNgn: 45000,
    incomingValueUsd: 140,
    leadTitle: 'Lead Captured',
    leadDetail: 'Direct phone inquiry from Google Local Search',
    funnelStages: [
      { label: 'High-Intent Local Search', volume: '9,800', rate: '100%' },
      { label: 'Offer Page Visits', volume: '610', rate: '6.2%' },
      { label: 'Calls & WhatsApp Leads', volume: '184', rate: '30.2%' },
      { label: 'Booked Appointments', volume: '78', rate: '42.4%' },
    ],
    defaultAovNgn: 55000,
    defaultAovUsd: 150,
    defaultBudgetNgn: 300000,
    defaultBudgetUsd: 650,
    costPerLeadNgn: 2400,
    costPerLeadUsd: 8.5,
    closeRate: 0.38,
  },
  'small-business': {
    id: 'small-business',
    label: 'Small Businesses',
    shortLabel: 'Small Businesses',
    incomingTitle: 'WhatsApp Order',
    incomingDetail: 'Direct catalog inquiry · Payment link confirmed',
    incomingValueNgn: 32000,
    incomingValueUsd: 65,
    leadTitle: 'Lead Captured',
    leadDetail: 'Qualified local buyer routed to sales desk',
    funnelStages: [
      { label: 'Targeted Local Buyers', volume: '15,600', rate: '100%' },
      { label: 'Ad Clicks to Funnel', volume: '820', rate: '5.3%' },
      { label: 'Qualified Inquiries', volume: '254', rate: '31.0%' },
      { label: 'Closed Customers', volume: '112', rate: '44.1%' },
    ],
    defaultAovNgn: 28000,
    defaultAovUsd: 60,
    defaultBudgetNgn: 250000,
    defaultBudgetUsd: 550,
    costPerLeadNgn: 1400,
    costPerLeadUsd: 4.2,
    closeRate: 0.42,
  },
};

export interface SystemPillar {
  number: string;
  title: string;
  outcome: string;
  description: string;
  deliverables: string[];
  spanClass: string;
}

export const SYSTEM_PILLARS: SystemPillar[] = [
  {
    number: '01.',
    title: 'Hyper-Local Buyer Acquisition Campaigns',
    outcome: 'Stop paying for views outside your trading radius.',
    description:
      'We build precision geo-fenced campaigns on Instagram, Facebook, and Google Search that put your best-selling products and services strictly in front of ready-to-buy people within 3–10km of your shop or delivery zone.',
    deliverables: [
      'Geo-radius buyer targeting & exclusion mapping',
      'Direct-response creative built for clicks, not vanity likes',
      'Daily cost-per-order optimization & waste elimination',
    ],
    spanClass: 'lg:col-span-7',
  },
  {
    number: '02.',
    title: 'Automated WhatsApp Order & Lead Capture',
    outcome: 'Every click becomes a structured order in under 45 seconds.',
    description:
      'Instead of letting prospects drop off on slow websites or unanswered DMs, we route traffic into a structured WhatsApp ordering flow with instant menus, qualifying prompts, and automatic follow-up reminders.',
    deliverables: [
      'Click-to-WhatsApp routing with pre-filled intent messages',
      'Automated greeting, catalog & price-list delivery',
      '24-hour unanswered lead recovery sequence',
    ],
    spanClass: 'lg:col-span-5',
  },
  {
    number: '03.',
    title: 'Walk-In & Phone Call Acceleration',
    outcome: 'Capture urgent buyers searching on Google Maps today.',
    description:
      'When someone searches for food, groceries, or a local technician nearby, they buy from the top three results. We overhaul your local search presence and run tap-to-call ads that ring your front desk directly.',
    deliverables: [
      'Google Business Profile conversion overhaul',
      'Tap-to-Call & Get Directions ad campaigns',
      'Review velocity system to outrank nearby competitors',
    ],
    spanClass: 'lg:col-span-5',
  },
  {
    number: '04.',
    title: 'Repeat-Buyer Reactivation Ledger',
    outcome: 'Turn first-time buyers into predictable weekly regulars.',
    description:
      'Acquiring a customer once is expensive; getting them to reorder every Friday is pure profit. Every WhatsApp inquiry is organized into a clean buyer list you own, powered by weekly broadcast offers.',
    deliverables: [
      'Segmented WhatsApp VIP customer database (100% owned by you)',
      'Weekly payday & weekend broadcast templates',
      'Simple weekly revenue scorecard—orders, calls, and cost per sale',
    ],
    spanClass: 'lg:col-span-7',
  },
];

export interface ValueStackItem {
  id: string;
  category: 'Core System' | 'Fast-Action Bonus';
  title: string;
  detail: string;
  valueNgn: string;
  valueUsd: string;
}

export const VALUE_STACK_ITEMS: ValueStackItem[] = [
  {
    id: 'stack-1',
    category: 'Core System',
    title: 'Local Buyer Offer Architecture & Funnel Blueprint',
    detail: 'Restructuring your top offers into high-margin bundles engineered for immediate local conversion.',
    valueNgn: '₦350,000',
    valueUsd: '$1,500',
  },
  {
    id: 'stack-2',
    category: 'Core System',
    title: 'Geo-Targeted Meta, Instagram & Google Ad Engine',
    detail: 'Full campaign build, pixel/conversion tracking, direct-response ad creative, and active management.',
    valueNgn: '₦600,000',
    valueUsd: '$2,800',
  },
  {
    id: 'stack-3',
    category: 'Core System',
    title: 'Automated WhatsApp Order & Lead Capture Setup',
    detail: 'Instant order menu routing, automated qualification replies, and missed-inquiry follow-up triggers.',
    valueNgn: '₦400,000',
    valueUsd: '$1,800',
  },
  {
    id: 'stack-4',
    category: 'Core System',
    title: 'Weekly Revenue & Cost-Per-Order Attribution Dashboard',
    detail: 'Plain-English weekly report tracking exact ad spend, WhatsApp orders, calls, and walk-in redemptions.',
    valueNgn: '₦250,000',
    valueUsd: '$900',
  },
  {
    id: 'bonus-1',
    category: 'Fast-Action Bonus',
    title: 'WhatsApp Closer Script & Objection Playbook',
    detail: 'Word-for-word reply scripts your staff can paste to close hesitant prospects 2x faster.',
    valueNgn: '₦180,000',
    valueUsd: '$650',
  },
  {
    id: 'bonus-2',
    category: 'Fast-Action Bonus',
    title: '5km Competitor Ad & Pricing Teardown',
    detail: 'A live audit of the ads running in your neighborhood and the exact gaps your business can capture.',
    valueNgn: '₦150,000',
    valueUsd: '$550',
  },
  {
    id: 'bonus-3',
    category: 'Fast-Action Bonus',
    title: 'Google Maps & Walk-In Visibility Optimization',
    detail: 'Category, photo, and local keyword tuning to drive free organic calls and store directions.',
    valueNgn: '₦220,000',
    valueUsd: '$800',
  },
];

export interface CaseStudy {
  id: string;
  business: string;
  vertical: string;
  location: string;
  timeframe: string;
  headlineMetric: string;
  subMetric: string;
  before: string;
  change: string;
  outcome: string;
  quote: string;
  author: string;
  role: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-food',
    business: 'Adebayo’s Kitchen & Grill',
    vertical: 'Food Vendor',
    location: 'Lekki Phase 1',
    timeframe: 'First 30 Days',
    headlineMetric: '+218 WhatsApp Orders',
    subMetric: '₦1.96M attributed revenue from ₦180k ad spend',
    before:
      'Posted 4 trending Instagram reels per week averaging 8,000 views, yet struggled to close more than 3–4 delivery orders per day.',
    change:
      'Replaced trend reels with lunch-hour geo-fenced platter ads routed straight into a 2-tap Kiralyte WhatsApp menu.',
    outcome:
      'Generated 218 paid WhatsApp orders in 30 days and built a repeat office-lunch broadcast list of 410 local buyers.',
    quote:
      'For the first time in two years, our kitchen stops guessing how busy Tuesday will be. Orders start ringing on WhatsApp by 10:30 AM.',
    author: 'Tunde Adebayo',
    role: 'Founder, Adebayo’s Kitchen & Grill',
  },
  {
    id: 'case-supermarket',
    business: 'FreshMart Neighborhood Grocer',
    vertical: 'Supermarket',
    location: 'Ikeja GRA',
    timeframe: '60 Days',
    headlineMetric: '+64% Weekday Walk-Ins',
    subMetric: '1,420 local shoppers added to weekly WhatsApp list',
    before:
      'Heavy weekend crowds followed by quiet Mondays through Thursdays, with boosted posts attracting likes from outside Lagos.',
    change:
      'Launched 4km weekday pantry-bundle ads with in-store pickup vouchers and automated WhatsApp restock alerts.',
    outcome:
      'Lifted Tuesday–Thursday walk-in receipts by 64% within 60 days while cutting wasted ad spend by more than half.',
    quote:
      'Kiralyte showed us we were paying for likes from people 40 kilometers away. Once they locked our radius, our tills felt it the very first week.',
    author: 'Ngozi Okonkwo',
    role: 'Managing Director, FreshMart Neighborhood Grocer',
  },
  {
    id: 'case-service',
    business: 'PrimeCool AC & Appliance Care',
    vertical: 'Local Service',
    location: 'Wuse II, Abuja',
    timeframe: '45 Days',
    headlineMetric: '47 Booked Jobs / Month',
    subMetric: '₦2,800 average cost per confirmed home visit',
    before:
      'Relied entirely on word-of-mouth referrals, leaving technicians idle during slow weeks with no predictable booking pipeline.',
    change:
      'Installed Google Local Search + Click-to-WhatsApp diagnostic ads with an instant technician dispatch form.',
    outcome:
      'Reached 47 confirmed service calls per month at a 5.9x return on ad spend, forcing them to hire two additional technicians.',
    quote:
      'We do not film dances—we fix air conditioners. Kiralyte built a clean system that turns local searches into paid service visits every day.',
    author: 'Ibrahim Musa',
    role: 'Operations Lead, PrimeCool AC & Appliance Care',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'I have boosted posts on Instagram before and lost money. How is this different?',
    answer:
      'Boosting posts optimizes for cheap likes and comments from random browsers. We build full-funnel campaigns inside Ads Manager with strict radius geo-fencing, buyer-intent ad creative, and a structured WhatsApp/call capture flow so every naira or dollar is tracked against actual orders and inquiries.',
  },
  {
    question: 'Do I have to dance on camera or post content every single day?',
    answer:
      'No. That is the exact trap we eliminate. Direct-response product photography, clear offer graphics, short customer proof clips, and local search ads consistently outperform trend dances for local businesses.',
  },
  {
    question: 'What happens during the free 15-minute strategy call?',
    answer:
      'A certified Kiralyte Growth & Digital Marketing Specialist reviews your current customer flow, checks competitor ad activity within 5km of your business, and maps out a 30-day roadmap showing your expected cost per order and daily buyer target. You keep the roadmap whether you hire us or not.',
  },
  {
    question: 'How much ad budget do I need to get started?',
    answer:
      'Most small businesses, food vendors, and local service providers start profitably with ₦150,000–₦350,000 ($300–$750) per month in direct ad spend paid directly to Meta or Google. During your 15-minute call, we calculate the exact break-even budget for your margins.',
  },
  {
    question: 'How quickly will WhatsApp orders and calls begin coming in?',
    answer:
      'Once we complete your 7-day setup (offer architecture, creative production, WhatsApp automation, and geo-targeting), campaigns go live on Day 8. Most clients receive their first tracked WhatsApp orders and phone inquiries within 24–72 hours of launch.',
  },
];
