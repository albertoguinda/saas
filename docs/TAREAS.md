# TAREAS.md

\_Actualizado: **05-Jul-2025 21:00 CEST**

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

---

## 🚧 Tareas Pendientes por Fase

### 🔓 FREE – Core público y experiencia

#### 🔐 Backend

- [x] Actualizar docs de Arquitectura — 04-Jul-2025
- [x] Subida y gestión de avatar real — 05-Jul-2025
- [ ] Separar vistas en `/app/` (migración App Router)
- [ ] JSDoc completo + ejemplos de uso
- [x] Docs MDX con `:::tip` — 05-Jul-2025
- [ ] Demo efecto 3D CSS
- [x] Añadir `inputmode` móvil — 05-Jul-2025
- [x] Configurar alias `@` en ESLint y docs — 05-Jul-2025

#### 🧱 Generador de sitios (wizard)

#### 💳 Sistema de pagos y planes

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback

- [ ] Mensajes de éxito / error contextualizados

### 💼 PRO – Funcionalidades avanzadas

#### 🔐 Backend

- [ ] Guardar estructura completa del sitio (branding, assets) en MongoDB
- [ ] Subida y almacenamiento seguro de imágenes personalizadas (S3 / Cloudinary)
- [ ] Conexión dominio propio (Namecheap / Cloudflare)
- [ ] Exportación de sitios como HTML estático
- [ ] Emails transaccionales (Resend) + confirmación de cuenta

#### 🔄 Mejora continua

- [ ] i18n básico
- [ ] Export estático incremental
- [ ] Integrar metaexplorer SEO
- [ ] Tema Material 3 Expressive

#### 🧱 Generador de sitios (wizard)

- [ ] Branding extendido (selector de color, fuentes, logo, favicon)

#### 💳 Sistema de pagos y planes

- [x] Integrar Stripe (productos, subscripciones, webhooks) — 04-Jul-2025
- [ ] Middleware de control de plan + free trial (7 días, opc.)
- [x] Middleware withAuthPlanRoute para rutas App Router — 04-Jul-2025
- [x] Dashboard: historial y panel de pagos — 04-Jul-2025

#### 🌟 Funcionalidades premium

#### 🧪 Retención, métricas y feedback

- [ ] Panel de analítica simple (visitas, actividad – Upstash opc., ver `docs/ANALYTICS.md`)
- [ ] Onboarding guiado tras upgrade: branding ➜ dominio ➜ analytics (ver `docs/ANALYTICS.md`)

### 🚀 PREMIUM – IA, multimedia, retención y soporte

#### 🔐 Backend

- [ ] Cache de sitios (Upstash Redis, TTL dinámico)
- [ ] Backups automáticos + restore 1 clic

#### 🧱 Generador de sitios (wizard)

- [ ] Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- [ ] Librería de componentes **premium** inspirada en HeroUI Plus, Tailwind UI, Shadcn UI, Flowbite y DaisyUI
- [ ] Evaluar **Toastify**, **Swiper**, **PhotoSwipe**, **Atropos**, **canvas-confetti** y **Arctic** para animaciones y sliders

#### 💳 Sistema de pagos y planes

- [ ] Integración Stripe completa (producto PREMIUM, webhooks, historial)

#### 🌟 Funcionalidades premium

- [ ] Integrar **DataFast** (IA) para generación de contenido
- [ ] Soporte prioritario (chat/email)
- [ ] Generador de textos legales (cookies, privacy, T&C)
- [ ] Banners visuales de upsell (dashboard)

#### 🧪 Retención, métricas y feedback

- [ ] Panel premium de analítica (páginas vistas, retención, logs – ver `docs/ANALYTICS.md`)

### 📊 ADMIN & Retención

#### 🧪 Retención, métricas y feedback

- [ ] Panel admin de métricas: nº registros, proyectos por usuario y actividad reciente
- [ ] Tracking avanzado: wizard, upgrades, feedback usuarios (ver `docs/ANALYTICS.md`)
- [ ] Captura de feedback post-creación o upgrade
- [ ] Alertas visuales en puntos clave del funnel
- [ ] Sistema de fidelización/puntos con recompensas diarias
- [ ] Insignias y logros visibles en el perfil del usuario

---

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.
