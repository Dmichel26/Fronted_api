# API DANA - Frontend

Frontend completo en **HTML, CSS y JavaScript puro** para consumir la API DANA (Flask).

## 📋 Descripción

Este frontend proporciona una interfaz web moderna y funcional para gestionar:
- ✅ Autenticación con JWT
- ✅ Registro de usuarios
- ✅ CRUD de productos (crear, leer, actualizar, eliminar)
- ✅ Dashboard con estadísticas
- ✅ Almacenamiento seguro de tokens en localStorage

## 🚀 Estructura de Archivos

```
frontend/
├── index.html              # Página de Login
├── register.html           # Página de Registro
├── dashboard.html          # Dashboard principal
├── productos.html          # Gestión de productos (CRUD)
├── css/
│   └── styles.css         # Estilos completos (responsive)
├── js/
│   ├── auth.js            # Manejo de JWT y localStorage
│   ├── api.js             # Wrapper de fetch con headers
│   ├── utils.js           # Funciones auxiliares
│   ├── login.js           # Lógica de login
│   ├── register.js        # Lógica de registro
│   └── productos.js       # CRUD de productos
└── README.md              # Este archivo
```

## 🔧 Configuración

### URLs de la API

El frontend está configurado para conectarse a:
```
http://127.0.0.1:5000
```

Si cambias la URL de la API, edita en `js/api.js`:
```javascript
const BASE_URL = 'http://127.0.0.1:5000'; // Cambiar aquí
```

## 📱 Uso

### 1. Abrir el Frontend

Simplemente abre `index.html` en tu navegador:
```
file:///C:/Users/Aux2_tics/Documents/brayan/DEV/API_DANA/frontend/index.html
```

O si tienes un servidor local (recomendado):
```powershell
# Con Python
cd C:\Users\Aux2_tics\Documents\brayan\DEV\API_DANA\frontend
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000
```

### 2. Flujo de Usuario

**Registro:**
1. Haz click en "Regístrate aquí" en la página de login
2. Completa el formulario (usuario y contraseña)
3. Serás redirigido al login automáticamente

**Login:**
1. Ingresa tu usuario y contraseña
2. Se guardará el token JWT en localStorage automáticamente
3. Serás redirigido al dashboard

**Dashboard:**
1. Visualiza el total de productos
2. Accede a "Productos" para ver el CRUD

**CRUD de Productos:**
- **Listar:** Todos los productos se cargan automáticamente
- **Crear:** Click en "+ Nuevo Producto"
- **Editar:** Click en "Editar" en la fila del producto
- **Eliminar:** Click en "Eliminar" (con confirmación)

## 🔒 Seguridad

- ✅ Token JWT guardado en `localStorage` con clave `apiDanaToken`
- ✅ Token enviado automáticamente en header: `Authorization: Bearer <token>`
- ✅ Logout elimina el token y redirige a login
- ✅ Páginas protegidas redirigen al login si no hay token

## 📡 Endpoints Consumidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users/register` | Registrar usuario |
| POST | `/users/login` | Login (retorna JWT) |
| GET | `/productos` | Listar productos |
| POST | `/productos` | Crear producto |
| PUT | `/productos/<id>` | Actualizar producto |
| DELETE | `/productos/<id>` | Eliminar producto |

## ⚙️ Características

### Autenticación
- Sistema JWT con localStorage
- Redirección automática si el token expira (401)
- Persistencia de sesión en el navegador

### Interfaz
- Diseño responsive (móvil, tablet, desktop)
- Alertas flotantes (éxito, error, información)
- Modal para crear/editar productos
- Validaciones en cliente
- Iconografía visual clara

### JavaScript
- Módulos organizados (auth, api, utils)
- Async/await para peticiones HTTP
- Event listeners limpios
- Manejo de errores completo
- Código comentado y legible

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive y animaciones
- **Vanilla JavaScript** - Sin frameworks (ES6+)
- **Fetch API** - Peticiones HTTP
- **localStorage** - Persistencia de datos

## 📋 Notas

- Todos los archivos son HTML, CSS y JavaScript puro
- No requiere Node.js ni compilación
- Funciona en cualquier navegador moderno
- La contraseña se envía en texto plano (usar HTTPS en producción)

## 🐛 Troubleshooting

### "No puedo conectarme a la API"
- Verifica que la API esté corriendo en `http://127.0.0.1:5000`
- Comprueba que CORS está habilitado en la API

### "El token no se guarda"
- Verifica que localStorage esté habilitado en el navegador
- Comprueba la consola (F12) para errores de JavaScript

### "401 Unauthorized"
- Tu token ha expirado, necesitas volver a hacer login

## 📞 Contacto

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

