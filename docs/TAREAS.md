# TAREAS.md

\_Actualizado: **11-Jul-2025 19:48 UTC**

---

## ✅ Tareas Completadas

- [x] Setup inicial (Next.js 15 + TS + estructura `/pages`)
- [x] TailwindCSS + HeroUI configurados
- [x] ESLint, Prettier y convenciones
- [x] Auth.js (NextAuth) + MongoDB Atlas
- [x] Modelo **User** (`/lib/models/user.ts`) con bcrypt
- [x] API **register** (`/api/auth/register`)
- [x] Formularios login/registro (HeroUI, feedback)
- [x] Login funcional + redirección SSR/client
- [x] Layouts: público (`default`) y auth (`auth`)
- [x] Dashboard básico, navbar dinámica (avatar, logout, perfil)
- [x] Vistas FREE: profile, projects, welcome, settings (mock)
- [x] 🌗 Tema claro/oscuro (next-themes)
- [x] **Limitación real**: 1 proyecto FREE + aviso upgrade
- [x] Modelo **Site** (`site.ts`) relacionado con usuario
- [x] APIs
  - [x] `/api/sites` (GET/POST) – CRUD sitios
  - [x] `/api/me` (GET/PATCH) – perfil
  - [x] `/api/me/avatar` (PATCH) – actualizar avatar
- [x] Paquetes lint (`@eslint/*`) + `cross-env` + script `dev`
- [x] Seeds & reset via **tsx**
- [x] Instancia Stripe (`lib/stripe.ts`)
- [x] **withAuthPlan** middleware (protección por plan)
- [x] Verificación de `@types/*`
- [x] Persistencia real de perfil y proyectos (MongoDB)
- [x] Edición perfil persistente (nombre, contraseña)
- [x] Avatar emoji seleccionable en perfil
- [x] Render público de sitio en `/[slug]` — 03-Jul-2025
- [x] Aviso + bloqueo backend si >1 sitio FREE
- [x] Wizard/Generador de sitios (mínimo viable, 1 sitio FREE) — 03-Jul-2025
- [x] Manejo de errores en wizard (validación Zod + feedback)
- [x] Spinner y estados de red en wizard — 04-Jul-2025
- [x] Tracking evento `wizard_completed`
- [x] Tracking evento `upgrade_click`
- [x] Tracking evento `signup_free`
- [x] API `/api/track` guarda eventos en MongoDB — 03-Jul-2025
- [x] Badge visual del plan en dashboard y navbar
- [x] Avisos visuales de upgrade por límite de uso
- [x] Toasts operativos con @heroui/toast — 03-Jul-2025
- [x] Ruta pública estable sin error params.slug — 03-Jul-2025
- [x] Refactor contador proyectos en dashboard
- [x] Preview pública `/projects/[id]/preview`
- [x] Landing MVP real
- [x] Fix estilos globales + warning slug
- [x] Estilos HeroUI restaurados (Tailwind content + plugin) — 03-Jul-2025
- [x] Verificación backend de slug único en `/api/sites` — 03-Jul-2025
- [x] Página de error amigable para rutas privadas sin sesión — 03-Jul-2025
- [x] Creación de `lib/utils.ts` (modularizar helpers y hooks) — 03-Jul-2025
- [x] Setup inicial de pruebas con Jest + Testing Library — 03-Jul-2025
- [x] Workflow CI con GitHub Actions — 03-Jul-2025
- [x] GitHub Action "Codex Swarm" para automatizar el backlog — 11-Jul-2025
- [x] Validación avanzada de formularios (login, registro, perfil) con React Hook Form + Zod — 03-Jul-2025
- [x] Guardar configuración del sitio en MongoDB (estructura del wizard) — 03-Jul-2025
- [x] Demo pública navegable — 03-Jul-2025
- [x] Middleware `withValidation` (Zod) para APIs — 03-Jul-2025
- [x] Tests API register y middleware withValidation — 03-Jul-2025
- [x] Tracking básico de visitas y clics (`/api/track` extendido) — 03-Jul-2025
- [x] API admin `/api/admin/stats` devuelve conteo de usuarios, sitios y eventos — 04-Jul-2025
- [x] Pruebas API admin `/api/admin/stats` — 04-Jul-2025 CEST
- [x] Tests API perfil (`/api/me/update` y `/api/me/avatar`) — 04-Jul-2025
- [x] Introducción de helper `logger` y reemplazo de `console.error` — 04-Jul-2025
- [x] Tests middleware withAuthPlan — 04-Jul-2025 CEST
- [x] Tests middleware withRateLimit — 04-Jul-2025
- [x] Tests API track (`/api/track`) — 03-Jul-2025
- [x] Corregir `.npmrc` y asegurar `npm install` limpio — 04-Jul-2025 CEST
- [x] Middleware `withRateLimit` con Upstash Redis — 04-Jul-2025
- [x] Mejora de accesibilidad (focus, labels, roles) — 04-Jul-2025
- [x] Ajustar dependencias MongoDB para evitar `legacy-peer-deps` (downgrade a v5.9.2) — 03-Jul-2025
- [x] API `/api/stripe/history` devuelve pagos — 05-Jul-2025
- [x] Página `/app/billing` lista con historial — 05-Jul-2025
- [x] Hooks pre-commit con Husky + lint-staged — 11-Jul-2025
- [x] Traducción completa de dashboard y páginas públicas — 11-Jul-2025
- [x] Script `translations:check` para detectar claves faltantes — 11-Jul-2025
- [x] Script `i18n-check` para claves faltantes y sin uso — 11-Jul-2025
- [x] Internacionalización global (navbar, modals, perfil) — 11-Jul-2025
- [x] Feedback UX coherente y accesible — 11-Jul-2025
- [x] Formulario de feedback tras completar onboarding — 11-Jul-2025
- [x] Tests unitarios helpers onboarding y API feedback — 11-Jul-2025
- [x] Test e2e flujo onboarding (Playwright) — 11-Jul-2025

---

## 🚧 Tareas Pendientes por Fase

### 🔓 FREE – Core público y experiencia

#### 🔐 Backend

- [x] Actualizar docs de Arquitectura — 04-Jul-2025
- [x] Subida y gestión de avatar real — 05-Jul-2025
- [x] Separar vistas en `/app/` (migración App Router)
- [x] JSDoc completo + ejemplos de uso
- [x] Docs MDX con `:::tip` — 05-Jul-2025
- [x] Demo efecto 3D CSS — 10-Jul-2025
- [x] Añadir `inputmode` móvil — 05-Jul-2025
- [x] Configurar alias `@` en ESLint y docs — 05-Jul-2025

#### 🧱 Generador de sitios (wizard)

#### 💳 Sistema de pagos y planes

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback

- [x] Mensajes de éxito / error contextualizados
- [x] Skeleton APIs branding/export/analytics/upload — 11-Jul-2025
- [x] Subida de imágenes de branding (logo y favicon) — 11-Jul-2025
- [x] Script `export:zip` documentado
- [x] Secciones FAQ en README y CONTRIBUTING

### 💼 PRO – Funcionalidades avanzadas

#### 🔐 Backend

- [x] Guardar estructura completa del sitio (branding, assets) en MongoDB — 14-Jul-2025
- [x] Subida y almacenamiento seguro de imágenes personalizadas (S3 / Cloudinary) — 14-Jul-2025
- [x] Conexión dominio propio (Namecheap / Cloudflare) — 12-Jul-2025
- [x] Exportación de sitios como HTML estático — 11-Jul-2025
- [x] Emails transaccionales (Resend) + confirmación de cuenta — 12-Jul-2025

#### 🔄 Mejora continua

- [x] i18n básico
- [x] Cobertura i18n avanzada
- [x] Export estático incremental — 11-Jul-2025
- [x] Script `npm run check` (lint + format + test) — 11-Jul-2025
- [x] Script `npm run check:legal` para verificar textos legales
- [x] Script `npm run setup` para preparar entorno — 11-Jul-2025
- [x] Plantilla de issue feedback UX/traducciones
- [ ] Integrar metaexplorer SEO
- [ ] Tema Material 3 Expressive
- [ ] Fix Lighthouse en CI

#### 🧱 Generador de sitios (wizard)

- [x] Branding extendido (selector de color, fuentes, logo, favicon) — 14-Jul-2025

#### 💳 Sistema de pagos y planes

- [x] Integrar Stripe (productos, subscripciones, webhooks) — 04-Jul-2025
- [x] Middleware de control de plan + free trial (7 días, opc.) — 13-Jul-2025
- [x] Middleware withAuthPlanRoute para rutas App Router — 04-Jul-2025
- [x] Dashboard: historial y panel de pagos — 04-Jul-2025

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback

- [x] Panel de analítica simple (visitas, actividad – Upstash opc., ver `docs/ANALYTICS.md`) — 11-Jul-2025
- [x] Onboarding guiado tras upgrade: branding ➜ dominio ➜ analytics — 11-Jul-2025

### 🚀 PREMIUM – IA, multimedia, retención y soporte

#### 🔐 Backend

- [x] Cache de sitios (Upstash Redis, TTL dinámico)
- [x] Backups automáticos + restore 1 clic — 12-Jul-2025

#### 🧱 Generador de sitios (wizard)

- [ ] Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- [ ] Librería de componentes **premium** inspirada en HeroUI Plus, Tailwind UI, Shadcn UI, Flowbite y DaisyUI
- [ ] Evaluar **Toastify**, **Swiper**, **PhotoSwipe**, **Atropos**, **canvas-confetti** y **Arctic** para animaciones y sliders

#### 💳 Sistema de pagos y planes

- [ ] Integración Stripe completa (producto PREMIUM, webhooks, historial)

#### 🌟 Funcionalidades premium

- [x] Integrar **DataFast** (IA) para generación de contenido
- [ ] Soporte prioritario (chat/email)
- [x] Generador de textos legales (cookies, privacy, T&C)
- [ ] Banners visuales de upsell (dashboard)

#### 🧪 Retención, métricas y feedback

- [ ] Panel premium de analítica (páginas vistas, retención, logs – ver `docs/ANALYTICS.md`)

### 📊 ADMIN & Retención

#### 🧪 Retención, métricas y feedback

- [ ] Panel admin de métricas: nº registros, proyectos por usuario y actividad reciente
- [ ] Tracking avanzado: wizard, upgrades, feedback usuarios (ver `docs/ANALYTICS.md`)
- [x] Captura de feedback post-creación o upgrade
- [ ] Alertas visuales en puntos clave del funnel
- [ ] Sistema de fidelización/puntos con recompensas diarias
- [ ] Insignias y logros visibles en el perfil del usuario

---

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.

Cobertura actual de tests: ~87% (`npm run test:coverage`).
