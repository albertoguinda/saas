🧱 STACK.md — Stack & Arquitectura del Proyecto
🟦 FRONTEND PRINCIPAL
Next.js 15
Routing moderno (App/Pages Router), Server Actions, SSR, ISR, edge functions.
→ Base del sistema y fácil escalado a SSR/SSG.

React 18
UI reactiva, declarativa y escalable.
→ Reutilización y composición de vistas.

TailwindCSS
Estilos utilitarios, diseño responsive out-of-the-box.
→ Iteración ultra rápida y sin CSS manual.

HeroUI v2
Sistema de componentes accesibles y productivos (botón, input, card, badge, alert...).
→ Consistencia visual y velocidad en UI.

Framer Motion
Animaciones fluidas y controladas.
→ Experiencia moderna y transiciones suaves.

next-themes
Soporte automático a modo claro/oscuro y preferencias del usuario.

clsx
Gestión limpia de clases condicionales (className).

🟧 BACKEND, AUTENTICACIÓN Y DATOS
Auth.js (NextAuth)
Login seguro con credentials/OAuth, sesiones JWT y MongoDB Adapter.

MongoDB + Mongoose
Base NoSQL escalable, schemas para usuarios, sitios y configuraciones.

Stripe
Pagos y suscripciones, gestión de upgrades de plan.

Upstash Redis
Cache serverless y colas para rendimiento, estadísticas y eventos.

🟩 SERVICIOS EXTERNOS & EXTENSIÓN
Resend
Envío de emails transaccionales (registro, notificaciones, alertas).

DataFast (IA)
Generación de texto/SEO por IA (Premium).

CurrencyAPI
Conversión de moneda para precios globales.

MUX
Gestión y hosting de vídeo (para webs premium).

Namecheap API
Conexión de dominios personalizados (PRO/PREMIUM).

Capacitor (futuro)
Exportación multiplataforma a mobile app (Android/iOS).

🟫 UTILIDADES Y TOOLS INTERNOS
Zod
Validación de formularios y APIs (TypeScript-first).

Lucide
Iconos SVG escalables y personalizables.

Tailwind Variants
Creación de componentes con variantes y temas.

dotenv
Gestión segura de .env y secrets.

TypeScript
Tipado estricto y seguridad en todo el código.

ESLint
Linter con Flat Config (@eslint/js, @eslint/compat y @eslint/eslintrc).

🟨 CONVENCIÓN Y ESTRUCTURA
Componentes HeroUI se extienden/usan desde /components/ o /components/ui/.

Todos los modelos en /lib/models/ (User, Site, ...).

Rutas protegidas por plan, middleware en /lib/middlewares/.

Todas las features escalables: piensa en upgrades y modularidad.

Actualiza este documento cada vez que integres un nuevo paquete relevante o modifiques el stack base.
Así mantenemos el onboarding y la visión de arquitectura siempre clara.