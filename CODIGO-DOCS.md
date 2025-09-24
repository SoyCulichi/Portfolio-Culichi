# 📚 Documentación de Código - DevCulichi Portfolio

## 🏗️ Arquitectura del Proyecto

Este portafolio está construido con tecnologías web vanilla (HTML, CSS, JavaScript puro) para máximo rendimiento y compatibilidad.

### 📁 Estructura de Archivos

```
Portfolio-Culichi/
│
├── 📄 index.html              # Página principal con estructura semántica
├── 🎨 styles.css              # Estilos CSS con sistema de variables
├── ⚡ script.js               # Funcionalidad JavaScript documentada
├── 📖 README.md               # Documentación principal del proyecto
├── 📚 CODIGO-DOCS.md          # Este archivo de documentación
│
├── 📁 assets/                 # Recursos gráficos
│   ├── 🖼️ dev-illustration.svg # Ilustración del desarrollador
│   ├── 📁 icons/              # Iconos SVG para tecnologías y UI
│   │   ├── html.svg
│   │   ├── css.svg
│   │   ├── javascript.svg
│   │   ├── git.svg
│   │   ├── github.svg
│   │   ├── linkedin.svg
│   │   ├── twitter.svg
│   │   ├── calendly.svg
│   │   └── external-link.svg
│   │
│   └── 📁 projects/           # Imágenes de proyectos
│       ├── calculator.svg
│       └── todo.svg
│
└── 📁 assetsPortfolio/        # Recursos adicionales
    ├── css.svg
    ├── desarrollador.svg
    ├── git.svg
    ├── github.svg
    ├── html.svg
    └── javascript.svg
```

---

## 🧩 Componentes Principales

### 1. 🎬 **Animación de Introducción**
**Archivo:** `script.js` (líneas 24-76)

```javascript
// Ubicación: document.addEventListener('DOMContentLoaded', ...)
// Función: Animación SVG con efecto de escritura
```

**¿Cómo funciona?**
1. Calcula la longitud total del texto SVG
2. Configura `stroke-dasharray` y `stroke-dashoffset`
3. Anima el offset de 100% a 0% con easing
4. Al completar, inicia fade-out y remueve del DOM

**Personalización:**
```javascript
const drawDuration = 1500; // Cambiar duración (ms)
```

### 2. 🌌 **Canvas de Fondo Animado**
**Archivo:** `script.js` (líneas 122-217)

```javascript
// Ubicación: (function initCanvasBackground() {...})()
// Función: Sistema de partículas con estrellas y grid
```

**Características:**
- Estrellas generadas dinámicamente según pantalla
- Grid en perspectiva 3D
- Gradiente de fondo animado
- Responsive con throttled resize

**Personalización:**
```javascript
const starCount = Math.max(30, Math.floor((width * height) / 8000)); // Densidad
const maxParallaxOffset = 40; // Intensidad parallax
```

### 3. 🍔 **Menú Offcanvas**
**Archivo:** `script.js` (líneas 78-120)

```javascript
// Ubicación: Dentro del DOMContentLoaded listener
// Función: Menú lateral para móviles
```

**Funcionalidades:**
- Hamburger menu animado
- Overlay semi-transparente
- Bloqueo de scroll cuando está abierto
- Cierre con ESC o click en enlaces
- Atributos ARIA para accesibilidad

### 4. 🎭 **Efecto Parallax**
**Archivo:** `script.js` (líneas 219-284)

```javascript
// Ubicación: (function initHeroParallax() {...})()
// Función: Movimiento parallax en sección hero
```

**Mecánica:**
- Calcula posición relativa al viewport
- Aplica diferentes intensidades a elementos
- Solo activo cuando hero está visible
- Optimizado con requestAnimationFrame

### 5. 👁️ **Reveal on Scroll**
**Archivo:** `script.js` (líneas 141-160 y 286-320)

```javascript
// Ubicación: Dos implementaciones (principal + fallback)
// Función: Revelar elementos al hacer scroll
```

**Tecnología:**
- Intersection Observer API
- Threshold configurable
- Auto-unobserve para performance
- Fallback para navegadores antiguos

---

## 🎨 Sistema de Estilos CSS

### 📊 **Variables de Diseño**
**Archivo:** `styles.css` (líneas 40-58)

```css
:root {
    /* Esquema de colores */
    --bg: #051014;           /* Fondo principal */
    --panel: #071217;        /* Tarjetas */
    --accent: #00ff6a;       /* Verde neón */
    --text: #e6f3ef;         /* Texto principal */
    
    /* Layout */
    --container: 1200px;     /* Ancho máximo */
    --radius: 10px;          /* Radio de bordes */
}
```

### 🏗️ **Metodología CSS**
1. **Mobile First:** Estilos base para móvil, media queries para desktop
2. **CSS Grid + Flexbox:** Layouts modernos y flexibles  
3. **Custom Properties:** Sistema de tokens de diseño
4. **BEM-ish:** Nomenclatura consistente para clases

### 🎪 **Animaciones**
- **CSS Transitions:** Para hover states y cambios simples
- **CSS Animations:** Para keyframes complejos
- **JavaScript:** Para animaciones con lógica compleja

---

## 🔧 Guía para Desarrolladores

### 🚀 **Comenzar a Desarrollar**

1. **Clonar y configurar:**
```bash
git clone https://github.com/ByCulichi/Portfolio-Culichi.git
cd Portfolio-Culichi
```

2. **Servidor local:**
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

3. **Abrir navegador:**
```
http://localhost:8080
```

### 📝 **Modificar Contenido**

**Información Personal:**
- Editar `index.html` líneas 95-110 (sección hero)
- Cambiar enlaces sociales líneas 45-56 (offcanvas)
- Actualizar información de contacto líneas 218-233

**Proyectos:**
- Modificar `index.html` líneas 117-175 (tarjetas de proyectos)
- Reemplazar imágenes en `assets/projects/`
- Actualizar enlaces de GitHub y demos

**Tecnologías:**
- Editar `index.html` líneas 177-215 (tooling grid)
- Añadir/quitar iconos en `assets/icons/`

### 🎨 **Personalizar Diseño**

**Cambiar Colores:**
```css
/* En styles.css */
:root {
    --accent: #ff6b00;       /* Naranja en lugar de verde */
    --bg: #0a0a0a;           /* Fondo más oscuro */
}
```

**Modificar Animaciones:**
```javascript
// En script.js
const drawDuration = 2000;        // SVG más lento
const maxParallaxOffset = 60;     // Parallax más intenso
```

### 🧪 **Testing y Debugging**

**Console Logs de Debug:**
- `script.js` incluye console.warn() para casos edge
- Abrir DevTools para ver mensajes informativos

**Verificar Rendimiento:**
- Lighthouse en DevTools
- Métricas objetivo: Performance 90+, Accessibility 100

**Cross-browser Testing:**
- Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- Fallbacks para IE (funcionalidad básica)

---

## 📱 Responsive Design

### 🖥️ **Breakpoints**
- **Mobile:** < 768px (base)
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

### 📐 **Técnicas Utilizadas**
- CSS Grid con `auto-fit` y `minmax()`
- Flexbox para componentes flexibles
- Viewport units (`vh`, `vw`) para hero
- Relative units (`rem`, `em`) para escalabilidad

---

## 🎯 Performance y Optimización

### ⚡ **Optimizaciones Implementadas**

1. **JavaScript:**
   - RequestAnimationFrame para animaciones
   - Throttled resize events (120ms)
   - Intersection Observer con unobserve
   - Passive event listeners

2. **CSS:**
   - Hardware acceleration (`transform3d`)
   - Will-change hints para animaciones
   - CSS containment donde apropiado

3. **Assets:**
   - SVG en lugar de imágenes raster
   - Iconos optimizados y minificados
   - No dependencias externas (excepto Google Fonts)

### 📊 **Métricas Objetivo**
- **First Contentful Paint:** < 2s
- **Largest Contentful Paint:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

---

## 🛠️ Mantenimiento

### 🔄 **Actualizaciones Comunes**
1. **Agregar nuevo proyecto:** Duplicar estructura de tarjeta en HTML
2. **Cambiar información:** Buscar y reemplazar en `index.html`
3. **Nuevas tecnologías:** Añadir tarjeta en tooling grid + icono
4. **Modificar animaciones:** Ajustar variables en `script.js`

### 🐛 **Debugging Común**
- **Animación SVG no funciona:** Verificar que existe `#intro-text`
- **Canvas en blanco:** Comprobar soporte de Canvas en browser
- **Menú no abre:** Verificar IDs de elementos coincidan
- **Parallax errático:** Revisar elementos existen antes de usar

---

## 🤝 Contribuciones

### 📋 **Código de Conducta**
- Mantener comentarios en español para consistencia
- Seguir estructura de documentación existente
- Probar en múltiples navegadores antes de PR
- Optimizar para rendimiento y accesibilidad

### 🎨 **Guidelines de Estilo**
- **JavaScript:** camelCase, comentarios JSDoc
- **CSS:** kebab-case, comentarios descriptivos
- **HTML:** semántico, atributos ARIA cuando necesario
- **Commits:** mensajes descriptivos en español

---

## 📞 Soporte

¿Tienes preguntas sobre el código o necesitas ayuda?

**Contacta al desarrollador:**
- **Email:** [culichi2603@gmail.com](mailto:culichi2603@gmail.com)
- **GitHub:** [@ByCulichi](https://github.com/ByCulichi)
- **LinkedIn:** [Christian Armando Velasco Estrada](https://mx.linkedin.com/in/christian-armando-velasco-estrada-a24590382/en)

---

<div align="center">

**🎉 ¡Gracias por contribuir al proyecto!**

*Documentación actualizada: Enero 2025*

</div>