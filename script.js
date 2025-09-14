// script.js — SVG intro draw (CULICHI), overlay hide, canvas bg, nav toggle, reveal on scroll, footer year
document.addEventListener('DOMContentLoaded', () => {
  // set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- SVG intro draw ----------
  const overlay = document.getElementById('intro-overlay');
  const introSvg = document.getElementById('intro-svg');
  const introText = document.getElementById('intro-text');

  if (introText && overlay) {
    // compute length of the rendered text
    let length;
    try {
      length = introText.getComputedTextLength();
    } catch (e) {
      // fallback length
      length = 1200;
    }

    // apply dash array/offset
    introText.style.strokeDasharray = length;
    introText.style.strokeDashoffset = length;

    // force reflow then animate dashoffset to 0 (draw)
    requestAnimationFrame(() => {
      // add class to trigger CSS transition (intro-drawn changes stroke-width & fill after draw)
      // we'll animate strokeDashoffset via JS for smoother guaranteed timing
      const drawDuration = 1500; // ms
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / drawDuration);
        const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; // simple ease
        introText.style.strokeDashoffset = Math.round(length * (1 - eased));
        if (t < 1) requestAnimationFrame(step);
        else {
          // finalize
          introText.style.strokeDashoffset = 0;
          // add class to fill and reduce stroke width (creates neon fill effect)
          overlay.classList.add('intro-drawn');
          // after a short pause, hide overlay
          setTimeout(() => {
            overlay.classList.add('hiding');
            setTimeout(() => {
              // remove overlay from DOM to avoid capturing pointer events
              overlay.remove();
            }, 700);
          }, 550);
        }
      }
      requestAnimationFrame(step);
    });
  }

  // ---------- Nav toggle ----------
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('show'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') nav.classList.remove('show'); });

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
    // fallback: reveal all
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
