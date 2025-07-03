# TAREAS.md

_Actualizado: **03-Jul-2025**_

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
- [x] Paquetes lint (`@eslint/*`) + `cross-env` + script `dev`
- [x] Seeds & reset via **tsx**
- [x] Instancia Stripe (`lib/stripe.ts`)
- [x] **withAuthPlan** middleware (protección por plan)
- [x] Verificación de `@types/*`
- [x] Persistencia real de perfil y proyectos (MongoDB)
- [x] Edición perfil persistente (nombre, contraseña)
- [x] Render público de sitio en `/[slug]` — 03-Jul-2025
- [x] Aviso + bloqueo backend si >1 sitio FREE
- [x] Wizard/Generador de sitios (mínimo viable, 1 sitio FREE) — 03-Jul-2025
- [x] Manejo de errores en wizard (validación Zod + feedback)
- [x] Tracking evento `wizard_completed`
- [x] Tracking evento `upgrade_click`
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

---

## 🚧 Tareas Pendientes por Fase

### 🔓 FREE – Core público y experiencia

- [ ] Subida y gestión de avatar real
- [ ] Mejora de accesibilidad (focus, labels, roles)
- [ ] Spinner y estados de red en wizard
- [ ] Panel mínimo de métricas (registros, proyectos, actividad)
- [ ] Separar vistas en `/app/` (migración App Router)
- [ ] Ajustar dependencias MongoDB v6 para evitar `legacy-peer-deps`
- [ ] Corregir `.npmrc` y asegurar `npm install` limpio

---

### 💼 PRO – Funcionalidades avanzadas

- [ ] Guardar estructura completa del sitio (branding, assets) en MongoDB
- [ ] Subida y almacenamiento seguro de imágenes personalizadas (S3 / Cloudinary)
- [ ] Branding extendido (selector de color, fuentes, logo, favicon)
- [ ] Emails transaccionales (Resend) + confirmación de cuenta
- [ ] Panel de analítica simple (visitas, actividad – Upstash opc.)
- [ ] Conexión dominio propio (Namecheap / Cloudflare)
- [ ] Exportación de sitios como HTML estático
- [ ] Onboarding guiado tras upgrade: branding ➜ dominio ➜ analytics

---

### 🚀 PREMIUM – IA, multimedia, retención y soporte

- [ ] Integrar **DataFast** (IA) para generación de contenido
- [ ] Cache de sitios (Upstash Redis, TTL dinámico)
- [ ] Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- [ ] Integración Stripe completa (producto PREMIUM, webhooks, historial)
- [ ] Panel premium de analítica (páginas vistas, retención, logs)
- [ ] Soporte prioritario (chat/email)
- [ ] Generador de textos legales (cookies, privacy, T&C)
- [ ] Backups automáticos + restore 1 clic
- [ ] Banners visuales de upsell (dashboard)
- [ ] Librería de componentes **premium** inspirada en HeroUI Plus, Tailwind UI,
  Shadcn UI, Flowbite y DaisyUI

---

### 📊 ADMIN & Retención

- [ ] Panel admin de métricas (registros, actividad)
- [ ] Tracking avanzado: wizard, upgrades, feedback usuarios
- [ ] Captura de feedback post-creación o upgrade
- [ ] Alertas visuales en puntos clave del funnel

---

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.
