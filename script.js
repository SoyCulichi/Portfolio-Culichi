/**
 * ============================================================
 * DEVCULICHI PORTFOLIO - SCRIPT PRINCIPAL
 * ============================================================
 * 
 * Este archivo contiene toda la funcionalidad JavaScript del portafolio:
 * - Animación SVG de introducción con stroke-dasharray
 * - Canvas animado con estrellas y grid de fondo
 * - Menú offcanvas responsive con hamburger menu
 * - Efectos parallax en la sección hero
 * - Reveal on scroll con Intersection Observer
 * - Utilidades generales (año dinámico, manejo de errores)
 * 
 * @author DevCulichi
 * @version 1.0
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * ACTUALIZACIÓN AUTOMÁTICA DEL AÑO EN EL FOOTER
     * Busca el elemento con id 'year' y actualiza su contenido
     * con el año actual para mantener el copyright actualizado
     */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /**
     * ANIMACIÓN DE INTRODUCCIÓN SVG
     * Crea un efecto de escritura animada para el texto "DevCulichi"
     * usando stroke-dasharray y stroke-dashoffset
     * 
     * Proceso:
     * 1. Calcula la longitud total del texto SVG
     * 2. Aplica dash-array y offset para ocultar el texto
     * 3. Anima el offset de 100% a 0% creando efecto de escritura
     * 4. Usa easing cuadrático para suavizar la animación
     * 5. Al terminar, oculta el overlay con fade out
     */
    const overlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');

    if (introText && overlay) {
        let length;
        // Intentar obtener la longitud real del texto, fallback si falla
        try {
            length = introText.getComputedTextLength();
        } catch (e) {
            console.warn('No se pudo calcular la longitud del texto SVG, usando valor por defecto');
            length = 1200; // Valor por defecto
        }

        // Configurar las propiedades iniciales del stroke
        introText.style.strokeDasharray = length;
        introText.style.strokeDashoffset = length;

        const drawDuration = 1500; // Duración de la animación en ms
        const start = performance.now();

        /**
         * Función de animación recursiva
         * @param {number} now - Timestamp actual de performance.now()
         */
        function step(now) {
            // Calcular progreso normalizado (0 a 1)
            const t = Math.min(1, (now - start) / drawDuration);
            
            // Aplicar easing cuadrático para suavizar la animación
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            
            // Actualizar el offset del stroke
            introText.style.strokeDashoffset = Math.round(length * (1 - eased));
            
            if (t < 1) {
                // Continuar animación
                requestAnimationFrame(step);
            } else {
                // Animación completada - iniciar secuencia de salida
                introText.style.strokeDashoffset = 0;
                overlay.classList.add('intro-drawn');
                
                setTimeout(() => {
                    overlay.classList.add('hiding');
                    setTimeout(() => {
                        overlay.remove();
                    }, 700);
                }, 550);
            }
        }
        
        // Iniciar la animación
        requestAnimationFrame(step);
    }

    /**
     * SISTEMA DE MENÚ OFFCANVAS (MÓVIL)
     * Maneja el menú lateral deslizante para dispositivos móviles
     * 
     * Características:
     * - Hamburger menu animado (3 líneas)
     * - Overlay de fondo semi-transparente
     * - Bloqueo de scroll cuando está abierto
     * - Soporte para teclado (ESC para cerrar)
     * - Cierre automático al hacer clic en enlaces
     * - Atributos ARIA para accesibilidad
     */
    const offcanvas = document.getElementById('offcanvas');
    const navToggle = document.getElementById('nav-toggle');
    const offcanvasClose = document.getElementById('offcanvas-close');

    /**
     * Abre el menú offcanvas
     * Actualiza clases, atributos ARIA y bloquea scroll
     */
    function openOffcanvas() {
        if (!offcanvas) return;
        
        offcanvas.classList.add('open');
        offcanvas.setAttribute('aria-hidden', 'false');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    /**
     * Cierra el menú offcanvas
     * Restaura estado inicial y habilita scroll
     */
    function closeOffcanvas() {
        if (!offcanvas) return;
        
        offcanvas.classList.remove('open');
        offcanvas.setAttribute('aria-hidden', 'true');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    // Event listeners para abrir/cerrar menú
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (offcanvas.classList.contains('open')) {
                closeOffcanvas();
            } else {
                openOffcanvas();
            }
        });
    }
    
    if (offcanvasClose) {
        offcanvasClose.addEventListener('click', closeOffcanvas);
    }

    // Cerrar menú al hacer clic en enlaces con atributo [data-close]
    document.querySelectorAll('[data-close]').forEach(element => {
        element.addEventListener('click', () => closeOffcanvas());
    });

    // Cerrar menú con tecla Escape (accesibilidad)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeOffcanvas();
        }
    });

    /**
     * REVEAL ON SCROLL - SISTEMA DE ANIMACIONES
     * Utiliza Intersection Observer API para revelar elementos al hacer scroll
     * 
     * Funcionamiento:
     * - Observa elementos con atributo [data-reveal]
     * - Cuando entran en viewport, añade clase 'revealed'
     * - Deja de observar elementos ya revelados (optimización)
     * - Fallback para navegadores sin soporte
     */
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if ('IntersectionObserver' in window && revealElements.length) {
        const observerOptions = {
            threshold: 0.15, // Activar cuando 15% del elemento es visible
            rootMargin: '0px 0px -50px 0px' // Margen negativo para activar antes
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Dejar de observar el elemento (optimización de rendimiento)
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Comenzar a observar todos los elementos
        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        // Fallback: revelar todos los elementos inmediatamente
        console.warn('IntersectionObserver no disponible, activando reveal en todos los elementos');
        revealElements.forEach(element => element.classList.add('revealed'));
    }

    /**
     * CANVAS ANIMADO DE FONDO
     * Crea un fondo dinámico con estrellas en movimiento y grid perspectivo
     * 
     * Características:
     * - Estrellas animadas que caen lentamente
     * - Grid en perspectiva con efecto 3D
     * - Gradiente de fondo dinámico
     * - Responsive (se adapta al tamaño de ventana)
     * - Optimizado con requestAnimationFrame
     */
    (function initCanvasBackground() {
        const canvas = document.getElementById('bg-canvas');
        
        // Verificar soporte y existencia del canvas
        if (!canvas || !canvas.getContext) {
            console.warn('Canvas no disponible o sin soporte');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let canvasWidth = canvas.width = canvas.clientWidth;
        let canvasHeight = canvas.height = canvas.clientHeight;
        let stars = [];

        /**
         * Inicializa el array de estrellas con propiedades aleatorias
         * La cantidad de estrellas se basa en el área del canvas
         */
        function initStars() {
            stars = [];
            // Calcular cantidad óptima de estrellas basada en el área
            const starCount = Math.max(30, Math.floor((canvasWidth * canvasHeight) / 8000));
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight * 0.9, // Evitar zona inferior
                    r: Math.random() * 1.4 + 0.3, // Radio entre 0.3 y 1.7
                    alpha: Math.random() * 0.8 + 0.15, // Opacidad entre 0.15 y 0.95
                    dy: Math.random() * 0.35 + 0.02 // Velocidad vertical lenta
                });
            }
        }

        /**
         * Dibuja el grid en perspectiva 3D
         * Crea un efecto de profundidad con líneas que convergen
         */
        function drawGrid() {
            ctx.save();
            ctx.translate(0, canvasHeight * 0.22); // Offset vertical
            ctx.strokeStyle = 'rgba(0,255,106,0.04)'; // Verde muy tenue
            ctx.lineWidth = 1;
            
            const gridRows = 12;
            
            // Líneas horizontales (paralelas)
            for (let i = 0; i < gridRows; i++) {
                const y = (i / gridRows) * (canvasHeight * 0.8);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvasWidth, y);
                ctx.stroke();
            }
            
            // Líneas verticales con perspectiva (convergen hacia abajo)
            for (let i = 0; i < 20; i++) {
                const x = (i / 19) * canvasWidth;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                // Línea inclinada para crear perspectiva
                ctx.lineTo(x - (canvasHeight * 0.6), canvasHeight * 0.8);
                ctx.stroke();
            }
            
            ctx.restore();
        }

        /**
         * Función principal de renderizado
         * Dibuja el fondo, grid y estrellas en cada frame
         */
        function drawFrame() {
            // Limpiar canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            // Crear gradiente de fondo
            const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            gradient.addColorStop(0, '#051014'); // Azul oscuro arriba
            gradient.addColorStop(1, '#020507'); // Casi negro abajo
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Dibujar grid en perspectiva
            drawGrid();

            // Animar y dibujar estrellas
            for (let star of stars) {
                // Mover estrella hacia abajo
                star.y += star.dy;
                
                // Reciclar estrella cuando sale del canvas
                if (star.y > canvasHeight) {
                    star.y = 0;
                    star.x = Math.random() * canvasWidth;
                }
                
                // Dibujar estrella
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
                ctx.fill();
            }
            
            // Continuar animación
            requestAnimationFrame(drawFrame);
        }

        /**
         * Maneja el redimensionamiento de ventana con throttling
         * Evita cálculos excesivos durante el resize
         */
        let resizeTimer;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                canvasWidth = canvas.width = canvas.clientWidth;
                canvasHeight = canvas.height = canvas.clientHeight;
                initStars(); // Recalcular estrellas para el nuevo tamaño
            }, 120); // Throttle de 120ms
        }
        
        // Event listener para resize
        window.addEventListener('resize', handleResize);
        
        // Inicializar y comenzar animación
        initStars();
        drawFrame();
    })();

});

/**
 * ============================================================
 * EFECTO PARALLAX EN SECCIÓN HERO
 * ============================================================
 * 
 * Crea un efecto de profundidad moviendo elementos a diferentes velocidades
 * mientras el usuario hace scroll por la página.
 * 
 * Elementos afectados:
 * - .hero-left: texto principal (movimiento sutil)
 * - .hero-illustration: imagen (movimiento más pronunciado)
 * 
 * Optimización:
 * - Usa requestAnimationFrame para suavizar la animación
 * - Sistema de throttling para evitar cálculos excesivos
 * - Solo se ejecuta cuando el hero está visible en viewport
 */
(function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroLeft = document.querySelector('.hero-left');
    const heroImg = document.querySelector('.hero-illustration');
    
    // Verificar que existen los elementos necesarios
    if (!hero || (!heroLeft && !heroImg)) {
        console.warn('Elementos necesarios para parallax no encontrados');
        return;
    }

    let latestScrollY = 0;
    let isAnimating = false;
    const maxParallaxOffset = 40; // Máximo desplazamiento en pixels

    /**
     * Captura el scroll de forma optimizada
     * Usa requestAnimationFrame para evitar jank
     */
    function onScroll() {
        latestScrollY = window.scrollY;
        
        if (!isAnimating) {
            window.requestAnimationFrame(() => {
                updateParallaxEffect(latestScrollY);
                isAnimating = false;
            });
            isAnimating = true;
        }
    }

    /**
     * Actualiza las transformaciones parallax
     * @param {number} scrollY - Posición actual del scroll
     */
    function updateParallaxEffect(scrollY) {
        const heroRect = hero.getBoundingClientRect();
        
        // Solo aplicar parallax cuando el hero está visible
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            // Calcular progreso basado en la posición del centro del hero
            // respecto al centro del viewport (-1 a 1)
            const heroCenterY = heroRect.top + heroRect.height / 2;
            const viewportCenterY = window.innerHeight / 2;
            const progress = (viewportCenterY - heroCenterY) / viewportCenterY;
            
            // Calcular desplazamientos con diferentes intensidades
            const leftOffset = progress * (maxParallaxOffset * 0.7);  // 70% intensidad
            const imageOffset = progress * (maxParallaxOffset * 1.1); // 110% intensidad
            
            // Aplicar transformaciones
            if (heroLeft) {
                heroLeft.style.transform = `translateY(${leftOffset}px)`;
            }
            
            if (heroImg) {
                // Parallax vertical + sutil movimiento horizontal
                const horizontalOffset = Math.min(20, Math.abs(progress * 8)) * (progress > 0 ? -1 : 1);
                heroImg.style.transform = `translateY(${imageOffset}px) translateX(${horizontalOffset}px)`;
            }
        }
    }

    // Configurar event listener con passive para mejor rendimiento
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Ejecutar una vez al cargar para posición inicial
    updateParallaxEffect(window.scrollY);
})();

/**
 * ============================================================
 * REVEAL ON SCROLL - SISTEMA ALTERNATIVO
 * ============================================================
 * 
 * Sistema de respaldo para elementos con [data-reveal]
 * Solo se ejecuta si no se inicializó el sistema principal
 * 
 * Este código actúa como fallback para asegurar compatibilidad
 * con navegadores más antiguos o si hay problemas con el
 * IntersectionObserver principal.
 */
(function initFallbackReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (!revealElements.length) {
        return; // No hay elementos para revelar
    }
    
    // Verificar si ya existe un observer funcionando
    const alreadyRevealed = Array.from(revealElements).some(el => 
        el.classList.contains('revealed')
    );
    
    if (alreadyRevealed) {
        return; // El sistema principal ya está funcionando
    }
    
    // Crear observer alternativo con configuración diferente
    const fallbackObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });
    
    revealElements.forEach(element => fallbackObserver.observe(element));
})();
