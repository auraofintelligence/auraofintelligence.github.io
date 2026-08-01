/*
 * Aura of Intelligence: shared page behaviour.
 * Reveal-on-scroll and the click-to-load video facade. Both are
 * progressive enhancement: every page is complete without this file.
 */
(() => {
  /* ---------- Reveal on scroll ----------
     Deliberately NOT IntersectionObserver. Content visibility must never
     depend on an observer callback arriving: browsers throttle or delay IO
     in background tabs, prerendered pages and low-power modes, and a
     fractional threshold is unreachable for any block taller than the
     viewport, which left whole sections at opacity 0 forever on a phone.
     A plain geometry sweep gives the same staggered effect with nothing
     that can strand content. */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pending = new Set(document.querySelectorAll('.reveal'));
  const show = (el) => el.classList.add('is-visible');
  if (reduced) {
    pending.forEach(show);
    pending.clear();
  }
  const sweep = () => {
    if (!pending.size) { return; }
    /* Only the top edge is tested, so anything scrolled past stays revealed:
       an anchor jump or a restored scroll position cannot skip a block. */
    const line = window.innerHeight * 0.92;
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < line) { show(el); pending.delete(el); }
    });
  };
  sweep();
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep, { passive: true });
  window.addEventListener('load', sweep);
  /* Late-layout safety net (fonts/images shifting geometry after first paint). */
  setTimeout(sweep, 400);
  setTimeout(sweep, 1500);

  /* ---------- Video facade: never load a live player until clicked ---------- */
  document.querySelectorAll('[data-video-facade]').forEach((facade) => {
    facade.addEventListener('click', () => {
      const id = facade.dataset.videoFacade;
      const list = facade.dataset.videoList === 'true';
      const src = list
        ? `https://www.youtube-nocookie.com/embed/videoseries?list=${id}&autoplay=1`
        : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = facade.dataset.videoTitle || 'Video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      facade.innerHTML = '';
      facade.appendChild(iframe);
      facade.removeAttribute('role');
      facade.style.cursor = 'default';
    }, { once: true });
  });
})();
