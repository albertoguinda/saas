# CONTRIBUTING.md

> 🛠️ **Guía de colaboración, buenas prácticas y convenciones para el SaaS “Web Builder”**  
> **Actualizado:** Junio 2025

---

## 🚀 Visión del proyecto

Este repositorio tiene como objetivo construir una plataforma SaaS de generación de sitios web, escalable y monetizable, orientada a iteración rápida, código limpio y calidad de producto.

Toda contribución debe alinearse con:
- **Evolución incremental** (cada feature debe poder desplegarse en producción)
- **Escalabilidad y modularidad** (pensado para equipos)
- **Consistencia visual y técnica** (HeroUI, Tailwind, estructura de carpetas clara)
- **Preparado para crecimiento y onboarding fácil**

---

## 📁 Estructura de carpetas y módulos

**Lee y respeta `CODIGOBASE.md` y el resto de la documentación de `/docs`.**

- **Pages Router** (`/pages/`):  
  Estructura tradicional de Next.js. Cada página equivale a una ruta.  
  Cuando se migre a **App Router**, se moverán las vistas a `/app/`.

- **Componentes** (`/components/`):  
  - **`/components/ui/`**: Reexporta y extiende componentes de HeroUI (o crea nuevos)
  - **`/components/forms/`**: Formularios reutilizables (login, registro, perfil, etc)
  - **`/components/layout/`**: Navbar, sidebar, footer, toggles, etc.
  - **Evita componentes ultra-específicos: si sólo vive en una página, déjalo local por ahora.**

- **Lib** (`/lib/`):  
  - **`dbConnect.ts`**: Conexión a MongoDB (persistente y reutilizable)
  - **`models/`**: Modelos mongoose (`user.ts`, `site.ts`, etc)
  - **`middlewares/`**: Middlewares reutilizables (ej: protección por plan)
  - **`utils.ts`**: Helpers generales (`cn`, `hashPassword`, etc)

- **Config** (`/config/`):  
  - Archivos de configuración global (enlaces, fuentes, meta)

- **Docs** (`/docs/`):  
  - Documentación interna, roadmap, stack, tareas, agentes

---

## 🧠 Convenciones de desarrollo

- **Tipado SIEMPRE** con TypeScript. No se permiten componentes sin tipos.
- **Usa HeroUI y Tailwind para toda la UI.**  
  Extiende HeroUI sólo si hace falta. Si usas otro paquete, justifica la decisión en PR.
- **Variables de entorno:**  
  Toda variable nueva debe documentarse en `.env.example`.
- **Evita lógica compleja en componentes:**  
  Si tienes lógica repetida o que crece mucho, mueve a un helper o custom hook.
- **Rutas y endpoints:**  
  - **API**: Usa `/pages/api/` para endpoints REST.
  - Siempre retorna status HTTP claros y mensajes explícitos.

- **Persistencia:**  
  - Usa Mongoose para todos los modelos persistentes.
  - Haz que los modelos sean compatibles con hot-reload (`export default models.User || model<User>()`)

---

## 📦 Buenas prácticas de código

- **ESLint y Prettier:**  
  Corre `npm run lint` y `npm run format` antes de cada PR.  
  ¡No aceptes PRs con errores de linting ni formato!

- **Convención de commits:**  
  Usa mensajes claros:  
  `feat: Añade vista de perfil`  
  `fix: Corrige validación de login`

- **Comentarios:**  
  Breves y sólo donde el código no sea autoexplicativo.  
  **No comentes código muerto**: bórralo si no es relevante.

- **Componentes:**  
  - Nombra los componentes con mayúscula (`ProfileForm.tsx`)
  - Si es un wrapper de HeroUI, usa el mismo nombre (`CustomCard`, `FormAlert`)
  - Usa props tipados y props.children cuando sea posible.

---

## 🏗️ Organización de nuevas features

- **Crea primero el mock de la UI** usando HeroUI y datos simulados.
- Añade lógica y conexión a backend sólo cuando la experiencia esté clara.
- Cada nueva feature debe estar justificada en el `ROADMAP.md` y reflejada en `TAREAS.md`.
- Si cambias flujos, explica por qué en el PR o en un comentario en la tarea.

---

## 🧩 Modularidad y escalabilidad

- **Nunca crees helpers duplicados.**  
  Si una función se repite en varios sitios, muévela a `/lib/utils.ts`.

- **Evita el “spaghetti” de imports:**  
  Si una carpeta empieza a tener >5-6 archivos, considera subcarpetas (`/components/ui/forms/`).

- **Cuida la nomenclatura:**  
  - Evita nombres genéricos (`Data`, `Thing`)
  - Usa nombres de dominio (`UserProfileCard`, `SiteWizardStep`)

---

## 🔐 Seguridad y datos

- **Nunca expongas claves en el repo.**  
  Usa `.env` y `.env.example`.
- **Hashea SIEMPRE las contraseñas** (bcrypt ya está en el proyecto).
- **No loguees datos sensibles** ni retornes errores internos a cliente.

---

## 🧪 Testing y validación

- **Haz testing manual antes de cada PR.**  
  - Login, registro, flows del dashboard, vistas públicas.
  - Si rompes algo, documenta el error y propón solución.
- (Opcional futuro) Añade tests unitarios con Jest/Testing Library.

---

## 📚 Documentación y tareas

- **Actualiza los archivos de `/docs` si cambias una convención, una estructura o añades dependencias.**
- **Sincroniza siempre `TAREAS.md` tras cada funcionalidad nueva.**
- **Si dudas sobre estructura, consulta `CODIGOBASE.md` o pregunta antes de mergear.**

---

## 💡 Filosofía de contribución

- **Itera rápido, pero no sacrifiques calidad.**
- **No hay PRs demasiado pequeños si aportan claridad.**
- **Piensa en el siguiente dev (o tú mismo en 3 meses): deja el proyecto autoexplicativo.**
- **Propón, debate y documenta tus decisiones: aquí no hay ego, solo producto.**

---

## 🛡️ Licencia y legal

- El proyecto está bajo licencia **MIT**.
- No aceptes PRs con dependencias con licencias incompatibles.

---

**¡Gracias por contribuir! Haz crecer este SaaS con visión, orden y calidad. 🚀**
