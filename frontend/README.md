# API DANA - Frontend

Frontend en React + Vite para consumir la API DANA (Flask). Usa `fetch()` y guarda JWT en `localStorage`.

## Instalación

Desde PowerShell en la carpeta `frontend`:

```powershell
npm install
npm run dev
```

El servidor de Vite arrancará en `http://localhost:5173` por defecto.

## Endpoints usados

- POST `http://127.0.0.1:5000/users/register` (registro)
- POST `http://127.0.0.1:5000/users/login` (login -> retorna token)
- GET  `http://127.0.0.1:5000/productos` (listar productos)
- POST `http://127.0.0.1:5000/productos` (crear producto)
- PUT  `http://127.0.0.1:5000/productos/<id>` (actualizar producto)
- DELETE `http://127.0.0.1:5000/productos/<id>` (eliminar producto)

Asegúrate de que la API esté corriendo en `http://127.0.0.1:5000`.
