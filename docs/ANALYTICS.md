# 📈 ANALYTICS.md

**Actualizado:** **Julio 2025**

---

## 🌟 Propósito

Registrar el uso de la plataforma para mejorar la experiencia de usuario y validar las funcionalidades de cada plan. El tracking se mantiene anónimo y permite identificar puntos de fricción y oportunidades de upsell.

## 📁 Datos recopilados

- ID anónimo de sesión o usuario
- Marca de tiempo (timestamp)
- Coordenadas de clic (x,y)
- Página o ruta visitada
- Tipo de evento

### Endpoint `/api/track`

Envia un JSON con la siguiente estructura:

```json
{
  "event": "click",
  "page": "/dashboard",
  "timestamp": 1720000000,
  "duration": 120,
  "x": 10,
  "y": 20
}
```

Todos los campos salvo `event` son opcionales.

## 📊 Eventos registrados

- `page_view` – visita de página
- `click` – interacción con elementos
- `wizard_step` – avance o retroceso en el generador
- `upgrade_click` – intento de mejora de plan
- `signup_free` – registro exitoso de usuario
- `wizard_completed` – finalización del proceso de creación

## 🔍 Uso de marcas de tiempo y coordenadas

- Las marcas de tiempo permiten generar **funnels** y medir la conversión entre pasos.
- Las coordenadas de clic se emplean para **heatmaps** que revelan patrones de uso y zonas de interacción.

## 🔒 Privacidad

- Los datos se almacenan sin información personal identificable.
- Se respetan las configuraciones de cookies y consentimiento.
- Las métricas se usan solo con fines de mejora interna y nunca se comparten con terceros.

## 🧠 Del dato a la decisión

Las métricas capturadas sirven para extraer **insights** de distinto nivel:

### Descriptivo

- **Resúmenes** de visitas, clics y pasos completados permiten detectar patrones generales de uso.
- **Funnels** y **heatmaps** muestran dónde se estancan los usuarios y qué zonas reciben más atención.

### Predictivo

- Al analizar secuencias de eventos y tiempos de sesión es posible **predecir** intentos de abandono o probabilidad de upgrade.
- Estos modelos se alimentan de las métricas agregadas almacenadas en **Upstash Redis** para consultas rápidas.

### Prescriptivo

- A partir de las predicciones se pueden **recomendar acciones**: mostrar un CTA específico, ajustar el precio o simplificar el wizard.
- Decisiones como priorizar mejoras de UX o lanzar una campaña de emails se basan en estos datos.

En conjunto, la plataforma evoluciona de recopilar eventos a tomar decisiones informadas que mejoran la retención y monetización.
