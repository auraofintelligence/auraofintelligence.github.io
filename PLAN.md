# Aura of Intelligence: site rebuild plan

**The playbook for rebuilding auraofintelligence.com as a fast, modern GitHub Pages site.**

This file is the single source of truth for the build. It is written for Claude Sonnet to
execute phase by phase, with Luke (and periodic Fable 5 reviews) checking in between phases.
Read this whole file once before starting any phase. Then work only inside the current phase.

**Publishing model: ship early, ship often, no grand reveal.** The repo goes public and
GitHub Pages goes live at the end of Phase 1, so Luke can watch the build grow on his phone
and other devices. Every phase/batch ends with a push. An in-progress site is the intended
state, not an embarrassment.

---

## 0. Ground rules (read first, apply always)

### What this build is
A full, faithful, page-for-page replication of `https://auraofintelligence.com` (every page
the live site has, the new site has), upgraded to modern web standards, refreshed media, and
expanded with the new Courses hub. **Nothing is cut, merged away, or retired.** The live
site (current version only: no Wayback Machine archaeology; earlier revisions are
deliberately left behind) is the authoritative source of content and structure. Luke has far
more research documents and build plans than what is visible in the local repos; the repos
are supplementary enrichment only, and Luke supplies additional source material per page via
the content drop-zone below.

### Who this site is for
Non-technical, middle-class Australians who are not coders, but who are **self-sovereign**:
they want to own their data, their attention and their choices. Write for a smart neighbour,
not a developer. No jargon without a one-line plain-English gloss.

### Voice and copy rules (non-negotiable)
- **No em dashes, anywhere** (Luke's correction, 2026-07-12: they read as an AI writing
  tell). Never write "—". Rephrase with whatever the sentence actually calls for: a colon
  when introducing or explaining, a semicolon joining two related clauses, a comma for a
  trailing clause, or simply a full stop and a new sentence. Check your own draft copy for
  "—" before saving any file, not just page copy: PLAN.md, todo.html entries, and code
  comments all count.
- **Australian English** everywhere: organise, colour, licence (noun), realise, centre.
- **Care language, two concepts, each in its place, never substituted for each other:**
  - *Mobilisation of care* = the community / C-hours / Braided Economy side: the
    non-financial supplement Luke is building alongside the existing system.
  - *Monetisation of care* = the existing funded-care system (NDIS, aged care). The
    Anti-Dementia Aura page is designed FOR the NDIS; on that page, naming the existing
    monetised/funded care system is accurate and correct.
  - The frame that holds both: the **Braided Economy**. Live and work with what we have,
    while building the supplement, aspiring to evolve the systems into a **"Fair Go
    Future"**. Reference `https://gajra.earth` and the `gajra-earth-public-hub` repo
    wherever this frame appears.
  - The failure mode to guard against is *drift*: when copy means community mobilisation,
    never let it slide into "monetisation". When unsure which side of the braid a passage
    sits on, preserve Luke's original wording and flag it in todo.html.
- Front-page copy is **Luke's first person, feeling-led**. Process-meta ("built with AI",
  "static site") belongs on a colophon/workshop page only, never on front pages.
- **No year-crutch**: never stamp "since 2019" / "2022 vision" provenance into product copy.
  Milestones, not years. The system is for everyone, now.
- **Present the vision whole. No status labels.** Do NOT tag pages or tools with badges like
  "live / prototype / blueprint / coming soon / planned". The site describes the world Luke
  is building, in full voice, without meta-commentary flags. Where something can be used
  today, link to it; where it can't yet, the page simply describes it beautifully. Never
  frame any of Luke's documented ideas as speculative, unbuilt or aspirational; they are
  intentional, and the copy treats them as such.
- Peace-first framing. Never reference current defence events.
- **Fidelity over flair in salvaged copy**: the live site's words are canonical. Upgrade
  spelling/voice per the rules above and tighten obvious 2024-era artefacts, but do not
  creatively rewrite Luke's copy. When Luke supplies new source documents for a page, fold
  them in; his documents outrank both the old copy and any repo.

### Conventions (inherited from the repo family)
- Licence: copy `LICENCE.md` from `githublocal\right-place-right-time` (custom Public Source
  Licence: non-commercial free, commercial rights reserved). Same terms, this repo's name.
- Signature in README and page footers: **Luke Hayes × Claude**.
- Repo name: **`auraofintelligence.github.io`**, the GitHub *user site* repo. It serves at
  the account root (`https://auraofintelligence.github.io/`) and is the only repo that can
  cleanly take the `auraofintelligence.com` custom domain later via a `CNAME` file.
  **Do not add a CNAME file or touch DNS in this build**: the WordPress site stays live
  until Luke decides to flip the domain.

### Technical spec: what "modern and fast" means here, in plain English
- **Plain files, no build step.** Every page is an ordinary `.html` file with one shared
  stylesheet and a couple of small scripts, served by GitHub exactly as they sit in the
  repo. Any page opens directly from the folder on a PC. Nothing has to be compiled or
  installed. (The `aura-oi` repo is different: it is the separate WebGL app experience and
  keeps its own tooling; this site links to it, it doesn't absorb it.)
- **A page-weight promise (the "performance budget").** The reason the old site feels slow
  is WordPress plugin/tracker bloat: often megabytes per page. Here every page must stay
  small enough to load near-instantly on an ordinary phone: the core of each page (HTML +
  CSS + shared scripts, before pictures) stays under ~90 KB, roughly 1/30th of a typical
  WordPress page. Concretely:
  - Fonts are hosted in this repo (2 families max, woff2 format); no calls to Google.
  - Zero third-party requests on page load: no external analytics, trackers, or CDN scripts.
  - Every image is webp, sized honestly (`width`/`height` set), and loads lazily as the
    reader scrolls (`loading="lazy"`, hero images excepted). **Always pull the real
    `width`/`height` from `assets/media/MEDIA-MANIFEST.md`, never guess or reuse a value
    from another image.** A mismatched declared aspect ratio stretches the image once it
    renders (`styles.css` sets `img { height: auto }`, so the real intrinsic ratio should
    win, but a wrong width/height pairing still causes a layout jump and, on some image
    types, visible distortion). This caused the July 2026 "squishy images" bug; the fix is
    in the ground rules now so it isn't repeated. If a replacement image lands with
    different dimensions than the manifest says, re-measure it (`ffprobe -v error
    -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 <file>`, already
    installed on this machine) and update both the manifest row and the page's `<img>` tag.
  - **Videos use the facade pattern**: a page never embeds a live YouTube player on load
    (that alone costs ~1 MB). It shows a poster image with a play button; the real player
    loads only when clicked. One shared helper in `core.js`.
  - `.nojekyll` file at repo root (tells GitHub to serve files as-is).
- **One shared chassis.** One `styles.css` (design tokens at the top), one `assets/core.js`,
  one data-driven `assets/site-nav.js` that generates the header, footer, breadcrumbs and a
  full-screen site index from a single SECTIONS array: add a page in one place and it
  appears everywhere. **Copy the mechanism directly from
  `githublocal\right-place-right-time\assets\site-nav.js`** (resolves the site root from the
  stylesheet link; works from any folder depth; the site still works with JavaScript off).
- **Accessibility**: WCAG 2.2 AA intent. Semantic landmarks, skip link, visible focus,
  4.5:1 contrast, and **`prefers-reduced-motion` is first-class**: every animation has a
  calm variant for readers whose devices ask for less motion.
- **Animations ("funky", but disciplined)**: scroll-driven reveals via IntersectionObserver,
  CSS keyframes and scroll-linked effects where supported (with graceful fallback), one
  signature canvas "aura" effect on the home hero (lightweight 2D canvas, not WebGL),
  hover micro-interactions on cards. Funkiness lives in `assets/cinematic.js`, loaded
  `defer`, and every page must be complete without it.

### Images: start with the existing ones, name them for painless replacement
The site launches with the **current live-site images** (2024-era), so it is never bare.
Luke will replace them over time by matching filenames: zero code changes per swap.
- Phase 0 downloads every image from the live site.
- **Naming convention (strict):** `<page-slug>--<purpose>-<nn>.webp`
  e.g. `aura-builder--hero-01.webp`, `music-creation--gallery-03.webp`,
  `home--founder-portrait-01.webp`. Purposes: `hero`, `portrait`, `gallery`, `card`,
  `poster` (video facade posters), `bg`.
- Convert everything to webp (quality ~82, max width 1920 for heroes / 1200 elsewhere).
  Tooling on this machine: `cwebp` and `ffmpeg`/`ffprobe` are already installed and are
  what Phase 0 actually used (no npm install needed; a `sharp`-based Node script is a
  fallback only if those aren't available on a future machine).
- `assets/media/MEDIA-MANIFEST.md` is the ledger, one row per slot: filename, page,
  purpose, real width/height (see the page-weight rule above), source URL it was salvaged
  from, and status (`salvaged-2024` / `replaced-by-luke`; internal bookkeeping only, never
  shown on the site). Every video facade poster gets a row too (video ID + poster filename).
- When Luke drops a replacement with the same filename into `assets/media/`, the site just
  updates. Sonnet's job on later rounds: re-measure the real dimensions (see the page-weight
  rule above) and refresh the manifest's width/height and status columns.

### Small data-driven pages (registry pattern)
Some pages are not prose; they are live-updatable lists that should stay easy to extend
without touching HTML. Same shape every time: a plain JS array in `assets/<name>-data.js`
(id, title, date/status/whatever fields the page needs), a small render function in the
page's own script, and an honest empty state when the array is `[]`. Already-planned
registries: `pathways-data.js` (Phase 3), `courses-data.js` (Phase 5), and
**`events-data.js`** (`{id, title, date, description, link}`, launches empty; see the
`calendar-of-events` page, Phase 3). Adding a new item later is a one-entry edit, no
HTML/CSS changes.

### The content drop-zone (how Luke feeds the build)
Create `content/updates/` with one folder per page slug (e.g. `content/updates/aura-builder/`).
Luke drops research documents, build plans, scripts or notes into a page's folder at any
time, in any format. **Before building or revising any page, check its drop-zone folder and
fold in whatever is there.** Luke's documents are the top-ranking source, above the old
site copy and far above repo READMEs. Keep a `content/updates/README.md` explaining this in
two sentences so the convention survives every session.

### todo.html: Luke's public TLDR list (build it in Phase 1, keep it alive forever)
A public page on the site that tells **Luke** what only he can do, at a glance:
- Short imperative items ("Name replacement image for `home--hero-01.webp`", "Drop the
  Capsule Hotels build plan into its folder", "Record course video: Grants on Straddie",
  "Answer: early-access form choice"), grouped by kind (content · images · videos ·
  decisions).
- **Dated update entries**: newest at top, each dated, so Luke sees what changed since he
  last looked. Sonnet updates this page at the end of every phase/batch and whenever an
  open question arises mid-build. Done items move to a collapsed "done" list with dates.
- Tone: warm, direct, zero process-jargon. This page is public by design (kin to the
  seams.html pattern in right-place-right-time); it is the working heartbeat of the site,
  and visitors seeing it is a feature, not a leak.

### Token discipline for Sonnet
- Work strictly one phase at a time. Within a phase, one page at a time.
- Never re-read whole source repos: read a repo's `README.md` only, unless a drop-zone
  document points deeper.
- Reuse the template page; do not restyle per page.
- At the end of each phase (or batch): update the **Progress log** below, update
  `todo.html`, push to GitHub, stop. The log + todo.html are what Fable 5 and Luke read.

---

## 1. What exists (the map)

### The authoritative source: `https://auraofintelligence.com`
WordPress site, headline *"A Bridge to The Infinite."* Every page below is replicated 1:1
(same content territory, matching URL slugs where sensible). This inventory is a **starting
checklist from one crawl: Phase 0 must walk the live site's own navigation and confirm the
complete list**, because Luke has more content than one crawl surfaced.

**The seventeen tools/visions (one page each):** Aura Builder (Mind Uploader) · Avatar
Builder (Digital Twin) · Mind Palace Builder · World Builder · Life Planning & Well Being ·
Generative A.I. Customisation · Smart IoT Devices · Blockchain · Events & Event Management ·
Music Creation · Gamification of Life · Space Weather & Climate · Aura Capsule Hotels ·
Innovation Tinkering Labs · In-Home A.I. Auto-Farm · Commercial Space Development ·
Subterranean Eco-Cities

**The other pages (one page each):** Home · About/Founder · The Promise · Alpha Infinity
Foundation · Anti-Dementia Aura (NDIS context: see care-language rule) · Cosmic Nexus ·
Tool Kit · Cloud Compute · Podcast Channels · Course Creation · Aura Courses · Affiliate
Promotions · Choice Content · Blog Articles · Videos · Contact · Early-access CTA (form
treatment TBC: see Open questions).

**Page-specific notes:**
- **Cosmic Nexus** is starting life as a **travel club: building the tribe before the
  place**. The page leads with the travel club as it exists now and keeps the co-working &
  bar destination vision in full. Both, in that order.
- **Anti-Dementia Aura** sits on the existing-system side of the braid: designed for the
  NDIS. Write it in that register.
- **Patronage is woven through the whole site**, not just linked once: Right Place, Right
  Time is Luke's patronage/portfolio site. It gets a nav-level presence ("Back the
  mission" pattern), a rich card on Home, and its own course (below).

**New additions (requested by Luke, additive; nothing replaced):** todo.html (Luke's
public TLDR list) · the Courses hub expansion (§Phase 5) · prominent links to the music
catalogue, Strange but True, Right Place Right Time, and gajra.earth.

### Live properties this site must link to (use these exact URLs)
- Music catalogue: `https://auraofintelligence.github.io/i-C-infinity-music-universe/`
- Strange but True: `https://auraofintelligence.github.io/strange-but-true/`
- Right Place, Right Time (patronage/portfolio): `https://auraofintelligence.github.io/right-place-right-time/`
- P4A civic cinema: `https://auraofintelligence.github.io/p4a-xyz-cinema/` (+ oceania, native-nations)
- GAJRA / Fair Go Future: `https://gajra.earth` (repo: `gajra-earth-public-hub`)
- Other sites: `https://iseeinfinity.com` · `https://lukecatalyst.com`
- The Aura O.i. app experience: the `aura-oi` repo (WebGL landing + app). Slot the link,
  activate when Luke publishes it.

### Supplementary repo enrichment (optional, second-rank)
Local repos in `C:\Users\sbt41\githublocal\` hold *some* related work, but they are NOT the
source of truth; the live site and Luke's drop-zone documents outrank them. Where a page's
drop-zone is empty, these MAY add an "explore further" link or a detail, verified against
the repo's README first: `sbt_aura_builder`, `aura-oi`, `aura-health-twin`,
`web3-sensorium`, `skills_values_competancies`, `infinity-content-engine`,
`event-search-QLD`, `quandamooka-country-events-engine`, `i-C-infinity` family,
`explorer-music-video-lab`, `aura-toy`, `geode-vibe`, `space-weather-news`,
`straddie-capsule-surge-lab`, `straddie-makerspace-lab`,
`straddie-space-station-simulator`, `GAJRA_Earth-Space-AI_Summit`, `gajra-earth-public-hub`,
`sandworm-subterranean-systems`, `civilisation-of-sand`, `alpha-infinity`, `aura-dementia`,
`strange-but-true-cosmic-nexus`, `two-dogs-podcast-backend`, `mineral-moonshots`, and for
the course engine pattern: `how-to-use-md-with-ai`, `agent-md-form-navigator`,
`plfc-ai-agent-md-forms`.

---

## 2. The phases

Every phase ends with: update the Progress log, update todo.html, **push to GitHub**, list
open questions, stop. Do not start the next phase in the same session unless Luke says so.

### Phase 0: Salvage & inventory (no HTML)
**Goal: a complete, faithful harvest of the entire live site, words and pictures.**
1. Walk `https://auraofintelligence.com` from its own navigation (and sitemap if present).
   Build the definitive page inventory in `content/PAGE-INVENTORY.md`: every page, its
   URL, its new slug. Expect it to be larger than the §1 checklist.
2. WebFetch every page. Save its full meaningful copy (not theme boilerplate) to
   `content/salvage/<slug>.md` with frontmatter: original URL, page title, every media item
   noted (video IDs, image URLs, captions), internal links. Salvage faithfully: voice-rule
   fixes only, no rewriting.
3. **Harvest the images**: download every content image from the live site, rename to the
   strict convention (`<page-slug>--<purpose>-<nn>.webp`), convert to webp with `cwebp`,
   write every row into `assets/media/MEDIA-MANIFEST.md`. Commit converted files only.
4. Create the `content/updates/<slug>/` drop-zone folder for every page, each with a
   one-line README naming the page, so Luke can start dropping documents immediately.
5. STOP. Checkpoint: Luke confirms the inventory and starts filling drop-zones / naming
   replacement images against the manifest.

### Phase 1: Chassis, then GO LIVE
**Goal: the skeleton every page will share, published and viewable on Luke's phone.**
1. Scaffold: `index.html` (real hero with salvaged imagery + working nav), `404.html`,
   `todo.html` (first real entries), `.nojekyll`, `LICENCE.md`, `README.md` (signed Luke
   Hayes × Claude), `styles.css` (design tokens at top), `assets/core.js`,
   `assets/site-nav.js` (SECTIONS array covering the full confirmed inventory),
   `assets/cinematic.js` (shell), fonts under `assets/fonts/`, `assets/favicon.svg`,
   media in from Phase 0, `content/updates/README.md`.
2. Design tokens: dark, luminous, aura-gradient identity (violet/gold/teal glow on deep
   ink), kin to the repo family but its own person.
3. Build ONE template tool-page proving: nav generation from any depth, breadcrumbs,
   footer, reveal-on-scroll, facade video slot, manifest-named images, reduced-motion
   fallback, JS-off usability.
4. Add `.claude/launch.json` with a simple static server (`npx serve` or
   `python -m http.server`) and verify in the browser pane: console clean, page weight
   under budget, mobile 375px width, keyboard walk.
5. **Publish**: `git init`, commit, create public repo
   `auraofintelligence/auraofintelligence.github.io` (needs Luke logged in with `gh`; if
   not authenticated, stop and put it at the top of todo.html), push, confirm Pages
   serves at `https://auraofintelligence.github.io/`. From here on, every batch ends with
   a push; Luke checks progress on any device, any time.
6. STOP. Checkpoint: Luke approves look/feel on his own devices before content pours in.

### Phase 2: Core pages
**Goal: the front door.**
Build from salvage + drop-zones: Home (hero with canvas aura effect, the invitation, and
the associated-sites constellation: music catalogue, Strange but True, Right Place Right
Time with patronage framing, P4A, gajra.earth, iseeinfinity, lukecatalyst, shown
prominently and beautifully), About/Founder, The Promise, Contact (form treatment per
Luke's answer), Videos, Colophon (the one page allowed to talk shop). Verify each page in
the browser before moving to the next. Push. STOP. Checkpoint.

### Phase 3: The seventeen tool pages (in batches)
**Goal: every tool page replicated and upgraded, one page each, no merging.**
Work in batches of 4-5 pages, one batch per session, push + checkpoint after each batch:
- Batch A: Aura Builder · Avatar Builder · Mind Palace Builder · World Builder
- Batch B: Life Planning & Well Being · Generative A.I. Customisation · Smart IoT · Blockchain
- Batch C: Events & Event Management (`aura-events`, pitch page, Luke's brief in its
  drop-zone) + Calendar of Events (`calendar-of-events`, blank data-driven calendar,
  `assets/events-data.js`) · Music Creation · Gamification of Life · Space Weather & Climate
- Batch D: Aura Capsule Hotels · Innovation Tinkering Labs · In-Home A.I. Auto-Farm ·
  Commercial Space Development · Subterranean Eco-Cities

Per page: salvaged copy as the base, fold in the page's drop-zone documents, manifest
images, link to any live property or repo where one genuinely exists, anchored sections
so old deep-links can map across. Also build `pathways/index.html`: an animated, filterable
index of all seventeen (a "funky" showcase page that routes into the full pages; an index,
not a replacement).

### Phase 4: The remaining pages (in batches)
**Goal: everything else replicated 1:1.**
- Batch A: Alpha Infinity Foundation · Anti-Dementia Aura (NDIS register) · Cosmic Nexus
  (travel club first, destination vision kept in full)
- Batch B: Tool Kit · Cloud Compute · Podcast Channels
- Batch C: Choice Content · Affiliate Promotions · Blog Articles (replicate the blog index
  and posts as found; new posts are a later editorial task, not this build)
Same per-page recipe as Phase 3. Push. STOP. Checkpoint.

### Phase 5: Courses hub
**Goal: replicate Course Creation + Aura Courses, then expand into the new hub.**
The long-game format: short courses presented by Luke's digital avatar, live streams by the
human, and interactive markdown generators. **The launch format is lighter: each course
ships as a blurb about the project family plus links to the relevant pages and GitHub
repos.** Videos and generators layer in on later rounds as Luke records.

1. Replicate the two existing course pages faithfully first.
2. `assets/courses-data.js`: registry, id, title, subject, blurb, links (pages + repos),
   video slots (YouTube IDs, TBC until recorded), livestream slot, generator config,
   internal build-status field (**never rendered on the site**; bookkeeping only).
3. **The launch course list (Luke's brief, 2026-07-12):**
   - **Straddie practical**: grants & tenders (`stradbroke-grants-lab`,
     `amity-outdoor-fitness-grant`), projects to start (the `straddie-*` lab family:
     night market, makerspace, tip loop, noticeboards, disaster kiosks, vitality network,
     and more).
   - **P4A family**: P4A civic cinema · Oceania · Native Nations.
   - **Travel**: the travel-adjacent repos (`Australian-world-travel`,
     `strange-but-true-travel-oracle`, Cosmic Nexus travel club).
   - **Patronage**: how to become a patron/sponsor of Luke, his work and his travels,
     anchored to Right Place, Right Time.
   - **Longer horizon**: `mineral-moonshots` and the deep-time / frontier repos.
   Verify each repo's README before writing its blurb; every course links out to pages
   and GitHubs.
4. `courses/index.html`: the hub, cards from the registry, animated, generous.
5. One static page per course (better for GitHub Pages and link previews): blurb + links
   now; video facade slots and the generator section scaffolded, filled on later rounds.
6. One shared generator engine `assets/course-gen.js`, pattern lifted from
   `githublocal\how-to-use-md-with-ai`: a form generates a downloadable `.md` file,
   **browser-local only, localStorage, nothing sent anywhere**. Say so on the page,
   because that IS the self-sovereign promise. Wire it into the first course
   (Markdown-with-AI territory) as the working demonstration.
Push. STOP. Checkpoint: this is the phase most likely to need Fable review.

### Phase 6: Funk & polish
**Goal: the site feels alive, and still loads instantly.**
Home-hero canvas aura ring; scroll-linked colour shifts between sections; staggered card
choreography; page-transition feel via the View Transitions API where supported; hover
states with personality. Then the audit: every page within the weight budget, console
clean, keyboard walk, reduced-motion walk, 375px walk, JS-off sanity, every internal and
external link checked, MEDIA-MANIFEST current, todo.html current. Fix everything found.
Push. STOP. Checkpoint.

### Phase 7: Domain readiness & handover
1. Full crawl of the live GitHub Pages URL; fix anything broken.
2. Write `DOMAIN.md`: the exact later steps to point `auraofintelligence.com` here
   (CNAME file + DNS records + WordPress retirement checklist). **Do not execute them.**
3. Final Progress log + todo.html entries; hand back to Luke.

---

## 3. Open questions for Luke (answer any time; each phase re-asks what's still open)
1. How will you supply the extra research documents and build plans? Happy with the
   `content/updates/<page>/` drop-zone folders, or would you rather point Sonnet at
   specific folders/files as each page comes up?
2. Early access: keep a (new) Google Form, or replace with mailto / the RPRT support page?
3. Font voice: Archivo + JetBrains Mono (kin to Right Place Right Time) or
   Fraunces + Space Grotesk (kin to aura-oi)?
4. Aura O.i. app (`aura-oi`): publish timing, so the "Experience Aura O.i." link can go live.
5. ~~`gh` CLI login~~: RESOLVED, confirmed authenticated as `auraofintelligence`.
6. ~~`new-home` vs `home`~~: RESOLVED 2026-07-12, keep the fuller "Cosmic Nexus" version
   as `home`; no separate `new-home` page.
7. ~~`aura-events`~~: RESOLVED 2026-07-12, it's the Events & Event Management tool pitch
   page, distinct from `calendar-of-events`. Luke's brief is in its drop-zone.
8. **Anti-Dementia NDIS framing**: DEFERRED by Luke 2026-07-12, "a later update, I will
   provide direction later." Build this page from salvaged copy as-is for now; do not
   invent NDIS language.

---

## 4. Progress log
*(Sonnet: append one dated entry per phase/batch. Fable reads this first on every review.)*

- 2026-07-12: Plan authored (Fable 5). No build started.
- 2026-07-12: Plan revised per Luke. 1:1 replication of every page; no status labels, the
  vision presented whole; live site authoritative over repos; drop-zone convention added;
  jargon glossed in plain English.
- 2026-07-12: Plan revised again per Luke. Care language corrected to the braided-economy
  distinction (mobilisation = C-hours community side; monetisation = existing NDIS/aged
  care, correct in its place; Fair Go Future via gajra.earth); publish-early model: Pages
  goes live at end of Phase 1, push every batch, no grand reveal; launch with existing
  2024 images renamed to strict convention + webp so replacements are filename-matched;
  todo.html added, Luke's public dated TLDR list; Cosmic Nexus leads as travel club
  (tribe before place), destination vision kept; patronage (Right Place Right Time) woven
  nav-deep; launch course list locked (Straddie grants/tenders/projects · P4A + Oceania +
  Native Nations · travel · patronage · mineral moonshots/long horizon) as blurb+links
  first, videos/generators layered later.
- 2026-07-12: **Phase 0 complete.** Sitemap walked: 34 live pages confirmed (2 more than
  the original crawl checklist; `aura-store` and `aura-events` were new discoveries).
  All 34 salvaged verbatim to `content/salvage/<slug>.md` via 4 parallel agents, AU
  spelling applied, no rewriting. 219 content images harvested from the live site,
  deduplicated from WordPress's resolution variants, converted to webp, and named to the
  `<slug>--<purpose>-<nn>.webp` convention; catalogued in `assets/media/MEDIA-MANIFEST.md`
  (3 animated GIFs needed an ffmpeg first-frame extraction fallback, done). 6 YouTube
  video slots noted for poster art (2 are `videoseries` playlist embeds; real playlist
  IDs still need grabbing by hand in Phase 1/2). Drop-zone folders created for all 34
  pages. Three findings need Luke's attention before later phases (see Open Questions
  §3 items 6-8): `new-home`/`home` are near-duplicates (18 vs 17 sections), `aura-events`
  is a genuine stub distinct from `calendar-of-events`, and the Anti-Dementia page
  currently carries no NDIS language (framing likely needs to come from a drop-zone
  document). Full detail in `content/PAGE-INVENTORY.md`.
  **STOPPED at the Phase 0 checkpoint**: awaiting Luke's review before Phase 1 (chassis
  + go-live) begins.
- 2026-07-12: Luke resolved all three Phase 0 findings, so Phase 1 proceeds.
  (1) home = the fuller "Cosmic Nexus" version (`new-home.md` is canonical, no separate
  `new-home` page); (2) `aura-events` and `calendar-of-events` confirmed genuinely
  distinct: `aura-events` is the Events & Event Management pitch page (brief supplied,
  "Craft the Unforgettable"), `calendar-of-events` is a blank data-driven calendar
  (`assets/events-data.js` registry pattern, added to the ground rules); (3) Anti-Dementia
  NDIS framing deferred by Luke, build from salvaged copy as-is for now. `gh` CLI
  confirmed authenticated. All decisions written into `content/updates/<slug>/` and
  `content/PAGE-INVENTORY.md`. Proceeding to Phase 1.
- 2026-07-12: Phase 1 complete, site is LIVE. Built the chassis: styles.css (Aura's own
  violet/gold/teal-on-deep-ink tokens, leaner than RPRT's grown-organically stylesheet),
  assets/site-nav.js (adapted RPRT mechanism, full SECTIONS array covering the confirmed
  IA, 7 groups, 30+ links), assets/core.js (reveal-on-scroll + video facade helper),
  assets/cinematic.js (2D canvas particle-ring aura effect on the home hero,
  reduced-motion gated). Fonts self-hosted (Archivo Var + JetBrains Mono Var, copied from
  right-place-right-time, provisional pending Luke's font-voice answer, logged in
  todo.html). Built index.html (real hero, associated-sites teaser), aura-builder.html
  (full template tool page, proves the pattern for the other sixteen), todo.html (real
  dated entries, public), 404.html (warm "still being built" page, not a dead end).
  Verified locally: console clean, nav + full-screen index overlay work, mobile 375px has
  zero horizontal overflow, page core weight ~45KB (half the 90KB budget). git init,
  public repo auraofintelligence/auraofintelligence.github.io created and pushed, GitHub
  Pages confirmed live at https://auraofintelligence.github.io/. Local
  .claude/launch.json added for future preview sessions (also registered in the parent
  githublocal workspace launch.json as aura-site, port 4195). STOPPED at the Phase 1
  checkpoint: awaiting Luke's look at the live site on his own devices before Phase 2
  (core pages) begins.
- 2026-07-12: Luke's first review. Two fixes applied: (1) images were stretched because
  every `<img>` tag had guessed, wrong `width`/`height` attributes (all declared as
  1200x800 regardless of the real file); fixed the two live pages with real dimensions
  (measured via `ffprobe`), added `height: auto` to the base `img` rule in styles.css as
  the root-cause fix, and enriched MEDIA-MANIFEST.md with a real width/height column for
  all 219 images so future phases pull correct values instead of guessing (new ground
  rule added under the page-weight promise). (2) All em dashes removed from every live
  page and from this plan, replaced with contextually appropriate colons, semicolons,
  commas or full stops; added as a standing voice rule (no em dashes, ever) so it isn't
  reintroduced in later phases. Pushed.
