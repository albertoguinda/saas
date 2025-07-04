# TAREAS.md

_Actualizado: **04-Jul-2025 20:00 CEST**_

---

## ✅ Tareas Completadas

- [x] [1] Setup inicial (Next.js 15 + TS + estructura `/pages`)
- [x] [2] TailwindCSS + HeroUI configurados
- [x] [3] ESLint, Prettier y convenciones
- [x] [4] Auth.js (NextAuth) + MongoDB Atlas
- [x] [5] Modelo **User** (`/lib/models/user.ts`) con bcrypt
- [x] [6] API **register** (`/api/auth/register`)
- [x] [7] Formularios login/registro (HeroUI, feedback)
- [x] [8] Login funcional + redirección SSR/client
- [x] [9] Layouts: público (`default`) y auth (`auth`)
- [x] [10] Dashboard básico, navbar dinámica (avatar, logout, perfil)
- [x] [11] Vistas FREE: profile, projects, welcome, settings (mock)
- [x] [12] 🌗 Tema claro/oscuro (next-themes)
- [x] [13] **Limitación real**: 1 proyecto FREE + aviso upgrade
- [x] [14] Modelo **Site** (`site.ts`) relacionado con usuario
- [x] [15] APIs
  - [x] [16] `/api/sites` (GET/POST) – CRUD sitios
  - [x] [17] `/api/me` (GET/PATCH) – perfil
  - [x] [18] `/api/me/avatar` (PATCH) – actualizar avatar
- [x] [19] Paquetes lint (`@eslint/*`) + `cross-env` + script `dev`
- [x] [20] Seeds & reset via **tsx**
- [x] [21] Instancia Stripe (`lib/stripe.ts`)
- [x] [22] **withAuthPlan** middleware (protección por plan)
- [x] [23] Verificación de `@types/*`
- [x] [24] Persistencia real de perfil y proyectos (MongoDB)
- [x] [25] Edición perfil persistente (nombre, contraseña)
- [x] [26] Avatar emoji seleccionable en perfil
- [x] [27] Render público de sitio en `/[slug]` — 03-Jul-2025
- [x] [28] Aviso + bloqueo backend si >1 sitio FREE
- [x] [29] Wizard/Generador de sitios (mínimo viable, 1 sitio FREE) — 03-Jul-2025
- [x] [30] Manejo de errores en wizard (validación Zod + feedback)
- [x] [31] Spinner y estados de red en wizard — 04-Jul-2025
- [x] [32] Tracking evento `wizard_completed`
- [x] [33] Tracking evento `upgrade_click`
- [x] [34] Tracking evento `signup_free`
- [x] [35] API `/api/track` guarda eventos en MongoDB — 03-Jul-2025
- [x] [36] Badge visual del plan en dashboard y navbar
- [x] [37] Avisos visuales de upgrade por límite de uso
- [x] [38] Toasts operativos con @heroui/toast — 03-Jul-2025
- [x] [39] Ruta pública estable sin error params.slug — 03-Jul-2025
- [x] [40] Refactor contador proyectos en dashboard
- [x] [41] Preview pública `/projects/[id]/preview`
- [x] [42] Landing MVP real
- [x] [43] Fix estilos globales + warning slug
- [x] [44] Estilos HeroUI restaurados (Tailwind content + plugin) — 03-Jul-2025
- [x] [45] Verificación backend de slug único en `/api/sites` — 03-Jul-2025
- [x] [46] Página de error amigable para rutas privadas sin sesión — 03-Jul-2025
- [x] [47] Creación de `lib/utils.ts` (modularizar helpers y hooks) — 03-Jul-2025
- [x] [48] Setup inicial de pruebas con Jest + Testing Library — 03-Jul-2025
- [x] [49] Workflow CI con GitHub Actions — 03-Jul-2025
- [x] [50] Validación avanzada de formularios (login, registro, perfil) con React Hook Form + Zod — 03-Jul-2025
- [x] [51] Guardar configuración del sitio en MongoDB (estructura del wizard) — 03-Jul-2025
- [x] [52] Demo pública navegable — 03-Jul-2025
- [x] [53] Middleware `withValidation` (Zod) para APIs — 03-Jul-2025
- [x] [54] Tests API register y middleware withValidation — 03-Jul-2025
- [x] [55] Tracking básico de visitas y clics (`/api/track` extendido) — 03-Jul-2025
- [x] [56] API admin `/api/admin/stats` devuelve conteo de usuarios, sitios y eventos — 04-Jul-2025
- [x] [57] Pruebas API admin `/api/admin/stats` — 04-Jul-2025 CEST
- [x] [58] Tests API perfil (`/api/me/update` y `/api/me/avatar`) — 04-Jul-2025
- [x] [59] Introducción de helper `logger` y reemplazo de `console.error` — 04-Jul-2025
- [x] [60] Tests middleware withAuthPlan — 04-Jul-2025 CEST
- [x] [61] Tests middleware withRateLimit — 04-Jul-2025
- [x] [62] Tests API track (`/api/track`) — 03-Jul-2025
- [x] [63] Corregir `.npmrc` y asegurar `npm install` limpio — 04-Jul-2025 CEST
- [x] [64] Middleware `withRateLimit` con Upstash Redis — 04-Jul-2025
- [x] [65] Ajustar dependencias MongoDB para evitar `legacy-peer-deps` (downgrade a v5.9.2) — 03-Jul-2025

---

## 🚧 Tareas Pendientes por Fase

### 🔓 FREE – Core público y experiencia

#### 🔐 Backend
- [ ] [66] Subida y gestión de avatar real
- [ ] [67] Separar vistas en `/app/` (migración App Router)

#### 🧱 Generador de sitios (wizard)

#### 💳 Sistema de pagos y planes

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback
- [ ] [68] Mejora de accesibilidad (focus, labels, roles)
- [ ] [69] Mensajes de éxito / error contextualizados

### 💼 PRO – Funcionalidades avanzadas

#### 🔐 Backend
- [ ] [70] Guardar estructura completa del sitio (branding, assets) en MongoDB
- [ ] [71] Subida y almacenamiento seguro de imágenes personalizadas (S3 / Cloudinary)
- [ ] [72] Conexión dominio propio (Namecheap / Cloudflare)
- [ ] [73] Exportación de sitios como HTML estático
- [ ] [74] Emails transaccionales (Resend) + confirmación de cuenta

#### 🧱 Generador de sitios (wizard)
- [ ] [75] Branding extendido (selector de color, fuentes, logo, favicon)

#### 💳 Sistema de pagos y planes
- [ ] [76] Integrar Stripe (productos, subscripciones, webhooks)
- [ ] [77] Middleware de control de plan + free trial (7 días, opc.)
- [ ] [78] Dashboard: historial y panel de pagos

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback
- [ ] [79] Panel de analítica simple (visitas, actividad – Upstash opc., ver `docs/ANALYTICS.md`)
- [ ] [80] Onboarding guiado tras upgrade: branding ➜ dominio ➜ analytics (ver `docs/ANALYTICS.md`)

### 🚀 PREMIUM – IA, multimedia, retención y soporte

#### 🔐 Backend
- [ ] [81] Cache de sitios (Upstash Redis, TTL dinámico)
- [ ] [82] Backups automáticos + restore 1 clic

#### 🧱 Generador de sitios (wizard)
- [ ] [83] Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- [ ] [84] Librería de componentes **premium** inspirada en HeroUI Plus, Tailwind UI, Shadcn UI, Flowbite y DaisyUI
- [ ] [85] Evaluar **Toastify**, **Swiper**, **PhotoSwipe**, **Atropos**, **canvas-confetti** y **Arctic** para animaciones y sliders

#### 💳 Sistema de pagos y planes
- [ ] [86] Integración Stripe completa (producto PREMIUM, webhooks, historial)

#### 🌟 Funcionalidades premium
- [ ] [87] Integrar **DataFast** (IA) para generación de contenido
- [ ] [88] Soporte prioritario (chat/email)
- [ ] [89] Generador de textos legales (cookies, privacy, T&C)
- [ ] [90] Banners visuales de upsell (dashboard)

#### 🧪 Retención, métricas y feedback
- [ ] [91] Panel premium de analítica (páginas vistas, retención, logs – ver `docs/ANALYTICS.md`)

### 📊 ADMIN & Retención

#### 🧪 Retención, métricas y feedback
- [ ] [92] Panel admin de métricas: nº registros, proyectos por usuario y actividad reciente
- [ ] [93] Tracking avanzado: wizard, upgrades, feedback usuarios (ver `docs/ANALYTICS.md`)
- [ ] [94] Captura de feedback post-creación o upgrade
- [ ] [95] Alertas visuales en puntos clave del funnel
- [ ] [96] Sistema de fidelización/puntos con recompensas diarias
- [ ] [97] Insignias y logros visibles en el perfil del usuario

---

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.
