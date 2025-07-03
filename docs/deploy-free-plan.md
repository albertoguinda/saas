# deploy-free-plan.md

_Guía rápida para desplegar el **Plan FREE** en Vercel o Railway_  
**Actualizado:** **Julio 2025**

---

## 🔧 Preparación del entorno local

1. Clona el repo y ejecuta:
   ```bash
   npm install
   cp .env.example .env
   ```
   Rellena en `.env` (al menos):

   | Variable        | Descripción                                                     |
   | --------------- | ---------------------------------------------------------------- |
   | MONGODB_URI     | Cadena de conexión MongoDB Atlas                                 |
   | NEXTAUTH_SECRET | String aleatorio seguro (`openssl rand -base64 32`)              |
   | NEXTAUTH_URL    | URL pública de tu app (`https://tu-app.vercel.app`)             |

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
Servicio Motivo
registry.npmjs.org Instalación de dependencias
_.vercel.com, _.railway.app Hooks de despliegue y rutas internas
\*.mongodb.net Conexión a MongoDB Atlas

Si tu proveedor bloquea tráfico saliente, el build o los webhooks (Stripe, Resend) pueden fallar. Habilita reglas de salida o usa IP allow-list en Atlas.

📝 Notas rápidas del Plan FREE
Límite 1 sitio por usuario: ya manejado por middleware withAuthPlan.

Branding “Web Builder” visible en el footer del sitio generado.

Sin dominio personalizado (solo subruta https://<app>/[slug]).

Al actualizar a PRO o PREMIUM no es necesario redeploy: los planes se gestionan en tiempo real mediante Stripe + Webhooks.

¡Despliega, prueba el flujo de login + wizard y disfruta del SaaS! 🚀
