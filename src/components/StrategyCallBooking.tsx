import { useEffect, useMemo, useState, FormEvent } from 'react';
import {
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  MessageCircle,
  Phone,
  AlertCircle,
} from 'lucide-react';
import {
  BusinessVerticalId,
  CALENDLY_URL,
  VERTICAL_PROFILES,
} from '../data/offerData';

interface StrategyCallBookingProps {
  selectedVertical: BusinessVerticalId;
}

interface DayOption {
  isoDate: string;
  dayName: string;
  dateLabel: string;
}

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM',
];

function getUpcomingBusinessDays(count = 5): DayOption[] {
  const days: DayOption[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0) {
      // Include Mon-Sat for local business owners
      const isoDate = cursor.toISOString().split('T')[0];
      const dayName = cursor.toLocaleDateString('en-US', { weekday: 'short' });
      const dateLabel = cursor.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      days.push({ isoDate, dayName, dateLabel });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function downloadCalendarInvite(
  name: string,
  businessName: string,
  isoDate: string,
  timeSlot: string
) {
  const [timePart, meridiem] = timeSlot.split(' ');
  const [rawHour, rawMinute] = timePart.split(':').map(Number);
  let hour24 = rawHour;
  if (meridiem === 'PM' && hour24 !== 12) hour24 += 12;
  if (meridiem === 'AM' && hour24 === 12) hour24 = 0;

  const dateClean = isoDate.replace(/-/g, '');
  const pad = (n: number) => String(n).padStart(2, '0');
  const start = `${dateClean}T${pad(hour24)}${pad(rawMinute)}00`;

  const endDate = new Date(`${isoDate}T${pad(hour24)}:${pad(rawMinute)}:00`);
  endDate.setMinutes(endDate.getMinutes() + 15);
  const end = `${dateClean}T${pad(endDate.getHours())}${pad(
    endDate.getMinutes()
  )}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kiralyte Technology Solutions//Strategy Call//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Kiralyte 15-Min Growth Roadmap Call — ${businessName}`,
    `DESCRIPTION:Free 15-minute strategy call for ${name} (${businessName}) with a Certified Growth & Digital Marketing Specialist from Kiralyte Technology Solutions. Call or WhatsApp: 08025418932`,
    'LOCATION:WhatsApp / Phone Call (08025418932)',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kiralyte-strategy-call-${isoDate}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function StrategyCallBooking({
  selectedVertical,
}: StrategyCallBookingProps) {
  const upcomingDays = useMemo(() => getUpcomingBusinessDays(5), []);

  const [selectedDay, setSelectedDay] = useState<string>(
    upcomingDays[0]?.isoDate ?? ''
  );
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[1]);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] =
    useState<BusinessVerticalId>(selectedVertical);

  useEffect(() => {
    setBusinessType(selectedVertical);
  }, [selectedVertical]);
  const [goalNote, setGoalNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [bookingMode, setBookingMode] = useState<'calendly' | 'form'>('calendly');

  const calendlyEmbedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=eb5e00`;

  const selectedDayObj =
    upcomingDays.find((d) => d.isoDate === selectedDay) ?? upcomingDays[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!businessName.trim() || businessName.trim().length < 2) {
      nextErrors.businessName = 'Please enter your business name.';
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || !/^\+?\d{10,15}$/.test(cleanPhone)) {
      nextErrors.phone =
        'Enter a valid WhatsApp or phone number (10–15 digits, e.g. 08025418932).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const code = `KRL-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(code);
  };

  const whatsappPrefillUrl = useMemo(() => {
    const verticalLabel = VERTICAL_PROFILES[businessType].shortLabel;
    const message = [
      `Hello Kiralyte, I just booked my Free 15-Min Strategy Call.`,
      `Ref: ${bookingRef ?? 'Pending'}`,
      `Name: ${fullName || 'Business Owner'}`,
      `Business: ${businessName || 'My Business'} (${verticalLabel})`,
      `Slot: ${selectedDayObj?.dayName}, ${selectedDayObj?.dateLabel} at ${selectedTime}`,
      goalNote.trim() ? `Main Goal: ${goalNote.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/2348025418932?text=${encodeURIComponent(message)}`;
  }, [
    bookingRef,
    businessName,
    businessType,
    fullName,
    goalNote,
    selectedDayObj,
    selectedTime,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      {/* Left Narrative Column */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-[#111315] text-white rounded-2xl p-7 sm:p-9 border border-[#262A30]">
        <div>
          <p className="text-sm font-medium text-[#FF8533]">
            Free 15-Minute Strategy Call
          </p>
          <h2 className="mt-2.5 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get your 30-day local buyer roadmap today.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
            Speak directly with a Certified Growth &amp; Digital Marketing
            Specialist—not a scripted call center. In 15 focused minutes, we
            audit what is blocking your daily sales and hand you a clear plan.
          </p>

          <ol className="mt-8 space-y-5 border-t border-white/10 pt-7">
            <li className="flex gap-3.5">
              <span className="font-mono text-xs font-semibold text-[#FF8533] pt-0.5 shrink-0 tabular-nums">
                01–05m
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Leak Diagnosis
                </p>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  We pinpoint where your current social posts, boosts, or DMs
                  are losing ready buyers.
                </p>
              </div>
            </li>
            <li className="flex gap-3.5">
              <span className="font-mono text-xs font-semibold text-[#FF8533] pt-0.5 shrink-0 tabular-nums">
                06–10m
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Local Offer &amp; WhatsApp Funnel Blueprint
                </p>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  We structure your highest-margin offer for 5km radius ads and
                  automated WhatsApp order capture.
                </p>
              </div>
            </li>
            <li className="flex gap-3.5">
              <span className="font-mono text-xs font-semibold text-[#FF8533] pt-0.5 shrink-0 tabular-nums">
                11–15m
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  30-Day Order Projection &amp; Next Steps
                </p>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  You leave with a realistic budget, target cost-per-order, and
                  zero obligation to hire us.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Direct Contact Channels matching Ad Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <p className="text-xs text-zinc-400">
            Prefer instant calendar scheduling or direct chat?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setBookingMode('calendly')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book via Calendly</span>
            </button>
            <a
              href="tel:08025418932"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold font-mono tabular-nums transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#FF8533]" aria-hidden="true" />
              <span>08025418932</span>
            </a>
            <a
              href="https://wa.me/2348025418932?text=Hello%20Kiralyte%2C%20I%20saw%20your%20ad%20and%20want%20to%20book%20a%20Free%2015-Min%20Strategy%20Call."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EB5E00]/15 hover:bg-[#EB5E00]/25 border border-[#EB5E00]/40 text-[#FF8533] text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Interactive Booking Column */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4E7EC] p-5 sm:p-8 flex flex-col justify-between">
        {/* Mode Switcher: Live Calendly Embed vs Quick Callback Form */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E4E7EC]">
          <div
            role="tablist"
            aria-label="Booking method"
            className="inline-flex p-1 rounded-xl bg-[#F2F4F7] border border-[#E4E7EC]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={bookingMode === 'calendly'}
              onClick={() => setBookingMode('calendly')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                bookingMode === 'calendly'
                  ? 'bg-white text-[#111315] shadow-xs'
                  : 'text-[#525866] hover:text-[#111315]'
              }`}
            >
              Live Calendar (Calendly)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={bookingMode === 'form'}
              onClick={() => setBookingMode('form')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                bookingMode === 'form'
                  ? 'bg-white text-[#111315] shadow-xs'
                  : 'text-[#525866] hover:text-[#111315]'
              }`}
            >
              Quick Callback Form
            </button>
          </div>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EB5E00] hover:text-[#D25200] whitespace-nowrap"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {bookingMode === 'calendly' ? (
          <div className="flex-1 flex flex-col">
            <div className="rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#FAFAFB]">
              <iframe
                src={calendlyEmbedUrl}
                title="Schedule a 30-Minute Strategy Call with Kiralyte Technology Solutions"
                className="w-full h-[640px] border-0"
                loading="eager"
              />
            </div>
            <p className="mt-3 text-center text-xs text-[#525866]">
              Calendar not loading?{' '}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#EB5E00] hover:underline"
              >
                Open Calendly directly
              </a>{' '}
              or switch to the{' '}
              <button
                type="button"
                onClick={() => setBookingMode('form')}
                className="font-semibold text-[#111315] hover:underline"
              >
                Quick Callback Form
              </button>
              .
            </p>
          </div>
        ) : bookingRef ? (
          <div className="py-4" role="status" aria-live="polite">
            <div className="w-12 h-12 rounded-xl bg-[#EB5E00]/10 text-[#EB5E00] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="mt-5 font-mono text-xs text-[#525866] tabular-nums">
              Confirmation Reference · {bookingRef}
            </p>
            <h3 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#111315]">
              Your 15-minute strategy call is reserved.
            </h3>
            <p className="mt-3 text-sm text-[#525866] leading-relaxed max-w-lg">
              A Certified Growth &amp; Digital Marketing Specialist from
              Kiralyte will reach you on{' '}
              <span className="font-semibold text-[#111315] font-mono tabular-nums">
                {phone}
              </span>{' '}
              on{' '}
              <span className="font-semibold text-[#111315]">
                {selectedDayObj.dayName}, {selectedDayObj.dateLabel} at{' '}
                {selectedTime} (WAT)
              </span>
              .
            </p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#FAFAFB] border border-[#E4E7EC] text-sm">
              <div>
                <dt className="text-xs text-[#525866]">Business</dt>
                <dd className="font-semibold text-[#111315] mt-0.5">
                  {businessName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#525866]">Category</dt>
                <dd className="font-semibold text-[#111315] mt-0.5">
                  {VERTICAL_PROFILES[businessType].label}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#525866]">Contact Name</dt>
                <dd className="font-semibold text-[#111315] mt-0.5">
                  {fullName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#525866]">Included Fast-Action Bonuses</dt>
                <dd className="font-semibold text-[#EB5E00] mt-0.5">
                  All 3 Bonuses Locked
                </dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#111315] hover:bg-[#262A30] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#FF8533]" aria-hidden="true" />
                <span>Lock Slot on Calendly</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
              </a>
              <a
                href={whatsappPrefillUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Confirm Instantly on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() =>
                  downloadCalendarInvite(
                    fullName,
                    businessName,
                    selectedDayObj.isoDate,
                    selectedTime
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAFAFB] hover:bg-[#F2F4F7] border border-[#E4E7EC] text-[#111315] text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Calendar Invite (.ics)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setBookingRef(null)}
              className="mt-5 text-xs font-medium text-[#525866] hover:text-[#111315] underline underline-offset-4"
            >
              Change time slot or edit details
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-sm font-semibold text-[#111315] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EB5E00]" aria-hidden="true" />
                  <span>Select preferred day &amp; time (WAT)</span>
                </span>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#EB5E00] hover:text-[#D25200] underline underline-offset-4 whitespace-nowrap"
                >
                  <span>Or pick live on Calendly</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {upcomingDays.map((day) => {
                  const active = day.isoDate === selectedDay;
                  return (
                    <button
                      key={day.isoDate}
                      type="button"
                      onClick={() => setSelectedDay(day.isoDate)}
                      className={`py-2.5 px-2 rounded-xl border text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00] ${
                        active
                          ? 'bg-[#111315] text-white border-[#111315]'
                          : 'bg-[#FAFAFB] text-[#111315] border-[#E4E7EC] hover:border-[#111315]/40'
                      }`}
                    >
                      <span
                        className={`block text-[11px] font-medium ${
                          active ? 'text-zinc-300' : 'text-[#525866]'
                        }`}
                      >
                        {day.dayName}
                      </span>
                      <span className="block text-xs sm:text-sm font-semibold mt-0.5 tabular-nums whitespace-nowrap">
                        {day.dateLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {TIME_SLOTS.map((slot) => {
                  const active = slot === selectedTime;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold font-mono tabular-nums border transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00] ${
                        active
                          ? 'bg-[#EB5E00] text-white border-[#EB5E00]'
                          : 'bg-white text-[#111315] border-[#E4E7EC] hover:border-[#111315]/40'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E4E7EC]">
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-xs font-semibold text-[#111315] mb-1.5"
                >
                  Your Full Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Chidinma Okafor"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111315] placeholder:text-[#8A92A0] bg-[#FAFAFB] focus:bg-white focus:outline-2 focus:outline-[#EB5E00] ${
                    errors.fullName ? 'border-red-600' : 'border-[#E4E7EC]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-business"
                  className="block text-xs font-semibold text-[#111315] mb-1.5"
                >
                  Business Name
                </label>
                <input
                  id="booking-business"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Mama Put Grill & Kitchen"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (errors.businessName) {
                      setErrors((prev) => ({ ...prev, businessName: '' }));
                    }
                  }}
                  aria-invalid={Boolean(errors.businessName)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111315] placeholder:text-[#8A92A0] bg-[#FAFAFB] focus:bg-white focus:outline-2 focus:outline-[#EB5E00] ${
                    errors.businessName ? 'border-red-600' : 'border-[#E4E7EC]'
                  }`}
                />
                {errors.businessName && (
                  <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.businessName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs font-semibold text-[#111315] mb-1.5"
                >
                  WhatsApp or Phone Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. 0802 541 8932"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: '' }));
                    }
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono text-[#111315] placeholder:font-sans placeholder:text-[#8A92A0] bg-[#FAFAFB] focus:bg-white focus:outline-2 focus:outline-[#EB5E00] ${
                    errors.phone ? 'border-red-600' : 'border-[#E4E7EC]'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-vertical"
                  className="block text-xs font-semibold text-[#111315] mb-1.5"
                >
                  Business Category
                </label>
                <select
                  id="booking-vertical"
                  value={businessType}
                  onChange={(e) =>
                    setBusinessType(e.target.value as BusinessVerticalId)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] text-sm text-[#111315] bg-[#FAFAFB] focus:bg-white focus:outline-2 focus:outline-[#EB5E00]"
                >
                  <option value="food-vendor">Food Vendor / Restaurant</option>
                  <option value="supermarket">Supermarket / Retail Store</option>
                  <option value="local-service">Local Service / Clinic</option>
                  <option value="small-business">Other Small Business</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-goal"
                className="block text-xs font-semibold text-[#111315] mb-1.5"
              >
                What is your 30-day target? (Optional)
              </label>
              <input
                id="booking-goal"
                type="text"
                placeholder="e.g. 20 daily lunch orders on WhatsApp or steady weekday store visits"
                value={goalNote}
                onChange={(e) => setGoalNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] text-sm text-[#111315] placeholder:text-[#8A92A0] bg-[#FAFAFB] focus:bg-white focus:outline-2 focus:outline-[#EB5E00]"
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#EB5E00] hover:bg-[#D25200] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E00]"
              >
                Book My Free 15-Min Strategy Call
              </button>
              <p className="mt-2.5 text-center text-xs text-[#525866]">
                No credit card required · Instant WhatsApp confirmation ·
                Certified Growth Specialist
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
