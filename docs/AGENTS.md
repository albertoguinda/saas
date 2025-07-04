🤖 **AGENTS.md**

### 🎯 Propósito del agente

Mantener **TAREAS.md** totalmente alineado con el progreso real y la visión estratégica del SaaS (fases: **FREE → PRO → PREMIUM**).

### 🟢 Instrucción inicial para el agente

Analiza los archivos clave:

- `ROADMAP.md`
- `PLAN_FREE.md`, `PLAN_PRO.md`, `PLAN_PREMIUM.md`
- `STACK.md`

y compáralos con `TAREAS.md` + los commits recientes (si los hay).

1. Marca tareas como completadas **solo** si están desarrolladas y probadas.
2. Añade tareas nuevas implementadas pero aún no reflejadas.
3. Reorganiza por fase (**FREE**, **PRO**, **PREMIUM**).
4. Optimiza títulos, claridad y coherencia técnica.
5. Mantén estilo y formato coherentes con la documentación existente.

---

### 🔁 Funciones permanentes del agente

1. **Lectura de fuentes clave**

   - `TAREAS.md` (estado real)
   - `ROADMAP.md` (visiones e hitos)
   - Planes (`PLAN_*`)
   - `STACK.md` (stack y dependencias)
   - Commits recientes (si están disponibles)

2. **Detección de inconsistencias**

   - Tareas pendientes ya implementadas → marcarlas como completadas
   - Tareas obsoletas o fuera de roadmap → mover/eliminar con nota
   - Funcionalidades nuevas sin reflejo → añadirlas
     - _Ejemplo: “Wizard mínimo viable → completado 03-Jul-2025”_
   - Duplicidades o descripciones poco claras → unificar o aclarar

3. **Actualización estructurada de `TAREAS.md`**

   - Usar `[x]` para hechas, `[ ]` para pendientes
   - Agrupar por fase y bloque funcional
   - Mantener emojis y formato unificado

4. **Mejora continua y claridad**
   - Títulos breves, descriptivos y técnicos
   - Emojis para escaneabilidad visual
   - Redacción directa, sin ruido
   - Fácil lectura para humanos y LLMs

---

### 📚 Convención oficial para **TAREAS.md**

#### Bloques funcionales

- 🔐 **Backend**
- 🧱 **Generador de sitios (wizard)**
- 💳 **Sistema de pagos y planes**
- 🌟 **Funcionalidades premium**
- 🧪 **Retención, métricas y feedback**
- ✅ **Completadas** (siempre arriba)

#### Formato de tareas

```md
- [x] Tarea completada
- [ ] Tarea pendiente
      Agrupadas por fase FREE → PRO → PREMIUM, sin numeración, solo listas simples por prioridad.

🧠 Recordatorios para agentes
Nunca elimines tareas sin contexto ni copia previa.

Prioriza claridad y alineación con el stack actual.

Haz backup de TAREAS.md antes de cambios masivos.
```
- Las fechas de nuevas tareas deben usar el formato `DD-MMM-YYYY HH:mm CEST`.
