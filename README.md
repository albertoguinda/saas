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
./scripts/setup.sh                     # instala dependencias y ejecuta lint y tests
cp .env.example .env.local             # rellena MONGODB_URI, NEXTAUTH_*, STRIPE_SECRET_KEY, UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
npm run refresh-db                     # limpia y seed (BBDD) en un solo paso
npm run dev
```

TIP: si solo necesitas seedear de nuevo usa npm run seed.

### 🧪 Ejecutar tests

```bash
./scripts/setup.sh
```

El script instala dependencias, ejecuta `npm run lint` y finalmente `npm test` usando el **test runner** de Node.js 18+ (`node --test`).

> **Importante:** reejecuta `./scripts/setup.sh` si fallan las pruebas por dependencias ausentes.

### 🔍 Ejecutar lint

```bash
./scripts/setup.sh
```

El script ya incluye `npm run lint`, útil para verificar el proyecto rápidamente.

### 🚀 Scripts de desarrollo

```bash
npm run check  # lint, format y test
npm run setup  # instala dependencias y ejecuta las pruebas
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
npm run backup
```

Ejecuta una copia básica de seguridad en `backup.json` para pruebas y CI.

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

### Onboarding guiado tras upgrade

Tras mejorar tu plan se abre una pantalla de onboarding con tres pasos:

1. **Personalizar branding** (logo, color y favicon).
2. **Conectar dominio propio** (opcional).
3. **Revisar analítica** de tu sitio.

Cada paso se marca como completado y se almacena en tu cuenta.

```bash
# Obtener progreso
curl /api/onboarding

# Marcar un paso
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"step":"branding"}' /api/onboarding

# Finalizar onboarding
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"completed":true}' /api/onboarding
```

Consulta `docs/BRANDING.md` para detalles sobre la subida de imágenes y límites.

### Conexión de dominio propio

En el dashboard puedes añadir tu dominio y comprobar el estado de validación.
Se guardan en MongoDB con las fases **pending**, **validating** y **active**.

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

> **Nota:** Atlas puede ejecutar servidor 6.x, pero mantenemos el driver 5.9.2 por dependencia de paquetes legacy.
> Las APIs están protegidas por el middleware `withRateLimit` (Upstash Redis).
> Ruta de métricas admin `/api/admin/stats` (solo `ADMIN_EMAIL`).
> Nueva ruta `/api/analytics` devuelve visitas, upgrades y completados de wizard.

🤝 Cómo contribuir
Lee docs/CONTRIBUTING.md.

Abre issue/PR con descripción clara.

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

El repositorio cuenta con el workflow `.github/workflows/ci.yml` que valida cada pull request en Node.js 20 sobre Linux, macOS y Windows. El flujo instala dependencias con `npm ci`, ejecuta `npm run lint`, comprueba el formato con `npm run format` (fallando si se modifican archivos) y finalmente lanza `npm test`.

De forma local se utilizan Husky y lint‑staged para correr los mismos comandos antes de cada commit, asegurando que el código pase lint y quede formateado tanto en local como en CI.
