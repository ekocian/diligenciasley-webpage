# Diligencias Ley - Frontend

Frontend desarrollado en React + TypeScript + PrimeReact para la gestión de cuentas de usuario.

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

El frontend se conecta al backend en:
- `POST /register` - Registro de usuario
- `POST /login` - Inicio de sesión
- `POST /logout` - Cerrar sesión
- `GET /perfil` - Obtener perfil
- `POST /verify` - Verificar cuenta

Todas las requests incluyen `credentials: 'include'` para el manejo de cookies HttpOnly.

## 🎨 Estilos

- **PrimeReact theme**: Tema base de componentes
- **PrimeFlex**: Utilidades CSS para layout
- **Custom CSS**: Estilos personalizados en `index.css`

## 📝 Notas

- Los archivos HTML/JS originales están en la carpeta `platform/` como respaldo
- El proyecto está configurado para TypeScript estricto
- Se utiliza ESLint para mantener calidad de código
