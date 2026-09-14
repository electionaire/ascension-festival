// pages.jsx — Tickets / Gallery / Events / Contact pages

const { MonoNav, MonoFooter, BWPhoto, monoStyles, EVENTS } = window;

const pageRoot = {
  width: '100%', minHeight: '100vh',
  fontFamily: 'Montserrat, sans-serif',
  background: '#fafafa', color: '#0a0a0a',
  position: 'relative',
};

// ── Shared page header ─────────────────────────────────────────────────
function PageHeader({ eyebrow, title, italic, lead, subhead, photo, height = 720, photoPosition = 'center' }) {
  return (
    <section className="af-page-header" style={{ position: 'relative', height }}>
      {photo && <BWPhoto src={photo} caption="" objectPosition={photoPosition} style={{ position: 'absolute', inset: 0 }} />}
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
        subhead={['Powered by Pretix', '3 / 3 shows on sale', 'No third-party resellers — buy direct from us']}
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
  mainact: [
    { src: 'assets/gallery/ma1.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma2.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma3.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ma4.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma5.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma6.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma7.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ma8.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ma9.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ma10.jpg', col: 'span 3', h: 415 },
    { src: 'assets/gallery/ma11.jpg', col: 'span 3', h: 415 },
    { src: 'assets/gallery/ma12.jpg', col: 'span 6', h: 415 },
    { src: 'assets/gallery/ma13.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma14.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma15.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma16.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma17.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma18.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma19.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma20.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma21.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ma22.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ma23.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ma24.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ma25.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma26.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma27.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma28.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma29.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma30.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ma31.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma32.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma33.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ma34.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma35.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma36.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma37.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma38.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma39.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma40.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma41.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma42.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma43.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma44.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma45.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma46.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma47.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma48.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ma49.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma50.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma51.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma52.jpg', col: 'span 6', h: 470 },
    { src: 'assets/gallery/ma53.jpg', col: 'span 3', h: 470 },
    { src: 'assets/gallery/ma54.jpg', col: 'span 3', h: 470 },
    { src: 'assets/gallery/ma55.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma56.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma57.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ma58.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ma59.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ma60.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ma61.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ma62.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma63.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ma64.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma65.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma66.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ma67.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma68.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ma69.jpg', col: 'span 4', h: 340 },
  ],
  openingball: [
    { src: 'assets/gallery/ob1.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob2.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob3.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob4.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob5.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob6.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob7.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob8.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob9.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob10.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob11.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob12.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob13.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob14.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob15.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob16.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob17.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob18.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob19.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob20.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob21.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob22.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob23.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob24.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob25.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob26.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob27.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob28.jpg', col: 'span 12', h: 610 },
    { src: 'assets/gallery/ob29.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob30.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob31.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob32.jpg', col: 'span 6', h: 415 },
    { src: 'assets/gallery/ob33.jpg', col: 'span 3', h: 415 },
    { src: 'assets/gallery/ob34.jpg', col: 'span 3', h: 415 },
    { src: 'assets/gallery/ob35.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob36.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob37.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob38.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob39.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob40.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob41.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob42.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob43.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob44.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob45.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob46.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob47.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob48.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob49.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob50.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob51.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob52.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob53.jpg', col: 'span 12', h: 580 },
    { src: 'assets/gallery/ob54.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob55.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob56.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob57.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob58.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob59.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob60.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob61.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob62.jpg', col: 'span 4', h: 370 },
    { src: 'assets/gallery/ob63.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob64.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob65.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob66.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob67.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob68.jpg', col: 'span 4', h: 315 },
    { src: 'assets/gallery/ob69.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob70.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob71.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob72.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob73.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob74.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob75.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob76.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob77.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob78.jpg', col: 'span 12', h: 555 },
    { src: 'assets/gallery/ob79.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob80.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob81.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob82.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob83.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob84.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob85.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob86.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob87.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob88.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob89.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob90.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob91.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob92.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob93.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob94.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob95.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob96.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob97.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob98.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob99.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob100.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob101.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob102.jpg', col: 'span 4', h: 535 },
    { src: 'assets/gallery/ob103.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob104.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob105.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob106.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob107.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob108.jpg', col: 'span 4', h: 590 },
    { src: 'assets/gallery/ob109.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob110.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob111.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob112.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob113.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob114.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob115.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob116.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob117.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/ob118.jpg', col: 'span 3', h: 470 },
    { src: 'assets/gallery/ob119.jpg', col: 'span 3', h: 470 },
    { src: 'assets/gallery/ob120.jpg', col: 'span 6', h: 470 },
    { src: 'assets/gallery/ob121.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob122.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob123.jpg', col: 'span 4', h: 360 },
    { src: 'assets/gallery/ob124.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob125.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob126.jpg', col: 'span 4', h: 375 },
    { src: 'assets/gallery/ob127.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/ob128.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob129.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/ob130.jpg', col: 'span 12', h: 610 },
    { src: 'assets/gallery/ob131.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob132.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob133.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/ob134.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob135.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob136.jpg', col: 'span 4', h: 335 },
    { src: 'assets/gallery/ob137.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob138.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob139.jpg', col: 'span 4', h: 340 },
    { src: 'assets/gallery/ob140.jpg', col: 'span 5', h: 590 },
    { src: 'assets/gallery/ob141.jpg', col: 'span 7', h: 590 },
  ],
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
  summerfestival: [
    { src: 'assets/gallery/sf1.jpg',  col: 'span 8', h: 600 },
    { src: 'assets/gallery/sf2.jpg',  col: 'span 4', h: 600 },
    { src: 'assets/gallery/sf3.jpg',  col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf4.jpg',  col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf5.jpg',  col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf6.jpg',  col: 'span 5', h: 700 },
    { src: 'assets/gallery/sf7.jpg',  col: 'span 7', h: 700 },
    { src: 'assets/gallery/sf8.jpg',  col: 'span 6', h: 420 },
    { src: 'assets/gallery/sf9.jpg',  col: 'span 6', h: 420 },
    { src: 'assets/gallery/sf10.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf11.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf12.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf13.jpg', col: 'span 5', h: 440 },
    { src: 'assets/gallery/sf14.jpg', col: 'span 4', h: 440 },
    { src: 'assets/gallery/sf15.jpg', col: 'span 3', h: 440 },
    { src: 'assets/gallery/sf16.jpg', col: 'span 4', h: 560 },
    { src: 'assets/gallery/sf17.jpg', col: 'span 8', h: 560 },
    { src: 'assets/gallery/sf18.jpg', col: 'span 3', h: 350 },
    { src: 'assets/gallery/sf19.jpg', col: 'span 5', h: 350 },
    { src: 'assets/gallery/sf20.jpg', col: 'span 4', h: 350 },
    { src: 'assets/gallery/sf21.jpg', col: 'span 6', h: 650 },
    { src: 'assets/gallery/sf22.jpg', col: 'span 6', h: 650 },
    { src: 'assets/gallery/sf23.jpg', col: 'span 8', h: 480 },
    { src: 'assets/gallery/sf24.jpg', col: 'span 4', h: 480 },
    { src: 'assets/gallery/sf25.jpg', col: 'span 3', h: 500 },
    { src: 'assets/gallery/sf26.jpg', col: 'span 5', h: 500 },
    { src: 'assets/gallery/sf27.jpg', col: 'span 4', h: 500 },
    { src: 'assets/gallery/sf28.jpg', col: 'span 4', h: 460 },
    { src: 'assets/gallery/sf29.jpg', col: 'span 5', h: 460 },
    { src: 'assets/gallery/sf30.jpg', col: 'span 3', h: 460 },
    { src: 'assets/gallery/sf31.jpg', col: 'span 5', h: 600 },
    { src: 'assets/gallery/sf32.jpg', col: 'span 7', h: 600 },
    { src: 'assets/gallery/sf33.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/sf34.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/sf35.jpg', col: 'span 4', h: 400 },
    { src: 'assets/gallery/sf36.jpg', col: 'span 7', h: 680 },
    { src: 'assets/gallery/sf37.jpg', col: 'span 5', h: 680 },
    { src: 'assets/gallery/sf38.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/sf39.jpg', col: 'span 6', h: 440 },
    { src: 'assets/gallery/sf40.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf41.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf42.jpg', col: 'span 4', h: 520 },
    { src: 'assets/gallery/sf43.jpg', col: 'span 3', h: 460 },
    { src: 'assets/gallery/sf44.jpg', col: 'span 5', h: 460 },
    { src: 'assets/gallery/sf45.jpg', col: 'span 4', h: 460 },
    { src: 'assets/gallery/sf47.jpg', col: 'span 12', h: 580 },
    { src: 'assets/gallery/sf48.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf49.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf50.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf51.jpg', col: 'span 5', h: 700 },
    { src: 'assets/gallery/sf52.jpg', col: 'span 7', h: 700 },
    { src: 'assets/gallery/sf53.jpg', col: 'span 6', h: 430 },
    { src: 'assets/gallery/sf54.jpg', col: 'span 6', h: 430 },
    { src: 'assets/gallery/sf55.jpg', col: 'span 4', h: 510 },
    { src: 'assets/gallery/sf56.jpg', col: 'span 4', h: 510 },
    { src: 'assets/gallery/sf57.jpg', col: 'span 4', h: 510 },
    { src: 'assets/gallery/sf58.jpg', col: 'span 5', h: 450 },
    { src: 'assets/gallery/sf59.jpg', col: 'span 4', h: 450 },
    { src: 'assets/gallery/sf60.jpg', col: 'span 3', h: 450 },
    { src: 'assets/gallery/sf61.jpg', col: 'span 7', h: 560 },
    { src: 'assets/gallery/sf62.jpg', col: 'span 5', h: 560 },
    { src: 'assets/gallery/sf63.jpg', col: 'span 3', h: 380 },
    { src: 'assets/gallery/sf64.jpg', col: 'span 5', h: 380 },
    { src: 'assets/gallery/sf65.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf66.jpg', col: 'span 6', h: 640 },
    { src: 'assets/gallery/sf67.jpg', col: 'span 6', h: 640 },
    { src: 'assets/gallery/sf68.jpg', col: 'span 8', h: 480 },
    { src: 'assets/gallery/sf69.jpg', col: 'span 4', h: 480 },
    { src: 'assets/gallery/sf70.jpg', col: 'span 4', h: 500 },
    { src: 'assets/gallery/sf71.jpg', col: 'span 4', h: 500 },
    { src: 'assets/gallery/sf72.jpg', col: 'span 4', h: 500 },
    { src: 'assets/gallery/sf73.jpg', col: 'span 4', h: 460 },
    { src: 'assets/gallery/sf74.jpg', col: 'span 5', h: 460 },
    { src: 'assets/gallery/sf75.jpg', col: 'span 3', h: 460 },
    { src: 'assets/gallery/sf76.jpg', col: 'span 8', h: 600 },
    { src: 'assets/gallery/sf77.jpg', col: 'span 4', h: 600 },
    { src: 'assets/gallery/sf78.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf79.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf80.jpg', col: 'span 4', h: 380 },
    { src: 'assets/gallery/sf81.jpg', col: 'span 12', h: 520 },
  ],
};

const ALBUMS = [
  { id: 'mainact', name: 'Ascension International Student Intro: Main Act ft. DJ359', date: 'Sep 11 · 2026', src: 'assets/gallery/ma49.jpg' },
  { id: 'openingball', name: 'Ascension International Student Intro: Main Act ft. Miguelito', date: 'Sep 4 · 2026', src: 'assets/gallery/ob62.jpg' },
  { id: 'summerfestival', name: 'Ascension: Summer Festival', date: 'Jun 5 · 2026', src: 'assets/gallery/sf1.jpg' },
  { id: 'turbulence', name: 'Ascension: Turbulence', date: 'Apr 24 · 2026', src: 'assets/gallery/g40.jpg' },
  { id: 'ascension',  name: 'Ascension',             date: 'Nov 15 · 2025', src: 'assets/gallery/g29.jpg' },
];

function GalleryPage() {
  const [activeId, setActiveId] = React.useState('mainact');
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
        photo="assets/gallery/sf73.jpg"
        photoPosition="center 70%" />

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
        subhead={['Updated 07.06.2026', '3 / 3 shows on sale', 'Doors at 23:30 unless noted']}
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


// ── LEGAL & PRIVACY ────────────────────────────────────────────────────
const LEGAL_UPDATED = '14 September 2026';

const LEGAL_SECTIONS = [
  {
    num: '01', title: 'Who we are',
    body: [
      'This website and the events presented on it are operated by MITRA VARUNA OÜ, a private limited company registered in Estonia, trading as Ascension ("Ascension", "we", "us", "our").',
    ],
    details: [
      ['Company', 'MITRA VARUNA OÜ'],
      ['Registry code', '14566053'],
      ['Registered address', 'Harju maakond, Tallinn, Kristiine linnaosa, Tulika tn 19, 10613, Estonia'],
      ['VAT identification number', 'EE102132944'],
      ['Email', 'info@ascensionfestival.nl'],
    ],
  },
  {
    num: '02', title: 'Tickets and refunds',
    body: [
      'All ticket sales are final. Tickets are non-refundable. Once a ticket has been purchased, we do not refund it if you change your mind, if you are unable to attend, or if you are refused entry or removed from an event under the conditions set out below.',
      'Tickets are transferable. If you cannot make it, you may pass your ticket to someone else through your confirmation email, free of charge.',
      'Because our tickets are for leisure events supplied on a specific date, the 14-day right of withdrawal for distance purchases does not apply, in line with Article 16(l) of EU Directive 2011/83/EU on consumer rights.',
      'If we cancel an event entirely and do not reschedule it, we will refund the face value of your ticket. Booking and service fees charged by our ticketing partner may be non-refundable. If an event is rescheduled or moved to another venue, your ticket remains valid for the new date or location and no refund is due.',
      'Line-ups, timetables and supporting acts are subject to change. A change to the line-up is not grounds for a refund.',
      'Entry requires a valid ticket and, where applicable, valid photo identification and compliance with the minimum age for the event. Entry is also subject to the house rules of the venue. We and the venue may refuse entry to, or remove, anyone who breaches those rules, and no refund is due in that case.',
    ],
  },
  {
    num: '03', title: 'Buying tickets',
    body: [
      'Ticket sales are handled by our ticketing partner on a separate platform, not on this website. We do not receive or store your payment card details. When you buy a ticket, the ticketing partner processes your data as described in their own terms and privacy notice, and we receive the attendee information we need to run the event.',
    ],
  },
  {
    num: '04', title: 'What data we collect on this site',
    body: [
      'This website has no accounts, no checkout and no contact form. We collect only the following:',
    ],
    list: [
      ['Analytics data', 'We use Google Analytics to understand how the site is used — pages viewed, links and buttons clicked, approximate location derived from your IP address, and basic device and browser information. This is pseudonymised and we do not use it to identify you personally.'],
      ['Correspondence', 'If you email us, we receive your email address and whatever you choose to put in your message, and we keep that correspondence so we can deal with your request.'],
    ],
  },
  {
    num: '05', title: 'Why we process it, and on what basis',
    body: [
      'We rely on our legitimate interest in operating, securing and improving this website and our events (Article 6(1)(f) GDPR), and on your consent where consent is required for analytics cookies (Article 6(1)(a) GDPR). Where you buy a ticket, we process data to perform our contract with you (Article 6(1)(b) GDPR), and we keep accounting records to meet our legal obligations (Article 6(1)(c) GDPR).',
    ],
  },
  {
    num: '06', title: 'Cookies and analytics',
    body: [
      'Google Analytics sets cookies in your browser to measure usage of this site. You can refuse or delete these cookies in your browser settings at any time, or install the Google Analytics opt-out browser add-on. Blocking them does not affect your ability to use the site.',
      'Data collected through Google Analytics is processed by Google, which may involve transfers outside the European Economic Area under the safeguards Google applies as a processor.',
    ],
  },
  {
    num: '07', title: 'Photography and filming at events',
    body: [
      'We take photographs and video at our events and publish them on this website and on our social channels, to document and promote the events. We do this on the basis of our legitimate interest in promoting Ascension.',
      'If you appear in a photograph or video and would rather not, email us at info@ascensionfestival.nl with a description of the image and where you saw it, and we will remove it from the channels we control.',
    ],
  },
  {
    num: '08', title: 'Who we share data with, and for how long',
    body: [
      'We share personal data only with our analytics provider, our ticketing partner, the venues hosting an event where that is necessary for entry or safety, and public authorities where we are legally required to do so. We do not sell personal data.',
      'Analytics data is retained for up to 14 months. Email correspondence is kept for as long as needed to handle your request and a reasonable period afterwards. Accounting records are kept for seven years, as required by Estonian law.',
    ],
  },
  {
    num: '09', title: 'Your rights',
    body: [
      'Under the GDPR you have the right to access your personal data, to have it corrected or erased, to restrict or object to its processing, to receive it in a portable form, and to withdraw consent at any time where processing is based on consent. To exercise any of these, email info@ascensionfestival.nl.',
      'If you believe we have handled your data improperly, you may lodge a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, aki.ee) or with the supervisory authority in your country of residence.',
    ],
  },
  {
    num: '10', title: 'Content and changes to this notice',
    body: [
      'The content of this website, including text, artwork, photography and the Ascension name and logo, belongs to MITRA VARUNA OÜ or to the photographers and designers who created it, and may not be reproduced without permission.',
      'We may update this notice as our events and this website change. The date of the current version is shown at the foot of this page.',
    ],
  },
];

function LegalPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 05 — Legal"
        title="Legal &"
        italic="privacy."
        lead="Company details, ticket terms and how we handle your data."
        photo="assets/gallery/ma57.jpg"
        photoPosition="center 45%" />

      <section className="af-reveal" style={{ padding: '80px 48px 100px' }}>
        <div className="af-legal-body" style={{ maxWidth: 760 }}>
          {LEGAL_SECTIONS.map((s) => (
            <div key={s.num} className="af-legal-section" style={{ borderTop: '1px solid rgba(10,10,10,.15)', padding: '38px 0 0', marginBottom: 38 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
                <span style={{ ...monoStyles.mono, opacity: .45, fontSize: 10 }}>{s.num}</span>
                <h2 style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 26, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{s.title}</h2>
              </div>
              <div style={{ marginTop: 18 }}>
                {s.body.map((p, i) => (
                  <p key={i} style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.7, opacity: .8, margin: '0 0 16px' }}>{p}</p>
                ))}

                {s.details && (
                  <dl style={{ margin: '4px 0 0', display: 'grid', gridTemplateColumns: 'minmax(150px, 220px) 1fr', gap: '12px 24px' }} className="af-legal-details">
                    {s.details.map(([k, v]) => (
                      <React.Fragment key={k}>
                        <dt style={{ ...monoStyles.mono, opacity: .5, fontSize: 10, paddingTop: 2 }}>{k}</dt>
                        <dd style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.6 }}>
                          {k === 'Email'
                            ? <a href={`mailto:${v}`} className="af-footer-link" onClick={() => track('Legal – Email', 'contact')} style={{ color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid rgba(10,10,10,.35)' }}>{v}</a>
                            : v}
                        </dd>
                      </React.Fragment>
                    ))}
                  </dl>
                )}

                {s.list && s.list.map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 16 }}>
                    <div style={{ ...monoStyles.mono, opacity: .5, fontSize: 10, marginBottom: 6 }}>{k}</div>
                    <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.7, opacity: .8, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #0a0a0a', paddingTop: 18, ...monoStyles.mono, opacity: .5, fontSize: 10 }}>
            Last updated: {LEGAL_UPDATED}
          </div>
        </div>
      </section>

      <MonoFooter />
    </div>
  );
}

Object.assign(window, { TicketsPage, GalleryPage, EventsPage, ContactPage, LegalPage });
