// mono.jsx — Homepage (desktop + mobile) and shared layout components.

const { useState, useEffect } = React;

const monoStyles = {
  root: {
    width: '100%', fontFamily: 'Montserrat, sans-serif',
    background: '#fafafa', color: '#0a0a0a',
    position: 'relative',
  },
  mono: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }
};

// ── Grayscale photo / video block ─────────────────────────────────────
function BWPhoto({ caption = '', children, style = {}, tone = 'crowd', src, video, kenBurns = false }) {
  const palettes = {
    crowd:    'linear-gradient(180deg, rgba(255,255,255,.0) 0%, rgba(255,255,255,.08) 35%, rgba(0,0,0,.55) 80%, #000 100%), radial-gradient(80% 60% at 50% 78%, #2a2a2a 0%, #0d0d0d 70%, #000 100%)',
    portrait: 'linear-gradient(160deg, rgba(255,255,255,.10), rgba(0,0,0,.6)), radial-gradient(70% 55% at 40% 35%, #353535 0%, #111 70%, #000 100%)',
    floor:    'linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(0,0,0,.5) 60%, #000 100%), radial-gradient(60% 40% at 50% 60%, #303030 0%, #0a0a0a 70%, #000 100%)',
    smoke:    'linear-gradient(140deg, rgba(255,255,255,.16), rgba(0,0,0,.7)), radial-gradient(60% 50% at 70% 30%, #404040 0%, #1a1a1a 50%, #000 100%)',
    light:    'linear-gradient(160deg, rgba(255,255,255,.22), rgba(0,0,0,.55)), radial-gradient(50% 40% at 25% 30%, #5a5a5a 0%, #1e1e1e 60%, #050505 100%)',
    venue:    'linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.55)), radial-gradient(80% 60% at 50% 20%, #4a4a4a 0%, #181818 60%, #000 100%)',
    flag:     'linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.6)), radial-gradient(80% 60% at 50% 40%, #2e2e2e 0%, #0d0d0d 70%, #000 100%)',
  };
  return (
    <div data-cap={caption} style={{
      position: 'relative',
      backgroundImage: (palettes[tone] || palettes.crowd) + ', repeating-linear-gradient(45deg, rgba(255,255,255,.02) 0 8px, rgba(0,0,0,.04) 8px 16px)',
      color: 'rgba(255,255,255,.4)',
      fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
      overflow: 'hidden', filter: 'contrast(1.05)',
      ...style
    }}>
      <style>{`@keyframes kb { from { transform: scale(1.0) translate(0,0) } to { transform: scale(1.18) translate(-2%, -1%) } }`}</style>
      {src && <img src={src} alt={caption} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: kenBurns ? 'kb 14s ease-in-out infinite alternate' : 'none' }} />}
      {video && <video src={video} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      {!src && !video && kenBurns && <div aria-hidden style={{ position: 'absolute', inset: 0, animation: 'kb 14s ease-in-out infinite alternate', backgroundImage: palettes[tone] || palettes.crowd, backgroundSize: 'cover' }} />}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: .4, backgroundImage: 'radial-gradient(rgba(255,255,255,.2) 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
      {caption && <div style={{ position: 'absolute', left: 12, bottom: 10, color: 'rgba(255,255,255,.55)', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' }}>{caption}</div>}
      {children}
    </div>
  );
}

// ── Nav (desktop + mobile-responsive) ─────────────────────────────────
function MonoNav({ inverted = false }) {
  const [open, setOpen] = useState(false);
  const ink  = inverted ? '#fafafa' : '#0a0a0a';
  const link = { color: ink, textDecoration: 'none', fontSize: 11, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase' };
  const logo = inverted ? 'assets/logo-white.png' : 'assets/logo-black.png';
  const NAV = [['Home','index.html'],['Events','events.html'],['Gallery','gallery.html'],['Contact','contact.html']];

  return (
    <>
      {/* Full-screen overlay — always in DOM, toggled via opacity */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 9998, background: '#080808',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
        padding: '0 36px',
        opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease', color: '#fafafa',
      }}>
        {NAV.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}
            style={{ display: 'block', color: '#fafafa', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', lineHeight: 1.15, padding: '10px 0', WebkitTapHighlightColor: 'transparent' }}>
            {label}
          </a>
        ))}
        <a href="https://tickets.ascensionfestival.nl/" target="_blank" rel="noopener"
          style={{ display: 'inline-block', marginTop: 48, color: '#fafafa', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.6)', padding: '14px 28px', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', WebkitTapHighlightColor: 'transparent' }}>
          Tickets →
        </a>
      </div>

      {/* Bar — position:absolute on desktop, overridden to fixed on mobile via CSS */}
      <div className="af-nav-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999, padding: '24px 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', color: ink }}>
        <div>
          <a href="index.html" className="af-logo-link">
            <img src={logo} className="af-nav-logo" alt="Ascension" style={{ height: 38, display: 'block' }} />
          </a>
        </div>
        {/* Desktop links */}
        <div className="af-nav-links" style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
          {NAV.map(([label, href]) => (
            <a key={label} href={href} className="af-nav-link" style={link}>{label}</a>
          ))}
        </div>
        <div className="af-nav-tickets" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <a href="https://tickets.ascensionfestival.nl/" target="_blank" rel="noopener" className="af-nav-link" style={{ ...link, borderBottom: `1px solid ${ink}`, paddingBottom: 2 }}>Tickets →</a>
        </div>
        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button className="af-nav-ham" onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Menu'}
          style={{ display: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: 44, height: 44, alignItems: 'center', justifyContent: 'center', justifySelf: 'end', WebkitTapHighlightColor: 'transparent' }}>
          {open
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fafafa" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="3" x2="17" y2="17"/><line x1="17" y1="3" x2="3" y2="17"/></svg>
            : <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"><line x1="0" y1="1" x2="22" y2="1"/><line x1="0" y1="8" x2="22" y2="8"/><line x1="0" y1="15" x2="22" y2="15"/></svg>
          }
        </button>
      </div>
    </>
  );
}

// ── Desktop hero (fullscreen) ──────────────────────────────────────────
function MonoHero() {
  const { days, hours, mins, secs } = useCountdown('2026-06-05T22:00:00+02:00');
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <section id="home" className="af-hero" style={{ position: 'relative' }}>
      <BWPhoto tone="crowd" caption="" src="assets/photo-01.jpg" video="assets/hero.mp4" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '15%', bottom: '22%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 60px', textAlign: 'center' }}>
        <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: 820, maxWidth: '90%', display: 'block', opacity: .85, filter: 'brightness(0) invert(1)' }} />
        <div style={{ ...monoStyles.mono, marginTop: 26, fontSize: 12, color: '#fafafa', opacity: .9, letterSpacing: '.28em' }}>
          A warm welcome to Eindhoven's International Student Experience
        </div>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ ...monoStyles.mono, color: '#fafafa', opacity: .5, fontSize: 9 }}>In collaboration with</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
            <img src="assets/IntStuExp (1).png" alt="International Student Experience NL" style={{ height: 24, opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="assets/Effenaar-1024x235 (1).webp" alt="Effenaar" style={{ height: 16, opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="assets/Vibes_logo_2022_Event_RGB_Vibes_logo_Badge_Wit.png" alt="Vibes Eindhoven" style={{ height: 30, opacity: .8 }} />
            <img src="assets/elctnr_creative_studio.png" alt="ELCNTR Creative Studio" style={{ height: 26, opacity: .8, filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 48, right: 48, bottom: 48, color: '#fafafa', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 48, alignItems: 'flex-end', borderTop: '1px solid rgba(250,250,250,.3)', paddingTop: 32 }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 10 }}>Next show · Fri 05 Jun 2026 · 22:00</div>
          <div style={{ fontFamily: 'Montserrat', fontStyle: 'italic', fontWeight: 300, fontSize: 30, marginTop: 8, letterSpacing: '-0.015em' }}>Summer Festival</div>
          <div style={{ ...monoStyles.mono, opacity: .6, fontSize: 10, marginTop: 5 }}>Effenaar Main Stage</div>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'baseline' }}>
          {[['D', pad(days)], ['H', pad(hours)], ['M', pad(mins)], ['S', pad(secs)]].map(([l, v]) =>
            <div key={l} style={{ textAlign: 'center', minWidth: 56 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 9 }}>{l}</div>
            </div>
          )}
        </div>
        <a href="https://tickets.ascensionfestival.nl/summerfestival" target="_blank" rel="noopener" className="af-cta-light" style={{ background: '#fafafa', color: '#0a0a0a', padding: '18px 28px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, whiteSpace: 'nowrap', display: 'inline-block' }}>
          Buy tickets →
        </a>
      </div>
    </section>
  );
}

// ── Desktop upcoming events ────────────────────────────────────────────
function MonoEvents() {
  return (
    <section id="events" className="af-reveal" style={{ padding: '120px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 56, letterSpacing: '-0.025em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Upcoming</span> shows
        </h2>
        <span style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Summer 2026 · 1 festival + 1 series</span>
      </div>
      <div>
        {EVENTS.map((ev, i) => {
          const isLast = i === EVENTS.length - 1;
          const baseRow = { display: 'grid', alignItems: 'center', padding: '28px 0', borderTop: '1px solid #0a0a0a', ...(isLast ? { borderBottom: '1px solid #0a0a0a' } : {}) };
          if (ev.isSeries) {
            return (
              <div key={ev.id} className="af-event-row" style={{ ...baseRow, gridTemplateColumns: '120px 1fr 1.2fr 140px', gap: 28 }}>
                <img src={ev.poster} alt={ev.title} style={{ width: 120, height: 120, objectFit: 'cover', display: 'block' }} />
                <div>
                  <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{ev.tag}</div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.005em', marginTop: 8 }}>{ev.title}</div>
                  <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 8, fontSize: 10 }}>{ev.venue} · 18+ · ID required</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {ev.series.map((s, j) => (
                    <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14, alignItems: 'baseline', paddingBottom: j < ev.series.length - 1 ? 8 : 0, borderBottom: j < ev.series.length - 1 ? '1px dashed rgba(10,10,10,.18)' : 'none' }}>
                      <div>
                        <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 24, lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{s.day}</div>
                        <div style={{ ...monoStyles.mono, opacity: .6, fontSize: 9, marginTop: 2 }}>{s.month}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 14, letterSpacing: '-0.005em' }}>{s.subtitle}</div>
                        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 2 }}>{s.dow} · {s.venue}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <a href="#tickets" className="af-link" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11, textDecoration: 'none' }}>Buy series →</a>
                </div>
              </div>
            );
          }
          return (
            <div key={ev.id} className="af-event-row" style={{ ...baseRow, gridTemplateColumns: '120px 100px 1.5fr 1fr 140px', gap: 24 }}>
              <img src={ev.poster} alt={ev.title} style={{ width: 120, height: 120, objectFit: 'cover', display: 'block' }} />
              <div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em' }}>{ev.date.day}</div>
                <div style={{ ...monoStyles.mono, opacity: .7, marginTop: 4, fontSize: 10 }}>{ev.date.month} · {ev.date.dow}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.005em' }}>
                  {ev.headline && <span style={{ fontStyle: 'italic', fontWeight: 300 }}>★ </span>}
                  {ev.title}
                </div>
                <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 8, fontSize: 10 }}>{ev.tag} · 18+</div>
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14 }}>
                <div>{ev.venue}</div>
                <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 6, fontSize: 10 }}>{ev.doors}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <a href="#tickets" className="af-link" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11, textDecoration: 'none' }}>Buy ticket →</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Desktop gallery strip ──────────────────────────────────────────────
function MonoGalleryStrip() {
  const items = [
    { src: 'assets/photo-13.jpg' },
    { src: 'assets/photo-10.jpg' },
    { src: 'assets/photo-11.jpg' },
    { src: 'assets/photo-9.jpg' },
    { src: 'assets/photo-12.jpg' },
    { src: 'assets/photo-08.jpg' },
  ];
  return (
    <section id="gallery" className="af-reveal" style={{ padding: '40px 48px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Gallery</span>
        </h2>
        <a href="gallery.html" className="af-link" style={{ color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11 }}>Full archive →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {items.map((it, i) =>
          <div key={i} className="af-photo-item" style={{ position: 'relative' }}>
            <BWPhoto src={it.src} caption="" kenBurns={it.isVideo} style={{ aspectRatio: '3 / 4' }} />
            {it.isVideo &&
              <div style={{ position: 'absolute', top: 10, right: 10, color: '#fafafa', ...monoStyles.mono, fontSize: 8, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,.5)', padding: '4px 7px', pointerEvents: 'none' }}>
                <span style={{ width: 0, height: 0, borderLeft: '6px solid #fafafa', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                Video
              </div>
            }
          </div>
        )}
      </div>
    </section>
  );
}

// ── Shared footer ──────────────────────────────────────────────────────
function MonoFooter() {
  return (
    <footer id="contact" className="af-reveal" style={{ background: '#fafafa', borderTop: '1px solid #0a0a0a', padding: '48px 48px 28px' }}>
      <div className="af-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32, alignItems: 'flex-start' }}>
        <div>
          <a href="index.html" className="af-logo-link"><img src="assets/logo-black.png" alt="Ascension" style={{ height: 28, display: 'block' }} /></a>
          <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 10, marginTop: 16 }}>EINDHOVEN, SINCE 2025</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, lineHeight: 1.6, opacity: .65, marginTop: 10, maxWidth: 320 }}>
            A warm welcome to Eindhoven's International Student Experience. Run by students, for students.
          </div>
        </div>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Follow</div>
          {[['Instagram', 'https://instagram.com/ascensionfestival.nl'], ['TikTok', 'https://tiktok.com/@ascensionfestival'], ['Spotify', '#']].map(([label, href]) =>
            <div key={label} style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}>
              <a href={href} className="af-footer-link" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ color: '#0a0a0a', textDecoration: 'none' }}>{label}</a>
            </div>
          )}
        </div>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Contact</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}>
            <a href="mailto:info@ascensionfestival.nl" className="af-footer-link" style={{ color: '#0a0a0a', textDecoration: 'none' }}>info@ascensionfestival.nl</a>
          </div>
          <a href="contact.html" className="af-footer-link" style={{ display: 'inline-block', marginTop: 8, ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', textDecoration: 'none' }}>Send a message →</a>
        </div>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Mailing list</div>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', borderBottom: '1px solid #0a0a0a', paddingBottom: 10 }}>
            <input type="email" placeholder="your@university.nl" required style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, color: '#0a0a0a', outline: 'none' }} />
            <button type="submit" className="af-footer-link" style={{ border: 'none', background: 'transparent', cursor: 'pointer', ...monoStyles.mono, fontSize: 11, color: '#0a0a0a', padding: 0 }}>Sign up →</button>
          </form>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(10,10,10,.15)', marginTop: 36, paddingTop: 18, display: 'flex', justifyContent: 'space-between', ...monoStyles.mono, opacity: .5, fontSize: 9 }}>
        <span>© 2026 Ascension Festival NL</span>
        <span>Made in Eindhoven</span>
      </div>
    </footer>
  );
}

// ── International Student Intro section — desktop ──────────────────────
function MonoIntroSection() {
  return (
    <section className="af-reveal" style={{ padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
      <img src="assets/palm-left.png"  aria-hidden alt="" style={{ position: 'absolute', left: -40, top: 0, height: '110%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 0 }} />
      <img src="assets/palm-right.png" aria-hidden alt="" style={{ position: 'absolute', right: -40, top: 0, height: '110%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, textShadow: '0 1px 10px rgba(0,0,0,0.35)' }}>
        {/* headline + body */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
          <div style={{ flex: '0 0 auto', maxWidth: 640 }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 16 }}>§ — International Student Intro · Eindhoven 2026</div>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 68, lineHeight: 0.96, letterSpacing: '-0.033em', margin: 0 }}>
              Eindhoven's International<br />
              <span style={{ fontStyle: 'italic' }}>Student Intro</span><br />
              Event Series.
            </h2>
          </div>
          <div style={{ paddingTop: 8, maxWidth: 360 }}>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.65, margin: '0 0 10px' }}>
              Eindhoven's International Student Intro Event Series, a warm welcome to the city's International Student Experience.
            </p>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.65, margin: '0 0 24px' }}>
              All events have been carefully curated to fit into the first-year TU/e students' timetable, with the first two events on Fridays of the first two weeks of the start of the quarter, and the final closing festival on the Friday right after the Calculus Midterm.
            </p>
            <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" className="af-cta-dark" style={{ display: 'inline-block', background: 'transparent', color: '#fafafa', border: '1px solid rgba(255,255,255,.7)', padding: '13px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
              Get tickets →
            </a>
          </div>
        </div>

        {/* photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, height: 340 }}>
          <BWPhoto src="assets/photo-10.jpg" style={{ height: '100%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BWPhoto src="assets/photo-9.jpg" style={{ flex: 1 }} />
            <BWPhoto src="assets/photo-12.jpg" style={{ flex: 1 }} />
          </div>
          <BWPhoto src="assets/photo-11.jpg" style={{ height: '100%' }} />
        </div>

        {/* show facts strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.25)' }}>
          {[
            ['04 SEP', 'The Opening Ball',   'Effenaar Main Stage · 1,200 cap', '23:50 – 04:00'],
            ['11 SEP', 'Main Act',          'Effenaar Main Stage · 1,200 cap',  '23:30 – 04:00'],
            ['02 OCT', 'Closing Festival',  'Vibes Eindhoven · 3,000 cap',      '23:30 – 04:00'],
            ['18+',    'Eindhoven, NL',     'ID required at the door',          ''],
          ].map(([date, title, sub, time]) => (
            <div key={date}>
              <div style={{ ...monoStyles.mono, fontSize: 9 }}>{date}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 18, letterSpacing: '-0.005em', marginTop: 8 }}>{title}</div>
              <div style={{ ...monoStyles.mono, fontSize: 9, marginTop: 8 }}>{sub}</div>
              {time && <div style={{ ...monoStyles.mono, fontSize: 9, marginTop: 4 }}>{time}</div>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── International Student Intro section — mobile ────────────────────────
function MobileIntroSection() {
  return (
    <section className="af-reveal" style={{ padding: '60px 22px', position: 'relative', overflow: 'hidden' }}>
      <img src="assets/palm-left.png"  aria-hidden alt="" style={{ position: 'absolute', left: -30, top: 0, height: '60%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 0 }} />
      <img src="assets/palm-right.png" aria-hidden alt="" style={{ position: 'absolute', right: -30, top: 0, height: '60%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.8, mixBlendMode: 'multiply', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginBottom: 18 }}>International Student Intro · Eindhoven 2026</div>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.027em', margin: '0 0 22px' }}>
          Eindhoven's International<br /><span style={{ fontStyle: 'italic' }}>Student Intro</span><br />Event Series.
        </h2>
        <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 15, lineHeight: 1.7, margin: '0 0 28px' }}>
          Eindhoven's International Student Intro Event Series, a warm welcome to the city's International Student Experience. All events have been carefully curated to fit into the first-year TU/e students' timetable, with the first two events on Fridays of the first two weeks of the start of the quarter, and the final closing festival on the Friday right after the Calculus Midterm.
        </p>
        <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" className="af-cta-dark" style={{ display: 'block', textAlign: 'center', background: 'transparent', color: '#fafafa', border: '1px solid rgba(255,255,255,.7)', padding: '16px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, marginBottom: 36 }}>
          Get tickets →
        </a>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 32 }}>
          <BWPhoto src="assets/photo-10.jpg" style={{ aspectRatio: '3/4' }} />
          <BWPhoto src="assets/photo-12.jpg" style={{ aspectRatio: '3/4' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.25)' }}>
          {[
            ['04 SEP', 'The Opening Ball', 'Effenaar',  '23:50 – 04:00'],
            ['11 SEP', 'Main Act',         'Effenaar',  '23:30 – 04:00'],
            ['02 OCT', 'Closing',          'Vibes EHV', '23:30 – 04:00'],
          ].map(([d, t, v, time]) => (
            <div key={d}>
              <div style={{ ...monoStyles.mono, fontSize: 8 }}>{d}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 14, letterSpacing: '-0.005em', marginTop: 6 }}>{t}</div>
              <div style={{ ...monoStyles.mono, fontSize: 8, marginTop: 5 }}>{v}</div>
              <div style={{ ...monoStyles.mono, fontSize: 8, marginTop: 3 }}>{time}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Event details section — desktop ───────────────────────────────────
const EVENT_DETAILS = [
  {
    num: '01', date: '04 SEP', dow: 'FRI', title: 'Ascension: The Opening Ball',
    venue: 'Effenaar Main Stage', capacity: '1,200 cap', time: '23:50 – 04:00',
    desc: 'An iconic start to the Intro Series. Step onto Effenaar\'s main stage for a night of DJ sets, live energy, and 1,200 international students all sharing the same first-week feeling. Dress up, show up, and make your first Eindhoven memory one to keep.',
    link: 'https://tickets.ascensionfestival.nl/intro/',
    photo: 'assets/photo-13.jpg',
    venueLogo: 'assets/Effenaar-1024x235 (1).webp',
  },
  {
    num: '02', date: '11 SEP', dow: 'FRI', title: 'Ascension: Main Act',
    venue: 'Effenaar Main Stage', capacity: '1,200 cap', time: '23:30 – 04:00',
    desc: 'Seven days in, the Intro Series returns with a headline act taking the Effenaar stage. Leave the week behind, step into a night built around the music, and close out your first full university week the right way.',
    link: 'https://tickets.ascensionfestival.nl/intro/',
    photo: 'assets/photo-03.jpg',
    venueLogo: 'assets/Effenaar-1024x235 (1).webp',
  },
  {
    num: '03', date: '02 OCT', dow: 'FRI', title: 'Ascension: New Dawn Closing Festival',
    venue: 'Vibes Eindhoven', capacity: '3,000 cap', time: '23:30 – 04:00',
    desc: 'The grand finale. On the Friday right after the Calculus Midterm, 3,000 students take over Vibes Eindhoven for the biggest night of the Intro Series. Celebrate your first month, your new crew, and the start of something much bigger.',
    link: 'https://tickets.ascensionfestival.nl/intro/',
    photo: 'assets/photo-11.jpg',
    venueLogo: 'assets/Vibes_logo_2022_Event_RGB_Vibes_logo_Badge_Wit.png',
  },
];

function MonoEventDetailsSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Palms */}
      <img src="assets/palm-left.png"  aria-hidden alt="" style={{ position: 'absolute', left: -40, bottom: 0, height: '70%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.75, mixBlendMode: 'multiply', zIndex: 0 }} />
      <img src="assets/palm-right.png" aria-hidden alt="" style={{ position: 'absolute', right: -40, bottom: 0, height: '70%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.75, mixBlendMode: 'multiply', zIndex: 0 }} />
      {/* Eindhoven city at the bottom */}
      <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32%', zIndex: 0 }}>
        <img src="assets/eindhoven-city.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', opacity: 0.72 }} />
      </div>
      {/* Dark gradient — full section scrim for readability */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 48px 80px', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
        <div style={{ ...monoStyles.mono, opacity: .6, fontSize: 10, marginBottom: 56 }}>§ — Event Breakdown · 3 nights</div>
        {EVENT_DETAILS.map((ev, i) => (
          <div key={ev.num} className="af-reveal" style={{ display: 'grid', gridTemplateColumns: '96px 1fr 300px', gap: 48, padding: '48px 0', borderTop: '1px solid rgba(255,255,255,.22)', alignItems: 'center', transitionDelay: `${i * 0.18}s` }}>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 72, lineHeight: 1, letterSpacing: '-0.04em' }}>{ev.num}</div>
              <div style={{ ...monoStyles.mono, fontSize: 10, marginTop: 10 }}>{ev.date}</div>
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .6, marginTop: 3 }}>{ev.dow} · {ev.time}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 52, lineHeight: 1.0, letterSpacing: '-0.028em', marginBottom: 16 }}>{ev.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
                <div style={{ ...monoStyles.mono, fontSize: 10, opacity: .75 }}>{ev.venue} · {ev.capacity}</div>
                <img src={ev.venueLogo} alt={ev.venue} style={{ height: ev.venueLogo.includes('Vibes') ? 26 : 14, opacity: .75, filter: 'brightness(0) invert(1)', flexShrink: 0 }} />
              </div>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 16, lineHeight: 1.75, margin: 0, maxWidth: 480 }}>{ev.desc}</p>
            </div>
            <BWPhoto src={ev.photo} style={{ height: 220, borderRadius: 2 }} />
          </div>
        ))}
        {/* Tickets CTA */}
        <div className="af-reveal" style={{ paddingTop: 48, borderTop: '1px solid rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transitionDelay: `${EVENT_DETAILS.length * 0.18}s` }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, letterSpacing: '-0.02em' }}>
            All 3 nights · <span style={{ fontStyle: 'italic' }}>get your tickets now</span>
          </div>
          <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#fafafa', border: '1px solid rgba(255,255,255,.55)', padding: '14px 28px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, backdropFilter: 'blur(6px)', whiteSpace: 'nowrap' }}>
            Buy tickets →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Event details section — mobile ─────────────────────────────────────
function MobileEventDetailsSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Palms anchored to bottom */}
      <img src="assets/palm-left.png"  aria-hidden alt="" style={{ position: 'absolute', left: -20, bottom: 0, height: '40%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.7, mixBlendMode: 'multiply', zIndex: 0 }} />
      <img src="assets/palm-right.png" aria-hidden alt="" style={{ position: 'absolute', right: -20, bottom: 0, height: '40%', width: 'auto', pointerEvents: 'none', userSelect: 'none', opacity: 0.7, mixBlendMode: 'multiply', zIndex: 0 }} />
      {/* Dark gradient — full section scrim for readability */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
      {/* Content — always above city */}
      <div style={{ position: 'relative', zIndex: 1, padding: '60px 22px 40px', textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}>
        <div style={{ ...monoStyles.mono, opacity: .6, fontSize: 9, marginBottom: 36 }}>§ — Event Breakdown · 3 nights</div>
        {EVENT_DETAILS.map((ev, i) => (
          <div key={ev.num} className="af-reveal" style={{ padding: '36px 0', borderTop: '1px solid rgba(255,255,255,.22)', transitionDelay: `${i * 0.18}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 48, lineHeight: 1, letterSpacing: '-0.04em' }}>{ev.num}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...monoStyles.mono, fontSize: 9 }}>{ev.date} · {ev.dow}</div>
                <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .65, marginTop: 2 }}>{ev.time}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 34, lineHeight: 1.05, letterSpacing: '-0.022em', marginBottom: 10 }}>{ev.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .75 }}>{ev.venue} · {ev.capacity}</div>
              <img src={ev.venueLogo} alt={ev.venue} style={{ height: ev.venueLogo.includes('Vibes') ? 22 : 12, opacity: .7, filter: 'brightness(0) invert(1)', flexShrink: 0 }} />
            </div>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, lineHeight: 1.75, margin: 0 }}>{ev.desc}</p>
          </div>
        ))}
        {/* Tickets CTA */}
        <div className="af-reveal" style={{ padding: '32px 0', borderTop: '1px solid rgba(255,255,255,.22)', transitionDelay: `${EVENT_DETAILS.length * 0.18}s` }}>
          <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.12)', color: '#fafafa', border: '1px solid rgba(255,255,255,.55)', padding: '18px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, backdropFilter: 'blur(6px)' }}>
            Buy tickets — all 3 nights →
          </a>
        </div>
      </div>
      {/* City below all text */}
      <div aria-hidden style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src="assets/eindhoven-city.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', opacity: 0.75 }} />
      </div>
    </section>
  );
}

// ── Desktop homepage ───────────────────────────────────────────────────
function Monochrome() {
  return (
    <div style={{ ...monoStyles.root, position: 'relative' }}>
      <MonoNav inverted />
      <MonoHero />
      <div style={{ backgroundImage: 'url(assets/sunset-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center top', color: '#fafafa', position: 'relative', overflow: 'hidden' }}>
        <img src="assets/fog-overlay.png" aria-hidden alt="" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', opacity: 0.3, mixBlendMode: 'screen', zIndex: 10 }} />
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90vw', height: '90vw', pointerEvents: 'none', zIndex: 0 }}>
          <img src="assets/sun.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9, animation: 'sun-pulse 7s ease-in-out infinite', display: 'block' }} />
        </div>
        <MonoIntroSection />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: 420, display: 'block', opacity: .85, filter: 'brightness(0) invert(1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ ...monoStyles.mono, opacity: .5, fontSize: 9 }}>In collaboration with</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
              <img src="assets/IntStuExp (1).png" alt="International Student Experience NL" style={{ height: 28, opacity: .85, filter: 'brightness(0) invert(1)' }} />
              <img src="assets/Effenaar-1024x235 (1).webp" alt="Effenaar" style={{ height: 20, opacity: .85, filter: 'brightness(0) invert(1)' }} />
              <img src="assets/Vibes_logo_2022_Event_RGB_Vibes_logo_Badge_Wit.png" alt="Vibes Eindhoven" style={{ height: 36, opacity: .85 }} />
              <img src="assets/elctnr_creative_studio.png" alt="ELCNTR Creative Studio" style={{ height: 30, opacity: .85, filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
        </div>
        <MonoEventDetailsSection />
      </div>
      <MonoEvents />
      <MonoGalleryStrip />
      <MonoFooter />
    </div>
  );
}

// ── Mobile nav with fullscreen overlay menu ────────────────────────────
function MobileMonoNav({ inverted = true }) {
  const [open, setOpen] = useState(false);
  const logo = inverted ? 'assets/logo-white.png' : 'assets/logo-black.png';

  return (
    <>
      {/* Full-screen overlay — always in DOM, toggled via opacity */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 9998,
        background: '#080808',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
        padding: '0 36px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
        color: '#fafafa',
      }}>
        {[['Home','index.html'],['Events','events.html'],['Gallery','gallery.html'],['Contact','contact.html']].map(([label, href]) => (
          <a key={label} href={href}
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              color: '#fafafa',
              textDecoration: 'none',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: 48,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              padding: '10px 0',
              WebkitTapHighlightColor: 'transparent',
            }}>
            {label}
          </a>
        ))}
        <a href="https://tickets.ascensionfestival.nl/" target="_blank" rel="noopener"
          style={{
            display: 'inline-block', marginTop: 48,
            color: '#fafafa',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.6)',
            padding: '14px 28px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500, fontSize: 11,
            letterSpacing: '.18em', textTransform: 'uppercase',
            WebkitTapHighlightColor: 'transparent',
          }}>
          Tickets →
        </a>
      </div>

      {/* Fixed top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="index.html" onClick={() => setOpen(false)} style={{ display: 'block', WebkitTapHighlightColor: 'transparent' }}>
          <img src={logo} alt="Ascension" style={{ height: 20, display: 'block' }} />
        </a>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none', border: 'none', padding: 0, margin: 0,
            width: 44, height: 44, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fafafa',
            WebkitTapHighlightColor: 'transparent',
          }}>
          {open
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fafafa" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="3" x2="17" y2="17"/><line x1="17" y1="3" x2="3" y2="17"/></svg>
            : <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="#fafafa" strokeWidth="2" strokeLinecap="round"><line x1="0" y1="1" x2="22" y2="1"/><line x1="0" y1="8" x2="22" y2="8"/><line x1="0" y1="15" x2="22" y2="15"/></svg>
          }
        </button>
      </div>
    </>
  );
}

// ── Mobile hero (fullscreen) ───────────────────────────────────────────
function MobileMonoHero() {
  const { days, hours, mins, secs } = useCountdown('2026-06-05T22:00:00+02:00');
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <section id="home" className="af-hero" style={{ position: 'relative' }}>
      <BWPhoto tone="crowd" caption="" src="assets/photo-01.jpg" video="assets/hero.mp4" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '28%', color: '#fafafa', textAlign: 'center', padding: '0 22px' }}>
        <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: '92%', display: 'block', margin: '0 auto', opacity: .85, filter: 'brightness(0) invert(1)' }} />
        <div style={{ ...monoStyles.mono, marginTop: 16, fontSize: 10, opacity: .9 }}>
          A warm welcome to Eindhoven's International Student Experience
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ ...monoStyles.mono, opacity: .5, fontSize: 8 }}>In collaboration with</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <img src="assets/IntStuExp (1).png" alt="International Student Experience NL" style={{ height: 20, opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="assets/Effenaar-1024x235 (1).webp" alt="Effenaar" style={{ height: 14, opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="assets/Vibes_logo_2022_Event_RGB_Vibes_logo_Badge_Wit.png" alt="Vibes Eindhoven" style={{ height: 26, opacity: .8 }} />
            <img src="assets/elctnr_creative_studio.png" alt="ELCNTR Creative Studio" style={{ height: 22, opacity: .8, filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 28, color: '#fafafa', borderTop: '1px solid rgba(250,250,250,.4)', paddingTop: 18 }}>
        <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 9 }}>Next · Fri 05 Jun 2026</div>
        <div style={{ fontFamily: 'Montserrat', fontStyle: 'italic', fontWeight: 300, fontSize: 22, marginTop: 6, letterSpacing: '-0.015em' }}>Summer Festival</div>
        <div style={{ ...monoStyles.mono, opacity: .6, fontSize: 9, marginTop: 4 }}>Effenaar Main Stage</div>
        <div style={{ display: 'flex', gap: 18, marginTop: 18, justifyContent: 'space-between' }}>
          {[['D', pad(days)], ['H', pad(hours)], ['M', pad(mins)], ['S', pad(secs)]].map(([l, v]) =>
            <div key={l} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 36, lineHeight: 1, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 8 }}>{l}</div>
            </div>
          )}
        </div>
        <a href="https://tickets.ascensionfestival.nl/summerfestival" target="_blank" rel="noopener" className="af-cta-light" style={{ display: 'block', textAlign: 'center', background: '#fafafa', color: '#0a0a0a', padding: '18px 22px', marginTop: 22, textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
          Buy tickets →
        </a>
      </div>
    </section>
  );
}

// ── Mobile events ──────────────────────────────────────────────────────
function MobileMonoEvents() {
  return (
    <section id="events" className="af-reveal" style={{ padding: '60px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Upcoming</span>
        </h2>
        <span style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>1 fest + 1 series</span>
      </div>
      <div>
        {EVENTS.map((ev, i) => {
          const isLast = i === EVENTS.length - 1;
          const baseRow = { padding: '16px 0', borderTop: '1px solid #0a0a0a', ...(isLast ? { borderBottom: '1px solid #0a0a0a' } : {}) };
          if (ev.isSeries) {
            return (
              <div key={ev.id} className="af-event-row" style={baseRow}>
                <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 14, alignItems: 'center' }}>
                  <img src={ev.poster} alt={ev.title} style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
                  <div>
                    <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 8 }}>{ev.tag}</div>
                    <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 13, lineHeight: 1.15, letterSpacing: '-0.005em', marginTop: 4 }}>Int'l Student Intro 2026</div>
                    <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 8 }}>3 shows · Eindhoven · 18+</div>
                  </div>
                  <a href="#tickets" className="af-link" style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>Buy →</a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, paddingLeft: 78 }}>
                  {ev.series.map((s) => (
                    <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'baseline', ...monoStyles.mono, fontSize: 9, opacity: .75 }}>
                      <span style={{ minWidth: 56 }}>{s.dow} {s.day} {s.month}</span>
                      <span>{s.subtitle}</span>
                      <span style={{ opacity: .55, marginLeft: 'auto' }}>{s.venue}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={ev.id} className="af-event-row" style={{ ...baseRow, display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 14, alignItems: 'center' }}>
              <img src={ev.poster} alt={ev.title} style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 24, lineHeight: 1, letterSpacing: '-0.04em' }}>{ev.date.day}</span>
                  <span style={{ ...monoStyles.mono, opacity: .7, fontSize: 9 }}>{ev.date.month}</span>
                </div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 13, lineHeight: 1.15, letterSpacing: '-0.005em', marginTop: 4 }}>
                  {ev.headline && <span style={{ fontStyle: 'italic', fontWeight: 300 }}>★ </span>}
                  {ev.title}
                </div>
                <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 8 }}>{ev.venue.split(' — ')[0]} · 18+</div>
              </div>
              <a href="#tickets" className="af-link" style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>Buy →</a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Mobile gallery strip ───────────────────────────────────────────────
function MobileMonoGallery() {
  const items = [
    { src: 'assets/photo-13.jpg' },
    { src: 'assets/photo-10.jpg' },
    { src: 'assets/photo-9.jpg' },
    { src: 'assets/photo-12.jpg' },
  ];
  return (
    <section id="gallery" className="af-reveal" style={{ padding: '20px 22px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 24, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Recent</span> moments
        </h2>
        <a href="gallery.html" className="af-link" style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>Archive →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {items.map((it, i) =>
          <div key={i} className="af-photo-item">
            <BWPhoto src={it.src} caption="" style={{ aspectRatio: '3 / 4' }} />
          </div>
        )}
      </div>
    </section>
  );
}

// ── Mobile footer ──────────────────────────────────────────────────────
function MobileMonoFooter() {
  return (
    <footer id="contact" className="af-reveal" style={{ borderTop: '1px solid #0a0a0a' }}>
      <div style={{ padding: '24px 22px 36px' }}>
        <a href="index.html" className="af-logo-link"><img src="assets/logo-black.png" alt="Ascension" style={{ height: 18, display: 'block' }} /></a>
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 12 }}>Eindhoven, since 2025</div>
        <div style={{ marginTop: 22 }}>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginBottom: 8 }}>Mailing list</div>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', borderBottom: '1px solid #0a0a0a', paddingBottom: 10 }}>
            <input type="email" placeholder="you@uni.nl" required style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, color: '#0a0a0a', outline: 'none' }} />
            <button type="submit" className="af-footer-link" style={{ border: 'none', background: 'transparent', cursor: 'pointer', ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', padding: 0 }}>→</button>
          </form>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, ...monoStyles.mono, fontSize: 10 }}>
          <a href="https://instagram.com/ascensionfestival.nl" className="af-footer-link" target="_blank" rel="noopener" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Instagram</a>
          <a href="https://tiktok.com/@ascensionfestival" className="af-footer-link" target="_blank" rel="noopener" style={{ color: '#0a0a0a', textDecoration: 'none' }}>TikTok</a>
          <a href="#" className="af-footer-link" style={{ color: '#0a0a0a', textDecoration: 'none' }}>Spotify</a>
        </div>
        <div style={{ marginTop: 28, ...monoStyles.mono, opacity: .5, fontSize: 8, display: 'flex', justifyContent: 'space-between' }}>
          <span>© 2026 Ascension Festival NL</span>
          <span>Made in Eindhoven</span>
        </div>
      </div>
    </footer>
  );
}

// ── Mobile homepage ────────────────────────────────────────────────────
function MonochromeMobile() {
  return (
    <div style={{ ...monoStyles.root, position: 'relative' }}>
      <MobileMonoNav inverted />
      <MobileMonoHero />
      <div style={{ backgroundImage: 'url(assets/sunset-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center top', color: '#fafafa', position: 'relative', overflow: 'hidden' }}>
        <img src="assets/fog-overlay.png" aria-hidden alt="" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', opacity: 0.3, mixBlendMode: 'screen', zIndex: 10 }} />
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200vw', height: '200vw', pointerEvents: 'none', zIndex: 0 }}>
          <img src="assets/sun.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9, animation: 'sun-pulse 7s ease-in-out infinite', display: 'block' }} />
        </div>
        <MobileIntroSection />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '36px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: '80%', display: 'block', opacity: .85, filter: 'brightness(0) invert(1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ ...monoStyles.mono, opacity: .5, fontSize: 8 }}>In collaboration with</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              <img src="assets/IntStuExp (1).png" alt="International Student Experience NL" style={{ height: 22, opacity: .85, filter: 'brightness(0) invert(1)' }} />
              <img src="assets/Effenaar-1024x235 (1).webp" alt="Effenaar" style={{ height: 16, opacity: .85, filter: 'brightness(0) invert(1)' }} />
              <img src="assets/Vibes_logo_2022_Event_RGB_Vibes_logo_Badge_Wit.png" alt="Vibes Eindhoven" style={{ height: 28, opacity: .85 }} />
              <img src="assets/elctnr_creative_studio.png" alt="ELCNTR Creative Studio" style={{ height: 18, opacity: .85, filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
        </div>
        <MobileEventDetailsSection />
      </div>
      <MobileMonoEvents />
      <MobileMonoGallery />
      <MobileMonoFooter />
    </div>
  );
}

// ── Responsive homepage ────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    setMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

function HomePage() {
  const mobile = useIsMobile();
  return mobile ? <MonochromeMobile /> : <Monochrome />;
}

Object.assign(window, { Monochrome, MonochromeMobile, MonoNav, MonoFooter, BWPhoto, monoStyles, HomePage });
