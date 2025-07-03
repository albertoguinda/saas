# TAREAS.md

_Actualizado: **03-Jul-2025**_

---

## ✅ Tareas Completadas

- Setup inicial (Next.js 15 + TS + estructura `/pages`)
- TailwindCSS + HeroUI configurados
- ESLint, Prettier y convenciones
- Auth.js (NextAuth) + MongoDB Atlas
- Modelo **User** (`/lib/models/user.ts`) con bcrypt
- API **register** (`/api/auth/register`)
- Formularios login/registro (HeroUI, feedback)
- Login funcional + redirección SSR/client
- Layouts: público (`default`) y auth (`auth`)
- Dashboard básico, navbar dinámica (avatar, logout, perfil)
- Vistas FREE: profile, projects, welcome, settings (mock)
- 🌗 Tema claro/oscuro (next-themes)
- **Limitación real**: 1 proyecto FREE + aviso upgrade
- Modelo **Site** (`site.ts`) relacionado con usuario
- APIs
  - `/api/sites` (GET/POST) – CRUD sitios
  - `/api/me` (GET/PATCH) – perfil
- Paquetes lint (`@eslint/*`) + `cross-env` + script `dev`
- Seeds & reset via **tsx**
- Instancia Stripe (`lib/stripe.ts`)
- **withAuthPlan** middleware (protección por plan)
- Verificación de `@types/*`
- Persistencia real de perfil y proyectos (MongoDB)
- Edición perfil persistente (nombre, contraseña)
- Render público de sitio en `/[slug]`
- Aviso + bloqueo backend si >1 sitio FREE
- ✅ Wizard/Generador de sitios (mínimo viable, 1 sitio FREE) — 03-Jul-2025
- ✅ Manejo de errores en wizard (validación Zod + feedback)

---

## 🚧 Tareas Pendientes por Fase

### 🔓 FREE – Core público y experiencia

- Validación avanzada de formularios (login, registro, perfil) con Zod + feedback real-time
- ✅ Preview pública `/projects/[id]/preview`
- ✅ Render dinámico en `/[slug]`
- Página de error amigable para rutas privadas sin sesión
- Badge visual del plan activo (FREE) en dashboard y navbar
- Avisos visuales de upgrade por límite de uso o flujo crítico
- Tracking evento `wizard_completed`

---

### 💼 PRO – Funcionalidades avanzadas

- Guardar estructura completa del sitio (branding, assets) en MongoDB
- Branding extendido (selector de color, fuentes, logo, favicon)
- Emails transaccionales (Resend) + confirmación de cuenta
- Panel de analítica simple (visitas, actividad – Upstash opc.)
- Conexión dominio propio (Namecheap / Cloudflare)
- Exportación de sitios como HTML estático

---

### 🚀 PREMIUM – IA, multimedia, retención y soporte

- Integrar **DataFast** (IA) para generación de contenido
- Cache de sitios (Upstash Redis, TTL dinámico)
- Soporte vídeo (upload a MUX, player embebido, selector en wizard)
- Integración Stripe completa (producto PREMIUM, webhooks, historial)
- Panel premium de analítica (páginas vistas, retención, logs)
- Soporte prioritario (chat/email)
- Generador de textos legales (cookies, privacy, T&C)
- Backups automáticos + restore 1 clic
- Banners visuales de upsell (dashboard)

---

### 📊 ADMIN & Retención

- Panel admin de métricas (registros, actividad)
- Tracking avanzado: wizard, upgrades, feedback usuarios
- Captura de feedback post-creación o upgrade
- Alertas visuales en puntos clave del funnel

---

> **Recuerda:** Actualiza este archivo al cerrar una feature, añadir una nueva necesidad o mover tareas de fase. No dupliques; mueve y marca con `[x]` según corresponda.
