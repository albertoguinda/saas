# CODIGOBASE.md

_Estructura, arquitectura y convenciones técnicas base_  
**Stack**: Next.js 15 (Pages → App Router híbrido) · TypeScript · MongoDB (Mongoose 8) · Auth.js · TailwindCSS · HeroUI v2 · Stripe · Resend · tsx

---

## 📁 Estructura real del proyecto (Jul 2025)

```text
/pages
├─ \_app.tsx // Providers, estilos globales
├─ \_document.tsx // HTML root (fuentes, meta)
├─ index.tsx // Landing pública
├─ about/index.tsx
├─ auth/
│ ├─ login.tsx
│ └─ register.tsx
├─ dashboard/
│ ├─ index.tsx
│ ├─ profile.tsx
│ ├─ projects.tsx
│ ├─ settings.tsx
│ └─ welcome.tsx
├─ blog/index.tsx
├─ docs/index.tsx
└─ pricing/index.tsx

/app
├─ projects/[id]/wizard/page.tsx // ✅ Wizard 3-pasos (title, slug, template)
├─ projects/[id]/preview/page.tsx // ✅ Preview pública implementada
└─ layout.tsx // Root Layout (App Router)

/layouts/
├─ default.tsx // Layout global
├─ auth.tsx // Layout login/registro
└─ head.tsx // Head global

/components/
├─ navbar.tsx
├─ theme-switch.tsx
├─ icons.tsx
└─ primitives.ts

/lib/
├─ dbConnect.ts
├─ models/
│ ├─ user.ts
│ └─ site.ts // ✅ Site model implementado
└─ middlewares/
└─ withAuthPlan.ts

/scripts/
├─ seed.ts // Seed usuarios test
├─ reset.ts // Drop DB (via tsx)
└─ preview.ts (⚠️ future)

/styles/
└─ globals.css

/config/
├─ site.ts
└─ fonts.ts

/types/
└─ next-auth.d.ts

/docs/
… (roadmap, tareas, stack, agentes, contributing, architecture)
```

> **Migración progresiva:** código nuevo se escribe en **/app**; legacy permanece en **/pages** hasta completar la transición.

---

## 🧠 Arquitectura & lógica principal

### 🟣 Auth.js (NextAuth)

- Login/registro (credentials) → JWT + MongoAdapter
- Middleware/HOC protección en dashboard y APIs
- Roles & planes (`user.plan`: free | pro | premium)
- Sesión persistente (cookie segura)

### 🟡 MongoDB + Mongoose

- Modelos en `/lib/models/`
  - **User**: email, password, name, plan, createdAt
  - **Site**: userId, slug, config, createdAt
- Conexión centralizada `dbConnect.ts` con cache global
- Scripts **tsx**: `seed.ts`, `reset.ts`

### 🔵 UI & Diseño

- TailwindCSS + HeroUI v2
- Layouts (`default`, `auth`, `/app/layout.tsx`)
- Responsive, accesible (a11y ready)
- ThemeProvider (`next-themes`)
- Inspiración visual de HeroUI Plus, Tailwind UI, Shadcn UI, Flowbite y DaisyUI

---

## 🧩 Utilidades y helpers

- `lib/utils.ts` – helpers globales (`cn`, `hashPassword`, `comparePassword`)
- **Middlewares**
  - `withAuthPlan` – protección por plan
  - `withValidation` – validación Zod en APIs
- Validación frontend con **React Hook Form + Zod**

---

## 📡 API y rutas core

| Ruta                          | Método | Auth | Descripción                        |
| ----------------------------- | ------ | ---- | ---------------------------------- |
| `/api/auth/register`          | POST   | —    | Registro (hash pre-save)           |
| `/api/auth/login`             | POST   | —    | Login credentials                  |
| `/api/me`                     | GET    | 🔐   | Info usuario logueado              |
| `/api/me/update`              | PATCH  | 🔐   | Actualizar nombre o pass           |
| `/api/sites`                  | POST   | 🔐   | Crear sitio (límite 1 para FREE)   |
| `/api/sites`                  | GET    | 🔐   | Listar sitios del usuario          |
| `/api/projects/[id]/generate` | POST   | 🔐   | Generar HTML estático desde wizard |
| `/api/stripe/checkout`        | POST   | 🔐   | Checkout de plan/upgrade           |
| `/api/stripe/webhook`         | POST   | —    | Webhooks Stripe (subs, pagos)      |

---

## 🧠 Convenciones técnicas

- Componentes reutilizables en `/components/`
- Endpoints: códigos claros (200, 400, 401, 403, 500)
- Modelos Mongoose singleton (evita redefinición en dev)
- Checks de plan en backend + UI
- Lint + Prettier CI (husky pre-commit)

---

## 📦 Paquetes principales instalados

next, react, react-dom
tailwindcss, postcss, autoprefixer
@heroui/\* (v2)
next-auth, mongoose@8, bcryptjs
clsx, framer-motion, next-themes
tsx (scripts TS), zod


---

## 📝 NOTA

- Proyecto base **Pages Router**; nuevas features → **App Router**.
- Wizard implementado (Jul 2025). Preview pública lista. Solo tracking `upgrade_click` pendiente.

---

## 💡 Ejemplo de estructura futura completa en `/app`

```text
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
    projects/[id]/wizard/page.tsx // ✅
    projects/[id]/preview/page.tsx // ✅
  login/page.tsx
  register/page.tsx
  [slug]/page.tsx
  /api
    … (route handlers modernizados)
```
