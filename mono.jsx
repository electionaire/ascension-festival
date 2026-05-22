// MONOCHROME — stripped landing. Hero · Events · Gallery strip · Footer.
// Black & white. Type small, photography big. Desktop + Mobile.

const monoStyles = {
  root: {
    width: 1280, fontFamily: 'Montserrat, sans-serif',
    background: '#fafafa', color: '#0a0a0a',
    position: 'relative', overflow: 'hidden'
  },
  mono: { fontFamily: 'Montserrat', fontWeight: 500, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }
};

// ── Grayscale photo placeholder ────────────────────────────────────────
// If `src` is provided, renders an <img> with the placeholder as fallback.
// If `video` is provided, renders a <video> instead. Caption + grayscale still apply.
function BWPhoto({ caption = '', children, style = {}, tone = 'crowd', src, video, kenBurns = false }) {
  const palettes = {
    crowd: 'linear-gradient(180deg, rgba(255,255,255,.0) 0%, rgba(255,255,255,.08) 35%, rgba(0,0,0,.55) 80%, #000 100%), radial-gradient(80% 60% at 50% 78%, #2a2a2a 0%, #0d0d0d 70%, #000 100%)',
    portrait: 'linear-gradient(160deg, rgba(255,255,255,.10), rgba(0,0,0,.6)), radial-gradient(70% 55% at 40% 35%, #353535 0%, #111 70%, #000 100%)',
    floor: 'linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(0,0,0,.5) 60%, #000 100%), radial-gradient(60% 40% at 50% 60%, #303030 0%, #0a0a0a 70%, #000 100%)',
    smoke: 'linear-gradient(140deg, rgba(255,255,255,.16), rgba(0,0,0,.7)), radial-gradient(60% 50% at 70% 30%, #404040 0%, #1a1a1a 50%, #000 100%)',
    light: 'linear-gradient(160deg, rgba(255,255,255,.22), rgba(0,0,0,.55)), radial-gradient(50% 40% at 25% 30%, #5a5a5a 0%, #1e1e1e 60%, #050505 100%)',
    venue: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.55)), radial-gradient(80% 60% at 50% 20%, #4a4a4a 0%, #181818 60%, #000 100%)',
    flag: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.6)), radial-gradient(80% 60% at 50% 40%, #2e2e2e 0%, #0d0d0d 70%, #000 100%)'
  };
  return (
    <div data-cap={caption} style={{
      position: 'relative',
      backgroundImage: (palettes[tone] || palettes.crowd) + ', repeating-linear-gradient(45deg, rgba(255,255,255,.02) 0 8px, rgba(0,0,0,.04) 8px 16px)',
      color: 'rgba(255,255,255,.4)',
      fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
      overflow: 'hidden',
      filter: 'contrast(1.05)',
      ...style
    }}>
      <style>{`@keyframes kb { from { transform: scale(1.0) translate(0,0) } to { transform: scale(1.18) translate(-2%, -1%) } }`}</style>
      {src &&
      <img src={src} alt={caption} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: kenBurns ? 'kb 14s ease-in-out infinite alternate' : 'none' }} />
      }
      {video &&
      <video src={video} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      }
      {/* placeholder ken-burns motion suggesting a looping video */}
      {!src && !video && kenBurns &&
      <div aria-hidden style={{ position: 'absolute', inset: 0, animation: 'kb 14s ease-in-out infinite alternate', backgroundImage: palettes[tone] || palettes.crowd, backgroundSize: 'cover' }} />
      }
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: .4,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.2) 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
      {caption &&
      <div style={{ position: 'absolute', left: 12, bottom: 10, color: 'rgba(255,255,255,.55)', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' }}>
          {caption}
        </div>
      }
      {children}
    </div>);

}

// ── DESKTOP ────────────────────────────────────────────────────────────

function MonoNav({ inverted = false }) {
  const ink = inverted ? '#fafafa' : '#0a0a0a';
  const link = { color: ink, textDecoration: 'none', fontSize: 11, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase' };
  const logo = inverted ? 'assets/logo-white.png' : 'assets/logo-black.png';
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '24px 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', color: ink }}>
      <div>
        <img src={logo} alt="Ascension" style={{ height: 38, display: 'block' }} />
      </div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        <a style={link}>Events</a>
        <a style={link}>Gallery</a>
        <a style={link}>Contact</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <a style={{ ...link, borderBottom: `1px solid ${ink}`, paddingBottom: 2 }}>Tickets →</a>
      </div>
    </div>);

}

function MonoHero() {
  const { days, hours, mins, secs } = useCountdown('2026-06-05T22:00:00+02:00');
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <section style={{ position: 'relative', height: 880 }}>
      <BWPhoto tone="crowd" caption="" src="assets/photo-01.jpg" video="assets/hero.mp4" style={{ position: 'absolute', inset: 0 }} />

      {/* festival mark — intro 2026 logo, vertically centered above the countdown bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 110, bottom: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 60px', textAlign: 'center' }}>
        <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: 820, maxWidth: '100%', display: 'block', filter: 'drop-shadow(0 8px 40px rgba(0,0,0,.6))' }} />
        <div style={{ ...monoStyles.mono, marginTop: 26, fontSize: 12, color: '#fafafa', opacity: .9, letterSpacing: '.28em' }}>
          A warm welcome to Eindhoven’s International Student Experience
        </div>
      </div>

      {/* bottom — next show + countdown + CTA */}
      <div style={{ position: 'absolute', left: 48, right: 48, bottom: 48, color: '#fafafa', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 48, alignItems: 'flex-end', borderTop: '1px solid rgba(250,250,250,.3)', paddingTop: 32 }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 10 }}>Next show · Fri 05 Jun 2026 · 22:00</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 30, marginTop: 8, letterSpacing: '-0.015em' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Summer Festival</span> — Effenaar Main Stage
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'baseline' }}>
          {[['D', pad(days)], ['H', pad(hours)], ['M', pad(mins)], ['S', pad(secs)]].map(([l, v]) =>
          <div key={l} style={{ textAlign: 'center', minWidth: 56 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 9 }}>{l}</div>
            </div>
          )}
        </div>
        <a style={{ background: '#fafafa', color: '#0a0a0a', padding: '18px 28px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, whiteSpace: 'nowrap' }}>
          Buy tickets →
        </a>
      </div>
    </section>);

}

function MonoEvents() {
  return (
    <section style={{ padding: '120px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 56, letterSpacing: '-0.025em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Upcoming</span> shows
        </h2>
        <span style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Summer 2026 · 1 festival + 1 series</span>
      </div>
      <div>
        {EVENTS.map((ev, i) => {
          const isLast = i === EVENTS.length - 1;
          const baseRow = {
            display: 'grid',
            alignItems: 'center', padding: '28px 0',
            borderTop: '1px solid #0a0a0a',
            ...(isLast ? { borderBottom: '1px solid #0a0a0a' } : {}),
          };

          if (ev.isSeries) {
            // Series row — poster | series block | dates list | CTA
            return (
              <div key={ev.id} style={{ ...baseRow, gridTemplateColumns: '120px 1fr 1.2fr 140px', gap: 28 }}>
                <img src={ev.poster} alt={ev.title} style={{ width: 120, height: 120, objectFit: 'cover', display: 'block' }} />
                <div>
                  <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{ev.tag}</div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.005em', marginTop: 8 }}>
                    {ev.title}
                  </div>
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
                  <a href="#tickets" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11, textDecoration: 'none' }}>
                    Buy series →
                  </a>
                </div>
              </div>
            );
          }

          // Single event row — poster | date | title | venue | CTA
          return (
            <div key={ev.id} style={{ ...baseRow, gridTemplateColumns: '120px 100px 1.5fr 1fr 140px', gap: 24 }}>
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
                <a href="#tickets" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11, textDecoration: 'none' }}>
                  Buy ticket →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>);

}

function MonoGalleryStrip() {
  const items = [
  { src: 'assets/photo-02.jpg', cap: '', isVideo: true },
  { src: 'assets/photo-03.jpg', cap: '' },
  { src: 'assets/photo-04.jpg', cap: '' },
  { src: 'assets/photo-05.jpg', cap: '' },
  { src: 'assets/photo-06.jpg', cap: '' },
  { src: 'assets/photo-07.jpg', cap: '' }];

  return (
    <section style={{ padding: '40px 48px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Gallery</span> 
        </h2>
        <a style={{ color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid #0a0a0a', paddingBottom: 3, ...monoStyles.mono, fontSize: 11 }}>Full archive →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {items.map((it, i) =>
        <div key={i} style={{ position: 'relative' }}>
            <BWPhoto src={it.src} caption={it.cap} kenBurns={it.isVideo} style={{ aspectRatio: '3 / 4' }} />
            {it.isVideo &&
          <div style={{ position: 'absolute', top: 10, right: 10, color: '#fafafa', ...monoStyles.mono, fontSize: 8, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,.5)', padding: '4px 7px' }}>
                <span style={{ width: 0, height: 0, borderLeft: '6px solid #fafafa', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                Video
              </div>
          }
          </div>
        )}
      </div>

      {/* Featured video reel — wide cinema strip */}
      <div style={{ marginTop: 60, position: 'relative' }}>
        <BWPhoto src="assets/photo-08.jpg" caption="season reel · 2026 highlights · 02:14" kenBurns style={{ aspectRatio: '21 / 9', width: '100%' }} />
        {/* play button overlay */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
          <div style={{ width: 92, height: 92, borderRadius: '50%', border: '1.5px solid #fafafa', display: 'grid', placeItems: 'center', backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,.15)' }}>
            <span style={{ width: 0, height: 0, borderLeft: '20px solid #fafafa', borderTop: '13px solid transparent', borderBottom: '13px solid transparent', marginLeft: 6 }} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 20, top: 18, ...monoStyles.mono, color: '#fafafa', fontSize: 10, opacity: .85 }}>
          ▸ Featured reel · Season 2026
        </div>
        <div style={{ position: 'absolute', right: 20, bottom: 18, ...monoStyles.mono, color: '#fafafa', fontSize: 10, opacity: .85 }}>
          02:14
        </div>
      </div>
    </section>);

}

function MonoFooter() {
  return (
    <footer style={{ background: '#fafafa', borderTop: '1px solid #0a0a0a', padding: '48px 48px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32, alignItems: 'flex-start' }}>
          <div>
            <img src="assets/logo-black.png" alt="Ascension" style={{ height: 28, display: 'block' }} />
            <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 10, marginTop: 16 }}>EINDHOVEN, SINCE 2025</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, lineHeight: 1.6, opacity: .65, marginTop: 10, maxWidth: 320, textWrap: 'pretty' }}>
              A warm welcome to Eindhoven’s International Student Experience. Run by students, for students.
            </div>
          </div>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Follow</div>
            {['Instagram', 'TikTok', 'Spotify'].map((it) =>
          <div key={it} style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}>{it}</div>
          )}
          </div>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Contact</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}>info@ascensionfestival.nl</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}></div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, padding: '4px 0' }}></div>
          </div>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 12 }}>Mailing list</div>
            <div style={{ display: 'flex', borderBottom: '1px solid #0a0a0a', paddingBottom: 10 }}>
              <div style={{ flex: 1, fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, opacity: .5 }}>your@university.nl</div>
              <a style={{ ...monoStyles.mono, fontSize: 11, color: '#0a0a0a' }}>Sign up →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(10,10,10,.15)', marginTop: 36, paddingTop: 18, display: 'flex', justifyContent: 'space-between', ...monoStyles.mono, opacity: .5, fontSize: 9 }}>
          <span>© 2026 Ascension Festival NL</span>
          <span>Made in Eindhoven</span>
        </div>
    </footer>);

}

function Monochrome() {
  return (
    <div style={monoStyles.root}>
      <MonoNav inverted />
      <MonoHero />
      <MonoEvents />
      <MonoGalleryStrip />
      <MonoFooter />
    </div>);

}

// ── MOBILE ─────────────────────────────────────────────────────────────

function MobileMonoStatusBar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fafafa', fontFamily: 'SF Pro Display, Montserrat', fontWeight: 600, fontSize: 14, zIndex: 20 }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ fontSize: 11 }}>●●●●</span>
        <span style={{ width: 16, height: 9, border: '1px solid #fafafa', borderRadius: 2, position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', inset: 1, background: '#fafafa', borderRadius: 1 }} />
        </span>
      </span>
    </div>);

}

function MobileMonoNav({ inverted = true }) {
  const ink = inverted ? '#fafafa' : '#0a0a0a';
  const logo = inverted ? 'assets/logo-white.png' : 'assets/logo-black.png';
  return (
    <div style={{ position: 'absolute', top: 44, left: 0, right: 0, zIndex: 10, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: ink }}>
      <img src={logo} alt="Ascension" style={{ height: 22, display: 'block' }} />
      <div style={{ width: 24, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ height: 1.5, background: ink }} />
        <span style={{ height: 1.5, background: ink }} />
      </div>
    </div>);

}

function MobileMonoHero() {
  const { days, hours, mins, secs } = useCountdown('2026-06-05T22:00:00+02:00');
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <section style={{ position: 'relative', height: 720 }}>
      <BWPhoto tone="crowd" caption="" src="assets/photo-01.jpg" video="assets/hero.mp4" style={{ position: 'absolute', inset: 0 }} />

      <div style={{ position: 'absolute', left: 0, right: 0, top: 240, color: '#fafafa', textAlign: 'center', padding: '0 22px' }}>
        <img src="assets/logo-layer3.png" alt="Ascension International Student Intro 2026" style={{ width: '92%', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,.5))' }} />
        <div style={{ ...monoStyles.mono, marginTop: 16, fontSize: 10, opacity: .9, textWrap: 'balance' }}>
          A warm welcome to Eindhoven’s International Student Experience
        </div>
      </div>

      {/* Bottom card */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 22, color: '#fafafa', borderTop: '1px solid rgba(250,250,250,.4)', paddingTop: 18 }}>
        <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 9 }}>Next · Fri 05 Jun 2026</div>
        <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 22, marginTop: 6, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
          <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Summer Festival</span><br />
          Effenaar Main Stage
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 18, justifyContent: 'space-between' }}>
          {[['D', pad(days)], ['H', pad(hours)], ['M', pad(mins)], ['S', pad(secs)]].map(([l, v]) =>
          <div key={l} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: 36, lineHeight: 1, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 8 }}>{l}</div>
            </div>
          )}
        </div>
        <a style={{ display: 'block', textAlign: 'center', background: '#fafafa', color: '#0a0a0a', padding: '18px 22px', marginTop: 22, textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
          Buy tickets · €18.50 →
        </a>
      </div>
    </section>);

}

function MobileMonoEvents() {
  return (
    <section style={{ padding: '60px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 32, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Upcoming</span>
        </h2>
        <span style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>1 fest + 1 series</span>
      </div>
      <div>
        {EVENTS.map((ev, i) => {
          const isLast = i === EVENTS.length - 1;
          const baseRow = {
            padding: '16px 0',
            borderTop: '1px solid #0a0a0a',
            ...(isLast ? { borderBottom: '1px solid #0a0a0a' } : {}),
          };

          if (ev.isSeries) {
            return (
              <div key={ev.id} style={baseRow}>
                <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 14, alignItems: 'center' }}>
                  <img src={ev.poster} alt={ev.title} style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
                  <div>
                    <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 8 }}>{ev.tag}</div>
                    <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 13, lineHeight: 1.15, letterSpacing: '-0.005em', marginTop: 4 }}>
                      Int'l Student Intro 2026
                    </div>
                    <div style={{ ...monoStyles.mono, opacity: .55, marginTop: 4, fontSize: 8 }}>3 shows · Eindhoven · 18+</div>
                  </div>
                  <a style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>
                    Buy →
                  </a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, paddingLeft: 78 }}>
                  {ev.series.map((s) => (
                    <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'baseline', ...monoStyles.mono, fontSize: 9, opacity: .75 }}>
                      <span style={{ minWidth: 56 }}>{s.dow} {s.day} {s.month}</span>
                      <span style={{ opacity: .8 }}>{s.subtitle}</span>
                      <span style={{ opacity: .55, marginLeft: 'auto' }}>{s.venue}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={ev.id} style={{
              ...baseRow,
              display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 14,
              alignItems: 'center',
            }}>
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
              <a style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>
                Buy →
              </a>
            </div>
          );
        })}
      </div>
    </section>);

}

function MobileMonoGallery() {
  const items = [
  { src: 'assets/photo-02.jpg', cap: 'floor' },
  { src: 'assets/photo-04.jpg', cap: 'dance' },
  { src: 'assets/photo-06.jpg', cap: 'pair' },
  { src: 'assets/photo-08.jpg', cap: 'dj' }];

  return (
    <section style={{ padding: '20px 22px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 24, letterSpacing: '-0.02em', margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Recent</span> moments
        </h2>
        <a style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, textDecoration: 'none' }}>Archive →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {items.map((it, i) =>
        <BWPhoto key={i} src={it.src} caption={it.cap} style={{ aspectRatio: '3 / 4' }} />
        )}
      </div>
    </section>);

}

function MobileMonoFooter() {
  return (
    <footer style={{ borderTop: '1px solid #0a0a0a' }}>
      <div style={{ padding: '24px 22px 28px' }}>
        <img src="assets/logo-black.png" alt="Ascension" style={{ height: 18, display: 'block' }} />
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 12 }}>Eindhoven, since 2018</div>
        <div style={{ marginTop: 22 }}>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginBottom: 8 }}>Mailing list</div>
          <div style={{ display: 'flex', borderBottom: '1px solid #0a0a0a', paddingBottom: 10 }}>
            <div style={{ flex: 1, fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, opacity: .5 }}>you@uni.nl</div>
            <a style={{ ...monoStyles.mono, fontSize: 10 }}>Sign up →</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, ...monoStyles.mono, fontSize: 10 }}>
          <span>Instagram</span><span>TikTok</span><span>Spotify</span>
        </div>
        <div style={{ marginTop: 28, ...monoStyles.mono, opacity: .5, fontSize: 8, display: 'flex', justifyContent: 'space-between' }}>
          <span>© 2026 Ascension Festival NL</span>
          <span>Made in Eindhoven</span>
        </div>
        {/* iOS home indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
          <div style={{ width: 134, height: 5, background: '#0a0a0a', borderRadius: 3, opacity: .9 }} />
        </div>
      </div>
    </footer>);

}

function MonochromeMobile() {
  return (
    <div style={{ ...monoStyles.root, width: 390, borderRadius: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)' }}>
      <MobileMonoStatusBar />
      <MobileMonoNav inverted />
      <MobileMonoHero />
      <MobileMonoEvents />
      <MobileMonoGallery />
      <MobileMonoFooter />
    </div>);

}

Object.assign(window, { Monochrome, MonochromeMobile, MonoNav, MonoFooter, BWPhoto, monoStyles });