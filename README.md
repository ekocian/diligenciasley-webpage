# Diligencias Ley - Frontend

Frontend desarrollado en React + TypeScript + PrimeReact para la gestión de cuentas de usuario.

## 🏛️ Arquitectura de la Solución

### Frontend (Este Repositorio)
- **Hosting**: GitHub Pages
- **Dominio**: `diligenciasley.com.ar` (dominio personalizado de NIC Argentina)
- **DNS Provider**: Cloudflare
- **Tecnología**: React + TypeScript + Vite + PrimeReact

### Backend
- **Hosting**: Render.com
- **URL**: `https://diligenciasley-backend.onrender.com`
- **Base de Datos**: PostgreSQL en Render
- **Repositorio**: `diligenciasley-backend`

### Configuración de DNS
- Dominio registrado en NIC Argentina (`.com.ar`)
- DNS gestionado por Cloudflare para mejor rendimiento y seguridad
- Configuración CNAME apuntando a GitHub Pages

## 🚀 Características

- **React 18** con TypeScript
- **PrimeReact** como librería de componentes UI
- **React Router** para navegación
- **Vite** como build tool
- Gestión de sesiones con cookies HttpOnly
- Responsive design

## 📱 Páginas

- **Login/Register** (`/platform`) - Formularios de registro e inicio de sesión
- **Perfil** (`/platform/perfil`) - Información del usuario autenticado
- **Verificación** (`/platform/verify`) - Verificación de cuenta por email

## 🛠️ Instalación y desarrollo

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El servidor se iniciará en http://localhost:5173
```

### Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🏗️ Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas principales
│   ├── LoginPage.tsx   # Login y registro
│   ├── ProfilePage.tsx # Perfil de usuario
│   └── VerifyPage.tsx  # Verificación de cuenta
├── services/           # Servicios API
│   └── api.ts         # Cliente API
├── App.tsx            # Componente principal con rutas
├── main.tsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🔧 Configuración

### Variables de entorno
El backend está configurado para `https://diligenciasley-backend.onrender.com`.

Para cambiarlo, edita `src/services/api.ts`:
```typescript
const API_URL = "tu-url-del-backend";
```

### Temas de PrimeReact
Actualmente usa el tema `lara-light-indigo`. Para cambiarlo, modifica en `src/main.tsx`:
```typescript
import 'primereact/resources/themes/tu-tema/theme.css';
```

## 🚀 Deploy

### Arquitectura de Deployment

Este proyecto utiliza una arquitectura moderna distribuida:

#### Frontend (GitHub Pages)
```bash
# Deploy automático a GitHub Pages
npm run deploy
```

**Configuración:**
1. **GitHub Pages**: Hosting del frontend
2. **Dominio personalizado**: `diligenciasley.com.ar` (NIC Argentina)
3. **DNS Provider**: Cloudflare para gestión de DNS y CDN
4. **SSL**: Certificado automático via GitHub Pages + Cloudflare

#### Backend (Render)
- **URL**: `https://diligenciasley-backend.onrender.com`
- **Base de Datos**: PostgreSQL administrada por Render
- **Deploy**: Automático desde repositorio Git

### Configuración del Dominio Personalizado

1. **Registro en NIC Argentina**: Dominio `.com.ar` registrado
2. **Cloudflare DNS**: 
   - CNAME record: `diligenciasley.com.ar` → `[usuario].github.io`
   - Configuración SSL/TLS: Full (strict)
   - Page Rules para optimización
3. **GitHub Pages**: 
   - Custom domain configurado en settings
   - HTTPS enforced habilitado

### SPA (Single Page Application) Handling

Para manejar el routing client-side en GitHub Pages:
- `public/404.html`: Redirige todas las rutas 404 al `index.html`
- Script en `index.html`: Maneja la restauración de URLs correctas
- Configuración específica para evitar errores 404 en rutas como `/platform/verify`

### Build para producción
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` y están listos para ser servidos por cualquier servidor web estático.

### Deploy en GitHub Pages, Netlify, Vercel, etc.
1. Ejecuta `npm run build`
2. Sube la carpeta `dist/` a tu proveedor de hosting
3. Configura las rutas para SPA (Single Page Application)

## 📦 Dependencias principales

- **React** - Librería principal
- **React Router DOM** - Navegación
- **PrimeReact** - Componentes UI
- **PrimeIcons** - Iconos
- **PrimeFlex** - Utilidades CSS
- **TypeScript** - Tipado estático
- **Vite** - Build tool

## 🔗 API Integration

### Backend en Render
El frontend se conecta al backend desplegado en Render.com:
- **URL Base**: `https://diligenciasley-backend.onrender.com`
- **Base de Datos**: PostgreSQL administrada por Render

### Endpoints disponibles:
- `POST /register` - Registro de usuario
- `POST /login` - Inicio de sesión  
- `POST /logout` - Cerrar sesión
- `GET /perfil` - Obtener perfil
- `POST /verify` - Verificar cuenta

### Configuración CORS
El backend está configurado para aceptar requests desde:
- `https://diligenciasley.com.ar` (producción)
- `http://localhost:5173` (desarrollo local)

### Autenticación
- Utiliza cookies HttpOnly para seguridad
- Todas las requests incluyen `credentials: 'include'`
- Sesiones persistentes con expiración configurable

## 🎨 Estilos

- **PrimeReact theme**: Tema base de componentes
- **PrimeFlex**: Utilidades CSS para layout
- **Custom CSS**: Estilos personalizados en `index.css`

## 📝 Notas

- El proyecto está configurado para TypeScript estricto
- Se utiliza ESLint para mantener calidad de código

## 🔧 Configuración de Infraestructura

### Cloudflare (DNS Provider)
```
Tipo    Nombre                    Contenido
CNAME   diligenciasley.com.ar    [usuario].github.io
CNAME   www                      diligenciasley.com.ar
```

### GitHub Pages
- **Branch**: `gh-pages` (generado automáticamente por `gh-pages` package)
- **Custom Domain**: `diligenciasley.com.ar`
- **HTTPS**: Forzado (via GitHub + Cloudflare)

### Render (Backend)
- **Runtime**: Node + Typescript
- **Database**: PostgreSQL 15
- **Environment**: Production
- **Auto-deploy**: Habilitado desde Git

## 📊 Performance y Monitoreo

### Frontend (GitHub Pages + Cloudflare)
- **CDN Global**: Cloudflare edge locations
- **Caché**: Assets estáticos optimizados
- **Compresión**: Gzip/Brotli automático
- **SSL**: Certificado universal de Cloudflare

### Backend (Render)
- **Escalado**: Automático basado en demanda
- **Uptime**: 99.9% SLA
- **Backup DB**: Automático diario
- **SSL**: Certificado gratuito incluido

## 🔐 Seguridad

### Frontend
- HTTPS forzado en toda la aplicación
- Headers de seguridad via Cloudflare
- CSP (Content Security Policy) configurado
- SameSite cookies para CSRF protection

### Backend  
- Cookies HttpOnly para autenticación
- CORS configurado específicamente
- Rate limiting implementado
- Validación de input en todos los endpoints
