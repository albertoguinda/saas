# 💬 PREMIUM_CHAT.md

Componente de chat en tiempo real para el plan **Premium**. Permite adjuntar archivos, usar emojis y soporta tema claro/oscuro.

## Demo local

- Visita `/demo/chat` para una conversación de prueba.
- También disponible en el catálogo desde `/dashboard/premium-catalog`.

## Uso básico

```tsx
import ChatBox from "@/components/premium/chat/ChatBox";

<ChatBox user={{ id: "1", name: "Ada" }} channel="support" />;
```

### Props

| Prop      | Tipo                           | Descripción          |
| --------- | ------------------------------ | -------------------- | ----------------------- |
| `user`    | `{ id: string; name: string }` | Usuario actual       |
| `channel` | `string`                       | Canal o sala de chat |
| `theme`   | `"light"                       | "dark"`              | Fuerza el tema opcional |
