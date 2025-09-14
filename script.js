// script.js — overlay entry, canvas bg, nav toggle, reveal on scroll, footer year
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Intro overlay: add 'hiding' after animation
  const overlay = document.getElementById('intro-overlay');
  // keep overlay visible ~1200ms then hide smoothly
  setTimeout(() => {
    if (!overlay) return;
    overlay.classList.add('hiding');
    // remove from DOM after transition
    setTimeout(() => overlay.remove(), 700);
  }, 900);

  // Nav toggle
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('show'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') nav.classList.remove('show'); });

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  reveals.forEach(r => obs.observe(r));

  // Hero micro entry (stagger)
  requestAnimationFrame(()=> {
    const heroTitle = document.querySelector('.hero-title');
    const heroBadge = document.querySelector('.badge');
    const heroActions = document.querySelector('.hero-actions');
    [heroBadge, heroTitle, heroActions].forEach((el,i) => {
      if (!el) return;
      el.style.opacity = 0;
      el.style.transform = 'translateY(18px)';
      setTimeout(()=> {
        el.style.transition = 'all 600ms cubic-bezier(.2,.9,.2,1)';
        el.style.opacity = 1;
        el.style.transform = 'none';
      }, 400 + i*120);
    });
  });

  // Canvas background (stars + grid)
  const canvas = document.getElementById('bg-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.clientWidth;
    let h = canvas.height = canvas.clientHeight;
    const stars = [];

    function initStars() {
      stars.length = 0;
      const count = Math.max(30, Math.floor((w*h) / 8000));
      for (let i=0;i<count;i++){
        stars.push({
          x: Math.random()*w,
          y: Math.random()*h*0.9,
          r: Math.random()*1.4 + 0.3,
          alpha: Math.random()*0.8 + 0.2,
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
    }0
    window.addEventListener('resize', onResize);
    initStars();
    draw();
  }
});
