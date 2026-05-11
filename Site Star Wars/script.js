/* ════════════════════════════════════════
   STAR WARS — A SAGA  |  script.js
   ════════════════════════════════════════ */


/* ══════════════════════════════════════
   CURSOR PERSONALIZADO
══════════════════════════════════════ */
const cursor    = document.getElementById('cursor');
const ring      = document.getElementById('cursorRing');
const light     = document.getElementById('mouseLight');

let mx = -200, my = -200; // posição do mouse
let rx = -200, ry = -200; // posição com lag do anel

// Atualiza posição do ponto e da luz ao mover o mouse
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';

  light.style.left = mx + 'px';
  light.style.top  = my + 'px';
});

// Anel com atraso suave (lerp)
(function animRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;

  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';

  requestAnimationFrame(animRing);
})();

// Expande o anel ao passar sobre elementos interativos
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

// Redimensiona o canvas ao tamanho da janela
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Gera estrelas com propriedades aleatórias
const STAR_COUNT = 320;

const stars = Array.from({ length: STAR_COUNT }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.5 + 0.2,
  speed: Math.random() * 0.35 + 0.05,
  alpha: Math.random() * 0.6 + 0.3,
  da:    (Math.random() - 0.5) * 0.004   // variação de opacidade (twinkle)
}));

// Loop de animação das estrelas
(function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // Twinkle: oscila a opacidade
    star.alpha = Math.max(0.1, Math.min(0.9, star.alpha + star.da));

    ctx.globalAlpha = star.alpha;
    ctx.fillStyle   = '#ffffff';

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    // Move a estrela para baixo
    star.y += star.speed;

    // Reinicia no topo quando sai da tela
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
})();


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
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════
   PARALLAX NO HERO
══════════════════════════════════════ */
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Desloca e dissolve o conteúdo do hero ao rolar
  heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
  heroContent.style.opacity   = Math.max(0, 1 - scrollY / 500);
});