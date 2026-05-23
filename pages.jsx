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
          <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" className="af-link" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 1 }}>Open it directly →</a>
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
function GalleryPage() {
  const [lightbox, setLightbox] = React.useState(null);

  const layout = [
    { src: 'assets/gallery/g11.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/g03.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/g05.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g06.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g07.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g04.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/g08.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/g12.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g13.jpg', col: 'span 6', h: 420 },
    { src: 'assets/gallery/g09.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g10.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g14.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/g15.jpg', col: 'span 7', h: 440 },
    { src: 'assets/gallery/g16.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/g17.jpg', col: 'span 4', h: 420 },
    { src: 'assets/gallery/g18.jpg', col: 'span 4', h: 420 },
    { src: 'assets/gallery/g19.jpg', col: 'span 4', h: 420 },
    { src: 'assets/gallery/g20.jpg', col: 'span 5', h: 600 },
    { src: 'assets/gallery/g21.jpg', col: 'span 7', h: 600 },
    { src: 'assets/gallery/g22.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g23.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/g24.jpg', col: 'span 4', h: 380 },
  ];
  const images = layout.map(it => it.src);

  const albums = [
    { id: 'intro-25',  name: 'Intro 2025 · Vol.03',  date: 'Oct 03 · 2025', count: 218, src: 'assets/gallery/g05.jpg', active: true },
    { id: 'spring-25', name: 'Spring Awakening',      date: 'Apr 26 · 2025', count: 164, src: 'assets/gallery/g09.jpg' },
    { id: 'nye-25',    name: 'NYE — Liquid Heat',     date: 'Dec 31 · 2025', count: 287, src: 'assets/gallery/g15.jpg' },
    { id: 'ade-25',    name: 'ADE Showcase',           date: 'Oct 17 · 2025', count: 142, src: 'assets/gallery/g20.jpg' },
    { id: 'summer-25', name: 'Summer Closing',         date: 'Aug 30 · 2025', count: 196, src: 'assets/gallery/g23.jpg' },
  ];

  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 02 — Gallery"
        title="The afterglow."
        lead="Eight years, 124 shows, 80,000 students. Click any album to dive in. New photos drop every Monday after a show."
        subhead={['1,007 photos across 18 albums', 'Shot by Van der Wielen Studio + community submissions', 'Tag yourself: #ascensionfestival']}
        photo="assets/gallery/g15.jpg" />

      <section className="af-reveal" style={{ padding: '40px 48px 0', borderBottom: '1px solid rgba(10,10,10,.15)' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 28 }}>
          {albums.map((a) =>
            <div key={a.id} className="af-album-card" style={{ flex: '0 0 auto', border: a.active ? '1px solid #0a0a0a' : '1px solid rgba(10,10,10,.18)', background: a.active ? '#0a0a0a' : 'transparent', color: a.active ? '#fafafa' : '#0a0a0a', padding: 14, width: 220 }}>
              <img src={a.src} alt={a.name} style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }} />
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .65, marginTop: 12 }}>{a.date}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 15, marginTop: 4, letterSpacing: '-0.005em', lineHeight: 1.2 }}>{a.name}</div>
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .55, marginTop: 6 }}>{a.count} photos</div>
            </div>
          )}
        </div>
      </section>

      <section className="af-reveal" style={{ padding: '60px 48px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Now viewing · 218 photos</div>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', margin: '12px 0 0', lineHeight: 1 }}>
            Intro 2025 — <span style={{ fontStyle: 'italic' }}>Vol.03</span>
          </h2>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 10 }}>Fri 03 Oct 2025 · Effenaar Main Stage · 23:30–05:00</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <a href="#" className="af-outline-link" style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '10px 16px', textDecoration: 'none' }}>Download ZIP</a>
          <a href="#" className="af-cta-dark" style={{ ...monoStyles.mono, fontSize: 10, color: '#fafafa', background: '#0a0a0a', padding: '10px 16px', textDecoration: 'none' }}>Share album</a>
        </div>
      </section>

      <section style={{ padding: '0 48px 80px' }}>
        <div className="af-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8 }}>
          {layout.map((it, i) =>
            <div key={i} className="af-photo-item" style={{ gridColumn: it.col, height: it.h, position: 'relative' }}
              onClick={() => setLightbox(i)}>
              <BWPhoto src={it.src} caption="" style={{ width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, ...monoStyles.mono, fontSize: 9, color: '#fafafa', opacity: .7, textShadow: '0 1px 6px rgba(0,0,0,.6)', pointerEvents: 'none' }}>
                {String(i + 1).padStart(3, '0')} / 218
              </div>
            </div>
          )}
        </div>
        <div className="af-reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>21 / 218 photos shown</div>
          <a href="#" className="af-outline-link" style={{ display: 'inline-block', color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '16px 32px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
            Load 24 more →
          </a>
        </div>
      </section>

      {lightbox !== null && <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />}

      <MonoFooter />
    </div>
  );
}

// ── EVENTS ─────────────────────────────────────────────────────────────
const LINEUPS = {
  'summer-fest-2026': ['SADO OPULENCE (live)', 'KETTAMA', 'Mac Declos', 'Local hero · TBA', 'Special b2b · TBA'],
  'intro-opening':    ['House selectors · Ascension Crew', 'Sajeda', 'Bonzai b2b LOOG', 'Resident closeout'],
  'intro-main':       ['Headliner · TBA', 'D.Dan', 'Sara Landry (techno set)', 'Ascension Crew', 'Surprise guest'],
  'intro-closing':    ['Closing headliner · TBA', 'Marlon Hoffstadt', 'Kessler', 'Ascension Crew', 'Vibes resident'],
};
const VENUE_INFO = {
  'Effenaar — Main Stage': { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,400 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Effenaar':              { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,400 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Domusdela':             { addr: 'Kloosterdreef 7, 5622 AC Eindhoven', cap: '900 cap · former church', tram: '12 min cycle from Centraal' },
  'Vibes Eindhoven':       { addr: 'Markt 1, 5611 EA Eindhoven', cap: '650 cap · intimate floor', tram: '3 min walk from Centraal' },
};

function EventCard({ ev, i }) {
  const venueInfo = VENUE_INFO[ev.venue] || { addr: '—', cap: '—', tram: '—' };
  const lineup = LINEUPS[ev.id] || [];
  return (
    <article className="af-reveal af-event-article" style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48, padding: '60px 0', borderTop: '1px solid #0a0a0a' }}>
      <div className="af-photo-item">
        <img src={ev.poster} alt={ev.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 12 }}>Poster · designed by Ascension Studio</div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>No. {String(i + 1).padStart(2, '0')} · {ev.tag}</div>
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
          <a href="#tickets" className="af-cta-dark" style={{ background: '#0a0a0a', color: '#fafafa', padding: '14px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, whiteSpace: 'nowrap' }}>
            {ev.price ? `Buy · ${ev.price} →` : 'Buy ticket →'}
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, marginTop: 36 }}>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Lineup</div>
            {lineup.map((a, j) =>
              <div key={a} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: j < lineup.length - 1 ? '1px solid rgba(10,10,10,.1)' : 'none' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: j === 0 ? 500 : 400, fontSize: 16, letterSpacing: '-0.005em' }}>
                  {j === 0 && <span style={{ fontStyle: 'italic', fontWeight: 300, opacity: .6 }}>headline </span>}
                  {a}
                </span>
                <span style={{ ...monoStyles.mono, opacity: .4, fontSize: 9, alignSelf: 'center' }}>set {String(j + 1).padStart(2, '0')}</span>
              </div>
            )}
          </div>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Venue</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 18, letterSpacing: '-0.005em' }}>{ev.venue}</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, opacity: .7, marginTop: 6 }}>{venueInfo.addr}</div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 14 }}>{venueInfo.cap}</div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 4 }}>{venueInfo.tram}</div>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(venueInfo.addr)}`} target="_blank" rel="noopener" className="af-link"
              style={{ display: 'inline-block', marginTop: 16, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, ...monoStyles.mono, fontSize: 10, textDecoration: 'none' }}>
              Open in maps →
            </a>
          </div>
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
        title="Summer 2026 ·"
        italic="four shows."
        lead="One summer festival in June, three Intro 2026 shows in Aug/Sep/Oct. Same crew, same ID rules, three different venues. Bring water, bring friends."
        subhead={['Updated 22.05.2026', '4 / 4 shows on sale', 'Doors at 23:30 unless noted']}
        photo="assets/gallery/g08.jpg" />

      <section style={{ padding: '40px 48px 80px' }}>
        <div className="af-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid rgba(10,10,10,.15)' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {['All', 'Summer Festival', 'Intro 2026'].map((t, i) =>
              <span key={t} className="af-filter" data-active={i === 0 ? 'true' : undefined}
                style={{ ...monoStyles.mono, fontSize: 11, padding: '8px 14px', border: '1px solid', borderColor: i === 0 ? '#0a0a0a' : 'transparent', background: i === 0 ? '#0a0a0a' : 'transparent', color: i === 0 ? '#fafafa' : '#0a0a0a' }}>{t}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 20, ...monoStyles.mono, fontSize: 10, opacity: .65 }}>
            <span className="af-footer-link" style={{ cursor: 'pointer' }}>Sort · Date ↓</span>
            <span className="af-footer-link" style={{ cursor: 'pointer' }}>View · List</span>
          </div>
        </div>

        {EVENTS.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
        <div style={{ borderTop: '1px solid #0a0a0a' }} />

        <div className="af-reveal" style={{ marginTop: 60, padding: '36px 40px', background: '#0a0a0a', color: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Looking for past shows?</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, marginTop: 6, letterSpacing: '-0.02em' }}>
              <span style={{ fontStyle: 'italic' }}>120+ archived</span> shows since 2018
            </div>
          </div>
          <a href="#gallery" className="af-cta-light" style={{ background: '#fafafa', color: '#0a0a0a', padding: '16px 24px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, display: 'inline-block' }}>
            Browse archive →
          </a>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────
const CONTACTS = [
  { dept: 'General',  email: 'info@ascensionfestival.nl', desc: 'Questions about tickets, the venue, lost & found, dress code — anything ticket-holder related.', sla: 'Reply within 24h' },
  { dept: 'Bookings', email: 'info@ascensionfestival.nl', desc: 'Artist bookings, agent enquiries, b2b proposals. Send us a SoundCloud link and a recent set.', sla: '3 — 5 business days' },
  { dept: 'Press',    email: 'info@ascensionfestival.nl', desc: 'Press kit, interviews, photographer accreditation, brand collabs and partnerships.', sla: 'Reply within 48h' },
  { dept: 'Safety',   email: 'info@ascensionfestival.nl', desc: 'Reach our safer-space team. Confidential, 24/7 monitored during shows.', sla: 'Always on during shows' },
];

const inputStyle = {
  width: '100%', border: 'none', borderBottom: '1px solid #0a0a0a',
  padding: '10px 0', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17,
  background: 'transparent', outline: 'none', color: '#0a0a0a', borderRadius: 0,
};
const labelStyle = {
  display: 'block', fontFamily: 'Montserrat', fontWeight: 500, fontSize: 9,
  letterSpacing: '.22em', textTransform: 'uppercase', opacity: .55,
};

function ContactPage() {
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(data.get('subject') || 'Message from ascensionfestival.nl');
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nDepartment: ${data.get('department')}\n\n${data.get('message')}`);
    window.location.href = `mailto:info@ascensionfestival.nl?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 04 — Contact"
        title="Say"
        italic="hello."
        lead="We're one person, one inbox, and we answer everything ourselves. No bots, no canned replies, just me."
        subhead={['Eindhoven, NL', 'CET / CEST timezone']}
        photo="assets/gallery/g17.jpg" />

      <section className="af-reveal" style={{ padding: '80px 48px 48px' }}>
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 28 }}>Who to email</div>
        <div className="af-contact-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {CONTACTS.map((c, i) =>
            <div key={c.dept} className="af-contact-card" style={{ border: '1px solid #0a0a0a', padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>{c.sla}</div>
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 40, letterSpacing: '-0.025em', marginTop: 10, lineHeight: 1 }}>
                <span style={{ fontStyle: 'italic' }}>{c.dept}</span>
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, lineHeight: 1.6, opacity: .65, marginTop: 16, maxWidth: 460 }}>{c.desc}</div>
              <a href={`mailto:${c.email}`} className="af-link" style={{ display: 'inline-block', marginTop: 22, fontFamily: 'Montserrat', fontWeight: 500, fontSize: 16, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 4, letterSpacing: '-0.005em', textDecoration: 'none' }}>
                {c.email} →
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="af-reveal af-contact-layout" style={{ padding: '40px 48px 80px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60 }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>Or use the form</div>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', margin: '0 0 36px', lineHeight: 1 }}>
            <span style={{ fontStyle: 'italic' }}>Write</span> us.
          </h2>

          {sent ? (
            <div style={{ padding: '32px 0' }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, letterSpacing: '-0.02em' }}>Message sent ✓</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, opacity: .65, marginTop: 12 }}>Your mail client should open with the message pre-filled. We'll reply shortly.</div>
              <button onClick={() => setSent(false)} className="af-outline-link" style={{ marginTop: 24, border: '1px solid #0a0a0a', background: 'transparent', ...monoStyles.mono, fontSize: 11, padding: '12px 20px', color: '#0a0a0a' }}>
                Send another →
              </button>
            </div>
          ) : (
            <form className="af-form" onSubmit={handleSubmit}>
              <div className="af-form-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input name="name" type="text" placeholder="Sam de Vries" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" placeholder="sam@tue.nl" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Department</label>
                  <select name="department" required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select…</option>
                    <option>General</option>
                    <option>Bookings</option>
                    <option>Press</option>
                    <option>Safety</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input name="subject" type="text" placeholder="Lost jacket at intro" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: 36 }}>
                <label style={labelStyle}>Your message</label>
                <textarea name="message" rows={7} placeholder="Hi team…" required
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 160, display: 'block', paddingTop: 10 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36 }}>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>By sending you accept the privacy policy.</div>
                <button type="submit" className="af-submit" style={{ background: '#0a0a0a', color: '#fafafa', padding: '18px 32px', border: 'none', ...monoStyles.mono, fontSize: 11 }}>
                  Send message →
                </button>
              </div>
            </form>
          )}
        </div>

        <aside>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>HQ</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.4 }}>
            <span style={{ fontStyle: 'italic' }}>Ascension Studio</span><br />
            Dommelstraat 14<br />
            5611 CJ Eindhoven<br />
            The Netherlands
          </div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 20 }}>KvK 78xxxxxx · BTW NL00xxxxxxB01</div>

          <div style={{ marginTop: 40 }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>Follow</div>
            {[
              ['Instagram', '@ascensionfestival.nl',   'https://instagram.com/ascensionfestival.nl'],
              ['TikTok',    '@ascensionfestival',        'https://tiktok.com/@ascensionfestival'],
              ['Spotify',   'Ascension Crew Rotations',  '#'],
              ['SoundCloud', '/ascension-eindhoven',     '#'],
            ].map(([k, v, href]) =>
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(10,10,10,.12)' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 14 }}>{k}</span>
                <a href={href} className="af-footer-link" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                  style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, opacity: .65, color: '#0a0a0a', textDecoration: 'none' }}>{v}</a>
              </div>
            )}
          </div>
        </aside>
      </section>

      <MonoFooter />
    </div>
  );
}

Object.assign(window, { TicketsPage, GalleryPage, EventsPage, ContactPage });
