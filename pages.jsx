// pages.jsx — Tickets / Gallery / Events / Contact pages

const { MonoNav, MonoFooter, BWPhoto, monoStyles, EVENTS } = window;

const pageRoot = {
  width: '100%', minHeight: '100vh',
  fontFamily: 'Montserrat, sans-serif',
  background: '#fafafa', color: '#0a0a0a',
  position: 'relative',
};

// ── Shared page header ─────────────────────────────────────────────────
function PageHeader({ eyebrow, title, italic, lead, subhead, photo, height = 720 }) {
  return (
    <section className="af-page-header" style={{ position: 'relative', height }}>
      {photo && <BWPhoto src={photo} caption="" style={{ position: 'absolute', inset: 0 }} />}
      {photo && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.15) 45%, rgba(0,0,0,.72) 100%)' }} />}
      <MonoNav inverted={!!photo} />
      <div className="af-page-header-content" style={{ position: 'absolute', left: 56, right: 56, bottom: 56, color: photo ? '#fafafa' : '#0a0a0a' }}>
        <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 11, marginBottom: 22 }}>{eyebrow}</div>
        <h1 className="af-page-h1" style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 152, lineHeight: 0.91, letterSpacing: '-0.042em', margin: 0, maxWidth: 1120 }}>
          {title}{italic && <span style={{ fontStyle: 'italic', fontWeight: 200 }}> {italic}</span>}
        </h1>
        {lead && <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 18, lineHeight: 1.55, maxWidth: 600, marginTop: 22, opacity: .88 }}>{lead}</p>}
        {subhead && (
          <div style={{ ...monoStyles.mono, opacity: .65, fontSize: 10, marginTop: 22, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {subhead.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = React.useState(startIndex);
  const total = images.length;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  setIdx(i => (i + 1) % total);
      if (e.key === 'ArrowLeft')   setIdx(i => (i - 1 + total) % total);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [total]);

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % total); };

  const ArrowBtn = ({ dir, onClick }) => (
    <button onClick={onClick} style={{
      position: 'absolute', [dir]: 24, top: '50%', transform: 'translateY(-50%)',
      background: 'rgba(255,255,255,.08)', border: 'none', color: '#fafafa',
      width: 52, height: 52, borderRadius: 26, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} />
      </svg>
    </button>
  );

  return ReactDOM.createPortal(
    <div className="af-lb-overlay" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(5,5,5,.94)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* counter */}
      <div style={{ position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.45)', ...monoStyles.mono, fontSize: 10 }}>
        {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 18, right: 22, background: 'none', border: 'none',
        color: 'rgba(255,255,255,.6)', fontSize: 32, cursor: 'pointer', lineHeight: 1,
        transition: 'color 0.15s', padding: '4px 8px',
      }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
      >×</button>

      {/* image — key forces re-mount + fade on navigation */}
      <img key={idx} src={images[idx]} className="af-lb-img" onClick={e => e.stopPropagation()}
        style={{ maxWidth: '86vw', maxHeight: '86vh', objectFit: 'contain', display: 'block', userSelect: 'none' }} />

      {total > 1 && <ArrowBtn dir="left"  onClick={prev} />}
      {total > 1 && <ArrowBtn dir="right" onClick={next} />}
    </div>,
    document.body
  );
}

// ── TICKETS ────────────────────────────────────────────────────────────
function TicketsPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 01 — Tickets"
        title="Get your"
        italic="tickets."
        lead="Pre-sale codes go out to the mailing list 24 hours before public release. Tickets are transferable, but non-refundable."
        subhead={['Powered by Pretix', '4 / 4 shows on sale', 'No third-party resellers — buy direct from us']}
        photo="assets/gallery/g11.jpg" />

      <section className="af-reveal" style={{ padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #0a0a0a' }}>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 40, letterSpacing: '-0.025em', margin: 0 }}>
            <span style={{ fontStyle: 'italic' }}>Pick</span> your shows
          </h2>
          <span style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Secure checkout · iDEAL · Card · Bancontact</span>
        </div>

        <div style={{ border: '1px solid #0a0a0a', padding: 32, minHeight: 720, background: '#fff' }}>
          <div dangerouslySetInnerHTML={{ __html: `
            <pretix-widget event="https://tickets.ascensionfestival.nl/intro/"></pretix-widget>
            <noscript>
              <div class="pretix-widget">
                <div class="pretix-widget-info-message">
                  JavaScript is disabled. <a target="_blank" rel="noopener" href="https://tickets.ascensionfestival.nl/intro/">Open ticket shop →</a>
                </div>
              </div>
            </noscript>
          ` }} />
        </div>

        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 16, textAlign: 'center' }}>
          Trouble loading the shop?{' '}
          <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" className="af-link" onClick={() => track('Tickets Page – Open Shop Directly', 'cta')} style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 1 }}>Open it directly →</a>
        </div>
      </section>

      <section className="af-reveal af-ticket-features" style={{ padding: '60px 48px 100px', borderTop: '1px solid #0a0a0a', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        {[
          ['01', 'Direct from us', 'No third-party resellers. Every ticket comes through Pretix and is valid at the door.'],
          ['02', 'Transferable', "Can't make it? Pass your ticket to a friend through your confirmation email — no fee."],
          ['03', 'Refund protection', 'Show cancelled? Full refund within 14 days, automatic to your original payment method.'],
          ['04', 'Lost ticket? No stress', 'Bring your ID — we can re-issue at the door if your email is on the list.'],
        ].map(([n, h, body]) =>
          <div key={n}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{n}</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 17, marginTop: 8, letterSpacing: '-0.005em' }}>{h}</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, lineHeight: 1.6, opacity: .65, marginTop: 8 }}>{body}</div>
          </div>
        )}
      </section>

      <MonoFooter />
    </div>
  );
}

// ── GALLERY ────────────────────────────────────────────────────────────
const ALBUM_LAYOUTS = {
  turbulence: [
    { src: 'assets/gallery/g40.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g41.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g42.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g43.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g44.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g45.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g46.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g47.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g48.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g49.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g50.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g51.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g52.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g53.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g54.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g55.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g56.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g57.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g58.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g59.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g60.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g61.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g62.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g63.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g64.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g65.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g66.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g67.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g68.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g69.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g70.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g71.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g72.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g73.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g74.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g75.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g76.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g77.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g78.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g79.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g80.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g81.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g82.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g83.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g84.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g85.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g86.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g87.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g88.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g89.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g90.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g91.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g92.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g93.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g94.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g95.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g96.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g97.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g98.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g99.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g100.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g101.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g102.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g103.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g104.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g105.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g106.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g107.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g108.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g109.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g110.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g111.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g112.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g113.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g114.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g115.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g116.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g117.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g118.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g119.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g120.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g121.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g122.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g123.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g124.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g125.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g126.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g127.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g128.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/g129.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/g130.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g131.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g132.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g133.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g134.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g135.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g136.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g137.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g138.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g139.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g140.jpg', col: 'span 4', h: 520 },
  ],
  ascension: [],
};

const ALBUMS = [
  { id: 'turbulence', name: 'Ascension: Turbulence', date: 'Apr 24 · 2026', src: 'assets/gallery/g40.jpg' },
  { id: 'ascension',  name: 'Ascension',             date: 'Nov 15 · 2025', src: 'assets/gallery/g29.jpg' },
];

function GalleryPage() {
  const [activeId, setActiveId] = React.useState('turbulence');
  const [lightbox, setLightbox] = React.useState(null);

  const active = ALBUMS.find(a => a.id === activeId);
  const layout = ALBUM_LAYOUTS[activeId];
  const images = layout.map(it => it.src);

  const switchAlbum = (id) => { setActiveId(id); setLightbox(null); track(`Gallery – Switch Album: ${id}`, 'gallery'); };

  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 02 — Gallery"
        title="The afterglow."
        photo="assets/gallery/g15.jpg" />

      <section className="af-reveal" style={{ padding: '40px 48px 0', borderBottom: '1px solid rgba(10,10,10,.15)' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 28 }}>
          {ALBUMS.map((a) =>
            <div key={a.id} className="af-album-card" onClick={() => switchAlbum(a.id)}
              style={{ flex: '0 0 auto', cursor: 'pointer', border: a.id === activeId ? '1px solid #0a0a0a' : '1px solid rgba(10,10,10,.18)', background: a.id === activeId ? '#0a0a0a' : 'transparent', color: a.id === activeId ? '#fafafa' : '#0a0a0a', padding: 14, width: 220 }}>
              <img src={a.src} alt={a.name} style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }} />
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .65, marginTop: 12 }}>{a.date}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 15, marginTop: 4, letterSpacing: '-0.005em', lineHeight: 1.2 }}>{a.name}</div>
            </div>
          )}
        </div>
      </section>

      <section className="af-reveal" style={{ padding: '60px 48px 28px' }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', margin: '0', lineHeight: 1 }}>
          <span style={{ fontStyle: 'italic' }}>{active.name}</span>
        </h2>
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 10 }}>{active.date}</div>
      </section>

      <section style={{ padding: '0 48px 80px' }}>
        <div className="af-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8 }}>
          {layout.map((it, i) =>
            <div key={`${activeId}-${i}`} className="af-photo-item" style={{ gridColumn: it.col, height: it.h, position: 'relative' }}
              onClick={() => { setLightbox(i); track(`Gallery – Open Photo ${i + 1}`, 'gallery'); }}>
              <BWPhoto src={it.src} caption="" style={{ width: '100%', height: '100%' }} />
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && <Lightbox images={images} startIndex={lightbox} onClose={() => { setLightbox(null); track('Gallery – Lightbox Close', 'gallery'); }} />}

      <MonoFooter />
    </div>
  );
}

// ── EVENTS ─────────────────────────────────────────────────────────────
const LINEUPS = {
  'intro-opening':    ['House selectors · Ascension Crew', 'Sajeda', 'Bonzai b2b LOOG', 'Resident closeout'],
  'intro-main':       ['Headliner · TBA', 'D.Dan', 'Sara Landry (techno set)', 'Ascension Crew', 'Surprise guest'],
  'intro-closing':    ['Closing headliner · TBA', 'Marlon Hoffstadt', 'Kessler', 'Ascension Crew', 'Vibes resident'],
};
const VENUE_INFO = {
  'Effenaar — Main Stage': { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,200 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Effenaar':              { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,200 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Effenaar Main Stage':   { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,200 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Vibes Eindhoven':       { addr: 'Markt 1, 5611 EA Eindhoven', cap: '3,000 cap', tram: '3 min walk from Centraal' },
};

function EventCard({ ev, i }) {
  return (
    <article className="af-reveal af-event-article" style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48, padding: '60px 0', borderTop: '1px solid #0a0a0a' }}>
      <div className="af-photo-item">
        <img src={ev.poster} alt={ev.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 12 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 96, lineHeight: 1, letterSpacing: '-0.045em', fontVariantNumeric: 'tabular-nums' }}>{ev.date.day}</div>
              <div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em' }}>{ev.date.month} · {ev.date.year}</div>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 4 }}>{ev.date.dow} · {ev.doors}</div>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.015em', margin: '20px 0 0', maxWidth: 540 }}>
              {ev.headline && <span style={{ fontStyle: 'italic', fontWeight: 300 }}>★ </span>}
              {ev.title}
            </h3>
          </div>
          <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" className="af-cta-dark" onClick={() => track(`Events Page – Get Tickets: ${ev.title}`, 'cta')} style={{ background: '#0a0a0a', color: '#fafafa', padding: '14px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, whiteSpace: 'nowrap' }}>
            Get tickets →
          </a>
        </div>
      </div>
    </article>
  );
}

function EventsPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 03 — Events"
        title="Welcome to"
        italic="Eindhoven"
        lead="Eindhoven's International Student Intro Event Series"
        subhead={['Updated 03.06.2026', '3 / 3 shows on sale', 'Doors at 23:30 unless noted']}
        photo="assets/gallery/g27.jpg" />

      <section style={{ padding: '40px 48px 80px' }}>
        {EVENTS.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
        <div style={{ borderTop: '1px solid #0a0a0a' }} />
      </section>

      <MonoFooter />
    </div>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 04 — Contact"
        title="Say"
        italic="hello."
        photo="assets/gallery/g66.jpg" />

      <section className="af-reveal" style={{ padding: '100px 48px 120px' }}>
        <a href="mailto:egor@ascensionfestival.nl" className="af-contact-email" onClick={() => track('Contact Page – Email', 'contact')} style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 40, letterSpacing: '-0.025em', color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid #0a0a0a', paddingBottom: 4, display: 'inline-block', wordBreak: 'break-all' }}>
          egor@ascensionfestival.nl
        </a>
      </section>

      <MonoFooter />
    </div>
  );
}

Object.assign(window, { TicketsPage, GalleryPage, EventsPage, ContactPage });
