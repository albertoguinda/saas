# 🧱 STACK.md — Stack & Arquitectura del Proyecto

**Actualizado:** **Julio 2025**

---

## 🟦 FRONTEND PRINCIPAL

| Herramienta                            | Rol                               | Por qué                                             |
| -------------------------------------- | --------------------------------- | --------------------------------------------------- |
| **Next.js 15** (Pages + App Router)    | Routing, SSR/ISR, Edge Functions  | Base escalable a server components y rutas híbridas |
| **React 18** + **TypeScript estricto** | UI declarativa, tipada            | Reutilización de vistas con seguridad de tipos      |
| **TailwindCSS**                        | Estilos utilitarios               | Iteración rápida sin CSS manual                     |
| **HeroUI v2**                          | Sistema de componentes accesibles | Consistencia visual + velocidad de UI               |
| **Framer Motion**                      | Animaciones fluidas               | Experiencia moderna, transiciones suaves            |
| **next-themes**                        | Tema claro/oscuro                 | Respeta preferencias del usuario                    |
| **clsx**                               | Construcción de `className`       | Clases condicionales limpias                        |
| **React Hook Form + Zod**              | Formularios con validación        | Wizard, login y perfil con feedback runtime         |

---

## 🟧 BACKEND, AUTENTICACIÓN Y DATOS

| Herramienta                    | Rol                      | Detalles                                  |
| ------------------------------ | ------------------------ | ----------------------------------------- |
| **Auth.js (NextAuth)**         | Auth credentials/OAuth   | JWT + MongoAdapter                        |
| **MongoDB Atlas + Mongoose 8** | DB NoSQL escalable       | Modelos `User`, `Site`, conexión cacheada (driver MongoDB 5) |
| **Stripe**                     | Pagos y suscripciones    | Upgrades de plan (PRO / PREMIUM)          |
| **Upstash Redis**              | Cache y colas serverless | Métricas y rate-limit en middleware |

---

## 🟩 SERVICIOS EXTERNOS & EXTENSIÓN

- **Resend** — Emails transaccionales
- **DataFast (IA)** — Generación de textos (Premium)
- **CurrencyAPI** — Conversión de moneda para precios globales
- **MUX** — Vídeo hosting/streaming (Premium)
- **Namecheap API** — Dominio propio (PRO/PREMIUM)
- **Capacitor** (futuro) — Export app móvil

---

## 🟫 UTILIDADES Y TOOLS INTERNOS

| Paquete                                 | Uso                                                     |
| --------------------------------------- | ------------------------------------------------------- |
| **Zod**                                 | Validación schema-first (API & formularios)             |
| **Lucide**                              | Iconos SVG                                              |
| **Tailwind Variants**                   | Componentes con variantes y temas                       |
| **dotenv**                              | Gestión de secrets `.env`                               |
| **ESLint (Flat Config)** + **Prettier** | Lint & format                                           |
| **tsx**                                 | Ejecución directa de scripts TS (`seed.ts`, `reset.ts`) |
| **Jest** + **Testing Library**          | Pruebas unitarias y de componentes |

---

## 🟨 CONVENCIÓN Y ESTRUCTURA

- Componentes HeroUI extendidos en `/components/` o `/components/ui/`.
- Modelos Mongoose en `/lib/models/`.
- Rutas protegidas por plan con middleware en `/lib/middlewares/`.
- Nueva funcionalidad ⇒ carpeta propia en `/app/` (migración progresiva).
- Wizard 3-pasos reside en `/app/projects/[id]/wizard/`.
- **Actualiza este archivo** cuando añadas dependencias clave o cambies el stack.

## 🌟 Inspiración para componentes UI premium

Para la biblioteca de componentes de pago tomaremos como referencia estas librerías y recursos:

- [HeroUI Plus](https://www.heroui.com/)
- [Tailwind UI](https://tailwindcss.com/plus)
- [Shadcn UI](https://ui.shadcn.com/)
- [Flowbite](https://flowbite.com/)
- [DaisyUI](https://daisyui.com/)
- [Material UI](https://mui.com/material-ui/)
- [Tremor](https://tremor.so/)
- [Material Tailwind – Web3 Charts](https://www.material-tailwind.com/blocks/web3-charts)
- [Threads – Midu.dev](https://www.threads.com/@midu.dev/post/C558KlMtyAM)
- [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
- [Apache ECharts](https://echarts.apache.org/en/index.html)
- [D3.js](https://d3js.org/)
- [Toastify](https://apvarun.github.io/toastify-js/) – notificaciones
- [Swiper](https://swiperjs.com/) – sliders responsivos
- [PhotoSwipe](https://photoswipe.com/) – galerías de imágenes
- [Atropos](https://atroposjs.com/) – efecto parallax
- [canvas-confetti](https://www.kirilv.com/canvas-confetti/) – celebraciones
- [Arctic](https://arctic.jackyz.xyz/) – transiciones y efectos 3D
