# Aura of Intelligence

**A self-sovereign digital companion: a bridge to your infinite self, built for
non-technical people who want to own their data, their attention and their choices.**

The rebuild of [auraofintelligence.com](https://auraofintelligence.com) as a plain,
fast, static site: every page from the old WordPress site replicated in full and
upgraded, plus a growing hub of short courses and interactive builders.

## Status

This site is published and growing in public, on purpose; see [todo.html](todo.html)
for what's shipped and what's next. Nothing here is a finished reveal; it's a working
site that gets better every week.

## How it's built

- Plain HTML, one shared `styles.css`, a couple of small scripts. No build step, no
  framework, no third-party requests on load.
- `assets/site-nav.js` generates the header, footer, breadcrumbs and full-screen index
  from one data file: add a page in one place and it appears everywhere.
- Every page stays light: self-hosted fonts, lazy-loaded images, and videos that only
  load a real player when clicked.
- `PLAN.md` is the full build plan, phase by phase. `content/PAGE-INVENTORY.md` maps
  every old page to its new one. `content/updates/<page>/` is where new source
  material gets dropped in as it arrives.

## Run it locally

No build step; open `index.html` directly, or serve the folder:

```bash
npx serve .
```

## Licence

[LICENCE.md](LICENCE.md): the Aura of Intelligence Public Source Licence,
non-commercial use free, commercial rights reserved.

---

*A Bridge to The Infinite.* **Luke Hayes × Claude**, Minjerribah · 2026.


<!-- mutual-futures-connection -->
## Mutual Futures: connected workbench

[Mutual Futures](https://auraofintelligence.github.io/mutual-futures/) connects this project with Luke Nathan Hayes's proposed mutual business succession, Try Everything Once, Intermittent Retirement, personal intelligence, legal reflection, resilience, travel and wider civilisational horizon. The connection does not merge the projects or imply outside endorsement.

[Source repository](https://github.com/auraofintelligence/mutual-futures) · [Project connections and sources](https://auraofintelligence.github.io/mutual-futures/sources.html)
