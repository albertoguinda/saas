# 🧱 SaaS Web Builder – Next.js 15 + HeroUI v2

_Base sólida en TypeScript para crear y desplegar sitios web en 3 pasos (planes **FREE → PRO → PREMIUM**)._

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black)
![Node 18+](https://img.shields.io/badge/Node-18%2B-green)

---

## 🚀 Visión

Generar webs y portfolios con **on-boarding rápido**, escalabilidad real y upsell fluido entre planes.

---

## 🖥️ Demo rápida

| Flujo                                 | GIF / captura  |
| ------------------------------------- | -------------- |
| Login → Dashboard → Wizard de 3 pasos | Captura actual |

![Dashboard screenshot](public/dashboard.png)

---

## 📦 Instalación local

Requiere **Node.js 18 LTS** y `npm` instalado.

```bash
git clone https://github.com/albertoguinda/saas.git
cd saas
npm run setup                          # instala deps, copia .env.local y refresca la BBDD
npm run dev
```

Ejemplo básico de `.env.local` para desarrollo:

```bash
MONGODB_URI=mongodb://localhost:27017/saas
NEXTAUTH_SECRET=dev
STRIPE_SECRET_KEY=sk_test
UPSTASH_REDIS_REST_URL=http://localhost:6379
UPSTASH_REDIS_REST_TOKEN=local
BACKUP_RETENTION=5
```

Si faltan estas variables en desarrollo, el proyecto usará mocks en memoria para MongoDB y Redis, evitando errores de arranque.

TIP: si solo necesitas seedear de nuevo usa `npm run seed`.

### 🧪 Ejecutar tests

```bash
npm run setup
```

El script instala dependencias, crea `.env.local` si no existe, resetea la base de datos y lanza `npm run check` usando el **test runner** de Node.js 18+ (`node --test`).

> **Importante:** reejecuta `npm run setup` si fallan las pruebas por dependencias ausentes o cambios de BBDD.

### 🔍 Ejecutar lint

```bash
npm run check
```

Ejecuta lint, formato y tests en un solo paso.

### 🚀 Scripts de desarrollo

```bash
npm run check  # lint, format y test
npm run setup  # prepara entorno (deps, .env, DB) y ejecuta check
```

### 📦 Exportar proyecto

```bash
npm run export:zip
```

Genera `out.zip` con la versión estática del sitio. En el dashboard cada
proyecto incluye un botón **Exportar ZIP** que llama a la API `/api/export` para
descargar el contenido actual.

### 🗄️ Backups locales

```bash
npm run backup:local
```

Genera `backup.json` para pruebas y CI.

Los usuarios autenticados pueden usar:

```bash
curl -H "Accept: application/zip" -X POST /api/backup > backup.zip
```

Para restaurar:

```bash
curl -X POST -d '{"id":"ID_DEL_BACKUP"}' /api/restore
```

### ⚡ Caché de sitios

Cada sitio se guarda en **Upstash Redis** tras la primera carga. El TTL es de
24h en plan Premium y 2h en planes Free/Pro. Para limpiar manualmente:

```bash
curl -X POST /api/cache/invalidate -d '{"slug":"mi-sitio"}'
```

Consulta [docs/cache-redis.md](docs/cache-redis.md) para más detalles.

🌐 Deploy rápido
Consulta la guía docs/deploy-free-plan.md
(Vercel, Railway, variables de entorno y consideraciones de red).

🆓 / 💼 / 👑 Planes

| Feature                | FREE | PRO | PREMIUM |
| ---------------------- | ---- | --- | ------- |
| Sitios                 | 1    | ∞   | ∞       |
| Branding completo      | —    | ✅  | ✅      |
| Dominio propio         | —    | ✅  | ✅      |
| Emails transaccionales | —    | ✅  | ✅      |
| IA DataFast            | —    | —   | ✅      |
| Vídeo (MUX)            | —    | —   | ✅      |
| Analítica avanzada     | —    | —   | ✅      |

### Control de plan y free trial

El middleware `withAuthPlan` comprueba el plan del usuario en cada ruta premium.
Si un usuario Free accede por primera vez, se inicia automáticamente una prueba
gratuita de **7 días** (`TRIAL_DURATION_DAYS`). Durante ese periodo se permiten
las funcionalidades PRO. Al expirar, se bloquea el acceso y se muestra el
mensaje de `trial.expired` con enlace a `/pricing`.

Ajusta la duración en `config/constants.ts` y los textos en `messages/*.json`.

### Onboarding guiado tras upgrade

El onboarding se activa al confirmar el upgrade al plan **Premium** (webhook de Stripe o cambio manual). Si el usuario Premium no ha completado el proceso, se muestra automáticamente al acceder.

Consta de tres pasos:

1. **Personalizar branding** (logo, color y favicon).
2. **Conectar dominio propio** (opcional).
3. **Revisar analítica** de tu sitio.

Cada paso se marca como completado y se almacena en tu cuenta. Se registran los eventos `onboarding_started` y `onboarding_completed`.

Si algo falla, revisa `/api/onboarding` y los logs del servidor. Consulta `docs/BRANDING.md` para detalles sobre la subida de imágenes y límites.

### Configurar almacenamiento de imágenes

En desarrollo puedes usar un directorio local definido en `LOCAL_ASSETS_DIR`.
Si se configuran las variables `CLOUDINARY_*` o `S3_*`, la subida se realiza al
proveedor elegido. El endpoint `/api/sites/[id]/assets` gestiona la subida y
guarda la URL en MongoDB.

### Conexión de dominio propio

Desde `/dashboard/domains` puedes registrar tu dominio y verificar que apunta a
la plataforma. El endpoint `/api/domain` gestiona el alta, revalidación y
eliminado.

Define `CNAME_DOMAIN` y expón `NEXT_PUBLIC_CNAME_DOMAIN` en tu entorno para las
instrucciones. Opcionalmente añade `NEXT_PUBLIC_A_RECORD_IP` si usas registros A.

Los dominios se guardan con estado **pending** o **active** y puedes reintentar
la verificación o borrarlos en cualquier momento. Si ya existe, el API devuelve
un error claro para guiar al usuario.

### Configurar Stripe

1. Crea producto y precio recurrente en tu cuenta de Stripe.
2. Copia los IDs en `.env.local` como `STRIPE_PREMIUM_PRODUCT_ID` y `STRIPE_PREMIUM_PRICE_ID`.
3. Define `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET`.
4. Ejecuta `stripe listen --forward-to localhost:3000/api/stripe/webhook` para probar en local.
5. Usa el modo test de Stripe para simular pagos fallidos con tarjetas de prueba.

### Catálogo Premium UI/UX

Accede a `/dashboard/premium-catalog` para descubrir los componentes de pago. El
endpoint `/api/premium/templates` devuelve la lista de plantillas y en local usa
mocks para no fallar.

Para extender el catálogo edita `app/api/premium/templates/route.ts` y añade
objetos con `name`, `description`, `image`, `tags` y `type`. Las imágenes se
definen por URL; emplea tu CDN o un placeholder del estilo
`https://placehold.co/400x300?text=Premium+Template`.

## 🌍 Internacionalización

El proyecto usa **next-intl**. Las traducciones se ubican en `messages/<locale>.json`.
Para añadir un idioma:

1. Crea un archivo `messages/<nuevo>.json` copiando la estructura de `en.json`.
2. Añade el código de idioma al array `locales` en `i18n.ts`.
3. Traduce cada clave siguiendo el formato `seccion.clave`.
4. Ejecuta `npm run translations:check` para sincronizar con `en.json`.
5. Ejecuta `npm run i18n:check` para detectar claves faltantes o sin uso.
6. Reinicia el servidor de desarrollo.

Ejemplo de uso:

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("dashboard");

  return <h1>{t("welcome")}</h1>;
}
```

Uso de placeholders y plurales:

```tsx
t("dashboard.greeting", { name: "Ada" });
t("projects.limit", { count: 2 });
```

### Configuración de `next-intl`

Crea `next-intl.config.ts` en la raíz con:

```ts
export default {
  locales: ["en", "es"],
  defaultLocale: "en",
};
```

Si el archivo falta o no existen mensajes para el idioma solicitado, el servidor caerá al inglés y lo indicará en consola.

🗺️ Roadmap & tareas
Visión estratégica → docs/ROADMAP.md

Backlog por fases → docs/TAREAS.md

## 🎛️ Estado de i18n y feedback UX

Todas las vistas comunes (navbar, footer, perfiles y wizard) usan claves de traducción.
El feedback de formularios y notificaciones se muestra de forma contextual y accesible.
Ejecuta `npm run i18n:check` para asegurar que no faltan mensajes.

🛠 Stack principal
Next.js 15 • React 18 • TailwindCSS • HeroUI v2 • MongoDB Atlas (driver 5.9.2) • Auth.js • Stripe • Upstash Redis • Resend • tsx
Detalle completo en docs/STACK.md.

### Configurar Resend

1. Crea una cuenta en [Resend](https://resend.com) y genera una API key.
2. Añade `RESEND_API_KEY` en tu `.env`.
3. Las plantillas se definen en `lib/emails.ts` y los envíos quedan registrados en `EmailLog`.

> **Nota:** Atlas puede ejecutar servidor 6.x, pero mantenemos el driver 5.9.2 por dependencia de paquetes legacy.
> Las APIs están protegidas por el middleware `withRateLimit` (Upstash Redis).
> Ruta de métricas admin `/api/admin/stats` (solo `ADMIN_EMAIL`).
> Nueva ruta `/api/analytics` devuelve visitas, upgrades y completados de wizard.

🤝 Cómo contribuir
Lee docs/CONTRIBUTING.md.

Abre issue/PR con descripción clara.
Puedes usar la plantilla `docs/FEATURE_TEMPLATE.md` para describir nuevas features.

Toda feature debe reflejarse en docs/TAREAS.md.
Para aportar traducciones ejecuta `npm run translations:check` antes de abrir PR.

## ❓ Preguntas frecuentes

- **¿Cómo añado un nuevo idioma?** Ejecuta `npm run translations:check` tras crear `messages/<locale>.json` y actualiza `i18n.ts`.
- **¿Cómo reporto problemas de UX?** Abre issue describiendo la ruta, el mensaje mostrado y pasos para reproducir.
- **¿Qué workflow de contribución seguimos?** Fork ➜ rama de feature ➜ PR pequeño con descripción y actualización de `TAREAS.md`.
- **¿Cómo despliego mi fork?** Revisa `docs/deploy-free-plan.md` y crea tus variables en Vercel o Railway.

🛡️ Licencia
MIT © 2025 — Construyamos juntos el SaaS que nos gustaría usar 🚀

## ⚙️ Integración continua

El repositorio cuenta con el workflow `.github/workflows/ci.yml` que valida cada pull request en Node.js 20 sobre Linux, macOS y Windows. El flujo instala dependencias con `npm ci` y ejecuta `npm run check` (lint, formato y tests).

De forma local Husky dispara `npm run check` y `lint‑staged` antes de cada commit, evitando errores manuales.
