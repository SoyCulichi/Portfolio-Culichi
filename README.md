# 🌐 Portfolio DevCulichi - Portafolio Personal

<div align="center">
  
[![Live Demo](https://img.shields.io/badge/🚀_DEMO_LIVE-00ff6a?style=for-the-badge)](https://byculichi.github.io/Portfolio-Culichi/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ByCulichi/Portfolio-Culichi)

![Portfolio Preview](https://github.com/user-attachments/assets/dd2d2e8c-346e-4b9b-ad4d-f2015347c9a4)

</div>

---

## 👨‍💻 Sobre el Desarrollador

Soy **Christian Armando Velasco Estrada** (DevCulichi), un **Frontend Engineer** apasionado por crear interfaces web rápidas, limpias y con excelente rendimiento. Especializado en tecnologías modernas como React, Node.js y Docker.

📍 **Ubicación:** Guadalajara, Jalisco, México  
✉️ **Email:** [culichi2603@gmail.com](mailto:culichi2603@gmail.com)  
💼 **LinkedIn:** [Christian Armando Velasco Estrada](https://mx.linkedin.com/in/christian-armando-velasco-estrada-a24590382/en)

---

## 🚀 Tecnologías Utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend & Tools
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## ✨ Características del Portfolio

### 🎨 **Diseño y UX**
- **Diseño Dark Mode** con esquema de colores verde neón (#00ff6a)
- **Totalmente Responsive** - Optimizado para móvil, tablet y desktop
- **Animaciones Fluidas** con CSS y JavaScript nativo
- **Accesibilidad** completa con atributos ARIA y navegación por teclado

### 🛠️ **Funcionalidades Técnicas**
- **Animación SVG** de introducción con efecto de escritura
- **Canvas Animado** de fondo con estrellas en movimiento y grid 3D
- **Efecto Parallax** en la sección hero para crear profundidad
- **Menú Offcanvas** responsive con animaciones suaves
- **Reveal on Scroll** usando Intersection Observer API
- **Sin dependencias externas** - JavaScript vanilla puro

---

## 🏗️ Estructura del Proyecto

```
Portfolio-Culichi/
│
├── 📄 index.html          # Estructura HTML principal
├── 🎨 styles.css          # Estilos CSS completos
├── ⚡ script.js           # Funcionalidad JavaScript
├── 📖 README.md           # Este archivo
│
├── 📁 assets/
│   ├── 🖼️ dev-illustration.svg
│   └── 📁 icons/
│       ├── html.svg
│       ├── css.svg
│       ├── javascript.svg
│       ├── git.svg
│       ├── github.svg
│       ├── linkedin.svg
│       ├── twitter.svg
│       ├── calendly.svg
│       └── external-link.svg
│
└── 📁 assetsPortfolio/    # Recursos adicionales
```

---

## 🎯 Funcionalidades Principales

### 1. **Animación de Introducción SVG**
```javascript
// Efecto de escritura animada para el logo
- Utiliza stroke-dasharray y stroke-dashoffset
- Easing cuadrático para suavizar la transición
- Auto-remove después de completar la animación
```

### 2. **Canvas de Fondo Animado**
```javascript
// Sistema de partículas con estrellas
- Estrellas generadas dinámicamente según el tamaño de pantalla
- Grid en perspectiva 3D
- Animación continua con requestAnimationFrame
- Responsive y optimizado para rendimiento
```

### 3. **Sistema de Navegación**
```javascript
// Menú offcanvas para móvil
- Hamburger menu animado
- Overlay semi-transparente
- Cierre con ESC o clic en enlaces
- Bloqueo de scroll cuando está abierto
```

### 4. **Efecto Parallax Hero**
```javascript
// Parallax sutil en la sección principal
- Diferentes velocidades para texto e imagen
- Solo se ejecuta cuando está en viewport
- Throttling con requestAnimationFrame
```

### 5. **Reveal on Scroll**
```javascript
// Animaciones al hacer scroll
- Intersection Observer API
- Threshold configurable
- Auto-unobserve para optimización
- Fallback para navegadores antiguos
```

---

## 🚀 Instalación y Uso

### Opción 1: Clonar y usar directamente
```bash
# Clonar el repositorio
git clone https://github.com/ByCulichi/Portfolio-Culichi.git

# Navegar al directorio
cd Portfolio-Culichi

# Abrir con un servidor local
python -m http.server 8080
# o usando Node.js
npx serve .
# o usando PHP
php -S localhost:8080
```

### Opción 2: Usar como template
1. Fork este repositorio
2. Personaliza la información en `index.html`
3. Modifica los colores en `styles.css` (variables CSS)
4. Actualiza los enlaces de redes sociales
5. Reemplaza los proyectos con los tuyos propios

---

## 🎨 Personalización

### Cambiar Esquema de Colores
```css
:root {
    --bg: #051014;           /* Fondo principal */
    --panel: #071217;        /* Fondo de tarjetas */
    --accent: #00ff6a;       /* Color de acento (verde neón) */
    --accent-dark: #07a14a;  /* Acento oscuro */
    --muted: #9aa3a6;        /* Texto secundario */
    --text: #e6f3ef;         /* Texto principal */
}
```

### Modificar Animaciones
```javascript
// Velocidad de la animación SVG
const drawDuration = 1500; // milisegundos

// Intensidad del parallax
const maxParallaxOffset = 40; // pixels

// Cantidad de estrellas en canvas
const starCount = Math.max(30, Math.floor((width * height) / 8000));
```

---

## 📱 Compatibilidad

- ✅ **Chrome** 60+ (Completo)
- ✅ **Firefox** 55+ (Completo)  
- ✅ **Safari** 11+ (Completo)
- ✅ **Edge** 79+ (Completo)
- ⚠️ **Internet Explorer** (Funcionalidad básica)

### Características Modernas Utilizadas:
- CSS Grid y Flexbox
- CSS Custom Properties (Variables)
- Intersection Observer API
- RequestAnimationFrame
- Arrow Functions ES6+

---

## 📈 Rendimiento

### Optimizaciones Implementadas:
- **Lazy Loading** para imágenes
- **Throttling** en eventos de scroll y resize  
- **RequestAnimationFrame** para animaciones suaves
- **Passive Event Listeners** para mejor scroll
- **CSS Hardware Acceleration** con transform3d
- **Unobserve** automático en Intersection Observer

### Métricas Lighthouse:
- 🟢 **Performance:** 95+
- 🟢 **Accessibility:** 100
- 🟢 **Best Practices:** 95+
- 🟢 **SEO:** 100

---

## 🔧 Código Documentado

Todo el código está ampliamente documentado con comentarios explicativos:

### JavaScript
- ✅ **Funciones documentadas** con JSDoc
- ✅ **Explicación de algoritmos** complejos
- ✅ **Manejo de errores** robusto
- ✅ **Código modular** y reutilizable

### CSS
- ✅ **Secciones organizadas** por funcionalidad
- ✅ **Variables CSS** bien nombradas
- ✅ **Media queries** documentadas
- ✅ **Animations** explicadas paso a paso

### HTML
- ✅ **Semántica correcta** con HTML5
- ✅ **Atributos ARIA** para accesibilidad
- ✅ **Comentarios** de sección
- ✅ **Meta tags** optimizados

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 📞 Contacto

**Christian Armando Velasco Estrada (DevCulichi)**

[![Email](https://img.shields.io/badge/Email-culichi2603@gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:culichi2603@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-DevCulichi-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://mx.linkedin.com/in/christian-armando-velasco-estrada-a24590382/en)
[![GitHub](https://img.shields.io/badge/GitHub-ByCulichi-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ByCulichi)

---

<div align="center">

**🌟 Si te gusta este proyecto, ¡dale una estrella! ⭐**

Hecho con ❤️ por [DevCulichi](https://github.com/ByCulichi) en Guadalajara, México

</div>  
