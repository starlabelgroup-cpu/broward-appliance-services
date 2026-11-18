// ─── Broward Appliance Services — landing page fleet data ───────────────────
// One data source drives the whole fleet: 10 service pages, 16 city pages
// and 160 service × city landing pages are generated from the records below.
// Real business facts only. No prices, hours, street addresses, ratings,
// review counts, technician counts or guarantees appear anywhere in this app.

export const BRAND = 'Broward Appliance Services'
export const OPERATOR = 'Top Speed Appliance'
export const SITE_URL = 'https://browardapplianceservices.com'
export const ALT_DOMAIN = 'browardappliancepros.com'
export const PHONE_DISPLAY = '954-931-7997'
export const PHONE_TEL = 'tel:+19549317997'
export const PHONE_SMS = 'sms:+19549317997'
export const EMAIL = 'service@topspeedappliance.net'
export const SERVICE_OS_URL = 'https://topspeedserviceos.com'

export interface Service {
  id: string
  /** Short appliance name, e.g. "Refrigerator" */
  short: string
  /** Full service name, e.g. "Refrigerator Repair" */
  name: string
  icon: string
  tagline: string
  intro: string
  problems: string[]
  checks: string[]
  prep: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'refrigerator',
    short: 'Refrigerator',
    name: 'Refrigerator Repair',
    icon: 'fridge',
    tagline: 'Warm fridge, leaking water, strange noises — diagnosed properly.',
    intro:
      'A refrigerator that is not holding temperature puts the whole grocery run at risk. Our technicians trace cooling, airflow and defrost faults methodically, explain what they find in plain language, and confirm the repair plan with you before any work starts.',
    problems: [
      'Fresh-food section warm while the freezer stays cold',
      'Not cooling at all, or colder than the setting on one side',
      'Water pooling under the crisper drawers or on the floor',
      'Constant running, loud humming, buzzing or clicking',
      'Heavy frost building up on the back wall of the freezer',
      'Ice maker stopped producing, or cubes taste off',
    ],
    checks: [
      'Condenser coils, condenser fan and evaporator fan operation',
      'Compressor start components and running current draw',
      'Temperature sensors, thermostat and control board signals',
      'Defrost heater, defrost sensor and drain line condition',
      'Door gaskets, hinges and door switch alignment',
      'Air damper and vents between freezer and fresh-food sections',
    ],
    prep: [
      'Note the temperatures you are seeing in each section, if you can',
      'Write down any error code shown on the display',
      'Clear a path to the fridge and the water shut-off valve behind it',
    ],
  },
  {
    id: 'washer',
    short: 'Washer',
    name: 'Washer Repair',
    icon: 'washer',
    tagline: 'Won’t drain, spin or start — front-load and top-load machines.',
    intro:
      'A dead washer backs up the whole household fast. We work through drain, drive and control faults on front-load and top-load machines, test a full cycle after the repair, and tell you honestly when a machine is not worth another repair.',
    problems: [
      'Tub full of water that will not drain',
      'Loads come out soaking because the spin never engages',
      'Leaks from the door boot, hoses or underneath the machine',
      'Violent shaking, banging or the washer walking across the floor',
      'Cycle stalls midway or the control shows an error code',
      'Fills very slowly, overfills, or will not fill at all',
    ],
    checks: [
      'Drain pump, drain hose and filter trap for blockages or wear',
      'Drive belt, motor, coupler and agitator dogs where fitted',
      'Door lock or lid switch and the control inputs behind them',
      'Hot and cold inlet valves, screens and the pressure switch',
      'Suspension rods or shock absorbers and tub balance',
      'Stored error codes and a monitored test cycle',
    ],
    prep: [
      'Note the error code if the display shows one',
      'Remove the load if you can do it without forcing the door',
      'Make sure the shut-off valves behind the machine are reachable',
    ],
  },
  {
    id: 'dryer',
    short: 'Dryer',
    name: 'Dryer Repair',
    icon: 'dryer',
    tagline: 'No heat, no tumble, or loads that never seem to dry.',
    intro:
      'Dryer faults are usually mechanical, electrical or airflow related — and airflow problems matter for safety as well as drying time. We test the heat circuit, the drum drive and the vent path, and flag any venting concern we find while we are there.',
    problems: [
      'Drum turns but the load stays cold and damp',
      'Drum will not tumble even though the motor hums',
      'Clothes need two or three cycles to dry',
      'Squealing, thumping or rumbling while it runs',
      'Dryer starts, then shuts itself off within minutes',
      'Dead machine — no lights, no response at all',
    ],
    checks: [
      'Heating element or gas burner and igniter operation (safety-checked)',
      'Thermal fuse, high-limit thermostat and cycling thermostat continuity',
      'Belt, idler pulley, drum rollers and motor',
      'Moisture sensor bars and timer or control output',
      'Lint path through the machine and the vent run to the wall',
      'Door switch and start circuit',
    ],
    prep: [
      'Clean the lint screen and note whether drying times changed gradually or suddenly',
      'Check whether the breaker tripped — dryers often sit on a double breaker',
      'Clear access to the back of the dryer if you can do so safely',
    ],
  },
  {
    id: 'oven-range',
    short: 'Oven & Range',
    name: 'Oven & Range Repair',
    icon: 'oven',
    tagline: 'Ovens that won’t heat true and burners that won’t light.',
    intro:
      'Uneven baking and dead burners usually trace back to a heating element, igniter, sensor or control fault. We verify temperatures against the setting, test each burner circuit, and safety-check gas ignition components on gas models.',
    problems: [
      'Oven heats slowly, unevenly, or not at all',
      'Temperature is off — food burns or undercooks at the set point',
      'Gas burner clicks but never lights, or lights with a whoosh',
      'One surface burner dead while the others work',
      'Oven door will not close or latch properly',
      'Error codes on the display, or the control panel is unresponsive',
    ],
    checks: [
      'Bake and broil elements for continuity and visible damage',
      'Gas igniter current draw and burner valve operation on gas models',
      'Oven temperature sensor resistance against specification',
      'Surface element switches, receptacles and wiring',
      'Control board outputs and relay behavior',
      'Door hinges, latch and gasket seal',
    ],
    prep: [
      'Note whether the fault affects bake, broil, or the cooktop — or everything',
      'Write down any error code before you clear it',
      'For gas smells, leave the house and call your gas utility first — before us',
    ],
  },
  {
    id: 'dishwasher',
    short: 'Dishwasher',
    name: 'Dishwasher Repair',
    icon: 'dishwasher',
    tagline: 'Dishes still dirty, water standing in the tub, leaks at the door.',
    intro:
      'Most dishwasher complaints come down to water in, water out, or spray pressure. We check the fill, wash and drain systems end to end, run a monitored cycle, and make sure the machine is level and sealing before we call it done.',
    problems: [
      'Dishes come out dirty or gritty after a full cycle',
      'Standing water left in the bottom of the tub',
      'Leaking from the door corners or underneath',
      'Will not start, or stops and beeps mid-cycle',
      'Grinding, rattling or unusually loud wash noise',
      'Detergent dispenser not opening during the cycle',
    ],
    checks: [
      'Inlet valve, fill level and float switch operation',
      'Wash pump, spray arms and the sump filter assembly',
      'Drain pump, drain hose routing and the air gap where fitted',
      'Door latch, gasket and hinge alignment',
      'Heating element and drying circuit',
      'Control inputs and a monitored full test cycle',
    ],
    prep: [
      'Scrape and rinse the filter at the bottom of the tub if your model has one',
      'Note whether the leak appears during fill, wash or drain',
      'Clear the cabinet under the sink so the shut-off valve is reachable',
    ],
  },
  {
    id: 'freezer-ice-maker',
    short: 'Freezer & Ice Maker',
    name: 'Freezer & Ice Maker Repair',
    icon: 'freezer',
    tagline: 'Soft ice cream, frost creep, or an ice maker that quit.',
    intro:
      'Freezers and ice makers fail quietly — food quality suffers long before the machine stops outright. We check temperatures under load, the defrost system, door sealing and the ice maker water path, and explain what is worth fixing and what is not.',
    problems: [
      'Food soft or thawing even at the coldest setting',
      'Thick frost coating the walls, shelves and packages',
      'Ice maker produces nothing, or only a few cubes a day',
      'Ice tastes or smells stale no matter how often it is dumped',
      'Freezer runs almost constantly and the cabinet feels warm',
      'Clicking or buzzing from the ice maker area',
    ],
    checks: [
      'Actual cabinet temperature under a normal load',
      'Evaporator fan, coils and the defrost heater and sensor',
      'Door gasket seal tested around the full perimeter',
      'Ice maker fill valve, water line and inlet tube for freezing or blockage',
      'Ice maker motor, mold thermostat and shut-off arm or sensor',
      'Condenser cleanliness and airflow around the cabinet',
    ],
    prep: [
      'Move anything irreplaceable to a cooler if the freezer is warming up',
      'Note whether the ice maker stopped suddenly or slowed down over weeks',
      'Check that the water line valve behind the fridge is open, if reachable',
    ],
  },
  {
    id: 'microwave',
    short: 'Microwave',
    name: 'Microwave Repair',
    icon: 'microwave',
    tagline: 'Runs but doesn’t heat, sparks, or a turntable that stopped.',
    intro:
      'Microwave faults range from door switches and turntable motors to the high-voltage side, which is serviced with proper discharge safety procedures. We start with the safe, common causes and tell you plainly when replacement makes more sense than repair.',
    problems: [
      'Runs and counts down but the food stays cold',
      'Sparking or arcing inside the cavity',
      'Turntable not rotating, or rotating roughly',
      'Keypad buttons dead or the display flickering',
      'Stops a few seconds after starting',
      'Door will not latch, or the unit will not start with the door closed',
    ],
    checks: [
      'Door interlock switches and latch alignment (safety-critical)',
      'High-voltage diode, capacitor and magnetron — tested with discharge precautions',
      'Turntable motor and roller ring condition',
      'Control board and keypad membrane response',
      'Cavity light, fan and internal fuse where fitted',
      'Waveguide cover condition when arcing is reported',
    ],
    prep: [
      'Stop using the microwave if it sparks — unplug it if you can do so safely',
      'Note whether it heats at all, or heats but much more slowly than before',
      'Have the model number from the door frame label handy if you can',
    ],
  },
  {
    id: 'cooktop',
    short: 'Cooktop',
    name: 'Cooktop Repair',
    icon: 'cooktop',
    tagline: 'Dead burners, runaway heat, cracked glass, ignition trouble.',
    intro:
      'Cooktop faults are usually a failed element, an infinite switch, an igniter or the control behind the glass. We test each burner position individually, check the wiring at the terminals, and verify heat control across the full range of settings.',
    problems: [
      'One burner completely dead while the rest work',
      'Burner only works on high, or overheats at low settings',
      'Gas burners click continuously or will not ignite',
      'Cracked or chipped glass top around a burner',
      'Hot-surface or burner-on indicator stuck lit',
      'Sparking at a burner base, or a burning smell from the controls',
    ],
    checks: [
      'Element continuity and terminal block condition on electric models',
      'Infinite switches and burner receptacles',
      'Spark module, igniter electrodes and burner caps on gas models',
      'Electronic touch controls and relay outputs on glass tops',
      'Indicator light circuits and wiring harness insulation',
      'Heat output at several settings, not just full power',
    ],
    prep: [
      'Note which burner positions are affected and which still work',
      'For gas models, note whether the clicking is constant or only when lighting',
      'Do not use a burner with cracked glass over it until it has been checked',
    ],
  },
  {
    id: 'garbage-disposal',
    short: 'Garbage Disposal',
    name: 'Garbage Disposal Repair',
    icon: 'disposal',
    tagline: 'Hums but won’t grind, jammed, leaking, or completely dead.',
    intro:
      'Most disposal calls are a jam, a tripped reset, a worn grind plate or a leak at a seal — quick to diagnose under the sink. We free jams safely, test the motor and splash guard seals, and check the drain connection while everything is open.',
    problems: [
      'Hums when switched on but does not grind',
      'Completely dead — no sound at all',
      'Leaks from the bottom of the unit or the sink flange',
      'Grinds poorly and the sink drains slowly',
      'Trips its reset button or the breaker repeatedly',
      'Unusual rattling — something may be loose inside',
    ],
    checks: [
      'Flywheel freedom and jam clearance with the power off',
      'Reset button, wall switch and power supply at the unit',
      'Motor windings and start behavior',
      'Sink flange, mounting ring and discharge seals for leaks',
      'Splash guard condition and drain line connection',
      'Grind plate and impeller wear',
    ],
    prep: [
      'Never put fingers inside the disposal — even with the switch off',
      'Try the red reset button on the bottom of the unit once; if it trips again, stop',
      'Clear out the under-sink cabinet so the unit is easy to reach',
    ],
  },
  {
    id: 'wine-cooler',
    short: 'Wine Cooler',
    name: 'Wine Cooler Repair',
    icon: 'wine',
    tagline: 'Temperatures drifting, noisy compressor, door seal failing.',
    intro:
      'A wine cooler has one job: hold a steady temperature. When it drifts, cycles loudly or sweats at the door, we check the cooling circuit, fans, sensors and seals, and verify the cabinet holds its set point across both zones on dual-zone models.',
    problems: [
      'Cabinet temperature drifts several degrees from the setting',
      'One zone holds temperature while the other does not',
      'Compressor cycles constantly or clicks without starting',
      'Condensation or frost forming inside the cabinet',
      'Door does not seal — cool air spilling at the corners',
      'Display shows an error, or the controls do not respond',
    ],
    checks: [
      'Actual cabinet temperature in each zone against the set point',
      'Evaporator and condenser fan operation',
      'Compressor start relay and running behavior',
      'Temperature sensors and control board inputs',
      'Door gasket seal, hinges and leveling',
      'Condenser coil cleanliness and ventilation clearance',
    ],
    prep: [
      'Note the set point and the temperature the display shows for each zone',
      'Check the unit has the ventilation clearance its manual calls for',
      'Move bottles away from the door if you need to show us a seal problem',
    ],
  },
]

export interface City {
  id: string
  name: string
  core: boolean
  blurb: string
}

export const CITIES: City[] = [
  { id: 'coral-springs', name: 'Coral Springs', core: true, blurb: 'Master-planned neighborhoods and family homes across Coral Springs, from The Hills to Eagle Trace — full fleet coverage for every appliance we service.' },
  { id: 'sunrise', name: 'Sunrise', core: true, blurb: 'From Sunrise Lakes to the homes around Sawgrass Mills, Sunrise households get the full range of repair services through this fleet.' },
  { id: 'plantation', name: 'Plantation', core: true, blurb: 'Plantation’s garden-city neighborhoods and condo communities are core fleet territory for every service on this site.' },
  { id: 'fort-lauderdale', name: 'Fort Lauderdale', core: true, blurb: 'High-rises on the beach, historic homes in Victoria Park and everything in between — Fort Lauderdale is a core fleet city.' },
  { id: 'coconut-creek', name: 'Coconut Creek', core: false, blurb: 'Coconut Creek homes, villas and condo communities are covered by the fleet for all ten repair services.' },
  { id: 'pompano-beach', name: 'Pompano Beach', core: false, blurb: 'From Harbor Village to the mainland neighborhoods, Pompano Beach is covered for the full service list.' },
  { id: 'deerfield-beach', name: 'Deerfield Beach', core: false, blurb: 'Deerfield Beach households — coastal condos and inland subdivisions alike — are part of the fleet’s coverage.' },
  { id: 'margate', name: 'Margate', core: false, blurb: 'Margate’s single-family homes and 55+ communities are covered for every appliance repair service we run.' },
  { id: 'tamarac', name: 'Tamarac', core: false, blurb: 'Tamarac neighborhoods and communities along Commercial Boulevard are covered by the fleet.' },
  { id: 'davie', name: 'Davie', core: false, blurb: 'Davie’s equestrian estates, townhomes and family subdivisions are covered for all ten services.' },
  { id: 'weston', name: 'Weston', core: false, blurb: 'Weston’s gated communities and townhomes are covered by the fleet for the full range of repairs.' },
  { id: 'parkland', name: 'Parkland', core: false, blurb: 'Parkland’s newer subdivisions and estate homes are covered for every service in the fleet.' },
  { id: 'lauderhill', name: 'Lauderhill', core: false, blurb: 'Lauderhill homes and condos are covered by the fleet for all ten repair services.' },
  { id: 'hollywood', name: 'Hollywood', core: false, blurb: 'From Hollywood Lakes to the beach condos, Hollywood households are covered for the full service list.' },
  { id: 'pembroke-pines', name: 'Pembroke Pines', core: false, blurb: 'Pembroke Pines subdivisions and townhome communities are covered by the fleet for every service.' },
  { id: 'miramar', name: 'Miramar', core: false, blurb: 'Miramar’s master-planned communities are covered for the full range of appliance repair services.' },
]

export function serviceById(id?: string): Service | null {
  return SERVICES.find((s) => s.id === id) ?? null
}
export function cityById(id?: string): City | null {
  return CITIES.find((c) => c.id === id) ?? null
}

/* ─── Routes ──────────────────────────────────────────────────── */

export type Route =
  | { kind: 'hub'; path: string }
  | { kind: 'services'; path: string }
  | { kind: 'areas'; path: string }
  | { kind: 'book'; path: string; serviceId?: string; cityId?: string }
  | { kind: 'system'; path: string }
  | { kind: 'service'; path: string; serviceId: string }
  | { kind: 'city'; path: string; cityId: string }
  | { kind: 'combo'; path: string; serviceId: string; cityId: string }

export const servicePath = (s: Service) => `/${s.id}-repair`
export const cityPath = (c: City) => `/appliance-repair-${c.id}`
export const comboPath = (s: Service, c: City) => `/${s.id}-repair-${c.id}`

export const STATIC_ROUTES: Route[] = [
  { kind: 'hub', path: '/' },
  { kind: 'services', path: '/services' },
  { kind: 'areas', path: '/areas-served' },
  { kind: 'book', path: '/book' },
  { kind: 'system', path: '/system' },
]

export const ALL_ROUTES: Route[] = [
  ...STATIC_ROUTES,
  ...SERVICES.map<Route>((s) => ({ kind: 'service', path: servicePath(s), serviceId: s.id })),
  ...CITIES.map<Route>((c) => ({ kind: 'city', path: cityPath(c), cityId: c.id })),
  ...SERVICES.flatMap<Route>((s) =>
    CITIES.map<Route>((c) => ({ kind: 'combo', path: comboPath(s, c), serviceId: s.id, cityId: c.id })),
  ),
]

const ROUTE_MAP = new Map<string, Route>(ALL_ROUTES.map((r) => [r.path, r]))

export function resolveRoute(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/book') {
    return { kind: 'book', path: '/book' }
  }
  return ROUTE_MAP.get(clean) ?? { kind: 'hub', path: '/' }
}

/* ─── SEO ─────────────────────────────────────────────────────── */

export interface Seo {
  title: string
  description: string
}

export function seoFor(route: Route): Seo {
  switch (route.kind) {
    case 'hub':
      return {
        title: `${BRAND} | Appliance Repair Across Broward County, FL`,
        description: `Appliance repair landing pages for 10 services across 16 Broward County cities — refrigerator, washer, dryer, oven, dishwasher and more. Operated by ${OPERATOR}. Call ${PHONE_DISPLAY} or book online through Service OS.`,
      }
    case 'services':
      return {
        title: `Appliance Repair Services | ${BRAND}`,
        description: `All 10 appliance repair services in the ${BRAND} fleet — refrigerators, washers, dryers, ovens, dishwashers, freezers, microwaves, cooktops, disposals and wine coolers, across Broward County.`,
      }
    case 'areas':
      return {
        title: `Areas Served — 16 Broward County Cities | ${BRAND}`,
        description: `The ${BRAND} fleet covers 16 Broward County cities including Coral Springs, Sunrise, Plantation and Fort Lauderdale. Find appliance repair pages for your city.`,
      }
    case 'book':
      return {
        title: `Book a Repair | ${BRAND}`,
        description: `Send a repair request straight into Top Speed Service OS. A Service Setter confirms every booking by phone before a technician is dispatched. Or call ${PHONE_DISPLAY}.`,
      }
    case 'system':
      return {
        title: `System Index — Every Landing Page | ${BRAND}`,
        description: `The complete index of the ${BRAND} landing page fleet: every service page, city page and service-by-city page generated by the system, with its live URL.`,
      }
    case 'service': {
      const s = serviceById(route.serviceId)!
      return {
        title: `${s.name} in Broward County, FL | ${BRAND}`,
        description: `${s.tagline} ${BRAND}, operated by ${OPERATOR}, covers ${s.short.toLowerCase()} repair in 16 Broward County cities. Call ${PHONE_DISPLAY} or book through Service OS.`,
      }
    }
    case 'city': {
      const c = cityById(route.cityId)!
      return {
        title: `Appliance Repair in ${c.name}, FL | ${BRAND}`,
        description: `Appliance repair in ${c.name}, Florida — all 10 services from ${BRAND}, operated by ${OPERATOR}. Refrigerators, washers, dryers, ovens and more. Call ${PHONE_DISPLAY}.`,
      }
    }
    case 'combo': {
      const s = serviceById(route.serviceId)!
      const c = cityById(route.cityId)!
      return {
        title: `${s.name} in ${c.name}, FL | ${BRAND}`,
        description: `${s.name} in ${c.name}, FL — ${s.tagline} Book with ${BRAND}, operated by ${OPERATOR}: call ${PHONE_DISPLAY} or send a request through Service OS.`,
      }
    }
  }
}
