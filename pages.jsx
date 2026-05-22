// Tickets / Gallery / Events / Contact pages
// All in one file. Each is a full 1280-wide page sharing MonoNav + MonoFooter.

const { MonoNav, MonoFooter, BWPhoto, monoStyles, EVENTS } = window;

const pageRoot = {
  width: 1280, fontFamily: 'Montserrat, sans-serif',
  background: '#fafafa', color: '#0a0a0a',
  position: 'relative', overflow: 'hidden'
};

// Section header used across pages — keeps the type system consistent
function PageHeader({ eyebrow, title, italic, lead, subhead, photo, height = 520 }) {
  return (
    <section style={{ position: 'relative', height, borderBottom: '1px solid #0a0a0a' }}>
      {photo && <BWPhoto src={photo} caption="" style={{ position: 'absolute', inset: 0 }} />}
      {photo && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.25) 50%, rgba(0,0,0,.75) 100%)' }} />}
      <MonoNav inverted={!!photo} />
      <div style={{ position: 'absolute', left: 48, right: 48, bottom: 48, color: photo ? '#fafafa' : '#0a0a0a' }}>
        <div style={{ ...monoStyles.mono, opacity: .7, fontSize: 11, marginBottom: 18 }}>{eyebrow}</div>
        <h1 style={{
          fontFamily: 'Montserrat', fontWeight: 300, fontSize: 104, lineHeight: 0.96,
          letterSpacing: '-0.035em', margin: 0, maxWidth: 980, textWrap: 'balance'
        }}>
          {title}{italic && <span style={{ fontStyle: 'italic', fontWeight: 200 }}> {italic}</span>}
        </h1>
        {lead &&
        <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, lineHeight: 1.55, maxWidth: 580, marginTop: 18, opacity: .85, textWrap: 'pretty' }}>
            {lead}
          </p>
        }
        {subhead &&
        <div style={{ ...monoStyles.mono, opacity: .65, fontSize: 10, marginTop: 18, display: 'flex', gap: 28 }}>
            {subhead.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        }
      </div>
    </section>);

}

// ───────────────────────────────────────────────────────────────────────
// TICKETS — Pretix embed
// ───────────────────────────────────────────────────────────────────────

function TicketsPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 01 — Tickets"
        title="Get your"
        italic="tickets."
        lead="Pre-sale codes go out to the mailing list 24 hours before public release. Tickets are transferable, but non-refundable."
        subhead={['Powered by Pretix', '4 / 4 shows on sale', 'No third-party resellers — buy direct from us']}
        photo="assets/gallery/g11.jpg"
        height={560} />
      

      <section style={{ padding: '80px 48px' }}>
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
                  JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" rel="noopener" href="https://tickets.ascensionfestival.nl/intro/">click here</a>.
                </div>
              </div>
            </noscript>
          ` }} />
        </div>

        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 16, textAlign: 'center' }}>
          Trouble loading the shop? <a href="https://tickets.ascensionfestival.nl/intro/" target="_blank" rel="noopener" style={{ color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 1 }}>Open it directly →</a>
        </div>
      </section>

      <section style={{ padding: '60px 48px 100px', borderTop: '1px solid #0a0a0a', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        {[
        ['01', 'Direct from us', 'No third-party resellers. Every ticket comes through Pretix and is valid at the door.'],
        ['02', 'Transferable', "Can't make it? Pass your ticket to a friend through your confirmation email — no fee."],
        ['03', 'Refund protection', 'Show cancelled? Full refund within 14 days, automatic to your original payment method.'],
        ['04', 'Lost ticket? No stress', 'Bring your ID — we can re-issue at the door if your email is on the list.']].
        map(([n, h, body]) =>
        <div key={n}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{n}</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 17, marginTop: 8, letterSpacing: '-0.005em' }}>{h}</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, lineHeight: 1.6, opacity: .65, marginTop: 8, textWrap: 'pretty' }}>{body}</div>
          </div>
        )}
      </section>

      <MonoFooter />
    </div>);

}

// ───────────────────────────────────────────────────────────────────────
// GALLERY
// ───────────────────────────────────────────────────────────────────────

function GalleryPage() {
  // Mix landscape and portrait crops into a 12-col grid for editorial flow
  const layout = [
  // row 1
  { src: 'assets/gallery/g11.jpg', col: 'span 8', h: 600 },
  { src: 'assets/gallery/g03.jpg', col: 'span 4', h: 600 },
  // row 2
  { src: 'assets/gallery/g05.jpg', col: 'span 4', h: 380 },
  { src: 'assets/gallery/g06.jpg', col: 'span 4', h: 380 },
  { src: 'assets/gallery/g07.jpg', col: 'span 4', h: 380 },
  // row 3
  { src: 'assets/gallery/g04.jpg', col: 'span 5', h: 700 },
  { src: 'assets/gallery/g08.jpg', col: 'span 7', h: 700, double: true },
  // row 4 (split right side into two stacked)
  { src: 'assets/gallery/g12.jpg', col: 'span 6', h: 420 },
  { src: 'assets/gallery/g13.jpg', col: 'span 6', h: 420 },
  // row 5
  { src: 'assets/gallery/g09.jpg', col: 'span 4', h: 520 },
  { src: 'assets/gallery/g10.jpg', col: 'span 4', h: 520 },
  { src: 'assets/gallery/g14.jpg', col: 'span 4', h: 520 },
  // row 6
  { src: 'assets/gallery/g15.jpg', col: 'span 7', h: 440 },
  { src: 'assets/gallery/g16.jpg', col: 'span 5', h: 440 },
  // row 7
  { src: 'assets/gallery/g17.jpg', col: 'span 4', h: 420 },
  { src: 'assets/gallery/g18.jpg', col: 'span 4', h: 420 },
  { src: 'assets/gallery/g19.jpg', col: 'span 4', h: 420 },
  // row 8
  { src: 'assets/gallery/g20.jpg', col: 'span 5', h: 600 },
  { src: 'assets/gallery/g21.jpg', col: 'span 7', h: 600 },
  // row 9
  { src: 'assets/gallery/g22.jpg', col: 'span 4', h: 380 },
  { src: 'assets/gallery/g23.jpg', col: 'span 4', h: 380 },
  { src: 'assets/gallery/g24.jpg', col: 'span 4', h: 380 }];

  const albums = [
  { id: 'intro-25', name: 'Intro 2025 · Vol.03', date: 'Oct 03 · 2025', count: 218, src: 'assets/gallery/g05.jpg', active: true },
  { id: 'spring-25', name: 'Spring Awakening', date: 'Apr 26 · 2025', count: 164, src: 'assets/gallery/g09.jpg' },
  { id: 'nye-25', name: 'NYE — Liquid Heat', date: 'Dec 31 · 2025', count: 287, src: 'assets/gallery/g15.jpg' },
  { id: 'ade-25', name: 'ADE Showcase', date: 'Oct 17 · 2025', count: 142, src: 'assets/gallery/g20.jpg' },
  { id: 'summer-25', name: 'Summer Closing', date: 'Aug 30 · 2025', count: 196, src: 'assets/gallery/g23.jpg' }];


  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 02 — Gallery"
        title="The afterglow."
        lead="Eight years, 124 shows, 80,000 students. Click any album to dive in. New photos drop every Monday after a show."
        subhead={['1,007 photos across 18 albums', 'Shot by Van der Wielen Studio + community submissions', 'Tag yourself: #ascensionfestival']}
        photo="assets/gallery/g15.jpg"
        height={560} />
      

      {/* Album tabs */}
      <section style={{ padding: '40px 48px 0', borderBottom: '1px solid rgba(10,10,10,.15)' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 28 }}>
          {albums.map((a) =>
          <div key={a.id} style={{
            flex: '0 0 auto',
            border: a.active ? '1px solid #0a0a0a' : '1px solid rgba(10,10,10,.18)',
            background: a.active ? '#0a0a0a' : 'transparent',
            color: a.active ? '#fafafa' : '#0a0a0a',
            padding: 14, width: 220, cursor: 'pointer'
          }}>
              <img src={a.src} alt={a.name} style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block', filter: a.active ? 'none' : 'none', opacity: a.active ? 1 : .9 }} />
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .65, marginTop: 12 }}>{a.date}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 15, marginTop: 4, letterSpacing: '-0.005em', lineHeight: 1.2 }}>{a.name}</div>
              <div style={{ ...monoStyles.mono, fontSize: 9, opacity: .55, marginTop: 6 }}>{a.count} photos</div>
            </div>
          )}
        </div>
      </section>

      {/* Selected album header */}
      <section style={{ padding: '60px 48px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Now viewing · 218 photos</div>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', margin: '12px 0 0', lineHeight: 1 }}>
            Intro 2025 — <span style={{ fontStyle: 'italic' }}>Vol.03</span>
          </h2>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 10 }}>Fri 03 Oct 2025 · Effenaar Main Stage · 23:30–05:00</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <a style={{ ...monoStyles.mono, fontSize: 10, color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '10px 16px', textDecoration: 'none' }}>Download ZIP</a>
          <a style={{ ...monoStyles.mono, fontSize: 10, color: '#fafafa', background: '#0a0a0a', padding: '10px 16px', textDecoration: 'none' }}>Share album</a>
        </div>
      </section>

      {/* Photo grid — 12 col editorial layout */}
      <section style={{ padding: '0 48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8 }}>
          {layout.map((it, i) =>
          <div key={i} style={{ gridColumn: it.col, height: it.h, position: 'relative', cursor: 'pointer' }}>
              <BWPhoto src={it.src} caption="" style={{ width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, ...monoStyles.mono, fontSize: 9, color: '#fafafa', opacity: .7, textShadow: '0 1px 6px rgba(0,0,0,.6)' }}>
                {String(i + 1).padStart(3, '0')} / 218
              </div>
            </div>
          )}
        </div>

        {/* Load more */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>21 / 218 photos shown</div>
          <a style={{ display: 'inline-block', color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '16px 32px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
            Load 24 more →
          </a>
        </div>
      </section>

      <MonoFooter />
    </div>);

}

// ───────────────────────────────────────────────────────────────────────
// EVENTS
// ───────────────────────────────────────────────────────────────────────

const LINEUPS = {
  'summer-fest-2026': ['SADO OPULENCE (live)', 'KETTAMA', 'Mac Declos', 'Local hero · TBA', 'Special b2b · TBA'],
  'intro-opening': ['House selectors · Ascension Crew', 'Sajeda', 'Bonzai b2b LOOG', 'Resident closeout'],
  'intro-main': ['Headliner · TBA', 'D.Dan', 'Sara Landry (techno set)', 'Ascension Crew', 'Surprise guest'],
  'intro-closing': ['Closing headliner · TBA', 'Marlon Hoffstadt', 'Kessler', 'Ascension Crew', 'Vibes resident']
};
const VENUE_INFO = {
  'Effenaar — Main Stage': { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,400 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Effenaar': { addr: 'Dommelstraat 2, 5611 CJ Eindhoven', cap: '1,400 cap · two rooms', tram: '5 min walk from Eindhoven Centraal' },
  'Domusdela': { addr: 'Kloosterdreef 7, 5622 AC Eindhoven', cap: '900 cap · former church', tram: '12 min cycle from Centraal' },
  'Vibes Eindhoven': { addr: 'Markt 1, 5611 EA Eindhoven', cap: '650 cap · intimate floor', tram: '3 min walk from Centraal' }
};

function EventCard({ ev, i }) {
  const venueInfo = VENUE_INFO[ev.venue] || { addr: '—', cap: '—', tram: '—' };
  const lineup = LINEUPS[ev.id] || [];
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48, padding: '60px 0', borderTop: '1px solid #0a0a0a' }}>
      <div>
        <img src={ev.poster} alt={ev.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 12 }}>
          Poster · designed by Ascension Studio
        </div>
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
          <a style={{ background: '#0a0a0a', color: '#fafafa', padding: '14px 22px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11, whiteSpace: 'nowrap' }}>
            Buy ticket · {ev.price} →
          </a>
        </div>

        {/* Lineup + venue grid */}
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
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 13, opacity: .7, marginTop: 6, textWrap: 'pretty' }}>
              {venueInfo.addr}
            </div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 14 }}>{venueInfo.cap}</div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 4 }}>{venueInfo.tram}</div>
            <a style={{ display: 'inline-block', marginTop: 16, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2, ...monoStyles.mono, fontSize: 10, textDecoration: 'none' }}>
              Open in maps →
            </a>
          </div>
        </div>
      </div>
    </article>);

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
        photo="assets/gallery/g08.jpg"
        height={560} />
      

      <section style={{ padding: '40px 48px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid rgba(10,10,10,.15)' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {['All', 'Summer Festival', 'Intro 2026'].map((t, i) =>
            <span key={t} style={{
              ...monoStyles.mono, fontSize: 11, padding: '8px 14px',
              border: '1px solid', borderColor: i === 0 ? '#0a0a0a' : 'transparent',
              background: i === 0 ? '#0a0a0a' : 'transparent',
              color: i === 0 ? '#fafafa' : '#0a0a0a',
              cursor: 'pointer'
            }}>{t}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 20, ...monoStyles.mono, fontSize: 10, opacity: .65 }}>
            <span>Sort · Date ↓</span>
            <span>View · List</span>
          </div>
        </div>

        {EVENTS.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
        <div style={{ borderTop: '1px solid #0a0a0a' }} />

        {/* archive callout */}
        <div style={{ marginTop: 60, padding: '36px 40px', background: '#0a0a0a', color: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>Looking for past shows?</div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, marginTop: 6, letterSpacing: '-0.02em' }}>
              <span style={{ fontStyle: 'italic' }}>120+ archived</span> shows since 2018
            </div>
          </div>
          <a style={{ background: '#fafafa', color: '#0a0a0a', padding: '16px 24px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
            Browse archive →
          </a>
        </div>
      </section>

      <MonoFooter />
    </div>);

}

// ───────────────────────────────────────────────────────────────────────
// CONTACT
// ───────────────────────────────────────────────────────────────────────

const CONTACTS = [
{ dept: 'General', email: 'info@ascensionfestival.nl', desc: 'Questions about tickets, the venue, lost & found, dress code — anything ticket-holder related.', sla: 'Reply within 24h' },
{ dept: 'Bookings', email: 'info@ascensionfestival.nl', desc: 'Artist bookings, agent enquiries, b2b proposals. Send us a SoundCloud link and a recent set.', sla: '3 — 5 business days' },
{ dept: 'Press', email: 'info@ascensionfestival.nl', desc: 'Press kit, interviews, photographer accreditation, brand collabs and partnerships.', sla: 'Reply within 48h' },
{ dept: 'Safety', email: 'info@ascensionfestival.nl', desc: 'Reach our safer-space team. Confidential, 24/7 monitored during shows.', sla: 'Always on during shows' }];


function ContactPage() {
  return (
    <div style={pageRoot}>
      <PageHeader
        eyebrow="§ 04 — Contact"
        title="Say"
        italic="hello."
        lead="We're one person, one inbox, and we answer everything ourselves. No bots, no canned replies, just me."
        subhead={['Eindhoven, NL', 'CET / CEST timezone']}
        photo="assets/gallery/g17.jpg"
        height={560} />
      

      {/* department cards */}
      <section style={{ padding: '80px 48px 48px' }}>
        <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 28 }}>Who to email</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {CONTACTS.map((c, i) =>
          <div key={c.dept} style={{ border: '1px solid #0a0a0a', padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>{c.sla}</div>
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 40, letterSpacing: '-0.025em', marginTop: 10, lineHeight: 1 }}>
                <span style={{ fontStyle: 'italic' }}>{c.dept}</span>
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, lineHeight: 1.6, opacity: .65, marginTop: 16, maxWidth: 460, textWrap: 'pretty' }}>
                {c.desc}
              </div>
              <a style={{ display: 'inline-block', marginTop: 22, fontFamily: 'Montserrat', fontWeight: 500, fontSize: 16, color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 4, letterSpacing: '-0.005em', textDecoration: 'none' }}>
                {c.email} →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* form + sidebar */}
      <section style={{ padding: '40px 48px 80px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60 }}>
        <div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>Or use the form</div>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 48, letterSpacing: '-0.025em', margin: '0 0 36px', lineHeight: 1 }}>
            <span style={{ fontStyle: 'italic' }}>Write</span> us.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
            <div>
              <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>Name</div>
              <div style={{ borderBottom: '1px solid #0a0a0a', padding: '10px 0', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, opacity: .5 }}>Sam de Vries</div>
            </div>
            <div>
              <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>Email</div>
              <div style={{ borderBottom: '1px solid #0a0a0a', padding: '10px 0', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, opacity: .5 }}>sam@tue.nl</div>
            </div>
            <div>
              <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>Department</div>
              <div style={{ borderBottom: '1px solid #0a0a0a', padding: '10px 0', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, opacity: .5 }}>General ▾</div>
            </div>
            <div>
              <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>Subject</div>
              <div style={{ borderBottom: '1px solid #0a0a0a', padding: '10px 0', fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, opacity: .5 }}>Lost jacket at intro</div>
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9 }}>Your message</div>
            <div style={{ borderBottom: '1px solid #0a0a0a', padding: '10px 0', minHeight: 160, fontFamily: 'Montserrat', fontWeight: 400, fontSize: 17, opacity: .4, textWrap: 'pretty' }}>
              Hi team — I think I left my black North Face jacket at the cloakroom on Oct 3. There's a Tikkie receipt in the inside pocket. Hope it's still there…
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36 }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}>
              By sending you accept the privacy policy.
            </div>
            <a style={{ background: '#0a0a0a', color: '#fafafa', padding: '18px 32px', textDecoration: 'none', ...monoStyles.mono, fontSize: 11 }}>
              Send message →
            </a>
          </div>
        </div>

        <aside>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>HQ</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            <span style={{ fontStyle: 'italic' }}>Ascension Studio</span><br />
            Dommelstraat 14<br />
            5611 CJ Eindhoven<br />
            The Netherlands
          </div>
          <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginTop: 20 }}>
            KvK 78xxxxxx · BTW NL00xxxxxxB01
          </div>

          <div style={{ marginTop: 40 }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10, marginBottom: 14 }}>Follow</div>
            {[
            ['Instagram', '@ascensionfestival.nl'],
            ['TikTok', '@ascensionfestival'],
            ['Spotify', 'Ascension Crew Rotations'],
            ['SoundCloud', '/ascension-eindhoven']].
            map(([k, v]) =>
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(10,10,10,.12)' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: 14 }}>{k}</span>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 14, opacity: .65 }}>{v}</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 40, padding: '20px 24px', background: '#0a0a0a', color: '#fafafa' }}>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 10 }}></div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 22, marginTop: 8, letterSpacing: '-0.015em', fontVariantNumeric: 'tabular-nums' }}>

            </div>
            <div style={{ ...monoStyles.mono, opacity: .55, fontSize: 9, marginTop: 8, textWrap: 'pretty' }}>

            </div>
          </div>
        </aside>
      </section>

      <MonoFooter />
    </div>);

}

Object.assign(window, { TicketsPage, GalleryPage, EventsPage, ContactPage });