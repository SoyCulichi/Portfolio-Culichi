// script.js — SVG intro draw (CULICHI), overlay hide, canvas bg, offcanvas menu, reveal on scroll, footer year
document.addEventListener('DOMContentLoaded', () => {
  // set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- SVG intro draw ----------
  const overlay = document.getElementById('intro-overlay');
  const introText = document.getElementById('intro-text');

  if (introText && overlay) {
    let length;
    try { length = introText.getComputedTextLength(); }
    catch (e) { length = 1200; }

    introText.style.strokeDasharray = length;
    introText.style.strokeDashoffset = length;

    const drawDuration = 1500; // ms
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / drawDuration);
      const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
      introText.style.strokeDashoffset = Math.round(length * (1 - eased));
      if (t < 1) requestAnimationFrame(step);
      else {
        introText.style.strokeDashoffset = 0;
        overlay.classList.add('intro-drawn');
        setTimeout(() => {
          overlay.classList.add('hiding');
          setTimeout(() => overlay.remove(), 700);
        }, 550);
      }
    }
    requestAnimationFrame(step);
  }

  // ---------- Offcanvas menu / hamburger ----------
  const offcanvas = document.getElementById('offcanvas');
  const navToggle = document.getElementById('nav-toggle');
  const offcanvasClose = document.getElementById('offcanvas-close');

  function openOffcanvas() {
    if (!offcanvas) return;
    offcanvas.classList.add('open');
    offcanvas.setAttribute('aria-hidden', 'false');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeOffcanvas() {
    if (!offcanvas) return;
    offcanvas.classList.remove('open');
    offcanvas.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (offcanvas.classList.contains('open')) closeOffcanvas();
      else openOffcanvas();
    });
  }
  if (offcanvasClose) offcanvasClose.addEventListener('click', closeOffcanvas);

  // allow links in offcanvas to close it
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => closeOffcanvas());
  });

  // close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOffcanvas();
    }
  });

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.15});
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('revealed'));
  }

  // ---------- Canvas background (stars + grid) ----------
  (function initCanvasBg(){
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.clientWidth;
    let h = canvas.height = canvas.clientHeight;
    let stars = [];

    function initStars() {
      stars = [];
      const count = Math.max(30, Math.floor((w*h)/8000));
      for (let i=0;i<count;i++){
        stars.push({
          x: Math.random()*w,
          y: Math.random()*h*0.9,
          r: Math.random()*1.4 + 0.3,
          alpha: Math.random()*0.8 + 0.15,
          dy: Math.random()*0.35 + 0.02
        });
      }
    }

    function drawGrid(){
      ctx.save();
      ctx.translate(0, h*0.22);
      ctx.strokeStyle = 'rgba(0,255,106,0.04)';
      ctx.lineWidth = 1;
      const rows = 12;
      for (let i=0;i<rows;i++){
        const y = (i/rows) * (h*0.8);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let i=0;i<20;i++){
        const x = (i/19)*w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - (h*0.6), h*0.8);
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw(){
      ctx.clearRect(0,0,w,h);
      const grad = ctx.createLinearGradient(0,0,0,h);
      grad.addColorStop(0, '#051014');
      grad.addColorStop(1, '#020507');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,w,h);

      drawGrid();

      for (let s of stars){
        s.y += s.dy;
        if (s.y > h) s.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    let resizeTimer;
    function onResize(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=> {
        w = canvas.width = canvas.clientWidth;
        h = canvas.height = canvas.clientHeight;
        initStars();
      }, 120);
    }
    window.addEventListener('resize', onResize);
    initStars();
    draw();
  })();

});
