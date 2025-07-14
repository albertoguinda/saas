# Sensor Panel Premium

Panel de sensores IoT adaptado del proyecto original en Vue.

## Props

| Prop         | Tipo     | Descripción                                                      |
| ------------ | -------- | ---------------------------------------------------------------- |
| `sensorType` | string   | Tipo de sensor (`humidity`, `temperature`, `light`).             |
| `updateMode` | string   | `stream` para datos continuos o `poll` para lecturas periódicas. |
| `unit`       | string   | Unidad opcional mostrada tras el valor.                          |
| `onAlert`    | function | Callback cuando se supera un umbral.                             |

## Uso

```tsx
import SensorPanel from "@/components/premium/iot/SensorPanel";

<SensorPanel sensorType="humidity" updateMode="stream" unit="%" />;
```

La página `/demo/sensor-panel` incluye ejemplos listos para probar.
