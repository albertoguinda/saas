🧱 SaaS Web Builder – Next.js & HeroUI
Base sólida para un SaaS moderno de generación de sitios web y portfolios.
Toda la pila está escrita en TypeScript.

🚦 Visión
Crear un servicio escalable que permita generar sitios web de forma sencilla y
monetizar la plataforma a través de planes FREE, PRO y PREMIUM.

📦 Instalación
1. Instala dependencias
```bash
npm install
```
2. Configura el entorno
Copia `.env.example` a `.env.local` y rellena tus claves.
3. Ejecuta el seed para crear el usuario demo
```bash
npm run seed
```
4. Lanza en local
```bash
npm run dev
```

▶️ Uso (plan FREE)
- Regístrate e inicia sesión para acceder al dashboard.
- Crea tu primer proyecto (limitado a uno en el plan FREE).
- Personaliza tu perfil y prueba el generador de sitios.
- Si necesitas más funcionalidades puedes pasar a un plan superior.

📅 Roadmap
🚧 Tareas Pendientes por Fase
🔓 FREE – Core público y experiencia base
- Persistencia real de perfil y proyectos en MongoDB (API REST)
- Validación avanzada de formularios (login, registro, perfil) en frontend y backend
- Modelo de sitio (site.ts) — estructura básica y relación con usuario
- API /api/sites (GET/POST: CRUD de sitios generados)
- API /api/me (GET: sesión extendida, PATCH: edición de perfil)
- Middleware withAuthPlan — proteger rutas según plan (FREE/PRO/PREMIUM)
- Avatar real (upload y persistencia)
- Edición de perfil persistente: nombre, contraseña, avatar
- Render público de sitio generado (/[slug], modo demo)
- Limitación y aviso real al crear más de 1 sitio en FREE
- Página de error amigable para rutas privadas sin sesión
- Wizard/Generador de sitios (mínimo viable, 1 sitio por usuario FREE)
- Badge visual de plan en dashboard y navbar
- Avisos visuales de upgrade por límite de uso
- Tracking básico: uso de wizard, nº de registros, nº de proyectos por usuario

💼 PRO – Funcionalidades avanzadas
- Guardado real de sitios generados (estructura completa, branding, assets)
- Branding extendido: selector de color, logo, fuentes, favicon
- Emails transaccionales: integración Resend (registro, cambios, notificaciones)
- Confirmación de cuenta por email (opcional)
- Panel de analítica simple: nº visitas, actividad, fetch via Upstash opcional
- Conexión de dominio propio (Namecheap: docs/manual + campo en modelo)
- Exportación de sitios como HTML estático

🚀 PREMIUM – IA, multimedia, retención y soporte
- Integrar DataFast IA (API: generación de contenido, tono/estilo editable)
- Caching de sitios generados (Upstash Redis, TTL)
- Soporte multimedia: upload vídeo a MUX, reproductor embebido, selector en wizard
- Control de pagos y upgrades: integración Stripe completa, webhooks, middleware, historial
- Panel premium de analítica: páginas vistas, retención, logs de actividad
- Soporte prioritario desde dashboard
- Generación automática de textos legales (política, cookies, T&C, editable)
- Backups automáticos por sitio, restauración desde dashboard
- Banners visuales de upsell (desde dashboard)

📊 ADMIN & Retención
- Panel básico de métricas de uso y actividad (admin only)
- Tracking avanzado: eventos wizard, upgrades, feedback usuarios
- Feedback capture tras creación de sitios o upgrade
- Alertas visuales en puntos clave del funnel

🤝 Contribuir / Feedback
Consulta `/docs/CONTRIBUTING.md` para conocer el flujo de trabajo y abre un issue
si detectas problemas o quieres proponer mejoras.

🛡️ Licencia
MIT
