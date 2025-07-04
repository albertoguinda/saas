# deploy-free-plan.md

_Guía rápida para desplegar el **Plan FREE** en Vercel o Railway_  
**Actualizado:** **Julio 2025**

---

## 🔧 Preparación del entorno local

1. Clona el repo y ejecuta:
   ```bash
   ./scripts/setup.sh
   cp .env.example .env
   ```
   Ejecuta de nuevo `./scripts/setup.sh` antes de lanzar `npm test` o `npm run lint`.
   Rellena en `.env` (al menos):

   | Variable        | Descripción                                                     |
   | --------------- | ---------------------------------------------------------------- |
   | MONGODB_URI     | Cadena de conexión MongoDB Atlas (servidor 6.x, driver 5.9.2) |
   | NEXTAUTH_SECRET | String aleatorio seguro (`openssl rand -base64 32`)              |
   | NEXTAUTH_URL    | URL pública de tu app (`https://tu-app.vercel.app`)             |
   | UPSTASH_REDIS_REST_URL | Endpoint REST de Upstash Redis para rate-limit |
   | UPSTASH_REDIS_REST_TOKEN | Token de acceso Upstash Redis |

   > **Nota:** Atlas puede correr servidor 6.x, pero el proyecto fija el driver MongoDB en **5.9.2** para evitar problemas de `legacy-peer-deps`. No actualices hasta revisar compatibilidad.

   Comprueba que el build funciona en local:

   ```bash
   npm run build && npm start
   ```
🌐 Despliegue en Vercel
Inicia sesión en Vercel y crea un New Project desde tu repo.

En Settings → Environment Variables añade las variables del paso anterior.

Pulsa Deploy.

Cuando termine verás tu URL (https://tu-app.vercel.app).

Opcional: activa Automatic Git Deploys para cada push a main.

🚂 Despliegue en Railway
Accede a Railway y elige Start from GitHub Repo.

Añade MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL en Variables.

Railway detectará automáticamente Next.js y correrá npm run build.

Finalizado el deploy tendrás tu dominio <project>.up.railway.app.

⚠️ Restricciones de red conocidas

| Servicio | Motivo |
| --- | --- |
| registry.npmjs.org | Instalación de dependencias |
| *.vercel.com, *.railway.app | Hooks de despliegue y rutas internas |
| *.mongodb.net | Conexión a MongoDB Atlas |

Asegúrate de permitir tráfico saliente a `registry.npmjs.org`, `*.vercel.com`, `*.railway.app` y `*.mongodb.net` para que las instalaciones y webhooks funcionen correctamente.

Si tu proveedor bloquea tráfico saliente, el build o los webhooks (Stripe, Resend) pueden fallar. Habilita reglas de salida o usa IP allow-list en Atlas.

📝 Notas rápidas del Plan FREE
Límite 1 sitio por usuario: ya manejado por middleware withAuthPlan.
Protección de APIs: middleware withRateLimit con Upstash Redis (implementado).

Branding “Web Builder” visible en el footer del sitio generado.

Sin dominio personalizado (solo subruta https://<app>/[slug]).

Al actualizar a PRO o PREMIUM no es necesario redeploy: los planes se gestionan en tiempo real mediante Stripe + Webhooks.

¡Despliega, prueba el flujo de login + wizard y disfruta del SaaS! 🚀
