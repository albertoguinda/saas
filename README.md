🧱 SaaS Web Builder – Next.js & HeroUI
Base sólida para un SaaS moderno de generación de sitios web y portfolios.
Stack: Next.js 15, HeroUI, MongoDB, Auth.js, Stripe, Tailwind, TypeScript.

🚀 Stack y Tecnologías
🧩 Frontend / UI
Next.js 15 · App Router (preparado para migrar desde Pages)

React 18

HeroUI 2.x · Componentes premium accesibles y personalizables

Tailwind CSS · Estilo rápido y eficiente

Framer Motion · Animaciones fluidas

next-themes · Modo oscuro/claro

TypeScript · Tipado estático, zero sorpresas

🔐 Backend / Servicios
Auth.js (NextAuth) · Autenticación universal (Credentials, Google…)

MongoDB + Mongoose · Base de datos cloud escalable

Stripe · Suscripciones, pagos y upgrade de planes

Upstash Redis · Cache global serverless (listo para escalar)

Resend · Emails transaccionales (bienvenida, avisos, etc.)

🌐 Integraciones Futuras
DataFast (IA) · Generación automática de contenido

MUX · Vídeo hosting

CurrencyAPI · Precios internacionales

Namecheap API · Registro de dominios

Capacitor · App móvil (exploratorio)

⚙️ Puesta en marcha
1. Instala dependencias
bash
Copiar
Editar
npm install
2. Crea tu archivo de entorno
Copia .env.example a .env.local y rellena tus claves de MongoDB, Auth, Stripe...

3. Lanza en local
bash
Copiar
Editar
npm run dev
Abre http://localhost:3000

📁 Estructura principal
bash
Copiar
Editar
/app         → Sistema de rutas principal (App/Pages Router)
/pages       → Páginas y rutas legacy (en migración)
/components  → UI reutilizable (HeroUI y custom)
/layouts     → Layouts públicos y privados
/lib         → Conexión DB, Auth, lógica de negocio
/models      → Modelos de datos Mongoose
/styles      → Tailwind global y custom
/scripts     → Seeds, utilidades CLI
/docs        → Documentación interna (roadmap, stack, tareas)
📚 Documentación y Productividad
Stack Tecnológico: /docs/STACK.md

Roadmap y lanzamientos: /docs/ROADMAP.md

Funcionalidades de cada plan: /docs/PLAN_FREE.md, /docs/PLAN_PRO.md, /docs/PLAN_PREMIUM.md

Tareas y backlog: /docs/TAREAS.md

Agentes/automatización: /docs/AGENTS.md

🧭 Roadmap inmediato (MVP/Monetizar rápido)
Login, registro, dashboard y perfil funcional

Mock proyectos (limitado a 1 por usuario FREE)

Upgrade y pagos: Stripe listo en dashboard

Página pública de sitio generado (demo)

Emails automáticos básicos

Tracking mínimo y feedback de usuario

¡Nada más antes de lanzar!
Todo lo demás es secundario hasta tener usuarios y feedback real.

🤖 Onboarding para devs
Lee /docs/PLAN_FREE.md y /docs/TAREAS.md

Ejecuta el flujo de login > dashboard > proyectos > perfil

Las rutas API están en /pages/api (irán migrando a /app/api)

Prioriza entregar valor y evitar over-engineering

Refactoriza sólo lo necesario para lanzar

🛡️ Licencia
MIT

¿Listo para contribuir? ¡Sigue el roadmap, prioriza lo que da valor y lanza ya!
Cualquier duda de arquitectura, mejor preguntar antes de migrar grandes partes.