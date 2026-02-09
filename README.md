# 🐝 Spybee - Prueba Técnica

construida con Next.js, Zustand y Mapbox GL.

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

