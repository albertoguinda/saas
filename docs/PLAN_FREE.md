# 🆓 PLAN_FREE.md

**Actualizado:** **Julio 2025**

---

## 🎯 Objetivo

Permitir que cualquier usuario experimente la creación de un sitio web personalizado de forma gratuita — autenticándose, configurando su cuenta y generando **un** proyecto básico. El plan FREE valida la propuesta de valor y sirve como trampolín a los planes de pago.

---

## ✨ Funcionalidades implementadas

- **Registro** de usuario por email + contraseña (Auth.js, credentials)
- **Inicio de sesión** seguro con redirección al dashboard
- Placeholders dev de credenciales en login
- **Dashboard**: saludo + datos de sesión
- **Pantalla de bienvenida** (HeroUI, onboarding rápido)
- **Vista de perfil**: edición mock de nombre/contraseña
- **Vista de proyectos**: crear / borrar proyecto, **límite 1 en FREE**, avisos + CTA upgrade
- **Wizard de sitios** (3 pasos — title, slug, template) con HeroUI, validación básica y POST `/api/projects/[id]/generate`
- **Navbar dinámica** con avatar al autenticar
- **Layouts** claros: público vs privado
- Mensajes de feedback (login, registro, perfil)
- Flujo mínimo: login → dashboard → perfil / proyectos / bienvenida
- **HeroUI + Tailwind** en todas las vistas
- **Tema claro / oscuro** (`next-themes`)

---

## 🚧 Funcionalidades pendientes (Backlog inmediato)

### 👤 Usuario y perfil

- Validación avanzada de formularios (login, registro) con feedback real-time
- Subida y gestión de **avatar real**
- Persistencia real de perfil en MongoDB
- Cambio de contraseña y actualización de datos
- Toasts / alerts de feedback en cambios de perfil
- Mejora de accesibilidad (focus, labels, roles)

### 🌐 Sitio público y proyectos

- **Preview pública** del sitio generado — `/projects/[id]/preview`
- Renderizado dinámico en ruta `/[slug]` (demo pública)
- Validación backend del límite 1 sitio (ahora sólo en middleware)
- Página de error amigable para rutas privadas sin sesión

### 🧱 Wizard & UX

- Manejo de errores y validación granular en el wizard
- Spinner y estados de red al generar
- Mensajes de éxito / error contextualizados

### 🚀 Upsell & tracking

- Aviso visual de upgrade al llegar al límite o uso intensivo
- Tracking anónimo de eventos: `wizard_completed`, `upgrade_click`, etc.
- Etiqueta “FREE” en dashboard y navbar

### 🧪 Métricas

- Panel mínimo: nº registros, proyectos por usuario, actividad reciente

### 🛠 Refactor y escalabilidad

- Modularizar helpers y hooks
- Separar vistas en `/app/` conforme a migración App Router

---

## ✍️ Notas

La experiencia FREE ya cubre registro → dashboard → **creación de un sitio vía wizard**.  
Siguientes hitos: **preview pública**, tracking de uso y mejoras de UX / accesibilidad.
