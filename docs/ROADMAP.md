# 🚦 ROADMAP.md

_Versión estratégica del producto Web Builder_  
**Actualizado:** **Julio 2025**

---

## 🎯 Visión general

Crear un SaaS de generación de sitios web **escalable** y **monetizable**, con onboarding rápido y upsell fluido entre los planes **FREE → PRO → PREMIUM**.

---

## 1️⃣ Fase 1 — Setup & Base (✅ completada)

- ✅ Proyecto **Next.js 15** (Pages Router + App Router híbrido) con **TypeScript estricto**
- ✅ **TailwindCSS + HeroUI v2** instalados
- ✅ Entorno dev: **ESLint**, **Prettier**, `cross-env`, tipos `@types/*`
- ✅ Script `dev` con `NODE_OPTIONS=--trace-warnings`

---

## 2️⃣ Fase 2 — Autenticación & DB (✅ completada)

- ✅ **Auth.js (NextAuth)** configurado (credentials)
- ✅ **MongoDB Atlas** + **Mongoose 8** (`dbConnect` con cache)
- ✅ Modelo **User** (`/lib/models/user.ts`) con hash + validaciones
- ✅ Modelo **Site** (`/lib/models/site.ts`)
- ✅ API `/api/me` GET/PATCH
- ✅ API `/api/me/avatar` PATCH (actualizar avatar)
- ✅ Rate limiting vía **Upstash Redis**

---

## 3️⃣ Fase 3 — Generador de sitios (Plan FREE) (🟡 en curso)

| Tarea                                    | Estado          |
| ---------------------------------------- | --------------- |
| Wizard paso-a-paso (HeroUI)              | **✅ Jul-2025** |
| Límite 1 sitio por usuario FREE          | **✅**          |
| Guardar config de sitio en MongoDB       | **✅ 03-Jul-2025** |
| Render dinámico en `/[slug]`             | **✅ 03-Jul-2025** |
| Preview pública `/projects/[id]/preview` | **✅ Jul-2025** |
| Demo pública navegable                   | **✅ 03-Jul-2025** |

---

## 4️⃣ Fase 4 — Pagos & planes (PRO / PREMIUM) (⬜ pendiente)

- Integrar **Stripe** (productos, subscripciones, webhooks)
- Middleware de control de plan + free trial (7 días, opc.)
- Dashboard: historial y panel de pagos

---

## 5️⃣ Fase 5 — Funcionalidades PRO (⬜ pendiente)

- Branding personalizado (paleta, fuentes, favicon, meta)
- Conexión de dominio propio (Namecheap/Cloudflare)
- Panel de métricas básicas (Upstash opc.)
- Emails transaccionales (**Resend**)

---

## 6️⃣ Fase 6 — Funcionalidades PREMIUM (⬜ pendiente)

- **IA DataFast**: generación de contenido asistido
- Cache de sitios vía **Upstash Redis**
- **MUX**: vídeo upload + player
- Textos legales automáticos (cookies, privacy, TOS)
- Backups / restore 1 clic
- Soporte prioritario in-app

---

## 7️⃣ Fase 7 — Validación, métricas & feedback (⬜ pendiente)

- ✅ Tracking inicial de eventos (`wizard_completed` y `upgrade_click`) en MongoDB — 03-Jul-2025
- Avisos de upgrade en puntos de fricción / límites
- ✅ Badge visual del plan activo (FREE / PRO / PREMIUM) — 03-Jul-2025
- Captura de feedback y link a soporte

---

### 🔄 Revisión continua

Revisa este roadmap **cada semana** para planificar sprints, validar hipótesis y mantener alineado el equipo.
