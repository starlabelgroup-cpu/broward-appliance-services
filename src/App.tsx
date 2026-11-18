import { useEffect, useMemo, useState } from 'react'
import {
  ALL_ROUTES, ALT_DOMAIN, BRAND, CITIES, EMAIL, OPERATOR, PHONE_DISPLAY, PHONE_SMS, PHONE_TEL,
  SERVICES, SERVICE_OS_URL, cityById, cityPath, comboPath, resolveRoute, seoFor, serviceById, servicePath,
  type Route,
} from './fleet'
import { Icon, Logo } from './icons'
import {
  TIME_WINDOWS, buildBookingPayload, submitBooking, validateBooking,
  type Attribution, type BookingForm as BookingFormData,
} from './submit'

/* ─── Routing (real paths, History API) ───────────────────────── */

export function navigate(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}

function Link({ to, className, children, ariaLabel }: {
  to: string
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

function useRoute(): Route {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return useMemo(() => resolveRoute(path), [path])
}

/** First-touch landing attribution (UTM + ad-platform click IDs),
 *  passed through to Service OS with every booking. */
function useAttribution(): Attribution {
  return useMemo(() => {
    const p = new URLSearchParams(window.location.search)
    const attribution: Attribution = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid', 'msclkid'] as const) {
      const v = p.get(k)
      if (v) attribution[k] = v
    }
    return attribution
  }, [])
}

function useSeo(route: Route) {
  useEffect(() => {
    const seo = seoFor(route)
    document.title = seo.title
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = seo.description
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://browardapplianceservice.com${route.path}`
  }, [route])
}

/* ─── App shell ───────────────────────────────────────────────── */

const NAV: { path: string; label: string; kinds: Route['kind'][] }[] = [
  { path: '/', label: 'Home', kinds: ['hub'] },
  { path: '/services', label: 'Services', kinds: ['services', 'service', 'combo'] },
  { path: '/areas-served', label: 'Areas Served', kinds: ['areas', 'city'] },
  { path: '/system', label: 'System Index', kinds: ['system'] },
]

export default function App() {
  const route = useRoute()
  useSeo(route)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.path])

  return (
    <>
      <div className="topbar">
        <div className="topbar-in">
          <span className="tb-item"><Icon name="pin" size={14} /> Appliance repair across Broward County, Florida</span>
          <span className="tb-item">
            Call or text <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <span aria-hidden>·</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
        </div>
      </div>

      <header className="site">
        <div className="header-in">
          <Link to="/" className="brand" ariaLabel={`${BRAND} — home`}>
            <Logo size={42} />
            <span>
              <span className="brand-name">Broward Appliance<br />Services</span>
              <span className="brand-sub">Operated by {OPERATOR}</span>
            </span>
          </Link>
          <nav className="main" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.path} to={n.path} className={n.kinds.includes(route.kind) ? 'on' : ''}>{n.label}</Link>
            ))}
          </nav>
          <div className="header-cta">
            <a className="btn btn-ghost btn-sm" href={PHONE_TEL}><Icon name="phone" size={16} /> {PHONE_DISPLAY}</a>
            <Link to="/book" className="btn btn-amber btn-sm">Book a Repair</Link>
          </div>
        </div>
        <div className="mobile-nav" aria-label="Main mobile">
          {NAV.map((n) => (
            <Link key={n.path} to={n.path} className={n.kinds.includes(route.kind) ? 'on' : ''}>{n.label}</Link>
          ))}
          <Link to="/book">Book</Link>
        </div>
      </header>

      <main>
        {route.kind === 'hub' && <Hub />}
        {route.kind === 'services' && <ServicesIndex />}
        {route.kind === 'areas' && <AreasIndex />}
        {route.kind === 'service' && <ServicePage serviceId={route.serviceId} />}
        {route.kind === 'city' && <CityPage cityId={route.cityId} />}
        {route.kind === 'combo' && <ComboPage serviceId={route.serviceId} cityId={route.cityId} />}
        {route.kind === 'book' && <BookPage />}
        {route.kind === 'system' && <SystemIndex />}
      </main>

      <Footer />
    </>
  )
}

/* ─── Shared bits ─────────────────────────────────────────────── */

function CtaRow({ serviceId, cityId }: { serviceId?: string; cityId?: string }) {
  const qs = new URLSearchParams()
  if (serviceId) qs.set('service', serviceId)
  if (cityId) qs.set('city', cityId)
  const bookPath = qs.toString() ? `/book?${qs.toString()}` : '/book'
  return (
    <div className="hero-ctas">
      <a className="btn btn-amber" href={PHONE_TEL}><Icon name="phone" size={18} /> Call {PHONE_DISPLAY}</a>
      <a className="btn btn-outline-light" href={PHONE_SMS}><Icon name="chat" size={18} /> Text us</a>
      <Link to={bookPath} className="btn btn-teal"><Icon name="calendar" size={18} /> Book through Service OS</Link>
    </div>
  )
}

function HowItWorks() {
  return (
    <div className="card flat">
      <h3>How booking works</h3>
      <ul className="checklist mt">
        <li><Icon name="check" size={16} /> <span><strong>Send the request.</strong> Use the form on this page or call {PHONE_DISPLAY}. It lands directly in Top Speed Service OS.</span></li>
        <li><Icon name="check" size={16} /> <span><strong>A setter confirms.</strong> A human Service Setter calls you to confirm the job, the appliance and the time window — and the pricing — before anything is dispatched.</span></li>
        <li><Icon name="check" size={16} /> <span><strong>The technician visits.</strong> Diagnosis first, then the repair is explained and agreed with you before work begins.</span></li>
      </ul>
      <div className="notice notice-info mt">
        <Icon name="shield" size={20} />
        <p><strong>No prices on this site — on purpose.</strong> Pricing depends on the appliance, the model and the fault, so it is confirmed by the setter when you book, before any work begins.</p>
      </div>
    </div>
  )
}

function ProblemList({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((p) => (
        <li key={p}><Icon name="wrench" size={16} /> <span>{p}</span></li>
      ))}
    </ul>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((p) => (
        <li key={p}><Icon name="check" size={16} /> <span>{p}</span></li>
      ))}
    </ul>
  )
}

/* ─── Hub ─────────────────────────────────────────────────────── */

function Hub() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <span className="pill pill-light"><Icon name="bolt" size={14} /> A {OPERATOR} fleet brand</span>
          <h1>Appliance repair in Broward County, organized like a system.</h1>
          <p className="lede">
            {BRAND} is the landing-page fleet of {OPERATOR}: ten repair services, sixteen Broward
            cities, and a dedicated page for every service in every city — {ALL_ROUTES.length} pages
            in total, all booking into the same Service OS setters.
          </p>
          <CtaRow />
          <div className="hero-stats">
            <div><strong>{SERVICES.length}</strong><span>repair services</span></div>
            <div><strong>{CITIES.length}</strong><span>Broward cities</span></div>
            <div><strong>{SERVICES.length * CITIES.length}</strong><span>service × city pages</span></div>
            <div><strong>1</strong><span>booking system — Service OS</span></div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <h2>Repair services</h2>
            <Link to="/services" className="more-link">All services <Icon name="arrow" size={15} /></Link>
          </div>
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <Link key={s.id} to={servicePath(s)} className="card service-card">
                <span className="icon-badge"><Icon name={s.icon} size={26} /></span>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <span className="card-link">View service <Icon name="arrow" size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="section-head">
            <h2>Core coverage cities</h2>
            <Link to="/areas-served" className="more-link">All 16 cities <Icon name="arrow" size={15} /></Link>
          </div>
          <div className="grid grid-4">
            {CITIES.filter((c) => c.core).map((c) => (
              <Link key={c.id} to={cityPath(c)} className="card city-card">
                <span className="icon-badge"><Icon name="pin" size={22} /></span>
                <h3>{c.name}</h3>
                <p>Appliance repair in {c.name}, FL — all {SERVICES.length} services.</p>
              </Link>
            ))}
          </div>
          <p className="fineprint mt">
            Also covering {CITIES.filter((c) => !c.core).map((c) => c.name).join(', ')} — see the
            full <Link to="/areas-served">areas served</Link> list.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap split">
          <div>
            <h2>One fleet, one booking system</h2>
            <p className="mt">
              Every page in this fleet — whether you land on a service page, a city page, or a
              service-by-city page like <em>Refrigerator Repair in Coral Springs</em> — books into
              the same place: Top Speed Service OS, where human Service Setters confirm each job
              before a technician is dispatched. No page in the fleet takes payment or confirms a
              price on its own.
            </p>
            <p className="mt">
              The fleet also runs on {ALT_DOMAIN}. Both domains serve the same system and the
              same setters.
            </p>
            <div className="mt">
              <Link to="/system" className="btn btn-teal"><Icon name="list" size={17} /> Browse the full system index</Link>
            </div>
          </div>
          <HowItWorks />
        </div>
      </section>
    </>
  )
}

/* ─── Index pages ─────────────────────────────────────────────── */

function ServicesIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Appliance repair services</h1>
          <p>Ten services, each with its own page — and a dedicated landing page in every one of the {CITIES.length} cities we cover.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <Link key={s.id} to={servicePath(s)} className="card service-card">
                <span className="icon-badge"><Icon name={s.icon} size={26} /></span>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <span className="card-link">{CITIES.length} city pages <Icon name="arrow" size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function AreasIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Areas served</h1>
          <p>Sixteen Broward County cities. Pick yours to see every repair service available there.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="grid grid-4">
            {CITIES.map((c) => (
              <Link key={c.id} to={cityPath(c)} className="card city-card">
                <span className="icon-badge"><Icon name="pin" size={22} /></span>
                <h3>{c.name}{c.core && <span className="core-tag">Core</span>}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Service page ────────────────────────────────────────────── */

function ServicePage({ serviceId }: { serviceId: string }) {
  const s = serviceById(serviceId)
  if (!s) return <Hub />
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="pill pill-light"><Icon name={s.icon} size={14} /> Service</span>
          <h1>{s.name} in Broward County, FL</h1>
          <p>{s.intro}</p>
          <div className="mt"><CtaRow serviceId={s.id} /></div>
        </div>
      </div>
      <section className="block">
        <div className="wrap split">
          <div>
            <h2>Common {s.short.toLowerCase()} problems we handle</h2>
            <div className="mt"><ProblemList items={s.problems} /></div>
            <h2 className="mt-lg">What the technician checks</h2>
            <div className="mt"><CheckList items={s.checks} /></div>
            <h2 className="mt-lg">Before the visit</h2>
            <div className="mt"><CheckList items={s.prep} /></div>
          </div>
          <div className="stack">
            <BookingCard serviceId={s.id} />
            <HowItWorks />
          </div>
        </div>
      </section>
      <section className="block alt">
        <div className="wrap">
          <div className="section-head">
            <h2>{s.name} by city</h2>
          </div>
          <div className="link-cloud">
            {CITIES.map((c) => (
              <Link key={c.id} to={comboPath(s, c)}>{s.short} repair in {c.name}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── City page ───────────────────────────────────────────────── */

function CityPage({ cityId }: { cityId: string }) {
  const c = cityById(cityId)
  if (!c) return <Hub />
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="pill pill-light"><Icon name="pin" size={14} /> {c.core ? 'Core coverage city' : 'Coverage city'}</span>
          <h1>Appliance Repair in {c.name}, FL</h1>
          <p>{c.blurb} Every service below has a dedicated {c.name} landing page, and every booking routes to the same Service OS setters.</p>
          <div className="mt"><CtaRow cityId={c.id} /></div>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <Link key={s.id} to={comboPath(s, c)} className="card service-card">
                <span className="icon-badge"><Icon name={s.icon} size={26} /></span>
                <h3>{s.name} — {c.name}</h3>
                <p>{s.tagline}</p>
                <span className="card-link">View page <Icon name="arrow" size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="block alt">
        <div className="wrap split">
          <BookingCard cityId={c.id} />
          <HowItWorks />
        </div>
      </section>
    </>
  )
}

/* ─── Service × city landing page ─────────────────────────────── */

function ComboPage({ serviceId, cityId }: { serviceId: string; cityId: string }) {
  const s = serviceById(serviceId)
  const c = cityById(cityId)
  if (!s || !c) return <Hub />
  const otherCities = CITIES.filter((x) => x.id !== c.id)
  const otherServices = SERVICES.filter((x) => x.id !== s.id)
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="pill pill-light"><Icon name={s.icon} size={14} /> {c.name}, Florida</span>
          <h1>{s.name} in {c.name}, FL</h1>
          <p>{s.tagline} {c.blurb}</p>
          <div className="mt"><CtaRow serviceId={s.id} cityId={c.id} /></div>
        </div>
      </div>
      <section className="block">
        <div className="wrap split">
          <div>
            <h2>{s.short} problems we handle in {c.name}</h2>
            <div className="mt"><ProblemList items={s.problems} /></div>
            <h2 className="mt-lg">What the visit covers</h2>
            <p className="mt">{s.intro}</p>
            <div className="mt"><CheckList items={s.checks} /></div>
            <h2 className="mt-lg">Before the visit</h2>
            <div className="mt"><CheckList items={s.prep} /></div>
          </div>
          <div className="stack">
            <BookingCard serviceId={s.id} cityId={c.id} />
            <HowItWorks />
          </div>
        </div>
      </section>
      <section className="block alt">
        <div className="wrap">
          <div className="section-head"><h2>{s.name} in other cities</h2></div>
          <div className="link-cloud">
            {otherCities.map((x) => (
              <Link key={x.id} to={comboPath(s, x)}>{s.short} repair in {x.name}</Link>
            ))}
          </div>
          <div className="section-head mt-lg"><h2>Other services in {c.name}</h2></div>
          <div className="link-cloud">
            {otherServices.map((x) => (
              <Link key={x.id} to={comboPath(x, c)}>{x.name} in {c.name}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Booking ─────────────────────────────────────────────────── */

function BookingCard({ serviceId, cityId }: { serviceId?: string; cityId?: string }) {
  return (
    <div className="card flat">
      <h3>Book this repair</h3>
      <p className="mt-sm muted">Send the request now — a setter confirms by phone.</p>
      <div className="mt">
        <BookingForm serviceId={serviceId} cityId={cityId} compact />
      </div>
    </div>
  )
}

function BookingForm({ serviceId, cityId, compact }: { serviceId?: string; cityId?: string; compact?: boolean }) {
  const attribution = useAttribution()
  const svc = serviceById(serviceId)
  const cty = cityById(cityId)
  const [form, setForm] = useState<BookingFormData>({
    name: '', phone: '', zip: '',
    service: svc?.name ?? '',
    appliance: '',
    problem: '',
    city: cty?.name ?? '',
    window: 'First available',
  })
  const [state, setState] = useState<
    | { kind: 'idle' }
    | { kind: 'sending' }
    | { kind: 'error'; message: string }
    | { kind: 'done'; reference: string }
  >({ kind: 'idle' })

  const set = (k: keyof BookingFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateBooking(form)
    if (err) {
      setState({ kind: 'error', message: err })
      return
    }
    setState({ kind: 'sending' })
    try {
      const { reference } = await submitBooking(
        buildBookingPayload(form, attribution, window.location.pathname),
      )
      setState({ kind: 'done', reference })
    } catch {
      setState({
        kind: 'error',
        message: `The request could not be sent just now. Please call ${PHONE_DISPLAY} or email ${EMAIL} and we will book you in directly.`,
      })
    }
  }

  if (state.kind === 'done') {
    return (
      <div className="notice notice-ok">
        <Icon name="check" size={20} />
        <p>
          <strong>Request received — reference {state.reference}.</strong><br />
          Your booking is in Top Speed Service OS. A Service Setter will call {form.phone || 'you'}
          to confirm the job, the time window and the pricing before a technician is dispatched.
        </p>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-grid">
        <label className="f">Your name<input required value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" /></label>
        <label className="f">Phone (call/text)<input required value={form.phone} onChange={set('phone')} placeholder="Best number for the setter" autoComplete="tel" /></label>
        <label className="f">ZIP code<input required value={form.zip} onChange={set('zip')} placeholder="e.g. 33076" autoComplete="postal-code" inputMode="numeric" /></label>
        <label className="f">Service
          <select required value={form.service} onChange={set('service')}>
            <option value="">Select a service…</option>
            {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </label>
        <label className="f">City
          <select required value={form.city} onChange={set('city')}>
            <option value="">Select your city…</option>
            {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </label>
        <label className="f">Appliance (brand / model if known)<input value={form.appliance} onChange={set('appliance')} placeholder="e.g. Samsung French-door fridge" /></label>
        <label className="f">Preferred time
          <select value={form.window} onChange={set('window')}>
            {TIME_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </label>
        <label className="f full">What’s the problem?<textarea required rows={compact ? 3 : 4} value={form.problem} onChange={set('problem')} placeholder="Describe the symptom — noises, leaks, error codes, when it started…" /></label>
      </div>
      {state.kind === 'error' && (
        <div className="notice notice-err mt"><Icon name="alert" size={18} /><p>{state.message}</p></div>
      )}
      <button className="btn btn-amber mt" type="submit" disabled={state.kind === 'sending'}>
        <Icon name="calendar" size={17} /> {state.kind === 'sending' ? 'Sending to Service OS…' : 'Send booking request'}
      </button>
      <p className="fineprint mt-sm">Submitting sends your request into Top Speed Service OS. A setter confirms every booking by phone — nothing is dispatched from this form alone.</p>
    </form>
  )
}

function BookPage() {
  const params = useMemo(() => new URLSearchParams(window.location.search), [])
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Book a repair</h1>
          <p>One form for the whole fleet. Your request goes straight into Top Speed Service OS, where a Service Setter confirms it by phone.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap split">
          <div className="card flat">
            <BookingForm serviceId={params.get('service') ?? undefined} cityId={params.get('city') ?? undefined} />
          </div>
          <div className="stack">
            <HowItWorks />
            <div className="card flat">
              <h3>Prefer to talk?</h3>
              <p className="mt-sm muted">Call or text the setters directly, or email the details.</p>
              <div className="mt" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a className="btn btn-amber" href={PHONE_TEL}><Icon name="phone" size={16} /> {PHONE_DISPLAY}</a>
                <a className="btn btn-outline" href={`mailto:${EMAIL}`}><Icon name="mail" size={16} /> {EMAIL}</a>
              </div>
              <p className="fineprint mt">Bookings are also taken at <a href={SERVICE_OS_URL} target="_blank" rel="noreferrer">topspeedserviceos.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── System index ────────────────────────────────────────────── */

const KIND_LABEL: Record<Route['kind'], string> = {
  hub: 'Hub',
  services: 'Index',
  areas: 'Index',
  book: 'Booking',
  system: 'System',
  service: 'Service page',
  city: 'City page',
  combo: 'Service × City',
}

function SystemIndex() {
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<string>('all')
  const rows = useMemo(() => {
    const query = q.trim().toLowerCase()
    return ALL_ROUTES.filter((r) => {
      if (kind !== 'all' && r.kind !== kind) return false
      if (!query) return true
      return r.path.toLowerCase().includes(query) || seoFor(r).title.toLowerCase().includes(query)
    }).map((r) => ({ route: r, seo: seoFor(r) }))
  }, [q, kind])

  const counts = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of ALL_ROUTES) m.set(r.kind, (m.get(r.kind) ?? 0) + 1)
    return m
  }, [])

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="pill pill-light"><Icon name="layers" size={14} /> System dashboard</span>
          <h1>System Index — every page in the fleet</h1>
          <p>
            The {BRAND} fleet is generated from one data source: {SERVICES.length} services × {CITIES.length} cities.
            This index lists all {ALL_ROUTES.length} live routes the system generates, with the exact URL of each page.
          </p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="hero-stats dark">
            <div><strong>{ALL_ROUTES.length}</strong><span>total routes</span></div>
            <div><strong>{counts.get('service') ?? 0}</strong><span>service pages</span></div>
            <div><strong>{counts.get('city') ?? 0}</strong><span>city pages</span></div>
            <div><strong>{counts.get('combo') ?? 0}</strong><span>service × city pages</span></div>
          </div>

          <div className="index-tools">
            <label className="search-box">
              <Icon name="search" size={17} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by URL or title — try “dryer” or “weston”" />
            </label>
            <div className="chip-row">
              {['all', 'hub', 'service', 'city', 'combo', 'services', 'areas', 'book', 'system'].map((k) => (
                <button key={k} className={`chip ${kind === k ? 'on' : ''}`} onClick={() => setKind(k)}>
                  {k === 'all' ? 'All' : KIND_LABEL[k as Route['kind']]}
                </button>
              ))}
            </div>
          </div>

          <p className="fineprint">Showing {rows.length} of {ALL_ROUTES.length} routes.</p>
          <div className="table-wrap mt">
            <table className="index-table">
              <thead>
                <tr><th>#</th><th>Type</th><th>Page title</th><th>URL</th></tr>
              </thead>
              <tbody>
                {rows.map(({ route, seo }, i) => (
                  <tr key={route.path}>
                    <td className="num">{i + 1}</td>
                    <td><span className="kind-tag">{KIND_LABEL[route.kind]}</span></td>
                    <td>{seo.title.split('|')[0].trim()}</td>
                    <td><Link to={route.path} className="url-link">{route.path}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Footer ──────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="site">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <Logo size={38} />
            <span>
              <span className="brand-name">Broward Appliance<br />Services</span>
              <span className="brand-sub">Operated by {OPERATOR}</span>
            </span>
          </Link>
          <p>
            A landing-page fleet of {OPERATOR}. Every page books into Top Speed
            Service OS, where Service Setters confirm each job by phone.
          </p>
          <p>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {SERVICES.slice(0, 5).map((s) => <li key={s.id}><Link to={servicePath(s)}>{s.name}</Link></li>)}
            <li><Link to="/services">All services</Link></li>
          </ul>
        </div>
        <div>
          <h4>Top cities</h4>
          <ul>
            {CITIES.filter((c) => c.core).map((c) => <li key={c.id}><Link to={cityPath(c)}>Appliance repair in {c.name}</Link></li>)}
            <li><Link to="/areas-served">All 16 cities</Link></li>
          </ul>
        </div>
        <div>
          <h4>System</h4>
          <ul>
            <li><Link to="/book">Book a repair</Link></li>
            <li><Link to="/system">System index — {ALL_ROUTES.length} pages</Link></li>
            <li><a href={SERVICE_OS_URL} target="_blank" rel="noreferrer">Top Speed Service OS</a></li>
            <li><a href={`https://${ALT_DOMAIN}`}>{ALT_DOMAIN}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {OPERATOR} — {BRAND}. No prices are published on this site; pricing is confirmed when you book.</span>
      </div>
    </footer>
  )
}
