# CONTRIBUTING.md

> 🛠️ **Guía de colaboración, buenas prácticas y convenciones para el SaaS “Web Builder”**  
> **Actualizado:** **Julio 2025**

---

## 🚀 Visión del proyecto

Construir una plataforma SaaS de generación de sitios web, **escalable y monetizable**, orientada a iteración rápida, código limpio y calidad de producto.

Toda contribución debe alinearse con:

- **Evolución incremental** (cada feature lista para producción)
- **Escalabilidad y modularidad** (pensado para equipos)
- **Consistencia visual y técnica** (HeroUI + Tailwind, estructura de carpetas clara)
- **Preparado para crecimiento y onboarding fácil**

---

## 📁 Estructura de carpetas y módulos

**Lee y respeta `CODIGOBASE.md` y el resto de `/docs`.**

- **Pages Router** (`/pages/`)  
  Estructura clásica Next.js. Migración progresiva a **App Router** (`/app/`).

- **Componentes** (`/components/`)

  - `/components/ui/` → wrappers/extensiones de HeroUI
  - `/components/forms/` → formularios reutilizables
  - `/components/layout/` → navbar, sidebar, footer, toggles…
  - Componentes ultra-específicos: mantenlos locales a la página.

- **Lib** (`/lib/`)

  - `dbConnect.ts` – conexión Mongo (cache global)
  - `models/` – modelos Mongoose (`user.ts`, `site.ts`, …)
  - `middlewares/` – middlewares reutilizables (`withAuthPlan`, …)
  - `utils.ts` – helpers globales (`cn`, `hashPassword`, …)

- **Config** (`/config/`) – archivos de configuración global

- **Docs** (`/docs/`) – roadmap, tareas, stack, agentes, architecture…

---

## 🧠 Convenciones de desarrollo

- **TypeScript obligatorio** (sin códigos sin tipar).
- **HeroUI v2 + TailwindCSS** para toda la UI. Extiende HeroUI sólo si es estrictamente necesario.
- **Variables .env** – cualquier variable nueva debe aparecer en `.env.example`.
- **Componentes ≠ lógica pesada** – extrae a hooks/helpers.
- **API Routes** – en `/pages/api/` o route handlers `/app/api/`, con status claros.

---

## 📦 Buenas prácticas de código

- **ESLint & Prettier** (`npm run lint` / `format`) – PRs sin errores.
- **Commits semánticos**: `feat: wizard paso a paso` • `fix: validar slug`
- **Comentarios** breves, sin código muerto.
- **Componentes** PascalCase, props tipados, usa `props.children` cuando aplique.
- **Ordena imports**: externos, internos y estilos, con línea en blanco por
  bloque.
- **Elimina imports y variables sin usar**.
- **Props en JSX**: `key`, `ref`, props estándar, callbacks y spread al final.
- **Aplica Prettier y corrige warnings ESLint** antes de hacer commit.

## 🌍 Traducciones

- Añade idiomas en `messages/<locale>.json` siguiendo la estructura de `en.json`.
- Ejecuta `npm run translations:check` tras modificar traducciones.
- Ejecuta `npm run i18n:check` para detectar claves sin uso o faltantes.
- Usa placeholders y plurales siguiendo los ejemplos de `messages/en.json`.

---

## 🏗️ Organización de nuevas features

- Prototipa la **UI en mock** (HeroUI + datos ficticios).
- Conecta backend sólo cuando la UX esté validada.
- Toda feature nueva debe aparecer en `ROADMAP.md` **y** `TAREAS.md`.
- Si modificas flujos, justifica en el PR o issue.
- **Tras mergear el wizard u otra feature, marca la tarea en `TAREAS.md`.**

---

## 🧩 Modularidad y escalabilidad

- Evita helpers duplicados → mueve a `/lib/utils.ts`.
- Si una carpeta crece > 5-6 archivos → subcarpetas.
- Nombrado de dominio (`SiteWizardStep`, `UserProfileCard`) > nombres genéricos.

---

## 🔐 Seguridad y datos

- Secrets nunca en repo → usa `.env` + `.env.example`.
- Contraseñas hash (`bcrypt`).
- No loguear datos sensibles ni devolver errores internos al cliente.

---

## 🧪 Testing y validación

- **Testing manual** antes de cada PR (auth, dashboard, wizard…).
- Tests automáticos (Jest + RTL) — _pendiente roadmap_.

---

## ♿ Accesibilidad

- Mantén visibles los focus outlines definidos en `styles/globals.css`.
- Usa `aria-label` para botones/links sin texto claro.
- Muestra mensajes de error/envío con `role="alert"` para lectores de pantalla.

---

## 📚 Documentación y tareas

- Actualiza `/docs` si cambias convenciones, estructura o dependencias.
- **Sincroniza `TAREAS.md`** tras cada funcionalidad.
- Si dudas, consulta `CODIGOBASE.md` o abre discusión antes de mergear.

---

## 💡 Filosofía de contribución

Itera rápido **sin sacrificar calidad**.  
PRs pequeños y claros > grandes y confusos.  
Piensa en el dev futuro (o en ti +6 meses).  
Debate, documenta y prioriza el producto.

---

## 🛡️ Licencia y legal

Proyecto bajo **MIT**.  
Comprueba licencias de nuevas dependencias.

---

**¡Gracias por contribuir 💜 — hagamos crecer este SaaS con visión y orden! 🚀**
