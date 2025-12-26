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

- 🎥 **Exploración de contenido**: Navega por películas y series con diferentes filtros
- 🔍 **Búsqueda avanzada**: Busca películas y series con desplegable de sugerencias
- 📺 **Información detallada**: Visualiza detalles completos incluyendo sinopsis, reparto, calificaciones y tráilers
- 🎬 **Reproductor de tráilers**: Integración con YouTube para ver tráilers directamente
- 📱 **Proveedores de streaming**: Información sobre dónde ver el contenido
- 🎭 **Información de temporadas**: Detalles completos de temporadas y episodios
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
│   ├── app/                      # App Router de Next.js
│   │   ├── collections/[id]/     # Detalles de colecciones
│   │   ├── movies/               # Exploración de películas
│   │   │   ├── [id]/            # Detalles de película individual
│   │   │   ├── layout.tsx       # Layout de películas
│   │   │   └── page.tsx         # Listado de películas
│   │   ├── series/               # Exploración de series
│   │   │   ├── [id]/            # Detalles de serie individual
│   │   │   ├── layout.tsx       # Layout de series
│   │   │   └── page.tsx         # Listado de series
│   │   ├── layout.tsx            # Layout principal de la app
│   │   ├── loading.tsx           # Estado de carga global
│   │   └── page.tsx              # Página de inicio
│   ├── components/               # Componentes reutilizables
│   │   ├── Carousels/           # Carruseles de contenido
│   │   │   ├── CarouselButton.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   └── MediaCarousel.tsx
│   │   ├── Credits/             # Información de reparto
│   │   │   └── MediaCredits.tsx
│   │   ├── Filters/             # Componentes de filtrado
│   │   │   └── FilterBar.tsx
│   │   ├── Footer/              # Pie de página
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── GoToTopButton.tsx
│   │   ├── Loading/             # Estados de carga
│   │   │   └── GlobalSpinner.tsx
│   │   ├── Media/               # Grids y tarjetas de medios
│   │   │   ├── CollectionsGrid.tsx
│   │   │   └── MediaGrid.tsx
│   │   ├── Navbar/              # Barra de navegación
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Searchbar.tsx
│   │   │   └── SearchDropdown.tsx
│   │   ├── Ratings/             # Sistema de calificaciones
│   │   │   └── StarRating.tsx
│   │   ├── Seasons/             # Información de temporadas
│   │   │   └── SeasonInfo.tsx
│   │   ├── TrailerPlayer/       # Reproductor de tráilers
│   │   │   └── TrailerPlayer.tsx
│   │   └── WatchProviders/      # Proveedores de streaming
│   │       └── WatchProvidersInfo.tsx
│   ├── lib/                      # Lógica de negocio y APIs
│   │   ├── endpoints.ts         # Endpoints de TMDB API
│   │   └── fetchData.ts         # Función de fetch centralizada
│   ├── types/                    # Definiciones de TypeScript
│   │   └── tmdb.ts              # Tipos de TMDB API
│   ├── utils/                    # Funciones utilitarias
│   │   ├── cleanCollectionName.ts
│   │   ├── formatDate.ts
│   │   ├── generateMediaMetadata.ts
│   │   ├── genreTranslations.ts
│   │   └── getYear.ts
│   └── styles/                   # Estilos globales
│       └── globals.css          # CSS global con Tailwind
├── public/                       # Archivos estáticos
│   └── icons/                   # Iconos SVG
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── eslint.config.mjs            # Configuración de ESLint
├── next.config.mjs              # Configuración de Next.js
├── postcss.config.mjs           # Configuración de PostCSS
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias del proyecto
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

## 🤝 Contribuciones

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

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

## 📧 Contacto

Aaron García - [@Aaron-GF](https://github.com/Aaron-GF)

Link del proyecto: [https://github.com/Aaron-GF/films-app](https://github.com/Aaron-GF/films-app)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
