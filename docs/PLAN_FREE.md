🆓 PLAN_FREE.md
🎯 Objetivo
Permitir que cualquier usuario experimente la creación de un sitio web personalizado de forma gratuita, autenticándose, configurando su cuenta y generando un proyecto básico. El objetivo es validar la propuesta de valor del SaaS y facilitar la conversión a planes de pago.

✨ Funcionalidades implementadas
 Registro de usuario con email y contraseña (Auth.js, credentials)

 Inicio de sesión seguro con redirección al dashboard

 Placeholder de usuario/contraseña visible en login (modo dev)

 Dashboard: saludo personalizado y datos de sesión

 Pantalla de bienvenida tras login (HeroUI, onboarding rápido)

 Vista de perfil: edición mock de nombre y contraseña

 Vista de proyectos: crear/borrar proyecto (mock), límite de 1 en FREE, avisos y CTA upgrade

 Modal/formulario para crear proyecto (HeroUI)

 Navbar dinámica: sesión y avatar visible al autenticar

 Layouts claros: público (landing, docs...) y privado (dashboard)

 Mensajes de feedback (login, registro, perfil)

 Flujo de navegación mínimo: login → dashboard → perfil/proyectos/bienvenida

 Diseño HeroUI aplicado en todas las vistas

 Soporte de temas claro/oscuro (next-themes)

🚧 Funcionalidades pendientes (Backlog inmediato)
👤 Usuario y perfil
 Validación avanzada de formularios (login, registro) con feedback real-time

 Subida y gestión de avatar real (ahora solo nombre/email)

 Persistencia real de perfil en la BBDD (MongoDB)

 Cambiar contraseña y actualizar datos reales

 Toasts/alerts de feedback en cambios de perfil

 Mejorar accesibilidad (focus states, labels, roles...)

🌐 Sitio público y proyectos
 Renderizado público del sitio generado (modo demo)

 Limitación y avisos al intentar crear más de 1 sitio (validación real, no solo UI)

 Demo pública: publicar y navegar el sitio generado

 Página de error amigable para rutas privadas sin sesión

 Integración del generador/wizard (sólo 1 sitio posible en FREE)

🚀 Otros detalles & UX
 Aviso visual de upgrade (al llegar a límite o uso intensivo)

 Tracking anónimo de uso (eventos, wizard, registros)

 Tag visual de plan (FREE) en dashboard y navbar

 Mejorar modularidad del código para escalar (refactor, separación por features)

🧪 Validación de uso y métricas
 Mostrar aviso de upgrade si el usuario usa mucho el wizard o alcanza el límite de proyectos

 Métricas básicas: nº de registros, nº de proyectos por usuario, actividad reciente

✍️ Notas
La base del plan FREE está funcional y navegable.

Próximos pasos:

Persistencia real en BBDD (perfil y proyectos)

Desarrollo completo del generador de sitios/wizard

Mejora progresiva de UX/UI y validación de uso

