/* =====================================================
   FARMALINK — SUPERANIMACIONES
   Librerías: GSAP, Particles.js, CountUp, Typed.js
   Temática: Salud + Tecnología
===================================================== */

// ── 1. CARGA DE LIBRERÍAS EXTERNAS ─────────────────────────────────────────
(function loadLibraries() {
  const libs = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
  ];

  let loaded = 0;
  libs.forEach(src => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => { if (++loaded === libs.length) initAll(); };
    document.head.appendChild(s);
  });
})();

// ── 2. INICIALIZACIÓN PRINCIPAL ─────────────────────────────────────────────
function initAll() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  injectStyles();
  injectParticlesCanvas();
  injectMedicalCursor();
  injectHeartbeatLine();
  injectMoleculeOrbit();
  injectScrollProgressBar();
  injectToastNotification();

  setupParticles();
  setupCursor();
  setupNavbarScroll();
  setupHeroAnimations();
  setupCounters();
  setupScrollReveal();
  setupCardHover3D();
  setupHeartbeatPulse();
  setupTypingEffect();
  setupStaggerCards();
  setupFloatingBadges();
  setupTeamCards();
  setupValuesMorph();
  setupPillLoader();
  setupColorSwatches();
  setupFooterWave();
  setupParallaxSections();
  setupMagneticButtons();
  setupGlitchText();
  setupMobileMenuAnimation();
}

// ── 3. ESTILOS DINÁMICOS ──────────────────────────────────────────────────
function injectStyles() {
  const css = `
    /* ── Cursor Personalizado ── */
    *, *::before, *::after { cursor: none !important; }
    #fl-cursor {
      position: fixed; width: 12px; height: 12px;
      background: #66B82E; border-radius: 50%;
      pointer-events: none; z-index: 99999;
      transform: translate(-50%, -50%);
      transition: background 0.2s, transform 0.15s;
      mix-blend-mode: multiply;
    }
    #fl-cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 2px solid #0B7DB8; border-radius: 50%;
      pointer-events: none; z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
      opacity: 0.7;
    }
    body.cursor-hover #fl-cursor { background: #F59E0B; transform: translate(-50%,-50%) scale(1.8); }
    body.cursor-hover #fl-cursor-ring { width: 56px; height: 56px; border-color: #F59E0B; }

    /* ── Barra de Progreso ── */
    #fl-progress-bar {
      position: fixed; top: 0; left: 0; height: 3px; width: 0%;
      background: linear-gradient(90deg, #66B82E, #0B7DB8, #00A896);
      z-index: 10000; transition: width 0.1s linear;
      box-shadow: 0 0 10px rgba(102,184,46,0.6);
    }

    /* ── Canvas de Partículas ── */
    #fl-particles {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0; pointer-events: none;
      opacity: 0.35;
    }

    /* ── Heartbeat Line ── */
    #fl-heartbeat {
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 60px; z-index: 9997; pointer-events: none;
      overflow: hidden;
    }
    #fl-heartbeat svg { width: 100%; height: 100%; }
    .hb-line {
      fill: none;
      stroke: url(#hbGrad);
      stroke-width: 2.5;
      stroke-linecap: round;
      filter: drop-shadow(0 0 4px rgba(102,184,46,0.8));
    }

    /* ── Moléculas Orbitales ── */
    #fl-molecule {
      position: fixed; bottom: 80px; right: 30px;
      width: 120px; height: 120px;
      z-index: 9996; pointer-events: none;
      opacity: 0; transition: opacity 0.5s;
    }
    #fl-molecule.visible { opacity: 0.5; }

    /* ── Toast Notification ── */
    #fl-toast {
      position: fixed; bottom: 80px; left: 24px;
      background: linear-gradient(135deg, #1a2535, #0d1b2a);
      color: white; padding: 14px 20px; border-radius: 14px;
      font-size: 14px; font-weight: 500; z-index: 99997;
      transform: translateX(-120%); transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      border: 1px solid rgba(102,184,46,0.3);
      display: flex; align-items: center; gap: 10px;
      max-width: 300px;
    }
    #fl-toast.show { transform: translateX(0); }
    #fl-toast .toast-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #66B82E; flex-shrink: 0;
      animation: toastPulse 1s infinite;
    }
    @keyframes toastPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

    /* ── Reveal Classes ── */
    .fl-hidden {
      opacity: 0;
      transform: translateY(40px);
    }
    .fl-hidden-left { opacity: 0; transform: translateX(-50px); }
    .fl-hidden-right { opacity: 0; transform: translateX(50px); }
    .fl-hidden-scale { opacity: 0; transform: scale(0.85); }

    /* ── Hover 3D Cards ── */
    .card-3d-wrap { transform-style: preserve-3d; }

    /* ── Glitch ── */
    .glitch-text { position: relative; }
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute; top: 0; left: 0;
      width: 100%;
    }
    .glitch-text::before {
      color: #66B82E; clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
      animation: glitch1 3s infinite;
    }
    .glitch-text::after {
      color: #0B7DB8; clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
      animation: glitch2 3s infinite;
    }
    @keyframes glitch1 {
      0%,90%,100%{transform:none;opacity:0}
      91%{transform:translateX(-3px);opacity:0.8}
      93%{transform:translateX(3px);opacity:0.5}
      95%{transform:translateX(-2px);opacity:0.9}
    }
    @keyframes glitch2 {
      0%,88%,100%{transform:none;opacity:0}
      89%{transform:translateX(3px);opacity:0.8}
      91%{transform:translateX(-2px);opacity:0.5}
      93%{transform:translateX(2px);opacity:0.9}
    }

    /* ── Magnetic Button ── */
    .btn-magnetic {
      position: relative; overflow: hidden;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
    }
    .btn-magnetic::after {
      content: '';
      position: absolute; inset: -2px;
      border-radius: inherit;
      background: linear-gradient(135deg, #66B82E, #0B7DB8);
      opacity: 0; z-index: -1;
      transition: opacity 0.3s;
    }
    .btn-magnetic:hover::after { opacity: 0.2; }

    /* ── Section Divider Pill ── */
    .section-pill-divider {
      text-align: center; padding: 8px 0;
      position: relative; z-index: 1;
    }
    .section-pill-divider svg { display: inline; }

    /* ── Pill Loader ── */
    #fl-pill-loader {
      position: fixed; inset: 0;
      background: linear-gradient(135deg, #0d1b2a 0%, #1a2f1a 100%);
      z-index: 999999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 24px;
      transition: opacity 0.6s ease;
    }
    #fl-pill-loader.fade-out { opacity: 0; pointer-events: none; }
    .loader-pill {
      width: 80px; height: 36px;
      border-radius: 18px;
      position: relative; overflow: hidden;
      background: #1e3a1e;
      box-shadow: 0 0 30px rgba(102,184,46,0.4);
    }
    .loader-pill::before {
      content: '';
      position: absolute; left: 0; top: 0;
      width: 50%; height: 100%;
      background: linear-gradient(135deg, #66B82E, #0B7DB8);
      border-radius: 18px;
      animation: pillFill 1.4s cubic-bezier(.4,0,.2,1) forwards;
    }
    .loader-pill::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
      animation: shimmer 2s infinite;
    }
    @keyframes pillFill {
      from { width: 0 }
      to { width: 100% }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%) }
      100% { transform: translateX(200%) }
    }
    .loader-text {
      font-size: 22px; font-weight: 700;
      background: linear-gradient(135deg, #66B82E, #0B7DB8);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      letter-spacing: 4px;
      animation: loaderPulse 1.4s ease-in-out infinite;
    }
    .loader-sub {
      font-size: 13px; color: rgba(255,255,255,0.5);
      letter-spacing: 2px; margin-top: -16px;
    }
    @keyframes loaderPulse {
      0%,100%{opacity:0.8} 50%{opacity:1}
    }
    .loader-ecg {
      width: 200px; height: 40px;
    }
    .ecg-path {
      fill: none; stroke: #66B82E; stroke-width: 2;
      stroke-dasharray: 600;
      stroke-dashoffset: 600;
      animation: ecgDraw 1.4s ease-out forwards;
      filter: drop-shadow(0 0 6px rgba(102,184,46,0.7));
    }
    @keyframes ecgDraw {
      to { stroke-dashoffset: 0 }
    }

    /* ── Value item counter ── */
    .value-number { font-size: 13px; font-weight: 700; color: var(--primary,#4F46E5); }

    /* ── Color swatch hover glow ── */
    .color-box { transition: transform 0.3s, box-shadow 0.3s !important; }

    /* ── Floating particles on hero ── */
    .hero-float-pill {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      animation: floatPill var(--dur, 6s) var(--delay, 0s) infinite ease-in-out;
    }
    @keyframes floatPill {
      0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
      10%  { opacity: var(--maxop, 0.6); }
      90%  { opacity: var(--maxop, 0.6); }
      100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
    }

    /* ── Section entrance glow ── */
    .section-glow-enter {
      box-shadow: 0 0 0 0 transparent;
      transition: box-shadow 0.6s;
    }
    .section-glow-enter.glowing {
      box-shadow: inset 0 0 80px rgba(102,184,46,0.04);
    }

    /* ── Typing cursor ── */
    .typed-cursor { color: #66B82E; animation: blink 0.8s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

    /* ── Team card ring ── */
    .team-card .ring-anim {
      position: absolute; inset: -4px; border-radius: 20px;
      border: 2px solid transparent;
      background: linear-gradient(135deg,#66B82E,#0B7DB8) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; mask-composite: exclude;
      opacity: 0; transition: opacity 0.35s;
    }
    .team-card { position: relative; }
    .team-card:hover .ring-anim { opacity: 1; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// ── 4. PILL LOADER (Pantalla de carga con píldora) ─────────────────────────
function setupPillLoader() {
  const loader = document.getElementById('fl-pill-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 700);
    }, 1800);
  });
}

// ── 5. CURSOR PERSONALIZADO ─────────────────────────────────────────────────
function injectMedicalCursor() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="fl-cursor"></div>
    <div id="fl-cursor-ring"></div>
  `);
}
function setupCursor() {
  const dot = document.getElementById('fl-cursor');
  const ring = document.getElementById('fl-cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .team-card, .solution-card, .just-card, .meaning-card, .value-item, .flip-card, .color-swatch, label')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// ── 6. BARRA DE PROGRESO DE SCROLL ─────────────────────────────────────────
function injectScrollProgressBar() {
  document.body.insertAdjacentHTML('afterbegin', '<div id="fl-progress-bar"></div>');
}
function setupNavbarScroll() {
  const bar = document.getElementById('fl-progress-bar');
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
    if (window.scrollY > 50) header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    else header.style.boxShadow = '';
  });
}

// ── 7. PARTÍCULAS FLOTANTES (Moléculas + Píldoras) ─────────────────────────
function injectParticlesCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'fl-particles';
  document.body.prepend(canvas);
}
function setupParticles() {
  const canvas = document.getElementById('fl-particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#66B82E', '#0B7DB8', '#00A896', '#F59E0B'];
  const SHAPES = ['circle', 'pill', 'cross', 'dot'];

  class Particle {
    constructor() { this.reset(); this.y = Math.random() * H; }
    reset() {
      this.x = Math.random() * W;
      this.y = H + 20;
      this.r = 3 + Math.random() * 7;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -(0.3 + Math.random() * 0.7);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.alpha = 0.2 + Math.random() * 0.4;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      if (this.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, this.r, 0, Math.PI * 2); ctx.fill();
      } else if (this.shape === 'pill') {
        const w = this.r * 2.4, h = this.r;
        ctx.beginPath(); ctx.roundRect(-w/2, -h/2, w, h, h/2); ctx.fill();
      } else if (this.shape === 'cross') {
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-this.r, 0); ctx.lineTo(this.r, 0);
        ctx.moveTo(0, -this.r); ctx.lineTo(0, this.r); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(0, 0, this.r * 0.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.rot += this.rotSpeed;
      if (this.y < -20) this.reset();
    }
  }

  for (let i = 0; i < 55; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

// ── 8. HEARTBEAT LINE (línea de pulso en el footer) ─────────────────────────
function injectHeartbeatLine() {
  const div = document.createElement('div');
  div.id = 'fl-heartbeat';
  div.innerHTML = `
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hbGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#66B82E"/>
          <stop offset="50%" stop-color="#0B7DB8"/>
          <stop offset="100%" stop-color="#00A896"/>
        </linearGradient>
      </defs>
      <path class="hb-line" id="hb-path" d=""/>
    </svg>
  `;
  document.body.appendChild(div);

  const path = document.getElementById('hb-path');
  let offset = 0;
  function generateECG(shift) {
    const pts = [];
    const W = 1200, H = 30;
    const seg = 80;
    for (let x = -seg; x < W + seg; x++) {
      const pos = (x + shift) % seg;
      let y = H;
      if (pos > 15 && pos < 20) y = H - 6;
      else if (pos > 20 && pos < 23) y = H + 10;
      else if (pos > 23 && pos < 27) y = H - 28;
      else if (pos > 27 && pos < 31) y = H + 8;
      else if (pos > 31 && pos < 34) y = H - 5;
      pts.push(`${x},${y}`);
    }
    path.setAttribute('d', 'M ' + pts.join(' L '));
  }
  function animHB() { generateECG(offset); offset += 0.8; requestAnimationFrame(animHB); }
  animHB();
}

// ── 9. MOLÉCULA ORBITAL ─────────────────────────────────────────────────────
function injectMoleculeOrbit() {
  const div = document.createElement('div');
  div.id = 'fl-molecule';
  div.innerHTML = `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="8" fill="#66B82E" opacity="0.9"/>
      <circle cx="60" cy="60" r="28" fill="none" stroke="#66B82E" stroke-width="1" stroke-dasharray="4 4" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="88" cy="60" r="6" fill="#0B7DB8" opacity="0.8">
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath href="#orb1"/>
        </animateMotion>
      </circle>
      <path id="orb1" d="M60,32 A28,28 0 1,1 59.9,32" fill="none"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#0B7DB8" stroke-width="1" stroke-dasharray="3 6" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="10s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="12" r="5" fill="#00A896" opacity="0.7">
        <animateMotion dur="10s" repeatCount="indefinite">
          <mpath href="#orb2"/>
        </animateMotion>
      </circle>
      <path id="orb2" d="M60,12 A48,48 0 1,0 59.9,12" fill="none"/>
    </svg>
  `;
  document.body.appendChild(div);
  window.addEventListener('scroll', () => {
    div.classList.toggle('visible', window.scrollY > 300);
  });
}

// ── 10. HERO ANIMATIONS ─────────────────────────────────────────────────────
function setupHeroAnimations() {
  const tl = gsap.timeline({ delay: 2.1 });
  tl.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' })
    .from('.hero-title, .hero-title-new', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .from('.hero-subtitle, .hero-subtitle-new', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .from('.hero-badges .badge', { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, '-=0.3')
    .from('.hero-chart-card, .hero-new-visual', { x: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

  // Floating pills inside hero
  const hero = document.querySelector('.hero, .hero-new');
  if (hero) {
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    const pillColors = ['#66B82E', '#0B7DB8', '#00A896', '#F59E0B', 'rgba(255,255,255,0.4)'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'hero-float-pill';
      const size = 6 + Math.random() * 14;
      const isRect = Math.random() > 0.5;
      p.style.cssText = `
        width:${isRect ? size * 2.2 : size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom: ${Math.random() * 30}%;
        background:${pillColors[Math.floor(Math.random() * pillColors.length)]};
        border-radius:${isRect ? size / 2 : '50%'}px;
        --dur:${5 + Math.random() * 8}s;
        --delay:${Math.random() * 6}s;
        --maxop:${0.2 + Math.random() * 0.45};
      `;
      hero.appendChild(p);
    }
  }
}

// ── 11. CONTADORES ANIMADOS ─────────────────────────────────────────────────
function setupCounters() {
  const stats = document.querySelectorAll('.intro-stat-value');
  stats.forEach(el => {
    const original = el.textContent.trim();
    if (original === '∞') return;
    const match = original.match(/[\d.]+/);
    if (!match) return;
    const num = parseFloat(match[0]);
    const suffix = original.replace(match[0], '');
    el.textContent = '0' + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: num, duration: 2, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = (Number.isInteger(num) ? Math.round(this.targets()[0].val) : this.targets()[0].val.toFixed(1)) + suffix;
          }
        });
      },
      once: true
    });
  });
}

// ── 12. SCROLL REVEAL CINEMATOGRÁFICO ───────────────────────────────────────
function setupScrollReveal() {
  // Añadir clases de ocultamiento
  const revealMap = [
    ['.section-title, .just-title, .intro-title', 'fl-hidden'],
    ['.section-intro, .intro-text', 'fl-hidden'],
    ['.solution-card', 'fl-hidden-scale'],
    ['.feature-item', 'fl-hidden'],
    ['.tech-block, .design-block, .organization-block, .ux-block', 'fl-hidden-left'],
    ['.identity-item', 'fl-hidden'],
    ['.team-card', 'fl-hidden-scale'],
    ['.footer-col', 'fl-hidden'],
  ];
  revealMap.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach(el => el.classList.add(cls));
  });

  const revealEls = document.querySelectorAll('.fl-hidden, .fl-hidden-left, .fl-hidden-right, .fl-hidden-scale');
  revealEls.forEach((el, i) => {
    let from = {};
    if (el.classList.contains('fl-hidden')) from = { y: 45, opacity: 0 };
    if (el.classList.contains('fl-hidden-left')) from = { x: -50, opacity: 0 };
    if (el.classList.contains('fl-hidden-right')) from = { x: 50, opacity: 0 };
    if (el.classList.contains('fl-hidden-scale')) from = { scale: 0.82, opacity: 0 };
    gsap.set(el, { ...from });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          x: 0, y: 0, scale: 1, opacity: 1,
          duration: 0.75,
          delay: (i % 4) * 0.1,
          ease: 'power3.out',
        });
        el.classList.add('section-glow-enter');
        setTimeout(() => el.classList.add('glowing'), 50);
      },
      once: true
    });
  });
}

// ── 13. 3D CARD HOVER ──────────────────────────────────────────────────────
function setupCardHover3D() {
  const cards = document.querySelectorAll('.solution-card, .just-card, .meaning-card, .team-card');
  cards.forEach(card => {
    card.style.transition = 'transform 0.15s ease, box-shadow 0.3s';
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -10;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 10;
      gsap.to(card, { rotationX: rx, rotationY: ry, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'elastic.out(1, 0.7)' });
    });
  });
}

// ── 14. HEARTBEAT PULSE EN TARJETAS DE EQUIPO ───────────────────────────────
function setupHeartbeatPulse() {
  // Add ring to every team card
  document.querySelectorAll('.team-card').forEach(card => {
    const ring = document.createElement('div');
    ring.className = 'ring-anim';
    card.appendChild(ring);
  });

  // Pulse animación SVG circles en avatares
  document.querySelectorAll('.team-avatar circle').forEach(circle => {
    gsap.to(circle, {
      attr: { r: parseFloat(circle.getAttribute('r')) + 3 },
      duration: 1.0, repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: Math.random() * 1.5
    });
  });
}

// ── 15. TYPING EFFECT EN HERO ───────────────────────────────────────────────
function setupTypingEffect() {
  const el = document.querySelector('.hero-eyebrow');
  if (!el) return;
  const phrases = [
    'Plataforma inteligente de salud',
    'Compara · Ahorra · Decide',
    'Tecnología al servicio del bienestar',
  ];
  let pi = 0, ci = 0, deleting = false, timeout;

  function typeStep() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; timeout = setTimeout(typeStep, 2200); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; timeout = setTimeout(typeStep, 400); return; }
    }
    timeout = setTimeout(typeStep, deleting ? 35 : 70);
  }
  setTimeout(typeStep, 2500);
}

// ── 16. STAGGER CARDS (Justificación, Valores) ─────────────────────────────
function setupStaggerCards() {
  ['.just-grid', '.values-grid', '.features-grid', '.meaning-grid'].forEach(sel => {
    const grid = document.querySelector(sel);
    if (!grid) return;
    const items = grid.querySelectorAll(':scope > *');
    gsap.set(items, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.65,
          stagger: 0.14, ease: 'back.out(1.3)',
        });
      },
      once: true
    });
  });
}

// ── 17. FLOATING BADGES en hero ─────────────────────────────────────────────
function setupFloatingBadges() {
  document.querySelectorAll('.hero-badges .badge').forEach((badge, i) => {
    gsap.to(badge, {
      y: -8, duration: 1.8 + i * 0.3, repeat: -1, yoyo: true,
      ease: 'sine.inOut', delay: i * 0.5
    });
  });
}

// ── 18. TEAM CARDS ENTRADA ESPECTACULAR ─────────────────────────────────────
function setupTeamCards() {
  const grid = document.querySelector('.team-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.team-card');
  gsap.set(cards, { y: 80, opacity: 0, scale: 0.8, rotationY: -25 });
  ScrollTrigger.create({
    trigger: grid,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1, rotationY: 0,
        duration: 0.8, stagger: 0.2,
        ease: 'back.out(1.4)',
      });
    },
    once: true
  });
}

// ── 19. VALUES MORPH (borde izquierdo animado) ─────────────────────────────
function setupValuesMorph() {
  document.querySelectorAll('.value-item').forEach((item, i) => {
    const colors = ['#66B82E', '#0B7DB8', '#00A896', '#F59E0B', '#8B5CF6'];
    item.style.borderLeftColor = colors[i % colors.length];
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { borderLeftWidth: '6px', paddingLeft: '30px', duration: 0.2 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { borderLeftWidth: '4px', paddingLeft: '28px', duration: 0.25 });
    });
  });
}

// ── 20. COLOR SWATCHES GLOW ─────────────────────────────────────────────────
function setupColorSwatches() {
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    const box = swatch.querySelector('.color-box');
    if (!box) return;
    const color = box.style.backgroundColor;
    swatch.addEventListener('mouseenter', () => {
      gsap.to(box, {
        scale: 1.08, boxShadow: `0 8px 32px ${color}88`,
        duration: 0.3, ease: 'power2.out'
      });
    });
    swatch.addEventListener('mouseleave', () => {
      gsap.to(box, { scale: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', duration: 0.3 });
    });
  });
}

// ── 21. FOOTER WAVE + ENTRANCE ──────────────────────────────────────────────
function setupFooterWave() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  const cols = footer.querySelectorAll('.footer-col');
  gsap.set(cols, { y: 40, opacity: 0 });
  ScrollTrigger.create({
    trigger: footer,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(cols, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' });
    },
    once: true
  });
  // Tech badges bounce
  gsap.from('.tech-badge', {
    scale: 0.6, opacity: 0, duration: 0.5,
    stagger: 0.08, ease: 'back.out(2)',
    scrollTrigger: { trigger: '.footer-tech-stack', start: 'top 90%', once: true }
  });
}

// ── 22. PARALLAX EN SECCIONES ───────────────────────────────────────────────
function setupParallaxSections() {
  document.querySelectorAll('.intro-stat-value').forEach(el => {
    gsap.to(el, {
      y: -30, ease: 'none',
      scrollTrigger: { trigger: el, scrub: true, start: 'top bottom', end: 'bottom top' }
    });
  });
  const businessName = document.querySelector('.business-name-block');
  if (businessName) {
    gsap.from(businessName, {
      scale: 0.9, opacity: 0, y: 50, duration: 1,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: businessName, start: 'top 80%', once: true }
    });
  }
}

// ── 23. BOTONES MAGNÉTICOS ──────────────────────────────────────────────────
function setupMagneticButtons() {
  document.querySelectorAll('.btn-magnetic, .nav-menu a, .mobile-menu-list a').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: dx * 0.25, y: dy * 0.25, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ── 24. GLITCH EN LOGO TEXT ─────────────────────────────────────────────────
function setupGlitchText() {
  const logoText = document.querySelector('.logo-text');
  if (!logoText) return;
  logoText.classList.add('glitch-text');
  logoText.setAttribute('data-text', logoText.textContent);
}

// ── 25. TOAST NOTIFICATION ─────────────────────────────────────────────────
function injectToastNotification() {
  const div = document.createElement('div');
  div.id = 'fl-toast';
  div.innerHTML = `<span class="toast-dot"></span><span id="fl-toast-msg">💊 Bienvenido a FarmaLink</span>`;
  document.body.appendChild(div);
}
(function scheduleToasts() {
  const toasts = [
    '💊 Bienvenido a FarmaLink — Encuentra. Compara. Ahorra.',
    '🔍 Precios actualizados en tiempo real',
    '🤖 IA activa: recomendaciones personalizadas',
    '📍 Geolocalización inteligente habilitada',
    '✅ Plataforma cargada correctamente',
  ];
  let idx = 0;
  function showToast() {
    const el = document.getElementById('fl-toast');
    const msg = document.getElementById('fl-toast-msg');
    if (!el || !msg) return;
    msg.textContent = toasts[idx % toasts.length];
    el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); idx++; setTimeout(showToast, 8000); }, 3500);
  }
  setTimeout(showToast, 3000);
})();

// ── 26. MOBILE MENU ANIMATION ───────────────────────────────────────────────
function setupMobileMenuAnimation() {
  const toggle = document.getElementById('menu-toggle');
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    const items = document.querySelectorAll('.mobile-menu-list li');
    if (toggle.checked) {
      gsap.fromTo(items, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.4,
        stagger: 0.07, ease: 'power3.out', delay: 0.15
      });
    }
  });
}

// ── 27. PILL LOADER HTML (se inserta antes del body) ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const loaderHTML = `
    <div id="fl-pill-loader">
      <svg class="loader-ecg" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        <path class="ecg-path" d="M0,20 L30,20 L40,20 L45,8 L50,34 L55,4 L60,36 L65,20 L75,20 L200,20"/>
      </svg>
      <div class="loader-text">FARMALINK</div>
      <div class="loader-sub">CARGANDO PLATAFORMA...</div>
      <div class="loader-pill"></div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);
});