/* ════════════════════════════════════════
   STAR WARS — A SAGA  |  script.js
   ════════════════════════════════════════ */


/* ══════════════════════════════════════
   CURSOR PERSONALIZADO
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
const light  = document.getElementById('mouseLight');

let mx = -200, my = -200;
let rx = -200, ry = -200;

(function animRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, article').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '60px';
    ring.style.height      = '60px';
    ring.style.borderColor = 'rgba(255,232,31,.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width       = '36px';
    ring.style.height      = '36px';
    ring.style.borderColor = 'rgba(255,232,31,.5)';
  });
});


/* ══════════════════════════════════════
   CAMPO DE ESTRELAS (CANVAS)
══════════════════════════════════════ */
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const STAR_COUNT = 120;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.5 + 0.2,
  speed: Math.random() * 0.3 + 0.04,
  alpha: Math.random() * 0.6 + 0.3,
  da:    (Math.random() - 0.5) * 0.004,
  // Ocasionalmente estrelas com cor suave (azul/dourado)
  color: Math.random() > 0.92
    ? `hsl(${Math.random() > .5 ? 200 : 48}, 80%, 80%)`
    : '#ffffff'
}));

(function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.alpha = Math.max(0.1, Math.min(0.9, star.alpha + star.da));
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle   = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
})();


/* ══════════════════════════════════════
   PARTÍCULAS DA FORÇA
══════════════════════════════════════ */
const forceContainer = document.getElementById('forceParticles');
const PARTICLE_COUNT  = 28;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'force-particle';

  const colors = [
    'rgba(255,232,31,',   // ouro
    'rgba(79,195,247,',   // azul
    'rgba(87,255,110,',   // verde
  ];
  const c = colors[Math.floor(Math.random() * colors.length)];

  const size   = Math.random() * 3 + 1;
  const dur    = (Math.random() * 7 + 6).toFixed(1);
  const delay  = (Math.random() * 12).toFixed(1);
  const left   = (Math.random() * 100).toFixed(1);
  const bottom = (Math.random() * 40).toFixed(1);
  const dx     = ((Math.random() - 0.5) * 80).toFixed(0);
  const dx2    = ((Math.random() - 0.5) * 120).toFixed(0);
  const dx3    = ((Math.random() - 0.5) * 60).toFixed(0);

  p.style.cssText = `
    left: ${left}%;
    bottom: ${bottom}%;
    width: ${size}px;
    height: ${size}px;
    background: ${c}0.9);
    box-shadow: 0 0 6px ${c}0.6);
    --dur: ${dur}s;
    --delay: ${delay}s;
    --dx: ${dx}px;
    --dx2: ${dx2}px;
    --dx3: ${dx3}px;
  `;

  forceContainer.appendChild(p);
}

/* ══════════════════════════════════════
   EFEITO DE LUZ NO HOVER DOS EPISÓDIOS
══════════════════════════════════════ */
document.querySelectorAll('.episode').forEach(ep => {
  // Cor do sabre de acordo com o episódio
  const saberAccent = ep.querySelector('.episode-saber-accent');
  let hoverColor = 'rgba(79,195,247,';

  if (saberAccent) {
    if (saberAccent.classList.contains('saber-red'))   hoverColor = 'rgba(255,32,32,';
    if (saberAccent.classList.contains('saber-green')) hoverColor = 'rgba(87,255,110,';
  }

  ep.addEventListener('mousemove', e => {
    const rect = ep.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ep.style.background = `radial-gradient(circle at ${x}px ${y}px, ${hoverColor}0.04) 0%, transparent 50%)`;
  });

  ep.addEventListener('mouseleave', () => {
    ep.style.background = 'transparent';
  });
});


/* ══════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════ */
const revealTargets = document.querySelectorAll('[data-reveal], .episode');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════
   PARALLAX NO HERO
══════════════════════════════════════ */
const heroContent = document.querySelector('.hero-content');
const heroSaberL  = document.getElementById('heroSaberLeft');
const heroSaberR  = document.getElementById('heroSaberRight');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const vh      = window.innerHeight;

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - scrollY / 500);
  }

  // Sabres do hero somem ao rolar
  if (heroSaberL) heroSaberL.style.opacity = Math.max(0, 1 - scrollY / 400);
  if (heroSaberR) heroSaberR.style.opacity = Math.max(0, 1 - scrollY / 400);
});


/* ══════════════════════════════════════
   EFEITO DE RESPIRAÇÃO DO VADER
   (som visual: luz pulsa no ritmo de 3.5s)
══════════════════════════════════════ */
const vaderLight = document.querySelector('.vader-chest-light');

if (vaderLight) {
  // Aumenta a intensidade do glow quando o elemento entra em vista
  const vaderObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        vaderLight.style.boxShadow =
          '0 0 50px rgba(255,32,32,.9), 0 0 100px rgba(255,0,0,.5), 0 0 200px rgba(255,0,0,.2)';
      } else {
        vaderLight.style.boxShadow =
          '0 0 30px rgba(255,32,32,.6), 0 0 60px rgba(255,0,0,.3)';
      }
    });
  }, { threshold: 0.5 });

  vaderObserver.observe(vaderLight.closest('.dark-side-transition'));
}
