🚀 deploy-free-plan.md
Guía rápida para desplegar el plan FREE en Vercel o Railway.

🔧 Preparación del entorno

- Clona el repositorio y ejecuta `npm install`.
- Crea un archivo `.env` en la raíz con:
  - `MONGODB_URI` → cadena de conexión de MongoDB Atlas.
  - `NEXTAUTH_SECRET` → string seguro para las cookies.
  - `NEXTAUTH_URL` → URL pública de tu app.
- Comprueba que `npm run build` funciona en local.

🌐 Despliegue en Vercel

- Inicia sesión en vercel.com y crea un proyecto enlazando este repo.
- Añade las variables de entorno anteriores en el apartado _Environment Variables_.
- Pulsa **Deploy** y espera a que finalice.

🚂 Despliegue en Railway

- Accede a railway.app y crea un nuevo proyecto desde GitHub.
- Configura las mismas variables de entorno.
- Ejecuta el despliegue para obtener la URL pública.

⚠️ Restricciones de red conocidas

- Algunos entornos limitan las conexiones salientes. Asegúrate de permitir acceso a:
  - `registry.npmjs.org` para instalar dependencias.
  - `*.vercel.com` y `*.railway.app` durante el deploy.
  - La URI de MongoDB Atlas utilizada.
- Si hay bloqueos de salida, el envío de emails u otros servicios externos podrían fallar.
