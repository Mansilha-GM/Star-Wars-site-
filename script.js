/* ════════════════════════════════════════
   STAR WARS — A SAGA  |  style.css
   ════════════════════════════════════════ */

/* ── VARIÁVEIS ── */
:root {
  --gold:       #ffe81f;
  --gold-dim:   rgba(255, 232, 31, 0.15);
  --gold-glow:  rgba(255, 232, 31, 0.4);
  --red:        #c0392b;
  --red-saber:  #ff2020;
  --red-glow:   rgba(255, 32, 32, 0.5);
  --blue-saber: #4fc3f7;
  --blue-glow:  rgba(79, 195, 247, 0.5);
  --green-saber:#57ff6e;
  --green-glow: rgba(87, 255, 110, 0.4);
  --white:      #f0eee8;
  --ink:        #05080f;
  --ink2:       #0b0f1f;
}

/* ── RESET ── */
*, *::before, *::after {
  margin: 0; padding: 0;
  box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
  background: var(--ink);
  color: var(--white);
  font-family: 'Crimson Pro', Georgia, serif;
  overflow-x: hidden;
  cursor: auto;
}

/* ══════════════════════════════════════
   CANVAS — CAMPO DE ESTRELAS
══════════════════════════════════════ */
canvas#stars {
  position: fixed; inset: 0;
  width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
}

/* ══════════════════════════════════════
   PARTÍCULAS DA FORÇA
══════════════════════════════════════ */
.force-particles {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 1;
  overflow: hidden;
}

.force-particle {
  position: absolute;
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  animation: forceFloat var(--dur, 8s) var(--delay, 0s) infinite ease-in-out;
}

@keyframes forceFloat {
  0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0); }
  20%  { opacity: .7; transform: translateY(-60px) translateX(var(--dx, 20px)) scale(1); }
  80%  { opacity: .3; transform: translateY(-200px) translateX(var(--dx2, -30px)) scale(.5); }
  100% { opacity: 0; transform: translateY(-300px) translateX(var(--dx3, 10px)) scale(0); }
}

/* ══════════════════════════════════════
   MAIN WRAPPER
══════════════════════════════════════ */
main { position: relative; z-index: 2; background: transparent; }

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
#hero {
  height: 100vh;
  display: flex; justify-content: center; align-items: center;
  position: relative; overflow: hidden; text-align: center;
}

.space-bg {
  position: fixed; inset: 0; z-index: -3;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.8) 1px, transparent 2px),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,.5) 1px, transparent 2px),
    radial-gradient(circle at 60% 70%, rgba(255,255,255,.4) 1px, transparent 2px),
    radial-gradient(circle at 30% 80%, rgba(255,255,255,.6) 1px, transparent 2px),
    radial-gradient(circle at center, #050816 0%, #000000 100%);
  background-size: 280px 280px, 480px 480px, 380px 380px, 580px 580px, cover;
  animation: spaceMove 40s linear infinite;
}

.hero-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,.06) 0%, rgba(0,0,0,.25) 100%);
}

/* ── SABRES DE LUZ DO HERO ── */
.hero-saber {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 0;
  border-radius: 2px;
  z-index: 1;
  animation: saberRise 2.5s 1s cubic-bezier(.2,.8,.2,1) forwards;
}

.hero-saber-left {
  left: 15%;
  background: linear-gradient(to top, transparent, var(--blue-saber));
  box-shadow: 0 0 12px var(--blue-saber), 0 0 30px var(--blue-glow);
}

.hero-saber-right {
  right: 15%;
  background: linear-gradient(to top, transparent, var(--red-saber));
  box-shadow: 0 0 12px var(--red-saber), 0 0 30px var(--red-glow);
  animation-delay: 1.3s;
}

@keyframes saberRise {
  to { height: 55vh; }
}

/* ── CONTENT ── */
.hero-content {
  position: relative; z-index: 2; padding: 2rem;
}

.crawl-label {
  font-family: 'Cinzel', serif;
  font-size: .8rem; letter-spacing: .55em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 4rem; opacity: .7;
  animation: fadeUp 1.2s ease both;
}

.hero-logo {
  width: min(600px, 85vw);
  filter:
    drop-shadow(0 0 20px rgba(255,232,31,.3))
    drop-shadow(0 0 60px rgba(255,232,31,.15));
  animation: fadeUp 1.4s .2s ease both, logoFloat 6s ease-in-out infinite;
}

.hero-tagline {
  margin-top: 4rem;
  font-size: clamp(1rem, 2vw, 1.35rem);
  line-height: 2; font-style: italic;
  letter-spacing: .08em;
  color: rgba(240,238,232,.65);
  animation: fadeUp 1.4s .5s ease both;
}

/* Anel da Força no hero */
.force-ring {
  position: absolute;
  top: 50%; left: 50%;
  width: 300px; height: 300px;
  border-radius: 50%;
  border: 1px solid rgba(255,232,31,.08);
  transform: translate(-50%, -50%);
  animation: forceRingPulse 4s ease-in-out infinite;
  pointer-events: none;
}

.force-ring::before, .force-ring::after {
  content: '';
  position: absolute; inset: -40px;
  border-radius: 50%;
  border: 1px solid rgba(255,232,31,.04);
  animation: forceRingPulse 4s 1s ease-in-out infinite;
}

.force-ring::after {
  inset: -80px;
  animation-delay: 2s;
}

@keyframes forceRingPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .5; }
  50%       { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

.scroll-hint {
  position: absolute; bottom: 2rem;
  font-family: 'Cinzel', serif;
  font-size: .65rem; letter-spacing: .45em;
  color: rgba(255,232,31,.45);
  animation: fadeUp 1.4s .9s ease both, pulse 2s infinite;
}

/* ══════════════════════════════════════
   ERA BANNER
══════════════════════════════════════ */
.era-banner {
  display: flex; align-items: center; justify-content: center;
  gap: 2rem; padding: 4rem 2rem;
  font-family: 'Cinzel', serif;
  font-size: .7rem; letter-spacing: .7em;
  color: rgba(255,232,31,.5);
  text-transform: uppercase;
  opacity: 0; transform: translateY(20px);
  transition: opacity 1s, transform 1s;
}

.era-banner.visible { opacity: 1; transform: none; }

.era-line {
  flex: 1; max-width: 200px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,232,31,.3), transparent);
}

.era-banner-red { color: rgba(255,32,32,.5); }
.era-line-red {
  background: linear-gradient(to right, transparent, rgba(255,32,32,.3), transparent);
}

/* ══════════════════════════════════════
   EPISÓDIOS
══════════════════════════════════════ */
.episode {
  min-height: 100vh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: stretch;
  position: relative; overflow: hidden;
  background: transparent;
}

.episode:nth-child(even) { direction: rtl; }
.episode:nth-child(even) > * { direction: ltr; }

/* Visual */
.episode-visual {
  position: relative; overflow: hidden;
}

.episode-visual img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: left center;
  display: block;
  filter: grayscale(30%) contrast(1.1) brightness(0.9);
  transition: filter 1s, transform 8s;
}

.episode:hover .episode-visual img {
  filter: grayscale(0%) contrast(1.05) brightness(1);
  transform: scale(1.04);
}

.episode-visual::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to right, transparent 40%, var(--ink) 100%);
}

.episode:nth-child(even) .episode-visual::after {
  background: linear-gradient(to left, transparent 40%, var(--ink) 100%);
}

/* ── ACENTO DE SABRE NA IMAGEM ── */
.episode-saber-accent {
  position: absolute;
  top: 0; right: 0;
  width: 2px; height: 100%;
  z-index: 5;
  opacity: 0;
  transition: opacity .8s;
}

.episode:hover .episode-saber-accent { opacity: 1; }

.saber-blue {
  background: linear-gradient(to bottom, transparent, var(--blue-saber), transparent);
  box-shadow: 0 0 10px var(--blue-saber), 0 0 25px var(--blue-glow);
}

.saber-red {
  background: linear-gradient(to bottom, transparent, var(--red-saber), transparent);
  box-shadow: 0 0 10px var(--red-saber), 0 0 25px var(--red-glow);
}

.saber-green {
  background: linear-gradient(to bottom, transparent, var(--green-saber), transparent);
  box-shadow: 0 0 10px var(--green-saber), 0 0 25px var(--green-glow);
}

/* Texto */
.episode-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(3rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem);
  position: relative;
}

.episode-text::before {
  content: '';
  position: absolute; top: 50%; left: 0;
  width: 1px; height: 120px;
  background: linear-gradient(to bottom, transparent, rgba(255, 232, 31, .3), transparent);
  transform: translateY(-50%);
}

.episode:nth-child(even) .episode-text::before { left: auto; right: 0; }

/* Elementos — estado inicial oculto */
.ep-number {
  font-family: 'Cinzel', serif;
  font-size: .7rem; letter-spacing: .6em;
  color: var(--gold); margin-bottom: 1rem;
  transform: translateX(-20px); opacity: 0;
  transition: transform .8s, opacity .8s;
}

.ep-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900; line-height: 1.1;
  color: var(--white); letter-spacing: .02em;
  margin-bottom: .5rem;
  transform: translateY(30px); opacity: 0;
  transition: transform .9s .1s, opacity .9s .1s;
}

.ep-subtitle {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-style: italic; color: var(--gold);
  letter-spacing: .05em; margin-bottom: 2rem;
  transform: translateY(20px); opacity: 0;
  transition: transform .9s .2s, opacity .9s .2s;
}

.ep-divider {
  width: 60px; height: 1px;
  background: linear-gradient(to right, var(--blue-saber), transparent);
  margin-bottom: 2rem;
  box-shadow: 0 0 6px rgba(79,195,247,.4);
  transform: scaleX(0); transform-origin: left;
  opacity: 0;
  transition: transform .8s .3s, opacity .8s .3s;
}

.ep-divider-red {
  background: linear-gradient(to right, var(--red-saber), transparent);
  box-shadow: 0 0 6px rgba(255,32,32,.4);
}

.episode:nth-child(even) .ep-divider {
  transform-origin: right;
}

.ep-description {
  font-size: clamp(.95rem, 1.4vw, 1.15rem);
  font-weight: 300; line-height: 1.9;
  color: rgba(240, 238, 232, .65);
  max-width: 440px;
  transform: translateY(20px); opacity: 0;
  transition: transform .9s .4s, opacity .9s .4s;
}

/* Citações da Força */
.force-quote {
  margin-top: 1.5rem;
  padding: .8rem 1.2rem;
  border-left: 2px solid rgba(79,195,247,.3);
  transform: translateX(-10px); opacity: 0;
  transition: transform .9s .5s, opacity .9s .5s;
}

.force-quote span {
  font-style: italic;
  font-size: clamp(.85rem, 1.3vw, 1rem);
  color: rgba(79,195,247,.7);
  letter-spacing: .03em;
}

.force-quote-dark { border-left-color: rgba(255,32,32,.35); }
.force-quote-dark span { color: rgba(255,100,100,.65); }

.force-quote-final { border-left-color: rgba(87,255,110,.35); }
.force-quote-final span { color: rgba(87,255,110,.7); }

.ep-year {
  margin-top: 2.5rem;
  font-family: 'Cinzel', serif;
  font-size: .65rem; letter-spacing: .5em;
  color: rgba(255, 232, 31, .3);
  transform: translateY(10px); opacity: 0;
  transition: transform .8s .5s, opacity .8s .5s;
}

/* Visível */
.episode.visible .ep-number,
.episode.visible .ep-title,
.episode.visible .ep-subtitle,
.episode.visible .ep-description,
.episode.visible .ep-year,
.episode.visible .force-quote {
  opacity: 1; transform: none;
}

.episode.visible .ep-divider {
  opacity: 1; transform: scaleX(1);
}

/* ══════════════════════════════════════
   INTERLÚDIO / CITAÇÃO
══════════════════════════════════════ */
.interlude {
  min-height: 60vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 6rem 2rem;
  position: relative; overflow: hidden;
}

.interlude-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(255, 232, 31, .05) 0%, transparent 70%);
}

.interlude-bg-red {
  background: radial-gradient(ellipse at center, rgba(255, 32, 32, .06) 0%, transparent 70%);
}

.interlude-bg-gold {
  background: radial-gradient(ellipse at center, rgba(255, 232, 31, .08) 0%, transparent 60%);
}

.interlude blockquote {
  position: relative; z-index: 1;
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 3vw, 2.8rem);
  font-weight: 400; color: var(--gold);
  letter-spacing: .04em; line-height: 1.5;
  max-width: 800px;
  text-shadow: 0 0 40px rgba(255, 232, 31, .3);
  opacity: 0; transform: translateY(40px);
  transition: opacity 1.2s, transform 1.2s;
}

.interlude blockquote cite {
  display: block; margin-top: 1.5rem;
  font-style: italic; font-size: .8em;
  color: rgba(255, 232, 31, .4); letter-spacing: .3em;
}

.interlude.visible blockquote { opacity: 1; transform: none; }

.quote-dark { color: rgba(255,80,80,.85) !important; text-shadow: 0 0 40px rgba(255,32,32,.3) !important; }
.quote-dark cite { color: rgba(255,80,80,.35) !important; }

.quote-final { color: var(--gold) !important; }

/* ── SABRE HORIZONTAL NOS INTERLÚDIOS ── */
.saber-horizontal {
  position: absolute;
  top: 50%; left: 50%;
  height: 2px; width: 0;
  transform: translate(-50%, -50%);
  z-index: 0; border-radius: 2px;
  transition: width 1.5s .4s ease;
}

.saber-blue {
  background: linear-gradient(to right, transparent, var(--blue-saber), transparent);
  box-shadow: 0 0 10px var(--blue-saber), 0 0 30px var(--blue-glow);
}

.saber-red-h {
  background: linear-gradient(to right, transparent, var(--red-saber), transparent);
  box-shadow: 0 0 10px var(--red-saber), 0 0 30px var(--red-glow);
}

.interlude.visible .saber-horizontal { width: 60vw; }

/* ══════════════════════════════════════
   TRANSIÇÃO DARTH VADER
══════════════════════════════════════ */
.dark-side-transition {
  min-height: 50vh;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(20,0,0,.8) 0%, var(--ink) 70%);
  opacity: 0; transform: translateY(40px);
  transition: opacity 1.2s, transform 1.2s;
}

.dark-side-transition.visible { opacity: 1; transform: none; }

.vader-breath-container {
  text-align: center; position: relative; z-index: 2;
}

.vader-chest-light {
  width: 80px; height: 80px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,32,32,.9), rgba(200,0,0,.4), transparent 70%);
  margin: 0 auto 2rem;
  animation: vaderBreath 3.5s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(255,32,32,.6), 0 0 60px rgba(255,0,0,.3);
}

@keyframes vaderBreath {
  0%,100% { transform: scale(1); opacity: .7; }
  50%      { transform: scale(1.15); opacity: 1; }
}

.vader-text {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900; letter-spacing: .4em;
  color: var(--red-saber);
  text-shadow: 0 0 30px rgba(255,32,32,.7), 0 0 80px rgba(255,0,0,.3);
}

.vader-sub {
  font-family: 'Cinzel', serif;
  font-size: .65rem; letter-spacing: .5em;
  color: rgba(255,32,32,.4);
  margin-top: .8rem;
}

/* Sabres cruzados */
.saber-cross-left, .saber-cross-right {
  position: absolute; top: 50%;
  width: 0; height: 2px;
  transform-origin: right center;
  border-radius: 2px;
  transition: width 1.2s .6s ease;
}

.saber-cross-left {
  right: 50%; transform: translateY(-50%) rotate(-25deg);
}

.saber-cross-right {
  left: 50%; transform: translateY(-50%) rotate(25deg);
  transform-origin: left center;
}

.saber-red-glow {
  background: linear-gradient(to right, var(--red-saber), transparent);
  box-shadow: 0 0 10px var(--red-saber), 0 0 25px var(--red-glow);
}

.saber-cross-right.saber-red-glow {
  background: linear-gradient(to right, transparent, var(--red-saber));
}

.dark-side-transition.visible .saber-cross-left,
.dark-side-transition.visible .saber-cross-right { width: 30vw; }

/* ══════════════════════════════════════
   ORB DA FORÇA (INTERLÚDIO FINAL)
══════════════════════════════════════ */
.force-orb {
  position: absolute; top: 50%; left: 50%;
  width: 200px; height: 200px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,232,31,.12), rgba(255,232,31,.04), transparent 70%);
  box-shadow: 0 0 60px rgba(255,232,31,.1);
  animation: orbPulse 5s ease-in-out infinite;
}

.force-orb::before {
  content: '';
  position: absolute; inset: -40px;
  border-radius: 50%;
  border: 1px solid rgba(255,232,31,.06);
  animation: orbPulse 5s 1s ease-in-out infinite;
}

@keyframes orbPulse {
  0%,100% { transform: translate(-50%,-50%) scale(1); }
  50%      { transform: translate(-50%,-50%) scale(1.15); }
}

/* ══════════════════════════════════════
   SABRE FINALE
══════════════════════════════════════ */
.saber-finale {
  display: flex; align-items: center; justify-content: center;
  padding: 4rem 0; gap: 0;
  opacity: 0; transition: opacity 1s;
}

.saber-finale.visible { opacity: 1; }

.saber-fin {
  height: 3px; width: 0; border-radius: 2px;
  transition: width 1.4s .4s cubic-bezier(.2,.8,.2,1);
}

.saber-fin-blue {
  background: linear-gradient(to left, var(--blue-saber), transparent);
  box-shadow: 0 0 12px var(--blue-saber), 0 0 30px var(--blue-glow);
}

.saber-fin-red {
  background: linear-gradient(to right, var(--red-saber), transparent);
  box-shadow: 0 0 12px var(--red-saber), 0 0 30px var(--red-glow);
}

.saber-fin-clash {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 20px white, 0 0 40px rgba(255,255,255,.6);
  flex-shrink: 0;
  opacity: 0; transition: opacity 1.2s 1.4s;
}

.saber-finale.visible .saber-fin { width: 38vw; }
.saber-finale.visible .saber-fin-clash { opacity: 1; }

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
footer {
  text-align: center;
  padding: 5rem 2rem;
  border-top: 1px solid rgba(255, 232, 31, .07);
}

.footer-force {
  display: flex; align-items: center; justify-content: center; gap: 1.5rem;
}

.footer-text {
  font-family: 'Cinzel', serif;
  font-size: .75rem; letter-spacing: .5em;
  color: rgba(255, 232, 31, .25);
}

.footer-saber {
  display: block; width: 40px; height: 1px;
}

.footer-saber-l {
  background: linear-gradient(to right, transparent, rgba(79,195,247,.4));
  box-shadow: 0 0 5px rgba(79,195,247,.3);
}

.footer-saber-r {
  background: linear-gradient(to left, transparent, rgba(255,32,32,.4));
  box-shadow: 0 0 5px rgba(255,32,32,.3);
}

/* ══════════════════════════════════════
   RESPONSIVO
══════════════════════════════════════ */
@media (max-width: 768px) {
  .episode {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .episode:nth-child(even) { direction: ltr; }
  .episode-visual { height: 55vw; min-height: 260px; }
  .episode-visual::after {
    background: linear-gradient(to top, var(--ink) 0%, transparent 60%) !important;
  }
  .episode-text::before { display: none; }
  .hero-saber { display: none; }
  .saber-cross-left, .saber-cross-right { display: none; }
}

/* ══════════════════════════════════════
   KEYFRAMES GLOBAIS
══════════════════════════════════════ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
}

@keyframes logoFloat {
  0%,100% { transform: translateY(0px);   }
  50%      { transform: translateY(-10px); }
}

@keyframes spaceMove {
  from { transform: scale(1.1) translateY(0px);   }
  to   { transform: scale(1.15) translateY(-40px); }
}

@keyframes pulse {
  0%,100% { opacity: .3; }
  50%      { opacity: .8; }
}
