# TAREAS.md

\_Actualizado: **12-Jul-2025 23:27 UTC**

---

## ✅ Tareas Completadas

## 📚 Historial últimos PRs

| Tarea                                     | Estado | Fecha      | Commit  | Autor         |
| ----------------------------------------- | ------ | ---------- | ------- | ------------- |
| Gestión y conexión de dominios propios    | ✅     | 2025-07-12 | 9a5222c | albertoguinda |
| Automatizar scripts npm y Husky           | ✅     | 2025-07-12 | 20f9a4e | albertoguinda |
| Catálogo Premium UI/UX                    | ✅     | 2025-07-12 | 923d201 | albertoguinda |
| Componente Price premium                  | ✅     | 2025-07-12 | a29427f | agente        |
| Conexión dominio propio                   | ✅     | 2025-07-12 | 5000830 | albertoguinda |
| Backups automáticos y restauración 1 clic | ✅     | 2025-07-12 | e6a1d7e | albertoguinda |
| Backup y restore                          | ✅     | 2025-07-12 | 13abc51 | albertoguinda |
| Integración Stripe suscripciones          | ✅     | 2025-07-12 | 23c4bbf | albertoguinda |
| Gestión segura de imágenes de branding    | ✅     | 2025-07-12 | 413e60b | albertoguinda |
| Mejora fallback i18n y landing            | ✅     | 2025-07-12 | 3f65f2f | albertoguinda |
| Refuerzo trigger onboarding               | ✅     | 2025-07-12 | 84ff6c7 | albertoguinda |
| Almacenamiento seguro de imágenes         | ✅     | 2025-07-12 | 9c5aaba | albertoguinda |
| Control de acceso a planes                | ✅     | 2025-07-12 | 1e38a9c | albertoguinda |
| Cache avanzada con Upstash                | ✅     | 2025-07-12 | cc5bd05 | albertoguinda |
| Cache TTL y fallback robusto              | ✅     | 2025-07-12 | e863e3e | albertoguinda |
| Generación IA de contenido                | ✅     | 2025-07-11 | b127717 | albertoguinda |
| API dominio y backups iniciales           | ✅     | 2025-07-11 | 90ac47a | albertoguinda |
| Onboarding guiado tras upgrade            | ✅     | 2025-07-11 | ef40270 | albertoguinda |
| Panel de analítica simple                 | ✅     | 2025-07-11 | 995e78e | albertoguinda |
| Free trial y control de planes            | ✅     | 2025-07-11 | d30e710 | albertoguinda |
| Refuerzo middleware free trial            | ✅     | 2025-07-12 | fe6204e | albertoguinda |
| FAQ y nuevos scripts docs                 | ✅     | 2025-07-11 | 3ba20f5 | albertoguinda |
| i18n total y feedback UX                  | ✅     | 2025-07-11 | da97bf0 | albertoguinda |
| Refuerzo i18n y UX                        | ✅     | 2025-07-11 | a79c9a5 | albertoguinda |
| Localización core components              | ✅     | 2025-07-11 | 7e840ca | albertoguinda |

| AGV Dashboard premium | ✅ | 2025-07-12 | f3e70de | albertoguinda |
| Inventario Premium Total desde ZIPs | ✅ | 2025-07-12 | 89e7731 | agente |

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

- [x] Actualizar docs de Arquitectura — 04-Jul-2025
- [x] Subida y gestión de avatar real — 05-Jul-2025
- [x] Separar vistas en `/app/` (migración App Router)
- [x] JSDoc completo + ejemplos de uso
- [x] Docs MDX con `:::tip` — 05-Jul-2025
- [x] Demo efecto 3D CSS — 10-Jul-2025
- [x] Añadir `inputmode` móvil — 05-Jul-2025
- [x] Configurar alias `@` en ESLint y docs — 05-Jul-2025
- [x] Mensajes de éxito / error contextualizados
- [x] Skeleton APIs branding/export/analytics/upload — 11-Jul-2025
- [x] Subida de imágenes de branding (logo y favicon) — 11-Jul-2025
- [x] Script `export:zip` documentado
- [x] Secciones FAQ en README y CONTRIBUTING (3ba20f5, @albertoguinda)
- [x] Guardar estructura completa del sitio (branding, assets) en MongoDB — 14-Jul-2025 (9c96f87, @albertoguinda)
- [x] Subida y almacenamiento seguro de imágenes personalizadas (S3 / Cloudinary) — 14-Jul-2025 (9c96f87, @albertoguinda)
- [x] Gestión de branding por sitio con mock local de uploads — 12-Jul-2025 (9c96f87, @albertoguinda)
- [x] Conexión dominio propio (Namecheap / Cloudflare) — 12-Jul-2025 (5000830, @albertoguinda)
- [x] Validación DNS (CNAME a la app) — 12-Jul-2025 (5000830, @albertoguinda)
- [x] Exportación de sitios como HTML estático — 11-Jul-2025 (ef40270, @albertoguinda)
- [x] Endpoint `/api/export` descarga ZIP estático — 24-Jul-2025
- [x] Emails transaccionales (Resend) + confirmación de cuenta — 12-Jul-2025 (d9c347b, @albertoguinda)
- [x] i18n básico
- [x] Cobertura i18n avanzada
- [x] Export estático incremental — 11-Jul-2025
- [x] Script `npm run check` (lint + format + test) — 11-Jul-2025
- [x] Script `npm run check:legal` para verificar textos legales
- [x] Script `npm run setup` para preparar entorno — 11-Jul-2025
- [x] Mejora scripts de automatizacion y pre-commit (check + setup) — 22-Jul-2025 (20f9a4e (@albertoguinda))
- [x] Plantilla de issue feedback UX/traducciones
- [x] Branding extendido (selector de color, fuentes, logo, favicon) — 14-Jul-2025
- [x] Integrar Stripe (productos, subscripciones, webhooks) — 04-Jul-2025
- [x] Middleware de control de plan + free trial (7 días, opc.) — 13-Jul-2025 (d30e710, @albertoguinda)
- [x] Middleware withAuthPlanRoute para rutas App Router — 04-Jul-2025
- [x] Dashboard: historial y panel de pagos — 04-Jul-2025
- [x] Panel de analítica simple (visitas, actividad – Upstash opc., ver `docs/ANALYTICS.md`) — 11-Jul-2025 (995e78e, @albertoguinda)
- [x] Onboarding guiado tras upgrade: branding ➜ dominio ➜ analytics — 11-Jul-2025 (ef40270, @albertoguinda)
- [x] Trigger robusto de onboarding tras upgrade PREMIUM (webhook + dashboard) — 18-Jul-2025 (84ff6c7, @albertoguinda)
- [x] Logs `onboarding_started` y `onboarding_completed` — 18-Jul-2025 (84ff6c7, @albertoguinda)
- [x] Cache de sitios (Upstash Redis, TTL dinámico) (cc5bd05, @albertoguinda)
- [x] Backups automáticos + restore 1 clic (endpoints y UI) — 20-Jul-2025 (13abc51, @albertoguinda)
- [x] Componente Price premium
- [x] Integración Stripe completa (producto PREMIUM, webhooks, historial) — 19-Jul-2025 (23c4bbf, @albertoguinda)
- [x] Integrar **DataFast** (IA) para generación de contenido (b127717, @albertoguinda)
- [x] Generador de textos legales (cookies, privacy, T&C)
- [x] Catálogo Premium UI/UX — 12-Jul-2025 (923d201 (@albertoguinda))
- [x] Integración AGV Dashboard premium — 12-Jul-2025 (f3e70de, @albertoguinda)

---

## 🚧 Tareas Pendientes por Fase

### 💼 PRO – Funcionalidades avanzadas

#### 🔄 Mejora continua

- [ ] Integrar metaexplorer SEO
- [ ] Tema Material 3 Expressive
- [ ] Fix Lighthouse en CI
- [ ] Configurar Renovate para dependencias (sugerida)
- [ ] Tests E2E con Playwright (sugerida)

### 🚀 PREMIUM – IA, multimedia, retención y soporte

- [ ] Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- [ ] Librería de componentes **premium** inspirada en HeroUI Plus, Tailwind UI, Shadcn UI, Flowbite y DaisyUI
- [ ] Evaluar **Toastify**, **Swiper**, **PhotoSwipe**, **Atropos**, **canvas-confetti** y **Arctic** para animaciones y sliders

- [ ] Soporte prioritario (chat/email)
- [ ] Banners visuales de upsell (dashboard)

- [ ] Panel premium de analítica (páginas vistas, retención, logs – ver `docs/ANALYTICS.md`)

### 📊 ADMIN & Retención

- [ ] Panel admin de métricas: nº registros, proyectos por usuario y actividad reciente
- [ ] Tracking avanzado: wizard, upgrades, feedback usuarios (ver `docs/ANALYTICS.md`)
- [ ] Captura de feedback post-creación o upgrade
- [ ] Alertas visuales en puntos clave del funnel
- [ ] Sistema de fidelización/puntos con recompensas diarias
- [ ] Insignias y logros visibles en el perfil del usuario

---

### 💡 Tips de desarrollo local

- Crea `next-intl.config.ts` en la raíz para que la i18n funcione.
- Usa mocks automáticos si Mongo o Redis faltan.
- Prueba landings añadiendo `?lang=es` al slug y ajustando el plan en los mocks.
- Limpia la caché local con `curl -X POST /api/cache/invalidate -d '{"slug":"mi-sitio"}'`.

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.
