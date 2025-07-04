# 💎 PLAN_PRO.md

**Actualizado:** **Julio 2025**

---

## 🎯 Objetivo

Ofrecer funcionalidades avanzadas para usuarios que desean llevar su web al siguiente nivel: **branding completo, dominio propio, analítica y automatización de emails**. Este plan constituye el “primer upgrade” natural y principal vía de monetización.

---

## ✨ Funcionalidades que desbloquea el **Plan PRO**

| Bloque                 | Descripción                                                                   |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Sitios ilimitados**  | El límite de 1 proyecto del plan FREE desaparece.                             |
| **Branding total**     | Cambios de colores, fuentes, favicon, meta-tags y logo.                       |
| **Dominio propio**     | Conecta tu dominio externo (Namecheap u otro) o sub-dominio gestionado.       |
| **Métricas básicas**   | Visitas, clicks, actividad reciente con retención de 30 días (Upstash Redis). |
| **Emails automáticos** | Plantillas de Resend para registro, cambios y notificaciones.                 |

---

## 🚧 Backlog inmediato (Plan PRO)

### 💾 Backend & almacenamiento

- Persistir **estructura completa del sitio** en MongoDB (`pages`, `components`, `styles`).
- Subida y almacenamiento seguro de **imágenes personalizadas** (S3 / Cloudinary). Usa las variables `CLOUDINARY_*` o `S3_*` definidas en `CODIGOBASE.md`.
- Exportar sitios como **HTML estático** (descarga ZIP).

### 🎨 Personalización & branding

- Selector de **paleta de colores** (UI con presets).
- Cambiar **tipografía**, espaciados y estilos globales.
- Branding propio: favicon, logo, títulos, meta-tags editables.

### 📧 Emails & comunicación

- Integración con **Resend**: emails transaccionales / marketing.
- (Opcional) **Confirmación de cuenta** por email al upgrade.

### 📊 Métricas & dominio

- Analítica básica: visitas, páginas vistas, clicks (fetch Redis).
- Conexión de **dominio propio** manual (Namecheap API).
- Panel de estadísticas en dashboard (HeroUI charts).
- Historial de pagos accesible en `/billing` (API `/api/stripe/history`).

---

## 🚀 Siguientes pasos

1. **Stripe** → Desbloqueo automático en cuanto el pago se confirma (webhook).
2. **Onboarding guiado** tras upgrade: branding ➜ dominio ➜ analytics.
3. Upsell visual constante en dashboard (botones, banners).
4. Mantener `/docs` al día con ejemplos de branding, analytics y dominio.

---
