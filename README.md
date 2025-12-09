# 🎬 Filmix

Una aplicación web que permite explorar películas y series de televisión, construida con Next.js 15 y la API de The Movie Database (TMDB).

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square)

## 🎯 Objetivos del Proyecto

- Demostrar dominio de tecnologías modernas del ecosistema React
- Implementar una aplicación completa y funcional
- Mostrar buenas prácticas de desarrollo y arquitectura de código
- Crear una experiencia de usuario fluida y atractiva
- Desarrollar una aplicación optimizada con alto rendimiento
- Proporcionar información completa y útil al usuario (tráilers, plataformas de streaming, reparto, etc.)

## ✨ Características

- 🎥 **Exploración de contenido**: Navega por películas y series populares, mejor valoradas, en cartelera y próximos estrenos
- 🔍 **Búsqueda avanzada**: Busca películas y series con filtros por género y categoría
- 📺 **Información detallada**: Visualiza detalles completos incluyendo sinopsis, reparto, calificaciones y tráilers
- ⭐ **Sistema de valoraciones**: Visualización de calificaciones con estrellas dinámicas
- 🎬 **Reproductor de tráilers**: Integración con YouTube para ver tráilers directamente
- 📱 **Proveedores de streaming**: Información sobre dónde ver el contenido 
- 🎭 **Información de temporadas**: Detalles completos de temporadas y episodios para series
- 🎨 **Diseño responsive**: Interfaz adaptable a todos los dispositivos

## 🚀 Tecnologías

### Core

- **[Next.js 16](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### Estilos

- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[PostCSS](https://postcss.org/)**

### Herramientas

- **[ESLint](https://eslint.org/)**
- **[PNPM](https://pnpm.io/)**

### APIs

- **[TMDB API](https://www.themoviedb.org/documentation/api)**
- **[React Player](https://www.npmjs.com/package/react-player)**

### Desarrollo

- **[Antigravity](https://antigravity.google)**
- **[Claude Sonnet](https://www.anthropic.com/claude)**
- **[Perplexity](https://www.perplexity.ai/)**

## 📁 Estructura del Proyecto

```
films-app/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── movie/[id]/        # Páginas de detalles de películas
│   │   ├── movies/            # Página de exploración de películas
│   │   ├── tv/[id]/           # Páginas de detalles de series
│   │   ├── series/            # Página de exploración de series
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes reutilizables
│   │   ├── Carousels/        # Carruseles de medios
│   │   ├── Credits/          # Información de reparto
│   │   ├── Filters/          # Componentes de filtrado
│   │   ├── Footer/           # Pie de página
│   │   ├── Loading/          # Estados de carga
│   │   ├── Media/            # Tarjetas de medios
│   │   ├── Navbar/           # Barra de navegación
│   │   ├── Ratings/          # Sistema de calificaciones
│   │   ├── Seasons/          # Información de temporadas
│   │   ├── TrailerPlayer/    # Reproductor de tráilers
│   │   └── WatchProviders/   # Proveedores de streaming
│   ├── lib/                   # Lógica de negocio
│   │   ├── endpoints.ts      # Endpoints de la API
│   │   └── fetchData.ts      # Función de fetch
│   ├── types/                 # Definiciones de TypeScript
│   │   └── tmdb.ts           # Tipos de TMDB
│   ├── utils/                 # Utilidades
│   └── styles/                # Estilos globales
│       └── globals.css
├── public/                    # Archivos estáticos
├── .env                       # Variables de entorno
├── next.config.mjs           # Configuración de Next.js
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
└── package.json              # Dependencias del proyecto
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18.x o superior
- PNPM (recomendado) o npm
- Una cuenta en [TMDB](https://www.themoviedb.org/) para obtener una API key

### Pasos

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Aaron-GF/films-app.git
   cd films-app
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   ACCESS_TOKEN_TMDB=tu_access_token_aqui
   ```

   > **Nota**: Necesitas obtener un Access Token (no solo la API key) desde tu cuenta de TMDB en [Settings > API](https://www.themoviedb.org/settings/api)

4. **Inicia el servidor de desarrollo**

   ```bash
   pnpm run dev
   ```

5. **Abre tu navegador**

   Navega a [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm run dev          # Inicia el servidor de desarrollo

# Producción
pnpm run build        # Construye la aplicación para producción
pnpm run start        # Inicia el servidor de producción

# Calidad de código
pnpm run lint         # Ejecuta ESLint
```

## 🎯 Funcionalidades Principales

### Página de Inicio

- Carrusel hero con contenido trending
- Secciones de series populares y nuevos episodios
- Películas en cartelera y próximos estrenos
- Películas mejor valoradas

### Exploración de Contenido

- **Películas**: Filtrado por categoría (popular, mejor valoradas, en cartelera, próximos estrenos)
- **Series**: Filtrado por categoría (popular, mejor valoradas, al aire hoy, nuevos episodios)
- Filtrado adicional por género
- Grid responsive de tarjetas de medios

### Páginas de Detalles

- Información completa del contenido
- Calificaciones con estrellas
- Reparto y equipo de producción
- Tráilers y videos relacionados
- Proveedores de streaming disponibles
- Contenido similar
- Información de temporadas y episodios (series)

## 🔧 Configuración de la API

La aplicación utiliza la API v3 de TMDB con las siguientes características:

- **Idioma**: Español (es-ES)
- **Autenticación**: Bearer Token
- **Endpoints principales**:
  - `/movie/*` - Información de películas
  - `/tv/*` - Información de series
  - `/trending/*` - Contenido trending
  - `/discover/*` - Descubrimiento de contenido
  - `/search/multi` - Búsqueda multi-tipo
  - `/genre/*` - Listados de géneros

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

### ✅ Puedes:

- **Compartir**: Copiar y redistribuir el material en cualquier medio o formato
- **Adaptar**: Remezclar, transformar y construir sobre el material
- **Usar para aprendizaje**: Estudiar el código y aprender de él
- **Uso personal**: Usar en proyectos personales no comerciales

### ⚠️ Bajo las siguientes condiciones:

- **Atribución**: Debes dar crédito apropiado, proporcionar un enlace a la licencia e indicar si se realizaron cambios
- **No Comercial**: No puedes usar el material con fines comerciales
- **Compartir Igual**: Si remezclas, transformas o construyes sobre el material, debes distribuir tus contribuciones bajo la misma licencia

### ❌ No puedes:

- Usar este código en productos comerciales
- Vender este software o derivados
- Usar en servicios de pago sin permiso
- Integrar en aplicaciones empresariales comerciales

---

**Copyright © 2025 Aaron García. Todos los derechos reservados bajo CC BY-NC-SA 4.0.**

## 📧 Contacto

Aaron García - [@Aaron-GF](https://github.com/Aaron-GF)

Link del proyecto: [https://github.com/Aaron-GF/films-app](https://github.com/Aaron-GF/films-app)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
