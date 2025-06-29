🚦 ROADMAP.md
Visión:
Desarrollar un SaaS de generación de sitios web con escalabilidad real, onboarding rápido y flujos claros de upgrade, listo para monetizar y evolucionar de FREE → PRO → PREMIUM.

1️⃣ Fase 1 — Setup & Base
 Proyecto Next.js 15 con TypeScript y App Router listo para escalar

 TailwindCSS + HeroUI instalados (UI moderna y mantenible)

 Entorno de desarrollo con ESLint, Prettier, TypeScript estricto

2️⃣ Fase 2 — Autenticación & DB
 Auth.js (NextAuth) configurado (credentials y preparado para OAuth)

 MongoDB Atlas con Mongoose (conexión y modelos base)

 Modelo User (/lib/models/user.ts) con hash de password y validación

 Modelo Site (/lib/models/site.ts) para webs generadas

 API /api/me para exponer/actualizar datos del usuario autenticado

3️⃣ Fase 3 — Generador de sitios (Plan FREE)
 Wizard paso a paso con HeroUI (estructura básica del sitio, colores, secciones)

 Guardar configuración de sitios en MongoDB

 Renderizado dinámico de webs generadas en /[slug]

 Límite de 1 sitio/proyecto en cuenta FREE

 Demo pública del sitio generado

4️⃣ Fase 4 — Pagos y planes (PRO/PREMIUM)
 Integración completa con Stripe (productos, suscripciones, webhooks)

 API para gestionar planes de usuario (alta, upgrade, downgrade)

 Middleware para proteger rutas/features según plan contratado

 Free trial de 7 días (opcional, Stripe trial)

 Historial y panel de pagos en dashboard

5️⃣ Fase 5 — Funcionalidades PRO
 Branding personalizado (paleta, logo, favicon, estilos avanzados)

 Conexión de dominio propio (gestión manual Namecheap/Cloudflare)

 Panel de métricas por sitio (Upstash opcional para cache/analytics)

 Emails automáticos y transaccionales con Resend

6️⃣ Fase 6 — Funcionalidades PREMIUM
 Integración de IA (DataFast): generación de contenido, prompts avanzados

 Caching inteligente y performance vía Upstash Redis

 Integración MUX para vídeo (upload y gestión multimedia)

 Generación y gestión automática de textos legales

 Sistema de backup/restore por sitio y usuario

 Soporte prioritario in-app (chat/email/faq)

7️⃣ Fase 7 — Validación, métricas y feedback
 Tracking de uso (wizard y webs generadas)

 Alertas y avisos visuales para upgrade (puntos de fricción o límite)

 Etiqueta visual del plan activo (FREE, PRO, PREMIUM) en el dashboard/navbar

 Captura y gestión de feedback en dashboard (enlace rápido a soporte)

💡 Revisa este roadmap cada semana para planificar releases, sprints y validación de producto.