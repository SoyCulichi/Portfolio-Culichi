
// Pequeñas interacciones: menú móvil y año en footer

document.addEventListener('DOMContentLoaded', function(){
    
  // año en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

  // menú móvil
const nav = document.getElementById('nav');
const toggle = document.getElementById('nav-toggle');
toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

  // accesibilidad: cerrar nav con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
    nav.classList.remove('show');
    }
});
});
