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

| Flujo                                 | GIF / captura                                 |
| ------------------------------------- | --------------------------------------------- |
| Login → Dashboard → Wizard de 3 pasos | Captura próximamente |

---

## 📦 Instalación local

Requiere **Node.js 18 LTS** y `npm` instalado.

```bash
git clone https://github.com/albertoguinda/saas.git
cd saas
./scripts/setup.sh                     # instala dependencias según package-lock
cp .env.example .env.local             # rellena MONGODB_URI, NEXTAUTH_*, STRIPE_SECRET_KEY, UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
npm run refresh-db                     # limpia y seed (BBDD) en un solo paso
npm run dev
```

TIP: si solo necesitas seedear de nuevo usa npm run seed.

### 🧪 Ejecutar tests

```bash
./scripts/setup.sh
npm test
```

### 🔍 Ejecutar lint

```bash
./scripts/setup.sh
npm run lint
```

🌐 Deploy rápido
Consulta la guía docs/deploy-free-plan.md
(Vercel, Railway, variables de entorno y consideraciones de red).

🆓 / 💼 / 👑 Planes
Feature	FREE	PRO	PREMIUM
Sitios	1	∞	∞
Branding completo	—	✅	✅
Dominio propio	—	✅	✅
Emails transaccionales	—	✅	✅
IA DataFast	—	—	✅
Vídeo (MUX)	—	—	✅
Analítica avanzada	—	—	✅

🗺️ Roadmap & tareas
Visión estratégica → docs/ROADMAP.md

Backlog por fases → docs/TAREAS.md

🛠 Stack principal
Next.js 15 • React 18 • TailwindCSS • HeroUI v2 • MongoDB Atlas (driver 5) • Auth.js • Stripe • Upstash Redis • Resend • tsx
Detalle completo en docs/STACK.md.
Las APIs están protegidas por el middleware `withRateLimit` (Upstash Redis).
Ruta de métricas admin `/api/admin/stats` (solo `ADMIN_EMAIL`).

🤝 Cómo contribuir
Lee docs/CONTRIBUTING.md.

Abre issue/PR con descripción clara.

Toda feature debe reflejarse en docs/TAREAS.md.

🛡️ Licencia
MIT © 2025 — Construyamos juntos el SaaS que nos gustaría usar 🚀

## ⚙️ Integración continua
Este proyecto utiliza un workflow de GitHub Actions ubicado en `.github/workflows/ci.yml` que ejecuta `./scripts/setup.sh`, luego `npm run lint`, compila con `npm run build` y finalmente lanza `npm test` cuando existan pruebas.

