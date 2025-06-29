# ARCHITECTURE.md

> 🏗️ **Arquitectura técnica, decisiones y visión para el SaaS “Web Builder”**
>  
> Actualizado: Junio 2025

---

## 🧭 Visión y principios

El objetivo es construir un SaaS de generación de sitios web, fácil de escalar, monetizar y evolucionar, con una base robusta pero ágil.

**Principios clave:**
- Modularidad total (features desacopladas, fácil onboarding)
- Escalabilidad (a cientos/miles de usuarios y sitios)
- Seguridad y privacidad por defecto
- Experiencia de usuario premium desde el plan FREE
- Orientado a código limpio, patrones y extensibilidad

---

## 🏛️ Capas principales del sistema

[ Cliente (Next.js + React + HeroUI) ]
↓
[ API interna (Next.js API Routes) ]
↓
[ Servicios backend (MongoDB, Stripe, Redis, Resend, IA) ]
↓
[ Integraciones externas (Mux, Namecheap, DataFast, CurrencyAPI) ]

markdown
Copiar
Editar

---

## 📦 Stack de tecnologías principales

Consulta y mantén actualizado `STACK.md` para dependencias reales.

### Frontend

- **Next.js 15** (Pages Router, migrable a App Router)
- **React 18**, **TypeScript**
- **HeroUI v2** para UI, extensible y themeable
- **TailwindCSS** (estilos utilitarios + tokens)
- **next-themes** (soporte dark/light global)
- **Framer Motion** (animaciones)
- **Lucide** (iconografía SVG)

### Backend y persistencia

- **MongoDB Atlas** (multi-tenant, escalable)
- **Mongoose** (modelado seguro y reusable)
- **Auth.js (NextAuth)** (autenticación, JWT, adaptador Mongo)
- **Stripe** (pagos, suscripciones, upgrades)
- **Upstash Redis** (caching y colas serverless)
- **Resend** (envío de emails)
- **Zod** (validación, schemas de seguridad)
- **Dotenv** (configuración centralizada .env)

### Integraciones externas futuras

- **MUX** (vídeo hosting)
- **Namecheap** (conexión de dominios)
- **DataFast** (IA generación de textos)
- **CurrencyAPI** (multi-moneda y precios internacionales)
- **Capacitor** (exportación mobile)

---

## 🧩 Diseño de dominio y módulos

### Modelos principales

- **User:**  
  - `email`, `name`, `password` (hashed), `plan` (enum), `createdAt`
- **Site:**  
  - `userId`, `slug`, `config` (estructura, estilos, contenido), `createdAt`
- **Subscription/Plan:**  
  - Stripe ID, estado, fechas, webhooks

> *Todos los modelos en `/lib/models/`. Mongoose para compatibilidad dev/prod, protección contra redefiniciones.*

---

### Estructura de carpetas (Pages Router)

- `/pages/`  
  - **/auth/** (login, register)  
  - **/dashboard/** (index, projects, profile, settings, welcome)
  - **/api/** (REST endpoints)
  - **/[slug]/** (render dinámico del sitio web generado)
- `/components/` (UI y lógica visual)
- `/layouts/` (layouts globales y privados)
- `/lib/` (models, dbConnect, utils, middlewares)
- `/config/` (site, fonts, rutas)
- `/styles/` (globals.css)
- `/scripts/` (seeds)
- `/docs/` (roadmap, tareas, stack, agentes, contributing, architecture)

> Migración futura a `/app/` **(App Router)**:  
> - Cada vista es un server component.  
> - API Routes migran a server actions o routes handlers.

---

### API interna

- **REST**: `/api/auth`, `/api/me`, `/api/sites`, `/api/stripe`
- **Protección con middlewares:**  
  - `withAuthPlan` (acceso por plan: FREE, PRO, PREMIUM)
  - `withValidation` (Zod schemas)
- **Autenticación JWT** vía Auth.js + MongoAdapter

---

### Control de acceso y planes

- **FREE:** 1 proyecto, branding básico, sin dominio propio
- **PRO:** ilimitado, branding, dominio, métricas básicas
- **PREMIUM:** IA, vídeo, métricas avanzadas, soporte, backups

> Los checks de plan deben estar **tanto en backend (API)** como en frontend (UI/UX).

---

### Internacionalización y escalabilidad

- **Listo para i18n:**  
  - Textos y labels en archivos aparte o contexto (`/config/` o `/locales/`)
- **Tokens y theming:**  
  - HeroUI y Tailwind soportan tokens para fácil rebranding

---

### Seguridad

- Contraseñas siempre hasheadas (`bcrypt`)
- Variables sensibles sólo en `.env`
- Validación de entrada con Zod
- Stripe: claves sólo en server, webhooks con firma
- Rate-limiting pendiente de implementar (Upstash Redis u otro)

---

## 🚦 Flujo de desarrollo recomendado

1. **Prototipa la UI en mock:**  
   Usa HeroUI, tailwind y componentes, con datos simulados.
2. **Conecta con la API:**  
   Añade lógica, fetch a endpoints, maneja loading/error.
3. **Implementa lógica de negocio:**  
   Lógica de planes, límites, checks en backend.
4. **Persistencia real:**  
   Conecta modelos y servicios de MongoDB.
5. **Integraciones externas:**  
   Stripe, Resend, Upstash, IA... sólo cuando el core esté sólido.
6. **Itera y refina:**  
   Refactoriza, extrae componentes y helpers, testea flows.
7. **Documenta todo en `/docs`**:  
   Roadmap, nuevas features, migraciones o convenciones.

---

## 🗂️ Decisiones arquitectónicas importantes

- **Pages Router hasta tener MVP sólido**, migrar a App Router sólo cuando aporte valor real (SSR/ISR más avanzado, layouts anidados).
- **Cada feature, su carpeta o módulo**:  
  Evita mega-archivos, prefiere la división por feature.
- **Middleware para control de planes**:  
  Que no se duplique lógica de acceso.
- **UI desacoplada de la lógica**:  
  El backend expone APIs claras, la UI sólo consume y muestra.

---

## 📊 Observabilidad y métricas

- Logs de error sólo en backend
- Agregar tracking de uso del wizard, upgrades y retención en siguientes fases
- Considera panel admin en el futuro

---

## 🔮 Futuro y escalabilidad

- **Migración progresiva a App Router** (cuando Next.js esté estable para todas las features que uses)
- **Testing automático** (Jest, Testing Library)
- **Monorepo si el producto escala** (admin panel, sitio público, microservicios)
- **CD/CI** con Vercel, Github Actions o similar

---

## 📚 Documentación y cultura de equipo

- Mantén sincronizados `ROADMAP.md`, `TAREAS.md`, `PLAN_FREE.md`, etc.
- Documenta convenciones nuevas en `CONTRIBUTING.md`
- Prefiere la claridad y la coherencia técnica sobre la “rapidez” improvisada

---

## 🛡️ Licencia y protección

- **Licencia MIT**  
- Valida licencias de todas las dependencias antes de publicar
- Nunca expongas secrets ni datos de usuarios en logs o docs públicas

---

## 📝 Última nota

> Esta arquitectura está viva: cada nueva integración, mejora o decisión debe quedar reflejada aquí y en los archivos de `/docs`.

---

**Construye el futuro SaaS que te gustaría usar. Refactoriza y documenta siempre. 🚀**