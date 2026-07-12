/*
 * The courses: the data behind the hub at courses/index.html and each
 * course page. Add a course here and the hub card appears automatically,
 * grouped under its `family` (the hub renders tracks in the order families
 * first appear below).
 *
 * Shape:
 *   {
 *     id:        "slug",              // becomes courses/<slug>.html
 *     title:     "Course title",
 *     family:    "Track label",       // groups the card on the hub
 *     blurb:     "One or two sentences, in the build-your-own voice.",
 *     links:     [ { label, href } ],
 *     generator: true|false,          // does this course carry a working md builder?
 *     videos:    [ "YouTubeID", ... ],// avatar-presented short videos (TBC until recorded)
 *     livestream:null
 *   }
 *
 * The Local track draws on the real Minjerribah project family (see the
 * Strange but True community ledger). Not every project is a course; these
 * are the ones that teach a repeatable, buildable skill. Videos and live
 * streams launch empty on purpose; the blurbs and links are real today.
 */
window.AURA_COURSES = [
  {
    id: 'markdown-with-ai',
    title: 'Markdown with AI',
    family: 'Start here',
    blurb: 'The foundational skill: writing plain Markdown files that give AI the right context, so you can build your own tools instead of renting someone else’s. Includes a working builder that runs entirely in your browser.',
    links: [ { label: 'How to use Markdown with AI', href: 'https://auraofintelligence.github.io/how-to-use-md-with-ai/' } ],
    generator: true, videos: [], livestream: null
  },
  {
    id: 'straddie-projects',
    title: 'Grants & tenders',
    family: 'Local: Minjerribah',
    blurb: 'How to write grants and tenders that actually land, using a reusable kit you build and own rather than an agency you pay by the hour.',
    links: [
      { label: 'Stradbroke Grants Lab', href: 'https://auraofintelligence.github.io/stradbroke-grants-lab/' },
      { label: 'Amity Outdoor Fitness grant', href: 'https://auraofintelligence.github.io/amity-outdoor-fitness-grant/' }
    ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'noticeboard',
    title: 'Run a community noticeboard',
    family: 'Local: Minjerribah',
    blurb: 'The community noticeboard I’m working to start on the island, and how to run your own wherever you are: a public place for local notices the community owns, not a feed that sells the attention.',
    links: [ { label: 'Straddie Noticeboard Network', href: 'https://auraofintelligence.github.io/straddie-noticeboard-network/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'film-on-phone',
    title: 'Make films on your phone',
    family: 'Local: Minjerribah',
    blurb: 'How I’m helping first-time filmmakers on the island get started with just a phone, from a first short to a community documentary, and how you’d run the same where you are.',
    links: [
      { label: 'Quandamooka Film Festival', href: 'https://auraofintelligence.github.io/quandamooka-film-festival/' },
      { label: 'Film Club Documentary Builders', href: 'https://auraofintelligence.github.io/film-club-documentary-builders/' }
    ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'place-digital-twin',
    title: 'Build a digital twin of your place',
    family: 'Local: Minjerribah',
    blurb: 'The living digital copy of Minjerribah I’m building for its own people to steer, and how to build one for your own place. A twin, never a master.',
    links: [ { label: 'Straddie Digital Twin Builders', href: 'https://auraofintelligence.github.io/straddie-digital-twin-builders/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'legal-memory',
    title: 'Legal memory with AI',
    family: 'Local: Minjerribah',
    blurb: 'Get your legal information ready for AI the safe way: a Markdown workbench for preparing what matters, kept in your hands rather than uploaded to someone else’s system.',
    links: [ { label: 'Legal Memory Workbench', href: 'https://auraofintelligence.github.io/legal-memory-workbench/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'night-market',
    title: 'Run a night market',
    family: 'Local: Minjerribah',
    blurb: 'The night market I’m working to start on the island, and how to start your own wherever you are: stalls, stallholders and the coordination that makes an evening hum.',
    links: [ { label: 'Straddie Night Market Lab', href: 'https://auraofintelligence.github.io/straddie-night-market-lab/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'makerspace',
    title: 'Start a makerspace',
    family: 'Local: Minjerribah',
    blurb: 'The makerspace I want to get going on the island, and how to start one where you are: a place to repair, build and tinker, for every age.',
    links: [ { label: 'Straddie Makerspace Lab', href: 'https://auraofintelligence.github.io/straddie-makerspace-lab/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'disaster-kiosks',
    title: 'Disaster-ready kiosks',
    family: 'Local: Minjerribah',
    blurb: 'The offline-first kiosks I’m building to keep the island informed when the power and network go down, and how to build them for your own community. Preparedness you own.',
    links: [ { label: 'Straddie Disaster Kiosks', href: 'https://auraofintelligence.github.io/straddie-disaster-kiosks/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'shared-table',
    title: 'Run a shared table',
    family: 'Local: Minjerribah',
    blurb: 'The shared table I’m working to start on the island, rescuing surplus food and coordinating the volunteers who move it, and how to run one of your own. The mobilisation of care in practice.',
    links: [ { label: 'Straddie Shared Table', href: 'https://auraofintelligence.github.io/shared-table-initiative/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'p4a-civic',
    title: 'P4A: build your own civic tools',
    family: 'National & regional',
    blurb: 'Public tools for a fair go: referendum rehearsals, civic records and consent-first instruments you can run under your own name and your own laws, never a platform sold back to you.',
    links: [
      { label: 'P4A: the civic workbench', href: 'https://auraofintelligence.github.io/p4a-xyz-cinema/' },
      { label: 'P4A Oceania', href: 'https://auraofintelligence.github.io/p4a-oceania-cinema/' },
      { label: 'P4A Native Nations', href: 'https://auraofintelligence.github.io/p4a-native-nations-cinema/' }
    ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'travel',
    title: 'Travel: plan your own way',
    family: 'World',
    blurb: 'Build your own travel tools and companions: a trip atlas, a compass that reads the live signals, and a way to gather a tribe around the journey before there is ever a place.',
    links: [
      { label: 'Project Odyssey', href: 'https://auraofintelligence.github.io/Australian-world-travel/' },
      { label: 'Travel Oracle', href: 'https://auraofintelligence.github.io/strange-but-true-travel-oracle/' },
      { label: 'Cosmic Nexus travel club', href: 'https://auraofintelligence.github.io/strange-but-true-cosmic-nexus/' }
    ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'become-a-patron',
    title: 'Become a patron or sponsor',
    family: 'Back the work',
    blurb: 'How patronage works here, and how to become one: back Luke’s work and travels, and get something real in return. Value for value, out in the open.',
    links: [ { label: 'Right Place, Right Time', href: 'https://auraofintelligence.github.io/right-place-right-time/' } ],
    generator: false, videos: [], livestream: null
  },
  {
    id: 'long-horizon',
    title: 'The long horizon',
    family: 'Frontiers',
    blurb: 'The furthest-out builds, treated seriously: mineral moonshots and the deep-time frontier. Where the tools you own today grow toward the things that take a lifetime.',
    links: [ { label: 'Mineral Moonshots', href: 'https://auraofintelligence.github.io/mineral-moonshots/' } ],
    generator: false, videos: [], livestream: null
  }
];
