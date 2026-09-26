/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CARNAK CONSTRUCTION — CENTRAL SITE CONTENT & CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every business fact, headline, and paragraph on the site lives in this file.
 *
 *  Search for "CONFIRM" to find every item that must be verified with the
 *  owner before publishing. Anything set to `null` is hidden until filled in.
 *
 *  Images: drop files into /public/images and set the matching `src` below
 *  (e.g. "/images/hero.jpg"). While `src` is null, an art-directed material
 *  placeholder renders in its place.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type MaterialKind = "brick" | "concrete" | "paving" | "roofing" | "stone" | "plan";

export type SiteImage = {
  /** Path under /public, e.g. "/images/hero.jpg". null = show placeholder. */
  src: string | null;
  /** Describe what the real photo shows. Required for accessibility. */
  alt: string;
  /** Placeholder texture used while src is null. */
  placeholder: MaterialKind;
};

export type ServiceIcon = "masonry" | "concrete" | "paving" | "roofing" | "restoration" | "general";
export type MarketIcon = "education" | "municipal" | "commercial" | "partnership";

/** CONFIRM: year founded. Set to null to remove every "Established" reference. */
const ESTABLISHED: number | null = 2002;

// Falls back to Vercel's production domain, then localhost, until a custom domain is set.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Carnak Construction",
  legalName: "Carnak Construction Inc.",
  wordmark: "CARNAK",
  wordmarkSub: ["Construction", "Inc."],
  url: siteUrl,

  established: ESTABLISHED,

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: {
    display: "(516) 593-6460",
    href: "tel:+15165936460",
    e164: "+1-516-593-6460",
  },
  /** CONFIRM: business email for bids. null hides it everywhere. */
  email: null as string | null,

  location: {
    city: "East Rockaway",
    region: "NY",
    regionName: "New York",
    country: "US",
    /** CONFIRM: street address + ZIP. null keeps it out of the page and schema. */
    streetAddress: null as string | null,
    postalCode: null as string | null,
  },
  serviceArea: ["New York City", "Long Island"],
  serviceAreaShort: "NYC & Long Island",

  /**
   * CONFIRM: Credentials statement. Hidden until `show` is true.
   * Only enable once the owner confirms insurance / bonding documentation can
   * be provided. Do not add license numbers, SCA status, union status or
   * certifications here unless the owner supplies documentation.
   */
  credentials: {
    show: false,
    statement: "Credentials, insurance, and bonding information available upon request.",
  },

  /** CONFIRM: set a URL (e.g. "/privacy") once a privacy policy exists. */
  privacyPolicyUrl: null as string | null,

  /**
   * Shows small "Project Photography Placeholder" captions over placeholder
   * imagery. Set to false to hide captions before real photos are ready.
   */
  showPlaceholderLabels: true,

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: "Carnak Construction | Masonry, Concrete & Institutional Construction | NYC & Long Island",
    description:
      "Carnak Construction provides masonry, concrete, paving, roofing, exterior restoration, and institutional construction services across New York City and Long Island. Send plans for review.",
    ogTitle: "Carnak Construction — Masonry, Concrete & Institutional Construction",
    ogDescription:
      "Masonry, concrete, paving, roofing, exterior restoration, and general construction for commercial, institutional, and public-sector work across New York City and Long Island.",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Markets", href: "#markets" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  primaryCta: { label: "Send Plans for Review", href: "#contact" },

  // ── Images (replace placeholders here) ────────────────────────────────────
  images: {
    hero: {
      src: null,
      alt: "Masonry façade detail on a New York building",
      placeholder: "brick",
    } as SiteImage,
    heroDetail: {
      src: null,
      alt: "Close view of finished concrete and masonry detailing",
      placeholder: "concrete",
    } as SiteImage,
    about: {
      src: null,
      alt: "Carnak Construction field work in the New York area",
      placeholder: "brick",
    } as SiteImage,
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Masonry · Concrete · Paving · Restoration",
    headline: "Masonry, Concrete & Institutional Construction Built to Last",
    /** Trailing words rendered in a secondary tone. Must match the end of headline. */
    headlineEmphasis: "Built to Last",
    subheadline:
      "Carnak Construction supports commercial, institutional, and public-sector projects across New York City and Long Island with masonry, concrete, paving, exterior restoration, roofing, and general construction services.",
    trustLine: [
      ...(ESTABLISHED ? [`Established ${ESTABLISHED}`] : []),
      "East Rockaway, NY",
      "Serving NYC & Long Island",
    ],
    placeholderCaption: "Project Photography Placeholder",
  },

  // ── Credibility strip ─────────────────────────────────────────────────────
  credibility: [
    ...(ESTABLISHED ? [{ label: "Established", value: String(ESTABLISHED) }] : []),
    { label: "Headquarters", value: "East Rockaway, NY" },
    { label: "Service Area", value: "NYC & Long Island" },
    { label: "Work Focus", value: "Commercial & Institutional" },
    { label: "Preconstruction", value: "Bid & Plan Review" },
  ],

  // ── Services ──────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Capabilities",
    heading: "Capabilities Built for Demanding Projects",
    intro:
      "Core trade capabilities across the building envelope and the site, scoped for general contractors, owners, and public-sector projects that need durable work and clear accountability.",
    items: [
      {
        id: "masonry",
        icon: "masonry" as ServiceIcon,
        material: "brick" as MaterialKind,
        division: "Div. 04",
        title: "Masonry & Brickwork",
        description:
          "Brick and block masonry for new construction, repair, and façade renewal. Carnak approaches masonry with attention to coursing, joint quality, and the details that keep water out and walls sound over time.",
        capabilities: ["Brick replacement", "CMU", "Lintels", "Pointing", "Façade repairs", "Exterior restoration"],
      },
      {
        id: "concrete",
        icon: "concrete" as ServiceIcon,
        material: "concrete" as MaterialKind,
        division: "Div. 03",
        title: "Concrete Construction",
        description:
          "Concrete for building and site scopes, from foundations and slabs to walks, curbs, and pads. Work is planned around formwork, placement, finishing, and curing so the result performs under load and weather.",
        capabilities: ["Foundations", "Slabs", "Site concrete", "Curbs & walks", "Pads", "Structural repairs"],
      },
      {
        id: "paving",
        icon: "paving" as ServiceIcon,
        material: "paving" as MaterialKind,
        division: "Div. 32",
        title: "Paving & Sitework",
        description:
          "Exterior improvements that people walk, drive, and rely on every day. Sidewalks, paving, curbs, and access areas are coordinated with site logistics, public access, and the adjacent work of other trades.",
        capabilities: ["Sidewalks", "Paving", "Curbs", "Access areas", "Exterior improvements", "Jobsite coordination"],
      },
      {
        id: "roofing",
        icon: "roofing" as ServiceIcon,
        material: "roofing" as MaterialKind,
        division: "Div. 07",
        title: "Roofing & Waterproofing",
        description:
          "Weather protection where roofing, masonry, and flashing meet. Roofing scopes are coordinated with the masonry interfaces and waterproofing details that decide whether a building envelope stays dry.",
        capabilities: ["Roofing coordination", "Flashing", "Masonry interfaces", "Waterproofing support", "Weather protection"],
      },
      {
        id: "restoration",
        icon: "restoration" as ServiceIcon,
        material: "stone" as MaterialKind,
        division: "Div. 04 · 07",
        title: "Exterior Restoration",
        description:
          "Durable repairs and upgrades for exterior envelopes and high-use facilities. Restoration work is sequenced to address deterioration at its source while keeping occupied buildings safe and operational.",
        capabilities: ["Envelope repairs", "Façade restoration", "Deterioration repair", "Exterior upgrades", "Occupied-site sequencing"],
      },
      {
        id: "general",
        icon: "general" as ServiceIcon,
        material: "plan" as MaterialKind,
        division: "Div. 01",
        title: "General Construction",
        description:
          "Renovation and restoration scopes that call for one accountable contractor in the field. Carnak supports public-work and commercial projects with subcontractor coordination, disciplined field execution, and organized closeout.",
        capabilities: ["Renovation", "Restoration", "Public-work support", "Subcontractor coordination", "Field execution", "Closeout support"],
      },
    ],
  },

  // ── Experience ────────────────────────────────────────────────────────────
  // Types of work, not named projects. When the owner supplies documented
  // projects and photos, set `image.src` and adjust copy to match.
  experience: {
    eyebrow: "Experience",
    heading: "Experience Where Durability Matters",
    intro:
      "Carnak Construction’s capabilities align with the demands of public, institutional, commercial, and exterior construction work—where durable materials, jobsite coordination, safety, and dependable execution matter.",
    disclosure: "Selected project details and credentials available upon request.",
    panels: [
      {
        id: "public-institutional",
        index: "01",
        title: "Public & Institutional Environments",
        description:
          "Schools, public buildings, and civic facilities place specific demands on a contractor: safety around occupied buildings, defined work windows, formal documentation, and materials that must hold up to constant use. Carnak’s masonry, concrete, and exterior capabilities are suited to this kind of work.",
        scope: ["Masonry & façade repair", "Concrete & site repairs", "Exterior envelope work", "Documentation & closeout"],
        considerations: ["Occupied facilities", "Defined work windows", "Safety & access control"],
        image: {
          src: null,
          alt: "Masonry work at a public or institutional building",
          placeholder: "stone",
        } as SiteImage,
      },
      {
        id: "commercial",
        index: "02",
        title: "Commercial Construction Support",
        description:
          "For general contractors and commercial owners, Carnak supports masonry, concrete, and exterior scopes as a coordinated part of the larger project—working to the drawings, the schedule, and the sequence of the trades around it.",
        scope: ["Masonry & concrete packages", "Exterior renovation", "Site concrete & paving", "Coordination with the GC schedule"],
        considerations: ["Schedule alignment", "Trade sequencing", "Clear field communication"],
        image: {
          src: null,
          alt: "Concrete and masonry work on a commercial project",
          placeholder: "concrete",
        } as SiteImage,
      },
      {
        id: "exterior-site",
        index: "03",
        title: "Exterior Systems & Site Improvements",
        description:
          "A building’s exterior and its site take the most weather and the most wear. Carnak’s work across masonry, roofing interfaces, waterproofing support, sidewalks, curbs, and paving addresses how these systems meet—where most long-term problems begin.",
        scope: ["Façade & masonry restoration", "Roofing & flashing interfaces", "Sidewalks, curbs & paving", "Waterproofing support"],
        considerations: ["Water management", "Long-term durability", "Public access & safety"],
        image: {
          src: null,
          alt: "Sidewalk, curb, and paving improvements at a building site",
          placeholder: "paving",
        } as SiteImage,
      },
    ],
  },

  // ── Markets ───────────────────────────────────────────────────────────────
  markets: {
    eyebrow: "Markets",
    heading: "Built for the Places People Rely On",
    intro:
      "Carnak’s work is oriented to buildings and sites that serve the public, stay in constant use, and carry real operational stakes.",
    items: [
      {
        id: "education",
        icon: "education" as MarketIcon,
        title: "Education & Institutional",
        description:
          "School and institutional facilities need work that is safe to perform around students, staff, and daily operations—and durable enough for decades of heavy use. Scopes are planned around access, calendars, and documentation requirements.",
        focus: ["Occupied facilities", "Calendar-driven schedules", "Long service life"],
      },
      {
        id: "municipal",
        icon: "municipal" as MarketIcon,
        title: "Municipal & Public Facilities",
        description:
          "Public buildings and civic sites bring formal bid processes, detailed specifications, and oversight. Carnak reviews bid documents carefully and approaches public work with an emphasis on the contract documents, safety, and organized records.",
        focus: ["Formal bid requirements", "Specification compliance", "Public access & safety"],
      },
      {
        id: "commercial",
        icon: "commercial" as MarketIcon,
        title: "Commercial Properties",
        description:
          "Owners and managers of commercial buildings need exterior, masonry, concrete, and site work completed with minimal disruption to tenants and operations, and with clear communication from start to finish.",
        focus: ["Tenant & operational continuity", "Envelope & site durability", "Responsive communication"],
      },
      {
        id: "gc-partnerships",
        icon: "partnership" as MarketIcon,
        title: "General Contractor Partnerships",
        description:
          "For general contractors and construction managers, Carnak prices from the bid documents, coordinates to the project schedule, and executes its scope as a dependable part of the larger team.",
        focus: ["Bid-document pricing", "Schedule coordination", "Scope accountability"],
      },
    ],
  },

  // ── Process ───────────────────────────────────────────────────────────────
  process: {
    eyebrow: "Process",
    heading: "Clear From Plans to Closeout",
    intro: "A straightforward sequence that keeps scope, schedule, and responsibility clear at every stage of the work.",
    steps: [
      {
        title: "Review",
        description:
          "Send plans, specs, and bid requirements. Carnak reviews the documents, site conditions, and schedule before committing to a number.",
        deliverable: "Drawings · Specs · Bid forms",
      },
      {
        title: "Scope",
        description:
          "Align on work scope, access, coordination, safety, and schedule so inclusions, exclusions, and responsibilities are clear before mobilization.",
        deliverable: "Defined scope & schedule",
      },
      {
        title: "Build",
        description:
          "Execute field work with disciplined communication and attention to detail, coordinating with the project team and adjacent trades.",
        deliverable: "Field execution & updates",
      },
      {
        title: "Closeout",
        description:
          "Complete punch work, documentation, and final turnover support so the project closes as cleanly as it started.",
        deliverable: "Punch · Documents · Turnover",
      },
    ],
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    eyebrow: "About",
    heading: "New York Roots. Built for Long-Term Work.",
    body: [
      "Based in East Rockaway, Carnak Construction serves New York City and Long Island with construction capabilities focused on masonry, concrete, paving, roofing, exterior work, and general construction coordination. The company’s approach is grounded in practical field experience, durable workmanship, and responsive project communication.",
      "The work is oriented toward general contractors, owners, facilities teams, and public-sector projects that value clear scope, dependable execution, and construction meant for a long service life.",
    ],
    facts: [
      { label: "Headquarters", value: "East Rockaway, New York" },
      { label: "Service Area", value: "New York City & Long Island" },
      { label: "Core Trades", value: "Masonry · Concrete · Paving · Roofing · Exterior · General Construction" },
      { label: "Work Focus", value: "Commercial, institutional & public-sector construction" },
    ],
  },

  // ── Contact / bid form ────────────────────────────────────────────────────
  contact: {
    eyebrow: "Bids & Inquiries",
    heading: "Send Plans for Review",
    intro:
      "Have drawings, specifications, a scope package, or an upcoming bid? Send the project details to Carnak Construction for review.",
    checklistTitle: "Helpful to include",
    checklist: [
      "Drawings and specifications, or a link to the bid documents",
      "Bid due date and any pre-bid or walkthrough dates",
      "Scope or trade package being priced",
      "Site location, access, and schedule constraints",
    ],
    projectTypes: [
      "Masonry & Brickwork",
      "Concrete Construction",
      "Paving & Sitework",
      "Roofing & Waterproofing",
      "Exterior Restoration",
      "General Construction",
      "Multiple trades / Other",
    ],
    /**
     * TODO: File uploads are UI-only in this version (see README → "Form
     * delivery"). Update this note once uploads are wired to storage.
     */
    uploadNote:
      "Selected files are not transmitted with this form. For drawing sets, add a download link in the field above, or send files once the office responds.",
    success: {
      heading: "Project details received",
      body: "Thank you. Carnak Construction will review the information and follow up using your preferred contact method.",
    },
    /** Shown instead of `success` while email delivery env vars are not configured. */
    preview: {
      heading: "Form check complete — not sent",
      body: "Online delivery for this form is not connected yet, so these details were not transmitted. Please call the office to discuss the project.",
    },
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    summary:
      "Masonry, concrete, paving, roofing, exterior restoration, and general construction for commercial, institutional, and public-sector work.",
  },
} as const;

export type Site = typeof site;
