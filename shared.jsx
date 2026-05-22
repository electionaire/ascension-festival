// Shared building blocks for all three Ascension directions.
// Photo placeholders are styled as if real moody photos are there.

const { useState, useEffect, useMemo } = React;

// ── Countdown ───────────────────────────────────────────────────────────
// Target: June 5, 2026 — Summer Festival @ Effenaar
function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

// ── Photo placeholder — styled like a moody crowd shot ────────────────
function Photo({ caption = 'crowd / night', tone = 'warm', children, style, className = '', radius = 0, height, ratio }) {
  // tone presets so different boards feel different
  const palettes = {
    warm: 'linear-gradient(140deg, rgba(255,150,60,.18), rgba(180,40,10,.32) 55%, rgba(0,0,0,.6)), radial-gradient(120% 80% at 18% 22%, #4a2010 0%, #1a0d07 60%, #060403 100%)',
    crowd: 'linear-gradient(180deg, rgba(255,120,40,.0) 0%, rgba(255,120,40,.22) 40%, rgba(255,60,20,.45) 70%, #0a0503 100%), radial-gradient(80% 60% at 50% 80%, #5a1d0a 0%, #1a0a05 70%, #050201 100%)',
    smoke: 'linear-gradient(160deg, rgba(255,200,140,.12), rgba(120,30,10,.2) 45%, rgba(20,8,4,.85)), radial-gradient(60% 50% at 70% 30%, #6a2b14 0%, #2a120a 50%, #08040201 100%)',
    deep: 'linear-gradient(135deg, rgba(60,20,8,.95), rgba(10,5,3,.95))',
    amber: 'linear-gradient(160deg, rgba(255,170,60,.4), rgba(220,60,10,.4) 60%, rgba(0,0,0,.6)), radial-gradient(80% 60% at 30% 30%, #6a2c10 0%, #1f0d05 70%, #050201 100%)',
    inferno: 'linear-gradient(180deg, rgba(0,0,0,.4), rgba(255,40,12,.0) 30%), radial-gradient(70% 55% at 50% 65%, #b4290a 0%, #4d1004 50%, #0c0301 100%)',
  };
  const bg = palettes[tone] || palettes.warm;
  return (
    <div className={'af-photo ' + className} data-cap={caption}
      style={{
        backgroundImage: bg + ', repeating-linear-gradient(45deg, rgba(255,255,255,.018) 0 8px, rgba(0,0,0,.05) 8px 16px)',
        borderRadius: radius,
        height,
        aspectRatio: ratio,
        ...style,
      }}>
      <div className="grain" />
      {children}
    </div>
  );
}

// ── Custom Ascension mark — simple primitives, "A" + rising rays ───────
// A triangle (A) with three rays rising — using only rotated rectangles + a circle.
function MarkA({ size = 32, color = '#ffb169', strokeWidth = 2.5 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      {/* A — two strokes + crossbar */}
      <polygon points="32,8 56,56 8,56" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" />
      <line x1="18" y1="40" x2="46" y2="40" stroke={color} strokeWidth={strokeWidth} />
      {/* rising rays — three small ticks above */}
      <line x1="32" y1="2" x2="32" y2="0" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

// ── Sunburst — used in Solstice — N rotated rectangles around a circle ──
function Sunburst({ size = 260, rays = 36, color = '#ffb060', inner = 0.32, outer = 0.5, thickness = 1.5 }) {
  const r = size / 2;
  const items = [];
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * 360;
    items.push(
      <rect key={i}
        x={r - thickness / 2} y={r - r * outer}
        width={thickness} height={r * (outer - inner)}
        fill={color}
        transform={`rotate(${a} ${r} ${r})`}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {items}
      <circle cx={r} cy={r} r={r * inner * 0.85} fill="none" stroke={color} strokeWidth={1} opacity={0.6} />
    </svg>
  );
}

// ── Halftone dots field — for textures ──────────────────────────────────
function HalftoneField({ color = '#ff5a1f', size = 320, dot = 2, spacing = 8, opacity = 0.18 }) {
  return (
    <div aria-hidden style={{
      width: size, height: size,
      backgroundImage: `radial-gradient(${color} ${dot}px, transparent ${dot + 0.5}px)`,
      backgroundSize: `${spacing}px ${spacing}px`,
      opacity,
    }} />
  );
}

// ── Marquee / scrolling ticker ──────────────────────────────────────────
function Marquee({ items = [], speed = 30, separator = '✦', style = {}, color = '#ff5a1f', size = 14 }) {
  const content = items.concat(items, items); // triple for seamless loop
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', ...style }}>
      <style>{`
        @keyframes af-marq {
          0% { transform: translateX(0) }
          100% { transform: translateX(-33.333%) }
        }
      `}</style>
      <div style={{ display: 'inline-block', animation: `af-marq ${speed}s linear infinite`, whiteSpace: 'nowrap' }}>
        {content.map((it, i) => (
          <span key={i} style={{
            display: 'inline-block', padding: '0 24px', color,
            fontFamily: 'Montserrat', fontWeight: 800, fontSize: size, letterSpacing: '.04em', textTransform: 'uppercase'
          }}>
            {it} <span style={{ opacity: .5, padding: '0 8px' }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Festival event data ─────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'summer-fest-2026',
    headline: true,
    isSeries: false,
    date: { day: '05', month: 'JUN', dow: 'FRI', year: '2026' },
    iso: '2026-06-05T23:30:00+02:00',
    title: 'SUMMER FESTIVAL 2026',
    venue: 'Effenaar — Main Stage',
    city: 'Eindhoven, NL',
    doors: '23:30 — 04:00',
    tag: 'Headline event',
    status: 'On sale',
    poster: 'assets/poster-summer.jpg',
  },
  {
    id: 'intro-2026',
    headline: false,
    isSeries: true,
    iso: '2026-08-29T23:30:00+02:00',
    title: 'INTERNATIONAL STUDENT INTRO 2026',
    venue: 'Three venues across Eindhoven',
    city: 'Eindhoven, NL',
    tag: 'Three-show series',
    status: 'On sale',
    poster: 'assets/poster-intro.jpg',
    // Compact label for grid cells that expect a single date
    date: { day: '29', month: 'AUG', dow: 'SAT', year: '2026' },
    series: [
      { id: 'intro-opening', subtitle: 'The Opening',      day: '29', month: 'AUG', dow: 'SAT', year: '2026', venue: 'Domusdela',       doors: '23:30 — 05:00' },
      { id: 'intro-main',    subtitle: 'Main Act',         day: '11', month: 'SEP', dow: 'FRI', year: '2026', venue: 'Effenaar',        doors: '23:30 — 05:00' },
      { id: 'intro-closing', subtitle: 'Closing Festival', day: '02', month: 'OCT', dow: 'FRI', year: '2026', venue: 'Vibes Eindhoven', doors: '23:30 — 05:00' },
    ],
  },
];

const FAQS = [
  { q: 'What is the minimum age?', a: 'Ascension events are 18+. Bring a valid government ID — passport, EU ID card, or driver\'s license. No ID, no entry. We don\'t make exceptions.' },
  { q: 'Dress code?', a: 'There is none. Come as you are, just dress to dance — it gets hot, it gets sweaty, and the night is long. Leave the bulky coats in the cloakroom.' },
  { q: 'Is there a cloakroom / lockers?', a: 'Yes. Cloakroom is €3 per item, lockers are €5 for the night with in-and-out access. Cash and contactless both work.' },
  { q: 'What about re-entry?', a: 'Once you leave the venue, you cannot return. Smoking is allowed in the designated smoking area inside.' },
  { q: 'Is the venue accessible?', a: 'Effenaar Main Stage is wheelchair accessible with accessible toilets on the ground floor. Reach out to us at hello@ascensionfestival.nl ahead of the show so we can make sure you have the best night.' },
  { q: 'Lost something?', a: 'Lost & found is held at the venue for 14 days after the event. Email us with a description and date — we\'ll do our best to reunite you with your stuff.' },
  { q: 'Refunds?', a: 'Tickets are non-refundable but transferable. Use the official resale link in your confirmation email — never buy from strangers on Telegram or Instagram.' },
];

const PAST_EVENTS = [
  { id: 'p1', title: 'NYE — Liquid Heat', date: 'DEC 31 · 2025', tone: 'crowd', tag: 'Sold out' },
  { id: 'p2', title: 'ADE Showcase', date: 'OCT 17 · 2025', tone: 'amber', tag: 'Amsterdam' },
  { id: 'p3', title: 'Summer Closing', date: 'AUG 30 · 2025', tone: 'smoke', tag: '1,400 cap' },
  { id: 'p4', title: 'Spring Awakening', date: 'APR 26 · 2025', tone: 'warm', tag: 'Two-floor' },
  { id: 'p5', title: 'Intro Vol.03 — 2025', date: 'OCT 03 · 2025', tone: 'inferno', tag: 'Free for IS' },
  { id: 'p6', title: 'Winter Bass', date: 'FEB 14 · 2025', tone: 'crowd', tag: 'Valentine' },
];

Object.assign(window, {
  useCountdown, Photo, MarkA, Sunburst, HalftoneField, Marquee,
  EVENTS, FAQS, PAST_EVENTS,
});
