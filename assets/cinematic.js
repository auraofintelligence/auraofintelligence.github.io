/*
 * Aura of Intelligence: the "funky" layer.
 * A lightweight 2D canvas particle ring for the home hero — not WebGL, not
 * Three.js, just a few dozen points breathing around a centre. Skipped
 * entirely under prefers-reduced-motion, and every page is complete
 * without this file (progressive enhancement only).
 * More choreography (scroll-linked colour, staggered cards, view
 * transitions) lands in Phase 6 — this file is the seed, not the finish.
 */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const canvas = document.querySelector('[data-aura-canvas]');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const POINTS = 64;
  const particles = Array.from({ length: POINTS }, (_, i) => ({
    a: (i / POINTS) * Math.PI * 2,
    r: 0.62 + Math.random() * 0.3,
    speed: 0.06 + Math.random() * 0.08,
    size: 1 + Math.random() * 2.2,
    hue: i % 3
  }));
  const HUES = ['#ffcf6e', '#7c4dff', '#2be3c2'];

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let t = 0;
  let visible = true;
  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting !== false;
  });
  io.observe(canvas);

  const draw = () => {
    requestAnimationFrame(draw);
    if (!visible) return;
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const baseR = Math.min(w, h) * 0.34;
    particles.forEach((p) => {
      const angle = p.a + t * 0.0018 * p.speed;
      const wobble = Math.sin(t * 0.01 + p.a * 3) * 0.05;
      const rad = baseR * (p.r + wobble);
      const x = cx + Math.cos(angle) * rad;
      const y = cy + Math.sin(angle) * rad * 0.62;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = HUES[p.hue];
      ctx.globalAlpha = 0.55 + Math.sin(t * 0.02 + p.a) * 0.25;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  };
  requestAnimationFrame(draw);
})();
