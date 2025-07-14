# Sensor Panel Premium

Panel de sensores IoT adaptado del proyecto original en Vue.

## Props

| Prop | Tipo | Descripción |
| ---- | ---- | ----------- |
| `sensorType` | string | Tipo de sensor (`humidity`, `temp`, `light`). |
| `updateMode` | string | `realtime` para stream o `interval` para lecturas puntuales. |
| `unit` | string | Unidad opcional mostrada tras el valor. |
| `onAlert` | function | Callback cuando se supera un umbral. |

## Uso

```tsx
import SensorPanel from "@/components/premium/iot/SensorPanel";

<SensorPanel sensorType="humidity" updateMode="realtime" unit="%" />;
```

La página `/demo/iot-sensor` incluye ejemplos listos para probar.
