# Deploy frontend to Railway (ERP Canches)

Este repo contiene un frontend estático (HTML/CSS/JS). Para desplegarlo en Railway y conectarlo a una API que ya tengas en Railway sigue estos pasos.

Resumen de la estrategia
- Servidor Node mínimo (`server.js`) que sirve los archivos estáticos y expone `/config.js`.
- `/config.js` injecta `window.__ENV.API_URL` desde la variable de entorno `API_URL` del servicio. En Railway configuras esa variable con la URL pública de tu API.

Pasos para desplegar

1) Subir el repo a GitHub
   - Si aún no está en GitHub, crea un repo y push del contenido.

2) Conectar Railway a tu repo
   - En Railway, crea un nuevo Proyecto → New Project → Deploy from GitHub
   - Selecciona este repo y la rama (p. ej. `main`).

3) Variables de entorno
   - En el servicio del frontend en Railway, en Settings → Variables, añade:
     - `API_URL` = la URL pública de tu API (por ejemplo `https://mi-api.up.railway.app/api`).
   - Railway proveerá la variable en tiempo de ejecución, `server.js` la inyectará en `/config.js`.

4) Start command
   - Railway detectará `package.json` y ejecutará `npm install` y `npm start`.
   - `npm start` corre `node server.js` (puerto proporcionado por Railway vía `PORT`).

5) Configurar CORS en tu API
   - Asegúrate de que tu API permita peticiones desde el dominio del frontend en Railway.
   - Mientras pruebas, puedes permitir `Access-Control-Allow-Origin: *`, pero en producción es mejor limitar al dominio del frontend.

Probar localmente (Windows PowerShell)

1) Instala dependencias:

```powershell
npm install
```

2) Arrancar servidor con la API local o remota (ejemplo con API local en http://localhost:4000):

```powershell
$env:API_URL = "http://localhost:4000/api"; npm start
```

Abre http://localhost:3000 en tu navegador.

Notas y recomendaciones
- Si la API requiere autenticación por dominio (CORS), añade el origen del frontend en la configuración de la API.
- Si prefieres no usar Node, puedes crear una imagen Docker que sirva con nginx; el método mostrado es más simple para Railway.

Cómo el frontend usa la URL de la API
- `server.js` expone `/config.js` que define `window.__ENV = { API_URL: '...' }`.
- `app.js` lee `window.__ENV.API_URL` y, si no existe, usa la URL fija como fallback para desarrollo.

Si quieres, puedo:
- Crear un archivo `.railway` o instruirte para crear múltiples servicios en un mismo proyecto Railway (frontend + API).
- Añadir una comprobación automática en `server.js` para verificar que `API_URL` esté presente y mostrar una advertencia.
