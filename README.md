# 🐝 Spybee - Sistema de Gestión de Proyectos

Aplicación web profesional para la gestión y visualización de proyectos empresariales, construida con Next.js, Zustand y Mapbox GL.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange)
![Mapbox](https://img.shields.io/badge/Mapbox-GL-green)

## ✨ Características

### 📊 Funcionalidades Principales

- **Listado de Proyectos**: Tabla paginada con 10 items por página
- **Búsqueda Inteligente**: Filtrado en tiempo real por nombre, ciudad o dirección
- **Filtros Avanzados**: Ordenamiento por:
  - Orden alfabético
  - Número de incidencias
  - Número de RFI (Request for Information)
  - Número de tareas
- **Mapa Interactivo**: Visualización geoespacial con Mapbox GL
  - Marcadores personalizados para cada proyecto
  - Click en proyecto → navegación automática en el mapa
  - Popups informativos con estadísticas
- **Autenticación**: Sistema de login funcional
- **Diseño Responsive**: Adaptado a mobile, tablet y desktop

### 🎯 Vistas Disponibles

1. **Vista Tabla** - Listado detallado con toda la información
2. **Vista Mapa** - Geolocalización de proyectos con marcadores interactivos

## 🚀 Stack Tecnológico

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **State Management**: Zustand
- **Maps**: Mapbox GL
- **Styling**: CSS Modules (Vanilla CSS)
- **Icons**: SVG inline

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio** (o descomprimir el archivo)

```bash
cd spybee-nextjs
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
```

> **📝 Nota**: Obtén tu token gratuito en [Mapbox](https://account.mapbox.com/access-tokens/)

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**

```
http://localhost:3000
```

## 🗂️ Estructura del Proyecto

```
spybee-nextjs/
├── app/
│   ├── layout.js              # Layout principal
│   ├── page.js                # Página principal
│   ├── page.module.css
│   └── login/
│       ├── page.js            # Página de login
│       └── login.module.css
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.module.css
│   ├── SearchBar/
│   │   ├── SearchBar.js       # Barra de búsqueda y filtros
│   │   └── SearchBar.module.css
│   ├── ProjectsTable/
│   │   ├── ProjectsTable.js   # Tabla de proyectos
│   │   └── ProjectsTable.module.css
│   ├── ProjectsMap/
│   │   ├── ProjectsMap.js     # Mapa con Mapbox
│   │   └── ProjectsMap.module.css
│   └── Pagination/
│       ├── Pagination.js
│       └── Pagination.module.css
├── store/
│   └── useProjectsStore.js    # Zustand store
├── styles/
│   └── globals.css            # Estilos globales
├── public/
│   └── data/
│       └── projects.json      # Datos de proyectos
├── package.json
├── next.config.js
└── README.md
```

## 💻 Uso

### Login

1. Accede a `/login`
2. Ingresa cualquier email y contraseña
3. Haz click en "Iniciar sesión"

### Gestión de Proyectos

**Búsqueda:**
- Escribe en el campo de búsqueda para filtrar proyectos

**Filtros:**
- Click en "Filtros" para ordenar por:
  - Orden alfabético
  - Número de incidencias
  - Número de RFI
  - Número de tareas

**Navegación en Mapa:**
- Click en cualquier proyecto de la tabla
- El mapa automáticamente navegará a su ubicación
- Los marcadores muestran información al hacer click

**Paginación:**
- Navega entre páginas usando los controles inferiores
- 10 proyectos por página

## 🎨 Características de Diseño

### Fidelidad al Mockup

✅ Replica exacta de los mockups proporcionados
✅ Colores y tipografía precisos
✅ Badges de plan y estado con estilos correctos
✅ Avatares de equipo con destacados
✅ Contadores de items por vencer

### Responsive Design

- **Desktop** (1024px+): Layout completo con todas las funcionalidades
- **Tablet** (768px - 1023px): Adaptación de grid y tabla
- **Mobile** (<768px): Vista optimizada para móvil

## 🏗️ Buenas Prácticas Implementadas

### React & Next.js

- ✅ Uso de App Router (Next.js 14)
- ✅ Client Components (`'use client'`) donde es necesario
- ✅ Hooks personalizados y optimizados
- ✅ Componentes reutilizables y modulares
- ✅ Manejo eficiente de efectos secundarios

### State Management (Zustand)

- ✅ Store centralizado y eficiente
- ✅ Acciones claramente definidas
- ✅ Computed values para datos derivados
- ✅ Separación de lógica de negocio

### CSS

- ✅ CSS Modules para scope local
- ✅ Variables CSS para consistencia
- ✅ Mobile-first approach
- ✅ Sin frameworks CSS externos (Vanilla CSS)

### HTML Semántico

- ✅ Uso correcto de etiquetas (`<header>`, `<main>`, `<section>`)
- ✅ Accesibilidad con ARIA labels
- ✅ Botones y links semánticamente correctos

## 🗺️ Mapbox GL

### Características del Mapa

- Marcadores personalizados con el color del plan
- Popups informativos con estadísticas del proyecto
- Navegación automática al seleccionar proyecto
- Controles de zoom y navegación
- Estilo "light" de Mapbox
- Ajuste automático de bounds para mostrar todos los proyectos

### Configuración

El token de Mapbox se configura en `.env.local`:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example
```

## 🔐 Autenticación

Sistema de autenticación implementado con:
- Página de login estilizada
- Validación de formulario
- Protección de rutas
- Persistencia en localStorage
- Mock de API (listo para integrar backend real)

## 📊 Datos

Los datos se cargan desde `/public/data/projects.json` con la siguiente estructura:

```json
{
  "_id": "string",
  "title": "string",
  "status": "active|inactive|suspended|pending_payment",
  "position": {
    "lat": number,
    "lng": number
  },
  "users": Array,
  "projectPlanData": {
    "plan": "small|medium|big"
  },
  "incidents": Array
}
```

## 🎯 Puntos Extra Implementados

- ✅ **Diseño Responsive**: Totalmente adaptado a todos los dispositivos
- ✅ **Funcionalidad de Autenticación**: Sistema de login completo

## 🚧 Próximas Mejoras

- [ ] Integración con API backend real
- [ ] Tests unitarios y de integración
- [ ] Modo oscuro
- [ ] Exportación de datos (PDF, Excel)
- [ ] Notificaciones en tiempo real
- [ ] Filtros avanzados adicionales
- [ ] Edición de proyectos

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## 🐛 Solución de Problemas

### El mapa no se muestra

1. Verifica que el token de Mapbox esté configurado correctamente en `.env.local`
2. Asegúrate de que el token tenga los permisos necesarios
3. Revisa la consola del navegador para errores

### Los datos no se cargan

1. Verifica que el archivo `public/data/projects.json` exista
2. Revisa la consola para errores de fetch
3. Asegúrate de que el JSON sea válido

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado siguiendo:
- Clean Code principles
- Component-driven development
- Mobile-first approach
- Semantic HTML
- Accessibility best practices

## 📄 Licencia

Este proyecto es de uso privado.

---

**Desarrollado con ❤️ usando Next.js + Zustand + Mapbox GL**
