📦 CODIGOBASE.md
Estructura, arquitectura y convenciones técnicas base
Stack: Next.js 15 (Pages Router, migrable a App Router) · TypeScript · MongoDB (Mongoose) · Auth.js · TailwindCSS · HeroUI · Stripe · Resend

📁 Estructura real del proyecto
swift
Copiar
Editar
/pages
  ├─ _app.tsx                // Setup de sesión global, estilos y providers
  ├─ _document.tsx           // HTML root (fuentes, meta)
  ├─ index.tsx               // Landing pública
  ├─ about/index.tsx         // About page
  ├─ auth/
  │    ├─ login.tsx          // Login
  │    └─ register.tsx       // Registro
  ├─ dashboard/
  │    ├─ index.tsx          // Dashboard principal (overview)
  │    ├─ profile.tsx        // Perfil usuario
  │    ├─ projects.tsx       // Proyectos del usuario
  │    ├─ settings.tsx       // Ajustes (mock)
  │    └─ welcome.tsx        // Pantalla de bienvenida
  ├─ blog/index.tsx
  ├─ docs/index.tsx
  └─ pricing/index.tsx

/layouts/
  ├─ default.tsx         // Layout general (navbar, theme)
  ├─ auth.tsx            // Layout login/registro
  └─ head.tsx            // Head global

/components/
  ├─ navbar.tsx          // Navbar global
  ├─ theme-switch.tsx    // Toggle tema
  ├─ icons.tsx           // Iconos SVG centralizados
  └─ primitives.ts       // Utilidades de clases

/lib/
  ├─ dbConnect.ts        // Conexión MongoDB Atlas
  ├─ models/
  │    ├─ user.ts        // User model (mongoose)
  │    └─ site.ts        // Site model (pendiente)
  └─ middlewares/
       └─ withAuthPlan.ts // Middleware protección de planes

/scripts/
  └─ seed.ts             // Seed usuarios test

/styles/
  └─ globals.css         // Tailwind + fuentes + resets

/public/
  └─ favicon.ico

/config/
  ├─ site.ts             // Config general del SaaS
  └─ fonts.ts            // Fuentes personalizadas

/types/
  └─ next-auth.d.ts      // Tipado NextAuth personalizado

/docs/
  (docs técnicos, roadmap, tareas, etc.)
🧠 Arquitectura & lógica principal
🟣 Auth.js (NextAuth)
Login/registro por credentials (email+password)

JWT + MongoDB Adapter

Middleware/HOC de protección en dashboard y APIs

Roles & planes: campo user.plan en DB (free | pro | premium)

Sesión persistente (cookie segura + JWT)

🟡 MongoDB + Mongoose
Modelos en /lib/models/

User: email, password, name, plan, createdAt

Site (próximo): userId, slug, config...

Conexión centralizada vía dbConnect.ts (persistente y eficiente)

Helpers opcionales en dbConnect.ts

🔵 UI & Diseño
TailwindCSS + HeroUI (2.x)

Layouts claros (default, auth)

Componentes visuales extendidos

ThemeProvider (next-themes)

Responsive & accesible (a11y ready)

🧩 Utilidades base y helpers
lib/utils.ts (si existe):
Helpers de clases (clsx), sesión (getServerSession), helpers bcrypt

Middlewares:
withAuthPlan (protección de rutas por plan)

Validación backend (añadir Zod opcional para robustez)

📡 API y rutas core
Ruta	Método	Protección	Descripción
/api/auth/register      POST    Pública Registro manual (hash pre-save)
/api/auth/login	POST	Pública	Login credentials
/api/me	GET	🔐	Info del usuario logueado
/api/me/update	PATCH	🔐	Actualizar nombre o pass
/api/sites	POST	🔐	Crear sitio web generado
/api/sites	GET	🔐	Listar sitios del usuario
/api/stripe/checkout	POST	🔐	Checkout de plan/upgrade
/api/stripe/webhook	POST	🔐	Webhooks Stripe (pagos, subs)

🧠 Convenciones técnicas
UI en /components/, siempre reutilizable y clara

Endpoints: status claros (200, 400, 401, 403, 500)

Modelos en /lib/models y singleton para evitar sobrecarga dev

Lógica protegida: session via HOC/useSession/SSR

Planes y roles: definidos como constantes, chequeo en runtime/backend

📦 Paquetes principales instalados
next, react, react-dom

tailwindcss, postcss, autoprefixer

@heroui/* (HeroUI 2.x)

next-auth (Auth.js)

mongoose, bcryptjs

clsx, framer-motion, next-themes

📝 NOTA
Actualmente, el proyecto utiliza Pages Router (/pages).
La estructura y organización permite migrar fácilmente a App Router (/app) para mayor flexibilidad, SSR y layouts anidados.

💡 Ejemplo de estructura futura en /app:
txt
Copiar
Editar
/app
  layout.tsx
  page.tsx
  dashboard/
    layout.tsx
    page.tsx
    projects/page.tsx
    profile/page.tsx
    settings/page.tsx
    welcome/page.tsx
  login/page.tsx
  register/page.tsx
  [slug]/page.tsx
/api
  ... (rutas API modernizadas)
