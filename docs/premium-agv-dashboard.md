# AGV Dashboard Premium

Componente de monitorización en tiempo real integrado en el plan **PREMIUM**.

## Props

| Prop              | Tipo   | Descripción                                                       |
| ----------------- | ------ | ----------------------------------------------------------------- |
| `wsUrl`           | string | URL del WebSocket opcional. Si se omite se generan datos de mock. |
| `refreshInterval` | number | Intervalo en ms para los datos de mock.                           |

## Uso

```tsx
import AGVDashboard from "@/components/premium/dashboards/AGVDashboard";

<AGVDashboard refreshInterval={1000} wsUrl="wss://mi-servidor" />;
```

La página `/dashboard/agv-monitor` muestra una demo interactiva.

![Demo](../public/dashboard.png)
