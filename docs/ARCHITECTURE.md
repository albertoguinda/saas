# ARCHITECTURE.md

> 🏗️ **Arquitectura técnica, decisiones y visión para el SaaS “Web Builder”**  
> **Actualizado: Julio 2025**

---

## 🧭 Visión y principios

El objetivo es construir un SaaS de generación de sitios web, fácil de escalar, monetizar y evolucionar, con una base robusta pero ágil.

**Principios clave:**

- Modularidad total (features desacopladas, fácil onboarding)
- Escalabilidad (cientos/miles de usuarios y sitios)
- Seguridad y privacidad por defecto
- Experiencia de usuario premium desde el plan FREE
- Código limpio, patrones, extensibilidad

---

## 🏛️ Capas principales del sistema

[ Cliente (Next.js + React + HeroUI) ]
↓
[ API interna (Next.js API Routes / Route Handlers) ]
↓
[ Servicios backend (MongoDB, Stripe, Redis, Resend, IA) ]
↓
[ Integraciones externas (Mux, Namecheap, DataFast, CurrencyAPI) ]

---

## 📦 Stack de tecnologías principales

_(consulta `STACK.md` para versiones y dependencias reales)_

### Frontend

- **Next.js 15** (Pages Router + App Router híbrido)
- **React 18**, **TypeScript**
- **HeroUI v2** (componentes + theming)
- **TailwindCSS** (tokens utilitarios)
- **next-themes** (dark/light)
- **Framer Motion** (animaciones)
- **Lucide** (iconos SVG)

### Backend y persistencia

- **MongoDB Atlas** (multi-tenant)
- **Mongoose 8** (modelado seguro)
- **Auth.js (NextAuth)** + MongoAdapter
- **Stripe** (pagos & subscripciones)
- **Upstash Redis** (caching / rate-limit)
- **Resend** (e-mails)
- **Zod** (validación)
- **Dotenv** (config `.env`)
- **tsx** para ejecutar scripts TS (seed/reset)

### Integraciones externas futuras

- **MUX** (vídeo) · **Namecheap** (dominios) · **DataFast** (IA copy) · **CurrencyAPI** (multi-moneda) · **Capacitor** (export mobile)

---

## 🧩 Diseño de dominio y módulos

### Modelos principales

| Modelo                  | Propiedades                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| **User**                | `email`, `name`, `password (hash)`, `plan`, `createdAt`                  |
| **Site**                | `userId`, `slug`, `config` (estructura, estilos, contenido), `createdAt` |
| **Subscription / Plan** | `stripeId`, `status`, `currentPeriod`, webhooks                          |

> Modelos en `/lib/models/`, protegidos contra redefinición.

---

### Estructura de carpetas

#### Pages Router (MVP heredado)

```text
/pages/
  auth/ (login, register)
  dashboard/ (index, projects, profile, settings, welcome)
  api/ (REST endpoints)
  [slug]/ (render dinámico del sitio generado)
```

#### 🆕 App Router (módulos nuevos)

```text
/app/
  projects/[id]/wizard/ (wizard paso-a-paso – implementado Jul-2025)
  projects/[id]/preview/ (vista previa pública – implementado 03-Jul-2025)
  demo/ (sitio generado con datos de ejemplo)
  api/ (route handlers)
  [slug]/page.tsx
  layout.tsx
```
Otros directorios a nivel raíz:

```text
/components/ (UI)
/layouts/ (layouts públicos / privados)
/lib/ (dbConnect, models, utils, middlewares)
/config/ (tokens, rutas, fuentes)
/styles/ (globals.css + tokens)
/scripts/ (seed.ts, reset.ts via tsx)
/docs/ (roadmap, tareas, stack, agentes…)
```
La ruta `/app/demo` permite explorar el sitio generado con datos de demo.

> **Migración progresiva:** nuevas features van en **/app/**, legacy en **/pages/** hasta completar la transición.

#### Rutas migradas desde `/pages/`

Las siguientes vistas y APIs se han movido al App Router:

| Ruta actual                        | Nuevo archivo sugerido                           |
| ---------------------------------- | ------------------------------------------------ |
| `/pages/auth/login.tsx`            | `/app/login/page.tsx`                            |
| `/pages/auth/register.tsx`         | `/app/register/page.tsx`                         |
| `/pages/dashboard/index.tsx`       | `/app/dashboard/page.tsx`                        |
| `/pages/dashboard/projects.tsx`    | `/app/dashboard/projects/page.tsx`               |
| `/pages/dashboard/profile.tsx`     | `/app/dashboard/profile/page.tsx`                |
| `/pages/dashboard/settings.tsx`    | `/app/dashboard/settings/page.tsx`               |
| `/pages/dashboard/welcome.tsx`     | `/app/dashboard/welcome/page.tsx`                |
| `/pages/api/me/index.ts`           | `/app/api/me/route.ts`                           |
| `/pages/api/me/update.ts`          | `/app/api/me/update/route.ts`                    |
| `/pages/api/me/avatar.ts`          | `/app/api/me/avatar/route.ts`                    |
| `/pages/api/sites/index.ts`        | `/app/api/sites/route.ts`                        |
| `/pages/api/sites/[id].ts`         | `/app/api/sites/[id]/route.ts`                   |
| `/pages/api/projects/[id]/generate.ts` | `/app/api/projects/[id]/generate/route.ts`    |

**Pasos realizados**

1. Se crearon las carpetas y archivos en `/app/` según la tabla.
2. Se trasladó la lógica de cada página o API a `page.tsx` o `route.ts`.
3. Se ajustaron imports, redirecciones y navegación.
4. Se eliminaron las rutas antiguas en `pages/`.

---

### API interna

- **REST / Route Handlers**:  
  `/api/auth`, `/api/me`, `/api/sites`, `/api/stripe`
  - **Middlewares**
    - `withAuthPlan` (checks por plan)
    - `withValidation` (Zod en todas las APIs)

---

### Control de acceso y planes

| Plan        | Límites & features                                  |
| ----------- | --------------------------------------------------- |
| **FREE**    | 1 sitio, branding básico                            |
| **PRO**     | sitios ilimitados, dominio propio, métricas básicas |
| **PREMIUM** | IA, vídeo, métricas avanzadas, soporte, backups     |

> La lógica vive en middleware **y** en UI (visibilidad de botones/upsell).

---

### Internacionalización & theming

- Preparado para i18n (archivos externos / `/locales/`)
- Themable vía tokens Tailwind + HeroUI

---

### Seguridad

- Contraseñas hash (bcrypt)
- Secrets solo en `.env`
- Validación Zod en API
- Stripe keys server-only + webhooks firmados
- Rate-limit con Upstash Redis (implementado)

---

## 🚦 Flujo de desarrollo recomendado

1. Prototipa UI (HeroUI + Tailwind)
2. Conecta API (fetch, loading/error)
3. Lógica de negocio (planes, límites)
4. Persistencia real (Mongo)
5. Integraciones externas (Stripe, Resend, IA…)
6. Itera / refactor / tests
7. Documenta avances en `/docs`

---

## 🗂️ Decisiones arquitectónicas

- **Híbrido Pages + App Router** hasta estabilizar la migración.
- Cada feature en su módulo → evita archivos monolíticos.
- Lógica de planes centralizada (middleware).
- UI desacoplada del backend.

---

## 📊 Observabilidad & métricas

- Logs de error en backend
- Tracking básico (`signup_free`, `wizard_completed` y `upgrade_click` implementados)
  - Panel admin futuro

---

## 🔮 Futuro y escalabilidad

- Migración completa a App Router
- Tests automáticos (Jest + Testing Library)
- Monorepo si crecen servicios
- CI/CD (Vercel + GitHub Actions)

---

## 📚 Documentación & cultura

- Mantén `ROADMAP.md`, `TAREAS.md`, `PLAN_*` sincronizados.
- Convenciones nuevas → `CONTRIBUTING.md`.
- Prioriza claridad sobre velocidad.

---

## 🛡️ Licencia & protección

- **MIT**
- Verifica licencias de dep.
- No exponer secrets ni datos sensibles.

---

## 📝 Última nota

Esta arquitectura está viva: **cada cambio relevante** debe reflejarse aquí y en `/docs`.

---

**Construye el SaaS que te gustaría usar. Refactoriza y documenta siempre. 🚀**
