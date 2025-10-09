# 🔐 Frontend - Funcionalidad de Reset de Contraseña

## Páginas Implementadas

### 1. **LoginPage** (Modificada)
- **Ruta:** `/login` o `/platform`
- **Cambio:** Agregado enlace "¿Olvidaste tu contraseña?" que redirige a `/forgot-password`
- **Ubicación:** Debajo del botón "Cerrar sesión"

### 2. **ForgotPasswordPage** (Nueva)
- **Ruta:** `/forgot-password`
- **Funcionalidad:**
  - Formulario para ingresar email
  - Validación de formato de email
  - Envía solicitud de reset al backend
  - Muestra mensaje de confirmación (sin revelar si el email existe)
  - Botón para volver al login

### 3. **ResetPasswordPage** (Nueva)
- **Ruta:** `/reset-password?code=CODIGO_UUID`
- **Funcionalidad:**
  - Valida automáticamente el código al cargar
  - Muestra pantalla de carga durante validación
  - Si es válido: formulario para nueva contraseña
  - Si es inválido: mensaje de error con opciones
  - Validación de contraseñas (longitud, coincidencia)
  - Feedback visual con íconos y colores
  - Redirección automática al login tras éxito

## Flujo de Usuario

```mermaid
graph TD
    A[Usuario en Login] --> B[Click "¿Olvidaste tu contraseña?"]
    B --> C[Página Forgot Password]
    C --> D[Ingresa email y envía]
    D --> E[Mensaje: "Revisa tu email"]
    E --> F[Usuario abre email]
    F --> G[Click en enlace del email]
    G --> H[Página Reset Password]
    H --> I{¿Código válido?}
    I -->|Sí| J[Formulario nueva contraseña]
    I -->|No| K[Mensaje de error + opciones]
    J --> L[Ingresa y confirma contraseña]
    L --> M[Contraseña actualizada]
    M --> N[Redirección automática a Login]
    K --> O[Solicitar nuevo enlace]
    O --> C
```

## Servicios API

### **authService** (Actualizado)
```typescript
// Solicitar reset de contraseña
authService.requestPasswordReset(email: string): Promise<ApiResponse>

// Validar código de reset
authService.validateResetCode(code: string): Promise<ApiResponse>

// Cambiar contraseña
authService.resetPassword(code: string, newPassword: string): Promise<ApiResponse>
```

## Rutas Frontend

```typescript
// Rutas agregadas al App.tsx
<Route path="/login" element={<LoginPage />} />
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password" element={<ResetPasswordPage />} />
```

## Características de UX/UI

### ✅ **Validaciones**
- Formato de email
- Contraseña mínima 6 caracteres
- Confirmación de contraseña
- Feedback visual con colores (verde=éxito, rojo=error, naranja=warning)

### ✅ **Estados de Carga**
- Spinners durante envío de formularios
- Pantalla de validación de código
- Botones deshabilitados durante carga
- Mensajes informativos

### ✅ **Feedback Visual**
- Íconos según estado (✓ éxito, ⚠ error, ⏳ carga)
- Colores semánticos
- Animaciones suaves
- Mensajes claros y específicos

### ✅ **Navegación**
- Enlaces para volver al login
- Redirección automática tras éxito
- Opciones cuando el enlace expira

### ✅ **Seguridad**
- No revela si un email existe
- Códigos con expiración de 30 minutos
- Validación de código en el backend
- Mensajes genéricos por seguridad

## Ejemplos de Uso

### **1. Solicitar Reset**
```typescript
// Usuario ingresa email en /forgot-password
await authService.requestPasswordReset("usuario@ejemplo.com");
// → Mensaje: "Si el email existe, recibirás un enlace..."
```

### **2. Validar Código**
```typescript
// Al cargar /reset-password?code=abc123
const result = await authService.validateResetCode("abc123");
if (result.valid) {
  // Mostrar formulario
} else {
  // Mostrar error
}
```

### **3. Cambiar Contraseña**
```typescript
// Usuario envía formulario
await authService.resetPassword("abc123", "nuevaPassword123");
// → Redirección a /login
```

## Integración con Backend

### **Endpoints Utilizados:**
- `POST /api/users/request-password-reset`
- `GET /api/users/validate-reset-code/:code`
- `POST /api/users/reset-password`

### **Respuestas del Backend:**
```typescript
// Request Reset
{ success: true, message: "Si el email existe..." }

// Validate Code
{ valid: true, email: "user@example.com", message: "Código válido" }

// Reset Password
{ success: true, message: "Contraseña actualizada exitosamente" }
```

## Testing Manual

### **Caso 1: Flujo Exitoso**
1. Ir a `/login`
2. Click "¿Olvidaste tu contraseña?"
3. Ingresar email existente
4. Verificar mensaje de confirmación
5. Copiar código del log del backend
6. Ir a `/reset-password?code=CODIGO`
7. Verificar validación exitosa
8. Ingresar nueva contraseña
9. Confirmar contraseña
10. Verificar mensaje de éxito
11. Verificar redirección automática

### **Caso 2: Código Inválido**
1. Ir a `/reset-password?code=invalido`
2. Verificar mensaje de error
3. Verificar botones de acción

### **Caso 3: Email Inexistente**
1. Ir a `/forgot-password`
2. Ingresar email inexistente
3. Verificar que no se revela información

## Próximos pasos

1. **Styling:** Ajustar estilos para que coincidan con el diseño
2. **Responsive:** Verificar en móviles
3. **Testing:** Pruebas automatizadas
4. **Analytics:** Tracking de eventos de reset
5. **Rate Limiting:** Límites en el frontend