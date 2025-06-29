🤖 AGENTS.md
🎯 Propósito del agente
Mantener el archivo TAREAS.md totalmente alineado con el progreso real y la visión estratégica del proyecto SaaS.
Debe reflejar siempre la realidad actual de desarrollo, agrupada por fases: FREE → PRO → PREMIUM.

🟢 Instrucción inicial para el agente Codex
Analiza los archivos clave:

ROADMAP.md

PLAN_FREE.md, PLAN_PRO.md, PLAN_PREMIUM.md

STACK.md

Compara con TAREAS.md y los últimos commits si están disponibles.

Marca tareas como completadas solo si están desarrolladas y probadas.

Añade nuevas tareas si han sido implementadas y no figuran aún.

Organiza todas las tareas por fase de producto: FREE, PRO, PREMIUM.

Optimiza títulos, claridad, y organización técnica.

Mantén el mismo estilo visual y técnico que el resto de la documentación.

🔁 Funciones permanentes del agente
1. Lectura de fuentes clave
TAREAS.md (estado real)

ROADMAP.md (visión global y hitos)

Planes (PLAN_FREE.md, PLAN_PRO.md, PLAN_PREMIUM.md)

STACK.md (stack real y dependencias)

Commits recientes (cuando estén disponibles para más contexto)

2. Detección de inconsistencias
Tareas pendientes ya implementadas → marcarlas como completadas

Tareas obsoletas o que no encajan en el roadmap actual → marcar, mover o eliminar

Funcionalidades nuevas sin reflejo en TAREAS.md → añadirlas donde corresponda

Duplicidades, descripciones poco claras o redundantes → unificar o aclarar

3. Actualización estructurada de TAREAS.md
Marcar con [x] las tareas ya hechas

Añadir tareas nuevas en el bloque y fase correctos

Agrupar por bloques funcionales y prioridad de entrega

Unificar redacción, emojis y formato

4. Mejora continua y claridad
Títulos breves, descriptivos y técnicos (sin adornos innecesarios)

Uso de emojis para estructura visual rápida

Redacción directa y técnica

Sin comentarios irrelevantes ni ruido en el archivo

Facilidad de lectura para humanos y agentes LLM

📚 Convención oficial para TAREAS.md
Bloques funcionales
🔐 Backend

🧱 Generador de sitios (wizard)

💳 Sistema de pagos y planes

🌟 Funcionalidades premium

🧪 Retención, métricas y feedback

✅ Completadas (siempre arriba)

Formato de tareas
[x] Tarea completada

[ ] Tarea pendiente

Agrupadas por fase: FREE → PRO → PREMIUM

Sin numeraciones, solo listas simples por prioridad

🧠 Recordatorios para agentes
Nunca elimines tareas sin revisión o contexto.

Prioriza siempre la claridad y el alineamiento con el stack actual.

Mantén copia de seguridad de TAREAS.md antes de cualquier cambio masivo.