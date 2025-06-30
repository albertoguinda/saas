✅ Tareas Completadas
[x] Setup del proyecto (Next.js 15, TypeScript, estructura /pages)
[x] TailwindCSS + HeroUI instalados y configurados
[x] ESLint, Prettier y convenciones de código
[x] Auth.js (NextAuth) + MongoDB Atlas (usuarios y sesiones)
[x] Modelo de usuario (/lib/models/user.ts) con bcrypt
[x] API de registro (/api/auth/register)
[x] Formularios de login y registro (HeroUI, feedback visual, placeholders genéricos)
[x] Login funcional con credentials
[x] Redirección automática por sesión (SSR + client)
[x] Layouts: público (default.tsx) y auth (auth.tsx)
[x] Dashboard básico (overview, saludo, navegación)
[x] Navbar dinámica: avatar, nombre/email, logout, acceso a perfil
[x] Vistas FREE: profile, projects, welcome, settings (mock/local)
[x] Limitación visual: 1 proyecto en FREE, avisos y CTA de upgrade
[x] Soporte completo de temas claro/oscuro
[x] Mock de creación/edición de proyectos y perfil (faltan APIs reales)
[x] Feedback visual: alertas y mensajes en login/registro/perfil
[x] Modelo de sitio (site.ts) — estructura básica y relación con usuario
[x] API /api/sites (GET/POST: CRUD de sitios generados)
[x] API /api/me (GET: sesión extendida, PATCH: edición de perfil)
[x] Instalar @eslint/compat, @eslint/js, @eslint/eslintrc y cross-env
[x] Reemplazar script dev con cross-env NODE_OPTIONS=--trace-warnings
[x] Configurar seed con tsx
[x] Verificar paquetes de tipos (@types/node, @types/react, etc.) instalados
[x] Persistencia real de perfil y proyectos en MongoDB (API REST)
[x] Middleware withAuthPlan — proteger rutas según plan (FREE/PRO/PREMIUM)
[x] Avatar real (upload y persistencia)
[x] Edición de perfil persistente: nombre, contraseña, avatar
[x] Render público de sitio generado (/[slug], modo demo)
[x] Limitación y aviso real al crear más de 1 sitio en FREE
[x] Guía de despliegue rápido (Vercel/Railway)

🚧 Tareas Pendientes por Fase
🔓 FREE – Core público y experiencia base
[ ] Validación avanzada de formularios (login, registro, perfil) en frontend y backend
[ ] Página de error amigable para rutas privadas sin sesión
[ ] Wizard/Generador de sitios (mínimo viable, 1 sitio por usuario FREE)
[ ] Badge visual de plan en dashboard y navbar
[ ] Avisos visuales de upgrade por límite de uso
[ ] Tracking básico: uso de wizard, nº de registros, nº de proyectos por usuario
[ ] Documentar pasos de despliegue detallados para producción

💼 PRO – Funcionalidades avanzadas
[ ] Guardado real de sitios generados (estructura completa, branding, assets)
[ ] Branding extendido: selector de color, logo, fuentes, favicon
[ ] Emails transaccionales: integración Resend (registro, cambios, notificaciones)
[ ] Confirmación de cuenta por email (opcional)
[ ] Panel de analítica simple: nº visitas, actividad, fetch via Upstash opcional
[ ] Conexión de dominio propio (Namecheap: docs/manual + campo en modelo)
[ ] Exportación de sitios como HTML estático
[ ] Integración inicial con Stripe (checkout y webhooks)

🚀 PREMIUM – IA, multimedia, retención y soporte
[ ] Integrar DataFast IA (API: generación de contenido, tono/estilo editable)
[ ] Caching de sitios generados (Upstash Redis, TTL)
[ ] Soporte multimedia: upload vídeo a MUX, reproductor embebido, selector en wizard
[ ] Control de pagos y upgrades: integración Stripe completa, webhooks, middleware, historial
[ ] Panel premium de analítica: páginas vistas, retención, logs de actividad
[ ] Soporte prioritario desde dashboard
[ ] Generación automática de textos legales (política, cookies, T&C, editable)
[ ] Backups automáticos por sitio, restauración desde dashboard
[ ] Banners visuales de upsell (desde dashboard)

📊 ADMIN & Retención
[ ] Panel básico de métricas de uso y actividad (admin only)
[ ] Tracking avanzado: eventos wizard, upgrades, feedback usuarios
[ ] Feedback capture tras creación de sitios o upgrade
[ ] Alertas visuales en puntos clave del funnel
[ ] Tests E2E con Playwright y flujo en CI

Actualiza siempre este archivo al cerrar una feature, descubrir una nueva necesidad o refactorizar algo relevante. Si una tarea cambia de fase, muévela, no la dupliques. Usa checkboxes y títulos claros.

