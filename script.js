/* ════════════════════════════════════════
   STAR WARS — A SAGA  |  script.js
   ════════════════════════════════════════ */

/* ══════════════════════════════════════
   CAMPO DE ESTRELAS CINEMÁTICO
   Três camadas de parallax + shooting stars
══════════════════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('stars');
  const ctx    = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); rebuildLayers(); });

  /* ── CAMADAS ──────────────────────────────
     layer 0: fundo lento, pequeno, dim
     layer 1: médio
     layer 2: frente rápido, maior, brilhante
  ──────────────────────────────────────── */
  const LAYERS = [
    { count: 180, speedY: 0.06, speedX: 0.01, minR: 0.2, maxR: 0.7,  minA: 0.15, maxA: 0.45 },
    { count: 120, speedY: 0.18, speedX: 0.03, minR: 0.5, maxR: 1.2,  minA: 0.35, maxA: 0.70 },
    { count:  60, speedY: 0.45, speedX: 0.08, minR: 0.9, maxR: 2.0,  minA: 0.55, maxA: 0.90 },
  ];

  let layerStars = [];

  function mkStar(layer, yOverride) {
    return {
      x:     Math.random() * W,
      y:     yOverride !== undefined ? yOverride : Math.random() * H,
      r:     layer.minR + Math.random() * (layer.maxR - layer.minR),
      alpha: layer.minA + Math.random() * (layer.maxA - layer.minA),
      da:    (Math.random() - 0.5) * 0.003,
      speedY: layer.speedY * (0.7 + Math.random() * 0.6),
      speedX: layer.speedX * (Math.random() > 0.5 ? 1 : -1) * Math.random(),
      color:  Math.random() > 0.94
        ? (Math.random() > 0.5 ? '#b0d8ff' : '#ffe8b0')
        : '#ffffff',
    };
  }

  function rebuildLayers() {
    layerStars = [];
    LAYERS.forEach(layer => {
      const group = [];
      for (let i = 0; i < layer.count; i++) group.push(mkStar(layer));
      layerStars.push({ cfg: layer, stars: group });
    });
  }
  rebuildLayers();

  /* ── ESTRELAS CADENTES ─────────────────── */
  const shooters = [];

  function spawnShooter() {
    const angle = Math.PI / 5 + Math.random() * Math.PI / 8; // ~36–58°
    const speed = 6 + Math.random() * 8;
    shooters.push({
      x: Math.random() * W * 1.2 - W * 0.1,
      y: -20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: 60 + Math.random() * 80,
      alpha: 1,
      life: 1,
    });
  }

  // Dispara um a cada 3–7 segundos
  let lastShot = 0;
  let nextShotIn = 3000 + Math.random() * 4000;

  /* ── NEBULOSA (desenhada uma vez) ──────── */
  let nebulaCanvas = null;
  function buildNebula() {
    nebulaCanvas = document.createElement('canvas');
    nebulaCanvas.width  = W;
    nebulaCanvas.height = H;
    const nc = nebulaCanvas.getContext('2d');

    // Glows sutis
    [
      { cx: W * 0.15, cy: H * 0.25, rx: W * 0.25, ry: H * 0.20, color: '60,100,180',  a: 0.045 },
      { cx: W * 0.78, cy: H * 0.60, rx: W * 0.22, ry: H * 0.18, color: '150,40,40',   a: 0.040 },
      { cx: W * 0.50, cy: H * 0.80, rx: W * 0.35, ry: H * 0.22, color: '60,40,120',   a: 0.030 },
    ].forEach(({ cx, cy, rx, ry, color, a }) => {
      const g = nc.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      g.addColorStop(0,   `rgba(${color},${a})`);
      g.addColorStop(0.5, `rgba(${color},${a * 0.4})`);
      g.addColorStop(1,   `rgba(${color},0)`);
      nc.fillStyle = g;
      nc.save();
      nc.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
      nc.beginPath();
      nc.arc(cx * Math.max(rx, ry) / rx, cy * Math.max(rx, ry) / ry, Math.max(rx, ry), 0, Math.PI * 2);
      nc.fill();
      nc.restore();
    });
  }
  buildNebula();
  window.addEventListener('resize', () => { buildNebula(); });

  /* ── LOOP ────────────────────────────────── */
  let last = 0;
  function frame(ts) {
    const dt = Math.min(ts - last, 50); // cap delta
    last = ts;

    ctx.clearRect(0, 0, W, H);

    // Fundo profundo
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.85);
    bg.addColorStop(0, '#070c1f');
    bg.addColorStop(1, '#020408');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Nebulosa
    if (nebulaCanvas) ctx.drawImage(nebulaCanvas, 0, 0);

    // Estrelas por camada
    layerStars.forEach(({ cfg, stars }) => {
      stars.forEach(star => {
        // Movimento
        star.y += star.speedY;
        star.x += star.speedX;
        star.alpha += star.da;
        if (star.alpha > cfg.maxA || star.alpha < cfg.minA) star.da *= -1;

        // Reciclar
        if (star.y > H + 2) { Object.assign(star, mkStar(cfg, -2)); }
        if (star.x < -2)    { star.x = W + 1; }
        if (star.x > W + 2) { star.x = -1; }

        ctx.globalAlpha = star.alpha;
        ctx.fillStyle   = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Estrelas cadentes
    const now = ts;
    if (now - lastShot > nextShotIn) {
      spawnShooter();
      lastShot   = now;
      nextShotIn = 3000 + Math.random() * 5000;
    }

    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.018;
      s.alpha = s.life;

      if (s.life <= 0 || s.x > W + 60 || s.y > H + 60) {
        shooters.splice(i, 1);
        continue;
      }

      const tail = {
        x: s.x - Math.cos(Math.atan2(s.vy, s.vx)) * s.len,
        y: s.y - Math.sin(Math.atan2(s.vy, s.vx)) * s.len,
      };

      const grad = ctx.createLinearGradient(tail.x, tail.y, s.x, s.y);
      grad.addColorStop(0, `rgba(255,255,255,0)`);
      grad.addColorStop(0.6, `rgba(200,230,255,${s.alpha * 0.4})`);
      grad.addColorStop(1,   `rgba(255,255,255,${s.alpha})`);

      ctx.globalAlpha = 1;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();

      // Brilho na ponta
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
      glow.addColorStop(0,   `rgba(255,255,255,${s.alpha})`);
      glow.addColorStop(1,   `rgba(255,255,255,0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();


/* ══════════════════════════════════════
   HOVER NOS EPISÓDIOS (glow sutil)
══════════════════════════════════════ */
document.querySelectorAll('.episode').forEach(ep => {
  const acc = ep.querySelector('.episode-saber-accent');
  let color = 'rgba(79,195,247,';
  if (acc?.classList.contains('saber-red-a'))   color = 'rgba(255,32,32,';
  if (acc?.classList.contains('saber-green-a')) color = 'rgba(87,255,110,';

  ep.addEventListener('mousemove', e => {
    const r = ep.getBoundingClientRect();
    ep.style.background =
      `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, ${color}0.035) 0%, transparent 55%)`;
  });
  ep.addEventListener('mouseleave', () => { ep.style.background = 'transparent'; });
});


/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal], .episode').forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════
   PARALLAX HERO
══════════════════════════════════════ */
const heroContent  = document.querySelector('.hero-content');
const heroSabers   = document.querySelectorAll('.hero-saber');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroContent) {
    heroContent.style.transform = `translateY(${sy * 0.38}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - sy / 480);
  }
  heroSabers.forEach(s => { s.style.opacity = Math.max(0, 1 - sy / 380); });
}, { passive: true });


/* ══════════════════════════════════════
   SLIDER JEDI VS SITH
══════════════════════════════════════ */
(function initSlider() {
  const ball       = document.getElementById('sliderBall');
  const track      = document.getElementById('sliderTrack');
  const fillLeft   = document.getElementById('sliderFillLeft');
  const fillRight  = document.getElementById('sliderFillRight');
  const result     = document.getElementById('sliderResult');
  if (!ball || !track) return;

  let dragging = false;
  let pct = 0.5; // 0 = full jedi, 1 = full sith

  function applyPct(p) {
    pct = Math.max(0, Math.min(1, p));
    const leftPct  = pct * 100;
    const rightPct = (1 - pct) * 100;

    ball.style.left = leftPct + '%';
    fillLeft.style.width  = leftPct + '%';
    fillRight.style.width = rightPct + '%';

    // Cor do ball e mensagem
    const r = Math.round(pct * 255);
    const b = Math.round((1 - pct) * 247);
    ball.style.boxShadow = `0 0 16px rgba(${r},${b > 0 ? b : 0},${b},1), 0 0 40px rgba(${r},${b > 0 ? b : 0},${b},0.6)`;

    if (pct < 0.15) {
      result.textContent = 'QUE A FORÇA ESTEJA COM VOCÊ';
      result.style.color = 'rgba(79,195,247,0.7)';
      result.style.textShadow = '0 0 20px rgba(79,195,247,0.4)';
    } else if (pct > 0.85) {
      result.textContent = 'O LADO NEGRO É MAIS PODEROSO';
      result.style.color = 'rgba(255,32,32,0.7)';
      result.style.textShadow = '0 0 20px rgba(255,32,32,0.4)';
    } else if (pct < 0.45) {
      result.textContent = 'A LUZ GUIA SEUS PASSOS';
      result.style.color = 'rgba(120,210,247,0.55)';
      result.style.textShadow = 'none';
    } else if (pct > 0.55) {
      result.textContent = 'AS SOMBRAS CHAMAM POR VOCÊ';
      result.style.color = 'rgba(255,100,100,0.55)';
      result.style.textShadow = 'none';
    } else {
      result.textContent = 'VOCÊ CAMINHA NO EQUILÍBRIO';
      result.style.color = 'rgba(255,232,31,0.45)';
      result.style.textShadow = 'none';
    }
  }

  function getPct(clientX) {
    const r = track.getBoundingClientRect();
    return (clientX - r.left) / r.width;
  }

  ball.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  window.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('mousemove', e => { if (dragging) applyPct(getPct(e.clientX)); });

  // Touch
  ball.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });
  window.addEventListener('touchend', () => { dragging = false; });
  window.addEventListener('touchmove', e => {
    if (dragging) applyPct(getPct(e.touches[0].clientX));
  }, { passive: true });

  applyPct(0.5);
})();
