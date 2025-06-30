TAREAS.md
✅ Tareas Completadas
 Setup del proyecto (Next.js 15, TypeScript, estructura /pages)

 TailwindCSS + HeroUI instalados y configurados

 ESLint, Prettier y convenciones de código

 Auth.js (NextAuth) + MongoDB Atlas (usuarios y sesiones)

 Modelo de usuario (/lib/models/user.ts) con bcrypt

 API de registro (/api/auth/register)

 Formularios de login y registro (HeroUI, feedback visual, placeholders genéricos)

 Login funcional con credentials

 Redirección automática por sesión (SSR + client)

 Layouts: público (default.tsx) y auth (auth.tsx)

 Dashboard básico (overview, saludo, navegación)

 Navbar dinámica: avatar, nombre/email, logout, acceso a perfil

 Vistas FREE: profile, projects, welcome, settings (mock/local)

 Limitación visual: 1 proyecto en FREE, avisos y CTA de upgrade

 Soporte completo de temas claro/oscuro

 Mock de creación/edición de proyectos y perfil (faltan APIs reales)

 Feedback visual: alertas y mensajes en login/registro/perfil

 Modelo de sitio (site.ts) — estructura básica y relación con usuario

 API /api/sites (GET/POST: CRUD de sitios generados)

API /api/me (GET: sesión extendida, PATCH: edición de perfil)

 Instalar @eslint/compat, @eslint/js, @eslint/eslintrc y cross-env
 Reemplazar script dev con cross-env NODE_OPTIONS=--trace-warnings
 Configurar seed con tsx


🚧 Tareas Pendientes por Fase
🔓 FREE – Core público y experiencia base
 Verificar paquetes de tipos (@types/node, @types/react, etc.) instalados
 Persistencia real de perfil y proyectos en MongoDB (API REST)

 Validación avanzada de formularios (login, registro, perfil) en frontend y backend


 Middleware withAuthPlan — proteger rutas según plan (FREE/PRO/PREMIUM)

 Avatar real (upload y persistencia)

 Edición de perfil persistente: nombre, contraseña, avatar

 Render público de sitio generado (/[slug], modo demo)

 Limitación y aviso real al crear más de 1 sitio en FREE

 Página de error amigable para rutas privadas sin sesión

 Wizard/Generador de sitios (mínimo viable, 1 sitio por usuario FREE)

 Badge visual de plan en dashboard y navbar

 Avisos visuales de upgrade por límite de uso

 Tracking básico: uso de wizard, nº de registros, nº de proyectos por usuario

💼 PRO – Funcionalidades avanzadas
 Guardado real de sitios generados (estructura completa, branding, assets)

 Branding extendido: selector de color, logo, fuentes, favicon

 Emails transaccionales: integración Resend (registro, cambios, notificaciones)

 Confirmación de cuenta por email (opcional)

 Panel de analítica simple: nº visitas, actividad, fetch via Upstash opcional

 Conexión de dominio propio (Namecheap: docs/manual + campo en modelo)

 Exportación de sitios como HTML estático

🚀 PREMIUM – IA, multimedia, retención y soporte
 Integrar DataFast IA (API: generación de contenido, tono/estilo editable)

 Caching de sitios generados (Upstash Redis, TTL)

 Soporte multimedia: upload vídeo a MUX, reproductor embebido, selector en wizard

 Control de pagos y upgrades: integración Stripe completa, webhooks, middleware, historial

 Panel premium de analítica: páginas vistas, retención, logs de actividad

 Soporte prioritario desde dashboard

 Generación automática de textos legales (política, cookies, T&C, editable)

 Backups automáticos por sitio, restauración desde dashboard

 Banners visuales de upsell (desde dashboard)

📊 ADMIN & Retención
 Panel básico de métricas de uso y actividad (admin only)

 Tracking avanzado: eventos wizard, upgrades, feedback usuarios

 Feedback capture tras creación de sitios o upgrade

 Alertas visuales en puntos clave del funnel

Actualiza siempre este archivo al cerrar una feature, descubrir una nueva necesidad o refactorizar algo relevante. Si una tarea cambia de fase, muévela, no la dupliques. Usa checkboxes y títulos claros.