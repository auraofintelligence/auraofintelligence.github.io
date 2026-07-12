/*
 * The courses: the data behind the hub at courses/index.html and each
 * course page. Add a course here and the hub card appears automatically.
 *
 * Shape:
 *   {
 *     id:        "slug",              // becomes courses/<slug>.html
 *     title:     "Course title",
 *     family:    "Short family label",
 *     blurb:     "One or two sentences, in the build-your-own voice.",
 *     links:     [ { label, href } ],// the real repos/pages this course is about
 *     generator: true|false,         // does this course carry a working md builder?
 *     videos:    [ "YouTubeID", ... ],// avatar-presented short videos (TBC until recorded)
 *     livestream:null                 // { when, where } once a human live stream is set
 *   }
 *
 * Videos and livestreams launch empty on purpose. The blurb and the links
 * are real today; the recordings layer in as Luke makes them.
 */
window.AURA_COURSES = [
  {
    id: 'markdown-with-ai',
    title: 'Markdown with AI',
    family: 'Start here',
    blurb: 'The foundational skill: writing plain Markdown files that give AI the right context, so you can build your own tools instead of renting someone else’s. Includes a working builder that runs entirely in your browser.',
    links: [
      { label: 'How to use Markdown with AI', href: 'https://auraofintelligence.github.io/how-to-use-md-with-ai/' }
    ],
    generator: true,
    videos: [],
    livestream: null
  },
  {
    id: 'straddie-projects',
    title: 'Straddie: grants, tenders & projects',
    family: 'Local',
    blurb: 'How to write grants and tenders that actually land, and how to start real island projects, using the same tools and templates Luke builds and owns rather than paying an agency.',
    links: [
      { label: 'Stradbroke Grants Lab', href: 'https://auraofintelligence.github.io/stradbroke-grants-lab/' },
      { label: 'Amity Outdoor Fitness grant', href: 'https://auraofintelligence.github.io/amity-outdoor-fitness-grant/' },
      { label: 'Night Market Lab', href: 'https://auraofintelligence.github.io/straddie-night-market-lab/' },
      { label: 'Makerspace Lab', href: 'https://auraofintelligence.github.io/straddie-makerspace-lab/' }
    ],
    generator: false,
    videos: [],
    livestream: null
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
    generator: false,
    videos: [],
    livestream: null
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
    generator: false,
    videos: [],
    livestream: null
  },
  {
    id: 'become-a-patron',
    title: 'Become a patron or sponsor',
    family: 'Back the work',
    blurb: 'How patronage works here, and how to become one: back Luke’s work and travels, and get something real in return. Value for value, out in the open.',
    links: [
      { label: 'Right Place, Right Time', href: 'https://auraofintelligence.github.io/right-place-right-time/' }
    ],
    generator: false,
    videos: [],
    livestream: null
  },
  {
    id: 'long-horizon',
    title: 'The long horizon',
    family: 'Frontiers',
    blurb: 'The furthest-out builds, treated seriously: mineral moonshots and the deep-time frontier. Where the tools you own today grow toward the things that take a lifetime.',
    links: [
      { label: 'Mineral Moonshots', href: 'https://auraofintelligence.github.io/mineral-moonshots/' }
    ],
    generator: false,
    videos: [],
    livestream: null
  }
];
